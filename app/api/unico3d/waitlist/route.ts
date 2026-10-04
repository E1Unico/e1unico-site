import { NextRequest, NextResponse } from "next/server";
import { notifyUnicoOS } from "../../../../lib/notify-unicoos";

export const runtime = "nodejs";

// Unico3D early-access waitlist capture.
// Mirrors the UnicoMobile pipeline: every notify channel is env-gated and fires
// independently, and we always log so a signup is never silently dropped.
// This captures INTEREST only — no account, credits, or model generation happens
// here. Unico3D itself (designs, the 3D engine, STL export) lives in the unico-os
// monorepo at unicoos.app/unico3d.
// The UnicoOS lead inbox (S14) accepts unico3d from unico-os #978 on; before
// that deploy it answers 400 and this channel simply reports false.

type WaitlistBody = {
  email?: string;
  name?: string;
  makes?: string;       // what they make — planning only
  source?: string;
  page?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.UNICO_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown", disable_web_page_preview: true }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function notifyResend(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.UNICO3D_LEAD_EMAIL || process.env.UNIRO_LEAD_EMAIL || "unico@e1unico.com";
  const from = process.env.UNIRO_LEAD_FROM || "Unico3D <uniro@e1unico.com>";
  if (!key) return false;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function notifyWebhook(payload: object) {
  const url = process.env.UNICO3D_WAITLIST_WEBHOOK || process.env.UNIRO_LEAD_WEBHOOK;
  if (!url) return false;
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return r.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as WaitlistBody;
  const email = (body.email || "").trim().slice(0, 160);
  const name = (body.name || "").trim().slice(0, 120);
  const makes = (body.makes || "").trim().slice(0, 120);
  const page = (body.page || "/unico3d").slice(0, 200);
  const source = (body.source || "unico3d-waitlist").slice(0, 80);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const when = new Date().toISOString();

  const text =
`🧊 *New Unico3D early-access signup*
📧 *Email:* ${email}
👤 *Name:* ${name || "(not provided)"}
🛠 *Makes:* ${makes || "(not provided)"}
📄 *Page:* ${page}
🕒 *When:* ${when}`;

  const html =
`<div style="font-family:system-ui,sans-serif;line-height:1.5">
<h2>🧊 New Unico3D early-access signup</h2>
<p><b>Email:</b> ${email}<br/>
<b>Name:</b> ${name || "<i>(not provided)</i>"}<br/>
<b>Makes:</b> ${makes || "<i>(not provided)</i>"}<br/>
<b>Page:</b> ${page}<br/>
<b>Source:</b> ${source}<br/>
<b>When:</b> ${when}</p>
</div>`;

  const results = await Promise.allSettled([
    notifyTelegram(text),
    notifyResend(`🧊 Unico3D early access — ${email}`, html),
    notifyWebhook({ product: "unico3d", email, name, makes, page, source, when }),
    // UnicoOS lead inbox (S14) — off unless UNICOOS_LEADS_ENABLED=1 + UNICOOS_URL.
    notifyUnicoOS({ product: "unico3d", email, name, source, useCase: makes ? `Makes: ${makes}` : "" }),
  ]);

  const delivered = results.some(r => r.status === "fulfilled" && r.value === true);

  console.log("[unico3d-waitlist]", { email, name, makes, page, source, when, delivered });

  return NextResponse.json({ ok: true, delivered });
}

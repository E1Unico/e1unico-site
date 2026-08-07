import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// UnicoJam early-access waitlist capture.
// Mirrors the Ask Unico lead pipeline: every notify channel is env-gated and
// fires independently, and we always log so a signup is never silently dropped.
// No payment or generation happens here — UnicoJam checkout ($14.99/wk) and the
// ElevenLabs generation engine are gated on human prerequisites (Stripe price
// IDs + ElevenLabs account) and live in the unico-os monorepo, not this site.

type WaitlistBody = {
  email?: string;
  name?: string;
  genres?: string;      // free-text: what they want to make
  useCase?: string;     // artist / creator / church / label / hobby
  source?: string;
  page?: string;
};

// RFC-5322-lite: good enough to reject typos and junk without over-rejecting.
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
  const to = process.env.UNICOJAM_LEAD_EMAIL || process.env.UNIRO_LEAD_EMAIL || "unico@e1unico.com";
  const from = process.env.UNIRO_LEAD_FROM || "UnicoJam <uniro@e1unico.com>";
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
  // Dedicated UnicoJam webhook if set, otherwise reuse the shared lead webhook.
  const url = process.env.UNICOJAM_WAITLIST_WEBHOOK || process.env.UNIRO_LEAD_WEBHOOK;
  if (!url) return false;
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as WaitlistBody;
  const email = (body.email || "").trim().slice(0, 160);
  const name = (body.name || "").trim().slice(0, 120);
  const genres = (body.genres || "").trim().slice(0, 300);
  const useCase = (body.useCase || "").trim().slice(0, 80);
  const page = (body.page || "/unicojam").slice(0, 200);
  const source = (body.source || "unicojam-waitlist").slice(0, 80);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const when = new Date().toISOString();

  const text =
`🎵 *New UnicoJam waitlist signup*
📧 *Email:* ${email}
👤 *Name:* ${name || "(not provided)"}
🎚️ *Wants to make:* ${genres || "(not provided)"}
🧭 *Use case:* ${useCase || "(not provided)"}
📍 *Page:* ${page}
🕒 *When:* ${when}`;

  const html =
`<div style="font-family:system-ui,sans-serif;line-height:1.5">
<h2>🎵 New UnicoJam waitlist signup</h2>
<p><b>Email:</b> ${email}<br/>
<b>Name:</b> ${name || "<i>(not provided)</i>"}<br/>
<b>Wants to make:</b> ${genres || "<i>(not provided)</i>"}<br/>
<b>Use case:</b> ${useCase || "<i>(not provided)</i>"}<br/>
<b>Page:</b> ${page}<br/>
<b>Source:</b> ${source}<br/>
<b>When:</b> ${when}</p>
</div>`;

  const results = await Promise.allSettled([
    notifyTelegram(text),
    notifyResend(`🎵 UnicoJam waitlist — ${email}`, html),
    notifyWebhook({ product: "unicojam", email, name, genres, useCase, page, source, when }),
  ]);

  const delivered = results.some(r => r.status === "fulfilled" && r.value === true);

  // Always log so a signup survives even when no notify channel is configured.
  console.log("[unicojam-waitlist]", { email, name, genres, useCase, page, source, when, delivered });

  return NextResponse.json({ ok: true, delivered });
}

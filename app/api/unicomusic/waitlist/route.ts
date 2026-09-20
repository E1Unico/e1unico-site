import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// UnicoMusic early-access waitlist capture.
// Mirrors the UnicoJam waitlist pipeline: every notify channel is env-gated and
// fires independently, and we always log so a signup is never silently dropped.
// No payment, streaming, or payout happens here — the UnicoMusic catalog, the
// publish-from-UnicoJam pipeline, and the creator ad-revenue share live in the
// unico-os monorepo (gated on human prerequisites), not this marketing site.

type WaitlistBody = {
  email?: string;
  name?: string;
  genres?: string;      // free-text: what they make or love
  role?: string;        // artist / producer / creator / church / label / listener
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
  const to = process.env.UNICOMUSIC_LEAD_EMAIL || process.env.UNIRO_LEAD_EMAIL || "unico@e1unico.com";
  const from = process.env.UNIRO_LEAD_FROM || "UnicoMusic <uniro@e1unico.com>";
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
  // Dedicated UnicoMusic webhook if set, otherwise reuse the shared lead webhook.
  const url = process.env.UNICOMUSIC_WAITLIST_WEBHOOK || process.env.UNIRO_LEAD_WEBHOOK;
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
  const role = (body.role || "").trim().slice(0, 80);
  const page = (body.page || "/unicomusic").slice(0, 200);
  const source = (body.source || "unicomusic-waitlist").slice(0, 80);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const when = new Date().toISOString();

  const text =
`🎧 *New UnicoMusic waitlist signup*
📧 *Email:* ${email}
👤 *Name:* ${name || "(not provided)"}
🎚️ *Makes / loves:* ${genres || "(not provided)"}
🧭 *Role:* ${role || "(not provided)"}
📍 *Page:* ${page}
🕒 *When:* ${when}`;

  const html =
`<div style="font-family:system-ui,sans-serif;line-height:1.5">
<h2>🎧 New UnicoMusic waitlist signup</h2>
<p><b>Email:</b> ${email}<br/>
<b>Name:</b> ${name || "<i>(not provided)</i>"}<br/>
<b>Makes / loves:</b> ${genres || "<i>(not provided)</i>"}<br/>
<b>Role:</b> ${role || "<i>(not provided)</i>"}<br/>
<b>Page:</b> ${page}<br/>
<b>Source:</b> ${source}<br/>
<b>When:</b> ${when}</p>
</div>`;

  const results = await Promise.allSettled([
    notifyTelegram(text),
    notifyResend(`🎧 UnicoMusic waitlist — ${email}`, html),
    notifyWebhook({ product: "unicomusic", email, name, genres, role, page, source, when }),
  ]);

  const delivered = results.some(r => r.status === "fulfilled" && r.value === true);

  // Always log so a signup survives even when no notify channel is configured.
  console.log("[unicomusic-waitlist]", { email, name, genres, role, page, source, when, delivered });

  return NextResponse.json({ ok: true, delivered });
}

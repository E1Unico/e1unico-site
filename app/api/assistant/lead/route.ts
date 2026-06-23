import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  contact?: string;
  problem?: string;
  source?: string;
  page?: string;
  transcript?: { role: string; content: string }[];
};

function summarizeTranscript(transcript?: { role: string; content: string }[]) {
  if (!transcript || !transcript.length) return "";
  return transcript
    .map(m => `[${m.role}] ${m.content}`)
    .join("\n")
    .slice(0, 1200);
}

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.UNICO_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function notifyResend(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.UNIRO_LEAD_EMAIL || "unico@e1unico.com";
  const from = process.env.UNIRO_LEAD_FROM || "UniRo <uniro@e1unico.com>";
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
  const url = process.env.UNIRO_LEAD_WEBHOOK;
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

// Twilio SMS — sends the lead summary to Unico's direct line (281-739-6522 by default).
async function notifyTwilioSms(text: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM || process.env.UNICOOS_TWILIO_NUMBER; // 1-828-678-6426 lives in env
  const to = process.env.LEAD_SMS_TO || "+12817396522"; // Unico's direct line
  if (!sid || !token || !from) return false;
  try {
    const body = new URLSearchParams({ From: from, To: to, Body: text.slice(0, 1500) });
    const auth = Buffer.from(`${sid}:${token}`).toString("base64");
    const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as LeadBody;
  const name = (body.name || "").trim().slice(0, 120);
  const contact = (body.contact || "").trim().slice(0, 160);
  const problem = (body.problem || "").trim().slice(0, 1000);
  const page = (body.page || "/").slice(0, 200);
  const source = (body.source || "uniro-widget").slice(0, 80);
  const transcript = summarizeTranscript(body.transcript);

  if (!name || !contact) {
    return NextResponse.json({ error: "Missing name or contact" }, { status: 400 });
  }

  const when = new Date().toISOString();
  const text =
`✨ *New e1unico.com lead* (Ask Unico widget)
👤 *Name:* ${name}
📞 *Contact:* ${contact}
🧠 *Problem:* ${problem || "(not provided)"}
📍 *Page:* ${page}
🕒 *When:* ${when}
${transcript ? "\n*Recent chat:*\n```\n" + transcript + "\n```" : ""}`;

  const html =
`<div style="font-family:system-ui,sans-serif;line-height:1.5">
<h2>✨ New e1unico.com lead (Ask Unico widget)</h2>
<p><b>Name:</b> ${name}<br/>
<b>Contact:</b> ${contact}<br/>
<b>Page:</b> ${page}<br/>
<b>Source:</b> ${source}<br/>
<b>When:</b> ${when}</p>
<p><b>Problem:</b><br/>${problem ? problem.replace(/\n/g, "<br/>") : "<i>(not provided)</i>"}</p>
${transcript ? `<p><b>Recent chat:</b></p><pre style="background:#f5f5f5;padding:10px;border-radius:8px;font-size:12px;white-space:pre-wrap">${transcript}</pre>` : ""}
</div>`;

  // Plain-text SMS summary for Twilio (no Markdown).
  const sms =
`✨ e1unico.com lead
${name} · ${contact}
Page: ${page}
Problem: ${problem || "(none)"}
— reply via Telegram or call back.`;

  // Try every available channel — each delivers independently.
  const results = await Promise.allSettled([
    notifyTelegram(text),
    notifyResend(`✨ e1unico.com lead — ${name}`, html),
    notifyTwilioSms(sms),
    notifyWebhook({ name, contact, problem, page, source, when, transcript }),
  ]);

  const delivered = results.some(r => r.status === "fulfilled" && r.value === true);

  // Always log to Vercel runtime logs so leads are never silently dropped.
  // eslint-disable-next-line no-console
  console.log("[ask-unico-lead]", { name, contact, problem, page, source, when, delivered });

  return NextResponse.json({ ok: true, delivered });
}

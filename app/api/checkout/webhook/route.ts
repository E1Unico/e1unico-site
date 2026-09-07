import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

// Stripe Checkout webhook — the only automated trigger that tells the team a
// sale actually happened. The success page promises Unico will reach out
// within 24 hours; this is what makes that promise real for every product in
// app/api/checkout/route.ts's PRICES map (2K Special, UnicoOS plans,
// UnicoCare, career docs, websites, à la carte formation items, etc.).
//
// Requires a webhook endpoint configured in the Stripe Dashboard, pointed at
// /api/checkout/webhook, subscribed to checkout.session.completed, with its
// signing secret set as STRIPE_WEBHOOK_SECRET.

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder");

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
  const to = process.env.SALE_LEAD_EMAIL || process.env.UNIRO_LEAD_EMAIL || "unico@e1unico.com";
  const from = process.env.SALE_LEAD_FROM || process.env.UNIRO_LEAD_FROM || "E1Unico <orders@e1unico.com>";
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

async function notifyTwilioSms(text: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM || process.env.UNICOOS_TWILIO_NUMBER;
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

async function notifyWebhook(payload: object) {
  const url = process.env.SALE_WEBHOOK || process.env.UNIRO_LEAD_WEBHOOK;
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
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    console.error("[checkout-webhook] missing signature header or STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "webhook not configured" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(rawBody, sig, secret);
  } catch (err) {
    console.error("[checkout-webhook] signature verification failed", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const product = session.metadata?.product || "(unknown product)";
  const name = session.customer_details?.name || "(not provided)";
  const email = session.customer_details?.email || "(not provided)";
  const phone = session.customer_details?.phone || "(not provided)";
  const amount = session.amount_total != null ? `$${(session.amount_total / 100).toFixed(2)}` : "(unknown)";
  const recurring = session.mode === "subscription" ? "/mo" : "";
  const when = new Date().toISOString();

  const text =
`💰 *New E1Unico.com sale!*
🛒 *Product:* ${product}
💵 *Amount:* ${amount}${recurring}
👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
🕒 *When:* ${when}
Reach out within 24 hours.`;

  const html =
`<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#05050a;color:white;padding:32px;border-radius:16px;">
  <h2 style="color:#c9a84c;margin-bottom:8px;">💰 New Sale!</h2>
  <p style="color:#9ca3af;margin-bottom:24px;">Someone just paid for <strong style="color:white;">${product}</strong> on E1Unico.com</p>
  <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin-bottom:16px;">
    <h3 style="color:white;margin:0 0 16px;">Customer</h3>
    <p style="margin:4px 0;"><strong style="color:#c9a84c;">Name:</strong> <span style="color:white;">${name}</span></p>
    <p style="margin:4px 0;"><strong style="color:#c9a84c;">Email:</strong> <span style="color:white;">${email}</span></p>
    <p style="margin:4px 0;"><strong style="color:#c9a84c;">Phone:</strong> <span style="color:white;">${phone}</span></p>
  </div>
  <div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:20px;">
    <h3 style="color:#c9a84c;margin:0 0 8px;">Order</h3>
    <p style="margin:4px 0;color:white;"><strong>${product}</strong> — ${amount}${recurring}</p>
  </div>
  <p style="color:#6b7280;font-size:12px;margin-top:24px;">Reach out to ${name} within 24 hours at <a href="mailto:${email}" style="color:#c9a84c;">${email}</a> or <a href="tel:${phone.replace(/\D/g, "")}" style="color:#c9a84c;">${phone}</a></p>
</div>`;

  const sms =
`💰 New sale: ${product} — ${amount}${recurring}
${name} · ${email}
${phone}
Reach out within 24 hours.`;

  const results = await Promise.allSettled([
    notifyTelegram(text),
    notifyResend(`💰 New order — ${product} (${amount}${recurring})`, html),
    notifyTwilioSms(sms),
    notifyWebhook({ product, amount, name, email, phone, mode: session.mode, sessionId: session.id, when }),
  ]);

  const delivered = results.some(r => r.status === "fulfilled" && r.value === true);

  // Always log to Vercel runtime logs so a sale is never silently dropped.
  // eslint-disable-next-line no-console
  console.log("[checkout-webhook] sale", { product, amount, email, delivered });

  return NextResponse.json({ received: true, delivered });
}

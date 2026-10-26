import { NextRequest, NextResponse } from "next/server";
import {
  clientIp, createLimiter, escapeHtml, forSaleHostsFromEnv, matchForSaleHost, offerText, parseOffer, renderMessagePage, usd,
} from "../../../lib/for-sale";

export const runtime = "nodejs";

// Offers for the "for sale" domains (2026-10-26). Same private channels the site's other forms use,
// each switched on by its own settings and failing on its own:
//   - Telegram, to the owner's chat (TELEGRAM_BOT_TOKEN + UNICO_TELEGRAM_CHAT_ID);
//   - email, only when RESEND_API_KEY and FOR_SALE_OFFER_TO are both set (the address lives in the
//     environment, never in code).
// Nothing is ever sent TO the person making the offer (no confirmation email, no auto-reply), so
// nothing about the owner reaches them. Only a listed domain's own pages may post here.

const perPerson = createLimiter(5, 60 * 60 * 1000);
const overall = createLimiter(120, 60 * 60 * 1000);

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.UNICO_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function notifyEmail(subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.FOR_SALE_OFFER_TO;
  if (!key || !to) return false;
  const from = process.env.FOR_SALE_OFFER_FROM || process.env.UNIRO_LEAD_FROM || "Domain offers <uniro@e1unico.com>";
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ from, to, subject, html: `<pre style="font:14px/1.5 system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>` }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const site = matchForSaleHost(req.headers.get("host"), forSaleHostsFromEnv());
  if (!site) return NextResponse.json({ error: "Not found." }, { status: 404 });

  // Only this domain's own page may post: a browser sends Origin on a form post.
  const origin = req.headers.get("origin");
  if (origin) {
    let originHost = "";
    try { originHost = new URL(origin).host; } catch { /* leave empty */ }
    if (matchForSaleHost(originHost, [site]) === null) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  }

  const wantsJson = (req.headers.get("content-type") || "").includes("application/json");
  const reply = (status: number, ok: boolean, text: string) =>
    wantsJson
      ? NextResponse.json(ok ? { ok: true } : { error: text }, { status })
      : new Response(renderMessagePage(site, ok ? "Thank you" : "Not sent", text), {
          status,
          headers: { "Content-Type": "text/html; charset=utf-8", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" },
        });

  const ip = clientIp(req.headers);
  if (!perPerson.hit(ip) || !overall.hit("all")) return reply(429, false, "Too many offers from this connection. Please try again later.");

  let body: unknown;
  try {
    body = wantsJson ? await req.json() : Object.fromEntries((await req.formData()).entries());
  } catch {
    return reply(400, false, "Please fill in the form and try again.");
  }
  const parsed = parseOffer(body);
  if (!parsed.ok) {
    if (parsed.silent) return reply(200, true, "Thank you. Your offer was sent.");
    return reply(400, false, parsed.error);
  }

  const when = new Date().toISOString();
  const text = offerText(site.display, parsed.offer, when);
  const results = await Promise.allSettled([
    notifyTelegram(`💰 ${text}`),
    notifyEmail(`Offer ${usd(parsed.offer.amount)} for ${site.display}`, text),
  ]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

  // The log keeps the offer, so one that could not be delivered is never lost.
  console.log("[forsale-offer]", { domain: site.host, amount: parsed.offer.amount, email: parsed.offer.email, message: parsed.offer.message, delivered, when });

  if (!delivered) return reply(503, false, "We could not send your offer right now. Please try again in a little while.");
  return reply(200, true, "Thank you. Your offer was sent. If it is a fit, you will get a reply at the email you gave.");
}

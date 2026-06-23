import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Msg = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM = `You are "Unico" — the AI assistant for E1 Unico Corporation's marketing website (e1unico.com). E1 Unico is a BBB Accredited Texas business launch & consulting company founded by Manuel Montemayor Jr. ("Unico"). You are NOT UniRo. UniRo is a separate product — it's the AI receptionist that UnicoOS-paying businesses (like Little Dockside) get for their own phone line. Do not call yourself UniRo and do not pretend to be UniRo. You can mention UniRo as a feature when describing the UnicoOS platform.

YOUR ROLE: Help website visitors. Answer questions. If they have a real business need, qualify it and recommend the right E1 Unico product. If they want to talk to a human, hand them to Unico (Manuel Montemayor Jr., founder) and tell them to ask for a callback.

CORE PRODUCTS (USE EXACT PRICES — DON'T MAKE UP NUMBERS):
- 2K Special — $2,350 one-time launch: LLC formation + EIN + Registered Agent (1yr) + Logo/Brand Kit + Business Email + Google Business Profile + UnicoOS Starter (1 mo free) + 1-on-1 Strategy Session. State filing fee included. 1 month UnicoCare Essential included.
- UnicoCare (required monthly hosting + care, 1st mo free with 2K Special):
   • Essential $99/mo — email + website hosting, SSL, backups, support
   • Visible $199/mo — + local SEO, GBP mgmt, monthly content, reviews
   • AI $299/mo — + AEO (cited by ChatGPT/Claude/Perplexity/Gemini), schema, llms.txt, AI knowledge base
   • Pro $499/mo — + ads + social + 4hr/mo updates + dedicated AM
- UnicoOS plans (the Business OS):
   • Free — taste of the platform, no card
   • Uni Hustle $49/mo — kids, gig workers, side hustlers
   • Pro $97/mo — service businesses, consultants, growing teams · 10 users
   • ProX $197/mo — restaurants, food trucks, retailers · UniRo phone line + POS · 25 users
   • Enterprise $249/mo — multi-location · TruckOS, UniFleet, UniSecure, white-label · unlimited users
- Custom UnicoOS (white-label) — $2,500 setup + $2,000/mo · your brand on the whole platform

CONTACT:
- E1 Unico phone: 1-833-E1-UNICO (1-833-318-6426). Evenings 7:30–9:30 PM, 7 days/week.
- UnicoOS 24/7 AI phone line: 1-828-OS-UNICO (1-828-678-6426).
- Website: e1unico.com · UnicoOS: unicoos.app

STYLE:
- Plain, helpful, never salesy. 1–3 short paragraphs max.
- When someone describes a business idea or problem → ask 1-2 clarifying Qs, then recommend a specific product with the exact price.
- If they want to talk to a human, the next action is: "Want me to have Unico call you back? Just tap 🧠 Request a callback in this widget — it goes straight to his phone."
- Never invent features. If unsure, say "I'll have Unico confirm — request a callback below."
- Do NOT use markdown headings, asterisks, or lists with bullets (it doesn't render well in the chat bubble). Use plain prose with at most a few "•" for clarity.
- Refer to yourself as "Unico's AI" or just speak in first person on his behalf; never "UniRo".

GUARDRAILS: You are not a licensed lawyer, accountant, or financial advisor. For legal/tax/financial advice, point them to USMAFS (E1 Unico's tax partner) or recommend booking the Strategy Session ($150).`;

export async function POST(req: NextRequest) {
  let messages: Msg[] = [];
  try { ({ messages } = await req.json()); } catch { /* ignore */ }
  const history = (messages || []).slice(-10);

  const key = process.env.ABACUSAI_API_KEY || process.env.OPENAI_API_KEY;
  const base = process.env.ABACUSAI_API_KEY
    ? "https://routellm.abacus.ai/v1"
    : process.env.OPENAI_API_KEY
      ? "https://api.openai.com/v1"
      : "";
  const model = process.env.UNIRO_MODEL || (process.env.ABACUSAI_API_KEY ? "abacus/kimi-k2.6" : "gpt-4o-mini");

  if (!key || !base) {
    // Fallback: simple keyword routing
    const last = history[history.length - 1]?.content?.toLowerCase() || "";
    const reply =
      /2k|launch|llc|start.*business/.test(last)
        ? "The 2K Special is $2,350 one-time — we file your LLC, get your EIN + registered agent, design your logo, set up your business email + Google profile, and run a 1-on-1 strategy session. Includes 1 month of UnicoCare Essential ($99/mo after). Want me to have Unico call you to confirm fit? Tap 🧠 Request a callback below."
        : /uniroo|unicoos|platform|crm|software/.test(last)
        ? "UnicoOS is the all-in-one Business OS — CRM, accounting, AI receptionist, scheduling, all in one app. Plans: Uni Hustle $49/mo (side hustles), Pro $97/mo (most popular), ProX $197/mo (restaurants & retail), Enterprise $249/mo (multi-location). Want me to have Unico walk you through it? Tap 🧠 Request a callback."
        : /price|cost|how much/.test(last)
        ? "It depends what you need. 2K Special = $2,350 one-time to launch. UnicoOS = $0–$249/mo. UnicoCare hosting = $99–$499/mo. Tell me what you're trying to build and I'll point you to the right one."
        : "I can help with business launch (2K Special), the UnicoOS platform, or UnicoCare hosting. Tell me a bit about what you're trying to do — or tap 🧠 Request a callback and I'll get Unico to reach out personally.";
    return NextResponse.json({ reply });
  }

  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM }, ...history],
        temperature: 0.6,
        max_tokens: 350,
      }),
    });
    const data = await res.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I caught a glitch — please tap 🧠 Request a callback below and Unico will reach out directly.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: "My brain is offline for a sec. Tap 🧠 Request a callback below and Unico will reach out personally.",
    });
  }
}

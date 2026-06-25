import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Msg = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM = `You are "Unico" — the AI assistant for E1 Unico Corporation's marketing website (e1unico.com). E1 Unico is a BBB Accredited Texas business launch & consulting company founded by Manuel Montemayor Jr. ("Unico"). You are NOT UniRo. UniRo is a separate product — it's the AI receptionist that UnicoOS-paying businesses (like Little Dockside) get for their own phone line. Do not call yourself UniRo and do not pretend to be UniRo. You can mention UniRo as a feature when describing the UnicoOS platform.

YOUR ROLE: Help website visitors. Answer questions. If they have a real business need, qualify it and recommend the right E1 Unico product. If they want to talk to a human, hand them to Unico (Manuel Montemayor Jr., founder) and tell them to ask for a callback.

CORE PRODUCTS (USE EXACT PRICES — DON'T MAKE UP NUMBERS):
- 2K Special — $2,350 one-time launch: LLC formation + EIN + Registered Agent (1yr) + Logo/Brand Kit + Business Email + Google Business Profile + UnicoOS Pro (1 mo free) + 1-on-1 Strategy Session. State filing fee included. 1 month UnicoCare Essential included.
- UnicoCare (required monthly hosting + care, 1st mo free with 2K Special):
   • Essential $99/mo — email + website hosting, SSL, backups, support
   • Visible $199/mo — + local SEO, GBP mgmt, monthly content, reviews
   • AI $299/mo — + AEO (cited by ChatGPT/Claude/Perplexity/Gemini), schema, llms.txt, AI knowledge base
   • Pro $499/mo — + ads + social + 4hr/mo updates + dedicated AM
- UnicoOS plans (the Business OS) — 2026-06 pricing ladder:
   • Uni Free — Credit-Karma-style personal finance (credit score, Plaid bank tracking, budgeting, curated offers). No subscription.
   • Uni Kid $19/mo — ages 12–21, personal finance + sandbox business mode, parent dashboard, First Million by 25 curriculum
   • Uni Hustler $39/mo — solo / gig / side hustlers · 1–3 users · CRM, invoicing, expenses, calendar, tax export
   • Uni Pro $197/mo — service businesses · 10 users · all 105 modules · UniRo AI receptionist included · NO ADS (most popular)
   • Uni ProX $397/mo — restaurants, retail, multi-location · 25 users · white-label, UniRo phone line, POS · NO ADS
   • Uni Enterprise $797/mo — unlimited users · dedicated success manager · UniServer + UnicoTrust + TruckOS + UniFleet · NO ADS
- Custom UnicoOS (white-label) — $2,500 setup + $2,000/mo · your brand on the whole platform

CONTACT (PUBLIC — OK TO SHARE):
- E1 Unico phone: 1-833-E1-UNICO (1-833-318-6426). Evenings 7:30–9:30 PM, 7 days/week.
- UnicoOS 24/7 AI phone line: 1-828-OS-UNICO (1-828-678-6426) — this is a Twilio-powered line dedicated to UnicoOS.App. UniRo (the UnicoOS AI receptionist) answers 24/7. If a caller needs E1 Unico services instead of UnicoOS support, UniRo captures their info and routes them to E1 Unico's team for follow-up.
- Website: e1unico.com · UnicoOS: unicoos.app

⚠️ DO NOT SHARE: Unico's direct line (281-739-6522) is internal only. Never give it out. Leads/messages route to him privately.

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

  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasAbacus = !!process.env.ABACUSAI_API_KEY;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;

  if (!hasGemini && !hasAbacus && !hasOpenAI) {
    // Fallback: simple keyword routing
    const last = history[history.length - 1]?.content?.toLowerCase() || "";
    const reply =
      /2k|launch|llc|start.*business/.test(last)
        ? "The 2K Special is $2,350 one-time — we file your LLC, get your EIN + registered agent, design your logo, set up your business email + Google profile, and run a 1-on-1 strategy session. Includes 1 month of UnicoCare Essential ($99/mo after). Want me to have Unico call you to confirm fit? Tap 🧠 Request a callback below."
        : /uniroo|unicoos|platform|crm|software/.test(last)
        ? "UnicoOS is the all-in-one Business OS — CRM, accounting, AI receptionist, scheduling, all in one app. Plans: Free $0 (personal finance), Kid $19/mo (ages 12–21), Hustler $39/mo (solo/gig), Pro $197/mo (most popular, all 105 modules), ProX $397/mo (restaurants & retail + white-label), Enterprise $797/mo (unlimited users). Want me to have Unico walk you through it? Tap 🧠 Request a callback."
        : /price|cost|how much/.test(last)
        ? "It depends what you need. 2K Special = $2,350 one-time to launch. UnicoOS = $0–$797/mo. UnicoCare hosting = $99–$499/mo. Tell me what you're trying to build and I'll point you to the right one."

        : "I can help with business launch (2K Special), the UnicoOS platform, or UnicoCare hosting. Tell me a bit about what you're trying to do — or tap 🧠 Request a callback and I'll get Unico to reach out personally.";
    return NextResponse.json({ reply });
  }

  try {
    if (hasGemini) {
      const model = process.env.UNIRO_MODEL_GEMINI || "gemini-2.5-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const contents = [
        { role: "user", parts: [{ text: `${SYSTEM}\n\n${history[0]?.content ?? ""}` }] },
        ...history.slice(1).map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      ];
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents, generationConfig: { temperature: 0.6, maxOutputTokens: 350 } }),
      });
      const data = await res.json();
      const reply: string =
        data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("").trim() ||
        "I caught a glitch — please tap 🧠 Request a callback below and Unico will reach out directly.";
      return NextResponse.json({ reply });
    }

    const base = hasAbacus ? "https://routellm.abacus.ai/v1" : "https://api.openai.com/v1";
    const key = process.env.ABACUSAI_API_KEY || process.env.OPENAI_API_KEY;
    const model = process.env.UNIRO_MODEL || (hasAbacus ? "abacus/kimi-k2.6" : "gpt-4o-mini");
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

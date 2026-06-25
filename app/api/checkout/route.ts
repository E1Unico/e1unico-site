import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder");

const PRICES: Record<string, { mode: "payment" | "subscription"; line_items: { price: string; quantity: number }[] }> = {
  // ── Flagship ──────────────────────────────────────────────────────────
  "2k-special":             { mode: "payment",      line_items: [{ price: "price_1TgcFVJS6gY9XerPHWqeMkAr", quantity: 1 }] }, // $2,350
  "custom-unicoos":         { mode: "payment",      line_items: [{ price: "price_1Tgbz9JS6gY9XerPKGp2E4ex", quantity: 1 }, { price: "price_1TgbzAJS6gY9XerPleAaAZ2y", quantity: 1 }] }, // $2,500 setup + $2,000/mo
  // ── Business Launch À La Carte ─────────────────────────────────────────
  "llc-formation":          { mode: "payment",      line_items: [{ price: "price_1TgcFUJS6gY9XerPkRbsMxwI", quantity: 1 }] }, // $649 incl state fee
  "ein-only":               { mode: "payment",      line_items: [{ price: "price_1TgcFVJS6gY9XerP7Uz7Rs64", quantity: 1 }] }, // $149
  "logo-brand-kit":         { mode: "payment",      line_items: [{ price: "price_1TgcLeJS6gY9XerPRahFi4Xy", quantity: 1 }] }, // $597
  "google-business":        { mode: "payment",      line_items: [{ price: "price_1TgcLfJS6gY9XerP5rsiTwI5", quantity: 1 }] }, // $297
  "social-media-setup":     { mode: "payment",      line_items: [{ price: "price_1TgcLfJS6gY9XerPabWY1lKo", quantity: 1 }] }, // $397
  "strategy-session":       { mode: "payment",      line_items: [{ price: "price_1TgcLeJS6gY9XerPyeTGFkVp", quantity: 1 }] }, // $297
  "consulting-retainer":    { mode: "subscription", line_items: [{ price: "price_1TgcLfJS6gY9XerPXfYdgh3w", quantity: 1 }] }, // $797/mo
  // ── Website Services ──────────────────────────────────────────────────
  "landing-page":           { mode: "payment",      line_items: [{ price: "price_1TgcLgJS6gY9XerPUEPsyKMr", quantity: 1 }] }, // $597
  "website-5-pages":        { mode: "payment",      line_items: [{ price: "price_1TgcLgJS6gY9XerPD7maOvFh", quantity: 1 }] }, // $1,197
  "website-10-pages":       { mode: "payment",      line_items: [{ price: "price_1TgcLhJS6gY9XerP3sIIs68S", quantity: 1 }] }, // $1,997
  "ecommerce-website":      { mode: "payment",      line_items: [{ price: "price_1TgcLhJS6gY9XerPz59ZRs17", quantity: 1 }] }, // $2,997
  "website-redesign":       { mode: "payment",      line_items: [{ price: "price_1TgcLiJS6gY9XerPiVORxcm1", quantity: 1 }] }, // $1,197
  "website-copywriting":    { mode: "payment",      line_items: [{ price: "price_1TgcLiJS6gY9XerPbedzS8wO", quantity: 1 }] }, // $1,497
  "website-seo":            { mode: "payment",      line_items: [{ price: "price_1TgcLiJS6gY9XerPxpehIOXg", quantity: 1 }] }, // $1,197
  "full-digital-package":   { mode: "payment",      line_items: [{ price: "price_1TgcLjJS6gY9XerPH9D0qqGU", quantity: 1 }] }, // $3,497
  "website-starter":        { mode: "payment",      line_items: [{ price: "price_1Tgc42JS6gY9XerPCEsJuOu1", quantity: 1 }] }, // $499
  "website-hosting":        { mode: "subscription", line_items: [{ price: "price_1TgcLlJS6gY9XerPNCwtZxf2", quantity: 1 }] }, // $147/mo
  "pro-hosting":            { mode: "subscription", line_items: [{ price: "price_1Tgc9MJS6gY9XerPg4gKEEYB", quantity: 1 }] }, // $197/mo
  "ecommerce-hosting":      { mode: "subscription", line_items: [{ price: "price_1Tgc9MJS6gY9XerPffUBXd5Y", quantity: 1 }] }, // $247/mo
  "website-care":           { mode: "subscription", line_items: [{ price: "price_1Tgc9NJS6gY9XerP3gGlWRRn", quantity: 1 }] }, // $97/mo
  "unicoos-website-bundle": { mode: "payment",      line_items: [{ price: "price_1TgcLjJS6gY9XerPCtfvNBP0", quantity: 1 }] }, // $2,497
  // ── UnicoCare (required monthly hosting + care plans; 1st month included with 2K Special) ──
  "unicocare-essential":    { mode: "subscription", line_items: [{ price: "price_1TlXt2JS6gY9XerPydmDx2FN", quantity: 1 }] }, // $99/mo
  "unicocare-visible":      { mode: "subscription", line_items: [{ price: "price_1TlXt3JS6gY9XerPpRIjwsIa", quantity: 1 }] }, // $199/mo
  "unicocare-ai":           { mode: "subscription", line_items: [{ price: "price_1TlXt3JS6gY9XerPy8EoLo1E", quantity: 1 }] }, // $299/mo
  "unicocare-pro":          { mode: "subscription", line_items: [{ price: "price_1TlXt4JS6gY9XerPD2OQOZLN", quantity: 1 }] }, // $499/mo
  // ── Career & Documents ────────────────────────────────────────────────
  "career-bundle":          { mode: "payment",      line_items: [{ price: "price_1TgcLkJS6gY9XerPcJg8TiGm", quantity: 1 }] }, // $497
  "resume-writing":         { mode: "payment",      line_items: [{ price: "price_1Tgc77JS6gY9XerPwg3rgHvq", quantity: 1 }] }, // $149
  "cover-letter":           { mode: "payment",      line_items: [{ price: "price_1Tgc77JS6gY9XerPSNEwvLXM", quantity: 1 }] }, // $79
  "resume-cover-bundle":    { mode: "payment",      line_items: [{ price: "price_1Tgc77JS6gY9XerP02mVtIdq", quantity: 1 }] }, // $199
  "linkedin-optimization":  { mode: "payment",      line_items: [{ price: "price_1Tgc78JS6gY9XerPydNzWEHL", quantity: 1 }] }, // $129
  "thank-you-letter":       { mode: "payment",      line_items: [{ price: "price_1TgcLkJS6gY9XerPCEFGrhBz", quantity: 1 }] }, // $79
  "bio-writing":            { mode: "payment",      line_items: [{ price: "price_1Tgc79JS6gY9XerPAsjeR928", quantity: 1 }] }, // $99
  "reference-letter":       { mode: "payment",      line_items: [{ price: "price_1TgcLlJS6gY9XerPXqiEiwpp", quantity: 1 }] }, // $97
  "resume-review":          { mode: "payment",      line_items: [{ price: "price_1TgcLkJS6gY9XerPEQTJrK7O", quantity: 1 }] }, // $97
  // ── UnicoOS Plans ────────────────────────────────────────────────────
  // 2026-06 ladder. Each tier uses STRIPE_PRICE_<SLUG>_2026 if set (after
  // unico-os/scripts/stripe-pricing-2026-06.ts is run against live Stripe),
  // otherwise falls back to the closest legacy hardcoded price ID so existing
  // checkout links don't break in the meantime.
  "unicoos-kid":            { mode: "subscription", line_items: [{ price: process.env.STRIPE_PRICE_KID_2026         || "",                                  quantity: 1 }] }, // $19/mo (new tier; no legacy fallback)
  "unicoos-hustler":        { mode: "subscription", line_items: [{ price: process.env.STRIPE_PRICE_HUSTLER_2026     || "price_1TlcPJJS6gY9XerP8Z04X6ib",       quantity: 1 }] }, // $39/mo (fallback: legacy $49 Uni Hustle)
  "unicoos-pro":            { mode: "subscription", line_items: [{ price: process.env.STRIPE_PRICE_PRO_2026         || "price_1TlcPKJS6gY9XerPxsF9AQ9N",       quantity: 1 }] }, // $197/mo (fallback: legacy $97 Pro)
  "unicoos-prox":           { mode: "subscription", line_items: [{ price: process.env.STRIPE_PRICE_PROX_2026        || "price_1TlcPKJS6gY9XerPd2FiwTB7",       quantity: 1 }] }, // $397/mo (fallback: legacy $197 ProX)
  "unicoos-enterprise":     { mode: "subscription", line_items: [{ price: process.env.STRIPE_PRICE_ENTERPRISE_2026  || "price_1TlcPLJS6gY9XerPEOOGT8vu",       quantity: 1 }] }, // $797/mo (fallback: legacy $249 Enterprise)
  // Legacy aliases (kept so old emails / links don't 404). Existing
  // subscribers stay on their original Stripe subscription — these aliases
  // only matter for *new* checkouts hitting old slugs.
  "unicoos-unihustle":      { mode: "subscription", line_items: [{ price: process.env.STRIPE_PRICE_HUSTLER_2026     || "price_1TlcPJJS6gY9XerP8Z04X6ib",       quantity: 1 }] }, // legacy Uni Hustle → new Hustler
  "unicoos-starter":        { mode: "subscription", line_items: [{ price: process.env.STRIPE_PRICE_PRO_2026         || "price_1TlcPKJS6gY9XerPxsF9AQ9N",       quantity: 1 }] }, // legacy Starter → new Pro
  "unicoos-professional":   { mode: "subscription", line_items: [{ price: process.env.STRIPE_PRICE_PROX_2026        || "price_1TlcPKJS6gY9XerPd2FiwTB7",       quantity: 1 }] }, // legacy Professional → new ProX
};

export async function POST(req: NextRequest) {
  const { product } = await req.json();
  const config = PRICES[product];
  if (!config) return NextResponse.json({ error: "Unknown product" }, { status: 400 });

  const origin = req.headers.get("origin") || "https://e1unico.com";

  const session = await getStripe().checkout.sessions.create({
    mode: config.mode,
    line_items: config.line_items,
    success_url: `${origin}/order/success?product=${product}`,
    cancel_url: `${origin}`,
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    custom_text: {
      submit: { message: "We'll reach out within 24 hours to get started. Questions? Call 1-833-E1-UNICO." },
    },
    metadata: { product, source: "e1unico.com" },
  });

  return NextResponse.json({ url: session.url });
}

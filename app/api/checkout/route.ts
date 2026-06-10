import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder");

const PRICES: Record<string, { mode: "payment" | "subscription"; line_items: Stripe.Checkout.SessionCreateParams.LineItem[] }> = {
  // Flagship services
  "2k-special":             { mode: "payment",      line_items: [{ price: "price_1Tgbz9JS6gY9XerPIR7eNcSj", quantity: 1 }] },
  "custom-unicoos":         { mode: "payment",      line_items: [{ price: "price_1Tgbz9JS6gY9XerPKGp2E4ex", quantity: 1 }, { price: "price_1TgbzAJS6gY9XerPleAaAZ2y", quantity: 1 }] },
  // À la carte services
  "logo-brand-kit":         { mode: "payment",      line_items: [{ price: "price_1Tgc41JS6gY9XerPJAv9aIBx", quantity: 1 }] },
  "llc-formation":          { mode: "payment",      line_items: [{ price: "price_1Tgc41JS6gY9XerP6aTC9tLX", quantity: 1 }] },
  "google-business":        { mode: "payment",      line_items: [{ price: "price_1Tgc41JS6gY9XerPCMY8AIg4", quantity: 1 }] },
  "website-starter":        { mode: "payment",      line_items: [{ price: "price_1Tgc42JS6gY9XerPCEsJuOu1", quantity: 1 }] },
  "website-hosting":        { mode: "subscription", line_items: [{ price: "price_1Tgc42JS6gY9XerPH4qSGXuC", quantity: 1 }] },
  "strategy-session":       { mode: "payment",      line_items: [{ price: "price_1Tgc43JS6gY9XerPYdTCGyXQ", quantity: 1 }] },
  "consulting-retainer":    { mode: "subscription", line_items: [{ price: "price_1Tgc43JS6gY9XerPXh8JkDBh", quantity: 1 }] },
  "social-media-setup":     { mode: "payment",      line_items: [{ price: "price_1Tgc43JS6gY9XerPjdcLqeFF", quantity: 1 }] },
  "unicoos-website-bundle": { mode: "payment",      line_items: [{ price: "price_1Tgc44JS6gY9XerPQRFoZleN", quantity: 1 }] },
  "ein-only":               { mode: "payment",      line_items: [{ price: "price_1Tgc44JS6gY9XerPVu03dgZz", quantity: 1 }] },
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
    custom_text: {
      submit: { message: "We'll reach out within 24 hours to get you started. Questions? Call 1-833-E1-UNICO." },
    },
    metadata: { product, source: "e1unico.com" },
  });

  return NextResponse.json({ url: session.url });
}

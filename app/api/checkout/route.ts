import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder");

const PRICES: Record<string, { mode: "payment" | "subscription"; line_items: Stripe.Checkout.SessionCreateParams.LineItem[] }> = {
  "2k-special": {
    mode: "payment",
    line_items: [{ price: "price_1Tgbz9JS6gY9XerPIR7eNcSj", quantity: 1 }],
  },
  "custom-unicoos": {
    mode: "payment",
    line_items: [
      { price: "price_1Tgbz9JS6gY9XerPKGp2E4ex", quantity: 1 }, // setup fee
      { price: "price_1TgbzAJS6gY9XerPleAaAZ2y", quantity: 1 }, // first month
    ],
  },
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

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, business, notes, product, price } = body;

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Send email via Resend
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (RESEND_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_KEY}` },
      body: JSON.stringify({
        from: "orders@e1unico.com",
        to: ["Unico@E1Unico.com"],
        subject: `🛒 New Order: ${product} — ${price}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#05050a;color:white;padding:32px;border-radius:16px;">
            <h2 style="color:#c9a84c;margin-bottom:8px;">🎉 New Order Received!</h2>
            <p style="color:#9ca3af;margin-bottom:24px;">Someone just ordered <strong style="color:white;">${product}</strong> from E1Unico.com</p>
            
            <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin-bottom:16px;">
              <h3 style="color:white;margin:0 0 16px;">Customer Info</h3>
              <p style="margin:4px 0;"><strong style="color:#c9a84c;">Name:</strong> <span style="color:white;">${name}</span></p>
              <p style="margin:4px 0;"><strong style="color:#c9a84c;">Email:</strong> <span style="color:white;">${email}</span></p>
              <p style="margin:4px 0;"><strong style="color:#c9a84c;">Phone:</strong> <span style="color:white;">${phone}</span></p>
              ${business ? `<p style="margin:4px 0;"><strong style="color:#c9a84c;">Business:</strong> <span style="color:white;">${business}</span></p>` : ""}
              ${notes ? `<p style="margin:4px 0;"><strong style="color:#c9a84c;">Notes:</strong> <span style="color:white;">${notes}</span></p>` : ""}
            </div>

            <div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:20px;">
              <h3 style="color:#c9a84c;margin:0 0 8px;">Order Details</h3>
              <p style="margin:4px 0;color:white;"><strong>${product}</strong> — ${price}</p>
            </div>

            <p style="color:#6b7280;font-size:12px;margin-top:24px;">
              Reach out to ${name} within 24 hours at <a href="mailto:${email}" style="color:#c9a84c;">${email}</a> or <a href="tel:${phone.replace(/\D/g,"")}" style="color:#c9a84c;">${phone}</a>
            </p>
          </div>
        `,
      }),
    });
  }

  return NextResponse.json({ success: true });
}

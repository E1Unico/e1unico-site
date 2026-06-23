import { Metadata } from "next";
import Image from "next/image";
import OrderForm from "./form";

export const metadata: Metadata = {
  title: "Order The 2K Special — E1 Unico Corporation",
  description: "Get your business launched for $2,000. Entity formation, branding, email, Google profile, UnicoOS, and strategy session. BBB Accredited.",
};

const included = [
  { emoji: "📋", title: "Business Entity Formation",   desc: "LLC or Corporation filed with the state" },
  { emoji: "🔢", title: "EIN / Federal Tax ID",         desc: "Ready to open accounts and hire" },
  { emoji: "📍", title: "Registered Agent (1 Year)",    desc: "Your address stays private" },
  { emoji: "🎨", title: "Logo + Brand Kit",             desc: "Professional identity from day one" },
  { emoji: "📧", title: "Business Email",               desc: "you@yourbusiness.com" },
  { emoji: "🗺️", title: "Google Business Profile",     desc: "Show up on Google Maps" },
  { emoji: "💻", title: "UnicoOS Starter — 1 Mo Free", desc: "Run your business from one platform" },
  { emoji: "🧠", title: "1-on-1 Strategy Session",     desc: "Map out your launch plan with us" },
  { emoji: "🛟", title: "UnicoCare Essential — 1 Mo Free", desc: "Email + website hosting, backups, support · then $99/mo" },
];

export default function TwoKSpecialPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", paddingTop: 80 }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>E1 Unico <span style={{ color: "#c9a84c" }}>Corporation</span></span>
        </a>
        <a href="tel:18333186426" style={{ background: "linear-gradient(135deg, #c9a84c, #9a7a2e)", color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none" }}>📞 Call Now</a>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ display: "inline-block", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 999, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Our Signature Service</span>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
            The <span style={{ background: "linear-gradient(135deg, #f0c96e, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>2K Special</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>Everything you need to launch a real business — handled for you. One flat fee.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="lg:grid-cols-2 grid-cols-1">
          {/* What's included */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: "white" }}>What&apos;s Included</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {included.map(item => (
                <div key={item.title} style={{ display: "flex", gap: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 12, padding: "14px 16px" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: "white" }}>{item.title}</p>
                    <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 14, padding: "16px", textAlign: "center" }}>
              <a href="https://www.bbb.org/us/tx/spring/profile/business-consultant/e1-unico-corporation-0915-90076784/" target="_blank" rel="nofollow" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, textDecoration: "none" }}>
                <Image src="https://seal-houston.bbb.org/customer-reviews/badge-10-bbb-90076784.png" alt="BBB" width={50} height={34} style={{ height: 34, width: "auto" }} unoptimized />
                <span style={{ fontSize: 12, color: "#9ca3af" }}>BBB® Accredited Business · Since 2026</span>
              </a>
            </div>
          </div>

          {/* Order form */}
          <div>
            <div style={{ background: "linear-gradient(145deg, rgba(201,168,76,0.12), rgba(79,70,229,0.12))", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 24, padding: "28px 24px" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <p style={{ fontSize: 42, fontWeight: 900, color: "white", lineHeight: 1 }}>$2,350</p>
                <p style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>One flat price · State filing fee included</p>
              </div>
              <OrderForm product="2K Special" price="$2,000" />
              <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.30)", borderRadius: 12 }}>
                <p style={{ fontSize: 12, color: "#a5b4fc", fontWeight: 700, marginBottom: 4 }}>🛟 Includes 1 month UnicoCare Essential</p>
                <p style={{ fontSize: 11.5, color: "#9ca3af", lineHeight: 1.5 }}>
                  Email + website hosting, backups, SSL, and support are included free for your first month. After that, an active <a href="/order/unicocare" style={{ color: "#c9a84c", textDecoration: "underline" }}>UnicoCare plan</a> ($99/mo+) is required so your business stays live and supported. Upgrade anytime for visibility, AI/AEO, or full done-for-you growth.
                </p>
              </div>
              <p style={{ fontSize: 11, color: "#4b5563", textAlign: "center", marginTop: 14 }}>
                We&apos;ll contact you within 24 hours to confirm and get started.<br />
                Evenings 7:30–9:30 PM · 7 days/wk · 1-833-E1-UNICO
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

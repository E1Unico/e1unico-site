import { Metadata } from "next";
import Image from "next/image";
import OrderForm from "../2k-special/form";

export const metadata: Metadata = {
  title: "Order Custom UnicoOS — Your Own Branded Business Platform",
  description: "Get UnicoOS built under your brand. Custom name, logo, domain. $2,500 setup + $2,000/month. E1 Unico Corporation.",
};

const included = [
  { emoji: "🎨", title: "Custom Name, Logo & Colors",      desc: "Your brand on every screen your clients see" },
  { emoji: "🌐", title: "Your Own Domain",                 desc: "yourplatform.com — not ours" },
  { emoji: "🏢", title: "Dedicated Instance",              desc: "Your data, your clients — completely separate" },
  { emoji: "⭐", title: "Full Enterprise Feature Set",     desc: "Every module, every AI tool, unlocked" },
  { emoji: "🤖", title: "UniAgents + UniRo Included",      desc: "AI team and AI receptionist ready to go" },
  { emoji: "🔄", title: "Monthly Updates",                 desc: "As we keep building, you get every new feature" },
  { emoji: "📞", title: "Priority Phone & Chat Support",   desc: "Dedicated support line for you and your clients" },
  { emoji: "🎓", title: "Onboarding & Training Call",      desc: "We get you and your team fully set up" },
];

export default function CustomUnicoOSPage() {
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
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ display: "inline-block", background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.3)", color: "#818cf8", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 999, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>White-Label Platform</span>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
            Custom <span style={{ background: "linear-gradient(135deg, #818cf8, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>UnicoOS</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Your own fully branded Business OS. Your clients log into YOUR platform — not ours.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="lg:grid-cols-2 grid-cols-1">
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: "white" }}>What You Get</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {included.map(item => (
                <div key={item.title} style={{ display: "flex", gap: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(79,70,229,0.2)", borderRadius: 12, padding: "14px 16px" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: "white" }}>{item.title}</p>
                    <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: "linear-gradient(145deg, rgba(79,70,229,0.15), rgba(124,58,237,0.15))", border: "1px solid rgba(79,70,229,0.3)", borderRadius: 24, padding: "28px 24px" }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <p style={{ fontSize: 11, color: "#818cf8", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Investment</p>
                <p style={{ fontSize: 38, fontWeight: 900, color: "white", lineHeight: 1 }}>$2,000<span style={{ fontSize: 16, color: "#6b7280" }}>/mo</span></p>
                <p style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>+ $2,500 one-time setup fee</p>
                <p style={{ color: "#9ca3af", fontSize: 11, marginTop: 4 }}>No contracts · Cancel anytime</p>
              </div>
              <OrderForm product="Custom UnicoOS" price="$2,000/mo + $2,500 setup" />
              <p style={{ fontSize: 11, color: "#4b5563", textAlign: "center", marginTop: 14 }}>
                We&apos;ll reach out within 24 hours to start your custom build.<br />
                1-833-E1-UNICO · Evenings 7:30–9:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

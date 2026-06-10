import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E1 Unico Corporation — All-In-One Business Launch & Consulting",
  description: "BBB Accredited. We launch real businesses. The 2K Special gets you registered, branded, and operating. Call 1-833-E1-UNICO.",
};

const services = [
  { emoji: "📋", title: "Business Entity Formation",  desc: "LLC or Corporation filed with the state — we handle every form" },
  { emoji: "🔢", title: "EIN / Federal Tax ID",        desc: "Your business tax ID, ready to open accounts and hire" },
  { emoji: "📍", title: "Registered Agent (1 Year)",   desc: "Official documents received for you, address stays private" },
  { emoji: "🎨", title: "Logo + Brand Kit",            desc: "Professional logo and brand identity from day one" },
  { emoji: "📧", title: "Business Email",              desc: "you@yourbusiness.com — not a Gmail" },
  { emoji: "🗺️", title: "Google Business Profile",    desc: "Show up on Google Maps, get found by local customers" },
  { emoji: "💻", title: "UnicoOS Starter — 1 Mo Free", desc: "Run your entire business from one platform" },
  { emoji: "🧠", title: "1-on-1 Strategy Session",    desc: "We map out your launch plan together" },
];

const features = [
  "CRM & Sales Pipeline", "AI Agents (6 Specialists)", "UniRo AI Receptionist",
  "UniBook Accounting", "HSE Safety Module", "TruckOS + Fleet",
  "Insurance CRM & Rater", "Restaurant Manager",
  "Equipment Rentals", "UniCredit Score", "UniFleet GPS", "UniGuard Loss Prevention",
];

const stats = [
  { val: "BBB®", label: "Accredited Business" },
  { val: "$2K", label: "Gets You Launched" },
  { val: "7×", label: "Days a Week" },
  { val: "100%", label: "Texas Built" },
];

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#05050a", color: "white" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image src="/e1unico-logo.jpg" alt="E1 Unico Corporation" width={40} height={40}
              style={{ width: 40, height: 40, objectFit: "contain", borderRadius: 10, background: "white", padding: 2 }} />
            <div>
              <p style={{ fontWeight: 900, fontSize: 14, lineHeight: 1, letterSpacing: "0.02em" }}>E1 Unico</p>
              <p style={{ fontSize: 9, color: "#c9a84c", lineHeight: 1, marginTop: 2, fontWeight: 700, letterSpacing: "0.15em" }}>CORPORATION</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a href="https://OS.E1Unico.com" target="_blank" rel="noreferrer"
              style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 14px" }}
              className="hidden sm:block">UnicoOS</a>
            <a href="#services"
              style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 14px" }}
              className="hidden sm:block">Services</a>
            <a href="#contact"
              style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 14px" }}
              className="hidden sm:block">Contact</a>
            <a href="tel:18333186426" className="btn-gold"
              style={{ color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none", display: "inline-block" }}>
              📞 Call Now
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 20px 60px", position: "relative", overflow: "hidden" }}>
        {/* Orbs */}
        <div className="glow-orb" style={{ width: 700, height: 700, background: "#4f46e5", top: "10%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 400, height: 400, background: "#c9a84c", top: "40%", left: "20%" }} />
        <div className="glow-orb glow-orb-3" style={{ width: 350, height: 350, background: "#7c3aed", bottom: "10%", right: "15%" }} />

        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 860 }}>
          {/* BBB pill */}
          <a href="https://www.bbb.org/us/tx/spring/profile/business-consultant/e1-unico-corporation-0915-90076784/" target="_blank" rel="nofollow"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 999, padding: "8px 18px", marginBottom: 32, textDecoration: "none", cursor: "pointer" }}>
            <Image src="https://seal-houston.bbb.org/customer-reviews/badge-10-bbb-90076784.png" alt="BBB" width={40} height={28} style={{ height: 28, width: "auto" }} unoptimized />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#c9a84c" }}>BBB® Accredited Business · E1 Unico Corporation</span>
          </a>

          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div className="pulse-ring" />
              <Image src="/e1unico-logo.jpg" alt="E1 Unico Corporation" width={110} height={110}
                style={{ width: 110, height: 110, objectFit: "contain", borderRadius: 24, background: "white", padding: 8, display: "block" }} />
            </div>
          </div>

          <h1 style={{ fontSize: "clamp(42px, 8vw, 88px)", fontWeight: 900, lineHeight: 1.0, marginBottom: 20, letterSpacing: "-0.03em" }}>
            We Launch<br />
            <span className="gold-text">Real Businesses.</span>
          </h1>

          <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 540, margin: "0 auto 12px", lineHeight: 1.6 }}>
            BBB Accredited · Business Launch & Consulting · Texas Based
          </p>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 44 }}>
            Available evenings <strong style={{ color: "white" }}>7:30–9:30 PM</strong> · 7 days a week · No appointment needed
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 64 }}>
            <a href="#services" className="btn-gold"
              style={{ color: "white", fontWeight: 800, fontSize: 16, padding: "16px 36px", borderRadius: 16, textDecoration: "none", display: "inline-block", boxShadow: "0 8px 40px rgba(201,168,76,0.35)" }}>
              🚀 The 2K Special →
            </a>
            <a href="tel:18333186426"
              style={{ color: "white", fontWeight: 700, fontSize: 16, padding: "16px 32px", borderRadius: 16, textDecoration: "none", display: "inline-block", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
              📞 1-833-E1-UNICO
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 600, margin: "0 auto" }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 8px", textAlign: "center" }}>
                <p className="gold-text" style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: 11, color: "#6b7280", marginTop: 6 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── MARQUEE ── */}
      <div style={{ overflow: "hidden", padding: "18px 0", background: "rgba(201,168,76,0.04)", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 0 }}>
              {["Business Formation", "EIN Setup", "Brand Identity", "Google Business", "Business Email", "UnicoOS Platform", "Strategy Session", "BBB Accredited", "Texas Based", "7 Days a Week"].map(item => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 32px", fontSize: 13, fontWeight: 700, color: "#c9a84c", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                  <span style={{ width: 4, height: 4, background: "#c9a84c", borderRadius: "50%", display: "inline-block" }} />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 2K SPECIAL ── */}
      <section id="services" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Our Signature Service</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              The <span className="gold-text">2K Special</span>
            </h2>
            <p style={{ color: "#6b7280", marginTop: 16, maxWidth: 480, margin: "16px auto 0", fontSize: 15, lineHeight: 1.6 }}>
              One flat fee. Everything to go from idea to operating business.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start" }} className="lg:grid-cols-[1fr_320px] grid-cols-1">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="sm:grid-cols-2 grid-cols-1">
              {services.map((item, i) => (
                <div key={item.title} className="card-lift gold-border" style={{ borderRadius: 16, padding: "18px 20px", background: "rgba(14,14,24,0.8)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{item.emoji}</span>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13, color: "white", marginBottom: 4 }}>{item.title}</p>
                      <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price card */}
            <div style={{ position: "sticky", top: 90 }}>
              <div style={{ borderRadius: 28, padding: "36px 28px", textAlign: "center", background: "linear-gradient(145deg, rgba(201,168,76,0.15), rgba(79,70,229,0.15))", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 0 60px rgba(201,168,76,0.1)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Everything Above For</p>
                <p className="gold-text" style={{ fontSize: 80, fontWeight: 900, lineHeight: 1 }}>$2K</p>
                <p style={{ color: "#6b7280", fontSize: 14, marginTop: 6, marginBottom: 32 }}>One-time · No hidden fees</p>

                <a href="https://e1unico.myshopify.com/products/the-2k-special" target="_blank" rel="noreferrer" className="btn-gold"
                  style={{ display: "block", width: "100%", color: "white", fontWeight: 800, fontSize: 16, padding: "16px", borderRadius: 14, textDecoration: "none", marginBottom: 10, boxShadow: "0 8px 32px rgba(201,168,76,0.3)" }}>
                  🛒 Order Now — $2,000
                </a>
                <a href="tel:18333186426" className="btn-gold"
                  style={{ display: "block", width: "100%", color: "white", fontWeight: 700, fontSize: 14, padding: "13px", borderRadius: 14, textDecoration: "none", marginBottom: 10, opacity: 0.8 }}>
                  📞 Call to Get Started
                </a>
                <a href="mailto:Unico@E1Unico.com"
                  style={{ display: "block", width: "100%", color: "#9ca3af", fontWeight: 600, fontSize: 13, padding: "12px", borderRadius: 14, textDecoration: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  📧 Unico@E1Unico.com
                </a>

                <p style={{ fontSize: 11, color: "#4b5563", marginTop: 16 }}>Evenings 7:30–9:30 PM · 7 days/wk</p>

                <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <a href="https://www.bbb.org/us/tx/spring/profile/business-consultant/e1-unico-corporation-0915-90076784/" target="_blank" rel="nofollow"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, textDecoration: "none" }}>
                    <Image src="https://seal-houston.bbb.org/customer-reviews/badge-10-bbb-90076784.png" alt="BBB" width={48} height={32} style={{ height: 32, width: "auto" }} unoptimized />
                    <span style={{ fontSize: 11, color: "#6b7280" }}>BBB® Accredited 2026</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── UNICOOS ── */}
      <section id="unicoos" style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(79,70,229,0.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <Image src="/unicoos-logo.jpg" alt="UnicoOS" width={56} height={56}
                  style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 14, background: "white", padding: 4 }} />
                <div>
                  <p style={{ fontSize: 22, fontWeight: 900 }}>UnicoOS</p>
                  <p style={{ fontSize: 12, color: "#818cf8", fontWeight: 600 }}>OS.E1Unico.com</p>
                </div>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.02em" }}>
                Your Entire Business.<br />
                <span style={{ background: "linear-gradient(135deg, #818cf8, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  One App.
                </span>
              </h2>
              <p style={{ color: "#9ca3af", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
                UnicoOS is our all-in-one Business Operating System — built by E1 Unico Corporation.
                CRM, invoicing, AI receptionist, safety, fleet, accounting, and more.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 32 }}>
                {features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#d1d5db" }}>
                    <span style={{ width: 6, height: 6, background: "linear-gradient(135deg, #818cf8, #06b6d4)", borderRadius: "50%", flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://OS.E1Unico.com/register" target="_blank" rel="noreferrer" className="btn-indigo"
                  style={{ color: "white", fontWeight: 700, fontSize: 14, padding: "13px 26px", borderRadius: 12, textDecoration: "none", display: "inline-block" }}>
                  🚀 Try Free — 30 Day Trial
                </a>
                <a href="https://OS.E1Unico.com" target="_blank" rel="noreferrer"
                  style={{ color: "white", fontWeight: 600, fontSize: 14, padding: "13px 22px", borderRadius: 12, textDecoration: "none", display: "inline-block", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  Visit OS.E1Unico.com →
                </a>
              </div>
            </div>

            {/* Pricing stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { plan: "Starter",      price: "$97",  color: "#4b5563", glow: false },
                { plan: "Professional", price: "$297", color: "#4f46e5", glow: true,  badge: "Most Popular" },
                { plan: "Enterprise",   price: "$497", color: "#7c3aed", glow: false, badge: "Full Platform" },
              ].map(p => (
                <div key={p.plan} className="card-lift"
                  style={{ borderRadius: 18, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `rgba(${p.glow ? "79,70,229" : "255,255,255"},0.05)`, border: `1px solid rgba(${p.glow ? "79,70,229" : "255,255,255"},${p.glow ? "0.4" : "0.08"})`, boxShadow: p.glow ? "0 0 30px rgba(79,70,229,0.2)" : "none" }}>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 16, color: "white" }}>{p.plan}</p>
                    {p.badge && <span style={{ fontSize: 10, background: p.plan === "Professional" ? "#4f46e5" : "#7c3aed", color: "white", padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>{p.badge}</span>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 28, fontWeight: 900, color: "white", lineHeight: 1 }}>{p.price}</p>
                    <p style={{ fontSize: 11, color: "#6b7280" }}>/month</p>
                  </div>
                </div>
              ))}
              {[
                { plan: "Starter",      price: "$97",  href: "https://OS.E1Unico.com/register?plan=starter" },
                { plan: "Professional", price: "$297", href: "https://OS.E1Unico.com/register?plan=professional" },
                { plan: "Enterprise",   price: "$497", href: "https://OS.E1Unico.com/register?plan=enterprise" },
              ].map(p => (
                <a key={p.plan} href={p.href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, textDecoration: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "white", fontWeight: 600 }}>🚀 Get {p.plan}</span>
                  <span style={{ fontSize: 13, color: "#c9a84c", fontWeight: 800 }}>{p.price}/mo →</span>
                </a>
              ))}
              <a href="https://OS.E1Unico.com/register" target="_blank" rel="noreferrer" className="btn-indigo"
                style={{ display: "block", color: "white", fontWeight: 800, fontSize: 14, padding: "13px", borderRadius: 14, textDecoration: "none", textAlign: "center", marginTop: 4 }}>
                🚀 Or Try Free — No Card Required
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── COMPANIES ── */}
      <section id="companies" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>The E1 Unico Family</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Our Companies</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="sm:grid-cols-2 grid-cols-1">
            {/* E1 Unico */}
            <div className="card-lift gold-border" style={{ borderRadius: 24, padding: "32px 28px", background: "rgba(14,14,24,0.9)" }}>
              <Image src="/e1unico-logo.jpg" alt="E1 Unico Corporation" width={64} height={64} style={{ width: 64, height: 64, objectFit: "contain", borderRadius: 14, background: "white", padding: 6, marginBottom: 20 }} />
              <p style={{ fontWeight: 900, fontSize: 18, color: "white", marginBottom: 4 }}>E1 Unico Corporation</p>
              <p style={{ fontSize: 12, color: "#c9a84c", fontWeight: 600, marginBottom: 14 }}>Business Launch & Consulting · BBB Accredited</p>
              <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>All-in-one business launch. Our 2K Special gets you registered, branded, and operating.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
                <a href="https://e1unico.myshopify.com/products/the-2k-special" target="_blank" rel="noreferrer" className="btn-gold"
                  style={{ color: "white", fontWeight: 700, fontSize: 12, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>🛒 Order Now</a>
                <a href="tel:18333186426" style={{ fontSize: 12, color: "#c9a84c", fontWeight: 700, textDecoration: "none", alignSelf: "center" }}>📞 1-833-E1-UNICO →</a>
              </div>
            </div>

            {/* UnicoOS */}
            <div className="card-lift" style={{ borderRadius: 24, padding: "32px 28px", background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.25)" }}>
              <Image src="/unicoos-logo.jpg" alt="UnicoOS" width={64} height={64} style={{ width: 64, height: 64, objectFit: "contain", borderRadius: 14, background: "white", padding: 6, marginBottom: 20 }} />
              <p style={{ fontWeight: 900, fontSize: 18, color: "white", marginBottom: 4 }}>UnicoOS</p>
              <p style={{ fontSize: 12, color: "#818cf8", fontWeight: 600, marginBottom: 14 }}>Business Operating System · SaaS Platform</p>
              <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>The all-in-one platform to run every part of your business — CRM, AI, accounting, safety, fleet, and more.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
                <a href="https://OS.E1Unico.com/register" target="_blank" rel="noreferrer" className="btn-indigo"
                  style={{ color: "white", fontWeight: 700, fontSize: 12, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>🚀 Try Free</a>
                <a href="https://OS.E1Unico.com" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#818cf8", fontWeight: 700, textDecoration: "none", alignSelf: "center" }}>🌐 OS.E1Unico.com →</a>
              </div>
            </div>

            {/* Industrial Drip */}
            <div className="card-lift" style={{ borderRadius: 24, padding: "32px 28px", background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.25)" }}>
              <Image src="/industrial-drip-logo.jpg" alt="Industrial Drip" width={160} height={60} style={{ height: 52, width: "auto", objectFit: "contain", borderRadius: 10, background: "white", padding: 6, marginBottom: 20 }} />
              <p style={{ fontWeight: 900, fontSize: 18, color: "white", marginBottom: 4 }}>Industrial Drip</p>
              <p style={{ fontSize: 12, color: "#f87171", fontWeight: 600, marginBottom: 14 }}>PPE & Safety Gear · E-Commerce</p>
              <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>Premium personal protective equipment for industrial workers. Shipped fast, priced right.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
                <a href="https://IndustrialDrip.Net" target="_blank" rel="noreferrer"
                  style={{ background: "#b91c1c", color: "white", fontWeight: 700, fontSize: 12, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>🛒 Shop Now</a>
                <a href="https://IndustrialDrip.Net" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#f87171", fontWeight: 700, textDecoration: "none", alignSelf: "center" }}>IndustrialDrip.Net →</a>
              </div>
            </div>

            {/* Custom UnicoOS */}
            <div className="card-lift" style={{ borderRadius: 24, padding: "32px 28px", background: "linear-gradient(145deg, rgba(201,168,76,0.08), rgba(124,58,237,0.08))", border: "1px solid rgba(201,168,76,0.2)" }}>
              <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #c9a84c, #7c3aed)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>🎨</div>
              <p style={{ fontWeight: 900, fontSize: 18, color: "white", marginBottom: 4 }}>Custom UnicoOS</p>
              <p style={{ fontSize: 12, color: "#c9a84c", fontWeight: 600, marginBottom: 14 }}>White-Label Business Platform · From $2,000/mo</p>
              <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>Want your own branded Business OS? We build UnicoOS under your name, logo, and domain. You own it.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
                <a href="https://e1unico.myshopify.com/products/custom-unicoos" target="_blank" rel="noreferrer" className="btn-gold"
                  style={{ color: "white", fontWeight: 700, fontSize: 12, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>🛒 Order Now</a>
                <a href="tel:18333186426" style={{ fontSize: 12, color: "#c9a84c", fontWeight: 700, textDecoration: "none", alignSelf: "center" }}>📞 Call →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 20px", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 600, height: 600, background: "#c9a84c", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.06 }} />

        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Ready to Start?</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Let&apos;s Build<br /><span className="gold-text">Your Empire.</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 48, lineHeight: 1.6 }}>
            We&apos;re available every evening, 7 days a week.<br />No appointment. No waiting. Just call.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 44 }} className="sm:grid-cols-3 grid-cols-1">
            {[
              { icon: "📞", label: "Phone",  value: "1-833-E1-UNICO", sub: "1-833-318-6426",    href: "tel:18333186426" },
              { icon: "📧", label: "Email",  value: "Unico@E1Unico.com", sub: "Fast response", href: "mailto:Unico@E1Unico.com" },
              { icon: "🕗", label: "Hours",  value: "7:30–9:30 PM",  sub: "Every day",          href: null },
            ].map(c => (
              <div key={c.label} className="gold-border card-lift" style={{ borderRadius: 18, padding: "24px 16px", background: "rgba(14,14,24,0.8)" }}>
                <p style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</p>
                <p style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>{c.label}</p>
                {c.href ? (
                  <a href={c.href} style={{ fontWeight: 700, fontSize: 13, color: "white", textDecoration: "none", display: "block", marginBottom: 4 }}>{c.value}</a>
                ) : (
                  <p style={{ fontWeight: 700, fontSize: 13, color: "white", marginBottom: 4 }}>{c.value}</p>
                )}
                <p style={{ fontSize: 11, color: "#4b5563" }}>{c.sub}</p>
              </div>
            ))}
          </div>

          <a href="tel:18333186426" className="btn-gold"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, color: "white", fontWeight: 900, fontSize: 20, padding: "20px 48px", borderRadius: 20, textDecoration: "none", boxShadow: "0 12px 50px rgba(201,168,76,0.4)" }}>
            📞 1-833-E1-UNICO
          </a>

          <div style={{ marginTop: 48 }}>
            <a href="https://www.bbb.org/us/tx/spring/profile/business-consultant/e1-unico-corporation-0915-90076784/" target="_blank" rel="nofollow"
              style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: "12px 24px", textDecoration: "none" }}>
              <Image src="https://seal-houston.bbb.org/customer-reviews/badge-10-bbb-90076784.png" alt="BBB" width={56} height={38} style={{ height: 38, width: "auto" }} unoptimized />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "white" }}>BBB® Accredited Business</p>
                <a href="https://www.bbb.org/houston/customer-reviews/business-consultant/e1-unico-corporation-in-spring-tx-90076784/add/" target="_blank" rel="nofollow"
                  style={{ fontSize: 10, color: "#c9a84c", textDecoration: "none", fontWeight: 600 }}>Leave a BBB Review →</a>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 24px", marginBottom: 16, fontSize: 12, color: "#4b5563" }}>
            <a href="https://OS.E1Unico.com" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>UnicoOS →</a>
            <a href="https://IndustrialDrip.Net" target="_blank" rel="noreferrer" style={{ color: "#f87171", textDecoration: "none", fontWeight: 600 }}>IndustrialDrip.Net →</a>
            <a href="tel:18333186426" style={{ color: "#c9a84c", textDecoration: "none", fontWeight: 600 }}>1-833-E1-UNICO</a>
            <a href="mailto:Unico@E1Unico.com" style={{ color: "#c9a84c", textDecoration: "none", fontWeight: 600 }}>Unico@E1Unico.com</a>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 E1 Unico Corporation · BBB® Accredited · Texas · Building the Empire 🦅</p>
        </div>
      </footer>

    </main>
  );
}

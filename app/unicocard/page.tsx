import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UnicoCard — One Tap. Everything You Do. | Smart NFC Business Card",
  description:
    "UnicoCard is the tap-to-share smart business card from E1 Unico. One tap sends your contact and links to any phone, captures the lead, and shows you the analytics — all inside UnicoOS. Built to grow into your Unico Mobile eSIM and identity, too.",
  openGraph: {
    title: "UnicoCard — One Tap. Everything You Do.",
    description: "Tap-to-share smart business card: share your contact & links, capture leads, track taps. Part of the UnicoOS ecosystem.",
  },
  alternates: { canonical: "/unicocard" },
};

const HOW = [
  { emoji: "👆", title: "Tap to share", desc: "Tap your UnicoCard to any phone — no app needed on their end — and your contact card, links, and offers load instantly." },
  { emoji: "🧲", title: "Capture the lead", desc: "Turn a handshake into a saved lead: their details land in your UnicoOS contacts, ready to follow up automatically." },
  { emoji: "📊", title: "See what works", desc: "Every tap is tracked. Know which cards, events, and links actually drive leads — right from your dashboard." },
];

// Kept qualitative on purpose — no competitor prices/specs we can't stand behind.
const COMPARE: { feature: string; unicocard: string; others: string }[] = [
  { feature: "Update your info anytime", unicocard: "Change once — every card is current", others: "Reprint the whole batch" },
  { feature: "Turns a tap into a lead", unicocard: "Straight into your UnicoOS CRM", others: "They lose the paper card" },
  { feature: "Analytics", unicocard: "See every tap and what converts", others: "None" },
  { feature: "Runs with your business tools", unicocard: "Inside UnicoOS — one login", others: "A standalone gadget" },
  { feature: "Grows with you", unicocard: "Roadmap: eSIM + identity + payments", others: "Just a card" },
];

const ROADMAP = [
  { emoji: "📶", title: "Provision your Unico Mobile eSIM", desc: "Tap your UnicoCard to load a Unico Mobile line onto your phone — no plastic SIM to chase. (Coming with Unico Mobile.)" },
  { emoji: "🪪", title: "Carry your identity", desc: "An identity applet alongside your contact card, so your UnicoCard becomes the one thing you hand over." },
  { emoji: "💳", title: "Payments, later", desc: "A payment layer riding on the same card — distribution, identity, and money in one tap." },
];

const FAQ: { q: string; a: string }[] = [
  { q: "What is UnicoCard?", a: "It's a smart, tap-to-share business card. One tap on any phone shares your contact details and links, saves the other person as a lead in your UnicoOS CRM, and records the tap so you can see what's working." },
  { q: "Does the other person need an app?", a: "No. UnicoCard uses NFC — the same tap-to-pay technology most phones already have. They just tap and your info opens in their browser." },
  { q: "Where do my leads and analytics live?", a: "Inside UnicoOS, alongside the rest of your business — contacts, follow-ups, and tap analytics in one place, under one login." },
  { q: "Can I change what my card shares?", a: "Yes — update your details or links once and every tap serves the latest version. No reprinting." },
  { q: "How does it connect to Unico Mobile?", a: "That's on the roadmap: we're designing UnicoCard so a tap can provision your Unico Mobile eSIM — load a phone line onto your device with no physical SIM. It'll arrive alongside Unico Mobile; the card's share/lead/analytics features work today." },
  { q: "How do I get one?", a: "UnicoCard is part of the UnicoOS ecosystem. Explore it on UnicoOS, or call us and we'll get you set up." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "UnicoCard",
      description:
        "Tap-to-share smart NFC business card from E1 Unico Corporation. Shares contact details and links with one tap, captures leads into the UnicoOS CRM, and tracks tap analytics. Roadmap includes provisioning a Unico Mobile eSIM plus identity and payment applets.",
      brand: { "@type": "Brand", name: "UnicoCard" },
      category: "Smart business card",
      manufacturer: { "@type": "Organization", name: "E1 Unico Corporation", url: "https://e1unico.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const gold = "#c9a84c";
const goldLight = "#f0c96e";

export default function UnicoCardPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", overflow: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>Unico<span className="gold-text">Card</span></span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="#how" className="hidden sm:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>How it works</a>
          <Link href="/apps" className="hidden md:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>All Apps</Link>
          <a href="https://unicoos.app" target="_blank" rel="noreferrer" className="btn-gold" style={{ color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none" }}>Get UnicoCard</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 20px 60px", position: "relative" }}>
        <div className="glow-orb" style={{ width: 620, height: 620, background: gold, top: "6%", right: "6%" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 420, height: 420, background: "#7c3aed", bottom: "8%", left: "10%" }} />
        <div className="glow-orb glow-orb-3" style={{ width: 320, height: 320, background: goldLight, top: "40%", left: "45%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 50, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.35)", color: goldLight, fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
              💳 A UnicoOS Product · Live Now
            </span>
            <h1 style={{ fontSize: "clamp(44px, 8vw, 84px)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em", marginBottom: 22 }}>
              One tap.<br />
              <span className="gold-text">Everything you do.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 520, lineHeight: 1.6, marginBottom: 16 }}>
              UnicoCard is your tap-to-share smart business card. One tap on any phone sends your contact and links,
              turns the moment into a saved lead, and shows you exactly what&apos;s working — all inside UnicoOS.
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>
              Built by <strong style={{ color: "white" }}>E1 Unico</strong>. And on the roadmap: tap your card to load your <strong style={{ color: "#7dd3fc" }}>Unico Mobile</strong> eSIM.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href="https://unicoos.app" target="_blank" rel="noreferrer" className="btn-gold" style={{ color: "white", fontWeight: 800, fontSize: 16, padding: "16px 34px", borderRadius: 16, textDecoration: "none", boxShadow: "0 8px 40px rgba(201,168,76,0.3)" }}>
                💳 Get Your UnicoCard
              </a>
              <a href="#how" style={{ color: "white", fontWeight: 700, fontSize: 16, padding: "16px 30px", borderRadius: 16, textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                See how it works ↓
              </a>
            </div>
          </div>

          {/* Card visual */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="card-lift" style={{ width: "100%", maxWidth: 380, aspectRatio: "1.6 / 1", borderRadius: 22, background: "linear-gradient(145deg, #1a1408 0%, #2a2210 55%, #0e0b05 100%)", border: "1px solid rgba(201,168,76,0.35)", boxShadow: "0 24px 70px rgba(201,168,76,0.18)", position: "relative", padding: "26px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontWeight: 900, fontSize: 20, letterSpacing: "0.02em" }}>Unico<span className="gold-text">Card</span></p>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Tap to connect</p>
                </div>
                <span style={{ fontSize: 26 }} aria-hidden>📶</span>
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: 16, color: "white" }}>Manuel Montemayor</p>
                <p style={{ fontSize: 12, color: goldLight, marginTop: 2 }}>E1 Unico Corporation</p>
                <div style={{ marginTop: 14, height: 1, background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }} />
                <p style={{ fontSize: 11, color: "#6b7280", marginTop: 12 }}>e1unico.com · 1-833-E1-UNICO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: goldLight, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>From Handshake to Follow-up</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Tap. Capture. Convert.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="sm:grid-cols-3 grid-cols-1">
            {HOW.map((s, i) => (
              <div key={s.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "30px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 34 }}>{s.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: gold, background: "rgba(201,168,76,0.15)", width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                </div>
                <p style={{ fontWeight: 800, fontSize: 19, color: "white", marginBottom: 8 }}>{s.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── WHY ── */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(201,168,76,0.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: goldLight, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Why UnicoCard</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 14 }}>
              A paper card can&apos;t do this.
            </h2>
          </div>
          <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>What matters</th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 900, color: "white" }}><span className="gold-text">UnicoCard</span></th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 700, color: "#6b7280" }}>Paper business card</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: i % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "#d1d5db", fontWeight: 600 }}>{row.feature}</td>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "white" }}><span style={{ color: goldLight, marginRight: 6 }}>✓</span>{row.unicocard}</td>
                    <td style={{ padding: "15px 20px", fontSize: 13, color: "#6b7280" }}>{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── ROADMAP ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#7dd3fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Where It&apos;s Going</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 14 }}>
              One card. One tap. More every season.
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              The share/lead/analytics features work today. Here&apos;s what we&apos;re building the card toward.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {ROADMAP.map(c => (
              <div key={c.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "26px 24px" }}>
                <p style={{ fontSize: 30, marginBottom: 12 }}>{c.emoji}</p>
                <p style={{ fontWeight: 800, fontSize: 17, color: "white", marginBottom: 8 }}>{c.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 13.5, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, marginTop: 20 }}>
            Roadmap items arrive with Unico Mobile and future releases — the card you get today already shares, captures, and tracks.
          </p>
        </div>
      </section>

      <div className="section-line" />

      {/* ── FAQ ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: goldLight, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Straight Answers</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Questions, answered.</h2>
          </div>
          {FAQ.map(f => (
            <details key={f.q} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px", marginBottom: 10 }}>
              <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 15, color: "white" }}>{f.q}</summary>
              <p style={{ marginTop: 10, fontSize: 14, color: "#9ca3af", lineHeight: 1.65 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="section-line" />

      {/* ── CTA ── */}
      <section style={{ padding: "100px 20px", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 560, height: 560, background: gold, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }} />
        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Hand over <span className="gold-text">one card.</span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
            UnicoCard lives in the UnicoOS ecosystem — same login, same contacts, same dashboard. Get yours and turn every intro into a tracked lead.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <a href="https://unicoos.app" target="_blank" rel="noreferrer" className="btn-gold" style={{ color: "white", fontWeight: 800, fontSize: 16, padding: "16px 34px", borderRadius: 16, textDecoration: "none" }}>
              💳 Get UnicoCard on UnicoOS
            </a>
            <a href="tel:18333186426" style={{ color: "white", fontWeight: 700, fontSize: 16, padding: "16px 30px", borderRadius: 16, textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
              📞 1-833-E1-UNICO
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 24px", marginBottom: 16, fontSize: 12 }}>
            <Link href="/" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 600 }}>← E1Unico.com</Link>
            <Link href="/apps" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>All Unico Apps</Link>
            <Link href="/unicomobile" style={{ color: "#7dd3fc", textDecoration: "none", fontWeight: 600 }}>UnicoMobile</Link>
            <span className="gold-text" style={{ fontWeight: 600 }}>UnicoCard</span>
            <a href="https://unicoos.app" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>UnicoOS →</a>
            <Link href="/legal/privacy" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
            <Link href="/legal/terms" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Terms of Service</Link>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 E1 Unico Corporation · UnicoCard is a UnicoOS product · Building the Empire 🦅</p>
        </div>
      </footer>
    </main>
  );
}

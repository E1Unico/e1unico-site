import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "UnicoMobile — Wireless, Built Into Your Business | Coming Soon",
  description:
    "UnicoMobile is business wireless designed to live inside UnicoOS — your team's phone lines, one bill, one login, tied to your CRM and AI receptionist. Carrier-neutral by design. Join the early-access waitlist.",
  openGraph: {
    title: "UnicoMobile — Wireless, Built Into Your Business",
    description: "Business phone lines designed to live inside UnicoOS — one bill, one login, built to connect with your CRM and UniRo. Carrier-neutral by design. In development — join the waitlist.",
  },
  alternates: { canonical: "/unicomobile" },
};

const HOW = [
  { emoji: "📱", title: "Lines for your team", desc: "Add business phone lines for you and your crew — managed from the same place you already run everything else." },
  { emoji: "🧾", title: "One bill, one login", desc: "Your connectivity rides alongside the rest of your Unico stack. No separate carrier portal, no juggling accounts." },
  { emoji: "🤖", title: "Tied to your business", desc: "Built to connect with your UnicoOS number, CRM, and UniRo AI receptionist — so a call is never just a call." },
];

// Positioning matrix — kept qualitative on purpose. We do NOT publish coverage,
// pricing, or carrier-partnership claims before they are real and announced.
const COMPARE: { feature: string; unicomobile: string; others: string }[] = [
  { feature: "Runs inside your business OS", unicomobile: "Managed from UnicoOS", others: "Separate carrier account" },
  { feature: "One login across your tools", unicomobile: "UnicoOS single sign-on", others: "Yet another portal" },
  { feature: "Connected to your CRM + AI receptionist", unicomobile: "Built for it (UniRo)", others: "Not connected" },
  { feature: "Network approach", unicomobile: "Carrier-neutral by design", others: "Locked to one carrier" },
  { feature: "Faith-friendly company standard", unicomobile: "On by default", others: "None" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "What is UnicoMobile?", a: "It's business wireless designed to live inside UnicoOS — phone lines for you and your team, managed from the same place you run your CRM, invoicing, and AI receptionist. The goal is one company for your whole operation, connectivity included." },
  { q: "Is it available yet?", a: "Not yet — UnicoMobile is in development and opening early access in waves. Join the waitlist and we'll reach out as it becomes available in your area. Nothing here is a live offer or a coverage guarantee." },
  { q: "Which network does it use?", a: "We're building it carrier-neutral — the idea is to run on established networks rather than lock you to one. We'll share the specifics (networks, coverage, plans, and pricing) as they're finalized and announced, not before." },
  { q: "Will I need a physical SIM?", a: "The plan is eSIM — your line downloads to your phone over the air, with no plastic SIM to wait for. We're designing it so you can provision it by tapping your UnicoCard. Exact device support will be confirmed at launch." },
  { q: "Will it work with my UnicoOS number and UniRo?", a: "That's the plan. UnicoMobile is being designed to connect with your UnicoOS business number, your CRM, and the UniRo AI receptionist, so calls, texts, and follow-ups all live in one place. Exact capabilities will be confirmed at launch." },
  { q: "How much will it cost?", a: "Pricing isn't set yet, and we won't post a number we can't stand behind. Waitlist members will be the first to see plans — and to lock any founder pricing before public launch." },
  { q: "Do I need UnicoOS to use it?", a: "UnicoMobile is being built as part of the UnicoOS ecosystem. If you already run your business on UnicoOS, it's designed to show up as one of your apps — same account. Standalone details will be shared closer to launch." },
];

// Structured data. Deliberately conservative: describes UnicoMobile as an
// upcoming service in development, with NO price/coverage offer asserted.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "UnicoMobile",
      serviceType: "Business wireless / mobile connectivity",
      description:
        "Upcoming business wireless service (in development, early-access waitlist open) designed to live inside UnicoOS — team phone lines managed alongside CRM, invoicing, and the UniRo AI receptionist. Carrier-neutral by design. Coverage, plans, and pricing to be announced.",
      provider: { "@type": "Organization", name: "E1 Unico Corporation", url: "https://e1unico.com" },
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

const PLANNED = [
  "Business phone lines for you and your team",
  "eSIM you activate over the air — the goal is a tap of your UnicoCard, no chasing a physical SIM",
  "Managed from inside UnicoOS — one login",
  "Designed to connect with your CRM + UniRo",
  "Carrier-neutral approach, not locked to one network",
  "One company for your whole operation",
  "Founder pricing for early-access members",
];

const sky = "#0ea5e9";
const blue = "#2563eb";
const gold = "#c9a84c";

export default function UnicoMobilePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", overflow: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>Unico<span style={{ background: "linear-gradient(135deg,#38bdf8,#2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mobile</span></span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="#how" className="hidden sm:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>How it works</a>
          <a href="https://unicoos.app" target="_blank" rel="noreferrer" className="hidden sm:block" style={{ fontSize: 13, color: "#818cf8", textDecoration: "none", padding: "6px 12px" }}>UnicoOS</a>
          <a href="#waitlist" style={{ color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none", background: "linear-gradient(135deg,#0ea5e9,#2563eb)" }}>Get Early Access</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 20px 60px", position: "relative" }}>
        <div className="glow-orb" style={{ width: 620, height: 620, background: blue, top: "6%", right: "6%" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 420, height: 420, background: sky, bottom: "8%", left: "10%" }} />
        <div className="glow-orb glow-orb-3" style={{ width: 320, height: 320, background: gold, top: "40%", left: "45%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 50, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.35)", color: "#7dd3fc", fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
              📶 In Development · A UnicoOS Service
            </span>
            <h1 style={{ fontSize: "clamp(44px, 8vw, 84px)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em", marginBottom: 22 }}>
              Your business.<br />
              Now with<br />
              <span style={{ background: "linear-gradient(135deg, #7dd3fc, #0ea5e9, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>a signal.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 520, lineHeight: 1.6, marginBottom: 16 }}>
              UnicoMobile is business wireless designed to live inside UnicoOS — phone lines for your team,
              one bill, one login, wired into the CRM and AI receptionist you already use.
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>
              Carrier-neutral by design. One login across UnicoOS. Built by <strong style={{ color: "white" }}>E1 Unico</strong>. <strong style={{ color: "#7dd3fc" }}>Coming soon — join the list.</strong>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href="#waitlist" style={{ color: "white", fontWeight: 800, fontSize: 16, padding: "16px 34px", borderRadius: 16, textDecoration: "none", background: "linear-gradient(135deg,#0ea5e9,#2563eb)", boxShadow: "0 8px 40px rgba(14,165,233,0.35)" }}>
                📶 Join the Waitlist
              </a>
              <a href="#how" style={{ color: "white", fontWeight: 700, fontSize: 16, padding: "16px 30px", borderRadius: 16, textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                See the vision ↓
              </a>
            </div>
          </div>

          <div id="waitlist-hero">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#7dd3fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>The Idea</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Connectivity that knows your business.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="sm:grid-cols-3 grid-cols-1">
            {HOW.map((s) => (
              <div key={s.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "30px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 34 }}>{s.emoji}</span>
                </div>
                <p style={{ fontWeight: 800, fontSize: 19, color: "white", marginBottom: 8 }}>{s.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── WHY UNICOMOBILE ── */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(14,165,233,0.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#7dd3fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Why UnicoMobile</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 14 }}>
              One company for your whole operation.
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              You already run your business on Unico. The vision for UnicoMobile is to make your phone lines part of that same world — not one more carrier account to babysit.
            </p>
          </div>

          <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>What matters</th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 900, color: "white" }}>
                    <span style={{ background: "linear-gradient(135deg,#7dd3fc,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>UnicoMobile</span>
                  </th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 700, color: "#6b7280" }}>A separate carrier</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: i % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "#d1d5db", fontWeight: 600 }}>{row.feature}</td>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "white" }}>
                      <span style={{ color: "#7dd3fc", marginRight: 6 }}>✓</span>{row.unicomobile}
                    </td>
                    <td style={{ padding: "15px 20px", fontSize: 13, color: "#6b7280" }}>{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, marginTop: 16 }}>
            UnicoMobile is in development. Networks, coverage, plans, and pricing will be announced before launch — this page is not a live offer.
          </p>
        </div>
      </section>

      <div className="section-line" />

      {/* ── WHAT'S PLANNED ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>What We&apos;re Building</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-0.02em" }}>The plan, in plain terms.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }} className="lg:grid-cols-2 grid-cols-1">
            <div style={{ borderRadius: 28, padding: "38px 30px", background: "linear-gradient(145deg, rgba(14,165,233,0.18), rgba(201,168,76,0.10))", border: "1px solid rgba(14,165,233,0.4)", boxShadow: "0 0 60px rgba(14,165,233,0.12)", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#7dd3fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Status</p>
              <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.05, background: "linear-gradient(135deg,#7dd3fc,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 10 }}>Coming<br />Soon</div>
              <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>In development, opening in waves. Get on the list to hear the moment it&apos;s live in your area.</p>
              <a href="#waitlist" style={{ display: "block", width: "100%", color: "white", fontWeight: 800, fontSize: 16, padding: "15px", borderRadius: 14, textDecoration: "none", background: "linear-gradient(135deg,#0ea5e9,#2563eb)" }}>
                📶 Get Early Access
              </a>
            </div>
            <div style={{ borderRadius: 28, padding: "34px 30px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "white", marginBottom: 18 }}>What we&apos;re building toward</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {PLANNED.map(f => (
                  <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "#d1d5db", lineHeight: 1.45 }}>
                    <span style={{ color: "#7dd3fc", flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── FAQ ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#7dd3fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Straight Answers</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Questions, answered honestly.</h2>
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

      {/* ── FINAL CTA ── */}
      <section id="waitlist" style={{ padding: "100px 20px", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 560, height: 560, background: blue, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }} />
        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Be first on <span style={{ background: "linear-gradient(135deg,#7dd3fc,#0ea5e9,#c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>the network.</span>
            </h2>
            <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.6 }}>
              UnicoMobile is coming. Join the waitlist and we&apos;ll reach out as it opens in your area — plus founder pricing before public launch.
            </p>
          </div>
          <WaitlistForm />
          <p style={{ textAlign: "center", fontSize: 12, color: "#4b5563", marginTop: 24 }}>
            Questions? Call <a href="tel:18333186426" style={{ color: gold, textDecoration: "none", fontWeight: 700 }}>1-833-E1-UNICO</a> · A product of E1 Unico Corporation
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 24px", marginBottom: 16, fontSize: 12 }}>
            <Link href="/" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 600 }}>← E1Unico.com</Link>
            <Link href="/unicocard" style={{ color: "#f0c96e", textDecoration: "none", fontWeight: 600 }}>UnicoCard</Link>
            <a href="https://unicoos.app" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>UnicoOS →</a>
            <span style={{ color: sky, fontWeight: 600 }}>UnicoMobile</span>
            <Link href="/legal/privacy" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
            <Link href="/legal/terms" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Terms of Service</Link>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 E1 Unico Corporation · UnicoMobile is an upcoming UnicoOS service · Coverage, plans, and pricing to be announced · Building the Empire 🦅</p>
        </div>
      </footer>
    </main>
  );
}

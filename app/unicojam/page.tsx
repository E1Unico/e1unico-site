import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "UnicoJam — AI Music Studio | Make Full Songs From a Prompt",
  description:
    "UnicoJam turns a prompt into a finished, radio-ready song — your genre, your mood, your lyrics. One login across UnicoOS. Faith-friendly by design. Join the early-access waitlist.",
  openGraph: {
    title: "UnicoJam — AI Music Studio",
    description: "Type it. Hear it. Own it. Full AI songs from a single prompt. Part of the UnicoOS ecosystem.",
  },
};

const HOW = [
  { emoji: "✍️", title: "Describe it", desc: "Pick a genre and mood, drop in your own lyrics or let UnicoJam write them. One line is enough to start." },
  { emoji: "🎛️", title: "Generate it", desc: "Our engine composes, performs, and mixes a full track — vocals, instruments, and structure — in about a minute." },
  { emoji: "🚀", title: "Own & share it", desc: "Download studio-quality audio or drop a public play link. Your library lives in your account across every device." },
];

// Positioning matrix — capability/ownership/ecosystem rows kept qualitative on
// purpose so we never publish a competitor price we can't stand behind.
const COMPARE: { feature: string; unicojam: string; others: string }[] = [
  { feature: "Full songs from one prompt", unicojam: "Yes — vocals + instruments + mix", others: "Yes, quality varies" },
  { feature: "One login for your whole business", unicojam: "UnicoOS single sign-on (P28)", others: "Separate account, siloed" },
  { feature: "Works standalone AND inside your OS", unicojam: "Both — same account, same credits", others: "Standalone only" },
  { feature: "Faith-friendly content standard", unicojam: "On by default", others: "None" },
  { feature: "Overage billing", unicojam: "UnicoAI credits — pay only for what you use", others: "Hard caps or surprise tiers" },
  { feature: "Your own artist voice (coming)", unicojam: "Voice cloning on the roadmap", others: "Limited / not offered" },
  { feature: "Label path for serious artists", unicojam: "Multi Genre Records", others: "You're on your own" },
];

const GENRES = ["Gospel", "Hip-Hop", "R&B", "Lo-Fi", "Trap", "Country", "Afrobeat", "Worship", "Pop", "EDM", "Corridos", "Jazz", "Drill", "Soul"];

const PRICE_INCLUDES = [
  "Full-song generation (vocals + instrumental)",
  "Bring your own lyrics or auto-write them",
  "Studio-quality downloads",
  "Public share / play pages",
  "Weekly generation allowance",
  "Overage billed through UnicoAI credits — never a surprise bill",
  "One account across UnicoOS + the standalone app",
];

const gold = "#c9a84c";

export default function UnicoJamPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", overflow: "hidden" }}>
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>Unico<span style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Jam</span></span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="#pricing" className="hidden sm:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>Pricing</a>
          <a href="https://unicoos.app" target="_blank" rel="noreferrer" className="hidden sm:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>UnicoOS</a>
          <a href="#waitlist" className="btn-indigo" style={{ color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none" }}>Get Early Access</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 20px 60px", position: "relative" }}>
        <div className="glow-orb" style={{ width: 620, height: 620, background: "#7c3aed", top: "6%", right: "6%" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 420, height: 420, background: "#4f46e5", bottom: "8%", left: "10%" }} />
        <div className="glow-orb glow-orb-3" style={{ width: 320, height: 320, background: gold, top: "40%", left: "45%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 50, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.35)", color: "#c4b5fd", fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
              🎵 Launching Soon · A UnicoOS App
            </span>
            <h1 style={{ fontSize: "clamp(44px, 8vw, 84px)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em", marginBottom: 22 }}>
              Type it.<br />
              Hear it.<br />
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Own it.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 520, lineHeight: 1.6, marginBottom: 16 }}>
              UnicoJam turns a single prompt into a finished, radio-ready song — your genre, your mood, your words.
              No studio. No band. No limits on your imagination.
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>
              One login across UnicoOS. Faith-friendly by design. Built by <strong style={{ color: "white" }}>E1 Unico</strong> · label home: <strong style={{ color: gold }}>Multi Genre Records</strong>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href="#waitlist" className="btn-indigo" style={{ color: "white", fontWeight: 800, fontSize: 16, padding: "16px 34px", borderRadius: 16, textDecoration: "none", boxShadow: "0 8px 40px rgba(124,58,237,0.35)" }}>
                🎧 Join the Waitlist
              </a>
              <a href="#how" style={{ color: "white", fontWeight: 700, fontSize: 16, padding: "16px 30px", borderRadius: 16, textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                See how it works ↓
              </a>
            </div>
          </div>

          <div id="waitlist-hero">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ── GENRE MARQUEE ── */}
      <div style={{ overflow: "hidden", padding: "16px 0", background: "rgba(124,58,237,0.05)", borderTop: "1px solid rgba(124,58,237,0.12)", borderBottom: "1px solid rgba(124,58,237,0.12)" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex" }}>
              {GENRES.map(g => (
                <span key={g} style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 28px", fontSize: 13, fontWeight: 700, color: "#c4b5fd", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                  <span style={{ width: 4, height: 4, background: "#7c3aed", borderRadius: "50%" }} />
                  {g}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#c4b5fd", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>From Idea to Anthem</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Three steps. One song.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="sm:grid-cols-3 grid-cols-1">
            {HOW.map((s, i) => (
              <div key={s.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "30px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 34 }}>{s.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#7c3aed", background: "rgba(124,58,237,0.15)", width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                </div>
                <p style={{ fontWeight: 800, fontSize: 19, color: "white", marginBottom: 8 }}>{s.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── WHY WE'RE AHEAD ── */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(124,58,237,0.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#c4b5fd", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Why UnicoJam</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 14 }}>
              Not just another song maker.
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              Other tools stop at the track. UnicoJam plugs into the platform that runs your whole hustle — one account, one balance, one team behind it.
            </p>
          </div>

          <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>What matters</th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 900, color: "white" }}>
                    <span style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>UnicoJam</span>
                  </th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 700, color: "#6b7280" }}>Typical AI music apps</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: i % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "#d1d5db", fontWeight: 600 }}>{row.feature}</td>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "white" }}>
                      <span style={{ color: "#a78bfa", marginRight: 6 }}>✓</span>{row.unicojam}
                    </td>
                    <td style={{ padding: "15px 20px", fontSize: 13, color: "#6b7280" }}>{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Simple Pricing</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Pro sound. One price.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }} className="lg:grid-cols-2 grid-cols-1">
            {/* Price card */}
            <div style={{ borderRadius: 28, padding: "38px 30px", textAlign: "center", background: "linear-gradient(145deg, rgba(124,58,237,0.18), rgba(201,168,76,0.10))", border: "1px solid rgba(124,58,237,0.4)", boxShadow: "0 0 60px rgba(124,58,237,0.12)", display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#c4b5fd", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>UnicoJam Pro</p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 68, fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg,#a78bfa,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$14.99</span>
                <span style={{ fontSize: 18, color: "#9ca3af", fontWeight: 700 }}>/week</span>
              </div>
              <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>Cancel anytime · Founder pricing locked for early access</p>
              <a href="#waitlist" className="btn-indigo" style={{ display: "block", width: "100%", color: "white", fontWeight: 800, fontSize: 16, padding: "15px", borderRadius: 14, textDecoration: "none", marginBottom: 12 }}>
                🎵 Get Early Access
              </a>
              <p style={{ fontSize: 12, color: "#6b7280", marginTop: "auto", lineHeight: 1.5 }}>
                Heavy month? Overages ride on <strong style={{ color: gold }}>UnicoAI credits</strong> — you only pay for what you actually make.
              </p>
            </div>

            {/* Includes */}
            <div style={{ borderRadius: 28, padding: "34px 30px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "white", marginBottom: 18 }}>Everything included</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {PRICE_INCLUDES.map(f => (
                  <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "#d1d5db", lineHeight: 1.45 }}>
                    <span style={{ color: "#a78bfa", flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, marginTop: 20 }}>
            Already run your business on UnicoOS? UnicoJam shows up as one of your apps — same login, same credit balance.
          </p>
        </div>
      </section>

      <div className="section-line" />

      {/* ── ECOSYSTEM ── */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(79,70,229,0.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>One Ecosystem</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              Stands alone. <span style={{ color: "#818cf8" }}>Syncs with everything.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
            {[
              { emoji: "🔑", title: "One login (P28)", desc: "The same account you use for UnicoOS signs you into UnicoJam. No new password, no separate world." },
              { emoji: "📱", title: "Its own app", desc: "Web, iPhone, Android, and desktop — UnicoJam ships as a real installable app you can open anywhere." },
              { emoji: "🔗", title: "Deep-linked", desc: "Jump from a UnicoOS campaign straight into a fresh beat and back again. It's all one flow." },
              { emoji: "💳", title: "One balance", desc: "Credits are shared across the whole ecosystem. Spend them on a song today, a receptionist tomorrow." },
              { emoji: "🎙️", title: "Your voice, later", desc: "Voice cloning is on the roadmap — including an artist voice for Multi Genre Records releases." },
              { emoji: "🙏", title: "Faith-friendly", desc: "Every track meets a family- and faith-affirming content standard, ecosystem-wide, by default." },
            ].map(c => (
              <div key={c.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px 22px" }}>
                <p style={{ fontSize: 30, marginBottom: 12 }}>{c.emoji}</p>
                <p style={{ fontWeight: 800, fontSize: 16, color: "white", marginBottom: 6 }}>{c.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── FINAL CTA ── */}
      <section id="waitlist" style={{ padding: "100px 20px", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 560, height: 560, background: "#7c3aed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }} />
        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Be first in <span style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed,#c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>the booth.</span>
            </h2>
            <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.6 }}>
              Early access opens in waves. Get on the list and lock founder pricing before the doors open.
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
            <a href="https://unicoos.app" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>UnicoOS →</a>
            <span style={{ color: "#7c3aed", fontWeight: 600 }}>UnicoJam</span>
            <a href="#pricing" style={{ color: gold, textDecoration: "none", fontWeight: 600 }}>Pricing</a>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 E1 Unico Corporation · UnicoJam is a UnicoOS app · Multi Genre Records · Building the Empire 🦅</p>
        </div>
      </footer>
    </main>
  );
}

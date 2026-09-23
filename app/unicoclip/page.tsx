import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "UnicoClip — Make the Video. In Minutes. | The Unico Video Studio",
  description:
    "UnicoClip is the video studio for the Unico ecosystem. Turn your ideas, footage, and UnicoJam tracks into short, shareable videos — then publish straight to your UnicoTube channel. One login across UnicoOS. Join the early-access waitlist.",
  openGraph: {
    title: "UnicoClip — Make the Video. In Minutes.",
    description: "The video studio for creators. Cut short videos fast, add your UnicoJam soundtrack, publish to UnicoTube. Part of the UnicoOS ecosystem.",
  },
  alternates: { canonical: "/unicoclip" },
};

const HOW = [
  { emoji: "🎬", title: "Start it", desc: "Drop in your footage, pick a template, or start from a simple outline. Add captions, your logo, and a UnicoJam track for the soundtrack." },
  { emoji: "✂️", title: "Cut it", desc: "Trim, caption, and arrange in a simple timeline built for speed — no pro editor required. What used to take hours takes minutes." },
  { emoji: "🚀", title: "Publish it", desc: "Export a clean video, or push it straight to your UnicoTube channel in a tap. Same account, same ecosystem — no re-upload." },
];

// Positioning matrix — kept qualitative on purpose so we never publish a
// competitor price or capability we can't stand behind before launch.
const COMPARE: { feature: string; unicoclip: string; others: string }[] = [
  { feature: "Publish straight to your channel", unicoclip: "One tap to UnicoTube", others: "Export, re-encode, re-upload" },
  { feature: "One login for your whole business", unicoclip: "UnicoOS single sign-on", others: "Separate account, siloed" },
  { feature: "Your soundtrack, in-house", unicoclip: "Drop in a UnicoJam track", others: "Hunt for royalty-free music" },
  { feature: "Honest about AI", unicoclip: "AI helps; we tell you what's AI", others: "Often vague about it" },
  { feature: "Every content category welcome", unicoclip: "Shorts to faith to business, wide open", others: "Narrower niches only" },
  { feature: "Runs where your business already lives", unicoclip: "Inside UnicoOS + standalone", others: "Standalone only" },
];

const USES = ["Shorts", "Reels", "Promos", "Vlogs", "Tutorials", "Music Videos", "Ads", "Testimonials", "Explainers", "Recaps", "Announcements", "Faith", "How-To", "Behind-the-Scenes"];

const FAQ: { q: string; a: string }[] = [
  { q: "What is UnicoClip?", a: "It's the video studio for the Unico ecosystem — a fast way to turn footage, ideas, and your UnicoJam tracks into short, shareable videos. It's the make-it half of video; UnicoTube is where you publish and grow." },
  { q: "How is it connected to UnicoTube?", a: "They're built to work as one. Cut a video in UnicoClip, then publish it straight to your UnicoTube channel in a tap — no export-and-re-upload dance. Same account across the whole ecosystem." },
  { q: "Does it use AI?", a: "AI helps where it saves you time — and we're honest about it. Where a feature relies on AI, we say so plainly rather than overstating what it can do. You stay in control of the final cut." },
  { q: "Do I own what I make?", a: "Your videos are yours — yours to export, share, and take with you. UnicoClip is a tool to make your content faster, not a rights grab." },
  { q: "Do I need UnicoOS to use it?", a: "No. UnicoClip works with its own login. But if you already run your business on UnicoOS, it shows up as one of your apps automatically — same account, same balance." },
  { q: "What kind of videos can I make?", a: "Whatever you make. Shorts, reels, promos, tutorials, faith, business, comedy — UnicoClip isn't built around one category, it's built for every creator in the Unico ecosystem." },
  { q: "When does it launch?", a: "Early access opens in waves. Join the waitlist to be first in line — plus founder pricing locked before public launch." },
];

// Structured data so AI answer engines (the UnicoCare AEO pitch) can read and
// cite UnicoClip. Kept in sync with the FAQ + positioning above.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "UnicoClip",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web, iOS, Android",
      description:
        "Video creation studio for the Unico ecosystem, launching soon (early-access waitlist open). Turn footage, ideas, and UnicoJam tracks into short shareable videos, then publish to a UnicoTube channel. One login across UnicoOS, every creator welcome.",
      publisher: { "@type": "Organization", name: "E1 Unico Corporation", url: "https://e1unico.com" },
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

const CREATOR_GETS = [
  "A fast, simple timeline — trim, caption, arrange",
  "Templates for shorts, promos, and vlogs",
  "Drop in a UnicoJam track as your soundtrack",
  "AI assists where it helps — honestly labeled",
  "One-tap publish to your UnicoTube channel",
  "Your videos are yours to export and keep",
  "One account across UnicoOS + the standalone app",
];

const teal = "#14b8a6";
const cyan = "#06b6d4";
const gold = "#c9a84c";

export default function UnicoClipPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", overflow: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>Unico<span style={{ background: "linear-gradient(135deg,#5eead4,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Clip</span></span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="#how" className="hidden sm:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>How it works</a>
          <a href="/unicotube" className="hidden md:block" style={{ fontSize: 13, color: "#fca5a5", textDecoration: "none", padding: "6px 12px" }}>UnicoTube</a>
          <a href="/unicojam" className="hidden sm:block" style={{ fontSize: 13, color: "#c4b5fd", textDecoration: "none", padding: "6px 12px" }}>UnicoJam</a>
          <a href="#waitlist" style={{ color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none", background: "linear-gradient(135deg,#06b6d4,#14b8a6)" }}>Get Early Access</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 20px 60px", position: "relative" }}>
        <div className="glow-orb" style={{ width: 620, height: 620, background: cyan, top: "6%", right: "6%" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 420, height: 420, background: teal, bottom: "8%", left: "10%" }} />
        <div className="glow-orb glow-orb-3" style={{ width: 320, height: 320, background: gold, top: "40%", left: "45%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 50, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.35)", color: "#5eead4", fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
              🎬 Launching Soon · A UnicoOS App
            </span>
            <h1 style={{ fontSize: "clamp(44px, 8vw, 84px)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em", marginBottom: 22 }}>
              Make the<br />
              video.<br />
              <span style={{ background: "linear-gradient(135deg, #5eead4, #06b6d4, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>In minutes.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 520, lineHeight: 1.6, marginBottom: 16 }}>
              UnicoClip turns your footage, ideas, and UnicoJam tracks into short, shareable videos — fast.
              Cut it here, then publish straight to your UnicoTube channel.
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>
              One login across UnicoOS. Every creator welcome. Honest about what&apos;s AI. Built by <strong style={{ color: "white" }}>E1 Unico</strong>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href="#waitlist" style={{ color: "white", fontWeight: 800, fontSize: 16, padding: "16px 34px", borderRadius: 16, textDecoration: "none", background: "linear-gradient(135deg,#06b6d4,#14b8a6)", boxShadow: "0 8px 40px rgba(6,182,212,0.35)" }}>
                🎬 Join the Waitlist
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

      {/* ── USE-CASE MARQUEE ── */}
      <div style={{ overflow: "hidden", padding: "16px 0", background: "rgba(6,182,212,0.05)", borderTop: "1px solid rgba(6,182,212,0.12)", borderBottom: "1px solid rgba(6,182,212,0.12)" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex" }}>
              {USES.map(u => (
                <span key={u} style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 28px", fontSize: 13, fontWeight: 700, color: "#5eead4", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                  <span style={{ width: 4, height: 4, background: cyan, borderRadius: "50%" }} />
                  {u}
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
            <p style={{ fontSize: 11, fontWeight: 700, color: "#5eead4", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>From Footage to Finished</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Start. Cut. Publish.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="sm:grid-cols-3 grid-cols-1">
            {HOW.map((s, i) => (
              <div key={s.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "30px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 34 }}>{s.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: cyan, background: "rgba(6,182,212,0.15)", width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                </div>
                <p style={{ fontWeight: 800, fontSize: 19, color: "white", marginBottom: 8 }}>{s.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── THE FLYWHEEL ── */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(6,182,212,0.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#5eead4", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>One Ecosystem, One Loop</p>
          <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Cut it in <span style={{ color: cyan }}>UnicoClip</span>. Grow it on <span style={{ color: "#ef4444" }}>UnicoTube</span>.
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 15, maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.7 }}>
            UnicoClip is the make-it half; UnicoTube is where it lives and earns. And your soundtrack?
            Pull it straight from UnicoJam. One ecosystem, one login, one creative loop.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}>
            {[
              { emoji: "🎵", label: "Score it with UnicoJam", tint: "#a78bfa" },
              { emoji: "🎬", label: "Cut it in UnicoClip", tint: cyan },
              { emoji: "🚀", label: "Publish to UnicoTube", tint: "#ef4444" },
              { emoji: "📺", label: "Viewers watch it", tint: "#ef4444" },
              { emoji: "💸", label: "You earn", tint: gold },
            ].map((step, i, arr) => (
              <div key={step.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{step.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: step.tint, whiteSpace: "nowrap" }}>{step.label}</span>
                </div>
                {i < arr.length - 1 && <span style={{ color: "#4b5563", fontSize: 18 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── WHY UNICOCLIP ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#5eead4", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Why UnicoClip</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 14 }}>
              Built to get the video done.
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              Most editors fight you. UnicoClip is built for speed, plugged into the ecosystem that runs your whole hustle.
            </p>
          </div>

          <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>What matters</th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 900, color: "white" }}>
                    <span style={{ background: "linear-gradient(135deg,#5eead4,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>UnicoClip</span>
                  </th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 700, color: "#6b7280" }}>Typical video editors</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: i % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "#d1d5db", fontWeight: 600 }}>{row.feature}</td>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "white" }}>
                      <span style={{ color: "#5eead4", marginRight: 6 }}>✓</span>{row.unicoclip}
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

      {/* ── FOR CREATORS ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>For Creators</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Everything to ship faster.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }} className="lg:grid-cols-2 grid-cols-1">
            <div style={{ borderRadius: 28, padding: "38px 30px", background: "linear-gradient(145deg, rgba(6,182,212,0.18), rgba(201,168,76,0.10))", border: "1px solid rgba(6,182,212,0.4)", boxShadow: "0 0 60px rgba(6,182,212,0.12)", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#5eead4", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Idea to Video</p>
              <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg,#5eead4,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 8 }}>Minutes</div>
              <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>Not hours in a timeline. Built for creators who need to post, not fiddle.</p>
              <a href="#waitlist" style={{ display: "block", width: "100%", color: "white", fontWeight: 800, fontSize: 16, padding: "15px", borderRadius: 14, textDecoration: "none", background: "linear-gradient(135deg,#06b6d4,#14b8a6)" }}>
                🎬 Get Early Access
              </a>
            </div>
            <div style={{ borderRadius: 28, padding: "34px 30px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "white", marginBottom: 18 }}>What creators get</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {CREATOR_GETS.map(f => (
                  <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "#d1d5db", lineHeight: 1.45 }}>
                    <span style={{ color: "#5eead4", flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, marginTop: 20 }}>
            Already run your business on UnicoOS? UnicoClip shows up as one of your apps — same login, same balance.
          </p>
        </div>
      </section>

      <div className="section-line" />

      {/* ── FAQ ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#5eead4", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Straight Answers</p>
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

      {/* ── FINAL CTA ── */}
      <section id="waitlist" style={{ padding: "100px 20px", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 560, height: 560, background: cyan, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }} />
        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Roll <span style={{ background: "linear-gradient(135deg,#5eead4,#06b6d4,#c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>camera.</span>
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
            <Link href="/unicotube" style={{ color: "#fca5a5", textDecoration: "none", fontWeight: 600 }}>UnicoTube</Link>
            <Link href="/unicojam" style={{ color: "#c4b5fd", textDecoration: "none", fontWeight: 600 }}>UnicoJam</Link>
            <Link href="/unicomusic" style={{ color: "#f9a8d4", textDecoration: "none", fontWeight: 600 }}>UnicoMusic</Link>
            <span style={{ color: cyan, fontWeight: 600 }}>UnicoClip</span>
            <a href="https://unicoos.app" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>UnicoOS →</a>
            <Link href="/legal/privacy" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
            <Link href="/legal/terms" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Terms of Service</Link>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 E1 Unico Corporation · UnicoClip is a UnicoOS app · Building the Empire 🦅</p>
        </div>
      </footer>
    </main>
  );
}

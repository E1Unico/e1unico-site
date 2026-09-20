import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Unico App Ecosystem — One Login, One Empire | E1 Unico",
  description:
    "Every Unico app in one place: UnicoOS to run your business, UnicoJam + UnicoClip to create, UnicoMusic + UnicoTube to distribute and earn, and UnicoMobile to connect. One login, one balance, one ecosystem — built by E1 Unico Corporation.",
  openGraph: {
    title: "The Unico App Ecosystem",
    description: "Run your business, create, distribute, earn, and connect — all under one login. See every Unico app.",
  },
};

type App = {
  name: string;
  wordmarkTail: string;
  tail: string; // colored portion of the wordmark
  emoji: string;
  status: string;
  statusColor: string;
  blurb: string;
  href: string;
  external?: boolean;
  grad: string; // icon gradient
  accent: string; // link/status accent
};

const GROUPS: { key: string; label: string; sub: string; apps: App[] }[] = [
  {
    key: "run",
    label: "Run your business",
    sub: "The operating system everything else plugs into.",
    apps: [
      { name: "Unico", tail: "OS", wordmarkTail: "OS", emoji: "🧩", status: "Live", statusColor: "#818cf8", blurb: "The all-in-one Business Operating System — CRM, invoicing, AI receptionist, accounting, and 100+ modules under one login.", href: "https://unicoos.app", external: true, grad: "linear-gradient(135deg,#818cf8,#06b6d4)", accent: "#818cf8" },
    ],
  },
  {
    key: "create",
    label: "Create",
    sub: "Make the music and the video — fast.",
    apps: [
      { name: "Unico", tail: "Jam", wordmarkTail: "Jam", emoji: "🎵", status: "Launching Soon", statusColor: "#a78bfa", blurb: "AI music studio — turn a prompt into a finished, radio-ready song. Your genre, your words.", href: "/unicojam", grad: "linear-gradient(135deg,#a78bfa,#7c3aed)", accent: "#a78bfa" },
      { name: "Unico", tail: "Clip", wordmarkTail: "Clip", emoji: "🎬", status: "Launching Soon", statusColor: "#5eead4", blurb: "Video studio — turn footage, ideas, and your UnicoJam tracks into short shareable videos in minutes.", href: "/unicoclip", grad: "linear-gradient(135deg,#5eead4,#06b6d4)", accent: "#5eead4" },
    ],
  },
  {
    key: "distribute",
    label: "Distribute & earn",
    sub: "Publish what you made. Reach an audience. Earn your share.",
    apps: [
      { name: "Unico", tail: "Music", wordmarkTail: "Music", emoji: "🎧", status: "Launching Soon", statusColor: "#f9a8d4", blurb: "Streaming platform — publish from UnicoJam, reach listeners, and earn a share of ad revenue.", href: "/unicomusic", grad: "linear-gradient(135deg,#f9a8d4,#ec4899)", accent: "#f9a8d4" },
      { name: "Unico", tail: "Tube", wordmarkTail: "Tube", emoji: "▶️", status: "Launching Soon", statusColor: "#fca5a5", blurb: "Video platform — publish from UnicoClip, grow a channel, and earn a share of ad revenue.", href: "/unicotube", grad: "linear-gradient(135deg,#fca5a5,#ef4444)", accent: "#fca5a5" },
    ],
  },
  {
    key: "connect",
    label: "Connect",
    sub: "Keep your business — and your team — in signal.",
    apps: [
      { name: "Unico", tail: "Mobile", wordmarkTail: "Mobile", emoji: "📶", status: "Coming Soon", statusColor: "#7dd3fc", blurb: "Business wireless designed to live inside UnicoOS — team lines, one bill, tied to your CRM and UniRo. Carrier-neutral by design.", href: "/unicomobile", grad: "linear-gradient(135deg,#7dd3fc,#0ea5e9)", accent: "#7dd3fc" },
    ],
  },
];

const FLOW = [
  { emoji: "🎵", label: "Make music (UnicoJam)", tint: "#a78bfa" },
  { emoji: "🎬", label: "Cut video (UnicoClip)", tint: "#5eead4" },
  { emoji: "🚀", label: "Publish (Music / Tube)", tint: "#f9a8d4" },
  { emoji: "📈", label: "Grow your audience", tint: "#fca5a5" },
  { emoji: "💸", label: "Earn your share", tint: "#c9a84c" },
];

const gold = "#c9a84c";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Unico App Ecosystem",
  description: "Apps and services built by E1 Unico Corporation: UnicoOS, UnicoJam, UnicoClip, UnicoMusic, UnicoTube, and UnicoMobile.",
  itemListElement: GROUPS.flatMap(g => g.apps).map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${a.name}${a.wordmarkTail}`,
    url: a.external ? a.href : `https://e1unico.com${a.href}`,
  })),
};

export default function AppsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", overflow: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>Unico Apps</span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/" className="hidden sm:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>← E1Unico.com</Link>
          <a href="https://unicoos.app" target="_blank" rel="noreferrer" style={{ color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none", background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}>Open UnicoOS</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: "140px 20px 60px", position: "relative", textAlign: "center" }}>
        <div className="glow-orb" style={{ width: 620, height: 620, background: "#4f46e5", top: "0%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 360, height: 360, background: "#ec4899", top: "20%", left: "15%" }} />
        <div className="glow-orb glow-orb-3" style={{ width: 340, height: 340, background: "#06b6d4", top: "24%", right: "12%" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 820, margin: "0 auto" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: gold, fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
            🦅 The E1 Unico Ecosystem
          </span>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 20 }}>
            One login.<br /><span className="gold-text">One empire.</span>
          </h1>
          <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
            Every Unico app works on its own — and better together. Run your business, create music and video,
            publish and earn, and stay connected. Same account, same balance, one ecosystem.
          </p>
        </div>
      </section>

      {/* ── FLYWHEEL ── */}
      <section style={{ padding: "20px 20px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>The Creator Flywheel</p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}>
            {FLOW.map((step, i, arr) => (
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

      {/* ── GROUPS ── */}
      {GROUPS.map((g, gi) => (
        <section key={g.key} style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: gold, background: "rgba(201,168,76,0.12)", width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{gi + 1}</span>
              <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, letterSpacing: "-0.02em" }}>{g.label}</h2>
              <p style={{ color: "#6b7280", fontSize: 14 }}>{g.sub}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {g.apps.map(a => {
                const inner = (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <div style={{ width: 56, height: 56, background: a.grad, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{a.emoji}</div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: a.statusColor, background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase" }}>{a.status}</span>
                    </div>
                    <p style={{ fontWeight: 900, fontSize: 19, color: "white", marginBottom: 8 }}>
                      {a.name}<span style={{ color: a.accent }}>{a.wordmarkTail}</span>
                    </p>
                    <p style={{ color: "#9ca3af", fontSize: 13.5, lineHeight: 1.65, marginBottom: 18 }}>{a.blurb}</p>
                    <span style={{ fontSize: 13, color: a.accent, fontWeight: 700 }}>
                      {a.external ? "Open " : a.status === "Live" ? "Open " : "Learn more & join waitlist "}→
                    </span>
                  </>
                );
                const cardStyle: React.CSSProperties = { display: "block", borderRadius: 22, padding: "26px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" };
                return a.external ? (
                  <a key={a.wordmarkTail} href={a.href} target="_blank" rel="noreferrer" className="card-lift" style={cardStyle}>{inner}</a>
                ) : (
                  <Link key={a.wordmarkTail} href={a.href} className="card-lift" style={cardStyle}>{inner}</Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <div className="section-line" />

      {/* ── ONE ACCOUNT ── */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Why One Ecosystem</p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 32 }}>
            Built to work as one.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
            {[
              { emoji: "🔑", title: "One login", desc: "The same account signs you into every Unico app. No new password per product." },
              { emoji: "💳", title: "One balance", desc: "UnicoAI credits are shared across the ecosystem — spend them wherever you need." },
              { emoji: "🙏", title: "Faith-friendly", desc: "A family- and faith-affirming content standard runs across the whole ecosystem, by default." },
              { emoji: "🦅", title: "One company", desc: "All built and backed by E1 Unico Corporation — BBB accredited, Texas based." },
            ].map(c => (
              <div key={c.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px 22px", textAlign: "left" }}>
                <p style={{ fontSize: 30, marginBottom: 12 }}>{c.emoji}</p>
                <p style={{ fontWeight: 800, fontSize: 16, color: "white", marginBottom: 6 }}>{c.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <a href="https://unicoos.app/register" target="_blank" rel="noreferrer" className="btn-indigo" style={{ color: "white", fontWeight: 800, fontSize: 15, padding: "15px 30px", borderRadius: 14, textDecoration: "none" }}>
              🚀 Start with UnicoOS
            </a>
            <Link href="/#companies" style={{ color: "white", fontWeight: 700, fontSize: 15, padding: "15px 28px", borderRadius: 14, textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
              See the whole family →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 20px", marginBottom: 16, fontSize: 12 }}>
            <Link href="/" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 600 }}>← E1Unico.com</Link>
            <a href="https://unicoos.app" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>UnicoOS</a>
            <Link href="/unicojam" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>UnicoJam</Link>
            <Link href="/unicoclip" style={{ color: "#5eead4", textDecoration: "none", fontWeight: 600 }}>UnicoClip</Link>
            <Link href="/unicomusic" style={{ color: "#f9a8d4", textDecoration: "none", fontWeight: 600 }}>UnicoMusic</Link>
            <Link href="/unicotube" style={{ color: "#fca5a5", textDecoration: "none", fontWeight: 600 }}>UnicoTube</Link>
            <Link href="/unicomobile" style={{ color: "#7dd3fc", textDecoration: "none", fontWeight: 600 }}>UnicoMobile</Link>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 E1 Unico Corporation · One login, one empire · Building the Empire 🦅</p>
        </div>
      </footer>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, SOCIALS, VENTURES } from "./data";

export default function ManuelHome() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 20px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="glow-orb" style={{ width: 700, height: 700, background: "#c9a84c", top: "8%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 400, height: 400, background: "#4f46e5", top: "45%", left: "15%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 780 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div className="pulse-ring" />
              <Image
                src="/manuel/portrait.jpg"
                alt="Manuel Montemayor"
                width={168}
                height={168}
                priority
                style={{ width: 168, height: 168, objectFit: "cover", borderRadius: "50%", border: "3px solid rgba(201,168,76,0.5)", display: "block" }}
              />
            </div>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>
            El Único
          </p>
          <h1 style={{ fontSize: "clamp(40px, 8vw, 76px)", fontWeight: 900, lineHeight: 1.02, marginBottom: 18, letterSpacing: "-0.03em" }}>
            Manuel <span className="gold-text">Montemayor</span>
          </h1>
          <p style={{ fontSize: 17, color: "#9ca3af", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Entrepreneur. Founder of E1 Unico Corporation and the family of companies behind it.
            Building in public, one venture at a time — with a podcast on the way.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <a href="#ventures" className="btn-gold" style={{ color: "white", fontWeight: 800, fontSize: 15, padding: "15px 32px", borderRadius: 16, textDecoration: "none", display: "inline-block", boxShadow: "0 8px 40px rgba(201,168,76,0.3)" }}>
              🏢 See My Companies
            </a>
            <Link href="/links" style={{ color: "white", fontWeight: 700, fontSize: 15, padding: "15px 30px", borderRadius: 16, textDecoration: "none", display: "inline-block", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
              🔗 All My Links
            </Link>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── ABOUT / CREST ── */}
      <section id="about" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }} className="sm:grid-cols-[auto_1fr] grid-cols-1">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src="/e1unico-logo.jpg"
                alt="The Montemayor Crest — E1 Unico"
                width={140}
                height={140}
                style={{ width: 140, height: 140, objectFit: "contain", borderRadius: 28, background: "white", padding: 10 }}
              />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
                The Crest
              </p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16 }}>
                Every mark I put my name behind carries this crest.
              </h2>
              <p style={{ color: "#9ca3af", lineHeight: 1.8, fontSize: 15 }}>
                E1 Unico — <em>El Único</em>, Spanish for &ldquo;the one and only.&rdquo; It started as a company mark, but it&apos;s really
                a family crest and a signature — my name is built into it, letter by letter, whether you see it at first glance or not.
                I built my first company under it. Everything else I build carries it too.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── VENTURES ── */}
      <section id="ventures" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
              What I&apos;ve Built
            </p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>My Companies</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="sm:grid-cols-2 grid-cols-1">
            {VENTURES.map((v) => (
              <a
                key={v.name}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="card-lift"
                style={{ borderRadius: 24, padding: "32px 28px", background: "rgba(14,14,24,0.9)", border: `1px solid ${v.accent}`, textDecoration: "none", display: "block" }}
              >
                {v.logo ? (
                  <Image src={v.logo} alt={v.name} width={64} height={64} style={{ width: 64, height: 64, objectFit: "contain", borderRadius: 14, background: "white", padding: 6, marginBottom: 20 }} />
                ) : (
                  <div style={{ width: 64, height: 64, background: v.accent, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 20 }}>
                    {v.emoji}
                  </div>
                )}
                <p style={{ fontWeight: 900, fontSize: 18, color: "white", marginBottom: 4 }}>{v.name}</p>
                <p style={{ fontSize: 12, color: "#c9a84c", fontWeight: 600, marginBottom: 14 }}>{v.tag}</p>
                <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.7 }}>{v.desc}</p>
                <p style={{ fontSize: 12, color: "#818cf8", fontWeight: 700, marginTop: 16 }}>Visit →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── PODCAST ── */}
      <section id="podcast" style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(201,168,76,0.04) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            Coming Soon
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 18 }}>
            🎙️ The Podcast
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.8, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            I&apos;m building a show around what it actually takes to launch and run real businesses — the wins, the mistakes,
            and the people doing it. Details are still coming together. Get on the list and you&apos;ll be the first to know when it drops.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Notify me when the podcast launches")}`}
            className="btn-gold"
            style={{ color: "white", fontWeight: 800, fontSize: 15, padding: "16px 34px", borderRadius: 16, textDecoration: "none", display: "inline-block", boxShadow: "0 8px 40px rgba(201,168,76,0.3)" }}
          >
            📬 Notify Me At Launch
          </a>
        </div>
      </section>

      <div className="section-line" />

      {/* ── CONNECT ── */}
      <section id="connect" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            Follow Along
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 44 }}>Connect With Me</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="sm:grid-cols-3 grid-cols-2">
            {SOCIALS.map((s) =>
              s.url ? (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="gold-border card-lift" style={{ borderRadius: 18, padding: "22px 14px", background: "rgba(14,14,24,0.8)", textDecoration: "none", display: "block" }}>
                  <p style={{ fontSize: 26, marginBottom: 8 }}>{s.emoji}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{s.name}</p>
                </a>
              ) : (
                <div key={s.name} style={{ borderRadius: 18, padding: "22px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 26, marginBottom: 8, opacity: 0.4 }}>{s.emoji}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#6b7280" }}>{s.name}</p>
                  <p style={{ fontSize: 10, color: "#4b5563", marginTop: 4 }}>Coming soon</p>
                </div>
              )
            )}
          </div>

          <div style={{ marginTop: 48 }}>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#c9a84c", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
            >
              ✉️ {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

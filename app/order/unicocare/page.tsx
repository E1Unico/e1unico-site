import { Metadata } from "next";
import Image from "next/image";
import BuyButton from "../../components/BuyButton";

export const metadata: Metadata = {
  title: "UnicoCare — Hosting, Visibility & AI Plans | E1 Unico Corporation",
  description:
    "Keep your business online, visible, and AI-discoverable. UnicoCare plans include website + email hosting, SEO, AEO, and done-for-you support. Starting at $99/mo.",
};

type Tier = {
  product: string;
  name: string;
  tagline: string;
  price: number;
  emoji: string;
  highlight?: boolean;
  features: string[];
};

const TIERS: Tier[] = [
  {
    product: "unicocare-essential",
    name: "Essential",
    tagline: "Stay online. The required floor.",
    price: 99,
    emoji: "🛟",
    features: [
      "Business email hosting (you@yourbusiness.com)",
      "Website hosting · SSL · daily backups",
      "DNS & domain management",
      "99.9% uptime monitoring",
      "1 support ticket / month",
      "Includes UnicoOS Pro access",
    ],
  },
  {
    product: "unicocare-visible",
    name: "Visible",
    tagline: "Get found by humans.",
    price: 199,
    emoji: "🔎",
    features: [
      "Everything in Essential",
      "Local SEO + Google Business Profile management",
      "Monthly blog/content post (AI-assisted, human-reviewed)",
      "Review request automation",
      "Monthly performance report",
      "Social profile sync (FB · IG · LinkedIn)",
    ],
  },
  {
    product: "unicocare-ai",
    name: "AI",
    tagline: "Get found by AI.",
    price: 299,
    emoji: "🤖",
    highlight: true,
    features: [
      "Everything in Visible",
      "AEO — be cited by ChatGPT · Claude · Perplexity · Gemini",
      "Schema.org structured data + llms.txt",
      "AI knowledge-base for your business",
      "Quarterly AI visibility audit (which models cite you?)",
      "Submission to AI index pipelines where supported",
    ],
  },
  {
    product: "unicocare-pro",
    name: "Pro",
    tagline: "Done for you, end to end.",
    price: 499,
    emoji: "👑",
    features: [
      "Everything in AI",
      "Up to 4 hrs/mo site updates & content edits",
      "Paid ads management (Google + Meta · spend separate)",
      "Full social media management (3 platforms)",
      "Priority phone + text support",
      "Dedicated account manager · weekly check-in",
    ],
  },
];

export default function UnicoCarePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", paddingTop: 80 }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>E1 Unico <span style={{ color: "#c9a84c" }}>Corporation</span></span>
        </a>
        <a href="tel:18333186426" style={{ background: "linear-gradient(135deg, #c9a84c, #9a7a2e)", color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none" }}>📞 Call Now</a>
      </nav>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)", color: "#a5b4fc", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 999, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            Required Monthly Care
          </span>
          <h1 style={{ fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 14 }}>
            <span style={{ background: "linear-gradient(135deg, #f0c96e, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>UnicoCare</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 17, maxWidth: 640, margin: "0 auto", lineHeight: 1.5 }}>
            Keep your business online, visible, and discoverable by AI. Email + website hosting baked in, then optional power-ups to grow.
          </p>

          <div style={{ marginTop: 22, display: "inline-flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            <span style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#f0c96e", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 999 }}>
              ✨ 1st month FREE with the 2K Special
            </span>
            <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af", fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 999 }}>
              No long-term contract · Cancel anytime after month 1
            </span>
          </div>
        </div>

        {/* Tier grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {TIERS.map(t => (
            <div
              key={t.product}
              style={{
                position: "relative",
                background: t.highlight
                  ? "linear-gradient(155deg, rgba(99,102,241,0.18), rgba(201,168,76,0.10))"
                  : "rgba(255,255,255,0.03)",
                border: t.highlight ? "1px solid rgba(99,102,241,0.45)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                minHeight: 480,
              }}
            >
              {t.highlight && (
                <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #6366f1, #c9a84c)", color: "white", fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 999, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Most Recommended
                </span>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 28 }}>{t.emoji}</span>
                <p style={{ fontWeight: 900, fontSize: 22, color: "white" }}>UnicoCare {t.name}</p>
              </div>
              <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 16 }}>{t.tagline}</p>

              <div style={{ marginBottom: 18 }}>
                <span style={{ fontSize: 40, fontWeight: 900, color: "white", lineHeight: 1 }}>${t.price}</span>
                <span style={{ color: "#6b7280", fontSize: 13, marginLeft: 4 }}>/mo</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, flex: 1, marginBottom: 18 }}>
                {t.features.map(f => (
                  <li key={f} style={{ display: "flex", gap: 8, fontSize: 12.5, color: "#d1d5db", lineHeight: 1.45 }}>
                    <span style={{ color: t.highlight ? "#a5b4fc" : "#c9a84c", flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <BuyButton
                product={t.product}
                label={`Start ${t.name} — $${t.price}/mo`}
                className={t.highlight ? "btn-indigo" : "btn-gold"}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>

        {/* Why UnicoCare strip */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, color: "white", textAlign: "center" }}>Why UnicoCare is included with every E1 Unico launch</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { emoji: "🚫", title: "Dead websites kill businesses", desc: "Email and hosting need someone watching them. We don't hand you a ticking time bomb." },
              { emoji: "🤖", title: "AI is the new search", desc: "Your customers ask ChatGPT before Google now. UnicoCare AI gets you cited." },
              { emoji: "🛠️", title: "Real humans behind it", desc: "When something breaks, you call 1-833-E1-UNICO. No tier-1 chat bots." },
              { emoji: "📈", title: "Scales with you", desc: "Start at $99/mo. Move up the moment you want growth. No annual lock-in." },
            ].map(b => (
              <div key={b.title} style={{ background: "rgba(255,255,255,0.025)", borderRadius: 14, padding: "16px 16px" }}>
                <p style={{ fontSize: 24, marginBottom: 6 }}>{b.emoji}</p>
                <p style={{ fontWeight: 800, fontSize: 14, color: "white", marginBottom: 4 }}>{b.title}</p>
                <p style={{ fontSize: 12.5, color: "#9ca3af", lineHeight: 1.5 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 760, margin: "0 auto", marginBottom: 60 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 18, color: "white", textAlign: "center" }}>Quick answers</h2>
          {[
            { q: "Is UnicoCare required?", a: "Yes. Every 2K Special launch includes 1 month of UnicoCare Essential free. After that, an active UnicoCare plan ($99/mo minimum) is required so your email + website stay live, secure, and supported." },
            { q: "Can I upgrade or downgrade later?", a: "Anytime. Move between Essential, Visible, AI, and Pro from your UnicoOS account. Changes apply the next billing cycle." },
            { q: "What is AEO?", a: "Answer Engine Optimization — making sure ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews can find, understand, and cite your business when people ask AI questions in your niche." },
            { q: "What if I already have hosting?", a: "We migrate it. Part of onboarding. You end up on one bill, one phone number, one team." },
          ].map(f => (
            <details key={f.q} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
              <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 14, color: "white" }}>{f.q}</summary>
              <p style={{ marginTop: 10, fontSize: 13.5, color: "#9ca3af", lineHeight: 1.6 }}>{f.a}</p>
            </details>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ fontSize: 13, color: "#6b7280" }}>
            Questions? Call <a href="tel:18333186426" style={{ color: "#c9a84c", textDecoration: "none", fontWeight: 700 }}>1-833-E1-UNICO</a> · Evenings 7:30–9:30 PM · 7 days/wk
          </p>
        </div>
      </div>
    </main>
  );
}

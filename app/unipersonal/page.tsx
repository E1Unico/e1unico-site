import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UniPersonal — Your Money and Your Business, One View, Free | UnicoOS",
  description:
    "UniPersonal is the free personal-finance side of UnicoOS: link your bank with Plaid, see your net worth, budget, bills and recurring charges, sort your year with tax-ready categories and receipts — and, if you run a business, see your personal and business money side by side with a wall between them.",
  openGraph: {
    title: "UniPersonal — Your Money and Your Business, One View, Free",
    description: "Free net worth, budgets, bills, subscription detection and a tax-ready year-end worksheet — and your personal money next to your business money, kept apart. Part of UnicoOS.",
  },
  alternates: { canonical: "/unipersonal" },
};

// Only what is live on UnicoOS today. Anything still rolling out says so.
const LIVE = [
  { emoji: "🏦", title: "Link your bank, securely", desc: "Connect checking, savings, cards and loans through Plaid. Flag each account as personal or business — that flag decides which side of the house it counts on." },
  { emoji: "📈", title: "Net worth, free", desc: "Assets minus what you owe, tracked daily from your linked accounts, plus anything you add by hand (a car, a private loan). No paywall on the number that matters most." },
  { emoji: "🔁", title: "Recurring charges, found for you", desc: "Subscriptions, bills and paychecks detected from your own feed — same merchant, steady rhythm, steady amount — with price increases flagged." },
  { emoji: "🧮", title: "Budgets, bills and alerts", desc: "Category budgets with rollover, a bills calendar, and alerts for low balances, big charges, bank fees, deposits and bills due — all in the app." },
  { emoji: "🏠", title: "Share with your household", desc: "Choose which accounts your household sees and budget together. Everything else stays yours alone." },
  { emoji: "🧱", title: "Personal and business, side by side", desc: "If you also run a business on UnicoOS, one screen shows your personal money next to your company's — read separately, never mixed — and lists what you're paying on both sides." },
  { emoji: "🧭", title: "Guided cancellation that checks itself", desc: "A cancel guide for any subscription — the merchant's site, the steps, a ready-to-send email — and then we watch the next expected charge: it either stops (confirmed) or lands again (flagged)." },
  { emoji: "📲", title: "Money alerts on your phone", desc: "Bill due, low balance, a bank fee, a large charge — pushed to your device, with the same mute and quiet-hours controls as every UnicoOS notification." },
  { emoji: "💬", title: "Ask about your money", desc: "Plain-language answers over your own figures — where it went this month, why it was tight, which personal tools your business already pays for." },
  { emoji: "🏷️", title: "Categories built for tax time", desc: "Around 180 detailed categories — rent, dentist, church, a tax refund, a reimbursement, an IRA contribution — each with a plain note on how it usually lands at tax time. New bank rows arrive already sorted; a rule applies your pick to the rest." },
  { emoji: "📋", title: "A year-end tax worksheet", desc: "Your year grouped the way a preparer asks: what may qualify for a deduction or credit, income by the form it arrives on, money in that isn't income, payments that aren't expenses. One CSV for your preparer. Pointers, never a determination." },
  { emoji: "📎", title: "Receipts on the charge", desc: "Snap a photo or drop a PDF onto any transaction. It rides your deductible export and, if you file with UniTax File, goes to the preparer with the return." },
  { emoji: "🧾", title: "It feeds your return", desc: "On UniTax File, the Deductions and Credits steps suggest figures straight from your worksheet and the Income step lists the forms to expect. Suggestions you confirm — nothing reaches the return on its own." },
];

// Built and in review — the owner merges each one after a look.
const ROLLING = [
  { emoji: "↗️", title: "Worksheet to return, one tap", desc: "Each pile on the Taxes tab links to the UniTax File step that reads it, and the \"sort these\" notes open your ledger on exactly those rows." },
  { emoji: "🗓️", title: "Estimated-tax pointer", desc: "Self-employment or gig income in your feed? See the income so far, the estimated payments already sent and the next federal date — with an opt-in reminder before each one. What's owed stays your preparer's call." },
];

// Qualitative on purpose — no competitor prices or feature claims we can't stand behind.
const COMPARE: { feature: string; uni: string; others: string }[] = [
  { feature: "Net worth", uni: "Free", others: "Often behind a paid tier" },
  { feature: "Subscriptions found from your feed", uni: "Free, from your own transactions", others: "Usually the hook — sometimes the upsell" },
  { feature: "Your business money too", uni: "Same login, side by side, walled apart", others: "Personal only" },
  { feature: "Who can see your personal accounts", uni: "You. Never your company or teammates", others: "Varies" },
  { feature: "Cancelling a subscription", uni: "Guided, then verified against the next charge", others: "Done-for-you, typically paid" },
  { feature: "Tax time", uni: "Categories with tax notes, a year-end worksheet, receipts on the charge — free", others: "Often a paid tier, or a separate app" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "Is UniPersonal really free?", a: "Yes. Personal finance is part of the free UnicoOS tier — net worth, budgets, bills, alerts and recurring-charge detection included. Some AI features across UnicoOS use UnicoAI credits; the core money tools don't." },
  { q: "How do you know what's personal and what's business?", a: "You tell us, once, per account. A bank account flagged personal belongs to you: it appears only in your own view and never on your company's Banking page, no matter who else works in that business on UnicoOS." },
  { q: "Do you pull my credit score?", a: "UniPersonal tracks the score you record, alongside credit-health signals from your linked cards (utilization, limits, terms). It is not a credit-bureau pull." },
  { q: "How does subscription detection work?", a: "It's our own detection over your linked transactions: the same merchant on a weekly, biweekly, monthly, quarterly or yearly rhythm with a steady amount. You can mark anything as ignored, cancelled or add it to a budget." },
  { q: "What does 'a wall between them' mean?", a: "Your personal accounts are read as you; your company's accounts are read as the company. They are never queried together, and nobody on your team can see your personal side. The one screen that shows both simply puts the two next to each other." },
  { q: "Can I use it without a business?", a: "Yes. Sign up for UnicoOS, link an account, and the personal side works on its own. The business column fills in only if you ever run a business there." },
  { q: "Does UniPersonal do my taxes?", a: "No. It sorts your own transactions by the tax note on each category, keeps the receipts, and hands the figures to UniTax File or to your preparer as pointers — what may qualify, which form to expect. Nothing in UniPersonal decides what is deductible or what you owe; you or your preparer confirm every figure." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "UniPersonal",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Personal finance is included in the free UnicoOS tier." },
      description:
        "The free personal-finance side of UnicoOS: bank linking via Plaid, net worth, budgets, bills, alerts on your phone, recurring-charge detection with guided cancellation, household sharing, tax-ready categories with a year-end worksheet and receipts, and a personal + business money view kept apart by an origin wall.",
      publisher: { "@type": "Organization", name: "E1 Unico Corporation", url: "https://e1unico.com" },
      url: "https://unicoos.app",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const green = "#34d399";
const greenLight = "#6ee7b7";

export default function UniPersonalPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", overflow: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>Uni<span style={{ color: greenLight }}>Personal</span></span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="#live" className="hidden sm:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>What you get</a>
          <Link href="/apps" className="hidden md:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>All Apps</Link>
          <a href="https://unicoos.app/register" target="_blank" rel="noreferrer" style={{ color: "#05050a", fontWeight: 800, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none", background: `linear-gradient(135deg, ${green}, #10b981)` }}>Start free</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 20px 60px", position: "relative" }}>
        <div className="glow-orb" style={{ width: 620, height: 620, background: green, top: "6%", right: "6%" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 420, height: 420, background: "#4f46e5", bottom: "8%", left: "10%" }} />
        <div className="glow-orb glow-orb-3" style={{ width: 320, height: 320, background: greenLight, top: "40%", left: "45%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 50, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.35)", color: greenLight, fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
              💚 Part of UnicoOS · Free tier · Live
            </span>
            <h1 style={{ fontSize: "clamp(42px, 7.5vw, 80px)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em", marginBottom: 22 }}>
              Your money.<br />
              <span style={{ color: greenLight }}>Your business.</span><br />
              One view. A wall between.
            </h1>
            <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 540, lineHeight: 1.6, marginBottom: 16 }}>
              Most money apps manage your personal money. UniPersonal manages your money <em>and</em> your business — in one place,
              with a wall between them — for the millions of people who are both.
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>
              Net worth, budgets, bills and recurring charges are <strong style={{ color: "white" }}>free</strong>. Built by <strong style={{ color: "white" }}>E1 Unico</strong> inside <strong style={{ color: "#818cf8" }}>UnicoOS</strong>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href="https://unicoos.app/register" target="_blank" rel="noreferrer" style={{ color: "#05050a", fontWeight: 800, fontSize: 16, padding: "16px 34px", borderRadius: 16, textDecoration: "none", background: `linear-gradient(135deg, ${green}, #10b981)`, boxShadow: "0 8px 40px rgba(52,211,153,0.3)" }}>
                💚 Start free on UnicoOS
              </a>
              <a href="#live" style={{ color: "white", fontWeight: 700, fontSize: 16, padding: "16px 30px", borderRadius: 16, textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                What you get ↓
              </a>
            </div>
          </div>

          {/* Two-column visual */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="card-lift" style={{ width: "100%", maxWidth: 400, borderRadius: 22, background: "linear-gradient(145deg, #071a12 0%, #0b2419 55%, #050e0a 100%)", border: "1px solid rgba(52,211,153,0.3)", boxShadow: "0 24px 70px rgba(52,211,153,0.15)", padding: 22 }}>
              <p style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>This month</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 14 }}>
                  <p style={{ fontSize: 11, color: greenLight, fontWeight: 700, marginBottom: 8 }}>👤 You</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>Cash · cards · subscriptions</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>Read as <strong style={{ color: "white" }}>you</strong></p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 14 }}>
                  <p style={{ fontSize: 11, color: "#818cf8", fontWeight: 700, marginBottom: 8 }}>🏢 Your business</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>Cash · invoices · bills</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>Read as <strong style={{ color: "white" }}>the company</strong></p>
                </div>
              </div>
              <div style={{ marginTop: 14, height: 1, background: "linear-gradient(90deg, rgba(52,211,153,0.5), rgba(129,140,248,0.5))" }} />
              <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 12 }}>🔍 <strong style={{ color: "white" }}>Paid on both sides</strong> — the same tool showing up in both feeds, worth a look.</p>
              <p style={{ fontSize: 11, color: "#4b5563", marginTop: 10 }}>Never queried together. Never counted twice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE TODAY ── */}
      <section id="live" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: greenLight, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>In UnicoOS Today</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 900, letterSpacing: "-0.02em" }}>What you get, free.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {LIVE.map(s => (
              <div key={s.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "30px 26px" }}>
                <span style={{ fontSize: 34 }}>{s.emoji}</span>
                <p style={{ fontWeight: 800, fontSize: 19, color: "white", margin: "14px 0 8px" }}>{s.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── COMPARE ── */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(52,211,153,0.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: greenLight, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Why UniPersonal</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 14 }}>
              A personal-only app can&apos;t see half your life.
            </h2>
          </div>
          <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>What matters</th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 900, color: greenLight }}>UniPersonal</th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 700, color: "#6b7280" }}>Typical money apps</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: i % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "#d1d5db", fontWeight: 600 }}>{row.feature}</td>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "white" }}><span style={{ color: greenLight, marginRight: 6 }}>✓</span>{row.uni}</td>
                    <td style={{ padding: "15px 20px", fontSize: 13, color: "#6b7280" }}>{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, marginTop: 16 }}>General comparison with the personal-finance app category; features and pricing of other apps change and vary.</p>
        </div>
      </section>

      <div className="section-line" />

      {/* ── ROLLING OUT ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Rolling Out</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 14 }}>Next up.</h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              Built and in review — arriving in UnicoOS over the coming releases.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {ROLLING.map(c => (
              <div key={c.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "26px 24px" }}>
                <p style={{ fontSize: 30, marginBottom: 12 }}>{c.emoji}</p>
                <p style={{ fontWeight: 800, fontSize: 17, color: "white", marginBottom: 8 }}>{c.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 13.5, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── FAQ ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: greenLight, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Straight Answers</p>
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
        <div className="glow-orb" style={{ width: 560, height: 560, background: green, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }} />
        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: 16 }}>
            See both sides <span style={{ color: greenLight }}>of your money.</span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
            Sign up for UnicoOS, link an account, flag it personal. The rest is free — and if you run a business, it&apos;s already next door.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <a href="https://unicoos.app/register" target="_blank" rel="noreferrer" style={{ color: "#05050a", fontWeight: 800, fontSize: 16, padding: "16px 34px", borderRadius: 16, textDecoration: "none", background: `linear-gradient(135deg, ${green}, #10b981)` }}>
              💚 Start free on UnicoOS
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
            <span style={{ color: greenLight, fontWeight: 600 }}>UniPersonal</span>
            <Link href="/unicocard" className="gold-text" style={{ textDecoration: "none", fontWeight: 600 }}>UnicoCard</Link>
            <a href="https://unicoos.app" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>UnicoOS →</a>
            <Link href="/legal/privacy" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
            <Link href="/legal/terms" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Terms of Service</Link>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 E1 Unico Corporation · UniPersonal is part of UnicoOS · Building the Empire 🦅</p>
        </div>
      </footer>
    </main>
  );
}

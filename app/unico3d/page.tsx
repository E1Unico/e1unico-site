import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "Unico3D — Describe It. Print It. Cut It. | Early Access",
  description:
    "Unico3D turns a sentence or a photo into a 3D model, tagged with how you'll make it — 3D print, CNC, laser-cut leather, metal — and hands you an STL sized for your printer. Part of UnicoOS, works on its own. Join early access.",
  openGraph: {
    title: "Unico3D — Describe It. Print It. Cut It.",
    description: "Text or photo → 3D model → STL for your printer, CNC, leather or metal shop. Part of UnicoOS, works on its own. Early access — join the list.",
  },
  alternates: { canonical: "/unico3d" },
};

const HOW = [
  { emoji: "✍️", title: "Describe it, or snap it", desc: "Type what you need — \"a phone stand with a cable slot\" — or upload a photo of the thing. Unico3D builds the 3D model." },
  { emoji: "🛠", title: "Say how you'll make it", desc: "3D print (filament or resin), CNC, laser-cut leather, or metal. Set the material and the real size in millimeters. Each method comes with a short what-it-wants guide." },
  { emoji: "📦", title: "Download and go", desc: "Grab the STL or 3MF — already rotated for your slicer and scaled to the size you gave — a cut profile as SVG / DXF for the laser, or the raw OBJ / GLB for CAD. Open it in Cura, Bambu Studio, LightBurn, Fusion, Lychee… whatever you run." },
];

// Positioning — qualitative on purpose. No vendor names, no per-model price
// until the owner confirms it; no claims about file types we don't ship yet.
const COMPARE: { feature: string; unico3d: string; others: string }[] = [
  { feature: "Where your shop runs", unico3d: "Inside UnicoOS — same login as your quotes, invoices and customers", others: "A separate tool, a separate account" },
  { feature: "From idea to model", unico3d: "A sentence or a photo", others: "Hours in CAD, or hire it out" },
  { feature: "Ready for the machine", unico3d: "STL / 3MF rotated and sized for the slicer; SVG / DXF profiles for the laser", others: "Convert, rotate and scale by hand" },
  { feature: "Fabrication-aware", unico3d: "Print / CNC / leather / metal, each with its own guide", others: "A generic mesh" },
  { feature: "How you pay", unico3d: "Per model, with UnicoAI credits", others: "Another monthly subscription" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "What is Unico3D?", a: "A design desk for makers. You describe a part (or upload a photo), Unico3D generates a 3D model, you tag it with how it'll be made — 3D print, CNC, laser-cut leather, or metal — plus the material and real-world size, and you download a file your machine understands. It's built into UnicoOS, so a maker who also runs a shop has their quotes, invoices and customers in the same place." },
  { q: "Do I need UnicoOS to use it?", a: "Unico3D lives inside UnicoOS today — it has its own front door, and a free sign-up as a 3D-printing / CNC / fabrication business drops you straight into it. A standalone Unico3D app and domain are on the roadmap; you don't have to use anything else in UnicoOS to use Unico3D." },
  { q: "What files do I get?", a: "A binary STL and a 3MF project file, both already rotated to Z-up and scaled so the longest side matches the size you set — the files every slicer opens; cut profiles as SVG / DXF (the outline of a section at any height) for laser cutters, plasma and waterjet; plus the model's native OBJ / GLB / FBX / USDZ for CAD and viewers." },
  { q: "Does it do CNC and metal, not just 3D printing?", a: "It gives you the shape for all of them: the STL or OBJ goes into your CAM software (Fusion, Carbide Create) for CNC, and casting shops take the STL for a pattern. A true solid (STEP) for machining is a different pipeline and isn't here yet. For leather and sheet metal you get a cut profile — the outline of a section through the model at the height you pick — as SVG for the laser or DXF for the plasma table; for a flat piece that is the pattern. Unfolding a curved surface into a flat pattern is still on the list." },
  { q: "Is it available now?", a: "It's opening in early access. The engine behind it is being connected and priced; join the list and you'll hear the moment it's on. Nothing on this page is a live offer." },
  { q: "How much does a model cost?", a: "Per model, with the UnicoAI credits you already use across Unico apps — a quick preview is cheaper than a textured refine or a photo-to-3D run. We'll publish the exact figures at launch, not before." },
  { q: "Can I edit the model?", a: "Not inside Unico3D — it's a generator, not a CAD editor. You can spin it around in the page, read its volume, weight and watertight check, and download the OBJ / GLB to tweak it in Blender, Fusion, Tinkercad or whatever you use." },
  { q: "What happens to my prompts and photos?", a: "They're used to generate your model and nothing else. Designs belong to your business in UnicoOS — another business can't see them. Prompts and photo links go to the 3D engine; your customer and company data never do." },
];

// Structured data. Describes an upcoming product in early access, with NO
// price asserted.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Unico3D",
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      description:
        "Early-access 3D design tool for makers: a sentence or a photo becomes a 3D model, tagged with the fabrication method (3D print, CNC, laser-cut leather, metal), material and size, downloadable as an STL sized for the slicer. Part of UnicoOS; standalone app planned.",
      offers: { "@type": "Offer", availability: "https://schema.org/PreOrder", url: "https://e1unico.com/unico3d" },
      provider: { "@type": "Organization", name: "E1 Unico Corporation", url: "https://e1unico.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const BUILT = [
  "Text → 3D model (fast preview, then a textured refine)",
  "Photo → 3D model",
  "Tag each design: 3D print (filament / resin), CNC, laser leather, metal — with material and size in mm",
  "A short \"what this method wants\" guide for every design",
  "Download STL and 3MF — Z-up, scaled to your size — plus OBJ / GLB / FBX / USDZ",
  "Cut profiles as SVG / DXF for laser leather and sheet metal — the outline at any height",
  "Spin the model around in the page before you download",
  "Print facts: volume, surface, estimated weight for your material, watertight check",
  "Quote it: the part goes straight onto an estimate for a customer, then an invoice",
  "Files kept in Unico's own storage — a design outlives the vendor's link",
  "Designs scoped to your business, never another's",
];

const NEXT = [
  "A true unfold of curved surfaces into flat leather patterns",
  "STEP solids for CNC (a different pipeline from a mesh)",
  "Kerf offset and nesting several profiles on one sheet",
  "Standalone Unico3D app and domain",
];

const orange = "#f97316";
const amber = "#fdba74";
const gold = "#c9a84c";

export default function Unico3DPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", overflow: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8, background: "white", padding: 2 }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: "white" }}>Unico<span style={{ background: "linear-gradient(135deg,#fdba74,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>3D</span></span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="#how" className="hidden sm:block" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 12px" }}>How it works</a>
          <a href="https://unicoos.app/3d" target="_blank" rel="noreferrer" className="hidden sm:block" style={{ fontSize: 13, color: "#818cf8", textDecoration: "none", padding: "6px 12px" }}>Open in UnicoOS</a>
          <a href="#waitlist" style={{ color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none", background: "linear-gradient(135deg,#f97316,#ea580c)" }}>Get Early Access</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 20px 60px", position: "relative" }}>
        <div className="glow-orb" style={{ width: 620, height: 620, background: orange, top: "6%", right: "6%" }} />
        <div className="glow-orb glow-orb-2" style={{ width: 420, height: 420, background: "#b45309", bottom: "8%", left: "10%" }} />
        <div className="glow-orb glow-orb-3" style={{ width: 320, height: 320, background: gold, top: "40%", left: "45%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 50, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.35)", color: amber, fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
              🧊 Early Access · Part of UnicoOS · Works on its own
            </span>
            <h1 style={{ fontSize: "clamp(44px, 8vw, 84px)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em", marginBottom: 22 }}>
              Describe it.<br />
              Print it.<br />
              <span style={{ background: "linear-gradient(135deg, #fdba74, #f97316, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Cut it.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 520, lineHeight: 1.6, marginBottom: 16 }}>
              Unico3D turns a sentence or a photo into a 3D model, tagged with how you&apos;ll make it — 3D print, CNC,
              laser-cut leather, metal — and hands you an STL already sized for your machine.
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>
              For print farms, machine shops, leatherworkers, blacksmiths and anyone with a printer in the garage. Built by <strong style={{ color: "white" }}>E1 Unico</strong>. <strong style={{ color: amber }}>Opening in early access — join the list.</strong>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href="#waitlist" style={{ color: "white", fontWeight: 800, fontSize: 16, padding: "16px 34px", borderRadius: 16, textDecoration: "none", background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow: "0 8px 40px rgba(249,115,22,0.35)" }}>
                🧊 Get Early Access
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

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>How It Works</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Three steps from idea to machine.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="sm:grid-cols-3 grid-cols-1">
            {HOW.map((s, i) => (
              <div key={s.title} className="card-lift" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "30px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 34 }}>{s.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.2em" }}>STEP {i + 1}</span>
                </div>
                <p style={{ fontWeight: 800, fontSize: 19, color: "white", marginBottom: 8 }}>{s.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── WHO IT'S FOR ── */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Built For</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Every kind of maker.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
            {[
              { emoji: "🖨️", title: "3D print", desc: "Filament or resin. STL sized to your bed, rotated the way the slicer expects." },
              { emoji: "⚙️", title: "CNC", desc: "The shape for your CAM software. A machinable STEP is a later step — we say so." },
              { emoji: "🧵", title: "Leather", desc: "Model the piece in 3D; take the cut profile as SVG straight to the laser." },
              { emoji: "🔥", title: "Metal", desc: "STL patterns for casting; DXF cut profiles for plasma and waterjet." },
            ].map(c => (
              <div key={c.title} style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 18, padding: "22px 20px" }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{c.emoji}</div>
                <p style={{ fontWeight: 800, fontSize: 16, color: "white", marginBottom: 6 }}>{c.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.55 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── WHY UNICO3D ── */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, rgba(249,115,22,0.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Why Unico3D</p>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 14 }}>
              The model, and the business around it.
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              Generators make a mesh and stop. Unico3D knows what you&apos;re going to do with it — and, if you sell what you make, your quotes, invoices and customers are already next door.
            </p>
          </div>

          <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>What matters</th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 900, color: "white" }}>
                    <span style={{ background: "linear-gradient(135deg,#fdba74,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Unico3D</span>
                  </th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 700, color: "#6b7280" }}>A standalone generator</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: i % 2 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "#d1d5db", fontWeight: 600 }}>{row.feature}</td>
                    <td style={{ padding: "15px 20px", fontSize: 13.5, color: "white" }}>
                      <span style={{ color: amber, marginRight: 6 }}>✓</span>{row.unico3d}
                    </td>
                    <td style={{ padding: "15px 20px", fontSize: 13, color: "#6b7280" }}>{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, marginTop: 16 }}>
            Unico3D is in early access. Per-model pricing will be published at launch — this page is not a live offer.
          </p>
        </div>
      </section>

      <div className="section-line" />

      {/* ── BUILT / NEXT ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Where It Stands</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Built, and next — in plain terms.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }} className="lg:grid-cols-2 grid-cols-1">
            <div style={{ borderRadius: 28, padding: "34px 30px", background: "linear-gradient(145deg, rgba(249,115,22,0.18), rgba(201,168,76,0.10))", border: "1px solid rgba(249,115,22,0.4)", boxShadow: "0 0 60px rgba(249,115,22,0.12)" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Built</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {BUILT.map(f => (
                  <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "#f3f4f6", lineHeight: 1.45 }}>
                    <span style={{ color: amber, flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#waitlist" style={{ display: "block", marginTop: 24, textAlign: "center", color: "white", fontWeight: 800, fontSize: 15, padding: "14px", borderRadius: 14, textDecoration: "none", background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
                🧊 Get Early Access
              </a>
            </div>
            <div style={{ borderRadius: 28, padding: "34px 30px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Next</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {NEXT.map(f => (
                  <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "#d1d5db", lineHeight: 1.45 }}>
                    <span style={{ color: "#6b7280", flexShrink: 0 }}>→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12, color: "#6b7280", marginTop: 20, lineHeight: 1.6 }}>
                Already on UnicoOS? Unico3D shows up for a 3D printing / CNC / fabrication business the moment it&apos;s switched on. <a href="https://unicoos.app/3d" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 700 }}>Open it in UnicoOS →</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── FAQ ── */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Straight Answers</p>
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
        <div className="glow-orb" style={{ width: 560, height: 560, background: orange, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }} />
        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Your next part is <span style={{ background: "linear-gradient(135deg,#fdba74,#f97316,#c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>a sentence away.</span>
            </h2>
            <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.6 }}>
              Unico3D is opening in early access. Join the list and we&apos;ll email you the moment it&apos;s switched on.
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
            <Link href="/apps" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>All Unico Apps</Link>
            <a href="https://unicoos.app" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>UnicoOS →</a>
            <span style={{ color: amber, fontWeight: 600 }}>Unico3D</span>
            <Link href="/legal/privacy" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
            <Link href="/legal/terms" style={{ color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Terms of Service</Link>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 E1 Unico Corporation · Unico3D is a UnicoOS product in early access · Pricing to be announced · Building the Empire 🦅</p>
        </div>
      </footer>
    </main>
  );
}

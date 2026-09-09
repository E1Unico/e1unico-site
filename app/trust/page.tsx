import { Metadata } from "next";
import Link from "next/link";

const UEI = "YSEHX6CMMWA9";
const CAGE = "24MC6";
const SAM_URL = `https://sam.gov/entity/${UEI}`;

export const metadata: Metadata = {
  title: "Trust & Compliance — E1 Unico Corporation",
  description:
    "E1 Unico Corporation is a SAM.gov registered federal contractor (UEI: YSEHX6CMMWA9). Verified, compliant, and eligible for government contract awards.",
};

const gold = "#c9a84c";
const indigo = "#818cf8";
const sectionStyle: React.CSSProperties = { marginBottom: 28 };
const hStyle: React.CSSProperties = { fontSize: 18, fontWeight: 800, color: gold, marginBottom: 10 };
const pStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: "#d1d5db", marginBottom: 10 };

const registration = [
  { label: "Entity Name", value: "E1 UNICO CORPORATION" },
  { label: "Registration Status", value: "✅ Active" },
  { label: "Unique Entity ID (UEI)", value: UEI },
  { label: "CAGE Code", value: CAGE },
  { label: "Registration Purpose", value: "All Awards" },
  { label: "Expiration Date", value: "August 29, 2027" },
  { label: "Physical Address", value: "4402 Rosegate Dr, Spring, TX 77373-6743, USA" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "E1 Unico Corporation",
  url: "https://e1unico.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4402 Rosegate Dr",
    addressLocality: "Spring",
    addressRegion: "TX",
    postalCode: "77373-6743",
    addressCountry: "US",
  },
  identifier: [
    { "@type": "PropertyValue", name: "SAM.gov UEI", value: UEI },
    { "@type": "PropertyValue", name: "CAGE Code", value: CAGE },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Government Registration",
    name: "SAM.gov Federal Contractor Registration",
    validFrom: "2026-08-29",
    validUntil: "2027-08-29",
  },
};

export default function TrustAndCompliance() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 20px 60px" }}>
        <Link href="/" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>← Back to E1Unico.com</Link>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginTop: 20, marginBottom: 8 }}>Trust &amp; Compliance</h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 40 }}>
          Verified federal contractor · Active through August 2027
        </p>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Federal Registration</h2>
          <p style={pStyle}>
            E1 Unico Corporation is registered in the System for Award Management (SAM.gov), the
            official U.S. government system for entity registration. This means we are vetted,
            verified, and eligible to receive federal contract awards.
          </p>
          <div style={{ border: "1px solid rgba(201,168,76,0.25)", borderRadius: 16, overflow: "hidden", marginTop: 16 }}>
            {registration.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 18px",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>{row.label}</span>
                <span style={{ fontSize: 13, color: "white", fontWeight: 700, textAlign: "right" }}>{row.value}</span>
              </div>
            ))}
          </div>
          <a
            href={SAM_URL} target="_blank" rel="noreferrer"
            style={{
              display: "inline-block", marginTop: 16, background: "linear-gradient(135deg, #f0c96e, #c9a84c)",
              color: "#05050a", fontWeight: 800, fontSize: 13, padding: "10px 22px", borderRadius: 999, textDecoration: "none",
            }}
          >
            🔎 Verify Us on SAM.gov →
          </a>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>What SAM.gov registration means</h2>
          <p style={pStyle}>
            • Verified legal business entity<br />
            • Validated address and ownership<br />
            • Eligible for federal government contracts<br />
            • Compliant with Federal Acquisition Regulation (FAR) requirements<br />
            • Searchable and verifiable by any government agency or prime contractor
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Why this matters to you</h2>
          <p style={pStyle}>
            <strong style={{ color: "white" }}>Government agencies:</strong> we&apos;re procurement-ready — no delays, no
            additional vetting needed.
          </p>
          <p style={pStyle}>
            <strong style={{ color: "white" }}>Enterprise clients:</strong> SAM registration demonstrates financial
            stability, legal compliance, and operational maturity — the same due diligence the
            federal government requires.
          </p>
          <p style={pStyle}>
            <strong style={{ color: "white" }}>Partners &amp; subcontractors:</strong> work with a verified prime
            contractor for teaming arrangements on federal opportunities.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Federal &amp; enterprise procurement inquiries</h2>
          <p style={pStyle}>
            E1 Unico Corporation is a SAM.gov registered entity (UEI: {UEI}), eligible for federal,
            state, local, and tribal government contract awards. Contact us at{" "}
            <a href="mailto:Unico@E1Unico.com" style={{ color: indigo }}>Unico@E1Unico.com</a> or{" "}
            <a href="tel:18333186426" style={{ color: indigo }}>1-833-E1-UNICO</a> for procurement inquiries.
          </p>
        </div>
      </div>
    </main>
  );
}

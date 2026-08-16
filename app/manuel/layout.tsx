import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "./data";

export const metadata: Metadata = {
  metadataBase: new URL("https://manuelmontemayor.com"),
  title: "Manuel Montemayor — Entrepreneur & Founder",
  description:
    "Manuel Montemayor is a Texas-based entrepreneur — founder of E1 Unico Corporation and the family of companies behind it. Follow his journey and connect.",
  openGraph: {
    title: "Manuel Montemayor",
    description: "Entrepreneur. Founder. Builder of businesses.",
    url: "https://manuelmontemayor.com",
    siteName: "Manuel Montemayor",
    type: "website",
  },
};

export default function ManuelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#05050a", color: "white", minHeight: "100vh" }}>
      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(5,5,10,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <Image
              src="/e1unico-logo.jpg"
              alt="The Montemayor Crest"
              width={36}
              height={36}
              style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 9, background: "white", padding: 2 }}
            />
            <span style={{ fontWeight: 900, fontSize: 15, color: "white", letterSpacing: "-0.01em" }}>
              Manuel Montemayor
            </span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden sm:flex">
            <a href="#about" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 14px" }}>About</a>
            <a href="#ventures" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 14px" }}>Ventures</a>
            <a href="#podcast" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 14px" }}>Podcast</a>
            <Link href="/links" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", padding: "6px 14px" }}>Links</Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-gold"
              style={{ color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 999, textDecoration: "none", display: "inline-block", marginLeft: 8 }}
            >
              ✉️ Get In Touch
            </a>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 24px", marginBottom: 16, fontSize: 12, color: "#4b5563" }}>
            <Link href="/" style={{ color: "#c9a84c", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <Link href="/links" style={{ color: "#c9a84c", textDecoration: "none", fontWeight: 600 }}>Links</Link>
            <a href="https://e1unico.com" target="_blank" rel="noreferrer" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>E1Unico.com →</a>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#c9a84c", textDecoration: "none", fontWeight: 600 }}>{CONTACT_EMAIL}</a>
          </div>
          <p style={{ fontSize: 11, color: "#374151" }}>© 2026 Manuel Montemayor · El Único</p>
        </div>
      </footer>
    </div>
  );
}

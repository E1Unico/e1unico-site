import type { Metadata } from "next";
import Image from "next/image";
import { CONTACT_EMAIL, SOCIALS, VENTURES } from "../data";

export const metadata: Metadata = {
  title: "Manuel Montemayor — Links",
  description: "Every link to find, follow, and connect with Manuel Montemayor in one place.",
};

export default function ManuelLinks() {
  const rows = [
    ...SOCIALS.filter((s) => s.url).map((s) => ({ label: s.name, emoji: s.emoji, url: s.url })),
    ...VENTURES.map((v) => ({ label: v.name, emoji: v.emoji ?? "🏢", url: v.url })),
    { label: "Email Me", emoji: "✉️", url: `mailto:${CONTACT_EMAIL}` },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "100px 20px 80px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Image
            src="/manuel/portrait.jpg"
            alt="Manuel Montemayor"
            width={110}
            height={110}
            style={{ width: 110, height: 110, objectFit: "cover", borderRadius: "50%", border: "3px solid rgba(201,168,76,0.5)", display: "block" }}
          />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>Manuel Montemayor</h1>
        <p style={{ fontSize: 13, color: "#c9a84c", fontWeight: 600, marginBottom: 36 }}>El Único · Entrepreneur · Founder</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r) => (
            <a
              key={r.label}
              href={r.url}
              target={r.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={r.url.startsWith("mailto:") ? undefined : "noreferrer"}
              className="gold-border card-lift"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                borderRadius: 16,
                padding: "16px 20px",
                background: "rgba(14,14,24,0.85)",
                textDecoration: "none",
                color: "white",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              <span style={{ fontSize: 20 }}>{r.emoji}</span>
              <span>{r.label}</span>
            </a>
          ))}

          {SOCIALS.filter((s) => !s.url).length > 0 && (
            <p style={{ fontSize: 11, color: "#4b5563", marginTop: 8 }}>
              More socials coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

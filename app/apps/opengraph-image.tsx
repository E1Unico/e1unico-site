import { ImageResponse } from "next/og";

// Branded social card for /apps — the ecosystem hub is a prime shareable link,
// so it gets its own card instead of the generic site default.
export const alt = "The Unico App Ecosystem — One login, one empire.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const APPS = [
  { label: "UnicoOS", color: "#818cf8", emoji: "🧩" },
  { label: "UnicoJam", color: "#a78bfa", emoji: "🎵" },
  { label: "UnicoClip", color: "#5eead4", emoji: "🎬" },
  { label: "UnicoMusic", color: "#f9a8d4", emoji: "🎧" },
  { label: "UnicoTube", color: "#fca5a5", emoji: "▶️" },
  { label: "UnicoMobile", color: "#7dd3fc", emoji: "📶" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #05050a 0%, #0e0b1e 55%, #140b2e 100%)",
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: "linear-gradient(135deg, #f0c96e, #c9a84c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#05050a" }}>E1</div>
            <div style={{ display: "flex", marginLeft: 18, fontSize: 30, fontWeight: 800, color: "white" }}>Unico Apps</div>
          </div>
          <div style={{ display: "flex", fontSize: 18, fontWeight: 700, color: "#c9a84c", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 999, padding: "9px 22px", letterSpacing: 2 }}>
            ONE ECOSYSTEM
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, color: "white", lineHeight: 1.02 }}>One login.</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, lineHeight: 1.02, color: "#f0c96e" }}>One empire.</div>
        </div>

        {/* App chips */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {APPS.map(a => (
            <div key={a.label} style={{ display: "flex", alignItems: "center", marginRight: 14, marginTop: 12, padding: "10px 18px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: `1px solid ${a.color}55` }}>
              <span style={{ fontSize: 22, marginRight: 10 }}>{a.emoji}</span>
              <span style={{ display: "flex", fontSize: 22, fontWeight: 700, color: a.color }}>{a.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#9ca3af" }}>Run · Create · Distribute · Earn · Connect</div>
          <div style={{ display: "flex", fontSize: 22, color: "#6b7280" }}>e1unico.com/apps</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

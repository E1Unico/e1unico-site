import { ImageResponse } from "next/og";

// Branded social share card for /unicojam. Statically generated at build time.
export const alt = "UnicoJam — AI Music Studio. Type it. Hear it. Own it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #05050a 0%, #140b2e 55%, #1a1030 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row — brand + badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
              }}
            >
              🎵
            </div>
            <div style={{ display: "flex", marginLeft: 20, fontSize: 34, fontWeight: 800, color: "white" }}>
              <span>Unico</span>
              <span style={{ color: "#a78bfa" }}>Jam</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              color: "#c4b5fd",
              border: "1px solid rgba(167,139,250,0.4)",
              borderRadius: 999,
              padding: "10px 24px",
              letterSpacing: 2,
            }}
          >
            A UNICOOS APP
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 900, color: "white", lineHeight: 1.05 }}>
            Type it. Hear it.
          </div>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 900, lineHeight: 1.05, color: "#a78bfa" }}>
            Own it.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "#9ca3af" }}>
            Full AI songs from a single prompt — your genre, your words.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#c9a84c" }}>
            $14.99/week · One login · Faith-friendly
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>e1unico.com/unicojam</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

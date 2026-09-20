import { ImageResponse } from "next/og";

// Branded social share card for /unicomusic. Statically generated at build time.
export const alt = "UnicoMusic — Stream It. Share It. Get Paid.";
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
          background: "linear-gradient(135deg, #05050a 0%, #2a0b2e 55%, #3a1030 100%)",
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
                background: "linear-gradient(135deg, #f9a8d4, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
              }}
            >
              🎧
            </div>
            <div style={{ display: "flex", marginLeft: 20, fontSize: 34, fontWeight: 800, color: "white" }}>
              <span>Unico</span>
              <span style={{ color: "#f9a8d4" }}>Music</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              color: "#f9a8d4",
              border: "1px solid rgba(249,168,212,0.4)",
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
          <div style={{ display: "flex", fontSize: 104, fontWeight: 900, color: "white", lineHeight: 1.05 }}>
            Stream it. Share it.
          </div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 900, lineHeight: 1.05, color: "#f9a8d4" }}>
            Get paid.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "#9ca3af" }}>
            Publish from UnicoJam. Reach listeners. Earn your share.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#c9a84c" }}>
            Free to listen · Creators earn · Faith-friendly
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>e1unico.com/unicomusic</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

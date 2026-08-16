import { ImageResponse } from "next/og";

export const alt = "Manuel Montemayor — Entrepreneur & Founder";
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
          background: "linear-gradient(135deg, #05050a 0%, #14100a 55%, #1a1508 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#c9a84c", letterSpacing: 4, textTransform: "uppercase" }}>
          El Único
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 900, color: "white", lineHeight: 1.05 }}>
            Manuel
          </div>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 900, lineHeight: 1.05, color: "#c9a84c" }}>
            Montemayor
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#9ca3af" }}>
            Entrepreneur · Founder of E1 Unico Corporation
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>manuelmontemayor.com</div>
      </div>
    ),
    { ...size }
  );
}

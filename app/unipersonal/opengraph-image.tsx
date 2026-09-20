import { ImageResponse } from "next/og";

// Branded social share card for /unipersonal. Statically generated at build time.
export const alt = "UniPersonal — Your money and your business. One view. A wall between.";
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
          background: "linear-gradient(135deg, #05050a 0%, #071a12 55%, #0b2419 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg, #6ee7b7, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
              💚
            </div>
            <div style={{ display: "flex", marginLeft: 20, fontSize: 34, fontWeight: 800, color: "white" }}>
              <span>Uni</span>
              <span style={{ color: "#6ee7b7" }}>Personal</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 20, fontWeight: 700, color: "#6ee7b7", border: "1px solid rgba(110,231,183,0.4)", borderRadius: 999, padding: "10px 24px", letterSpacing: 2 }}>
            FREE · LIVE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 900, color: "white", lineHeight: 1.05 }}>
            Your money. Your business.
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 900, lineHeight: 1.05, color: "#6ee7b7" }}>
            One view. A wall between.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#9ca3af" }}>
            Net worth, budgets, bills and subscriptions — free, inside UnicoOS.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#c9a84c" }}>
            Read as you · Read as the company · Never mixed
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>e1unico.com/unipersonal</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

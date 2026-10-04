import { ImageResponse } from "next/og";

// Branded social share card for /unico3d. Statically generated at build time.
export const alt = "Unico3D — Describe it. Print it. Cut it. Early access.";
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
          background: "linear-gradient(135deg, #05050a 0%, #2a1206 55%, #3b1a08 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg, #fdba74, #f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
              🧊
            </div>
            <div style={{ display: "flex", marginLeft: 20, fontSize: 34, fontWeight: 800, color: "white" }}>
              <span>Unico</span>
              <span style={{ color: "#fdba74" }}>3D</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 20, fontWeight: 700, color: "#fdba74", border: "1px solid rgba(253,186,116,0.4)", borderRadius: 999, padding: "10px 24px", letterSpacing: 2 }}>
            EARLY ACCESS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, color: "white", lineHeight: 1.05 }}>Describe it.</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, lineHeight: 1.05, color: "#fdba74" }}>Print it. Cut it.</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "#9ca3af" }}>
            Text or photo → 3D model → STL for your printer, CNC, leather or metal shop.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#c9a84c" }}>Part of UnicoOS · Works on its own</div>
          <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>e1unico.com/unico3d</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

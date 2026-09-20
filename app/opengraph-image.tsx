import { ImageResponse } from "next/og";

// Default branded social share card for E1Unico.com — applies to the homepage
// and any route that doesn't define its own opengraph-image (trust, legal,
// order pages, /apps). The venture pages keep their own cards.
export const alt = "E1 Unico Corporation — We Launch Real Businesses. BBB Accredited.";
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
          background: "linear-gradient(135deg, #05050a 0%, #12100a 55%, #1a1408 100%)",
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
                background: "linear-gradient(135deg, #f0c96e, #c9a84c, #9a7a2e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 900,
                color: "#05050a",
              }}
            >
              E1
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
              <div style={{ display: "flex", fontSize: 32, fontWeight: 900, color: "white" }}>E1 Unico Corporation</div>
              <div style={{ display: "flex", fontSize: 18, fontWeight: 700, color: "#c9a84c", letterSpacing: 2 }}>BUSINESS LAUNCH · CONSULTING</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              color: "#c9a84c",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: 999,
              padding: "10px 24px",
              letterSpacing: 2,
            }}
          >
            BBB ACCREDITED
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 900, color: "white", lineHeight: 1.02 }}>
            We Launch
          </div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 900, lineHeight: 1.02, color: "#f0c96e" }}>
            Real Businesses.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#9ca3af" }}>
            The 2K Special · UnicoOS · and the whole Unico app ecosystem.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#c9a84c" }}>
            1-833-E1-UNICO · Texas Based · SAM.gov Registered
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>e1unico.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

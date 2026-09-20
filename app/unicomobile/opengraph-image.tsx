import { ImageResponse } from "next/og";

// Branded social share card for /unicomobile. Statically generated at build time.
export const alt = "UnicoMobile — Wireless, Built Into Your Business. Coming Soon.";
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
          background: "linear-gradient(135deg, #05050a 0%, #072033 55%, #0a2440 100%)",
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
                background: "linear-gradient(135deg, #7dd3fc, #0ea5e9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
              }}
            >
              📶
            </div>
            <div style={{ display: "flex", marginLeft: 20, fontSize: 34, fontWeight: 800, color: "white" }}>
              <span>Unico</span>
              <span style={{ color: "#7dd3fc" }}>Mobile</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              color: "#7dd3fc",
              border: "1px solid rgba(125,211,252,0.4)",
              borderRadius: 999,
              padding: "10px 24px",
              letterSpacing: 2,
            }}
          >
            COMING SOON
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, color: "white", lineHeight: 1.05 }}>
            Your business.
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, lineHeight: 1.05, color: "#7dd3fc" }}>
            Now with a signal.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "#9ca3af" }}>
            Business wireless, built into UnicoOS. Carrier-neutral.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#c9a84c" }}>
            One bill · One login · Tied to your CRM + UniRo
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>e1unico.com/unicomobile</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

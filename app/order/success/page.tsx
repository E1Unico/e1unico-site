import Image from "next/image";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
        <Image src="/e1unico-logo.jpg" alt="E1 Unico" width={72} height={72} style={{ width: 72, height: 72, objectFit: "contain", borderRadius: 16, background: "white", padding: 6, margin: "0 auto 24px" }} />
        <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>
          Order <span style={{ background: "linear-gradient(135deg, #f0c96e, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Confirmed!</span>
        </h1>
        <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Thank you! Payment received. Unico will personally reach out within <strong style={{ color: "white" }}>24 hours</strong> to get you started.
        </p>
        <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 16, padding: "20px", marginBottom: 28 }}>
          <p style={{ color: "#c9a84c", fontWeight: 700, marginBottom: 8 }}>Can&apos;t wait? Call us now:</p>
          <a href="tel:18333186426" style={{ fontSize: 22, fontWeight: 900, color: "white", textDecoration: "none" }}>📞 1-833-E1-UNICO</a>
          <p style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>Evenings 7:30–9:30 PM · 7 days a week</p>
        </div>
        <Link href="/" style={{ color: "#818cf8", fontSize: 14, textDecoration: "none" }}>← Back to E1Unico.com</Link>
      </div>
    </main>
  );
}

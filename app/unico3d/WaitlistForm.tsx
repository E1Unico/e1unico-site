"use client";
import { useState } from "react";
import Link from "next/link";

const MAKES = ["3D printing", "CNC / routing", "Leather", "Metal", "Just curious"];

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [makes, setMakes] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const toggle = (m: string) => setMakes(cur => (cur.includes(m) ? cur.filter(x => x !== m) : [...cur, m]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/unico3d/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, makes: makes.join(", "), page: "/unico3d", source: "unico3d-landing" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setError("Network hiccup — please try again.");
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div
        style={{
          background: "linear-gradient(155deg, rgba(249,115,22,0.18), rgba(201,168,76,0.10))",
          border: "1px solid rgba(249,115,22,0.4)",
          borderRadius: 18,
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 10 }}>🧊</div>
        <p style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 8 }}>You&apos;re on the list.</p>
        <p style={{ color: "#fdba74", fontSize: 14, lineHeight: 1.6 }}>
          We&apos;ll email <strong style={{ color: "white" }}>{email}</strong> as Unico3D opens up.
          No commitment — this just saves your spot.
        </p>
        <Link href="/apps" style={{ display: "inline-block", marginTop: 16, fontSize: 13, color: "#818cf8", fontWeight: 700, textDecoration: "none" }}>
          While you wait, explore the whole Unico ecosystem →
        </Link>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: "13px 16px",
    color: "white",
    fontSize: 15,
    outline: "none",
  };

  return (
    <form
      onSubmit={submit}
      style={{
        background: "rgba(14,14,24,0.85)",
        border: "1px solid rgba(249,115,22,0.3)",
        borderRadius: 20,
        padding: "26px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 0 50px rgba(249,115,22,0.12)",
      }}
    >
      <p style={{ fontSize: 12, fontWeight: 700, color: "#fdba74", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Get Early Access
      </p>
      <input type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="Name or shop (optional)" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
      <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>What do you make? (pick any)</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {MAKES.map(m => {
          const on = makes.includes(m);
          return (
            <button
              key={m}
              type="button"
              onClick={() => toggle(m)}
              aria-pressed={on}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "7px 13px",
                borderRadius: 999,
                cursor: "pointer",
                border: `1px solid ${on ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.12)"}`,
                background: on ? "rgba(249,115,22,0.25)" : "rgba(255,255,255,0.03)",
                color: on ? "white" : "#9ca3af",
              }}
            >
              {m}
            </button>
          );
        })}
      </div>

      {state === "error" && <p style={{ color: "#f87171", fontSize: 13, margin: "2px 0" }}>{error}</p>}

      <button
        type="submit"
        disabled={state === "loading"}
        style={{
          width: "100%",
          color: "white",
          fontWeight: 800,
          fontSize: 15,
          padding: "14px",
          borderRadius: 12,
          border: "none",
          cursor: state === "loading" ? "wait" : "pointer",
          marginTop: 4,
          background: "linear-gradient(135deg,#f97316,#ea580c)",
        }}
      >
        {state === "loading" ? "⏳ Adding you…" : "🧊 Get Early Access"}
      </button>
      <p style={{ fontSize: 11, color: "#6b7280", textAlign: "center", lineHeight: 1.5 }}>
        No spam, no commitment. Unico3D is opening in early access — this just saves your spot.
      </p>
    </form>
  );
}

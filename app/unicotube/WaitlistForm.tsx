"use client";
import { useState } from "react";

const ROLES = ["Video creator", "Vlogger", "Musician / music videos", "Church / ministry", "Business / brand", "Just here to watch"];

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [makes, setMakes] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/unicotube/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, makes, role, page: "/unicotube", source: "unicotube-landing" }),
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
          background: "linear-gradient(155deg, rgba(239,68,68,0.18), rgba(201,168,76,0.10))",
          border: "1px solid rgba(239,68,68,0.4)",
          borderRadius: 18,
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 10 }}>▶️</div>
        <p style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 8 }}>You&apos;re on the list.</p>
        <p style={{ color: "#fca5a5", fontSize: 14, lineHeight: 1.6 }}>
          We&apos;ll email <strong style={{ color: "white" }}>{email}</strong> the moment UnicoTube early access opens.
          Creators who join early get priority placement and first pick of channel handles.
        </p>
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
        border: "1px solid rgba(239,68,68,0.3)",
        borderRadius: 20,
        padding: "26px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 0 50px rgba(239,68,68,0.12)",
      }}
    >
      <p style={{ fontSize: 12, fontWeight: 700, color: "#fca5a5", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Join the Waitlist
      </p>
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="What would you make or watch? (e.g. vlogs, tutorials, music videos)"
        value={makes}
        onChange={e => setMakes(e.target.value)}
        style={inputStyle}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
        {ROLES.map(r => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r === role ? "" : r)}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "7px 13px",
              borderRadius: 999,
              cursor: "pointer",
              border: `1px solid ${role === r ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.12)"}`,
              background: role === r ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.03)",
              color: role === r ? "white" : "#9ca3af",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {state === "error" && (
        <p style={{ color: "#f87171", fontSize: 13, margin: "2px 0" }}>{error}</p>
      )}

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
          background: "linear-gradient(135deg,#ef4444,#f97316)",
        }}
      >
        {state === "loading" ? "⏳ Adding you…" : "▶️ Get Early Access"}
      </button>
      <p style={{ fontSize: 11, color: "#6b7280", textAlign: "center", lineHeight: 1.5 }}>
        No spam. One login across UnicoOS. Faith-friendly by design.
      </p>
    </form>
  );
}

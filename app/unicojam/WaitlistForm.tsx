"use client";
import { useState } from "react";

const USE_CASES = ["Recording artist", "Content creator", "Church / worship", "Label / A&R", "Just for fun"];

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [genres, setGenres] = useState("");
  const [useCase, setUseCase] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/unicojam/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, genres, useCase, page: "/unicojam", source: "unicojam-landing" }),
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
          background: "linear-gradient(155deg, rgba(124,58,237,0.18), rgba(201,168,76,0.10))",
          border: "1px solid rgba(124,58,237,0.4)",
          borderRadius: 18,
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 10 }}>🎧</div>
        <p style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 8 }}>You&apos;re on the list.</p>
        <p style={{ color: "#c4b5fd", fontSize: 14, lineHeight: 1.6 }}>
          We&apos;ll email <strong style={{ color: "white" }}>{email}</strong> the moment UnicoJam early access opens.
          First drop gets founder pricing.
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
        border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: 20,
        padding: "26px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 0 50px rgba(124,58,237,0.12)",
      }}
    >
      <p style={{ fontSize: 12, fontWeight: 700, color: "#c4b5fd", letterSpacing: "0.15em", textTransform: "uppercase" }}>
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
        placeholder="What do you want to make? (e.g. gospel, trap, lo-fi)"
        value={genres}
        onChange={e => setGenres(e.target.value)}
        style={inputStyle}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
        {USE_CASES.map(u => (
          <button
            key={u}
            type="button"
            onClick={() => setUseCase(u === useCase ? "" : u)}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "7px 13px",
              borderRadius: 999,
              cursor: "pointer",
              border: `1px solid ${useCase === u ? "rgba(124,58,237,0.7)" : "rgba(255,255,255,0.12)"}`,
              background: useCase === u ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.03)",
              color: useCase === u ? "white" : "#9ca3af",
            }}
          >
            {u}
          </button>
        ))}
      </div>

      {state === "error" && (
        <p style={{ color: "#f87171", fontSize: 13, margin: "2px 0" }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-indigo"
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
        }}
      >
        {state === "loading" ? "⏳ Adding you…" : "🎵 Get Early Access"}
      </button>
      <p style={{ fontSize: 11, color: "#6b7280", textAlign: "center", lineHeight: 1.5 }}>
        No spam. One login across UnicoOS. Faith-friendly by design. Cancel anytime.
      </p>
    </form>
  );
}

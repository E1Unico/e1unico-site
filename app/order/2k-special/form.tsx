"use client";

import { useState } from "react";

interface Props { product: string; price: string; }

export default function OrderForm({ product, price }: Props) {
  const [form, setForm]       = useState({ name: "", email: "", phone: "", business: "", notes: "" });
  const [status, setStatus]   = useState<"idle"|"sending"|"done"|"error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product, price }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "done") return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <p style={{ fontSize: 40, marginBottom: 12 }}>🎉</p>
      <p style={{ fontWeight: 800, fontSize: 18, color: "white", marginBottom: 8 }}>Order Received!</p>
      <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>
        We got your request for <strong style={{ color: "white" }}>{product}</strong>.<br />
        Unico will reach out within 24 hours to get you started.
      </p>
      <p style={{ color: "#c9a84c", fontSize: 13, fontWeight: 600, marginTop: 16 }}>📞 1-833-E1-UNICO</p>
    </div>
  );

  const inp: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "11px 14px", color: "white", fontSize: 13, outline: "none", boxSizing: "border-box" };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input required style={inp} placeholder="Your Name *" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
      <input required type="email" style={inp} placeholder="Email Address *" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} />
      <input required type="tel" style={inp} placeholder="Phone Number *" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} />
      <input style={inp} placeholder="Business Name (if you have one)" value={form.business} onChange={e => setForm(p => ({...p, business: e.target.value}))} />
      <textarea style={{...inp, resize: "vertical", minHeight: 80}} placeholder="What type of business are you launching?" value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} />
      <button type="submit" disabled={status === "sending"}
        style={{ background: "linear-gradient(135deg, #c9a84c, #9a7a2e)", color: "white", fontWeight: 800, fontSize: 16, padding: "15px", borderRadius: 14, border: "none", cursor: "pointer", opacity: status === "sending" ? 0.7 : 1, boxShadow: "0 8px 32px rgba(201,168,76,0.3)" }}>
        {status === "sending" ? "Sending..." : `🛒 Place Order — ${price}`}
      </button>
      {status === "error" && <p style={{ color: "#f87171", fontSize: 12, textAlign: "center" }}>Something went wrong. Call us at 1-833-E1-UNICO.</p>}
    </form>
  );
}

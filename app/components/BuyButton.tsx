"use client";
import { useState } from "react";

interface Props {
  product: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function BuyButton({ product, label, className, style }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Something went wrong. Call us at 1-833-E1-UNICO.");
    } catch {
      setError("Something went wrong. Call us at 1-833-E1-UNICO.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={checkout} disabled={loading} className={className} style={style}>
        {loading ? "⏳ Loading..." : label}
      </button>
      {error && <p style={{ color: "#f87171", fontSize: 11, marginTop: 8, textAlign: "center" }}>{error}</p>}
    </div>
  );
}

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

  const checkout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <button onClick={checkout} disabled={loading} className={className} style={style}>
      {loading ? "⏳ Loading..." : label}
    </button>
  );
}

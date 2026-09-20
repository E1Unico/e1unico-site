"use client";

import { useEffect, useState } from "react";

// Mobile nav for the homepage. The desktop nav links are hidden below `sm`,
// which left phone visitors with no way to reach sections/ventures from the bar.
// This adds a hamburger that opens an accessible dropdown with the same links.
// Shown only on mobile (the button is `sm:hidden`); desktop keeps the inline nav.

type LinkItem = { label: string; href: string; color?: string; external?: boolean };

const LINKS: LinkItem[] = [
  { label: "The 2K Special", href: "#services", color: "#c9a84c" },
  { label: "All Unico Apps", href: "/apps", color: "#818cf8" },
  { label: "UnicoOS", href: "https://unicoos.app", color: "#818cf8", external: true },
  { label: "UnicoJam", href: "/unicojam", color: "#a78bfa" },
  { label: "UnicoMusic", href: "/unicomusic", color: "#f9a8d4" },
  { label: "UnicoTube", href: "/unicotube", color: "#fca5a5" },
  { label: "UnicoClip", href: "/unicoclip", color: "#5eead4" },
  { label: "UnicoMobile", href: "/unicomobile", color: "#7dd3fc" },
  { label: "Our Companies", href: "#companies", color: "#d1d5db" },
  { label: "Contact", href: "#contact", color: "#d1d5db" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Close on Escape, and lock body scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="sm:hidden" style={{ display: "flex", alignItems: "center" }}>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen(v => !v)}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 10,
          width: 40,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          padding: 0,
        }}
      >
        <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>{open ? "✕" : "☰"}</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, top: 60, background: "rgba(0,0,0,0.5)", zIndex: 45 }}
            aria-hidden
          />
          {/* Panel */}
          <div
            id="mobile-menu-panel"
            style={{
              position: "fixed",
              top: 60,
              left: 0,
              right: 0,
              zIndex: 46,
              background: "rgba(5,5,10,0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "8px 16px 16px",
              display: "flex",
              flexDirection: "column",
              maxHeight: "calc(100vh - 60px)",
              overflowY: "auto",
            }}
          >
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 8px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: l.color || "white",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:18333186426"
              onClick={() => setOpen(false)}
              className="btn-gold"
              style={{
                marginTop: 14,
                textAlign: "center",
                color: "white",
                fontWeight: 800,
                fontSize: 15,
                padding: "14px",
                borderRadius: 12,
                textDecoration: "none",
              }}
            >
              📞 Call 1-833-E1-UNICO
            </a>
          </div>
        </>
      )}
    </div>
  );
}

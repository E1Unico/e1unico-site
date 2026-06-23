"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Msg = { role: "user" | "assistant"; content: string };
type View = "idle" | "menu" | "chat" | "callback" | "thanks";

const QUICK_PROMPTS = [
  "I need to launch a business 🚀",
  "What's the 2K Special?",
  "How much is UnicoOS?",
  "I want a callback from Unico",
];

const UNICOOS_PHONE_DISPLAY = "1-828-OS-UNICO";
const UNICOOS_PHONE_TEL = "+18286786426"; // 1-828-678-6426
const E1_PHONE_DISPLAY = "1-833-E1-UNICO";
const E1_PHONE_TEL = "+18333186426";

export default function UniRo() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [bubble, setBubble] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey, I'm UniRo 🤖 — Unico's AI assistant. How can I help you today? Ask me anything about E1 Unico, the 2K Special, or UnicoOS." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [waving, setWaving] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [problem, setProblem] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const chatBox = useRef<HTMLDivElement>(null);

  // Idle behaviors: occasional wave + tooltip pop
  useEffect(() => {
    if (open) return;
    const messages = [
      "👋 Need help launching?",
      "📞 Call us — 1-833-E1-UNICO",
      "Ask me anything 🤖",
      "🤖 I can hand your info to Unico",
    ];
    const id = setInterval(() => {
      setWaving(true);
      setBubble(messages[Math.floor(Math.random() * messages.length)]);
      setTimeout(() => setWaving(false), 1800);
      setTimeout(() => setBubble(null), 5500);
    }, 18000);

    // First tooltip 5s after page load
    const firstId = setTimeout(() => {
      setBubble("👋 Hi! I'm UniRo. Tap to chat.");
      setWaving(true);
      setTimeout(() => setWaving(false), 1800);
      setTimeout(() => setBubble(null), 6000);
    }, 5000);

    return () => { clearInterval(id); clearTimeout(firstId); };
  }, [open]);

  useEffect(() => {
    if (chatBox.current) chatBox.current.scrollTop = chatBox.current.scrollHeight;
  }, [messages, view]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const nextMessages: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    // Detect callback intent and route to form
    if (/callback|call me|call back|talk to unico|reach out/i.test(trimmed)) {
      setMessages(m => [...m, { role: "assistant", content: "Let's get you on Unico's call list — quick form 👇" }]);
      setSending(false);
      setTimeout(() => setView("callback"), 800);
      return;
    }

    try {
      const res = await fetch("/api/uniro/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      const reply: string = data.reply || "I'll get this to Unico and he'll follow up. Want to leave a callback request?";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "I'm having a tiny brain glitch. Tap '📞 Request Callback' and I'll have Unico reach out directly." }]);
    }
    setSending(false);
  };

  const submitCallback = async () => {
    if (!name || !contact) { setHint("Name and phone or email please."); return; }
    setSending(true);
    setHint(null);
    try {
      const res = await fetch("/api/uniro/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, contact, problem,
          source: "uniro-widget",
          page: typeof window !== "undefined" ? window.location.pathname : "/",
          transcript: messages.slice(-8),
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setView("thanks");
    } catch {
      setHint("Couldn't send right now. Please call us directly: 1-833-E1-UNICO.");
    }
    setSending(false);
  };

  return (
    <>
      {/* ── FLOATING BUTTON + IDLE BUBBLE ─────────────────────────────────── */}
      {!open && (
        <div style={{ position: "fixed", bottom: 18, right: 18, zIndex: 60, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, pointerEvents: "auto" }}>
          {bubble && (
            <div className="uniro-bubble">
              {bubble}
              <span className="uniro-bubble-arrow" />
            </div>
          )}
          <button onClick={() => { setOpen(true); setView("menu"); setBubble(null); }}
            aria-label="Open UniRo assistant"
            className={`uniro-fab ${waving ? "uniro-wave" : ""}`}
          >
            <Image src="/uniro-hero.jpg" alt="UniRo" width={84} height={84} priority={false} className="uniro-fab-img" />
            <span className="uniro-eye" />
            <span className="uniro-badge">Ask UniRo</span>
          </button>
        </div>
      )}

      {/* ── CHAT PANEL ────────────────────────────────────────────────────── */}
      {open && (
        <div className="uniro-panel">
          <div className="uniro-panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="uniro-avatar">
                <Image src="/uniro-hero.jpg" alt="UniRo" width={56} height={56} className="uniro-avatar-img" />
              </div>
              <div>
                <p style={{ fontWeight: 900, fontSize: 15, lineHeight: 1 }}>UniRo 🤖</p>
                <p style={{ fontSize: 11, color: "#a5b4fc", marginTop: 3 }}>Virtual Assistant · E1 Unico</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="uniro-x" aria-label="Close">×</button>
          </div>

          {view === "menu" && (
            <div className="uniro-body">
              <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.55, marginBottom: 12 }}>
                Hey 👋 I'm UniRo. I can answer questions, hand you to Unico, or schedule a callback.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                <a href={`tel:${E1_PHONE_TEL}`} className="uniro-action-card">
                  <span style={{ fontSize: 22 }}>📞</span>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 13 }}>Call E1 Unico</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>{E1_PHONE_DISPLAY} · Evenings 7:30–9:30 PM</p>
                  </div>
                </a>
                <a href={`tel:${UNICOOS_PHONE_TEL}`} className="uniro-action-card">
                  <span style={{ fontSize: 22 }}>🤖</span>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 13 }}>Call UnicoOS Line</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>{UNICOOS_PHONE_DISPLAY} · {`1-828-678-6426`} · 24/7 AI line</p>
                  </div>
                </a>
                <button onClick={() => setView("chat")} className="uniro-action-card uniro-clickable">
                  <span style={{ fontSize: 22 }}>💬</span>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: 800, fontSize: 13 }}>Ask me a question</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>I'll try to help right here.</p>
                  </div>
                </button>
                <button onClick={() => setView("callback")} className="uniro-action-card uniro-clickable">
                  <span style={{ fontSize: 22 }}>🧠</span>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: 800, fontSize: 13 }}>Request a callback from Unico</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>Tell me your problem — he'll reach out.</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {view === "chat" && (
            <>
              <div ref={chatBox} className="uniro-chat">
                {messages.map((m, i) => (
                  <div key={i} className={`uniro-msg ${m.role}`}>
                    <p>{m.content}</p>
                  </div>
                ))}
                {sending && <div className="uniro-msg assistant"><p className="uniro-typing"><span/><span/><span/></p></div>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {QUICK_PROMPTS.map(p => (
                    <button key={p} onClick={() => send(p)} className="uniro-chip">{p}</button>
                  ))}
                </div>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="uniro-input-row">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask UniRo anything…" />
                <button type="submit" disabled={sending || !input.trim()}>↑</button>
              </form>
            </>
          )}

          {view === "callback" && (
            <div className="uniro-body">
              <p style={{ fontSize: 13, color: "#d1d5db", marginBottom: 12 }}>
                I'll pass this straight to Unico (Manuel) — he calls back evenings 7:30–9:30 PM.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                <input className="uniro-field" placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="uniro-field" placeholder="Phone or email *" value={contact} onChange={(e) => setContact(e.target.value)} />
                <textarea className="uniro-field uniro-textarea" placeholder="What problem are you trying to solve? (Business launch, website, marketing, AI receptionist…)" value={problem} onChange={(e) => setProblem(e.target.value)} />
                {hint && <p style={{ fontSize: 11, color: "#f87171" }}>{hint}</p>}
                <button disabled={sending} onClick={submitCallback} className="uniro-submit">
                  {sending ? "Sending…" : "Send to Unico →"}
                </button>
                <p style={{ fontSize: 11, color: "#6b7280", textAlign: "center" }}>
                  Or call directly: <a href={`tel:${E1_PHONE_TEL}`} style={{ color: "#c9a84c", fontWeight: 700 }}>{E1_PHONE_DISPLAY}</a>
                </p>
              </div>
            </div>
          )}

          {view === "thanks" && (
            <div className="uniro-body" style={{ textAlign: "center", padding: "28px 22px" }}>
              <div style={{ fontSize: 44 }}>📨</div>
              <p style={{ fontWeight: 900, fontSize: 16, marginTop: 6 }}>Sent to Unico!</p>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: "10px 0 18px" }}>
                He'll reach out personally. Need something now? Call <a href={`tel:${E1_PHONE_TEL}`} style={{ color: "#c9a84c", fontWeight: 700 }}>{E1_PHONE_DISPLAY}</a> or the 24/7 UnicoOS line <a href={`tel:${UNICOOS_PHONE_TEL}`} style={{ color: "#a5b4fc", fontWeight: 700 }}>{UNICOOS_PHONE_DISPLAY}</a>.
              </p>
              <button onClick={() => { setView("menu"); setName(""); setContact(""); setProblem(""); }} className="uniro-submit" style={{ background: "rgba(255,255,255,0.08)" }}>Done</button>
            </div>
          )}

          <div className="uniro-foot">
            <span>UnicoOS line · </span>
            <a href={`tel:${UNICOOS_PHONE_TEL}`}>📞 {UNICOOS_PHONE_DISPLAY}</a>
            <span> (1-828-678-6426)</span>
          </div>
        </div>
      )}

      {/* ── STYLES ────────────────────────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes uniro-pulse-eye { 0%,90%,100% { opacity: 1; } 95% { opacity: 0.1; } }
        @keyframes uniro-float    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes uniro-wave-fab { 0%,100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-4px) rotate(-7deg); } 50% { transform: translateY(-2px) rotate(7deg); } 75% { transform: translateY(-3px) rotate(-4deg); } }
        @keyframes uniro-fade-in  { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes uniro-typing   { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }

        .uniro-fab {
          position: relative; width: 84px; height: 84px; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #1f2a6e, #0a1230);
          border: 2px solid rgba(99,102,241,0.6);
          box-shadow: 0 18px 38px rgba(0,0,0,0.45), 0 0 0 4px rgba(99,102,241,0.12), 0 0 32px rgba(99,102,241,0.45);
          cursor: pointer; padding: 0; overflow: visible;
          animation: uniro-float 4.5s ease-in-out infinite;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .uniro-fab:hover { transform: scale(1.05); box-shadow: 0 22px 44px rgba(0,0,0,0.5), 0 0 0 4px rgba(99,102,241,0.18), 0 0 48px rgba(99,102,241,0.65); }
        .uniro-fab.uniro-wave { animation: uniro-wave-fab 1.5s ease-in-out 1; }
        .uniro-fab-img { width: 84px; height: 84px; object-fit: cover; border-radius: 50%; }
        .uniro-eye {
          position: absolute; top: 16px; left: 50%; transform: translateX(-50%);
          width: 12px; height: 12px; border-radius: 50%;
          background: radial-gradient(circle, #67e8f9, #0ea5e9 60%, transparent 70%);
          box-shadow: 0 0 12px #67e8f9, 0 0 22px rgba(103,232,249,0.7);
          animation: uniro-pulse-eye 4s ease-in-out infinite;
        }
        .uniro-badge {
          position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, #6366f1, #c9a84c); color: white;
          font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 999px; white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }

        .uniro-bubble {
          position: relative; max-width: 240px;
          background: linear-gradient(155deg, #1f2a6e, #0a1230);
          border: 1px solid rgba(99,102,241,0.5); color: #e2e8f0;
          font-size: 12px; font-weight: 600; padding: 9px 14px; border-radius: 14px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.4); animation: uniro-fade-in 350ms ease;
        }
        .uniro-bubble-arrow {
          position: absolute; right: 28px; bottom: -7px;
          width: 12px; height: 12px; background: #0a1230;
          border-right: 1px solid rgba(99,102,241,0.5); border-bottom: 1px solid rgba(99,102,241,0.5);
          transform: rotate(45deg);
        }

        .uniro-panel {
          position: fixed; bottom: 18px; right: 18px; z-index: 60;
          width: 360px; max-width: calc(100vw - 24px); max-height: 80vh;
          background: linear-gradient(160deg, #050818, #0a0f2a);
          border: 1px solid rgba(99,102,241,0.4); border-radius: 22px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.2);
          display: flex; flex-direction: column; overflow: hidden; color: white;
          animation: uniro-fade-in 280ms ease;
        }
        .uniro-panel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(201,168,76,0.08));
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .uniro-avatar { width: 44px; height: 44px; border-radius: 50%; overflow: hidden; border: 2px solid rgba(99,102,241,0.5); }
        .uniro-avatar-img { width: 44px; height: 44px; object-fit: cover; }
        .uniro-x { background: rgba(255,255,255,0.06); border: none; color: white; width: 30px; height: 30px; border-radius: 50%; font-size: 20px; cursor: pointer; line-height: 1; }
        .uniro-x:hover { background: rgba(255,255,255,0.12); }

        .uniro-body { padding: 18px 16px 8px; overflow-y: auto; }
        .uniro-action-card {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          padding: 12px 14px; border-radius: 14px; color: white;
          text-decoration: none; cursor: pointer; transition: background 150ms ease, border-color 150ms ease;
        }
        .uniro-action-card:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.4); }
        .uniro-clickable { width: 100%; text-align: left; }

        .uniro-chat { padding: 14px 14px 8px; overflow-y: auto; flex: 1; min-height: 280px; max-height: 50vh; display: flex; flex-direction: column; gap: 8px; }
        .uniro-msg { max-width: 85%; padding: 10px 12px; border-radius: 14px; font-size: 13px; line-height: 1.5; animation: uniro-fade-in 200ms ease; }
        .uniro-msg.assistant { align-self: flex-start; background: rgba(99,102,241,0.16); border: 1px solid rgba(99,102,241,0.28); }
        .uniro-msg.user      { align-self: flex-end;   background: rgba(201,168,76,0.18); border: 1px solid rgba(201,168,76,0.35); }
        .uniro-msg p { color: #f1f5f9; }
        .uniro-typing { display: inline-flex; gap: 4px; align-items: center; }
        .uniro-typing span { width: 6px; height: 6px; border-radius: 50%; background: #a5b4fc; animation: uniro-typing 1.2s ease-in-out infinite; }
        .uniro-typing span:nth-child(2) { animation-delay: 0.15s; }
        .uniro-typing span:nth-child(3) { animation-delay: 0.3s; }
        .uniro-chip { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; font-size: 11px; padding: 6px 10px; border-radius: 999px; cursor: pointer; }
        .uniro-chip:hover { background: rgba(99,102,241,0.18); border-color: rgba(99,102,241,0.45); }

        .uniro-input-row { display: flex; gap: 6px; padding: 10px 12px; border-top: 1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.2); }
        .uniro-input-row input { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 8px 12px; color: white; font-size: 13px; outline: none; }
        .uniro-input-row input:focus { border-color: rgba(99,102,241,0.6); }
        .uniro-input-row button { background: linear-gradient(135deg, #6366f1, #c9a84c); border: none; color: white; font-weight: 900; font-size: 16px; padding: 0 14px; border-radius: 10px; cursor: pointer; }
        .uniro-input-row button:disabled { opacity: 0.4; cursor: not-allowed; }

        .uniro-field { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 12px; color: white; font-size: 13px; outline: none; }
        .uniro-field:focus { border-color: rgba(99,102,241,0.55); }
        .uniro-textarea { min-height: 88px; resize: vertical; font-family: inherit; }
        .uniro-submit { background: linear-gradient(135deg, #6366f1, #c9a84c); color: white; border: none; padding: 11px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer; }
        .uniro-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .uniro-foot { font-size: 10.5px; color: #6b7280; text-align: center; padding: 8px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.25); }
        .uniro-foot a { color: #a5b4fc; font-weight: 700; text-decoration: none; }

        @media (max-width: 480px) {
          .uniro-panel { width: calc(100vw - 16px); right: 8px; bottom: 8px; border-radius: 18px; }
          .uniro-fab { width: 72px; height: 72px; }
          .uniro-fab-img { width: 72px; height: 72px; }
        }
      `}</style>
    </>
  );
}

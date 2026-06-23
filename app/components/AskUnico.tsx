"use client";

import { useEffect, useRef, useState } from "react";

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

// E1 Unico logomark as inline SVG — gold "E1" + indigo flourish, sized to fit the avatar.
function E1Mark({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="e1-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0c96e" />
          <stop offset="100%" stopColor="#9a7a2e" />
        </linearGradient>
        <radialGradient id="e1-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(99,102,241,0.45)" />
          <stop offset="100%" stopColor="rgba(10,15,40,0)" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#0a0f2a" />
      <circle cx="32" cy="32" r="30" fill="url(#e1-glow)" />
      <g fontFamily="Geist, system-ui, sans-serif" fontWeight="900" textAnchor="middle">
        <text x="32" y="40" fontSize="26" fill="url(#e1-gold)" letterSpacing="-1">E1</text>
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#e1-gold)" strokeOpacity="0.55" strokeWidth="1.5" />
    </svg>
  );
}

export default function AskUnico() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [bubble, setBubble] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey 👋 I'm Unico's AI — I can answer questions about the 2K Special, UnicoOS, UnicoCare, or get you a callback. What's on your mind?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [waving, setWaving] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [problem, setProblem] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const chatBox = useRef<HTMLDivElement>(null);

  // Idle behaviors
  useEffect(() => {
    if (open) return;
    const idleMsgs = [
      "👋 Need help launching?",
      "📞 1-833-E1-UNICO",
      "Ask me anything 💬",
      "I can get Unico to call you",
    ];
    const id = setInterval(() => {
      setWaving(true);
      setBubble(idleMsgs[Math.floor(Math.random() * idleMsgs.length)]);
      setTimeout(() => setWaving(false), 1800);
      setTimeout(() => setBubble(null), 5500);
    }, 18000);
    const firstId = setTimeout(() => {
      setBubble("👋 Hi! Tap to ask Unico anything.");
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

    if (/callback|call me|call back|talk to unico|reach out/i.test(trimmed)) {
      setMessages(m => [...m, { role: "assistant", content: "Let's get you on Unico's call list — quick form 👇" }]);
      setSending(false);
      setTimeout(() => setView("callback"), 800);
      return;
    }

    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      const reply: string = data.reply || "I'll get this to Unico and he'll follow up. Want to leave a callback request?";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Brain glitch on my side. Tap '🧠 Request Callback' and I'll have Unico reach out directly." }]);
    }
    setSending(false);
  };

  const submitCallback = async () => {
    if (!name || !contact) { setHint("Name and phone or email please."); return; }
    setSending(true);
    setHint(null);
    try {
      const res = await fetch("/api/assistant/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, contact, problem,
          source: "ask-unico-widget",
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
      {!open && (
        <div style={{ position: "fixed", bottom: 18, right: 18, zIndex: 60, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, pointerEvents: "auto" }}>
          {bubble && (
            <div className="ask-unico-bubble">
              {bubble}
              <span className="ask-unico-bubble-arrow" />
            </div>
          )}
          <button
            onClick={() => { setOpen(true); setView("menu"); setBubble(null); }}
            aria-label="Ask Unico"
            className={`ask-unico-fab ${waving ? "ask-unico-wave" : ""}`}
          >
            <span className="ask-unico-fab-inner"><E1Mark size={62} /></span>
            <span className="ask-unico-badge">Ask Unico</span>
          </button>
        </div>
      )}

      {open && (
        <div className="ask-unico-panel">
          <div className="ask-unico-panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="ask-unico-avatar"><E1Mark size={44} /></div>
              <div>
                <p style={{ fontWeight: 900, fontSize: 15, lineHeight: 1 }}>Ask Unico</p>
                <p style={{ fontSize: 11, color: "#f0c96e", marginTop: 3 }}>E1 Unico Corporation · BBB Accredited</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ask-unico-x" aria-label="Close">×</button>
          </div>

          {view === "menu" && (
            <div className="ask-unico-body">
              <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.55, marginBottom: 12 }}>
                Hey 👋 I'm Unico's AI. I can answer your questions, get you to the right number, or schedule a personal callback.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                <a href={`tel:${E1_PHONE_TEL}`} className="ask-unico-action-card">
                  <span style={{ fontSize: 22 }}>📞</span>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 13 }}>Call E1 Unico</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>{E1_PHONE_DISPLAY} · Evenings 7:30–9:30 PM</p>
                  </div>
                </a>
                <a href={`tel:${UNICOOS_PHONE_TEL}`} className="ask-unico-action-card">
                  <span style={{ fontSize: 22 }}>🤖</span>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 13 }}>Call the UnicoOS Line</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>{UNICOOS_PHONE_DISPLAY} · 1-828-678-6426 · 24/7 AI line</p>
                  </div>
                </a>
                <button onClick={() => setView("chat")} className="ask-unico-action-card ask-unico-clickable">
                  <span style={{ fontSize: 22 }}>💬</span>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: 800, fontSize: 13 }}>Ask me a question</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>I'll try to help right here.</p>
                  </div>
                </button>
                <button onClick={() => setView("callback")} className="ask-unico-action-card ask-unico-clickable">
                  <span style={{ fontSize: 22 }}>🧠</span>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: 800, fontSize: 13 }}>Request a callback from Unico</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>Tell me your problem — he'll reach out personally.</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {view === "chat" && (
            <>
              <div ref={chatBox} className="ask-unico-chat">
                {messages.map((m, i) => (
                  <div key={i} className={`ask-unico-msg ${m.role}`}>
                    <p>{m.content}</p>
                  </div>
                ))}
                {sending && <div className="ask-unico-msg assistant"><p className="ask-unico-typing"><span/><span/><span/></p></div>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {QUICK_PROMPTS.map(p => (
                    <button key={p} onClick={() => send(p)} className="ask-unico-chip">{p}</button>
                  ))}
                </div>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="ask-unico-input-row">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Unico anything…" />
                <button type="submit" disabled={sending || !input.trim()}>↑</button>
              </form>
            </>
          )}

          {view === "callback" && (
            <div className="ask-unico-body">
              <p style={{ fontSize: 13, color: "#d1d5db", marginBottom: 12 }}>
                I'll pass this straight to Unico (Manuel) — he calls back evenings 7:30–9:30 PM.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                <input className="ask-unico-field" placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="ask-unico-field" placeholder="Phone or email *" value={contact} onChange={(e) => setContact(e.target.value)} />
                <textarea className="ask-unico-field ask-unico-textarea" placeholder="What problem are you trying to solve? (Business launch, website, marketing, AI receptionist…)" value={problem} onChange={(e) => setProblem(e.target.value)} />
                {hint && <p style={{ fontSize: 11, color: "#f87171" }}>{hint}</p>}
                <button disabled={sending} onClick={submitCallback} className="ask-unico-submit">
                  {sending ? "Sending…" : "Send to Unico →"}
                </button>
                <p style={{ fontSize: 11, color: "#6b7280", textAlign: "center" }}>
                  Or call directly: <a href={`tel:${E1_PHONE_TEL}`} style={{ color: "#c9a84c", fontWeight: 700 }}>{E1_PHONE_DISPLAY}</a>
                </p>
              </div>
            </div>
          )}

          {view === "thanks" && (
            <div className="ask-unico-body" style={{ textAlign: "center", padding: "28px 22px" }}>
              <div style={{ fontSize: 44 }}>📨</div>
              <p style={{ fontWeight: 900, fontSize: 16, marginTop: 6 }}>Sent to Unico!</p>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: "10px 0 18px" }}>
                He'll reach out personally. Need something now? Call <a href={`tel:${E1_PHONE_TEL}`} style={{ color: "#c9a84c", fontWeight: 700 }}>{E1_PHONE_DISPLAY}</a> or the 24/7 UnicoOS line <a href={`tel:${UNICOOS_PHONE_TEL}`} style={{ color: "#a5b4fc", fontWeight: 700 }}>{UNICOOS_PHONE_DISPLAY}</a>.
              </p>
              <button onClick={() => { setView("menu"); setName(""); setContact(""); setProblem(""); }} className="ask-unico-submit" style={{ background: "rgba(255,255,255,0.08)" }}>Done</button>
            </div>
          )}

          <div className="ask-unico-foot">
            <span>UnicoOS line · </span>
            <a href={`tel:${UNICOOS_PHONE_TEL}`}>📞 {UNICOOS_PHONE_DISPLAY}</a>
            <span> (1-828-678-6426)</span>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes ask-unico-float    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes ask-unico-wave-fab { 0%,100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-4px) rotate(-7deg); } 50% { transform: translateY(-2px) rotate(7deg); } 75% { transform: translateY(-3px) rotate(-4deg); } }
        @keyframes ask-unico-fade-in  { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ask-unico-typing   { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
        @keyframes ask-unico-ring     { 0% { transform: scale(0.85); opacity: 0.7; } 100% { transform: scale(1.6); opacity: 0; } }

        .ask-unico-fab {
          position: relative; width: 78px; height: 78px; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #1a1330, #050818);
          border: 2px solid rgba(201,168,76,0.55);
          box-shadow: 0 18px 38px rgba(0,0,0,0.45), 0 0 0 4px rgba(201,168,76,0.10), 0 0 32px rgba(201,168,76,0.35);
          cursor: pointer; padding: 0; overflow: visible;
          animation: ask-unico-float 4.5s ease-in-out infinite;
          transition: transform 200ms ease, box-shadow 200ms ease;
          display: flex; align-items: center; justify-content: center;
        }
        .ask-unico-fab::before {
          content: ""; position: absolute; inset: -2px; border-radius: 50%;
          border: 2px solid rgba(201,168,76,0.6); pointer-events: none;
          animation: ask-unico-ring 2.4s ease-out infinite;
        }
        .ask-unico-fab:hover { transform: scale(1.05); box-shadow: 0 22px 44px rgba(0,0,0,0.5), 0 0 0 4px rgba(201,168,76,0.18), 0 0 48px rgba(201,168,76,0.55); }
        .ask-unico-fab.ask-unico-wave { animation: ask-unico-wave-fab 1.5s ease-in-out 1; }
        .ask-unico-fab-inner { display: flex; align-items: center; justify-content: center; }
        .ask-unico-badge {
          position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, #c9a84c, #9a7a2e); color: white;
          font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 999px; white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }

        .ask-unico-bubble {
          position: relative; max-width: 240px;
          background: linear-gradient(155deg, #1a1330, #050818);
          border: 1px solid rgba(201,168,76,0.5); color: #e2e8f0;
          font-size: 12px; font-weight: 600; padding: 9px 14px; border-radius: 14px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.4); animation: ask-unico-fade-in 350ms ease;
        }
        .ask-unico-bubble-arrow {
          position: absolute; right: 28px; bottom: -7px;
          width: 12px; height: 12px; background: #050818;
          border-right: 1px solid rgba(201,168,76,0.5); border-bottom: 1px solid rgba(201,168,76,0.5);
          transform: rotate(45deg);
        }

        .ask-unico-panel {
          position: fixed; bottom: 18px; right: 18px; z-index: 60;
          width: 360px; max-width: calc(100vw - 24px); max-height: 80vh;
          background: linear-gradient(160deg, #050818, #0a0f2a);
          border: 1px solid rgba(201,168,76,0.4); border-radius: 22px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.18);
          display: flex; flex-direction: column; overflow: hidden; color: white;
          animation: ask-unico-fade-in 280ms ease;
        }
        .ask-unico-panel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; background: linear-gradient(135deg, rgba(201,168,76,0.18), rgba(99,102,241,0.10));
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ask-unico-avatar { width: 44px; height: 44px; border-radius: 50%; overflow: hidden; border: 2px solid rgba(201,168,76,0.55); display: flex; align-items: center; justify-content: center; background: #0a0f2a; }
        .ask-unico-x { background: rgba(255,255,255,0.06); border: none; color: white; width: 30px; height: 30px; border-radius: 50%; font-size: 20px; cursor: pointer; line-height: 1; }
        .ask-unico-x:hover { background: rgba(255,255,255,0.12); }

        .ask-unico-body { padding: 18px 16px 8px; overflow-y: auto; }
        .ask-unico-action-card {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          padding: 12px 14px; border-radius: 14px; color: white;
          text-decoration: none; cursor: pointer; transition: background 150ms ease, border-color 150ms ease;
        }
        .ask-unico-action-card:hover { background: rgba(201,168,76,0.12); border-color: rgba(201,168,76,0.4); }
        .ask-unico-clickable { width: 100%; text-align: left; }

        .ask-unico-chat { padding: 14px 14px 8px; overflow-y: auto; flex: 1; min-height: 280px; max-height: 50vh; display: flex; flex-direction: column; gap: 8px; }
        .ask-unico-msg { max-width: 85%; padding: 10px 12px; border-radius: 14px; font-size: 13px; line-height: 1.5; animation: ask-unico-fade-in 200ms ease; }
        .ask-unico-msg.assistant { align-self: flex-start; background: rgba(201,168,76,0.16); border: 1px solid rgba(201,168,76,0.32); }
        .ask-unico-msg.user      { align-self: flex-end;   background: rgba(99,102,241,0.18); border: 1px solid rgba(99,102,241,0.35); }
        .ask-unico-msg p { color: #f1f5f9; }
        .ask-unico-typing { display: inline-flex; gap: 4px; align-items: center; }
        .ask-unico-typing span { width: 6px; height: 6px; border-radius: 50%; background: #f0c96e; animation: ask-unico-typing 1.2s ease-in-out infinite; }
        .ask-unico-typing span:nth-child(2) { animation-delay: 0.15s; }
        .ask-unico-typing span:nth-child(3) { animation-delay: 0.3s; }
        .ask-unico-chip { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; font-size: 11px; padding: 6px 10px; border-radius: 999px; cursor: pointer; }
        .ask-unico-chip:hover { background: rgba(201,168,76,0.18); border-color: rgba(201,168,76,0.45); }

        .ask-unico-input-row { display: flex; gap: 6px; padding: 10px 12px; border-top: 1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.2); }
        .ask-unico-input-row input { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 8px 12px; color: white; font-size: 13px; outline: none; }
        .ask-unico-input-row input:focus { border-color: rgba(201,168,76,0.6); }
        .ask-unico-input-row button { background: linear-gradient(135deg, #c9a84c, #9a7a2e); border: none; color: white; font-weight: 900; font-size: 16px; padding: 0 14px; border-radius: 10px; cursor: pointer; }
        .ask-unico-input-row button:disabled { opacity: 0.4; cursor: not-allowed; }

        .ask-unico-field { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 12px; color: white; font-size: 13px; outline: none; }
        .ask-unico-field:focus { border-color: rgba(201,168,76,0.55); }
        .ask-unico-textarea { min-height: 88px; resize: vertical; font-family: inherit; }
        .ask-unico-submit { background: linear-gradient(135deg, #c9a84c, #9a7a2e); color: white; border: none; padding: 11px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer; }
        .ask-unico-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .ask-unico-foot { font-size: 10.5px; color: #6b7280; text-align: center; padding: 8px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.25); }
        .ask-unico-foot a { color: #f0c96e; font-weight: 700; text-decoration: none; }

        @media (max-width: 480px) {
          .ask-unico-panel { width: calc(100vw - 16px); right: 8px; bottom: 8px; border-radius: 18px; }
          .ask-unico-fab { width: 66px; height: 66px; }
        }
      `}</style>
    </>
  );
}

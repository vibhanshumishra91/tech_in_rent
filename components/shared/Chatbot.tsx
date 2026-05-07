"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

function BotIcon({ size = 28, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna */}
      <line x1="20" y1="2" x2="20" y2="8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="2" r="2" fill="#fff" style={animated ? { animation: "botPulse 2s ease-in-out infinite" } : {}} />
      {/* Head */}
      <rect x="6" y="8" width="28" height="22" rx="7" fill="#fff" fillOpacity="0.15" stroke="#fff" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="14" cy="18" r="3" fill="#fff" style={animated ? { animation: "botBlink 3s ease-in-out infinite" } : {}} />
      <circle cx="26" cy="18" r="3" fill="#fff" style={animated ? { animation: "botBlink 3s ease-in-out infinite 0.1s" } : {}} />
      {/* Eye shine */}
      <circle cx="15.2" cy="16.8" r="1" fill="#067CCB" opacity="0.6" />
      <circle cx="27.2" cy="16.8" r="1" fill="#067CCB" opacity="0.6" />
      {/* Mouth */}
      <path d="M14 23 Q20 27 26 23" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Ears */}
      <rect x="2" y="14" width="4" height="8" rx="2" fill="#fff" fillOpacity="0.4" />
      <rect x="34" y="14" width="4" height="8" rx="2" fill="#fff" fillOpacity="0.4" />
    </svg>
  );
}

function BotAvatar() {
  return (
    <div style={{
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #067CCB, #0894F0)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 2px 8px rgba(6,124,203,0.3)",
    }}>
      <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
        <line x1="20" y1="2" x2="20" y2="8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="2" r="2.5" fill="#fff" />
        <rect x="6" y="8" width="28" height="22" rx="7" fill="#fff" fillOpacity="0.15" stroke="#fff" strokeWidth="1.5" />
        <circle cx="14" cy="18" r="3" fill="#fff" />
        <circle cx="26" cy="18" r="3" fill="#fff" />
        <path d="M14 23 Q20 27 26 23" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <rect x="2" y="14" width="4" height="8" rx="2" fill="#fff" fillOpacity="0.4" />
        <rect x="34" y="14" width="4" height="8" rx="2" fill="#fff" fillOpacity="0.4" />
      </svg>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the TechInRent assistant. Ask me anything about our services, process, or how we can help you grow on LinkedIn." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.reply || "No response received. Please try again." }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([...updated, { role: "assistant", content: "Network error — please check your connection and try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: "88px",
          right: "24px",
          width: "360px",
          maxHeight: "540px",
          background: "var(--white)",
          borderRadius: "16px",
          boxShadow: "0 16px 48px rgba(13,31,30,0.16), 0 4px 16px rgba(6,124,203,0.12)",
          display: "flex",
          flexDirection: "column",
          zIndex: 9998,
          overflow: "hidden",
          border: "1px solid var(--teal-border)",
          animation: "chatSlideUp 0.28s cubic-bezier(0.22,1,0.36,1) both",
        }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #067CCB 0%, #0894F0 100%)",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Animated bot icon in header */}
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "botFloat 3s ease-in-out infinite",
              }}>
                <BotIcon size={28} animated />
              </div>
              <div>
                <p style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: "14px", fontFamily: "var(--font-heading, sans-serif)", letterSpacing: "-0.01em" }}>
                  TechInRent Assistant
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "onlinePulse 2s ease infinite" }} />
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: "11px", fontFamily: "var(--font-body, sans-serif)" }}>Online · Ask about our services</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              title="Close"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "var(--off)",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: "8px", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.role === "assistant" && <BotAvatar />}
                <div style={{
                  maxWidth: "78%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #067CCB, #0894F0)"
                    : "var(--white)",
                  color: msg.role === "user" ? "#fff" : "var(--ink)",
                  fontSize: "13px",
                  lineHeight: "1.55",
                  fontFamily: "var(--font-body, sans-serif)",
                  boxShadow: msg.role === "user"
                    ? "0 4px 14px rgba(6,124,203,0.25)"
                    : "var(--shadow-xs)",
                  border: msg.role === "assistant" ? "1px solid var(--teal-border)" : "none",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <BotAvatar />
                <div style={{
                  padding: "12px 16px",
                  borderRadius: "14px 14px 14px 3px",
                  background: "var(--white)",
                  border: "1px solid var(--teal-border)",
                  boxShadow: "var(--shadow-xs)",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#067CCB",
                      opacity: 0.7,
                      display: "inline-block",
                      animation: `typingBounce 1.2s ${i * 0.18}s ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 14px",
            background: "var(--white)",
            borderTop: "1px solid var(--teal-border)",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexShrink: 0,
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about our services..."
              disabled={loading}
              style={{
                flex: 1,
                border: "1.5px solid var(--teal-border)",
                borderRadius: "10px",
                padding: "9px 14px",
                fontSize: "13px",
                outline: "none",
                background: "var(--off)",
                color: "var(--ink)",
                fontFamily: "var(--font-body, sans-serif)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#067CCB";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6,124,203,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--teal-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              title="Send"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: loading || !input.trim() ? "var(--off2)" : "linear-gradient(135deg, #067CCB, #0894F0)",
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
                boxShadow: loading || !input.trim() ? "none" : "0 4px 12px rgba(6,124,203,0.28)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke={loading || !input.trim() ? "#9ab5b3" : "#fff"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={loading || !input.trim() ? "#9ab5b3" : "#fff"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {/* Pulse ring — only shown when closed */}
      {!open && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "58px",
          height: "58px",
          borderRadius: "16px",
          background: "rgba(6,124,203,0.25)",
          zIndex: 9997,
          animation: "chatPulseRing 2.4s ease-out infinite",
          pointerEvents: "none",
        }} />
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        title={open ? "Close chat" : "Chat with us"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "58px",
          height: "58px",
          borderRadius: "16px",
          background: open ? "var(--ink)" : "linear-gradient(135deg, #067CCB 0%, #0894F0 100%)",
          border: "none",
          cursor: "pointer",
          boxShadow: open
            ? "0 4px 20px rgba(13,31,30,0.3)"
            : "0 8px 28px rgba(6,124,203,0.45), 0 2px 8px rgba(6,124,203,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.06)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
            {/* Solid white main bubble — clean, no stroke */}
            <path
              d="M30 3H6C4.34 3 3 4.34 3 6v16c0 1.66 1.34 3 3 3h7l3.29 3.29a2 2 0 002.82 0L22 25h8c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3z"
              fill="#fff"
            />
            {/* Small secondary bubble — depth/conversation feel */}
            <circle cx="29" cy="8" r="4" fill="rgba(255,255,255,0.35)" />
            {/* Three animated dots in brand color */}
            <circle cx="12" cy="14" r="2.2" fill="#067CCB" style={{ animation: "typingBounce 1.4s 0s ease-in-out infinite" }} />
            <circle cx="18" cy="14" r="2.2" fill="#067CCB" style={{ animation: "typingBounce 1.4s 0.2s ease-in-out infinite" }} />
            <circle cx="24" cy="14" r="2.2" fill="#067CCB" style={{ animation: "typingBounce 1.4s 0.4s ease-in-out infinite" }} />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes chatPulseRing {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40%           { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes botFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        @keyframes botPulse {
          0%, 100% { opacity: 1; r: 2; }
          50%       { opacity: 0.4; r: 2.5; }
        }
        @keyframes botBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95%            { transform: scaleY(0.1); }
        }
        @keyframes onlinePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @media (max-width: 480px) {
          .chatbot-panel {
            width: calc(100vw - 32px) !important;
            right: 16px !important;
            bottom: 84px !important;
          }
        }
      `}</style>
    </>
  );
}

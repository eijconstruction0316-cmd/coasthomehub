"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ChatImage = { media_type: string; data: string; preview: string };
type Msg = { role: "user" | "assistant"; text: string; image?: ChatImage };

const STARTERS = [
  "Modernise our main bathroom 🛁",
  "Refresh a tired kitchen 🍳",
  "Re-do our deck / outdoor area 🌿",
  "Whole-home reno — where do we start?",
];

// Lightweight, XSS-safe renderer: **bold** + line breaks (no HTML injection).
function renderRich(text: string) {
  return text.split("\n").map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={pi} style={{ color: "var(--slate-dark)" }}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={pi}>{part}</span>
        )
      )}
    </span>
  ));
}

function fileToImage(file: File): Promise<ChatImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      const data = result.split(",")[1] || "";
      resolve({ media_type: file.type || "image/jpeg", data, preview: result });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function DesignChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pendingImage, setPendingImage] = useState<ChatImage | null>(null);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const started = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(textArg?: string) {
    const text = (textArg ?? input).trim();
    if ((!text && !pendingImage) || busy) return;

    const userMsg: Msg = { role: "user", text: text || "What could you do with this?", image: pendingImage ?? undefined };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", text: "" }]);
    setInput("");
    setPendingImage(null);
    setBusy(true);

    try {
      const res = await fetch("/api/design-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            role: m.role,
            text: m.text,
            image: m.image ? { media_type: m.image.media_type, data: m.image.data } : undefined,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        const msg =
          res.status === 503
            ? "The AI designer isn’t switched on yet on this site. Meanwhile, you can request quotes directly below."
            : "Sorry — something went wrong. Please try again.";
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", text: msg };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", text: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", text: "Sorry — the connection dropped. Please try again." };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPendingImage(await fileToImage(file));
    e.target.value = "";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid var(--sand-100)" }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🌊</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: "0.98rem", color: "var(--slate-dark)", lineHeight: 1 }}>CoastAI</div>
          <div style={{ fontSize: "0.72rem", color: "var(--ocean-500)", fontWeight: 600, marginTop: 3 }}>● Your renovation designer</div>
        </div>
        {started && (
          <Link href="/quote" style={{ marginLeft: "auto", fontSize: "0.78rem", fontWeight: 700, color: "var(--ocean-600)", background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", padding: "7px 13px", borderRadius: "50px", textDecoration: "none", whiteSpace: "nowrap" }}>
            Get 3 quotes →
          </Link>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "20px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
        {!started && (
          <div style={{ margin: "auto 0", textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: 10 }}>📸</div>
            <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>Show me your space</h3>
            <p style={{ color: "var(--slate-light)", fontSize: "0.92rem", lineHeight: 1.6, maxWidth: 380, margin: "0 auto 22px" }}>
              Upload a photo and tell me what you’re dreaming of. I’ll sketch a concept, give you a real QLD ballpark, then line up licensed local tradies to quote it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 440, margin: "0 auto" }}>
              {STARTERS.map((s) => (
                <button key={s} onClick={() => send(s)} style={{ background: "white", border: "1px solid var(--ocean-100)", color: "var(--ocean-700)", borderRadius: "50px", padding: "8px 14px", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ maxWidth: "82%" }}>
                {m.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image.preview} alt="Your space" style={{ width: "100%", maxWidth: 260, borderRadius: "14px 14px 4px 14px", marginBottom: 6, display: "block", marginLeft: "auto", boxShadow: "var(--shadow-sm)" }} />
                )}
                <div style={{ background: "var(--ocean-500)", color: "white", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", fontSize: "0.9rem", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                  {m.text}
                </div>
              </div>
            </div>
          ) : (
            <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", marginTop: 2 }}>🌊</div>
              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: "11px 15px", borderRadius: "4px 14px 14px 14px", fontSize: "0.9rem", color: "var(--slate-mid)", lineHeight: 1.65, maxWidth: "82%" }}>
                {m.text ? renderRich(m.text) : (busy && i === messages.length - 1 ? <span style={{ color: "var(--ocean-400)" }}>● ● ●</span> : "")}
              </div>
            </div>
          )
        )}
      </div>

      {/* Composer */}
      <div style={{ borderTop: "1px solid var(--sand-100)", padding: "12px 14px" }}>
        {pendingImage && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pendingImage.preview} alt="Attached" style={{ width: 42, height: 42, objectFit: "cover", borderRadius: 8 }} />
            <span style={{ fontSize: "0.8rem", color: "var(--slate-light)" }}>Photo attached</span>
            <button onClick={() => setPendingImage(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--slate-light)", cursor: "pointer", fontSize: "1rem" }}>✕</button>
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <input ref={fileRef} type="file" accept="image/*" onChange={onPick} style={{ display: "none" }} />
          <button onClick={() => fileRef.current?.click()} aria-label="Upload a photo" style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 12, border: "1px solid var(--sand-200)", background: "white", cursor: "pointer", fontSize: "1.15rem" }}>
            📷
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Describe your space, or attach a photo…"
            rows={1}
            style={{ flex: 1, resize: "none", border: "1px solid var(--sand-200)", borderRadius: 12, padding: "11px 14px", fontSize: "0.92rem", fontFamily: "inherit", lineHeight: 1.4, maxHeight: 120, outline: "none", color: "var(--slate-dark)" }}
          />
          <button onClick={() => send()} disabled={busy || (!input.trim() && !pendingImage)} aria-label="Send" style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 12, border: "none", background: busy || (!input.trim() && !pendingImage) ? "var(--sand-300)" : "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", color: "white", cursor: busy ? "default" : "pointer", fontSize: "1.1rem" }}>
            ➤
          </button>
        </div>
        <p style={{ fontSize: "0.7rem", color: "var(--slate-light)", textAlign: "center", marginTop: 8 }}>
          CoastAI gives design ideas and ballpark costs — not binding quotes. Real quotes come from QBCC-licensed tradies.
        </p>
      </div>
    </div>
  );
}

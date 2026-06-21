"use client";

import { useEffect, useRef, useState } from "react";

type ChatImage = { media_type: string; data: string; preview: string };
type Msg = { role: "user" | "assistant"; text: string; image?: ChatImage };
type ContactForm = { name: string; email: string; phone: string; suburb: string };

const STARTERS = [
  "Modernise our main bathroom 🛁",
  "Refresh a tired kitchen 🍳",
  "Re-do our deck / outdoor area 🌿",
  "Whole-home reno — where do we start?",
];

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

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [contact, setContact] = useState<ContactForm>({ name: "", email: "", phone: "", suburb: "" });

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const started = messages.length > 0;
  const aiReplies = messages.filter((m) => m.role === "assistant" && m.text.length > 0).length;
  const showBriefButton = aiReplies >= 2;

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
            ? "The AI designer isn't switched on yet on this site. Meanwhile, you can describe your project below."
            : "Sorry — something went wrong. Please try again.";
        setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", text: msg }; return c; });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", text: acc }; return c; });
      }
    } catch {
      setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", text: "Sorry — the connection dropped. Please try again." }; return c; });
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmitBrief(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.name || !contact.email) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      // Strip image binary data — only text + hasPhoto flag is needed for report generation
      const textMessages = messages.map((m) => ({
        role: m.role,
        text: m.text,
        hasPhoto: !!m.image,
      }));

      const reportRes = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: textMessages }),
      });

      if (!reportRes.ok) {
        const body = await reportRes.json().catch(() => ({}));
        throw new Error(body.error || "Could not generate report");
      }
      const { report } = await reportRes.json();

      const sendRes = await fetch("/api/send-report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          report,
          customer: contact,
          messages: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!sendRes.ok) throw new Error("Could not send emails");

      setSubmitted(true);
      setShowModal(false);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPendingImage(await fileToImage(file));
    e.target.value = "";
  }

  function field(label: string, key: keyof ContactForm, type = "text", required = false) {
    return (
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#4a607a", marginBottom: 5 }}>
          {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
        </label>
        <input
          type={type}
          required={required}
          value={contact[key]}
          onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
          style={{ width: "100%", boxSizing: "border-box", border: "1.5px solid #e8dfd0", borderRadius: 10, padding: "10px 13px", fontSize: "0.92rem", fontFamily: "inherit", color: "#1a2332", outline: "none" }}
        />
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid var(--sand-100)" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🌊</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.98rem", color: "var(--slate-dark)", lineHeight: 1 }}>CoastAI</div>
            <div style={{ fontSize: "0.72rem", color: "var(--ocean-500)", fontWeight: 600, marginTop: 3 }}>● Your renovation designer</div>
          </div>
          {started && showBriefButton && !submitted && (
            <button
              onClick={() => setShowModal(true)}
              style={{ marginLeft: "auto", fontSize: "0.78rem", fontWeight: 700, color: "white", background: "linear-gradient(135deg, #c9972a, #e8b84b)", border: "none", padding: "8px 14px", borderRadius: "50px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}
            >
              📋 Get My Quote Brief →
            </button>
          )}
          {submitted && (
            <div style={{ marginLeft: "auto", fontSize: "0.78rem", fontWeight: 700, color: "#1f7a72", background: "#f0f9f8", border: "1px solid #d8f0ed", padding: "7px 13px", borderRadius: "50px" }}>
              ✅ Brief sent! Check your email
            </div>
          )}
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "20px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
          {!started && (
            <div style={{ margin: "auto 0", textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: 10 }}>📸</div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>Show me your space</h3>
              <p style={{ color: "var(--slate-light)", fontSize: "0.92rem", lineHeight: 1.6, maxWidth: 380, margin: "0 auto 22px" }}>
                Upload a photo and tell me what you&apos;re dreaming of. I&apos;ll sketch a concept, give you a real QLD ballpark, then line up licensed local tradies to quote it.
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

          {/* Prompt to get brief after 2 AI replies */}
          {showBriefButton && !submitted && (
            <div style={{ background: "linear-gradient(135deg,rgba(201,151,42,0.08),rgba(232,184,75,0.04))", border: "1px solid rgba(201,151,42,0.25)", borderRadius: 14, padding: "16px 18px", textAlign: "center", marginTop: 4 }}>
              <p style={{ fontSize: "0.88rem", color: "#7a5a1a", margin: "0 0 12px", lineHeight: 1.5 }}>
                Ready to get this scoped and quoted? I can email you a full brief — then we&apos;ll find QBCC-licensed tradies in your area.
              </p>
              <button
                onClick={() => setShowModal(true)}
                style={{ background: "linear-gradient(135deg, #c9972a, #e8b84b)", color: "white", border: "none", borderRadius: "50px", padding: "11px 22px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}
              >
                📋 Get My Quote Brief →
              </button>
            </div>
          )}

          {submitted && (
            <div style={{ background: "linear-gradient(135deg,rgba(31,122,114,0.08),rgba(61,153,144,0.04))", border: "1px solid #d8f0ed", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>✅</div>
              <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0e4440", margin: "0 0 6px" }}>Your brief has been sent!</p>
              <p style={{ fontSize: "0.84rem", color: "#4a607a", margin: 0 }}>Check your email — we&apos;ll be in touch with matched tradies soon.</p>
            </div>
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

      {/* Contact modal */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(10,20,30,0.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div style={{ background: "white", borderRadius: 20, padding: "28px 28px 24px", width: "100%", maxWidth: 420, boxShadow: "0 24px 60px rgba(0,0,0,0.22)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#1a2332" }}>Send My Quote Brief</h2>
                <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#4a607a" }}>We&apos;ll email you a full brief + find local tradies</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "1.4rem", color: "#9ca3af", cursor: "pointer", lineHeight: 1 }}>✕</button>
            </div>

            <form onSubmit={handleSubmitBrief}>
              {field("Your Name", "name", "text", true)}
              {field("Email Address", "email", "email", true)}
              {field("Phone (optional)", "phone", "tel")}
              {field("Suburb", "suburb", "text")}

              {submitError && (
                <p style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: 12, padding: "8px 12px", background: "#fef2f2", borderRadius: 8 }}>
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !contact.name || !contact.email}
                style={{ width: "100%", background: submitting ? "#d1d5db" : "linear-gradient(135deg, #c9972a, #e8b84b)", color: "white", border: "none", borderRadius: 12, padding: "13px 0", fontWeight: 700, fontSize: "0.95rem", cursor: submitting ? "default" : "pointer", fontFamily: "inherit", marginTop: 4 }}
              >
                {submitting ? "Sending your brief…" : "📨 Send My Brief"}
              </button>

              <p style={{ fontSize: "0.72rem", color: "#9c7d55", textAlign: "center", margin: "10px 0 0" }}>
                QBCC-licensed tradies only · Max 3 quotes · No spam, ever
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type ChatImage = { media_type: string; data: string; preview: string };
type Msg = { role: "user" | "assistant"; text: string; images?: ChatImage[] };
type ContactForm = { name: string; email: string; phone: string; suburb: string };

const FREE_QUOTA = 2;

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

// Compress + resize client-side to stay under the 4 MB Next.js body limit.
// Max dimension 1 200 px, JPEG 80 % quality → typically < 300 KB per photo.
function fileToImage(file: File): Promise<ChatImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const MAX = 1200;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width >= height) { height = Math.round((height * MAX) / width); width = MAX; }
          else { width = Math.round((width * MAX) / height); height = MAX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        const preview = canvas.toDataURL("image/jpeg", 0.8);
        const data = preview.split(",")[1] || "";
        resolve({ media_type: "image/jpeg", data, preview });
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function DesignChat() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pendingImages, setPendingImages] = useState<ChatImage[]>([]);
  const [busy, setBusy] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [contact, setContact] = useState<ContactForm>({ name: "", email: "", phone: "", suburb: "" });

  // Subscription / quota state — httpOnly 쿠키 기반 (서버사이드, localStorage 우회 불가)
  const [quotesUsed, setQuotesUsed] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [quotaLoaded, setQuotaLoaded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const started = messages.length > 0;
  const aiReplies = messages.filter((m) => m.role === "assistant" && m.text.length > 0).length;
  const showBriefButton = aiReplies >= 2;
  const atQuotaLimit = quotaLoaded && !subscribed && quotesUsed >= FREE_QUOTA;

  // 서버에서 쿼터 로드 + 결제 후 리다이렉트 처리
  useEffect(() => {
    fetch("/api/quota")
      .then((r) => r.json())
      .then((d) => {
        setQuotesUsed(d.used ?? 0);
        setSubscribed(d.subscribed ?? false);
        setQuotaLoaded(true);
      })
      .catch(() => setQuotaLoaded(true));
  }, []);

  useEffect(() => {
    if (searchParams.get("unlocked") === "1") {
      setSubscribed(true);
      router.replace("/design");
    }
  }, [searchParams, router]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(textArg?: string) {
    const text = (textArg ?? input).trim();
    if ((!text && pendingImages.length === 0) || busy) return;

    const userMsg: Msg = {
      role: "user",
      text: text || (pendingImages.length > 1 ? `What could you do with these ${pendingImages.length} photos?` : "What could you do with this?"),
      images: pendingImages.length > 0 ? pendingImages : undefined,
    };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", text: "" }]);
    setInput("");
    setPendingImages([]);
    setBusy(true);

    try {
      const res = await fetch("/api/design-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            role: m.role,
            text: m.text,
            images: m.images?.map((img) => ({ media_type: img.media_type, data: img.data })),
          })),
        }),
      });

      if (!res.ok || !res.body) {
        const msg = res.status === 503
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

  async function handleSubscribe() {
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/create-homeowner-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ returnPath: "/design" }),
      });
      const { url, error } = await res.json();
      if (error) { alert(error); return; }
      window.location.href = url;
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingCheckout(false);
    }
  }

  async function handleSubmitBrief(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.name || !contact.email) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const textMessages = messages.map((m) => ({
        role: m.role,
        text: m.text,
        hasPhoto: (m.images?.length ?? 0) > 0,
        imageCount: m.images?.length ?? 0,
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
      const { report, reportToken } = await reportRes.json();

      const sendRes = await fetch("/api/send-report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          report,
          reportToken,
          customer: contact,
          messages: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!sendRes.ok) throw new Error("Could not send emails");

      // 서버사이드 httpOnly 쿠키 카운터 증가
      const qRes = await fetch("/api/quota", { method: "POST" });
      if (qRes.ok) {
        const q = await qRes.json();
        setQuotesUsed(q.used ?? quotesUsed + 1);
      } else {
        setQuotesUsed((n) => n + 1);
      }

      setSubmitted(true);
      setShowModal(false);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const converted = await Promise.all(files.map(fileToImage));
    setPendingImages((prev) => [...prev, ...converted].slice(0, 6)); // max 6 photos
    e.target.value = "";
  }

  function removeImage(idx: number) {
    setPendingImages((prev) => prev.filter((_, i) => i !== idx));
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
              onClick={() => atQuotaLimit ? setShowPaywall(true) : setShowModal(true)}
              style={{ marginLeft: "auto", fontSize: "0.78rem", fontWeight: 700, color: "white", background: atQuotaLimit ? "linear-gradient(135deg,#6b7280,#9ca3af)" : "linear-gradient(135deg, #c9972a, #e8b84b)", border: "none", padding: "8px 14px", borderRadius: "50px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}
            >
              {atQuotaLimit ? "🔒 Subscribe to continue" : "📋 Get My Quote Brief →"}
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
                Upload photos and tell me what you&apos;re dreaming of. I&apos;ll sketch a concept, give you a real QLD ballpark, then line up licensed local tradies to quote it.
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
                  {/* Photo grid */}
                  {m.images && m.images.length > 0 && (
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: m.images.length === 1 ? "1fr" : m.images.length === 2 ? "1fr 1fr" : "1fr 1fr 1fr",
                      gap: 4,
                      marginBottom: 6,
                      maxWidth: 280,
                      marginLeft: "auto",
                    }}>
                      {m.images.map((img, ii) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={ii}
                          src={img.preview}
                          alt={`Photo ${ii + 1}`}
                          style={{
                            width: "100%",
                            aspectRatio: "1",
                            objectFit: "cover",
                            borderRadius: m.images!.length === 1 ? "14px 14px 4px 14px" : ii === 0 ? "10px 4px 4px 4px" : ii === m.images!.length - 1 ? "4px 10px 14px 4px" : "4px",
                            boxShadow: "var(--shadow-sm)",
                          }}
                        />
                      ))}
                    </div>
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
            <div style={{ background: atQuotaLimit ? "linear-gradient(135deg,rgba(107,114,128,0.07),rgba(156,163,175,0.04))" : "linear-gradient(135deg,rgba(201,151,42,0.08),rgba(232,184,75,0.04))", border: `1px solid ${atQuotaLimit ? "rgba(107,114,128,0.2)" : "rgba(201,151,42,0.25)"}`, borderRadius: 14, padding: "16px 18px", textAlign: "center", marginTop: 4 }}>
              {atQuotaLimit ? (
                <>
                  <p style={{ fontSize: "0.88rem", color: "#374151", margin: "0 0 6px", fontWeight: 700 }}>🔒 You&apos;ve used your {FREE_QUOTA} free briefs</p>
                  <p style={{ fontSize: "0.82rem", color: "#6b7280", margin: "0 0 14px", lineHeight: 1.5 }}>Subscribe for $10/month to send unlimited briefs + access the full magazine.</p>
                  <button onClick={() => setShowPaywall(true)} style={{ background: "linear-gradient(135deg,#0e4440,#1f7a72)", color: "white", border: "none", borderRadius: "50px", padding: "11px 22px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}>
                    Unlock Unlimited Access →
                  </button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: "0.88rem", color: "#7a5a1a", margin: "0 0 6px", lineHeight: 1.5 }}>
                    Ready to get this scoped and quoted?
                  </p>
                  {!subscribed && <p style={{ fontSize: "0.78rem", color: "#9c7d55", margin: "0 0 12px" }}>{FREE_QUOTA - quotesUsed} free brief{FREE_QUOTA - quotesUsed !== 1 ? "s" : ""} remaining</p>}
                  <button
                    onClick={() => setShowModal(true)}
                    style={{ background: "linear-gradient(135deg, #c9972a, #e8b84b)", color: "white", border: "none", borderRadius: "50px", padding: "11px 22px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    📋 Get My Quote Brief →
                  </button>
                </>
              )}
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
          {/* Pending image thumbnails */}
          {pendingImages.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              {pendingImages.map((img, idx) => (
                <div key={idx} style={{ position: "relative", flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.preview} alt={`Photo ${idx + 1}`} style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 10, border: "2px solid var(--ocean-100)", display: "block" }} />
                  <button
                    onClick={() => removeImage(idx)}
                    style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: "50%", background: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: "0.6rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {pendingImages.length < 6 && (
                <button
                  onClick={() => fileRef.current?.click()}
                  style={{ width: 52, height: 52, borderRadius: 10, border: "2px dashed var(--ocean-200)", background: "var(--ocean-50)", color: "var(--ocean-400)", cursor: "pointer", fontSize: "1.3rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  +
                </button>
              )}
              <span style={{ alignSelf: "center", fontSize: "0.75rem", color: "var(--slate-light)" }}>
                {pendingImages.length}/6 photo{pendingImages.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={onPick} style={{ display: "none" }} />
            {pendingImages.length === 0 && (
              <button
                onClick={() => fileRef.current?.click()}
                aria-label="Upload photos"
                title="Upload up to 6 photos"
                style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 12, border: "1px solid var(--sand-200)", background: "white", cursor: "pointer", fontSize: "1.15rem" }}
              >
                📷
              </button>
            )}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder={pendingImages.length > 0 ? `${pendingImages.length} photo${pendingImages.length !== 1 ? "s" : ""} attached — describe what you want…` : "Describe your space, or attach photos…"}
              rows={1}
              style={{ flex: 1, resize: "none", border: "1px solid var(--sand-200)", borderRadius: 12, padding: "11px 14px", fontSize: "0.92rem", fontFamily: "inherit", lineHeight: 1.4, maxHeight: 120, outline: "none", color: "var(--slate-dark)" }}
            />
            <button
              onClick={() => send()}
              disabled={busy || (!input.trim() && pendingImages.length === 0)}
              aria-label="Send"
              style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 12, border: "none", background: busy || (!input.trim() && pendingImages.length === 0) ? "var(--sand-300)" : "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", color: "white", cursor: busy ? "default" : "pointer", fontSize: "1.1rem" }}
            >
              ➤
            </button>
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--slate-light)", textAlign: "center", marginTop: 8 }}>
            CoastAI gives design ideas and ballpark costs — not binding quotes. Real quotes come from QBCC-licensed tradies.
          </p>
        </div>
      </div>

      {/* Paywall modal */}
      {showPaywall && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowPaywall(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(10,20,30,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div style={{ background: "white", borderRadius: 20, padding: "32px 28px 28px", width: "100%", maxWidth: 420, boxShadow: "0 24px 60px rgba(0,0,0,0.25)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🔒</div>
            <h2 style={{ margin: "0 0 10px", fontSize: "1.2rem", fontWeight: 800, color: "#1a2332" }}>You&apos;ve used your {FREE_QUOTA} free briefs</h2>
            <p style={{ color: "#4a607a", fontSize: "0.9rem", lineHeight: 1.7, margin: "0 0 24px" }}>
              Subscribe for <strong>$10/month AUD</strong> to send unlimited AI quote briefs and read every magazine article. Cancel anytime.
            </p>
            <div style={{ background: "#f0f9f8", border: "1px solid #d8f0ed", borderRadius: 12, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
              {[
                "✅ Unlimited AI quote briefs",
                "📖 Full magazine access (8+ articles)",
                "🔧 Matched QBCC-licensed tradies",
                "❌ Cancel anytime",
              ].map((item) => (
                <div key={item} style={{ fontSize: "0.88rem", color: "#2d3f54", marginBottom: 8, fontWeight: 500 }}>{item}</div>
              ))}
            </div>
            <button
              onClick={handleSubscribe}
              disabled={loadingCheckout}
              style={{ width: "100%", background: loadingCheckout ? "#d1d5db" : "linear-gradient(135deg,#c9972a,#e8b84b)", color: "white", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 700, fontSize: "1rem", cursor: loadingCheckout ? "default" : "pointer", fontFamily: "inherit", marginBottom: 10 }}
            >
              {loadingCheckout ? "Loading checkout…" : "Subscribe — $10/month AUD →"}
            </button>
            <button onClick={() => setShowPaywall(false)} style={{ background: "none", border: "none", color: "#9ca3af", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>
              Maybe later
            </button>
          </div>
        </div>
      )}

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

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
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--sand-300)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--sand-200)", background: "rgba(250, 248, 245, 0.8)", backdropFilter: "blur(12px)" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--ocean-600)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🌊</div>
          <div>
            <div style={{ fontFamily: "Lora, Georgia, serif", fontWeight: 600, fontSize: "1.05rem", color: "var(--slate-dark)", lineHeight: 1 }}>CoastAI</div>
            <div style={{ fontSize: "0.7rem", color: "var(--ocean-500)", fontWeight: 700, marginTop: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>● active · design concierge</div>
          </div>
          {started && showBriefButton && !submitted && (
            <button
              onClick={() => atQuotaLimit ? setShowPaywall(true) : setShowModal(true)}
              style={{ marginLeft: "auto", fontSize: "0.78rem", fontWeight: 700, color: "white", background: atQuotaLimit ? "var(--sand-400)" : "linear-gradient(135deg, var(--gold), var(--gold-light))", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Outfit, sans-serif", letterSpacing: "0.02em", boxShadow: atQuotaLimit ? "none" : "0 4px 10px rgba(201,151,42,0.2)" }}
            >
              {atQuotaLimit ? "🔒 Subscribe to continue" : "📋 Get Quote Brief →"}
            </button>
          )}
          {submitted && (
            <div style={{ marginLeft: "auto", fontSize: "0.76rem", fontWeight: 800, color: "var(--ocean-700)", background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", padding: "8px 16px", borderRadius: "4px", letterSpacing: "0.02em", textTransform: "uppercase" }}>
              ✓ Brief Dispatched
            </div>
          )}
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20, background: "var(--off-white)" }}>
          {!started && (
            <div style={{ margin: "auto 0", textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: 12 }}>📸</div>
              <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.3rem", fontWeight: 600, color: "var(--slate-dark)", marginBottom: 8 }}>Show me your space</h3>
              <p style={{ color: "var(--slate-light)", fontSize: "0.88rem", lineHeight: 1.65, maxWidth: 360, margin: "0 auto 24px", fontFamily: "Outfit, sans-serif" }}>
                Upload photos and describe your dream renovation. I will create a concept scope, QLD ballpark budget, and match you with licensed local builders.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 440, margin: "0 auto" }}>
                {STARTERS.map((s) => (
                  <button key={s} onClick={() => send(s)} style={{ background: "white", border: "1px solid var(--sand-300)", color: "var(--ocean-700)", borderRadius: "4px", padding: "8px 16px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif", transition: "var(--transition-fast)" }} className="starter-btn-hover">
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
                      gap: 6,
                      marginBottom: 8,
                      maxWidth: 320,
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
                            borderRadius: "4px",
                            border: "1px solid rgba(255,255,255,0.2)",
                            boxShadow: "var(--shadow-sm)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                  <div style={{ background: "var(--ocean-600)", color: "white", padding: "12px 16px", borderRadius: "4px", fontSize: "0.88rem", lineHeight: 1.55, whiteSpace: "pre-wrap", fontFamily: "Outfit, sans-serif" }}>
                    {m.text}
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: "var(--ocean-600)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "white", marginTop: 2 }}>🌊</div>
                <div style={{ background: "white", border: "1px solid var(--sand-300)", padding: "16px 20px", borderRadius: "4px", fontSize: "0.95rem", color: "var(--slate-mid)", lineHeight: 1.75, maxWidth: "82%", fontFamily: "Lora, Georgia, serif", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                  {m.text ? renderRich(m.text) : (busy && i === messages.length - 1 ? <span style={{ color: "var(--ocean-400)" }}>● ● ●</span> : "")}
                </div>
              </div>
            )
          )}

          {/* Prompt to get brief after 2 AI replies */}
          {showBriefButton && !submitted && (
            <div style={{ background: "white", border: `1px solid ${atQuotaLimit ? "var(--sand-300)" : "var(--gold)"}`, borderRadius: 4, padding: "20px 24px", textAlign: "center", marginTop: 8, boxShadow: "var(--shadow-sm)" }}>
              {atQuotaLimit ? (
                <>
                  <p style={{ fontSize: "0.9rem", color: "var(--slate-dark)", margin: "0 0 8px", fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>🔒 You&apos;ve used your {FREE_QUOTA} free briefs</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", margin: "0 0 16px", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>Subscribe for $10/month to send unlimited briefs + access the full magazine.</p>
                  <button onClick={() => setShowPaywall(true)} style={{ background: "var(--ocean-600)", color: "white", border: "none", borderRadius: "4px", padding: "12px 28px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", fontFamily: "Outfit, sans-serif", letterSpacing: "0.02em" }}>
                    Unlock Unlimited Access →
                  </button>
                </>
              ) : (
                <>
                  <p style={{ fontFamily: "Lora, Georgia, serif", fontSize: "0.95rem", color: "var(--slate-dark)", margin: "0 0 8px", lineHeight: 1.5, fontWeight: 600 }}>
                    Ready to lock in this design brief?
                  </p>
                  {!subscribed && <p style={{ fontSize: "0.76rem", color: "var(--sand-500)", margin: "0 0 14px", fontFamily: "Outfit, sans-serif", fontWeight: 600 }}>{FREE_QUOTA - quotesUsed} free brief{FREE_QUOTA - quotesUsed !== 1 ? "s" : ""} remaining</p>}
                  <button
                    onClick={() => setShowModal(true)}
                    style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-light))", color: "white", border: "none", borderRadius: "4px", padding: "12px 28px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", fontFamily: "Outfit, sans-serif", letterSpacing: "0.02em", boxShadow: "0 4px 12px rgba(201,151,42,0.2)" }}
                  >
                    📋 Get Quote Brief →
                  </button>
                </>
              )}
            </div>
          )}

          {submitted && (
            <div style={{ background: "rgba(240, 249, 248, 0.75)", border: "1px solid var(--ocean-100)", borderRadius: 4, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>✅</div>
              <p style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.05rem", fontWeight: 600, color: "var(--ocean-700)", margin: "0 0 8px" }}>Your brief has been sent!</p>
              <p style={{ fontSize: "0.84rem", color: "var(--slate-mid)", margin: 0, fontFamily: "Outfit, sans-serif" }}>Check your email — we&apos;ll be in touch with matched tradies soon.</p>
            </div>
          )}
        </div>

        {/* Composer */}
        <div style={{ borderTop: "1px solid var(--sand-200)", padding: "14px 18px", background: "white" }}>
          {/* Pending image thumbnails */}
          {pendingImages.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              {pendingImages.map((img, idx) => (
                <div key={idx} style={{ position: "relative", flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.preview} alt={`Photo ${idx + 1}`} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 4, border: "1px solid var(--sand-300)", display: "block" }} />
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
                  style={{ width: 56, height: 56, borderRadius: 4, border: "1px dashed var(--sand-400)", background: "var(--sand-50)", color: "var(--sand-500)", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  +
                </button>
              )}
              <span style={{ alignSelf: "center", fontSize: "0.75rem", color: "var(--slate-light)", fontFamily: "Outfit, sans-serif" }}>
                {pendingImages.length}/6 photo{pendingImages.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={onPick} style={{ display: "none" }} />
            {pendingImages.length === 0 && (
              <button
                onClick={() => fileRef.current?.click()}
                aria-label="Upload photos"
                title="Upload up to 6 photos"
                style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 4, border: "1px solid var(--sand-300)", background: "white", cursor: "pointer", fontSize: "1.1rem", transition: "var(--transition-fast)" }}
                className="upload-btn-hover"
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
              style={{ flex: 1, resize: "none", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 16px", fontSize: "0.9rem", fontFamily: "Outfit, sans-serif", lineHeight: 1.5, maxHeight: 120, outline: "none", color: "var(--slate-dark)" }}
              className="chat-textarea-focus"
            />
            <button
              onClick={() => send()}
              disabled={busy || (!input.trim() && pendingImages.length === 0)}
              aria-label="Send"
              style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 4, border: "none", background: busy || (!input.trim() && pendingImages.length === 0) ? "var(--sand-300)" : "var(--ocean-600)", color: "white", cursor: busy ? "default" : "pointer", fontSize: "1.1rem" }}
            >
              ➤
            </button>
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--slate-light)", textAlign: "center", marginTop: 10, fontFamily: "Outfit, sans-serif" }}>
            CoastAI gives design ideas and ballpark costs — not binding quotes. Real quotes come from QBCC-licensed tradies.
          </p>
        </div>
      </div>

      {/* Paywall modal */}
      {showPaywall && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowPaywall(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(45,35,25,0.4)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "36px 32px 32px", width: "100%", maxWidth: 420, boxShadow: "var(--shadow-xl)", textAlign: "center" }} className="page-fade-in">
            <div style={{ fontSize: "2.4rem", marginBottom: 12 }}>🔒</div>
            <h2 style={{ fontFamily: "Lora, Georgia, serif", margin: "0 0 10px", fontSize: "1.3rem", fontWeight: 600, color: "var(--slate-dark)" }}>You&apos;ve used your {FREE_QUOTA} free briefs</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "0.85rem", lineHeight: 1.65, margin: "0 0 24px", fontFamily: "Outfit, sans-serif" }}>
              Subscribe for <strong>$10/month AUD</strong> to send unlimited AI quote briefs and read every magazine article. Cancel anytime.
            </p>
            <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: 4, padding: "16px 20px", marginBottom: 28, textAlign: "left" }}>
              {[
                "✦ Unlimited AI quote briefs",
                "✦ Full magazine access (8+ articles)",
                "✦ Matched QBCC-licensed tradies",
                "✦ Cancel anytime",
              ].map((item) => (
                <div key={item} style={{ fontSize: "0.85rem", color: "var(--slate-mid)", marginBottom: 8, fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>{item}</div>
              ))}
            </div>
            <button
              onClick={handleSubscribe}
              disabled={loadingCheckout}
              style={{ width: "100%", background: loadingCheckout ? "var(--sand-300)" : "linear-gradient(135deg, var(--gold), var(--gold-light))", color: "white", border: "none", borderRadius: 4, padding: "14px 0", fontWeight: 700, fontSize: "0.95rem", cursor: loadingCheckout ? "default" : "pointer", fontFamily: "Outfit, sans-serif", marginBottom: 12 }}
            >
              {loadingCheckout ? "Loading checkout…" : "Subscribe — $10/month AUD →"}
            </button>
            <button onClick={() => setShowPaywall(false)} style={{ background: "none", border: "none", color: "var(--slate-light)", fontSize: "0.82rem", cursor: "pointer", fontFamily: "Outfit, sans-serif", textDecoration: "underline" }}>
              Maybe later
            </button>
          </div>
        </div>
      )}

      {/* Contact modal */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(45,35,25,0.4)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "32px", width: "100%", maxWidth: 420, boxShadow: "var(--shadow-xl)" }} className="page-fade-in">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, borderBottom: "3px double var(--sand-200)", paddingBottom: 14 }}>
              <div>
                <h2 style={{ fontFamily: "Lora, Georgia, serif", margin: 0, fontSize: "1.3rem", fontWeight: 600, color: "var(--slate-dark)" }}>Send My Quote Brief</h2>
                <p style={{ margin: "4px 0 0", fontSize: "0.78rem", color: "var(--slate-light)" }}>We&apos;ll email you a full brief + find local tradies</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "1.4rem", color: "var(--slate-light)", cursor: "pointer", lineHeight: 1 }}>✕</button>
            </div>

            <form onSubmit={handleSubmitBrief}>
              {field("Your Name", "name", "text", true)}
              {field("Email Address", "email", "email", true)}
              {field("Phone (optional)", "phone", "tel")}
              {field("Suburb", "suburb", "text")}

              {submitError && (
                <p style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: 12, padding: "8px 12px", background: "#fef2f2", borderRadius: 4, border: "1px solid #fecaca" }}>
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !contact.name || !contact.email}
                style={{ width: "100%", background: submitting ? "var(--sand-300)" : "var(--ocean-600)", color: "white", border: "none", borderRadius: 4, padding: "13px 0", fontWeight: 700, fontSize: "0.92rem", cursor: submitting ? "default" : "pointer", fontFamily: "Outfit, sans-serif", marginTop: 8 }}
              >
                {submitting ? "Sending your brief…" : "📨 Send My Brief"}
              </button>

              <p style={{ fontSize: "0.72rem", color: "var(--sand-500)", textAlign: "center", margin: "14px 0 0", fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>
                QBCC-licensed tradies only · Max 3 quotes · No spam, ever
              </p>
            </form>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .starter-btn-hover:hover {
          background: var(--sand-50) !important;
          border-color: var(--ocean-500) !important;
        }
        .upload-btn-hover:hover {
          border-color: var(--sand-400) !important;
          background: var(--sand-50) !important;
        }
        .chat-textarea-focus:focus {
          border-color: var(--ocean-400) !important;
        }
      `}} />
    </>
  );
}

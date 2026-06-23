"use client";
import { useState } from "react";
import Link from "next/link";
import LocationInput from "@/components/LocationInput";

const jobTypes = [
  "Waterproofing",
  "Silicone Sealing",
  "Bathroom Renovation",
  "Tiling",
  "Roof Repair",
  "Kitchen Renovation",
  "General Home Repair",
  "Design Consultation",
  "Other",
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    jobType: "",
    location: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    timeline: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      if (!res.ok) throw new Error("Send failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--off-white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 80,
        }}
      >
        <div style={{ textAlign: "center", padding: "48px 32px", maxWidth: 500 }}>
          <div style={{ fontSize: "3rem", marginBottom: 24, color: "var(--gold)" }}>✦</div>
          <h2 style={{ fontSize: "2.2rem", marginBottom: 16, color: "var(--ocean-700)", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Quote Request Received
          </h2>
          <p style={{ color: "var(--slate-mid)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 32, fontFamily: "Outfit, sans-serif" }}>
            Thanks, <strong>{form.name}</strong>! We&apos;ll review your request and connect you with up to 3 QBCC-licensed local tradies within <strong>7 days</strong>.
          </p>
          <div
            style={{
              background: "white",
              borderRadius: 4,
              padding: "24px",
              border: "1px solid var(--sand-300)",
              marginBottom: 32,
              textAlign: "left",
            }}
          >
            <h4 style={{ marginBottom: 12, fontSize: "0.8rem", color: "var(--slate-light)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Outfit, sans-serif" }}>Your Request Summary</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["Job Type", form.jobType],
                ["Location", form.location],
                ["Timeline", form.timeline],
                ["Contact", form.email],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--slate-light)", minWidth: 80 }}>{k}:</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--slate-dark)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href="/" className="btn-primary">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "#0c2422",
          borderBottom: "3px double var(--sand-300)",
          paddingTop: 140,
          paddingBottom: 74,
          textAlign: "center",
        }}
      >
        <div className="container-md">
          <div className="badge" style={{ marginBottom: 20, display: "inline-flex", background: "rgba(255, 255, 255, 0.05)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>
            Free — No Obligation
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", marginBottom: 16, color: "white", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Ready for Real Quotes?
          </h1>
          <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto 20px", fontFamily: "Outfit, sans-serif", lineHeight: 1.6 }}>
            Tell us about your renovation and we&apos;ll match you with up to 3 QBCC-licensed local tradies — at no cost to you, with no obligation.
          </p>
          <Link
            href="/design"
            style={{ fontSize: "0.85rem", color: "var(--gold)", fontWeight: 600, textDecoration: "none", fontFamily: "Outfit, sans-serif" }}
          >
            ✦ Haven&apos;t designed your space yet? Chat with CoastAI first →
          </Link>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: "var(--off-white)", padding: "48px 0 96px" }}>
        <div className="container-md">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: 40,
              alignItems: "flex-start",
            }}
            className="quote-grid"
          >
            {/* Main Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                background: "white",
                borderRadius: 4,
                padding: "40px",
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--sand-300)",
              }}
            >
              {/* Step indicator */}
              <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: 3,
                      background: step >= s ? "var(--ocean-600)" : "var(--sand-200)",
                      transition: "var(--transition)",
                    }}
                  />
                ))}
              </div>

              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <h3 style={{ fontSize: "1.3rem", fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Step 1: Tell Us About Your Job</h3>

                  <div className="form-group">
                    <label className="form-label" htmlFor="jobType">Type of Work *</label>
                    <select
                      id="jobType"
                      name="jobType"
                      className="form-input"
                      value={form.jobType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a job type...</option>
                      {jobTypes.map((j) => (
                        <option key={j} value={j}>{j}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="location">Your Location *</label>
                    <LocationInput
                      id="location"
                      value={form.location}
                      onChange={(val) => setForm((prev) => ({ ...prev, location: val }))}
                      placeholder="Enter suburb or address..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="timeline">When do you need it?</label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="form-input"
                      value={form.timeline}
                      onChange={handleChange}
                    >
                      <option value="">Select a timeline...</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1-2 weeks">Within 1–2 weeks</option>
                      <option value="1 month">Within 1 month</option>
                      <option value="Planning stage">Just planning for now</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="description">Describe Your Job *</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-input"
                      rows={4}
                      placeholder="E.g. Shower needs re-siliconing, approx 1.8m of joins. Old silicone is mouldy and cracking..."
                      value={form.description}
                      onChange={handleChange}
                      required
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn-primary"
                    id="quote-next-step"
                    onClick={() => {
                      if (form.jobType && form.location && form.description) setStep(2);
                    }}
                    style={{ alignSelf: "flex-start" }}
                  >
                    Next: Your Details →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <h3 style={{ fontSize: "1.3rem", fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Step 2: Your Contact Details</h3>
                  <p style={{ color: "var(--slate-mid)", fontSize: "0.88rem", fontFamily: "Outfit, sans-serif" }}>
                    We&apos;ll only share your details with matched tradies — never for spam or marketing.
                  </p>

                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="04XX XXX XXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setStep(1)}
                      id="quote-back"
                      disabled={loading}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="btn-gold"
                      id="quote-submit"
                      disabled={loading}
                      style={{ opacity: loading ? 0.75 : 1 }}
                    >
                      {loading ? "⏳ Sending..." : "🔧 Submit Quote Request"}
                    </button>
                  </div>

                  {error && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 4, padding: "12px 16px", color: "#dc2626", fontSize: "0.875rem", fontFamily: "Outfit, sans-serif" }}>
                      ✦ {error}
                    </div>
                  )}

                  <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", fontFamily: "Outfit, sans-serif" }}>
                    ✦ Your information is safe. We never sell your data to third parties.
                  </p>
                </div>
              )}
            </form>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* What you get */}
              <div
                style={{
                  background: "var(--ocean-700)",
                  border: "1px solid var(--sand-300)",
                  borderRadius: 4,
                  padding: "28px",
                  color: "white",
                }}
              >
                <h4 style={{ color: "white", marginBottom: 16, fontSize: "1.1rem", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                  ✦ What You Get
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0 }}>
                  {[
                    "Up to 3 matched local quotes",
                    "QBCC-licensed tradies only",
                    "Matched within 7 days",
                    "100% free — no obligation",
                    "Your details stay private",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, fontSize: "0.88rem", color: "rgba(255,255,255,0.9)", fontFamily: "Outfit, sans-serif" }}>
                      <span style={{ color: "var(--gold)" }}>✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Design first prompt */}
              <div
                className="card"
                style={{
                  padding: "22px",
                  background: "white",
                  border: "1px solid var(--sand-300)",
                  borderRadius: 4,
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: 8, color: "var(--gold)" }}>✦</div>
                <h4 style={{ fontSize: "0.95rem", marginBottom: 8, fontFamily: "Lora, Georgia, serif", fontWeight: 600 }}>Not sure what you need?</h4>
                <p style={{ fontSize: "0.84rem", color: "var(--slate-mid)", lineHeight: 1.6, marginBottom: 14, fontFamily: "Outfit, sans-serif" }}>
                  Chat with CoastAI first — upload a photo of your space and get a design concept plus a realistic QLD ballpark, free.
                </p>
                <Link
                  href="/design"
                  style={{ fontWeight: 700, color: "var(--ocean-600)", textDecoration: "none", fontSize: "0.88rem", fontFamily: "Outfit, sans-serif" }}
                >
                  Try CoastAI →
                </Link>
              </div>

              {/* Email fallback */}
              <div
                className="card"
                style={{
                  padding: "22px",
                  background: "white",
                  border: "1px solid var(--sand-300)",
                  borderRadius: 4,
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: 8, color: "var(--gold)" }}>✦</div>
                <h4 style={{ fontSize: "0.95rem", marginBottom: 8, fontFamily: "Lora, Georgia, serif", fontWeight: 600 }}>Prefer Email?</h4>
                <p style={{ fontSize: "0.84rem", color: "var(--slate-mid)", lineHeight: 1.6, marginBottom: 12, fontFamily: "Outfit, sans-serif" }}>
                  Mon–Sat 7am–5pm. We reply within one business day.
                </p>
                <a
                  href="mailto:info@coasthomehub.com.au"
                  style={{ fontWeight: 700, color: "var(--ocean-600)", textDecoration: "none", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif" }}
                >
                  info@coasthomehub.com.au
                </a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .quote-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ACL Disclaimer */}
      <section style={{ background: "var(--off-white)", borderTop: "1px solid var(--sand-200)", padding: "20px 24px" }}>
        <p style={{ fontSize: "0.7rem", color: "var(--slate-light)", maxWidth: 720, margin: "0 auto", lineHeight: 1.75, textAlign: "center" }}>
          <strong>Important:</strong> CoastHomeHub uses best efforts to match your request with up to 3 QBCC-licensed tradies but does not guarantee tradie availability, minimum quote numbers, or response times. AI-generated cost estimates are indicative only and are not formal quotes — only a licensed tradie can provide a binding quotation. Matching with a licensed contractor helps preserve your eligibility for Queensland Home Warranty Insurance, but coverage depends on the nature and value of the work. CoastHomeHub is not a building contractor and does not supervise or warrant any tradie&apos;s work. <a href="/terms" style={{ color: "var(--ocean-500)", textDecoration: "underline" }}>Full Terms &amp; Conditions</a>.
        </p>
      </section>
    </>
  );
}

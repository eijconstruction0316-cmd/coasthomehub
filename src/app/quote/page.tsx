"use client";
import { useState } from "react";

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

const locations = [
  "Gold Coast",
  "Tweed Heads",
  "Northern Gold Coast",
  "Logan",
  "Brisbane South",
  "Brisbane North",
  "Sunshine Coast",
  "Noosa",
  "Other QLD",
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
        body: JSON.stringify({ ...form, jobType: form.jobType, location: form.location, timeline: form.timeline }),
      });
      if (!res.ok) throw new Error("Send failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, var(--ocean-50) 0%, var(--sand-50) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 80,
        }}
      >
        <div style={{ textAlign: "center", padding: "48px 32px", maxWidth: 500 }}>
          <div style={{ fontSize: "4rem", marginBottom: 24 }}>✅</div>
          <h2 style={{ fontSize: "2rem", marginBottom: 16, color: "var(--ocean-600)" }}>
            Quote Request Received!
          </h2>
          <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 32 }}>
            Thanks, <strong>{form.name}</strong>! We&apos;ll review your request and connect you with 1–3 licensed local tradies within <strong>24 hours</strong>.
          </p>
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              border: "1px solid var(--sand-200)",
              marginBottom: 32,
              textAlign: "left",
            }}
          >
            <h4 style={{ marginBottom: 12, fontSize: "0.9rem", color: "var(--slate-light)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Request Summary</h4>
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
          <a href="/" className="btn-primary">← Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--ocean-50) 0%, var(--sand-50) 100%)",
          paddingTop: 120,
          paddingBottom: 64,
          textAlign: "center",
        }}
      >
        <div className="container-md">
          <div className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>
            Free Quote Request
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 16 }}>
            Get Connected with a Local Tradie
          </h1>
          <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>
            Fill in the details below and we&apos;ll match you with 1–3 licensed, insured professionals from Gold Coast to Sunshine Coast — at no cost to you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: "var(--off-white)", padding: "48px 0 96px" }}>
        <div className="container-md">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
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
                borderRadius: "var(--radius-xl)",
                padding: "40px",
                boxShadow: "var(--shadow-md)",
                border: "1px solid rgba(26,35,50,0.06)",
              }}
            >
              {/* Step indicator */}
              <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: step >= s ? "var(--ocean-400)" : "var(--sand-200)",
                      transition: "var(--transition)",
                    }}
                  />
                ))}
              </div>

              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <h3 style={{ fontSize: "1.3rem" }}>Step 1: Tell Us About Your Job</h3>

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
                    <select
                      id="location"
                      name="location"
                      className="form-input"
                      value={form.location}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your area...</option>
                      {locations.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
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
                  <h3 style={{ fontSize: "1.3rem" }}>Step 2: Your Contact Details</h3>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.9rem" }}>
                    We&apos;ll only share your details with matched tradies — not for spam.
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
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", color: "#dc2626", fontSize: "0.875rem" }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <p style={{ fontSize: "0.78rem", color: "var(--slate-light)" }}>
                    🔒 Your information is safe. We never sell your data to third parties.
                  </p>
                </div>
              )}
            </form>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px",
                  color: "white",
                }}
              >
                <h4 style={{ color: "white", marginBottom: 16, fontSize: "1.1rem" }}>
                  ✅ What You Get
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "Up to 3 matched local quotes",
                    "Licensed & insured tradies only",
                    "Reply within 24 hours",
                    "100% free — no obligation",
                    "No hidden fees ever",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>
                      <span>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="card"
                style={{
                  padding: "24px",
                  background: "var(--sand-50)",
                  border: "1px solid var(--sand-200)",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>📞</div>
                <h4 style={{ fontSize: "1rem", marginBottom: 8 }}>Prefer to Call?</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--slate-light)", lineHeight: 1.6, marginBottom: 12 }}>
                  EIJ Construction is available Mon–Sat 7am–5pm.
                </p>
                <a
                  href="tel:+61XXXXXXXXX"
                  style={{
                    fontWeight: 700,
                    color: "var(--ocean-500)",
                    textDecoration: "none",
                    fontSize: "1rem",
                  }}
                >
                  +61 (0) XXX XXX XXX
                </a>
              </div>

              <div
                className="card"
                style={{ padding: "24px", background: "white" }}
              >
                <h4 style={{ fontSize: "0.95rem", marginBottom: 12 }}>🏆 Why Choose Us?</h4>
                {[
                  ["500+", "Jobs completed"],
                  ["8+", "Years in QLD"],
                  ["5★", "Average rating"],
                ].map(([v, l]) => (
                  <div
                    key={l}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid var(--sand-100)",
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--ocean-500)" }}>{v}</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--slate-light)" }}>{l}</span>
                  </div>
                ))}
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
    </>
  );
}

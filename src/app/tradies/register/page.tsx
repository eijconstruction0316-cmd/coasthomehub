"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const serviceCategories = [
  "Waterproofing",
  "Silicone Sealing",
  "Bathroom Renovation",
  "Kitchen Renovation",
  "Tiling",
  "Painting",
  "Plastering",
  "Roofing",
  "General Carpentry",
  "Landscaping",
  "Electrical",
  "Plumbing",
  "Air Conditioning",
  "Other",
];

const serviceAreas = [
  "Gold Coast North (Coomera, Hope Island)",
  "Gold Coast Central (Surfers Paradise, Robina)",
  "Gold Coast South (Burleigh, Coolangatta)",
  "Gold Coast Hinterland",
  "Tweed Heads & Northern NSW",
  "Logan & Springwood",
  "Redland City (Capalaba, Cleveland)",
  "Ipswich & West Brisbane",
  "Brisbane CBD & Inner Suburbs",
  "Brisbane North (Chermside, North Lakes)",
  "Brisbane South (Sunnybank, Mt Gravatt)",
  "Brisbane East & Bayside",
  "Moreton Bay Region",
  "Sunshine Coast South (Caloundra)",
  "Sunshine Coast Central (Maroochydore, Buderim)",
  "Sunshine Coast North (Coolum, Noosa)",
  "Sunshine Coast Hinterland",
  "Other QLD / Regional",
];

const plans = [
  {
    id: "founding",
    name: "Founding",
    price: 149,
    tagline: "Get started with qualified leads",
    color: "var(--ocean-500)",
    badge: null,
    features: [
      "3 free lead credits per month ($90 value)",
      "Purchase extra credits at base rates",
      "QBCC verified badge",
      "Business profile + photos",
      "B2B Buyers Club: supplier info access",
      "SMS & email notifications",
      "No commission ever"
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 249,
    tagline: "Stand out and build your brand",
    color: "var(--ocean-500)",
    badge: "⭐ MOST POPULAR",
    features: [
      "10 free lead credits per month ($300 value)",
      "Purchase extra credits with 10% discount",
      "B2B Buyers Club: 5% trade discount",
      "Spotlight badge — profile boosted",
      "Auto Project Story pages (SEO)",
      "Monthly lead performance report",
      "No commission ever"
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 399,
    tagline: "Maximum visibility & brand authority",
    color: "#92650a",
    badge: "👑 ELITE",
    features: [
      "25 free lead credits per month ($750 value)",
      "Purchase extra credits with 20% discount",
      "B2B Buyers Club: 10% discount + free delivery",
      "12-hour First-Look Priority Access",
      "Unlimited portfolio uploads & supplier tags",
      "Homepage spotlight & magazine feature",
      "No commission ever"
    ],
  },
];

function RegisterForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "founding";
  const [step, setStep] = useState(1);
  const [submitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState("");

  const [form, setForm] = useState({
    businessName: "",
    abn: "",
    licenceNumber: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (s: string) => {
    setSelectedServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const toggleArea = (a: string) => {
    setSelectedAreas((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  const plan = plans.find((p) => p.id === selectedPlan) || plans[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStripeError("");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          businessName: form.businessName,
          email: form.email,
          contactName: form.contactName,
          abn: form.abn,
          licenceNumber: form.licenceNumber,
          phone: form.phone,
          services: selectedServices,
          areas: selectedAreas,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to start checkout");
      }
    } catch (err: unknown) {
      setStripeError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <div style={{ width: 72, height: 72, background: "var(--ocean-50)", border: "1px solid var(--ocean-200)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", margin: "0 auto 24px" }}>✓</div>
          <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "2rem", marginBottom: 12, color: "var(--ocean-700)", fontWeight: 500 }}>You&apos;re on the list!</h2>
          <p style={{ color: "var(--slate-mid)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 24 }}>
            Thanks, <strong>{form.contactName}</strong>! Your application for <strong>{form.businessName}</strong> is under review. We&apos;ll verify your QLD licence within 24 hours and send your login details to <strong>{form.email}</strong>.
          </p>
          <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: 4, padding: "20px 24px", marginBottom: 28, textAlign: "left" }}>
            <h4 style={{ fontSize: "0.78rem", color: "var(--ocean-700)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 800 }}>Your Registration Summary</h4>
            {[
              ["Plan", `${plan.name} — $${plan.price}/month`],
              ["Services", selectedServices.join(", ") || "Not selected"],
              ["Areas", selectedAreas.join(", ") || "Not selected"],
              ["Contact", form.email],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 12, padding: "6px 0", borderBottom: "1px solid var(--ocean-100)" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--slate-light)", minWidth: 80 }}>{k}:</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--slate-dark)" }}>{v}</span>
              </div>
            ))}
          </div>
          <Link href="/tradies" className="btn-primary" id="register-success-back">← Back to Tradie Hub</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg page-fade-in" style={{ padding: "56px 24px 112px" }}>
      {/* Progress bar */}
      <div style={{ maxWidth: 600, margin: "0 auto 48px" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 1.5, background: step >= s ? "var(--ocean-600)" : "var(--sand-200)", transition: "var(--transition)" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Business Details", "Services & Areas", "Confirm & Pay"].map((label, i) => (
            <span key={label} style={{ fontSize: "0.78rem", color: step > i ? "var(--ocean-600)" : "var(--slate-light)", fontWeight: step === i + 1 ? 700 : 400, letterSpacing: "0.02em", fontFamily: "Outfit, sans-serif" }}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 40, alignItems: "flex-start" }} className="register-grid">
        {/* Main form */}
        <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: 4, padding: "40px", boxShadow: "0 2px 12px rgba(26, 35, 50, 0.03)", border: "1px solid var(--sand-200)" }}>

          {/* ── STEP 1: Business Details ── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--slate-dark)", marginBottom: 6 }}>Step 1: Business Details</h2>
                <p style={{ color: "var(--slate-light)", fontSize: "0.82rem", letterSpacing: "0.01em" }}>All details are kept private and used only for verification.</p>
              </div>

              {[
                { name: "businessName", label: "Business / Trading Name *", placeholder: "EIJ Construction Pty Ltd" },
                { name: "abn", label: "ABN *", placeholder: "12 345 678 901" },
                { name: "licenceNumber", label: "QLD Licence Number *", placeholder: "QBCC-XXXXXXXX" },
                { name: "contactName", label: "Contact Name *", placeholder: "Peter Kim" },
                { name: "email", label: "Email Address *", placeholder: "peter@mybusiness.com.au" },
                { name: "phone", label: "Mobile Number *", placeholder: "04XX XXX XXX" },
                { name: "website", label: "Website (optional)", placeholder: "https://mybusiness.com.au" },
              ].map((field) => (
                <div className="form-group" key={field.name}>
                  <label className="form-label" htmlFor={field.name} style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--slate-dark)", letterSpacing: "0.01em" }}>{field.label}</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "text"}
                    className="form-input"
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    required={!field.label.includes("optional")}
                    style={{ borderRadius: "4px", padding: "12px 14px", fontSize: "0.92rem", border: "1px solid var(--sand-300)" }}
                  />
                </div>
              ))}

              <div className="form-group">
                <label className="form-label" htmlFor="description" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--slate-dark)" }}>Tell homeowners about your business *</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-input"
                  rows={3}
                  placeholder="E.g. Licensed waterproofing and tiling specialists with 10 years experience across Gold Coast..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  style={{ resize: "vertical", borderRadius: "4px", padding: "12px 14px", fontSize: "0.92rem", border: "1px solid var(--sand-300)" }}
                />
              </div>

              <button type="button" className="btn-primary" style={{ alignSelf: "flex-start", borderRadius: "4px", padding: "12px 28px", fontSize: "0.92rem", background: "var(--ocean-600)", border: "none" }} id="register-step1-next"
                onClick={() => { if (form.businessName && form.abn && form.licenceNumber && form.contactName && form.email && form.phone) setStep(2); }}>
                Next: Services & Areas →
              </button>
            </div>
          )}

          {/* ── STEP 2: Services & Areas ── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--slate-dark)", marginBottom: 6 }}>Step 2: Your Services & Areas</h2>
                <p style={{ color: "var(--slate-light)", fontSize: "0.85rem" }}>Select all that apply. You&apos;ll only receive leads matching these.</p>
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: 14, display: "block", fontFamily: "Outfit, sans-serif", fontSize: "0.88rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--slate-dark)" }}>Services You Offer *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {serviceCategories.map((s) => {
                    const active = selectedServices.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleService(s)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "4px",
                          border: active ? "1px solid var(--ocean-500)" : "1px solid var(--sand-300)",
                          background: active ? "var(--ocean-50)" : "white",
                          color: active ? "var(--ocean-700)" : "var(--slate-mid)",
                          fontWeight: active ? 700 : 400,
                          fontSize: "0.84rem",
                          cursor: "pointer",
                          fontFamily: "Outfit, sans-serif",
                          transition: "var(--transition-fast)",
                        }}
                        className="service-badge-btn"
                      >
                        {active ? "✦ " : ""}{s}
                      </button>
                    );
                  })}
                </div>
                {selectedServices.length === 0 && <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: 8 }}>Please select at least one service.</p>}
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: 14, display: "block", fontFamily: "Outfit, sans-serif", fontSize: "0.88rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--slate-dark)" }}>Service Areas *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {serviceAreas.map((a) => {
                    const active = selectedAreas.includes(a);
                    return (
                      <button
                        type="button"
                        key={a}
                        onClick={() => toggleArea(a)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "4px",
                          border: active ? "1px solid var(--gold)" : "1px solid var(--sand-300)",
                          background: active ? "var(--sand-50)" : "white",
                          color: active ? "var(--gold)" : "var(--slate-mid)",
                          fontWeight: active ? 700 : 400,
                          fontSize: "0.84rem",
                          cursor: "pointer",
                          fontFamily: "Outfit, sans-serif",
                          transition: "var(--transition-fast)",
                        }}
                        className="service-badge-btn"
                      >
                        {active ? "✦ " : "📍 "}{a}
                      </button>
                    );
                  })}
                </div>
                {selectedAreas.length === 0 && <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: 8 }}>Please select at least one area.</p>}
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", borderTop: "1px solid var(--sand-200)", paddingTop: 24 }}>
                <button type="button" className="btn-secondary" style={{ borderRadius: "4px", padding: "11px 24px", fontSize: "0.92rem", borderColor: "var(--sand-300)" }} onClick={() => setStep(1)} id="register-step2-back">← Back</button>
                <button type="button" className="btn-primary" style={{ borderRadius: "4px", padding: "12px 28px", fontSize: "0.92rem", background: "var(--ocean-600)", border: "none" }} id="register-step2-next"
                  onClick={() => { if (selectedServices.length > 0 && selectedAreas.length > 0) setStep(3); }}>
                  Next: Choose Plan & Pay →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Plan & Payment ── */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--slate-dark)", marginBottom: 6 }}>Step 3: Choose Your Plan</h2>
                <p style={{ color: "var(--slate-light)", fontSize: "0.85rem" }}>Flat monthly fee — no lock-in, cancel anytime.</p>
              </div>

              {/* Plan selector cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {plans.map((p) => {
                  const isSelected = selectedPlan === p.id;
                  const isElite = p.id === "elite";
                  const borderColor = isSelected ? (isElite ? "var(--gold)" : "var(--ocean-500)") : "var(--sand-300)";
                  const bg = isSelected ? (isElite ? "var(--sand-50)" : "var(--ocean-50)") : "white";
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPlan(p.id)}
                      style={{
                        border: `1px solid ${borderColor}`,
                        borderRadius: "4px",
                        padding: "20px 24px",
                        background: bg,
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "Outfit, sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                        transition: "var(--transition-fast)",
                        width: "100%",
                        boxShadow: isSelected ? "var(--shadow-sm)" : "none",
                      }}
                    >
                      {/* Radio dot */}
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1px solid ${isSelected ? (isElite ? "var(--gold)" : "var(--ocean-500)") : "var(--sand-400)"}`, background: isSelected ? (isElite ? "var(--gold)" : "var(--ocean-500)") : "white", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isSelected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                          <span style={{ fontFamily: "Lora, Georgia, serif", fontWeight: 600, fontSize: "1.1rem", color: isElite ? "#92650a" : "var(--slate-dark)" }}>{p.name}</span>
                          {p.badge && (
                            <span style={{ fontSize: "0.62rem", fontWeight: 800, padding: "2px 10px", borderRadius: "50px", background: isElite ? "var(--gold)" : "var(--ocean-600)", color: "white", letterSpacing: "0.06em" }}>
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: "0.82rem", color: "var(--slate-light)" }}>{p.tagline}</span>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", fontWeight: 600, color: isElite ? "#92650a" : "var(--ocean-600)" }}>${p.price}</span>
                        <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block" }}>/month +GST</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected plan features */}
              <div style={{ border: "1px solid var(--sand-200)", borderRadius: "4px", padding: "20px 24px", background: "var(--off-white)" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--slate-dark)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Outfit, sans-serif" }}>
                  {plan.name} plan includes:
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: "0.85rem", color: "var(--slate-mid)", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--ocean-500)", fontWeight: 700, flexShrink: 0 }}>✦</span><span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secure payment note */}
              <div style={{ background: "rgba(240, 249, 248, 0.6)", border: "1px solid var(--ocean-100)", borderRadius: "4px", padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>🔒</span>
                <div>
                  <strong style={{ color: "var(--ocean-700)", fontSize: "0.88rem", fontFamily: "Outfit, sans-serif" }}>Secure checkout powered by Stripe</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", lineHeight: 1.6, margin: "4px 0 0" }}>
                    You&apos;ll be taken to Stripe&apos;s secure payment page. Your card details never touch our servers.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", borderTop: "1px solid var(--sand-200)", paddingTop: 24 }}>
                <button type="button" className="btn-secondary" style={{ borderRadius: "4px", padding: "11px 24px", fontSize: "0.92rem", borderColor: "var(--sand-300)" }} onClick={() => setStep(2)} id="register-step3-back" disabled={loading}>← Back</button>
                <button
                  type="submit"
                  className="btn-gold"
                  id="register-submit"
                  disabled={loading}
                  style={{ opacity: loading ? 0.75 : 1, borderRadius: "4px", padding: "12px 32px", fontSize: "0.95rem" }}
                >
                  {loading ? "⏳ Redirecting to secure payment..." : `🔧 Register — $${plan.price}/month`}
                </button>
              </div>
              {stripeError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 4, padding: "12px 16px", color: "#dc2626", fontSize: "0.85rem" }}>
                  ⚠️ {stripeError}
                </div>
              )}
              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: 16, borderRadius: "4px", fontSize: "0.74rem", color: "var(--slate-mid)", lineHeight: 1.6, fontFamily: "Lora, Georgia, serif", fontStyle: "italic" }}>
                <strong style={{ fontFamily: "Outfit, sans-serif", fontStyle: "normal", color: "var(--slate-dark)" }}>Compliance Note:</strong> CoastHomeHub (operated by EIJ Construction Pty Ltd) acts strictly as a directory matching licensed contractors with consumers. We are not a builder and do not contract or guarantee any building work. By registering, you confirm you hold a valid, active QBCC licence for your services and agree that you are solely liable for all projects and contracts with customers.
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--slate-light)", lineHeight: 1.5 }}>
                By completing registration you agree to our <a href="/terms" style={{ color: "var(--ocean-600)", textDecoration: "underline" }}>Terms of Service</a> and <a href="/privacy" style={{ color: "var(--ocean-600)", textDecoration: "underline" }}>Privacy Policy</a>. You will be charged ${plan.price}+GST/month. Cancel anytime before your next billing date.
              </p>
            </div>
          )}
        </form>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: "rgba(240, 249, 248, 0.75)", backdropFilter: "blur(8px)", border: "1px solid var(--ocean-100)", borderRadius: 4, padding: "32px 28px", color: "var(--slate-dark)" }}>
            <h4 style={{ color: "var(--ocean-700)", marginBottom: 20, fontSize: "1.05rem", fontFamily: "Lora, Georgia, serif", fontWeight: 600 }}>What Happens Next</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "We verify your QLD licence (24 hrs)",
                "Your profile goes live immediately after",
                "First lead notification within 48 hrs",
                "Dedicated onboarding call within 1 week",
              ].map((item, i) => (
                <li key={item} style={{ display: "flex", gap: 12, fontSize: "0.85rem", alignItems: "flex-start", lineHeight: 1.45 }}>
                  <span style={{ background: "var(--ocean-200)", color: "var(--ocean-700)", borderRadius: 2, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: "var(--slate-mid)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: 28, background: "white", border: "1px solid var(--sand-200)", borderRadius: 4 }}>
            <div style={{ fontSize: "1.6rem", marginBottom: 12 }}>✉️</div>
            <h4 style={{ fontSize: "1rem", marginBottom: 8, fontFamily: "Lora, Georgia, serif", fontWeight: 600, color: "var(--slate-dark)" }}>Questions?</h4>
            <p style={{ fontSize: "0.84rem", color: "var(--slate-light)", lineHeight: 1.6, marginBottom: 16 }}>
              Email us anytime — we&apos;ll help you get set up within one business day.
            </p>
            <a href="mailto:info@coasthomehub.com.au" style={{ fontWeight: 700, color: "var(--ocean-600)", textDecoration: "none", fontSize: "0.92rem", borderBottom: "1px dashed var(--ocean-400)" }}>
              info@coasthomehub.com.au
            </a>
          </div>

          <div className="card" style={{ padding: 28, background: "white", border: "1px solid var(--sand-200)", borderRadius: 4 }}>
            <h4 style={{ fontSize: "0.95rem", marginBottom: 10, fontFamily: "Lora, Georgia, serif", fontWeight: 600, color: "var(--slate-dark)" }}>🛡️ Our Guarantee</h4>
            <p style={{ fontSize: "0.84rem", color: "var(--slate-light)", lineHeight: 1.7 }}>
              If you don&apos;t receive at least 3 qualified leads in your first 30 days, we&apos;ll give you the next month free. No questions asked.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.register-grid{grid-template-columns:1fr!important;}}
        .service-badge-btn:hover {
          border-color: var(--ocean-400) !important;
          background: var(--sand-50) !important;
        }
      `}</style>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, var(--sand-50) 0%, var(--ocean-50) 100%)", paddingTop: 100, paddingBottom: 32 }}>
        <div className="container-lg">
          <Link href="/tradies" style={{ color: "var(--ocean-500)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            ← Back to Tradie Hub
          </Link>
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Tradie Registration</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: 8 }}>Register Your Business</h1>
          <p style={{ color: "var(--slate-light)", fontSize: "1rem" }}>Join licensed QLD tradies already winning jobs through CoastHomeHub.</p>
        </div>
      </section>
      <section style={{ background: "var(--off-white)" }}>
        <Suspense fallback={<div style={{ padding: "64px 24px", textAlign: "center" }}>Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </section>
    </>
  );
}

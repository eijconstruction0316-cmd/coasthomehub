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
    features: ["All matching leads in your area", "QBCC verified badge", "Business profile + photos", "SMS & email notifications", "Max 3 tradies per lead", "No commission ever"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 249,
    tagline: "Stand out and build your brand",
    color: "var(--ocean-500)",
    badge: "⭐ MOST POPULAR",
    features: ["Everything in Founding", "Spotlight badge — profile boosted", "Auto Project Story pages (SEO)", "Monthly lead performance report", "Priority customer support", "No commission ever"],
  },
  {
    id: "elite",
    name: "Elite",
    price: 399,
    tagline: "Maximum visibility & brand authority",
    color: "#92650a",
    badge: "👑 ELITE",
    features: ["Everything in Growth", "Magazine interview opportunity (quarterly)", "Homeowner newsletter feature (monthly)", "Dedicated onboarding call", "Priority search placement", "No commission ever"],
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
          <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 24px" }}>✅</div>
          <h2 style={{ fontSize: "2rem", marginBottom: 12, color: "var(--ocean-600)" }}>You&apos;re on the list!</h2>
          <p style={{ color: "var(--slate-light)", lineHeight: 1.7, fontSize: "1rem", marginBottom: 24 }}>
            Thanks, <strong>{form.contactName}</strong>! Your application for <strong>{form.businessName}</strong> is under review. We&apos;ll verify your QLD licence within 24 hours and send your login details to <strong>{form.email}</strong>.
          </p>
          <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: "var(--radius-lg)", padding: "20px 24px", marginBottom: 28, textAlign: "left" }}>
            <h4 style={{ fontSize: "0.85rem", color: "var(--ocean-700)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Registration Summary</h4>
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
    <div className="container-lg" style={{ padding: "48px 24px 96px" }}>
      {/* Progress bar */}
      <div style={{ maxWidth: 640, margin: "0 auto 40px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= s ? "var(--ocean-400)" : "var(--sand-200)", transition: "var(--transition)" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Business Details", "Services & Areas", "Confirm & Pay"].map((label, i) => (
            <span key={label} style={{ fontSize: "0.75rem", color: step > i ? "var(--ocean-600)" : "var(--slate-light)", fontWeight: step === i + 1 ? 700 : 400 }}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "flex-start" }} className="register-grid">
        {/* Main form */}
        <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: "var(--radius-xl)", padding: "40px", boxShadow: "var(--shadow-md)", border: "1px solid rgba(26,35,50,0.06)" }}>

          {/* ── STEP 1: Business Details ── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", marginBottom: 4 }}>Step 1: Business Details</h2>
                <p style={{ color: "var(--slate-light)", fontSize: "0.875rem" }}>All details are kept private and used only for verification.</p>
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
                  <label className="form-label" htmlFor={field.name}>{field.label}</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "text"}
                    className="form-input"
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    required={!field.label.includes("optional")}
                  />
                </div>
              ))}

              <div className="form-group">
                <label className="form-label" htmlFor="description">Tell homeowners about your business *</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-input"
                  rows={3}
                  placeholder="E.g. Licensed waterproofing and tiling specialists with 10 years experience across Gold Coast..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  style={{ resize: "vertical" }}
                />
              </div>

              <button type="button" className="btn-primary" style={{ alignSelf: "flex-start" }} id="register-step1-next"
                onClick={() => { if (form.businessName && form.abn && form.licenceNumber && form.contactName && form.email && form.phone) setStep(2); }}>
                Next: Services & Areas →
              </button>
            </div>
          )}

          {/* ── STEP 2: Services & Areas ── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", marginBottom: 4 }}>Step 2: Your Services & Areas</h2>
                <p style={{ color: "var(--slate-light)", fontSize: "0.875rem" }}>Select all that apply. You&apos;ll only receive leads matching these.</p>
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: 12, display: "block" }}>Services You Offer *</label>
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
                          borderRadius: "50px",
                          border: active ? "2px solid var(--ocean-400)" : "1px solid var(--sand-200)",
                          background: active ? "var(--ocean-50)" : "white",
                          color: active ? "var(--ocean-700)" : "var(--slate-mid)",
                          fontWeight: active ? 700 : 400,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          fontFamily: "Outfit, sans-serif",
                          transition: "var(--transition-fast)",
                        }}
                      >
                        {active ? "✓ " : ""}{s}
                      </button>
                    );
                  })}
                </div>
                {selectedServices.length === 0 && <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: 8 }}>Please select at least one service.</p>}
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: 12, display: "block" }}>Service Areas *</label>
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
                          borderRadius: "50px",
                          border: active ? "2px solid var(--gold)" : "1px solid var(--sand-200)",
                          background: active ? "#fef9f0" : "white",
                          color: active ? "var(--gold)" : "var(--slate-mid)",
                          fontWeight: active ? 700 : 400,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          fontFamily: "Outfit, sans-serif",
                          transition: "var(--transition-fast)",
                        }}
                      >
                        {active ? "✓ " : "📍 "}{a}
                      </button>
                    );
                  })}
                </div>
                {selectedAreas.length === 0 && <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: 8 }}>Please select at least one area.</p>}
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button type="button" className="btn-secondary" onClick={() => setStep(1)} id="register-step2-back">← Back</button>
                <button type="button" className="btn-primary" id="register-step2-next"
                  onClick={() => { if (selectedServices.length > 0 && selectedAreas.length > 0) setStep(3); }}>
                  Next: Choose Plan & Pay →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Plan & Payment ── */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", marginBottom: 4 }}>Step 3: Choose Your Plan</h2>
                <p style={{ color: "var(--slate-light)", fontSize: "0.875rem" }}>Flat monthly fee — no lock-in, cancel anytime.</p>
              </div>

              {/* Plan selector cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {plans.map((p) => {
                  const isSelected = selectedPlan === p.id;
                  const isElite = p.id === "elite";
                  const borderColor = isSelected ? (isElite ? "var(--gold)" : "var(--ocean-400)") : "var(--sand-200)";
                  const bg = isSelected ? (isElite ? "#fef9f0" : "var(--ocean-50)") : "white";
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPlan(p.id)}
                      style={{
                        border: `2px solid ${borderColor}`,
                        borderRadius: "var(--radius-md)",
                        padding: "16px 20px",
                        background: bg,
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "Outfit, sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        transition: "var(--transition-fast)",
                        width: "100%",
                      }}
                    >
                      {/* Radio dot */}
                      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${isSelected ? (isElite ? "var(--gold)" : "var(--ocean-400)") : "var(--sand-300)"}`, background: isSelected ? (isElite ? "var(--gold)" : "var(--ocean-400)") : "white", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                          <span style={{ fontWeight: 800, fontSize: "1rem", color: isElite ? "#92650a" : "var(--slate-dark)" }}>{p.name}</span>
                          {p.badge && (
                            <span style={{ fontSize: "0.65rem", fontWeight: 800, padding: "2px 8px", borderRadius: "50px", background: isElite ? "var(--gold)" : "var(--ocean-500)", color: "white", letterSpacing: "0.04em" }}>
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: "0.8rem", color: "var(--slate-light)" }}>{p.tagline}</span>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span style={{ fontSize: "1.5rem", fontWeight: 900, color: isElite ? "#92650a" : "var(--ocean-600)" }}>${p.price}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--slate-light)", display: "block" }}>/month +GST</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected plan features */}
              <div style={{ border: "1px solid var(--sand-200)", borderRadius: "var(--radius-md)", padding: "16px 20px", background: "var(--sand-50)" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--slate-dark)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {plan.name} plan includes:
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 8, fontSize: "0.83rem", color: "var(--slate-mid)" }}>
                      <span style={{ color: "#16a34a", fontWeight: 700, flexShrink: 0 }}>✓</span><span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secure payment note */}
              <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>🔒</span>
                <div>
                  <strong style={{ color: "var(--ocean-700)", fontSize: "0.9rem" }}>Secure checkout powered by Stripe</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", lineHeight: 1.65, margin: "4px 0 0" }}>
                    You&apos;ll be taken to Stripe&apos;s secure payment page. Your card details never touch our servers.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button type="button" className="btn-secondary" onClick={() => setStep(2)} id="register-step3-back" disabled={loading}>← Back</button>
                <button
                  type="submit"
                  className="btn-gold"
                  id="register-submit"
                  disabled={loading}
                  style={{ opacity: loading ? 0.75 : 1 }}
                >
                  {loading ? "⏳ Redirecting to secure payment..." : `🔧 Register — $${plan.price}/month`}
                </button>
              </div>
              {stripeError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", color: "#dc2626", fontSize: "0.875rem" }}>
                  ⚠️ {stripeError}
                </div>
              )}
              <p style={{ fontSize: "0.75rem", color: "var(--slate-light)" }}>
                By completing registration you agree to our <a href="/terms" style={{ color: "var(--ocean-500)" }}>Terms of Service</a> and <a href="/privacy" style={{ color: "var(--ocean-500)" }}>Privacy Policy</a>. You will be charged ${plan.price}+GST/month. Cancel anytime before your next billing date.
              </p>
            </div>
          )}
        </form>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))", borderRadius: "var(--radius-lg)", padding: 28, color: "white" }}>
            <h4 style={{ color: "white", marginBottom: 16, fontSize: "1rem" }}>✅ What Happens Next</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "We verify your QLD licence (24 hrs)",
                "Your profile goes live immediately after",
                "First lead notification within 48 hrs",
                "Dedicated onboarding call within 1 week",
              ].map((item, i) => (
                <li key={item} style={{ display: "flex", gap: 10, fontSize: "0.875rem" }}>
                  <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: "rgba(255,255,255,0.9)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: 24, background: "var(--sand-50)", border: "1px solid var(--sand-200)" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>✉️</div>
            <h4 style={{ fontSize: "0.95rem", marginBottom: 8 }}>Questions?</h4>
            <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", lineHeight: 1.6, marginBottom: 12 }}>
              Email us anytime — we&apos;ll help you get set up within one business day.
            </p>
            <a href="mailto:info@coasthomehub.com.au" style={{ fontWeight: 700, color: "var(--ocean-500)", textDecoration: "none", fontSize: "0.95rem" }}>
              info@coasthomehub.com.au
            </a>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontSize: "0.9rem", marginBottom: 12 }}>🛡️ Our Guarantee</h4>
            <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", lineHeight: 1.65 }}>
              If you don&apos;t receive at least 3 qualified leads in your first 30 days, we&apos;ll give you the next month free. No questions asked.
            </p>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.register-grid{grid-template-columns:1fr!important;}}`}</style>
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

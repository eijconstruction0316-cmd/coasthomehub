import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Trade Business | CoastHomeHub for Tradies",
  description:
    "Join Queensland's fastest-growing home improvement platform. Get quality leads from Gold Coast to Sunshine Coast. Licensed tradies only.",
};

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 99,
    period: "month",
    tagline: "Perfect to get started",
    color: "var(--ocean-400)",
    features: [
      "Up to 5 leads per month",
      "Basic business profile",
      "Listed in local directory",
      "Email lead notifications",
      "Customer review system",
    ],
    notIncluded: ["Priority listing", "Unlimited leads", "Analytics dashboard", "Featured badge"],
    cta: "Start Starter",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 179,
    period: "month",
    tagline: "Most popular for growing businesses",
    color: "var(--ocean-600)",
    features: [
      "Up to 20 leads per month",
      "Enhanced business profile + photos",
      "Priority listing above Starter",
      "SMS + email notifications",
      "Customer review system",
      "Analytics dashboard",
      "Featured badge on profile",
    ],
    notIncluded: ["Unlimited leads"],
    cta: "Start Pro",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 299,
    period: "month",
    tagline: "Maximum exposure & unlimited leads",
    color: "var(--gold)",
    features: [
      "Unlimited leads",
      "Premium business profile + portfolio",
      "#1 priority listing in your area",
      "SMS + email + phone notifications",
      "Customer review system",
      "Full analytics dashboard",
      "Featured badge + homepage spotlight",
      "Dedicated account manager",
    ],
    notIncluded: [],
    cta: "Start Premium",
    popular: false,
  },
];

const benefits = [
  { icon: "🎯", title: "Quality Local Leads", desc: "Homeowners in your area who are actively looking — not time-wasters browsing." },
  { icon: "✅", title: "Verified Homeowners", desc: "Every quote request includes contact details and job photos. No spam." },
  { icon: "📊", title: "Track Your ROI", desc: "See exactly how many views, leads, and bookings your profile generates." },
  { icon: "⭐", title: "Build Your Reputation", desc: "Collect verified 5-star reviews that appear on Google and your profile." },
  { icon: "📱", title: "Instant Notifications", desc: "Be the first tradie to respond. Speed wins jobs." },
  { icon: "🏷️", title: "No Commission", desc: "Flat monthly fee. We never take a percentage of your job value." },
];

const faqs = [
  {
    q: "How do I receive leads?",
    a: "When a homeowner submits a quote request in your service area and job category, you receive an instant SMS and email with their name, job description, location, and photos. You contact them directly.",
  },
  {
    q: "Do I need to be licensed?",
    a: "Yes. All tradies on CoastHomeHub must hold a valid Queensland licence for the services they offer. We verify your licence number during registration.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All plans are month-to-month with no lock-in contracts. Cancel before your next billing date and you won't be charged again.",
  },
  {
    q: "What areas do you cover?",
    a: "We currently cover Gold Coast, Tweed Heads, Logan, Brisbane South and North, Sunshine Coast, and Noosa. We're expanding rapidly.",
  },
  {
    q: "How many other tradies will I compete with per lead?",
    a: "Homeowners receive a maximum of 3 quotes. Pro and Premium members get first right of refusal before Starter members are notified.",
  },
];

export default function TradiesPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--slate-dark) 0%, var(--slate-mid) 100%)",
          paddingTop: 120,
          paddingBottom: 80,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(61,153,144,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-lg" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
            <div>
              <div className="badge" style={{ marginBottom: 24, display: "inline-flex", background: "rgba(255,255,255,0.1)", color: "var(--ocean-300)", border: "1px solid rgba(255,255,255,0.15)" }}>
                🔧 For Licensed Tradies
              </div>
              <h1 style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3.4rem)", marginBottom: 20, lineHeight: 1.1 }}>
                Grow Your Trade Business
                <br />
                <span style={{ color: "var(--ocean-300)" }}>Across QLD&apos;s Coast.</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
                Get quality leads from homeowners actively seeking your services — from Gold Coast to Sunshine Coast. Flat monthly fee. No commissions. Cancel anytime.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/tradies/register" className="btn-gold" id="tradie-hero-cta">
                  List My Business →
                </Link>
                <a href="#pricing" className="btn-secondary" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.3)" }}>
                  View Pricing
                </a>
              </div>
            </div>

            {/* Stats card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="glass-card" style={{ padding: 28, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>📈</div>
                <h3 style={{ color: "white", fontSize: "1.2rem", marginBottom: 6 }}>
                  Average Tradie ROI
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Pro members report an average of <strong style={{ color: "var(--ocean-300)" }}>$4,200 AUD extra revenue</strong> in their first 3 months.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { v: "500+", l: "Active Homeowners" },
                  { v: "Gold–Sunshine", l: "Coverage Area" },
                  { v: "3 max", l: "Quotes per Lead" },
                  { v: "No %", l: "Commission Ever" },
                ].map((s) => (
                  <div key={s.l} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-md)", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontWeight: 900, fontSize: "1.2rem", color: "var(--ocean-300)", lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`.hero-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Why Join Us</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Everything You Need to Win More Jobs</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {benefits.map((b) => (
              <div key={b.title} className="card" style={{ padding: 28, background: "var(--sand-50)", border: "1px solid var(--sand-200)" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{b.icon}</div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--slate-light)", lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>From Registration to First Lead</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="steps-grid">
            {[
              { step: "01", icon: "📝", title: "Register & Verify", desc: "Create your profile and submit your QLD licence number. We verify within 24 hours." },
              { step: "02", icon: "💳", title: "Choose a Plan", desc: "Pick Starter, Pro, or Premium. No lock-in contracts — cancel anytime." },
              { step: "03", icon: "📬", title: "Receive Leads", desc: "Get instant SMS + email when a homeowner in your area requests your service." },
              { step: "04", icon: "🤝", title: "Win the Job", desc: "Contact the homeowner directly, quote your price, win the work. Keep 100%." },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: "center", padding: "28px 20px" }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
                  <div style={{ width: 60, height: 60, background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto" }}>{s.icon}</div>
                  <div style={{ position: "absolute", top: -6, right: -6, background: "var(--gold)", color: "white", fontSize: "0.62rem", fontWeight: 800, width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.step}</div>
                </div>
                <h3 style={{ fontSize: "1rem", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--slate-light)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.steps-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Pricing</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 12 }}>Simple, Transparent Pricing</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1rem" }}>No commissions, no lock-in, no surprise fees. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="pricing-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                id={`plan-${plan.id}`}
                style={{
                  border: plan.popular ? `2px solid ${plan.color}` : "1px solid var(--sand-200)",
                  borderRadius: "var(--radius-xl)",
                  padding: "32px 28px",
                  background: plan.popular ? "linear-gradient(160deg, var(--ocean-50), white)" : "white",
                  position: "relative",
                  boxShadow: plan.popular ? "var(--shadow-lg)" : "var(--shadow-sm)",
                  transition: "var(--transition)",
                }}
              >
                {plan.popular && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: plan.color, color: "white", fontSize: "0.75rem", fontWeight: 800, padding: "5px 16px", borderRadius: "50px", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
                    ⭐ MOST POPULAR
                  </div>
                )}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: "1.3rem", color: plan.color, marginBottom: 4 }}>{plan.name}</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--slate-light)" }}>{plan.tagline}</p>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--slate-dark)", lineHeight: 1 }}>${plan.price}</span>
                  <span style={{ color: "var(--slate-light)", fontSize: "0.9rem" }}> / month</span>
                  <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginTop: 4 }}>+GST · Billed monthly · Cancel anytime</p>
                </div>
                <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: "0.875rem", color: "var(--slate-mid)" }}>
                      <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: "0.875rem", color: "var(--sand-400)" }}>
                      <span>—</span>
                      <span style={{ textDecoration: "line-through" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/tradies/register?plan=${plan.id}`}
                  className={plan.popular ? "btn-primary" : "btn-secondary"}
                  style={{ display: "block", textAlign: "center", width: "100%", boxSizing: "border-box" }}
                  id={`pricing-${plan.id}-cta`}
                >
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.pricing-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container-md">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>Common Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq) => (
              <div key={faq.q} className="card" style={{ padding: "24px 28px" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: 10, color: "var(--ocean-600)" }}>❓ {faq.q}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--slate-mid)", lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-400))", padding: "80px 0", textAlign: "center" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12 }}>Ready to Get More QLD Jobs?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 36, maxWidth: 460, margin: "0 auto 36px" }}>
            Join licensed tradies already growing their business on CoastHomeHub. First month 50% off.
          </p>
          <Link href="/tradies/register" className="btn-gold" id="tradie-bottom-cta">
            🔧 Register Your Business
          </Link>
        </div>
      </section>
    </>
  );
}

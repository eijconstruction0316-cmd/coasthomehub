import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Trade Business | CoastHomeHub for Tradies",
  description:
    "Join CoastHomeHub and receive warm, pre-qualified renovation leads from Gold Coast to Sunshine Coast. QBCC-licensed tradies only. Flat monthly fee, no commissions.",
};

const benefits = [
  { icon: "🎯", title: "Pre-Qualified Leads", desc: "Homeowners arrive via CoastAI having already described their project and seen a ballpark cost — they know what they want." },
  { icon: "✅", title: "Verified Contact Details", desc: "Every quote request includes the homeowner's name, location, job description, and photos. No spam, no tyre-kickers." },
  { icon: "🔒", title: "Max 3 Quotes per Job", desc: "Homeowners receive a maximum of 3 tradie quotes. You're never competing against a crowd." },
  { icon: "📱", title: "Instant Notifications", desc: "Get an SMS and email the moment a matching lead lands in your area. First to respond often wins the job." },
  { icon: "🏷️", title: "No Commission Ever", desc: "Flat monthly access fee. We never take a percentage of your job value — every dollar you earn is yours." },
  { icon: "🏛️", title: "QBCC Licence Verified", desc: "Every tradie on CoastHomeHub is checked against the QBCC register. Your licence is your badge of trust." },
];

const faqs = [
  {
    q: "How do I receive leads?",
    a: "When a homeowner submits a quote request in your service area and job category, you receive an instant SMS and email with their name, job description, location, and any photos they've uploaded. You contact them directly from there.",
  },
  {
    q: "Do I need to be licensed?",
    a: "Yes. All tradies on CoastHomeHub must hold a valid Queensland licence for the services they offer. We verify your QBCC licence number during registration — unlicensed tradespeople are not accepted.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All plans are month-to-month with no lock-in contracts. Cancel before your next billing date and you won't be charged again.",
  },
  {
    q: "What areas do you cover?",
    a: "We currently cover Gold Coast, Tweed Heads, Logan, Brisbane (South, North, East, CBD), Sunshine Coast, and Noosa. Coverage is expanding as we grow.",
  },
  {
    q: "How many other tradies compete per lead?",
    a: "Homeowners receive a maximum of 3 quotes total. When a lead matches your profile you receive it directly — you won't be up against a dozen competitors.",
  },
  {
    q: "What makes CoastHomeHub leads different?",
    a: "Homeowners land on CoastHomeHub after chatting with CoastAI, our AI renovation designer. By the time they fill in a quote request they've already described their space, discussed a design, and seen a realistic QLD cost range — so they're genuinely ready to proceed.",
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
                Warm Leads From
                <br />
                <span style={{ color: "var(--ocean-300)" }}>Ready-to-Quote Homeowners.</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
                CoastHomeHub homeowners have already described their project, seen a design concept, and got a ballpark cost. By the time they reach you, they&apos;re ready for a real quote — not just browsing.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/tradies/register" className="btn-gold" id="tradie-hero-cta">
                  Register My Business →
                </Link>
                <a href="#how-it-works" className="btn-secondary" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.3)" }}>
                  How It Works
                </a>
              </div>
            </div>

            {/* Trust cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: "✅", v: "QBCC", l: "Licence verified" },
                { icon: "🏠", v: "3 max", l: "Quotes per lead" },
                { icon: "🏷️", v: "No %", l: "Commission ever" },
                { icon: "📍", v: "SEQ", l: "Gold Coast · Sunshine" },
              ].map((s) => (
                <div key={s.l} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-md)", padding: "20px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "var(--ocean-300)", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.hero-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Why Join</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Built Around Quality, Not Volume</h2>
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
      <section className="section" id="how-it-works" style={{ background: "var(--off-white)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>From Registration to First Lead</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="steps-grid">
            {[
              { step: "01", icon: "📝", title: "Register & Apply", desc: "Create your business profile and tell us about the services you offer and your service area." },
              { step: "02", icon: "✅", title: "Verify Your Licence", desc: "Submit your QBCC licence number. We verify it against the QBCC register before your profile goes live." },
              { step: "03", icon: "📬", title: "Receive Leads", desc: "Get an instant SMS + email when a homeowner in your area requests your service. Details and photos included." },
              { step: "04", icon: "🤝", title: "Win the Job", desc: "Contact the homeowner directly, quote your price, win the work. Keep 100% — no commissions." },
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

      {/* Access */}
      <section className="section" id="access" style={{ background: "white" }}>
        <div className="container-md">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Founding Member Access</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 12 }}>Simple, Flat-Fee Access</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1rem", maxWidth: 520, margin: "0 auto" }}>
              One flat monthly fee. No lead caps, no pay-per-click, no commission. You compete on your skills and speed — not your budget.
            </p>
          </div>

          <div
            style={{
              maxWidth: 480,
              margin: "0 auto",
              border: "2px solid var(--ocean-400)",
              borderRadius: "var(--radius-xl)",
              padding: "40px 36px",
              background: "linear-gradient(160deg, var(--ocean-50), white)",
              boxShadow: "var(--shadow-lg)",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", background: "var(--ocean-500)", color: "white", fontSize: "0.75rem", fontWeight: 800, padding: "6px 18px", borderRadius: "50px", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
              ⭐ FOUNDING MEMBER RATE
            </div>
            <h3 style={{ fontSize: "1.4rem", color: "var(--ocean-600)", marginBottom: 6 }}>Full Access</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--slate-light)", marginBottom: 24 }}>All leads in your area · No caps · No commissions</p>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: "3rem", fontWeight: 900, color: "var(--slate-dark)", lineHeight: 1 }}>$149</span>
              <span style={{ color: "var(--slate-light)", fontSize: "0.95rem" }}> / month</span>
              <p style={{ fontSize: "0.8rem", color: "var(--slate-light)", marginTop: 6 }}>+GST · Billed monthly · Cancel anytime</p>
            </div>
            <ul style={{ listStyle: "none", marginBottom: 32, display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
              {[
                "All matching leads in your service area",
                "QBCC licence verified — your badge of trust",
                "Business profile with photos + services listed",
                "Instant SMS + email lead notifications",
                "Max 3 tradies per lead — never a crowd",
                "No commission on any job won",
                "Month-to-month — cancel before next billing",
              ].map((f) => (
                <li key={f} style={{ display: "flex", gap: 10, fontSize: "0.9rem", color: "var(--slate-mid)" }}>
                  <span style={{ color: "#16a34a", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/tradies/register"
              className="btn-primary"
              style={{ display: "block", textAlign: "center", width: "100%", boxSizing: "border-box" }}
              id="access-cta"
            >
              Register My Business →
            </Link>
            <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginTop: 16 }}>
              Founding member rate locks in for 12 months from your registration date.
            </p>
          </div>
        </div>
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
          <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12 }}>Ready to Receive Warm QLD Leads?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 36, maxWidth: 460, margin: "0 auto 36px" }}>
            Register your QBCC-licensed business today. Flat monthly fee, no lock-in, no commissions.
          </p>
          <Link href="/tradies/register" className="btn-gold" id="tradie-bottom-cta">
            🔧 Register Your Business
          </Link>
        </div>
      </section>
    </>
  );
}

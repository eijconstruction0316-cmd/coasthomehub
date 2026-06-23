import Link from "next/link";
import type { Metadata } from "next";
import PartnershipBanner from "@/components/PartnershipBanner";
import TradieDashboardDemo from "@/components/TradieDashboardDemo";

export const metadata: Metadata = {
  title: "List Your Trade Business | CoastHomeHub for Tradies",
  description:
    "Join CoastHomeHub and receive warm, pre-qualified renovation leads from Gold Coast to Sunshine Coast. QBCC-licensed tradies only. Flat monthly fee, no commissions.",
};

const benefits = [
  { title: "Pre-Qualified Leads", desc: "Homeowners arrive via CoastAI having already described their project and seen a ballpark cost — they know what they want." },
  { title: "B2B Buyers Club", desc: "Save thousands on construction materials. Get up to 10% direct trade discount at Reece, Beaumont Tiles, Laminex, Osmo & more." },
  { title: "First-Look Access", desc: "Elite members get 12-hour exclusive priority access to new local leads before they are released to others." },
  { title: "No Commission Ever", desc: "Flat monthly subscription fee. We never take a percentage of your contract value — you keep 100% of your earnings." },
  { title: "Archipro-style Curation", desc: "Showcase your portfolio with product tags linking back to suppliers. Attract high-end homeowners with editorial design." },
  { title: "QBCC Verified Trust", desc: "We verify license numbers to filter out cowboys, protecting reputable builders and maintaining high industry standards." },
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
          background: "var(--slate-dark)",
          paddingTop: 120,
          paddingBottom: 80,
          color: "white",
          position: "relative",
          overflow: "hidden",
          borderBottom: "3px double var(--sand-300)"
        }}
      >
        <div className="container-lg" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
            <div>
              <div className="badge" style={{ marginBottom: 24, display: "inline-flex", background: "rgba(255,255,255,0.06)", color: "var(--ocean-300)", border: "1px solid var(--sand-300)", borderRadius: 2 }}>
                ✦ For Licensed Tradies
              </div>
              <h1 style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3.4rem)", marginBottom: 20, lineHeight: 1.1, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                Warm Leads From
                <br />
                <span style={{ color: "var(--gold-light)", fontStyle: "italic" }}>Ready-to-Quote Homeowners.</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, fontFamily: "Outfit, sans-serif" }}>
                CoastHomeHub homeowners have already described their project, seen a design concept, and got a ballpark cost. By the time they reach you, they&apos;re ready for a real quote — not just browsing.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/tradies/register" className="btn-gold" id="tradie-hero-cta" style={{ borderRadius: 4 }}>
                  Register My Business →
                </Link>
                <a href="#how-it-works" className="btn-secondary" style={{ color: "rgba(255,255,255,0.8)", borderColor: "var(--sand-300)", borderRadius: 4 }}>
                  How It Works
                </a>
              </div>
            </div>

            {/* Trust cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { v: "QBCC", l: "Licence verified" },
                { v: "3 max", l: "Quotes per lead" },
                { v: "No %", l: "Commission ever" },
                { v: "SEQ", l: "Gold Coast · Sunshine" },
              ].map((s) => (
                <div key={s.l} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--gold)", fontWeight: "bold", marginBottom: 6 }}>✦</div>
                  <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "var(--ocean-300)", lineHeight: 1, fontFamily: "Outfit, sans-serif" }}>{s.v}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginTop: 4, fontFamily: "Outfit, sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.hero-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: "white", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", borderRadius: 2 }}>Why Join</div>
            <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 500 }}>Built Around Quality, Not Volume</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {benefits.map((b) => (
              <div key={b.title} className="card" style={{ padding: 28, background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4 }}>
                <div style={{ fontSize: "0.85rem", color: "var(--gold)", fontWeight: "bold", marginBottom: 12 }}>✦</div>
                <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--slate-dark)", marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: "0.84rem", color: "var(--slate-light)", lineHeight: 1.65, fontFamily: "Outfit, sans-serif" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how-it-works" style={{ background: "var(--off-white)", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", borderRadius: 2 }}>How It Works</div>
            <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 500 }}>From Registration to First Lead</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="steps-grid">
            {[
              { step: "01", title: "Register & Apply", desc: "Create your business profile and tell us about the services you offer and your service area." },
              { step: "02", title: "Verify Your Licence", desc: "Submit your QBCC licence number. We verify it against the QBCC register before your profile goes live." },
              { step: "03", title: "Receive Leads", desc: "Get an instant SMS + email when a homeowner in your area requests your service. Details and photos included." },
              { step: "04", title: "Win the Job", desc: "Contact the homeowner directly, quote your price, win the work. Keep 100% — no commissions." },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: "center", padding: "28px 16px" }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
                  <div style={{ width: 60, height: 60, background: "white", border: "1px solid var(--sand-300)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                    <span style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", fontWeight: 500, color: "var(--gold)" }}>{s.step}</span>
                  </div>
                </div>
                <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.05rem", fontWeight: 600, marginBottom: 8, color: "var(--slate-dark)" }}>{s.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.steps-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
      </section>

      {/* Interactive Portal Demo */}
      <section className="section" style={{ background: "white", paddingBottom: 64, borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", borderRadius: 2 }}>Interactive Experience</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>Try the Lead Dashboard Demo</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1rem", maxWidth: 580, margin: "0 auto", fontFamily: "Outfit, sans-serif" }}>
              Experience exactly how you will view QLD leads, unlock details using credits, and send direct proposals. Click around below!
            </p>
          </div>
          <TradieDashboardDemo />
        </div>
      </section>

      {/* Access */}
      <section className="section" id="access" style={{ background: "white", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", borderRadius: 2 }}>Choose Your Plan</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>Flat-Fee. No Commissions. No Lock-In.</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1rem", maxWidth: 560, margin: "0 auto", fontFamily: "Outfit, sans-serif" }}>
              Pick the plan that fits your growth stage. Upgrade or downgrade anytime — your leads keep coming.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, maxWidth: 1040, margin: "0 auto" }} className="plans-grid">

            {/* Founding */}
            <div style={{ border: "1px solid var(--sand-300)", borderRadius: 4, padding: "40px 32px", background: "white", boxShadow: "0 2px 10px rgba(26,35,50,0.02)", display: "flex", flexDirection: "column", position: "relative", transition: "var(--transition-fast)" }} className="pricing-card-hover">
              <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--slate-dark)", marginBottom: 6 }}>Founding</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", marginBottom: 24, letterSpacing: "0.01em", fontFamily: "Outfit, sans-serif" }}>Get started with qualified leads</p>
              
              <div style={{ borderBottom: "3px double var(--sand-300)", paddingBottom: 20, marginBottom: 28 }}>
                <span style={{ fontFamily: "Lora, Georgia, serif", fontSize: "3.2rem", fontWeight: 500, color: "var(--slate-dark)", lineHeight: 1 }}>$149</span>
                <span style={{ color: "var(--slate-light)", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif" }}> /month <span style={{ fontSize: "0.72rem", verticalAlign: "middle" }}>+GST</span></span>
              </div>

              <ul style={{ listStyle: "none", marginBottom: 36, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                {[
                  "3 free lead credits per month ($90 value)",
                  "Purchase extra credits at base rates",
                  "QBCC verified badge",
                  "Business profile + photos",
                  "B2B Buyers Club: supplier info access",
                  "SMS & email notifications",
                  "No commission ever",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", gap: 12, fontSize: "0.85rem", color: "var(--slate-mid)", alignItems: "flex-start", lineHeight: 1.45, fontFamily: "Outfit, sans-serif" }}>
                    <span style={{ color: "var(--ocean-600)", fontWeight: 700, flexShrink: 0, fontSize: "0.9rem" }}>✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/tradies/register?plan=founding" className="btn-secondary" style={{ display: "block", textAlign: "center", width: "100%", borderRadius: 4, borderWidth: "1px", borderColor: "var(--ocean-500)", padding: "12px 24px" }} id="plan-founding-cta">
                Get Started →
              </Link>
            </div>

            {/* Growth — Most Popular */}
            <div style={{ border: "1px solid var(--gold)", borderRadius: 4, padding: "44px 32px 40px", background: "var(--sand-50)", boxShadow: "0 4px 18px rgba(31, 122, 114, 0.05)", display: "flex", flexDirection: "column", position: "relative", transition: "var(--transition-fast)" }} className="pricing-card-hover active-plan-card">
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "white", fontSize: "0.65rem", fontWeight: 800, padding: "4px 16px", borderRadius: 2, whiteSpace: "nowrap", letterSpacing: "0.08em", fontFamily: "Outfit, sans-serif" }}>
                ✦ MOST POPULAR
              </div>
              <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--ocean-700)", marginBottom: 6 }}>Growth</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", marginBottom: 24, letterSpacing: "0.01em", fontFamily: "Outfit, sans-serif" }}>Stand out and build your brand</p>
              
              <div style={{ borderBottom: "3px double var(--gold)", paddingBottom: 20, marginBottom: 28 }}>
                <span style={{ fontFamily: "Lora, Georgia, serif", fontSize: "3.2rem", fontWeight: 500, color: "var(--ocean-700)", lineHeight: 1 }}>$249</span>
                <span style={{ color: "var(--slate-light)", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif" }}> /month <span style={{ fontSize: "0.72rem", verticalAlign: "middle" }}>+GST</span></span>
              </div>

              <ul style={{ listStyle: "none", marginBottom: 36, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                {[
                  "10 free lead credits per month ($300 value)",
                  "Purchase extra credits with 10% discount",
                  "B2B Buyers Club: 5% trade discount",
                  "Spotlight badge — profile boosted",
                  "Auto Project Story pages (SEO)",
                  "Monthly lead performance report",
                  "No commission ever",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", gap: 12, fontSize: "0.85rem", color: "var(--slate-mid)", alignItems: "flex-start", lineHeight: 1.45, fontFamily: "Outfit, sans-serif" }}>
                    <span style={{ color: "var(--ocean-600)", fontWeight: 700, flexShrink: 0, fontSize: "0.9rem" }}>✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/tradies/register?plan=growth" className="btn-primary" style={{ display: "block", textAlign: "center", width: "100%", borderRadius: 4, background: "var(--ocean-600)", boxShadow: "none" }} id="plan-growth-cta">
                Choose Growth →
              </Link>
            </div>

            {/* Elite */}
            <div style={{ border: "1px solid var(--gold)", borderRadius: 4, padding: "44px 32px 40px", background: "white", boxShadow: "0 2px 10px rgba(26,35,50,0.02)", display: "flex", flexDirection: "column", position: "relative", transition: "var(--transition-fast)" }} className="pricing-card-hover">
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "white", fontSize: "0.65rem", fontWeight: 800, padding: "4px 16px", borderRadius: 2, whiteSpace: "nowrap", letterSpacing: "0.08em", fontFamily: "Outfit, sans-serif" }}>
                ✦ ELITE PARTNER
              </div>
              <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--sand-500)", marginBottom: 6 }}>Elite</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", marginBottom: 24, letterSpacing: "0.01em", fontFamily: "Outfit, sans-serif" }}>Maximum visibility & brand authority</p>
              
              <div style={{ borderBottom: "3px double var(--sand-300)", paddingBottom: 20, marginBottom: 28 }}>
                <span style={{ fontFamily: "Lora, Georgia, serif", fontSize: "3.2rem", fontWeight: 500, color: "var(--sand-500)", lineHeight: 1 }}>$399</span>
                <span style={{ color: "var(--slate-light)", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif" }}> /month <span style={{ fontSize: "0.72rem", verticalAlign: "middle" }}>+GST</span></span>
              </div>

              <ul style={{ listStyle: "none", marginBottom: 36, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                {[
                  "25 free lead credits per month ($750 value)",
                  "Purchase extra credits with 20% discount",
                  "B2B Buyers Club: 10% discount + free delivery",
                  "12-hour First-Look Priority Access",
                  "Unlimited portfolio uploads & supplier tags",
                  "Homepage spotlight & magazine feature",
                  "No commission ever",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", gap: 12, fontSize: "0.85rem", color: "var(--slate-mid)", alignItems: "flex-start", lineHeight: 1.45, fontFamily: "Outfit, sans-serif" }}>
                    <span style={{ color: "var(--gold)", fontWeight: 700, flexShrink: 0, fontSize: "0.9rem" }}>✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/tradies/register?plan=elite" style={{ display: "block", textAlign: "center", padding: "14px 24px", borderRadius: 4, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", background: "var(--gold)", color: "white", boxShadow: "none", transition: "var(--transition-fast)" }} id="plan-elite-cta" className="btn-gold-elite">
                Choose Elite →
              </Link>
            </div>

          </div>
          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--slate-light)", marginTop: 24, fontFamily: "Outfit, sans-serif" }}>
            All plans: month-to-month · Cancel anytime · Prices +GST · Founding rate locks in for 12 months
          </p>

          {/* Legal Compliance Disclaimer */}
          <div style={{ maxWidth: 880, margin: "64px auto 0", padding: "28px", background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, fontSize: "0.82rem", color: "var(--slate-mid)", lineHeight: 1.8, fontFamily: "Lora, Georgia, serif", fontStyle: "italic" }}>
            <strong style={{ fontFamily: "Outfit, sans-serif", fontStyle: "normal", color: "var(--slate-dark)" }}>✦ Legal & QBCC Compliance Notice:</strong> CoastHomeHub is an independent online directory and marketing platform owned and operated by EIJ Construction Pty Ltd. CoastHomeHub is NOT a builder or building contractor and does not provide direct construction, plumbing, waterproofing, or other trade services. We act solely as an advertising and referral agency matching QLD homeowners with QBCC-licensed contractors. All contracts, warranties, and building works are strictly between the homeowner and the respective contractor. Users are responsible for verifying the current licence status and insurance of any tradie engaged via this platform.
          </div>
        </div>
        <style>{`
          @media(max-width:900px){.plans-grid{grid-template-columns:1fr!important; gap: 40px !important;}}
          .pricing-card-hover:hover {
            transform: translateY(-8px) !important;
            box-shadow: var(--shadow-xl) !important;
          }
          .active-plan-card {
            transform: scale(1.02);
            border-color: var(--gold) !important;
          }
          .active-plan-card:hover {
            transform: scale(1.02) translateY(-8px) !important;
          }
          .btn-gold-elite:hover {
            opacity: 0.95;
            transform: translateY(-2px);
          }
        `}</style>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--off-white)", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-md">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", borderRadius: 2 }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>Common Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq) => (
              <div key={faq.q} className="card" style={{ padding: "24px 28px", border: "1px solid var(--sand-300)", borderRadius: 4 }}>
                <h3 style={{ fontSize: "1rem", marginBottom: 10, color: "var(--ocean-600)", fontFamily: "Lora, Georgia, serif" }}>✦ {faq.q}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--slate-mid)", lineHeight: 1.7, fontFamily: "Outfit, sans-serif" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Partners Marquee */}
      <PartnershipBanner />

      {/* CTA */}
      <section style={{ background: "var(--ocean-700)", padding: "80px 0", textAlign: "center", borderTop: "1px solid var(--sand-300)" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>Ready to Receive Warm QLD Leads?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 36, maxWidth: 460, margin: "0 auto 36px", fontFamily: "Outfit, sans-serif" }}>
            Register your QBCC-licensed business today. Flat monthly fee, no lock-in, no commissions.
          </p>
          <Link href="/tradies/register" className="btn-gold" id="tradie-bottom-cta" style={{ borderRadius: 4 }}>
            List My Business Now
          </Link>
        </div>
      </section>
    </>
  );
}

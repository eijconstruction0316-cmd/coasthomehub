import Link from "next/link";
import Image from "next/image";
import HeroInteractiveCard from "@/components/HeroInteractiveCard";
import { getPublishedMagazineArticles } from "@/lib/magazineCms";
import LiveSuburbTracker from "@/components/LiveSuburbTracker";
import RenovationCostCalculator from "@/components/RenovationCostCalculator";
import DesignLookbook from "@/components/DesignLookbook";

const trustRow = [
  { value: "Max 3", label: "quotes — never sold to 10" },
  { value: "QBCC", label: "licensed tradies only" },
  { value: "$300k", label: "Home Warranty protected" },
  { value: "0", label: "junk leads · spam calls" },
];

const steps = [
  {
    step: "01",
    icon: "📸",
    title: "Show us your space",
    desc: "Snap a photo of your room and tell our AI what you're dreaming of. Takes a minute.",
    tag: "Free",
  },
  {
    step: "02",
    icon: "✨",
    title: "AI designs & prices it",
    desc: "Get a design concept and a realistic QLD ballpark cost in minutes — before you talk to anyone.",
    tag: "Free",
  },
  {
    step: "03",
    icon: "📐",
    title: "Lock in your design pack",
    desc: "A clear plan, materials list and scope you can build from — and that tradies can quote accurately.",
    tag: "When ready",
  },
  {
    step: "04",
    icon: "🤝",
    title: "Get up to 3 licensed quotes",
    desc: "We send your scoped brief to up to 3 verified QLD tradies. They quote, you choose. No pressure.",
    tag: "We match",
  },
];

const oldWay = [
  "Your details sold to 5–10 tradies at once",
  "Endless spam calls the moment you submit",
  "Anyone can sign up — licensed or not",
  "Negative reviews quietly hidden",
  "Free to post, so lead quality is nobody's problem",
];

const newWay = [
  "AI scopes your job before a tradie sees it",
  "Sent to a maximum of 3 — never resold",
  "Every tradie's QBCC licence checked & active",
  "Honest, verified two-sided reviews",
  "Real design + costs before you commit a cent",
];

const trustStack = [
  { icon: "✅", accent: "#1f7a72", title: "QBCC Licence Verified", desc: "Every tradie is checked against Queensland's QBCC register — correct class, active status, no bans." },
  { icon: "🏠", accent: "#c9972a", title: "Home Warranty Protected", desc: "We only match licensed contractors, so your statutory cover (up to $300k) stays intact." },
  { icon: "🛡️", accent: "#1f7a72", title: "Fully Insured Tradies", desc: "Public liability and workers' comp confirmed — not your problem if something goes wrong." },
  { icon: "⭐", accent: "#c9972a", title: "Honest Reviews", desc: "Verified jobs only, and we publish the bad with the good. No hidden ratings." },
  { icon: "🔒", accent: "#1f7a72", title: "Secure Payments", desc: "Pay safely through Stripe. Funds for larger jobs can be held until milestones are met." },
  { icon: "👷", accent: "#c9972a", title: "Built by a Licensed Builder", desc: "Founded and vetted by EIJ Construction — a QBCC-licensed QLD builder, not a faceless tech platform." },
];


const testimonials = [
  {
    name: "Sarah M.",
    location: "Burleigh Heads",
    text: "I uploaded a photo of our tired bathroom and had a design and a ballpark price the same evening. The tradie they matched us with was licensed and brilliant.",
    rating: 5,
  },
  {
    name: "Tom R.",
    location: "Noosa",
    text: "No spam calls, no 10 random numbers ringing. Three real quotes from licensed locals. That's exactly what I wanted.",
    rating: 5,
  },
  {
    name: "Lisa K.",
    location: "Robina",
    text: "The AI walked me through what the job actually involved, so I knew I wasn't being ripped off before a single tradie quoted.",
    rating: 5,
  },
];

export default function Home() {
  const latestArticles = getPublishedMagazineArticles().slice(0, 3);
  return (
    <>
      {/* ───────────────── HERO ───────────────── */}
      <section
        style={{
          minHeight: "100vh",
          background: "linear-gradient(150deg, #0a1f1e 0%, #0e4440 40%, #155e58 100%)",
          display: "flex",
          alignItems: "center",
          paddingTop: "120px",
          paddingBottom: "100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 560, height: 560, background: "radial-gradient(circle, rgba(61,153,144,0.22) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-5%", left: "-5%", width: 480, height: 480, background: "radial-gradient(circle, rgba(201,151,42,0.15) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "38%", width: 300, height: 300, background: "radial-gradient(circle, rgba(61,153,144,0.1) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container-lg" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "72px", alignItems: "center" }} className="hero-grid">

            {/* Left: Text */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "7px 16px", marginBottom: 28 }}>
                <span style={{ color: "var(--gold-light)", fontSize: "0.85rem" }}>✦</span>
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>AI-powered · Licensed QLD tradies only</span>
              </div>

              <h1 style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24, color: "white" }}>
                See your renovation
                <br />
                <span style={{ background: "linear-gradient(135deg, #e8b84b, #f5d282)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  before you spend a dollar.
                </span>
              </h1>

              <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 40, maxWidth: 500 }}>
                Upload a photo of your space. Our AI designs it, gives you a real QLD price, then matches you with{" "}
                <strong style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>up to 3 verified licensed tradies</strong> — never sold to ten.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/quote" className="btn-gold" id="hero-start-ai" style={{ fontSize: "1.05rem", padding: "15px 36px" }}>
                  📸 Design my space with AI →
                </Link>
                <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.85)", padding: "14px 30px", borderRadius: "50px", fontWeight: 600, fontSize: "1rem", textDecoration: "none", border: "2px solid rgba(255,255,255,0.25)", transition: "var(--transition)" }} id="hero-browse" className="btn-outline-white">
                  Browse real projects
                </Link>
              </div>

              {/* Trust strip */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.12)" }} className="hero-trust">
                {trustRow.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontWeight: 900, fontSize: "1.4rem", color: "var(--gold-light)", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", marginTop: 5, maxWidth: 130 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Interactive Showcase Card */}
            <div>
              <HeroInteractiveCard />
            </div>

          </div>
        </div>

        <style>{`
          .btn-outline-white:hover { background: rgba(255,255,255,0.12) !important; border-color: rgba(255,255,255,0.5) !important; }
          @media (max-width: 880px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .hero-float { display: none !important; }
          }
          @media (max-width: 520px) {
            .hero-trust { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
          }
        `}</style>
      </section>

      {/* Live Suburb Matching Tracker */}
      <section style={{ background: "white", paddingTop: "52px", paddingBottom: "0" }}>
        <div className="container-lg">
          <LiveSuburbTracker />
        </div>
      </section>

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div className="badge" style={{ marginBottom: 18, display: "inline-flex" }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", marginBottom: 14, letterSpacing: "-0.02em" }}>
              From a phone photo to real quotes
            </h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>
              Explore for free. You only pay when you&rsquo;re ready to turn your design into real, licensed quotes.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 56, position: "relative" }} className="steps-grid">
            {/* Connector line */}
            <div style={{ position: "absolute", top: 36, left: "12.5%", right: "12.5%", height: 2, background: "linear-gradient(90deg, var(--ocean-100), var(--ocean-200), var(--ocean-100))", zIndex: 0, display: "none" }} className="steps-connector" />

            {steps.map((s, i) => (
              <div key={s.step} style={{ padding: "0 14px", position: "relative", zIndex: 1 }}>
                {/* Step number circle */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: i % 2 === 0 ? "linear-gradient(135deg, #0e4440, #1f7a72)" : "linear-gradient(135deg, #b8820a, var(--gold-light))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", boxShadow: i % 2 === 0 ? "0 8px 24px rgba(31,122,114,0.35)" : "0 8px 24px rgba(201,151,42,0.35)", position: "relative" }}>
                    {s.icon}
                    <div style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 900, color: "var(--slate-dark)", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>{s.step}</div>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: s.tag === "Free" ? "var(--ocean-500)" : "var(--gold)", background: s.tag === "Free" ? "var(--ocean-50)" : "#fdf6e8", border: `1px solid ${s.tag === "Free" ? "var(--ocean-100)" : "#f0dcae"}`, padding: "4px 10px", borderRadius: "50px", marginBottom: 12 }}>{s.tag}</span>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: 10, color: "var(--slate-dark)" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.87rem", color: "var(--slate-light)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 52 }}>
            <Link href="/quote" className="btn-gold" id="how-cta" style={{ fontSize: "1.05rem", padding: "15px 36px" }}>📸 Start with a photo — it&rsquo;s free</Link>
          </div>
        </div>
        <style>{`
          @media (min-width: 901px) { .steps-connector { display: block !important; } }
          @media (max-width: 900px) { .steps-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; } }
          @media (max-width: 520px) { .steps-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Interactive Ballpark Cost Calculator */}
      <section className="section" style={{ background: "var(--off-white)", borderTop: "1px solid var(--sand-200)", borderBottom: "1px solid var(--sand-200)", paddingBottom: "80px" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="badge" style={{ marginBottom: "18px" }}>Budget Tool</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "-0.02em", color: "var(--slate-dark)" }}>
              Estimate Your Renovation Budget
            </h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto" }}>
              Get a compliant, realistic cost breakdown for construction works in South East Queensland instantly.
            </p>
          </div>
          <RenovationCostCalculator />
        </div>
      </section>

      {/* ───────────────── FEATURED CURATION ───────────────── */}
      <section className="section" style={{ background: "var(--off-white)", borderBottom: "1px solid var(--sand-200)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 18 }}>Premium Gallery</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", marginBottom: 14, letterSpacing: "-0.02em" }}>
              Queensland Renovation Curation
            </h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", maxWidth: 600, margin: "0 auto" }}>
              Explore real style concepts, custom materials and ballpark budgets designed specifically for South East QLD coastal living.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 30 }} className="curation-grid">
            {[
              {
                img: "/images/luxury_kitchen.png",
                title: "The Coastal Kitchen Pavilion",
                suburb: "Noosa Heads",
                style: "Warm Coastal Modern",
                budget: "$65k - $95k",
                desc: "Featuring a marble waterfall island benchtop, brushed brass tapware, and sage timber cabinetry."
              },
              {
                img: "/images/outdoor_living.png",
                title: "The Alfresco Pavilion Deck",
                suburb: "Sunshine Coast",
                style: "Resort Alfresco",
                budget: "$28k - $48k",
                desc: "High-end composite wood decking with a sleek integrated louvre pergola and poolside flow."
              },
              {
                img: "/images/coastal_living_room.png",
                title: "The Cathedral Ceiling Lounge",
                suburb: "Burleigh Heads",
                style: "Organic Modern",
                budget: "$75k - $110k",
                desc: "High cathedral ceiling with exposed timber roof trusses, neutral linen, and indoor-outdoor sliding glass."
              },
              {
                img: "/images/master_bedroom.png",
                title: "The Master Bedroom Sanctuary",
                suburb: "Robina",
                style: "Sage Linen Retreat",
                budget: "$14k - $24k",
                desc: "Natural linen bedding, custom light rattan woven headboard, and soft earthy sage-green accents."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="card"
                style={{
                  overflow: "hidden",
                  borderRadius: "24px",
                  background: "white",
                  boxShadow: "var(--shadow-sm)",
                  transition: "var(--transition)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}
              >
                <div style={{ position: "relative", overflow: "hidden", height: 280 }} className="img-container">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    className="curation-img"
                    unoptimized
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      background: "rgba(10, 31, 30, 0.75)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: 50,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase"
                    }}
                  >
                    📍 {item.suburb}
                  </div>
                </div>
                
                <div style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                  <div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "var(--ocean-500)",
                        letterSpacing: "0.05em",
                        display: "block",
                        marginBottom: 6
                      }}
                    >
                      {item.style}
                    </span>
                    <h3 style={{ fontSize: "1.1rem", color: "var(--slate-dark)", marginBottom: 8, fontWeight: 800 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.83rem", color: "var(--slate-light)", lineHeight: 1.6, marginBottom: 16 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: 16,
                      borderTop: "1px solid var(--sand-200)"
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.68rem", color: "var(--slate-light)", display: "block" }}>Est. Budget</span>
                      <strong style={{ fontSize: "0.95rem", color: "var(--gold)", fontWeight: 800 }}>{item.budget}</strong>
                    </div>
                    <Link
                      href="/quote"
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--ocean-500)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4
                      }}
                      className="hover-arrow"
                    >
                      Plan this →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .curation-img:hover { transform: scale(1.05); }
          .hover-arrow:hover { color: var(--ocean-600) !important; text-decoration: underline !important; }
        `}</style>
      </section>

      {/* Design Lookbook & Compliance Selector */}
      <section className="section" style={{ background: "white", borderBottom: "1px solid var(--sand-200)" }}>
        <div className="container-lg">
          <DesignLookbook />
        </div>
      </section>

      {/* ───────────────── WHY DIFFERENT ───────────────── */}
      <section className="section" style={{ background: "linear-gradient(160deg, #0a1f1e 0%, #0e3a36 100%)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 18, display: "inline-flex", background: "rgba(255,255,255,0.1)", color: "var(--ocean-200)", border: "1px solid rgba(255,255,255,0.15)" }}>Why CoastHomeHub</div>
            <h2 style={{ color: "white", fontSize: "clamp(1.9rem, 4vw, 2.9rem)", marginBottom: 14, letterSpacing: "-0.02em" }}>Not another lead-spam site.</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto" }}>
              Most &ldquo;get a quote&rdquo; sites sell your details to whoever pays. We do the opposite — vet the tradies, protect you, and only connect serious jobs.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 960, margin: "0 auto" }} className="compare-grid">
            {/* Old way */}
            <div style={{ padding: "36px 32px", borderRadius: 24, background: "rgba(255,80,80,0.05)", border: "1px solid rgba(255,80,80,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,80,80,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>✕</div>
                <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#ff8f8f" }}>Typical quote sites</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {oldWay.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: "0.93rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>
                    <span style={{ color: "#ff6b6b", fontWeight: 800, flexShrink: 0, marginTop: 2 }}>—</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Our way */}
            <div style={{ padding: "36px 32px", borderRadius: 24, background: "linear-gradient(160deg, rgba(31,122,114,0.25), rgba(14,68,64,0.15))", border: "1px solid rgba(61,153,144,0.4)", boxShadow: "0 16px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(61,153,144,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>✓</div>
                <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ocean-300)" }}>The CoastHomeHub way</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {newWay.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: "0.93rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.55 }}>
                    <span style={{ color: "var(--gold-light)", fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✓</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px){ .compare-grid{ grid-template-columns:1fr !important; } }`}</style>
      </section>

      {/* ───────────────── TRUST STACK ───────────────── */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 18, display: "inline-flex" }}>Built on Trust</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", marginBottom: 14, letterSpacing: "-0.02em" }}>Why Queenslanders can rely on us</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", maxWidth: 540, margin: "0 auto" }}>
              A renovation is a big spend. Every part of CoastHomeHub is designed to protect you — not just sell your number.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {trustStack.map((t) => (
              <div key={t.title} className="card" style={{ padding: "28px 26px", background: "white", display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: t.accent === "var(--ocean-500)" || t.accent === "#1f7a72" ? "var(--ocean-50)" : "#fdf6e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{t.icon}</div>
                <div>
                  <h3 style={{ fontSize: "1rem", marginBottom: 7, color: "var(--slate-dark)" }}>{t.title}</h3>
                  <p style={{ fontSize: "0.86rem", color: "var(--slate-light)", lineHeight: 1.7 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Founder bar */}
          <div style={{ marginTop: 32, padding: "24px 32px", borderRadius: 20, background: "white", border: "1px solid var(--sand-200)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
            <span style={{ fontSize: "1.6rem" }}>🏗️</span>
            <p style={{ fontSize: "0.93rem", color: "var(--slate-mid)", lineHeight: 1.6, margin: 0 }}>
              Founded and vetted by <strong style={{ color: "var(--ocean-600)" }}>EIJ Construction</strong> — a QBCC-licensed Queensland builder.{" "}
              <span style={{ color: "var(--slate-light)" }}>ABN 79&nbsp;674&nbsp;743&nbsp;545.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── DESIGN HUB ───────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="badge" style={{ marginBottom: 14, display: "inline-flex" }}>Design Hub</div>
              <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", letterSpacing: "-0.02em" }}>Get inspired (and informed) first</h2>
              <p style={{ color: "var(--slate-light)", fontSize: "1rem", marginTop: 10, maxWidth: 520 }}>
                Real QLD projects, honest cost guides and DIY know-how — so you make confident decisions before you spend.
              </p>
            </div>
            <Link href="/magazine" className="btn-secondary" id="hub-all">All guides →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {latestArticles.map((article) => (
              <Link key={article.slug} href={`/magazine/${article.slug}`} className="card" style={{ overflow: "hidden", textDecoration: "none", display: "block" }}>
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <Image src={article.heroImage} alt={article.title} width={600} height={200} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }} className="hub-img" unoptimized />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,68,64,0.3) 0%, transparent 60%)" }} />
                </div>
                <div style={{ padding: "22px 24px" }}>
                  <span style={{ display: "inline-block", background: "var(--ocean-50)", color: "var(--ocean-600)", border: "1px solid var(--ocean-100)", borderRadius: "50px", padding: "4px 12px", fontSize: "0.72rem", fontWeight: 700, marginBottom: 10 }}>{article.type}</span>
                  <h3 style={{ fontSize: "1.05rem", lineHeight: 1.45, color: "var(--slate-dark)" }}>{article.title}</h3>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.82rem", marginTop: 6, lineClamp: 2, WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.excerpt}</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 14, fontSize: "0.85rem", fontWeight: 700, color: "var(--ocean-500)" }}>Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <style>{`.hub-img:hover { transform: scale(1.04); }`}</style>
      </section>

      {/* ───────────────── TESTIMONIALS ───────────────── */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 18, display: "inline-flex" }}>Reviews</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", marginBottom: 14, letterSpacing: "-0.02em" }}>What Queenslanders say</h2>
            <div style={{ color: "#f59e0b", fontSize: "1.4rem", letterSpacing: 4 }}>★★★★★</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="card" style={{ padding: "32px 28px", background: "white", border: "1px solid var(--sand-100)", position: "relative", overflow: "hidden" }}>
                {/* Big quote mark */}
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: "5rem", color: "var(--ocean-50)", lineHeight: 1, fontFamily: "Georgia, serif", pointerEvents: "none", userSelect: "none" }}>&ldquo;</div>

                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} style={{ color: "#f59e0b", fontSize: "1rem" }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: "0.97rem", lineHeight: 1.75, color: "var(--slate-mid)", marginBottom: 24, position: "relative", zIndex: 1 }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "1.1rem" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--slate-dark)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginTop: 2 }}>📍 {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── FOR TRADIES ───────────────── */}
      <section className="section-sm" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ borderRadius: 28, background: "linear-gradient(140deg, #0a1f1e 0%, #0e4440 60%, #1f7a72 100%)", padding: "52px 48px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 36, alignItems: "center", overflow: "hidden", position: "relative" }} className="tradie-band">
            <div style={{ position: "absolute", top: "-30%", right: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,151,42,0.12) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "7px 16px", marginBottom: 20 }}>
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em" }}>🔧 For Licensed Tradies</span>
              </div>
              <h2 style={{ color: "white", fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em" }}>Warm, pre-qualified leads. Never junk.</h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 28, maxWidth: 500 }}>
                Every lead is a real homeowner who&rsquo;s already chatted with our AI and committed to their job — scoped, photographed, ready to quote. Flat monthly membership. No commission. No per-lead gouging.
              </p>
              <Link href="/tradies" className="btn-gold" id="tradie-band-cta" style={{ fontSize: "1.02rem", padding: "15px 32px" }}>List my business →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }} className="tradie-band-stats">
              {[
                { t: "Pre-qualified", d: "AI-scoped, paid, serious homeowners" },
                { t: "Max 3 quotes", d: "You're not racing 10 others" },
                { t: "Licensed-only", d: "A platform that protects your reputation" },
              ].map((s) => (
                <div key={s.t} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: "16px 20px", backdropFilter: "blur(8px)" }}>
                  <div style={{ fontWeight: 800, color: "white", fontSize: "0.97rem" }}>{s.t}</div>
                  <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px){ .tradie-band{ grid-template-columns:1fr !important; padding: 36px 28px !important; } .tradie-band-stats { display: none !important; } }`}</style>
      </section>

      {/* ───────────────── FINAL CTA ───────────────── */}
      <section style={{ background: "linear-gradient(150deg, #0a1f1e 0%, #0e4440 100%)", padding: "96px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(201,151,42,0.1) 0%, transparent 60%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="container-md" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "7px 18px", marginBottom: 24 }}>
            <span style={{ color: "var(--gold-light)", fontSize: "0.85rem" }}>✦</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em" }}>FREE TO START</span>
          </div>
          <h2 style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 18, lineHeight: 1.15, letterSpacing: "-0.03em" }}>Your dream renovation starts with a photo.</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            See the design, know the price, and meet up to 3 licensed local tradies — all without leaving your couch.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-gold" id="final-cta" style={{ fontSize: "1.05rem", padding: "16px 40px" }}>📸 Design my space — free</Link>
            <Link href="/tradies" style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", borderRadius: "50px", fontWeight: 600, fontSize: "1rem", textDecoration: "none", color: "rgba(255,255,255,0.85)", border: "2px solid rgba(255,255,255,0.3)", transition: "var(--transition)" }} id="final-tradie" className="btn-outline-white">I&rsquo;m a tradie →</Link>
          </div>
          <p style={{ marginTop: 40, fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", maxWidth: 600, margin: "40px auto 0", lineHeight: 1.7 }}>
            CoastHomeHub uses best efforts to connect homeowners with up to 3 QBCC-licensed local tradies but does not guarantee tradie availability, specific services, or response times. AI cost estimates are indicative ballpark figures only — not formal quotes. Home Warranty Insurance applies only where the tradie holds the relevant QBCC licence class for that work. <Link href="/terms" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "underline" }}>Terms&nbsp;&amp;&nbsp;Conditions apply.</Link>
          </p>
        </div>
      </section>
    </>
  );
}

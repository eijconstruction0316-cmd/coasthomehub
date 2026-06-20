import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   CoastHomeHub — AI-first home renovation concierge for SE QLD.
   Positioning: not another lead-spam site. Show your space, let AI
   design + price it, then get matched with up to 3 VERIFIED licensed
   QLD tradies. Trust-first, built by a QBCC-licensed builder (EIJ).
   ───────────────────────────────────────────────────────────── */

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
    desc: "Snap a photo of your room and tell our AI what you’re dreaming of. Takes a minute.",
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
  "Free to post, so lead quality is nobody’s problem",
];

const newWay = [
  "AI scopes your job before a tradie sees it",
  "Sent to a maximum of 3 — never resold",
  "Every tradie’s QBCC licence checked & active",
  "Honest, verified two-sided reviews",
  "Real design + costs before you commit a cent",
];

const trustStack = [
  { icon: "✅", title: "QBCC Licence Verified", desc: "Every tradie is checked against Queensland’s QBCC register — correct class, active status, no bans." },
  { icon: "🏠", title: "Home Warranty Protected", desc: "We only match licensed contractors, so your statutory cover (up to $300k) stays intact." },
  { icon: "🛡️", title: "Fully Insured Tradies", desc: "Public liability and workers’ comp confirmed — not your problem if something goes wrong." },
  { icon: "⭐", title: "Honest Reviews", desc: "Verified jobs only, and we publish the bad with the good. No hidden ratings." },
  { icon: "🔒", title: "Secure Payments", desc: "Pay safely through Stripe. Funds for larger jobs can be held until milestones are met." },
  { icon: "👷", title: "Built by a Licensed Builder", desc: "Founded and vetted by EIJ Construction — a QBCC-licensed QLD builder, not a faceless tech platform." },
];

const designHub = [
  { img: "/gallery/interior-2.jpg", tag: "Design Trends", title: "What’s actually selling in QLD homes for 2026" },
  { img: "/gallery/interior-5.jpg", tag: "DIY Guide", title: "Re-seal your own shower — the licensed way" },
  { img: "/gallery/interior-7.jpg", tag: "Cost Guide", title: "Why renovation costs what it costs in QLD" },
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
    text: "No spam calls, no 10 random numbers ringing. Three real quotes from licensed locals. That’s exactly what I wanted.",
    rating: 5,
  },
  {
    name: "Lisa K.",
    location: "Robina",
    text: "The AI walked me through what the job actually involved, so I knew I wasn’t being ripped off before a single tradie quoted.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <>
      {/* ───────────────── HERO ───────────────── */}
      <section
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #e8f5f4 0%, #f5f0e8 50%, #e8f0f5 100%)",
          display: "flex",
          alignItems: "center",
          paddingTop: "120px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "8%", right: "-6%", width: 520, height: 520, background: "radial-gradient(circle, rgba(61,153,144,0.16) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0%", left: "-6%", width: 420, height: 420, background: "radial-gradient(circle, rgba(201,151,42,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container-lg" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "64px", alignItems: "center" }} className="hero-grid">
            {/* Left: Text */}
            <div>
              <div className="badge" style={{ marginBottom: 22 }}>
                ✨ AI-powered · Licensed QLD tradies only
              </div>
              <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.08, marginBottom: 22, color: "var(--slate-dark)" }}>
                See your renovation
                <br />
                <span style={{ background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  before you spend a dollar.
                </span>
              </h1>
              <p style={{ fontSize: "1.15rem", color: "var(--slate-light)", lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
                Upload a photo of your space. Our AI designs it, gives you a real QLD price, then matches you with{" "}
                <strong style={{ color: "var(--ocean-600)" }}>up to 3 verified licensed tradies</strong> — never sold to ten.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/quote" className="btn-gold" id="hero-start-ai">
                  📸 Design my space with AI →
                </Link>
                <Link href="/gallery" className="btn-secondary" id="hero-browse">
                  Browse real projects
                </Link>
              </div>

              {/* Trust strip */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 28, marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--sand-200)", flexWrap: "wrap" }} className="hero-trust">
                {trustRow.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontWeight: 900, fontSize: "1.35rem", color: "var(--ocean-500)", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "0.74rem", color: "var(--slate-light)", marginTop: 4, maxWidth: 130 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Mock AI chat preview */}
            <div style={{ position: "relative" }}>
              <div className="glass-card" style={{ padding: 20, background: "rgba(255,255,255,0.86)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "var(--shadow-xl)" }}>
                {/* Chat header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14, borderBottom: "1px solid var(--sand-100)", marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem" }}>🌊</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--slate-dark)", lineHeight: 1 }}>CoastAI</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--ocean-500)", fontWeight: 600, marginTop: 3 }}>● Designing your space</div>
                  </div>
                </div>

                {/* User photo message */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
                  <div style={{ maxWidth: "78%" }}>
                    <div style={{ borderRadius: "16px 16px 4px 16px", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/gallery/interior-1.jpg" alt="Your bathroom" style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ background: "var(--ocean-500)", color: "white", padding: "9px 14px", borderRadius: "14px 14px 4px 14px", fontSize: "0.82rem", marginTop: 6, lineHeight: 1.5 }}>
                      Can you modernise our main bathroom? Budget around $20k.
                    </div>
                  </div>
                </div>

                {/* AI reply */}
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem" }}>🌊</div>
                  <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: "12px 14px", borderRadius: "4px 14px 14px 14px", fontSize: "0.82rem", color: "var(--slate-mid)", lineHeight: 1.6 }}>
                    Love it. Here’s a warm coastal concept — floating vanity, large-format tiles, matte black tapware. For a full reno at this size in QLD, expect{" "}
                    <strong style={{ color: "var(--ocean-700)" }}>$18k–$24k</strong>. Want me to line up <strong>3 licensed local tradies</strong> to quote it?
                  </div>
                </div>

                {/* Concept chips */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16, paddingLeft: 34, flexWrap: "wrap" }}>
                  {["🪵 Warm coastal", "🛁 Floating vanity", "⬛ Matte black", "💡 $18k–$24k"].map((c) => (
                    <span key={c} style={{ background: "white", border: "1px solid var(--ocean-100)", color: "var(--ocean-600)", borderRadius: "50px", padding: "4px 11px", fontSize: "0.72rem", fontWeight: 700 }}>{c}</span>
                  ))}
                </div>

                {/* CTA inside card */}
                <Link href="/quote" id="hero-card-cta" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg, var(--gold), var(--gold-light))", color: "white", padding: "12px", borderRadius: 12, fontWeight: 800, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 6px 18px rgba(201,151,42,0.35)" }}>
                  Yes — match me with 3 licensed tradies →
                </Link>
              </div>

              {/* Floating verified badge */}
              <div style={{ position: "absolute", bottom: -16, left: -16, background: "white", borderRadius: 14, padding: "10px 14px", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 9, border: "1px solid var(--sand-100)" }} className="hero-float">
                <span style={{ fontSize: "1.3rem" }}>✅</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.78rem", color: "var(--slate-dark)", lineHeight: 1 }}>QBCC Verified</div>
                  <div style={{ fontSize: "0.66rem", color: "var(--slate-light)", marginTop: 3 }}>Licence checked on every tradie</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .hero-float { display: none !important; }
          }
          @media (max-width: 520px) {
            .hero-trust { grid-template-columns: 1fr 1fr !important; gap: 18px !important; }
          }
        `}</style>
      </section>

      {/* ───────────────── HOW IT WORKS (the funnel) ───────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: 14 }}>
              From a phone photo to real quotes
            </h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto 8px" }}>
              Explore for free. You only pay when you’re ready to turn your design into real, licensed quotes.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, marginTop: 48 }} className="steps-grid">
            {steps.map((s) => (
              <div key={s.step} className="card" style={{ padding: "28px 24px", position: "relative", background: "var(--off-white)", border: "1px solid var(--sand-200)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{s.icon}</div>
                  <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: s.tag === "Free" ? "var(--ocean-500)" : "var(--gold)", background: s.tag === "Free" ? "var(--ocean-50)" : "#fdf6e8", border: `1px solid ${s.tag === "Free" ? "var(--ocean-100)" : "#f0dcae"}`, padding: "4px 9px", borderRadius: "50px" }}>{s.tag}</span>
                </div>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--sand-400)", letterSpacing: "0.1em", marginBottom: 6 }}>STEP {s.step}</div>
                <h3 style={{ fontSize: "1.08rem", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: "0.86rem", color: "var(--slate-light)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link href="/quote" className="btn-gold" id="how-cta">📸 Start with a photo — it’s free</Link>
          </div>
        </div>
        <style>{`@media (max-width: 900px){ .steps-grid{ grid-template-columns:1fr 1fr !important; } } @media (max-width:520px){ .steps-grid{ grid-template-columns:1fr !important; } }`}</style>
      </section>

      {/* ───────────────── WHY DIFFERENT (anti lead-spam) ───────────────── */}
      <section className="section" style={{ background: "linear-gradient(135deg, var(--slate-dark) 0%, var(--slate-mid) 100%)", color: "white" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.1)", color: "var(--ocean-300)", border: "1px solid rgba(255,255,255,0.15)" }}>Why CoastHomeHub</div>
            <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: 14 }}>Not another lead-spam site.</h2>
            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.05rem", maxWidth: 600, margin: "0 auto" }}>
              Most “get a quote” sites sell your details to whoever pays. We do the opposite — vet the tradies, protect you, and only connect serious jobs.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 920, margin: "0 auto" }} className="compare-grid">
            {/* Old way */}
            <div style={{ padding: "32px 28px", borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,90,90,0.22)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#ff8f8f", marginBottom: 20 }}>Typical quote sites</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {oldWay.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.92rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                    <span style={{ color: "#ff6b6b", fontWeight: 800, flexShrink: 0 }}>✕</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            {/* Our way */}
            <div style={{ padding: "32px 28px", borderRadius: "var(--radius-lg)", background: "linear-gradient(160deg, rgba(61,153,144,0.18), rgba(31,122,114,0.08))", border: "1px solid var(--ocean-400)", boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ocean-300)", marginBottom: 20 }}>The CoastHomeHub way</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {newWay.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.92rem", color: "white", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--gold-light)", fontWeight: 800, flexShrink: 0 }}>✓</span>{t}
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
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Built on Trust</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 14 }}>Why Queenslanders can rely on us</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}>
              A renovation is a big spend. Every part of CoastHomeHub is designed to protect you — not just sell your number.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
            {trustStack.map((t) => (
              <div key={t.title} className="card" style={{ padding: 28, background: "white" }}>
                <div style={{ fontSize: "1.9rem", marginBottom: 14 }}>{t.icon}</div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{t.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--slate-light)", lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Founder credibility bar */}
          <div style={{ marginTop: 40, padding: "22px 28px", borderRadius: "var(--radius-lg)", background: "white", border: "1px solid var(--sand-200)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
            <span style={{ fontSize: "1.4rem" }}>🏗️</span>
            <p style={{ fontSize: "0.92rem", color: "var(--slate-mid)", lineHeight: 1.6, margin: 0 }}>
              Founded and vetted by <strong style={{ color: "var(--ocean-600)" }}>EIJ Construction</strong> — a QBCC-licensed Queensland builder.{" "}
              <span style={{ color: "var(--slate-light)" }}>ABN 79&nbsp;674&nbsp;743&nbsp;545.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── DESIGN HUB ───────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="badge" style={{ marginBottom: 12, display: "inline-flex" }}>Design Hub</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Get inspired (and informed) first</h2>
              <p style={{ color: "var(--slate-light)", fontSize: "1rem", marginTop: 10, maxWidth: 520 }}>
                Real QLD projects, honest cost guides and DIY know-how — so you make confident decisions before you spend.
              </p>
            </div>
            <Link href="/blog" className="btn-secondary" id="hub-all">All guides →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {designHub.map((p) => (
              <Link key={p.title} href="/blog" className="card" style={{ overflow: "hidden", textDecoration: "none", display: "block" }}>
                <div style={{ height: 180, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: 24 }}>
                  <span style={{ display: "inline-block", background: "var(--ocean-50)", color: "var(--ocean-600)", border: "1px solid var(--ocean-100)", borderRadius: "50px", padding: "3px 11px", fontSize: "0.72rem", fontWeight: 700, marginBottom: 12 }}>{p.tag}</span>
                  <h3 style={{ fontSize: "1.05rem", lineHeight: 1.4, color: "var(--slate-dark)" }}>{p.title}</h3>
                  <span style={{ display: "inline-block", marginTop: 14, fontSize: "0.85rem", fontWeight: 700, color: "var(--ocean-500)" }}>Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── TESTIMONIALS ───────────────── */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Reviews</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 12 }}>What Queenslanders say</h2>
            <div style={{ fontSize: "1.6rem", letterSpacing: 3 }}>⭐⭐⭐⭐⭐</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="card" style={{ padding: 28, background: "white", border: "1px solid var(--sand-200)" }}>
                <div style={{ fontSize: "1.2rem", marginBottom: 14 }}>{"⭐".repeat(t.rating)}</div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--slate-mid)", marginBottom: 20, fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, background: "linear-gradient(135deg, var(--ocean-400), var(--ocean-300))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "white", fontWeight: 700 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--slate-dark)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--slate-light)" }}>📍 {t.location}</div>
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
          <div style={{ borderRadius: "var(--radius-xl)", background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-400))", padding: "48px 44px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "center", overflow: "hidden", position: "relative" }} className="tradie-band">
            <div>
              <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>🔧 For Licensed Tradies</div>
              <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)", marginBottom: 14, lineHeight: 1.2 }}>Warm, pre-qualified leads. Never junk.</h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 26, maxWidth: 520 }}>
                Every lead is a real homeowner who’s already chatted with our AI and committed to their job — scoped, photographed, ready to quote. Flat monthly membership. No commission. No per-lead gouging. You’re asked first.
              </p>
              <Link href="/tradies" className="btn-gold" id="tradie-band-cta">List my business →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="tradie-band-stats">
              {[
                { t: "Pre-qualified", d: "AI-scoped, paid, serious homeowners" },
                { t: "Max 3 quote", d: "You’re not racing 10 others" },
                { t: "Licensed-only", d: "A platform that protects your reputation" },
              ].map((s) => (
                <div key={s.t} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 14, padding: "14px 18px" }}>
                  <div style={{ fontWeight: 800, color: "white", fontSize: "0.95rem" }}>{s.t}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginTop: 3 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px){ .tradie-band{ grid-template-columns:1fr !important; } }`}</style>
      </section>

      {/* ───────────────── FINAL CTA ───────────────── */}
      <section style={{ background: "linear-gradient(135deg, var(--slate-dark), var(--slate-mid))", padding: "84px 0", textAlign: "center" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: 16 }}>Your dream renovation starts with a photo.</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            See the design, know the price, and meet up to 3 licensed local tradies — all without leaving your couch.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-gold" id="final-cta">📸 Design my space — free</Link>
            <Link href="/tradies" style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", borderRadius: "50px", fontWeight: 600, fontSize: "1rem", textDecoration: "none", color: "white", border: "2px solid rgba(255,255,255,0.5)" }} id="final-tradie">I’m a tradie →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "8+", label: "Years Experience" },
  { value: "Gold Coast", label: "to Sunshine Coast" },
  { value: "100%", label: "Licensed & Insured" },
];

const services = [
  {
    icon: "💧",
    title: "Waterproofing",
    desc: "Professional waterproofing for bathrooms, balconies, roofs & more. QLD's humid climate demands expert protection.",
    tags: ["Bathrooms", "Balconies", "Roofs"],
    color: "var(--ocean-50)",
    border: "var(--ocean-200)",
  },
  {
    icon: "🔧",
    title: "Silicone Sealing",
    desc: "Premium silicone application for showers, windows, kitchens & exterior joints. Long-lasting weatherproof results.",
    tags: ["Showers", "Windows", "Kitchen"],
    color: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    icon: "🏡",
    title: "Home Renovation",
    desc: "From concept to completion — bathroom renovations, tiling, and full interior refits from Gold Coast to Sunshine Coast.",
    tags: ["Bathrooms", "Tiling", "Refits"],
    color: "var(--sand-50)",
    border: "var(--sand-200)",
  },
  {
    icon: "📐",
    title: "Design Consultation",
    desc: "Not sure where to start? Our design experts help you plan the perfect renovation with Australian style in mind.",
    tags: ["Trends", "Planning", "Budget"],
    color: "#fef9f0",
    border: "#fed7aa",
  },
];

const blogPosts = [
  {
    tag: "2025 Trends",
    title: "Top 10 Australian Home Design Trends for 2025",
    excerpt: "From coastal textures to bold earthy tones — discover what's dominating Queensland interiors this year.",
    readTime: "5 min read",
    color: "var(--ocean-400)",
    emoji: "🏠",
  },
  {
    tag: "DIY Guide",
    title: "How to Re-Seal Your Shower (Step by Step)",
    excerpt: "Save thousands on call-outs. Our licensed team's insider guide to refreshing silicone seals at home.",
    readTime: "8 min read",
    color: "var(--sand-500)",
    emoji: "🚿",
  },
  {
    tag: "Buyer's Guide",
    title: "Choosing the Right Waterproofing for QLD's Climate",
    excerpt: "Queensland's heat and humidity are brutal on homes. Here's what actually works and what doesn't.",
    readTime: "6 min read",
    color: "#7c3aed",
    emoji: "🌧️",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Burleigh Heads",
    text: "EIJ completely transformed our bathroom. The silicone finish is flawless and they cleaned up perfectly. Would highly recommend!",
    rating: 5,
  },
  {
    name: "Tom R.",
    location: "Noosa",
    text: "Found them through CoastHomeHub and couldn't be happier. Quick quote, fair price, and exceptional workmanship on our balcony waterproofing.",
    rating: 5,
  },
  {
    name: "Lisa K.",
    location: "Robina",
    text: "The blog guides here helped me understand what I actually needed before getting quotes. Saved me from getting ripped off!",
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
        {/* BG Orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(61,153,144,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-5%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(201,151,42,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div className="container-lg" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* Left: Text */}
            <div>
              <div className="badge" style={{ marginBottom: 24 }}>
                🌊 Gold Coast to Sunshine Coast
              </div>
              <h1
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: 24,
                  color: "var(--slate-dark)",
                }}
              >
                Your Home
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Deserves Better.
                </span>
              </h1>
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "var(--slate-light)",
                  lineHeight: 1.7,
                  marginBottom: 40,
                  maxWidth: 480,
                }}
              >
                Australia&apos;s local home improvement hub. Browse 2025 design trends, read DIY guides, or connect with{" "}
                <strong style={{ color: "var(--ocean-600)" }}>licensed Queensland tradies</strong> for a fast, free quote.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/quote" className="btn-gold" id="hero-get-quote">
                  🔧 Get a Free Quote
                </Link>
                <Link href="/blog" className="btn-secondary" id="hero-explore-design">
                  Explore Design Trends →
                </Link>
              </div>

              {/* Trust badges */}
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  marginTop: 40,
                  paddingTop: 32,
                  borderTop: "1px solid var(--sand-200)",
                  flexWrap: "wrap",
                }}
              >
                {["✅ QLD Licensed", "🛡️ Fully Insured", "⭐ 5-Star Rated"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--slate-mid)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Stats card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Hero Visual Card */}
              <div
                className="glass-card"
                style={{
                  padding: "36px",
                  backgroundImage: "linear-gradient(135deg, rgba(20,30,40,0.78), rgba(20,40,38,0.62)), url(/gallery/interior-3.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <h3 style={{ color: "white", fontSize: "1.4rem", marginBottom: 8 }}>
                  Find Licensed Tradies
                </h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Tell us your job — we connect you with 1–3 vetted local professionals. Free and fast.
                </p>
                <Link
                  href="/quote"
                  style={{
                    display: "inline-block",
                    marginTop: 20,
                    background: "white",
                    color: "var(--ocean-600)",
                    padding: "10px 24px",
                    borderRadius: "50px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                  id="hero-card-cta"
                >
                  Start Your Request →
                </Link>
              </div>

              {/* Stats Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {stats.map((s) => (
                  <div
                    key={s.value}
                    className="card"
                    style={{ padding: "20px", textAlign: "center" }}
                  >
                    <div
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 900,
                        color: "var(--ocean-500)",
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {s.value}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--slate-light)", fontWeight: 500 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ───────────────── SERVICES ───────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>
              Our Services
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: 16 }}>
              Everything Your Home Needs
            </h2>
            <div className="divider" style={{ margin: "0 auto 20px" }} />
            <p style={{ color: "var(--slate-light)", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}>
              From waterproofing to full renovation — our licensed team covers Gold Coast to Sunshine Coast.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {services.map((s) => (
              <div
                key={s.title}
                className="card"
                style={{
                  padding: "28px",
                  background: s.color,
                  border: `1px solid ${s.border}`,
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: 10, color: "var(--slate-dark)" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--slate-light)", lineHeight: 1.7, marginBottom: 16 }}>
                  {s.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(26,35,50,0.1)",
                        borderRadius: "50px",
                        padding: "3px 10px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--slate-mid)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/services" className="btn-secondary" id="view-all-services">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, var(--slate-dark) 0%, var(--slate-mid) 100%)",
          color: "white",
        }}
      >
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              className="badge"
              style={{
                marginBottom: 16,
                display: "inline-flex",
                background: "rgba(255,255,255,0.1)",
                color: "var(--ocean-300)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              How It Works
            </div>
            <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
              Get a Quote in 3 Simple Steps
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
            className="steps-grid"
          >
            {[
              { step: "01", icon: "📋", title: "Describe Your Job", desc: "Tell us what you need — type of work, location, and upload a photo if you have one." },
              { step: "02", icon: "🔍", title: "We Match You", desc: "We review your request and connect you with 1–3 licensed local tradies who specialise in your job." },
              { step: "03", icon: "✅", title: "Choose & Book", desc: "Review quotes, check reviews, and book directly. No hidden fees, no pressure." },
            ].map((step) => (
              <div
                key={step.step}
                style={{
                  textAlign: "center",
                  padding: "32px 24px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 56,
                    height: 56,
                    background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))",
                    borderRadius: "50%",
                    fontSize: "1.5rem",
                    marginBottom: 16,
                    position: "relative",
                  }}
                >
                  {step.icon}
                  <span
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      background: "var(--gold)",
                      color: "white",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3 style={{ color: "white", fontSize: "1.15rem", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/quote" className="btn-gold" id="steps-get-quote">
              Get My Free Quote →
            </Link>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .steps-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ───────────────── BLOG / DESIGN TRENDS ───────────────── */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="badge" style={{ marginBottom: 12, display: "inline-flex" }}>
                Design Hub
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
                Latest Design Trends & Guides
              </h2>
            </div>
            <Link href="/blog" className="btn-secondary" id="view-all-articles">
              All Articles →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className="card"
                style={{ overflow: "hidden" }}
              >
                {/* Colour header */}
                <div
                  style={{
                    height: 140,
                    background: `linear-gradient(135deg, ${post.color}22, ${post.color}44)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3.5rem",
                    borderBottom: `1px solid ${post.color}22`,
                  }}
                >
                  {post.emoji}
                </div>
                <div style={{ padding: "24px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: `${post.color}15`,
                      color: post.color,
                      border: `1px solid ${post.color}30`,
                      borderRadius: "50px",
                      padding: "3px 10px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      marginBottom: 12,
                    }}
                  >
                    {post.tag}
                  </span>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: 10, lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--slate-light)", lineHeight: 1.6, marginBottom: 16 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--slate-light)" }}>⏱ {post.readTime}</span>
                    <Link
                      href="/blog"
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--ocean-500)",
                        textDecoration: "none",
                      }}
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── TESTIMONIALS ───────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>
              Reviews
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 12 }}>
              What Queenslanders Say
            </h2>
            <div style={{ fontSize: "2rem", letterSpacing: 4 }}>⭐⭐⭐⭐⭐</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="card"
                style={{
                  padding: "28px",
                  background: "var(--sand-50)",
                  border: "1px solid var(--sand-200)",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>
                  {"⭐".repeat(t.rating)}
                </div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--slate-mid)", marginBottom: 20, fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: "linear-gradient(135deg, var(--ocean-400), var(--ocean-300))",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    {t.name[0]}
                  </div>
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

      {/* ───────────────── CTA BANNER ───────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--ocean-600) 0%, var(--ocean-400) 100%)",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: 16 }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            Get connected with a licensed tradie in your area today. Fast, free, and no obligation.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-gold" id="cta-get-quote">
              🔧 Get a Free Quote
            </Link>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 32px",
                borderRadius: "50px",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                color: "white",
                border: "2px solid rgba(255,255,255,0.5)",
                transition: "var(--transition)",
              }}
              id="cta-view-services"
            >
              View Services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

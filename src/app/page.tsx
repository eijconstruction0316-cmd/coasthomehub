import Link from "next/link";
import Image from "next/image";
import { getPublishedMagazineArticles } from "@/lib/magazineCms";
import LiveSuburbTracker from "@/components/LiveSuburbTracker";
import RenovationCostCalculator from "@/components/RenovationCostCalculator";
import PartnershipBanner from "@/components/PartnershipBanner";
import LicenceVerifierConsole from "@/components/LicenceVerifierConsole";

export default function Home() {
  const allArticles = getPublishedMagazineArticles();
  
  // Find specific articles for featured slots or fallback to first items
  const coverStory = allArticles.find(a => a.slug === "mid-century-modern-coastal-furniture-curation") || allArticles[0];
  const featuredDIY = allArticles.find(a => a.slug === "diy-timber-deck-refinishing-guide") || allArticles[1] || allArticles[0];
  const featuredReno = allArticles.find(a => a.slug === "microcement-and-backlit-mirrors-ensuite-guide") || allArticles[2] || allArticles[0];
  
  const recentArticles = allArticles.filter(
    a => a.slug !== coverStory.slug && a.slug !== featuredDIY.slug && a.slug !== featuredReno.slug
  ).slice(0, 3);

  return (
    <>
      {/* ───────────────── MAGAZINE COVER HERO ───────────────── */}
      <section
        style={{
          background: "linear-gradient(rgba(12, 36, 34, 0.76), rgba(12, 36, 34, 0.94)), url('/images/hero_carpenter_sunset.png') no-repeat center center / cover",
          paddingTop: "150px",
          paddingBottom: "100px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "3px double var(--sand-300)",
        }}
      >
        <div className="container-lg" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px", alignItems: "center" }} className="hero-grid">
            
            {/* Left: Brand Identity & Mission */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid var(--sand-300)", borderRadius: 2, padding: "8px 18px", marginBottom: 28 }}>
                <span style={{ color: "var(--gold-light)", fontSize: "0.85rem" }}>✦</span>
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Outfit, sans-serif" }}>
                  Australia&apos;s Home &amp; Trade Knowledge Platform
                </span>
              </div>

              <h1 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)", fontWeight: 550, letterSpacing: "-0.02em", lineHeight: 1.08, marginBottom: 24, color: "white" }}>
                Expert Advice.
                <br />
                Vetted Trades.
                <br />
                <span style={{ color: "var(--gold-light)", fontStyle: "italic", fontWeight: 400 }}>
                  Trusted Homes.
                </span>
              </h1>

              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.12rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.8, marginBottom: 40, maxWidth: 540 }}>
                Honest guidance. Trusted trades. Better homes for all Australians.
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/magazine" className="btn-gold" style={{ fontSize: "0.95rem", padding: "16px 36px", borderRadius: "4px", textDecoration: "none" }}>
                  Read the Magazine ›
                </Link>
                <Link href="/directory" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.9)", padding: "15px 32px", borderRadius: "4px", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", border: "1px solid var(--sand-300)", transition: "var(--transition)" }} className="btn-outline-white">
                  Find Trusted Trades
                </Link>
              </div>

              {/* Trust Indicators Strip */}
              <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.15)" }} className="hero-trust">
                {[
                  { value: "100% Vetted", label: "QBCC Active Trades Only" },
                  { value: "No Spam", label: "Max 3 Quotes Dispatched" },
                  { value: "Supplier Checked", label: "Bunnings & Laminex Partners" }
                ].map((s) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "var(--gold-light)", fontSize: "1.4rem" }}>✦</span>
                    <div>
                      <div style={{ fontFamily: "Lora, Georgia, serif", fontWeight: 600, fontSize: "1.1rem", color: "var(--gold-light)", lineHeight: 1.1 }}>{s.value}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginTop: 4, fontFamily: "Outfit, sans-serif", fontWeight: 500, letterSpacing: "0.02em" }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Play Button / Our Story */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} className="hero-play-col">
              <div style={{ position: "relative", textAlign: "center" }}>
                <Link
                  href="/about"
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    border: "2px solid var(--gold-light)",
                    background: "rgba(12, 36, 34, 0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "var(--transition-fast)",
                    boxShadow: "0 0 20px rgba(232, 184, 75, 0.2)",
                  }}
                  className="play-button"
                >
                  <span style={{ fontSize: "1.8rem", color: "var(--gold-light)", marginLeft: 6 }}>▶</span>
                </Link>
                
                {/* Handdrawn Arrow styling */}
                <div style={{ position: "absolute", left: "105px", top: "10px", width: 120, textAlign: "left", pointerEvents: "none" }} className="our-story-arrow">
                  <span style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", display: "block", marginBottom: 2 }}>
                    Our Story
                  </span>
                  {/* Curved Arrow vector */}
                  <svg width="40" height="25" viewBox="0 0 40 25" fill="none">
                    <path d="M5 5 C 15 15, 25 15, 32 12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M30 8 L 33 12 L 29 14" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .btn-outline-white:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.6) !important; }
          .play-button:hover { transform: scale(1.05); background: rgba(232, 184, 75, 0.15) !important; }
          @media (max-width: 880px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .hero-play-col { order: -1; margin-bottom: 20px; }
            .our-story-arrow { display: none !important; }
          }
          @media (max-width: 520px) {
            .hero-trust { flexDirection: column !important; gap: 20px !important; }
          }
        `}</style>
      </section>

      {/* ───────────────── SECTION 2: EVERYTHING YOU NEED ───────────────── */}
      <section style={{ background: "#0a1f1e", color: "white", padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 56, alignItems: "start" }} className="everything-grid">
            
            {/* Left Column: Description & Action */}
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 850, color: "var(--gold-light)", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontFamily: "Outfit, sans-serif" }}>
                ✦ Integrated Directory
              </span>
              <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 500, lineHeight: 1.2, color: "white", marginBottom: 20 }}>
                Everything You Need.
                <br />
                <span style={{ color: "var(--gold-light)" }}>In One Place.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "0.98rem", lineHeight: 1.7, marginBottom: 36, fontFamily: "Outfit, sans-serif" }}>
                From planning to completion, we connect homeowners with the right knowledge, the right people, and the right products.
              </p>
              <Link href="/directory" className="btn-outline-white" style={{ borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.92rem", padding: "14px 32px", textDecoration: "none", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
                Explore All Guides
              </Link>
            </div>

            {/* Right Column: 2x3 Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="everything-cards-grid">
              {[
                { title: "Home & Trade Magazine", desc: "Expert stories. Vetted insight. Accurate experience.", href: "/magazine" },
                { title: "Find Trusted Trades", desc: "QBCC verified. Local. Reviewed by clients.", href: "/directory" },
                { title: "Cost Guides", desc: "Verified pricing. Detailed projects. Accurate numbers.", href: "/cost-guides" },
                { title: "Supplier Guides", desc: "Products, comparisons and expert picks.", href: "/suppliers" },
                { title: "AI & Design Tools", desc: "Plan smarter. Design better.", href: "/tools" },
                { title: "Project Inspiration", desc: "Vetted homes. Beautiful transformations.", href: "/inspiration" },
              ].map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(232, 184, 75, 0.15)",
                    borderRadius: 4,
                    padding: 24,
                    textDecoration: "none",
                    display: "block",
                    transition: "all 0.2s ease",
                  }}
                  className="everything-card"
                >
                  <div style={{ color: "var(--gold-light)", fontSize: "1.2rem", marginBottom: 12 }}>✦</div>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.1rem", color: "white", fontWeight: 600, marginBottom: 8 }}>
                    {card.title}
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", lineHeight: 1.5, margin: 0, fontFamily: "Outfit, sans-serif" }}>
                    {card.desc}
                  </p>
                </Link>
              ))}
            </div>

          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 820px) {
            .everything-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .everything-cards-grid { grid-template-columns: 1fr !important; }
          }
          .everything-card:hover {
            background: rgba(255,255,255,0.06) !important;
            border-color: var(--gold-light) !important;
            transform: translateY(-2px);
          }
        `}} />
      </section>

      {/* ───────────────── EDITORIAL FEATURED COLUMNS ───────────────── */}
      <section className="section" style={{ background: "white", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, borderBottom: "3px double var(--sand-300)", paddingBottom: 16 }}>
            <div>
              <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                ✦ The Latest from the Magazine
              </span>
              <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "2.2rem", margin: 0, fontWeight: 600, color: "var(--slate-dark)", lineHeight: 1.15 }}>
                Expert Stories.
                <br />
                Vetted Lessons.
                <br />
                <span style={{ color: "var(--gold)" }}>Trusted Value.</span>
              </h2>
            </div>
            <Link href="/magazine" style={{ textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, color: "var(--ocean-600)", fontFamily: "Outfit, sans-serif", borderBottom: "1px solid var(--ocean-600)", paddingBottom: 2 }} className="hover-arrow">
              VIEW ALL ARTICLES
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 36 }} className="editorial-main-grid">
            
            {/* Left: Massive Cover Story */}
            <div style={{ borderRight: "1px solid var(--sand-200)", paddingRight: 36 }} className="cover-story-col">
              <Link href={`/magazine/${coverStory.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ position: "relative", height: 380, borderRadius: 4, overflow: "hidden", border: "1px solid var(--sand-300)", marginBottom: 24 }}>
                  <Image
                    src={coverStory.heroImage}
                    alt={coverStory.title}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "var(--gold)", color: "white", padding: "4px 12px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", borderRadius: 2, letterSpacing: "0.04em" }}>
                    Cover Story
                  </div>
                </div>
                <span style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", color: "var(--ocean-600)", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "Outfit, sans-serif" }}>
                  {coverStory.type} {" // "} {coverStory.category}
                </span>
                <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.8rem", color: "var(--slate-dark)", marginBottom: 12, fontWeight: 600, lineHeight: 1.25 }}>
                  {coverStory.title}
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--slate-mid)", lineHeight: 1.7, marginBottom: 16, fontFamily: "Outfit, sans-serif" }}>
                  {coverStory.excerpt}
                </p>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold)", fontFamily: "Outfit, sans-serif" }}>
                  Read Feature Column →
                </span>
              </Link>
            </div>

            {/* Right: Vertical Stack of DIY / Reno highlights */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              
              {/* DIY Slot */}
              <div style={{ borderBottom: "1px solid var(--sand-200)", paddingBottom: 24 }}>
                <Link href={`/magazine/${featuredDIY.slug}`} style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "100px 1fr", gap: 18, alignItems: "start" }}>
                  <div style={{ position: "relative", height: 80, borderRadius: 2, overflow: "hidden", border: "1px solid var(--sand-300)" }}>
                    <Image src={featuredDIY.heroImage} alt={featuredDIY.title} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", color: "var(--gold)", letterSpacing: "0.06em", display: "block", marginBottom: 4, fontFamily: "Outfit, sans-serif" }}>
                      Featured DIY Guide
                    </span>
                    <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "0.98rem", color: "var(--slate-dark)", margin: "0 0 6px", fontWeight: 600, lineHeight: 1.35 }}>
                      {featuredDIY.title}
                    </h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", margin: 0, lineClamp: 2, WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", fontFamily: "Outfit, sans-serif" }}>
                      {featuredDIY.excerpt}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Renovation Slot */}
              <div style={{ borderBottom: "1px solid var(--sand-200)", paddingBottom: 24 }}>
                <Link href={`/magazine/${featuredReno.slug}`} style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "100px 1fr", gap: 18, alignItems: "start" }}>
                  <div style={{ position: "relative", height: 80, borderRadius: 2, overflow: "hidden", border: "1px solid var(--sand-300)" }}>
                    <Image src={featuredReno.heroImage} alt={featuredReno.title} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", color: "var(--ocean-600)", letterSpacing: "0.06em", display: "block", marginBottom: 4, fontFamily: "Outfit, sans-serif" }}>
                      Featured Renovation Case
                    </span>
                    <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "0.98rem", color: "var(--slate-dark)", margin: "0 0 6px", fontWeight: 600, lineHeight: 1.35 }}>
                      {featuredReno.title}
                    </h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", margin: 0, lineClamp: 2, WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", fontFamily: "Outfit, sans-serif" }}>
                      {featuredReno.excerpt}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Recent Registry Feed list */}
              <div>
                <h5 style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", color: "var(--slate-light)", letterSpacing: "0.08em", marginBottom: 12, fontFamily: "Outfit, sans-serif" }}>
                  More from the Editors
                </h5>
                <div style={{ display: "grid", gap: 12 }}>
                  {recentArticles.map(a => (
                    <Link key={a.slug} href={`/magazine/${a.slug}`} style={{ textDecoration: "none", display: "block", borderBottom: "1px dashed var(--sand-200)", paddingBottom: 10 }}>
                      <span style={{ fontSize: "0.65rem", color: "var(--slate-light)", display: "block", fontFamily: "Outfit, sans-serif" }}>{a.type}</span>
                      <h6 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "0.88rem", color: "var(--slate-dark)", margin: "3px 0 0", fontWeight: 600 }}>{a.title}</h6>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .editorial-main-grid { grid-template-columns: 1fr !important; }
            .cover-story-col { border-right: none !important; padding-right: 0 !important; margin-bottom: 24px; }
          }
        `}</style>
      </section>

      {/* ───────────────── TRUST ENGINE: LIVE TRACKER & VETTING CONSOLE ───────────────── */}
      <section className="section" style={{ background: "var(--off-white)", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "start" }} className="trust-engine-grid">
            
            {/* Left: Licence verification preview */}
            <div>
              <div style={{ marginBottom: 28 }}>
                <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                  ✦ Active Verifications
                </span>
                <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.8rem", margin: 0, fontWeight: 500, color: "var(--slate-dark)" }}>
                  ABN & QBCC Live Licence Check
                </h2>
                <p style={{ color: "var(--slate-light)", fontSize: "0.88rem", marginTop: 8, fontFamily: "Outfit, sans-serif" }}>
                  Enter any Australian Business Number or Queensland Building licence below to see the verification system in action.
                </p>
              </div>
              <LicenceVerifierConsole />
            </div>

            {/* Right: Live suburb match ticker */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--ocean-600)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                  ✦ Live Activity
                </span>
                <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.8rem", margin: 0, fontWeight: 500, color: "var(--slate-dark)" }}>
                  Recent Quote Matches
                </h2>
                <p style={{ color: "var(--slate-light)", fontSize: "0.88rem", marginTop: 8, fontFamily: "Outfit, sans-serif" }}>
                  Pre-screened home renovations matched with verified QLD building contractors this hour.
                </p>
              </div>
              <LiveSuburbTracker />

              {/* Dispute prevention banner */}
              <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 24px" }}>
                <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "0.98rem", fontWeight: 700, color: "var(--ocean-700)", margin: "0 0 8px" }}>
                  ✦ Statutory Home Warranty Information
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--slate-mid)", lineHeight: 1.6, margin: 0, fontFamily: "Outfit, sans-serif" }}>
                  In QLD, residential construction contracts valued over $3,300 must hold Home Warranty Insurance cover. CoastHomeHub strictly matches vetted active trades to guarantee your eligibility limits.
                </p>
              </div>
            </div>

          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .trust-engine-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>

      {/* ───────────────── POPULAR SUPPLIERS SPOTLIGHT ───────────────── */}
      <section className="section" style={{ background: "white", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
              ✦ Partnered Suppliers
            </span>
            <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.9rem", margin: 0, fontWeight: 500, color: "var(--slate-dark)" }}>
              Recommended Material & Product Partners
            </h2>
            <p style={{ color: "var(--slate-light)", fontSize: "0.95rem", marginTop: 10, maxWidth: 520, margin: "10px auto 0", fontFamily: "Outfit, sans-serif" }}>
              Browse pre-negotiated trade discounts and product specifications from leading national hardware stores and suppliers.
            </p>
          </div>

          <PartnershipBanner />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 40 }}>
            {[
              { name: "Bunnings Warehouse", desc: "Wholesale hardware tools, fasteners, framing timber and fittings.", discount: "5% Trade Account" },
              { name: "Laminex & Formica", desc: "Premium board substrate laminates and woodgrain panels.", discount: "10% Elite Voucher" },
              { name: "Reece Plumbing", desc: "High-spec brass fittings, vanity basins and toilet ware.", discount: "Trade Account Rates" },
              { name: "Beaumont Tiles", desc: "Certified P3/P4 slip-resistant floor tiles and epoxy grout.", discount: "5% Partner Discount" }
            ].map(sup => (
              <div key={sup.name} style={{ background: "var(--off-white)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 24px" }}>
                <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.05rem", color: "var(--slate-dark)", margin: "0 0 6px", fontWeight: 700 }}>{sup.name}</h4>
                <p style={{ fontSize: "0.78rem", color: "var(--slate-mid)", lineHeight: 1.5, margin: "0 0 14px", minHeight: 45, fontFamily: "Outfit, sans-serif" }}>{sup.desc}</p>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-700)", background: "var(--ocean-50)", border: "1px solid var(--ocean-200)", padding: "4px 10px", borderRadius: 2, textTransform: "uppercase", letterSpacing: "0.02em", fontFamily: "Outfit, sans-serif" }}>
                  {sup.discount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── COST CALCULATOR & AI TOOLS ───────────────── */}
      <section className="section" style={{ background: "white", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="tools-grid">
            
            {/* Left: Text */}
            <div>
              <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                ✦ Interactive Calculators
              </span>
              <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.9rem", margin: 0, fontWeight: 500, color: "var(--slate-dark)" }}>
                Renovation Cost & Estimator Tools
              </h2>
              <p style={{ color: "var(--slate-light)", fontSize: "0.95rem", marginTop: 12, lineHeight: 1.7, fontFamily: "Outfit, sans-serif" }}>
                Use our dynamic tool below to obtain a realistic cost assessment for plumbing, electrical, tiling, and carpentry works in Queensland before requesting formal builder quotes.
              </p>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 24 }}>
                <Link href="/design" style={{ textDecoration: "none", background: "var(--ocean-50)", border: "1px solid var(--ocean-200)", borderRadius: 4, padding: "16px", display: "block" }}>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "0.95rem", color: "var(--ocean-700)", margin: "0 0 4px", fontWeight: 700 }}>AI Designer Chat →</h4>
                  <p style={{ fontSize: "0.74rem", color: "var(--slate-mid)", margin: 0, fontFamily: "Outfit, sans-serif" }}>Upload photos for 3D concepts</p>
                </Link>
                <Link href="/tools" style={{ textDecoration: "none", background: "var(--ocean-50)", border: "1px solid var(--ocean-200)", borderRadius: 4, padding: "16px", display: "block" }}>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "0.95rem", color: "var(--ocean-700)", margin: "0 0 4px", fontWeight: 700 }}>2D Renovation Tools →</h4>
                  <p style={{ fontSize: "0.74rem", color: "var(--slate-mid)", margin: 0, fontFamily: "Outfit, sans-serif" }}>Bathroom, Kitchen &amp; Deck Planners</p>
                </Link>
              </div>
            </div>

            {/* Right: Active Calculator */}
            <div>
              <RenovationCostCalculator />
            </div>

          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .tools-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ───────────────── COMMUNITY QUESTIONS PREVIEW ───────────────── */}
      <section className="section" style={{ background: "var(--off-white)", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
              ✦ Open Community
            </span>
            <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.9rem", margin: 0, fontWeight: 500, color: "var(--slate-dark)" }}>
              Recent Questions & DIY Discussions
            </h2>
            <p style={{ color: "var(--slate-light)", fontSize: "0.95rem", marginTop: 10, maxWidth: 520, margin: "10px auto 0", fontFamily: "Outfit, sans-serif" }}>
              Ask questions anonymously or read verified QLD contractor replies regarding local regulations, waterproofing, and structural work.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              {
                q: "Do I need a building permit for a timber deck on the Gold Coast?",
                ans: "In Gold Coast City, decks under 1m high, under 10sqm, and not associated with pool safety boundaries generally do not need building approval. Vetted by Noosa Coastal Carpentry & Decks.",
                replies: 12,
                category: "Decking"
              },
              {
                q: "What is the minimum fall to waste required for a shower screed?",
                ans: "Under AS 3958.1 tiling standards, a minimum slope fall of 1:60 is required within a shower recess. For general wet area floors outside the shower, 1:80 is the standard. Vetted by EIJ Construction.",
                replies: 8,
                category: "Waterproofing"
              },
              {
                q: "Can I run active LED backlit mirror wiring in zone 1 bathroom?",
                ans: "AS/NZS 3000 rules dictate that electrical equipment in wet area zone 1 must be IPX4 rated or higher, and protected by an RCD. Low voltage 12V DC LED drivers are recommended. Vetted by Robina Smart Home Electrics.",
                replies: 15,
                category: "Electrical"
              }
            ].map((item) => (
              <div key={item.q} style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "var(--ocean-700)", background: "var(--ocean-50)", border: "1px solid var(--ocean-200)", padding: "2px 8px", borderRadius: 2, textTransform: "uppercase", letterSpacing: "0.02em", fontFamily: "Outfit, sans-serif" }}>
                    {item.category}
                  </span>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1rem", color: "var(--slate-dark)", margin: "12px 0 8px", fontWeight: 700, lineHeight: 1.4 }}>
                    {item.q}
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", lineHeight: 1.6, margin: 0, fontStyle: "italic", fontFamily: "Outfit, sans-serif" }}>
                    &ldquo;{item.ans}&rdquo;
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--sand-100)", paddingTop: 14, marginTop: 18 }}>
                  <span style={{ fontSize: "0.74rem", color: "var(--slate-light)", fontFamily: "Outfit, sans-serif" }}>
                    {item.replies} expert replies
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--gold)", fontFamily: "Outfit, sans-serif" }}>
                    View Q&A →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CORA'S EDITORIAL SHORTS ───────────────── */}
      <section style={{ background: "#0a1f1e", padding: "80px 0", borderBottom: "3px double var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--gold-light)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
              ✦ Cora&apos;s Video Curation
            </span>
            <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.95rem", margin: 0, fontWeight: 500, color: "white" }}>
              코라의 비디오 에디트 (Cora&apos;s Editorial Shorts)
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", marginTop: 10, maxWidth: 540, margin: "10px auto 0", fontFamily: "Outfit, sans-serif" }}>
              코스트홈허브의 에디터 코라가 들려주는 실용적인 홈 스타일링, 시공 안전 상식, 그리고 예산 전략을 쇼츠 영상으로 만나보세요.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 }} className="shorts-grid">
            {[
              {
                id: "dQw4w9WgXcQ", // 여기에 실제 YouTube Shorts 비디오 ID를 입력하세요. (예: dQw4w9WgXcQ)
                title: "방수 공사 3대 위험 신호",
                category: "시공 안전",
                desc: "욕실 타일 시공 전 반드시 확인해야 할 부실 방수 체크포인트.",
                articleLink: "/magazine/builder-interview-waterproofing-red-flags"
              },
              {
                id: "dQw4w9WgXcQ",
                title: "리모델링 예산 분배 기술",
                category: "예산 전략",
                desc: "돈을 집중해야 할 터치포인트와 아껴도 되는 품목 믹스 매치.",
                articleLink: "/magazine/the-2026-qld-renovation-budget-blueprint"
              },
              {
                id: "dQw4w9WgXcQ",
                title: "플루티드 글라스 & 오크 조합",
                category: "스타일 매치",
                desc: "태즈매니안 오크와 ribbed 유리를 결합한 프리미엄 욕실 스타일링.",
                articleLink: "/magazine/the-material-edit-fluted-glass-tasmanian-oak"
              },
              {
                id: "dQw4w9WgXcQ",
                title: "코스트홈허브가 존재하는 이유",
                category: "철학 & 미션",
                desc: "집주인과 기술자 사이의 신뢰와 투명한 정보 생태계를 만드는 첫걸음.",
                articleLink: "/about"
              }
            ].map((short, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                {/* 9:16 Aspect Ratio Iframe Container */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "9/16", background: "black", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${short.id}?rel=0&modestbranding=1`}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={short.title}
                  />
                </div>
                
                {/* Text description under the video */}
                <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 800, color: "var(--gold-light)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 2, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "Outfit, sans-serif" }}>
                      {short.category}
                    </span>
                    <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.05rem", color: "white", margin: "12px 0 6px", fontWeight: 600, lineHeight: 1.35 }}>
                      {short.title}
                    </h3>
                    <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, margin: "0 0 16px", fontFamily: "Outfit, sans-serif" }}>
                      {short.desc}
                    </p>
                  </div>
                  <Link href={short.articleLink} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 700, color: "var(--gold-light)", textDecoration: "none", fontFamily: "Outfit, sans-serif" }}>
                    매거진 칼럼 읽기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 600px) {
            .shorts-grid {
              grid-template-columns: 1fr !important;
              max-width: 320px;
              margin: 0 auto;
            }
          }
        `}} />
      </section>

      {/* ───────────────── WEEKLY NEWSLETTER ───────────────── */}
      <section style={{ background: "#0c2422", padding: "80px 24px", borderBottom: "3px double var(--sand-300)" }}>
        <div className="container-md" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, padding: "6px 14px", marginBottom: 20 }}>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Outfit, sans-serif" }}>
              ✦ Weekly Trade & Design Digest
            </span>
          </div>
          <h2 style={{ color: "white", fontSize: "clamp(1.7rem, 4vw, 2.6rem)", marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Get Vetted Advice, directly in your inbox.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 32px", fontFamily: "Outfit, sans-serif" }}>
            Subscribe to receive our latest DIY timber guides, builder insights, cost-saving checklists, and local regulatory alerts.
          </p>

          <form style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 4,
                padding: "12px 18px",
                fontSize: "0.92rem",
                color: "white",
                outline: "none",
                flex: 1,
                minWidth: 260,
                fontFamily: "Outfit, sans-serif"
              }}
            />
            <button type="submit" className="btn-gold" style={{ border: "none", borderRadius: 4, padding: "12px 28px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ───────────────── SECTION 4: OUR MISSION & PHILOSOPHY ───────────────── */}
      <section style={{ background: "#0c2422", color: "white", padding: "80px 0", borderBottom: "3px double var(--sand-300)", position: "relative", overflow: "hidden" }}>
        <div className="container-lg">
          
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 0.9fr", gap: 40, alignItems: "start" }} className="philosophy-layout-grid">
            
            {/* Left: Our Mission */}
            <div style={{ paddingRight: 16 }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--gold-light)", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontFamily: "Outfit, sans-serif" }}>
                ✦ Our Mission
              </span>
              <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 500, lineHeight: 1.15, color: "white", marginBottom: 20 }}>
                Building Trust.
                <br />
                <span style={{ color: "var(--gold-light)" }}>Building Better Homes.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 20, fontFamily: "Outfit, sans-serif" }}>
                We exist to bridge the gap between homeowners, trades and suppliers through transparent information, honest advice and a commitment to raising standards across the industry.
              </p>
              <cite style={{ display: "block", fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: 700, fontStyle: "normal", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Outfit, sans-serif" }}>
                — Founder
              </cite>
            </div>

            {/* Middle: 3 Pillars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  title: "Investing in Future Talent",
                  desc: "Supporting education and training for the next generation of building designers and trade specialists."
                },
                {
                  title: "Supporting Those Who Need It",
                  desc: "Giving back to the community by helping families and homeowners facing structural hardship."
                },
                {
                  title: "Rewarding Great Trades",
                  desc: "Recognising and rewarding local trade professionals who consistently deliver outstanding work."
                }
              ].map((p, idx) => (
                <div key={p.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: 20 }}>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.02rem", color: "var(--gold-light)", margin: "0 0 6px 0", fontWeight: 600 }}>
                    {idx + 1}. {p.title}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, margin: 0, fontFamily: "Outfit, sans-serif" }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: Founder image and script banner */}
            <div style={{ position: "relative", height: 380, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(232, 184, 75, 0.2)" }} className="philosophy-image-col">
              <Image
                src="/images/founder_portrait.png"
                alt="James Whitfield - Founder"
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
              {/* Gold script banner overlay */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(12, 36, 34, 0.95))", padding: "32px 24px", textAlign: "center" }}>
                <span style={{ fontFamily: "Lora, Georgia, serif", fontStyle: "italic", fontSize: "1.2rem", color: "var(--gold-light)", display: "block", marginBottom: 2 }}>
                  Built by Experience.
                </span>
                <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", display: "block", fontFamily: "Outfit, sans-serif" }}>
                  Driven by Purpose. CoastHomeHub
                </span>
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.15)", flexWrap: "wrap", gap: 24 }} className="stats-bar">
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }} className="stats-numbers">
              {[
                { value: "10+", label: "Years in the Industry" },
                { value: "10,000+", label: "Projects Experience" },
                { value: "500+", label: "Trusted Trades" },
                { value: "1", label: "Mission: Better Homes" },
              ].map(st => (
                <div key={st.label}>
                  <div style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--gold-light)", lineHeight: 1 }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginTop: 6, fontFamily: "Outfit, sans-serif", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Australia map strip */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "white", display: "block", fontFamily: "Outfit, sans-serif" }}>
                  Proudly Australian.
                </span>
                <span style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.5)", display: "block", fontFamily: "Outfit, sans-serif" }}>
                  Here to stay.
                </span>
              </div>
              <div style={{ fontSize: "1.8rem", color: "var(--gold-light)" }}>🇦🇺</div>
            </div>
          </div>

        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 900px) {
            .philosophy-layout-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .philosophy-image-col { height: 320px !important; }
          }
          @media (max-width: 600px) {
            .stats-bar { flex-direction: column !important; align-items: flex-start !important; }
            .stats-numbers { gap: 20px !important; }
          }
        `}} />
      </section>

      {/* ───────────────── FOR LICENSED TRADIES ───────────────── */}
      <section className="section-sm" style={{ background: "white", padding: "72px 0" }}>
        <div className="container-lg">
          <div style={{ borderRadius: 4, background: "#0c2422", border: "1px solid var(--sand-300)", padding: "52px 48px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 36, alignItems: "center", overflow: "hidden", position: "relative" }} className="tradie-band">
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, padding: "6px 14px", marginBottom: 20 }}>
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Outfit, sans-serif" }}>
                  ✦ For Licensed Tradies
                </span>
              </div>
              <h2 style={{ color: "white", fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                Warm, pre-qualified leads. Never junk.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 28, maxWidth: 500, fontFamily: "Outfit, sans-serif" }}>
                Every lead is a vetted homeowner who&apos;s already completed our detailed planner or design chat — fully scoped, photographed, and location-checked. Flat monthly membership. No commission. No bidding wars.
              </p>
              <Link href="/tradies" className="btn-gold" style={{ fontSize: "0.95rem", padding: "14px 32px", borderRadius: "4px" }}>
                List my business →
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }} className="tradie-band-stats">
              {[
                { t: "Pre-qualified", d: "AI-scoped, photographed, serious homeowners" },
                { t: "Max 3 quotes", d: "You're not racing 10 others" },
                { t: "Licensed-only", d: "A platform that protects your reputation" },
              ].map((s) => (
                <div key={s.t} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "16px 20px" }}>
                  <div style={{ fontWeight: 800, color: "white", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif" }}>✦ {s.t}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: 4, fontFamily: "Outfit, sans-serif" }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px){ .tradie-band{ grid-template-columns:1fr !important; padding: 36px 28px !important; } .tradie-band-stats { display: none !important; } }`}</style>
      </section>
    </>
  );
}

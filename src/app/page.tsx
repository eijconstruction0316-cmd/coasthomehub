import Link from "next/link";
import Image from "next/image";
import HeroInteractiveCard from "@/components/HeroInteractiveCard";
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
          background: "#0c2422",
          paddingTop: "124px",
          paddingBottom: "80px",
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
                  Australia&apos;s Trusted Home & Trade Magazine
                </span>
              </div>

              <h1 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.08, marginBottom: 24, color: "white" }}>
                Expert Advice.
                <br />
                Vetted Trades.
                <br />
                <span style={{ color: "var(--gold-light)", fontStyle: "italic", fontWeight: 400 }}>
                  Trusted Homes.
                </span>
              </h1>

              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.12rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.8, marginBottom: 40, maxWidth: 540 }}>
                Building trust between homeowners and trades through transparent builder-led guidelines, verified QBCC status verifications, and premium styling guides.
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/magazine" className="btn-gold" style={{ fontSize: "0.95rem", padding: "16px 36px", borderRadius: "4px" }}>
                  ✦ Read the Magazine
                </Link>
                <Link href="/directory" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.9)", padding: "15px 32px", borderRadius: "4px", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", border: "1px solid var(--sand-300)", transition: "var(--transition)" }} className="btn-outline-white">
                  Browse Vetted Directory
                </Link>
              </div>

              {/* Sub-Brand Strip */}
              <div style={{ display: "flex", gap: 40, marginTop: 48, paddingTop: 32, borderTop: "3px double var(--sand-300)" }} className="hero-trust">
                {[
                  { value: "100% Vetted", label: "Active QBCC Trades Only" },
                  { value: "Zero Lead Spam", label: "Max 3 Quotes Dispatched" },
                  { value: "Supplier Checked", label: "Bunnings & Laminex Partners" }
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "Lora, Georgia, serif", fontWeight: 600, fontSize: "1.35rem", color: "var(--gold-light)", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginTop: 6, fontFamily: "Outfit, sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick Planner card */}
            <div>
              <HeroInteractiveCard />
            </div>
          </div>
        </div>

        <style>{`
          .btn-outline-white:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.6) !important; }
          @media (max-width: 880px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
          @media (max-width: 520px) {
            .hero-trust { flexDirection: column !important; gap: 20px !important; }
          }
        `}</style>
      </section>

      {/* ───────────────── EDITORIAL FEATURED COLUMNS ───────────────── */}
      <section className="section" style={{ background: "white", borderBottom: "1px solid var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, borderBottom: "3px double var(--sand-300)", paddingBottom: 16 }}>
            <div>
              <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                ✦ Current Edition
              </span>
              <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.9rem", margin: 0, fontWeight: 500, color: "var(--slate-dark)" }}>
                Featured Stories & Insights
              </h2>
            </div>
            <Link href="/magazine" style={{ textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, color: "var(--ocean-600)", fontFamily: "Outfit, sans-serif" }} className="hover-arrow">
              View All Articles →
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

      {/* ───────────────── WHY COASTHOMEHUB EXISTS ───────────────── */}
      <section style={{ background: "#0d221f", color: "white", padding: "80px 0", borderBottom: "3px double var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "start" }} className="philosophy-home-grid">
            
            {/* Left: Philosophy description */}
            <div>
              <div className="badge" style={{ marginBottom: 20, display: "inline-flex", background: "rgba(255,255,255,0.06)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>
                ✦ Our Purpose
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", marginBottom: 24, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "white" }}>
                Why CoastHomeHub Exists
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 20, fontFamily: "Outfit, sans-serif" }}>
                CoastHomeHub was born from more than a decade of experience in the Australian construction industry.
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 20, fontFamily: "Outfit, sans-serif" }}>
                We saw homeowners confused by quotes, trades frustrated by misunderstandings, and great workmanship often overlooked.
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 36, fontFamily: "Outfit, sans-serif" }}>
                We created CoastHomeHub to bring transparency, trust, and practical knowledge to the people building, renovating, and improving Australian homes.
              </p>
              <Link href="/about" className="btn-gold" style={{ borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.92rem", padding: "12px 28px", textDecoration: "none" }}>
                About → Our Story
              </Link>
            </div>

            {/* Right: The 3 Pillars of EIJ/CoastHomeHub philosophy */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                {
                  title: "1. Investing in Future Talent",
                  desc: "We support education and training programs for the next generation of building designers, tilers, plumbers, and carpenters in Queensland."
                },
                {
                  title: "2. Supporting Those Who Need It",
                  desc: "We pledge to actively give back by offering design and repair coordination help to Queensland families and homeowners facing structural hardship."
                },
                {
                  title: "3. Rewarding Great Trades",
                  desc: "We build features to showcase and reward local trade professionals who consistently deliver outstanding work, safety, and client satisfaction."
                }
              ].map(p => (
                <div key={p.title} style={{ borderBottom: "1px dashed rgba(255,255,255,0.15)", paddingBottom: 20 }}>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.1rem", color: "var(--gold-light)", margin: "0 0 8px 0", fontWeight: 600 }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, margin: 0, fontFamily: "Outfit, sans-serif" }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 820px) {
            .philosophy-home-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
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

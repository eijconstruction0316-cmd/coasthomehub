"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type TradieProfile = {
  id: string;
  name: string;
  qbcc: string;
  location: string;
  rating: number;
  reviewsCount: number;
  category: string;
  suburbGroup: "Gold Coast" | "Brisbane" | "Sunshine Coast";
  image: string;
  featuredProjects: { title: string; budget: string; image: string; tag: string }[];
  b2bBenefit?: string;
  description: string;
};

const TRADIE_DATA: TradieProfile[] = [
  {
    id: "t-1",
    name: "EIJ Construction Pty Ltd",
    qbcc: "QBCC-1279144 (Active)",
    location: "Gold Coast & South Brisbane",
    rating: 4.9,
    reviewsCount: 128,
    category: "Bathroom & Kitchen Renovation",
    suburbGroup: "Gold Coast",
    image: "/images/luxury_kitchen.png",
    b2bBenefit: "🎁 Elite Sponsor: 10% Off Reece & Laminex materials",
    description: "Specializing in high-end coastal modern home renovations. Full design-to-build service with complete project management, certified waterproofing, and custom finishes.",
    featuredProjects: [
      { title: "Noosa Servery Window Kitchen", budget: "$48,000", image: "/images/noosa_servery_window.png", tag: "Laminex Organic Ash" },
      { title: "Burleigh Heads Organic Bathroom", budget: "$22,000", image: "/images/modern_bathroom_after.png", tag: "Reece Brushed Brass" }
    ]
  },
  {
    id: "t-2",
    name: "Noosa Coastal Carpentry & Decks",
    qbcc: "QBCC-1530291 (Active)",
    location: "Sunshine Coast & Noosa",
    rating: 4.85,
    reviewsCount: 64,
    category: "Decking & General Build",
    suburbGroup: "Sunshine Coast",
    image: "/images/outdoor_living.png",
    b2bBenefit: "🎁 Partner: 5% Off Colorbond & Osmo products",
    description: "Premium timber framing, outdoor decks, pergolas, and cladding installations. Built to withstand QLD coastal weather using premium local materials.",
    featuredProjects: [
      { title: "The Resort Alfresco Pool Deck", budget: "$32,000", image: "/images/outdoor_living.png", tag: "Osmo Timber Protection" }
    ]
  },
  {
    id: "t-3",
    name: "Paddington Tiling & Waterproofing",
    qbcc: "QBCC-1102941 (Active)",
    location: "Brisbane CBD & West Brisbane",
    rating: 4.95,
    reviewsCount: 92,
    category: "Bathroom & Tiling",
    suburbGroup: "Brisbane",
    image: "/images/modern_bathroom_after.png",
    b2bBenefit: "🎁 Partner: 5% Off Beaumont Tiles range",
    description: "High-precision tiling and wet area waterproofing complying strictly with AS 3740 standards. Specialists in stone, porcelain, and custom mosaic work.",
    featuredProjects: [
      { title: "Paddington Heritage Bathroom", budget: "$19,500", image: "/images/modern_bathroom_after.png", tag: "Beaumont Stone Tiles" }
    ]
  },
  {
    id: "t-4",
    name: "Gold Coast Balustrades & Glass",
    qbcc: "QBCC-1309482 (Active)",
    location: "Gold Coast & Tweed Heads",
    rating: 4.7,
    reviewsCount: 45,
    category: "Subcontractor",
    suburbGroup: "Gold Coast",
    image: "/images/brushed_brass_macro.png",
    description: "Frameless glass pool fencing, shower screens, and architectural balustrades. Safe-harbor verified glass components complying with AS 1288.",
    featuredProjects: [
      { title: "Safety Fluted Glass Shower Screen", budget: "$6,800", image: "/images/waterproofing_detail.png", tag: "Fluted Toughened Glass" }
    ]
  }
];

export default function DirectoryPage() {
  const [selectedSuburb, setSelectedSuburb] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [quoteSuccessId, setQuoteSuccessId] = useState<string | null>(null);

  const filteredTradies = TRADIE_DATA.filter((t) => {
    const matchesSuburb = selectedSuburb === "All" || t.suburbGroup === selectedSuburb;
    const matchesCategory =
      selectedCategory === "All" ||
      t.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSuburb && matchesCategory;
  });

  const handleRequestQuote = (id: string, name: string) => {
    setQuoteSuccessId(id);
    setTimeout(() => {
      setQuoteSuccessId(null);
      alert(`Quote request successfully dispatched to ${name}! Our AI system will coordinate the project scope.`);
    }, 2000);
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{ background: "linear-gradient(160deg, var(--slate-dark) 0%, var(--slate-mid) 100%)", paddingTop: 130, paddingBottom: 64, color: "white", textAlign: "center" }}>
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.1)", color: "var(--ocean-300)" }}>
            Verified Partner Directory
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 14 }}>Find Verified QLD Renovation Partners</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", maxWidth: 640, margin: "0 auto" }}>
            Every partner is QBCC licence verified. Explore their portfolios, material options, and B2B trade discount benefits.
          </p>
        </div>
      </section>

      {/* Main Directory Area */}
      <section style={{ background: "var(--off-white)", padding: "48px 0 96px" }}>
        <div className="container-lg">
          
          {/* Filters Bar */}
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius-lg)",
              padding: "20px 24px",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--sand-200)",
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: 36,
            }}
          >
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Service Region
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {["All", "Gold Coast", "Brisbane", "Sunshine Coast"].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedSuburb(reg)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 50,
                      border: selectedSuburb === reg ? "2px solid var(--ocean-500)" : "1px solid var(--sand-300)",
                      background: selectedSuburb === reg ? "var(--ocean-50)" : "white",
                      color: selectedSuburb === reg ? "var(--ocean-700)" : "var(--slate-mid)",
                      fontWeight: selectedSuburb === reg ? 700 : 400,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderLeft: "1px solid var(--sand-300)", height: 40, alignSelf: "center" }} className="filter-divider" />

            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Trade Category
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {["All", "Renovation", "Decking", "Tiling"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 50,
                      border: selectedCategory === cat ? "2px solid var(--gold)" : "1px solid var(--sand-300)",
                      background: selectedCategory === cat ? "#fef9f0" : "white",
                      color: selectedCategory === cat ? "var(--gold)" : "var(--slate-mid)",
                      fontWeight: selectedCategory === cat ? 700 : 400,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tradie List Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {filteredTradies.length > 0 ? (
              filteredTradies.map((tradie) => (
                <div
                  key={tradie.id}
                  style={{
                    background: "white",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--sand-200)",
                    boxShadow: "var(--shadow-md)",
                    padding: 32,
                    display: "grid",
                    gridTemplateColumns: "1fr 340px",
                    gap: 32,
                  }}
                  className="directory-card-grid"
                >
                  {/* Left Column: Profile & Portfolio */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span style={{ background: "rgba(34,197,94,0.1)", color: "#15803d", fontSize: "0.75rem", fontWeight: 800, padding: "4px 12px", borderRadius: 50 }}>
                        🛡️ QBCC License Verified
                      </span>
                      <span style={{ fontSize: "0.78rem", color: "var(--slate-light)" }}>{tradie.qbcc}</span>
                    </div>

                    <h2 style={{ fontSize: "1.45rem", color: "var(--slate-dark)", marginBottom: 4 }}>{tradie.name}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                      <span style={{ color: "#f59e0b", fontSize: "1rem" }}>★</span>
                      <strong style={{ fontSize: "0.875rem", color: "var(--slate-dark)" }}>{tradie.rating}</strong>
                      <span style={{ color: "var(--slate-light)", fontSize: "0.82rem" }}>({tradie.reviewsCount} reviews)</span>
                      <span style={{ color: "var(--sand-300)" }}>•</span>
                      <span style={{ fontSize: "0.82rem", color: "var(--slate-light)" }}>📍 {tradie.location}</span>
                    </div>

                    <p style={{ color: "var(--slate-mid)", fontSize: "0.93rem", lineHeight: 1.65, marginBottom: 24 }}>
                      {tradie.description}
                    </p>

                    {tradie.b2bBenefit && (
                      <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: 12, padding: "14px 18px", marginBottom: 24, display: "inline-block" }}>
                        <span style={{ fontSize: "0.85rem", color: "var(--ocean-700)", fontWeight: 700 }}>
                          {tradie.b2bBenefit}
                        </span>
                      </div>
                    )}

                    {/* Featured Portfolios */}
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 12, letterSpacing: "0.05em" }}>
                        Featured Work & Material Tags (Archipro-style)
                      </span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {tradie.featuredProjects.map((proj) => (
                          <div key={proj.title} style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: 14, overflow: "hidden" }}>
                            <div style={{ position: "relative", height: 120, width: "100%" }}>
                              <Image src={proj.image} alt={proj.title} fill style={{ objectFit: "cover" }} unoptimized />
                            </div>
                            <div style={{ padding: 12 }}>
                              <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--slate-dark)", margin: "0 0 4px" }}>{proj.title}</h4>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "0.72rem", background: "white", border: "1px solid var(--sand-300)", padding: "2px 8px", borderRadius: 50, color: "var(--ocean-600)", fontWeight: 700 }}>
                                  🏷️ {proj.tag}
                                </span>
                                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--gold)" }}>{proj.budget}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Actions Sidebar */}
                  <div
                    style={{
                      borderLeft: "1px solid var(--sand-200)",
                      paddingLeft: 32,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    className="directory-card-sidebar"
                  >
                    <div style={{ width: 64, height: 64, background: "var(--ocean-50)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", marginBottom: 16, color: "var(--ocean-500)" }}>
                      ✉️
                    </div>
                    <h3 style={{ fontSize: "1rem", color: "var(--slate-dark)", marginBottom: 8 }}>Ready to discuss your project?</h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--slate-light)", lineHeight: 1.5, marginBottom: 20 }}>
                      Send an AI-scoped brief directly to {tradie.name} to receive a priority quote.
                    </p>
                    <button
                      onClick={() => handleRequestQuote(tradie.id, tradie.name)}
                      disabled={quoteSuccessId === tradie.id}
                      style={{
                        width: "100%",
                        padding: "12px 24px",
                        background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))",
                        border: "none",
                        borderRadius: "50px",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(31,122,114,0.2)",
                        transition: "var(--transition)",
                      }}
                    >
                      {quoteSuccessId === tradie.id ? "⏳ Connecting..." : "Direct Quote Request"}
                    </button>
                    
                    <span style={{ fontSize: "0.7rem", color: "var(--slate-light)", marginTop: 12 }}>
                      No commission fees. Direct contract with build partner.
                    </span>
                  </div>

                </div>
              ))
            ) : (
              <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px dashed var(--sand-300)", padding: "48px", textAlign: "center" }}>
                <span style={{ fontSize: "2rem" }}>🔍</span>
                <h3 style={{ fontSize: "1.1rem", color: "var(--slate-dark)", margin: "12px 0 6px" }}>No build partners found</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--slate-light)", margin: 0 }}>Try clearing your filters or selecting a different service region.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Directory CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-400))", padding: "80px 0", color: "white", textAlign: "center" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12 }}>Are you a licensed QLD building contractor?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            Join our premium partner directory. Feature your portfolio, tag your suppliers, and receive pre-qualified, non-commission leads.
          </p>
          <Link href="/tradies" className="btn-gold" id="directory-cta-hub">
            🔧 Learn More & Register
          </Link>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) {
          .directory-card-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .directory-card-sidebar {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--sand-200) !important;
            padding-top: 24px !important;
          }
          .filter-divider {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}

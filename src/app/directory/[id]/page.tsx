"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";

type Project = {
  title: string;
  budget: string;
  image: string;
  tag: string;
  desc: string;
};

type Review = {
  author: string;
  suburb: string;
  rating: number;
  text: string;
  date: string;
};

type TradieData = {
  id: string;
  name: string;
  qbcc: string;
  location: string;
  rating: number;
  reviewsCount: number;
  category: string;
  b2bBenefit?: string;
  description: string;
  longDescription: string;
  insurance: string;
  projects: Project[];
  reviews: Review[];
};

const TRADIE_DIRECTORY_STORE: Record<string, TradieData> = {
  "t-1": {
    id: "t-1",
    name: "EIJ Construction Pty Ltd",
    qbcc: "QBCC-1279144 (Active Builder Licence)",
    location: "Gold Coast & South Brisbane",
    rating: 4.9,
    reviewsCount: 128,
    category: "Bathroom & Kitchen Renovation",
    b2bBenefit: "🎁 Elite Sponsor: 10% Off Reece & Laminex materials",
    insurance: "Public Liability ($20M) & WorkCover QLD Protected",
    description: "Specializing in high-end coastal modern home renovations. Full design-to-build service with complete project management, certified waterproofing, and custom finishes.",
    longDescription: "Founded by licensed QLD builders, EIJ Construction delivers architectural-grade residential construction across South East Queensland. We manage the entire build pipeline — from structural wall removal to fine internal joinery. By partnering with premium suppliers, we provide our clients with direct access to wholesale pricing on designer fittings, backed by complete home warranty insurance protection.",
    projects: [
      { title: "Noosa Servery Window Kitchen", budget: "$48,000", image: "/images/noosa_servery_window.png", tag: "Laminex Organic Ash Joinery", desc: "Open plan redesign highlighting indoor-outdoor flow via custom structural bifold windows." },
      { title: "Burleigh Heads Organic Bathroom", budget: "$22,000", image: "/images/modern_bathroom_after.png", tag: "Reece Mizu Brushed Brass", desc: "Completed wet area overhaul featuring floating oak vanity, custom waterproofing, and terrazzo." }
    ],
    reviews: [
      { author: "Sarah M.", suburb: "Burleigh Heads", rating: 5, text: "The team at EIJ were outstanding. They handled our bathroom waterproofing strictly to AS 3740 and helped us get a 10% discount on all Reece fixtures. Highly recommended!", date: "2026-05-12" },
      { author: "Tom R.", suburb: "Robina", rating: 5, text: "Excellent craftsmanship on our open plan kitchen. Vetted and licensed, which gave us absolute peace of mind during the structural wall removal process.", date: "2026-04-28" }
    ]
  },
  "t-2": {
    id: "t-2",
    name: "Noosa Coastal Carpentry & Decks",
    qbcc: "QBCC-1530291 (Active Carpentry Licence)",
    location: "Sunshine Coast & Noosa",
    rating: 4.85,
    reviewsCount: 64,
    category: "Decking & General Build",
    b2bBenefit: "🎁 Partner: 5% Off Colorbond & Osmo products",
    insurance: "Public Liability ($10M) Vetted",
    description: "Premium timber framing, outdoor decks, pergolas, and cladding installations. Built to withstand QLD coastal weather using premium local materials.",
    longDescription: "We specialize in extending your coastal living outdoors. From bespoke structural timber decks to modern pool pergolas, our materials are selected for longevity and local environmental resilience. Our team is QBCC certified, ensuring all load-bearing carpentry complies with standard structural codes.",
    projects: [
      { title: "The Resort Alfresco Pool Deck", budget: "$32,000", image: "/images/outdoor_living.png", tag: "Osmo Timber Protection Oil", desc: "Premium composite deck with safety pool balustrades and custom structural seating integration." }
    ],
    reviews: [
      { author: "Lisa K.", suburb: "Noosa", rating: 5, text: "Amazing job on our pool deck. The Osmo UV oil finish looks spectacular. They cleaned up daily and worked super efficiently.", date: "2026-06-02" }
    ]
  },
  "t-3": {
    id: "t-3",
    name: "Paddington Tiling & Waterproofing",
    qbcc: "QBCC-1102941 (Active Tiling Licence)",
    location: "Brisbane CBD & West Brisbane",
    rating: 4.95,
    reviewsCount: 92,
    category: "Bathroom & Tiling",
    b2bBenefit: "🎁 Partner: 5% Off Beaumont Tiles range",
    insurance: "Public Liability ($10M) & Professional Indemnity Vetted",
    description: "High-precision tiling and wet area waterproofing complying strictly with AS 3740 standards. Specialists in stone, porcelain, and custom mosaic work.",
    longDescription: "Tiling is the most critical aesthetic and structural point of any bathroom. We specialize in preventing leaks and ensuring laser-accurate tile layouts. Fully licensed and certified waterproofing guarantees your statutory home warranty remains intact for 6.5 years.",
    projects: [
      { title: "Paddington Heritage Bathroom", budget: "$19,500", image: "/images/modern_bathroom_after.png", tag: "Beaumont Stone Tiles", desc: "Traditional heritage bathroom layout updated with modern porcelain tile sheets and linear drainage." }
    ],
    reviews: [
      { author: "Dave H.", suburb: "Paddington", rating: 5, text: "Vance and his crew are master tilers. The lines are perfect, and the waterproofing documentation was supplied promptly for our building certifier.", date: "2026-05-19" }
    ]
  }
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function TradieDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const tradieId = resolvedParams.id;
  const tradie = TRADIE_DIRECTORY_STORE[tradieId] || TRADIE_DIRECTORY_STORE["t-1"];

  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setQuoteForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Header Bar */}
      <section style={{ background: "linear-gradient(160deg, #0a1f1e 0%, #155e58 100%)", paddingTop: 128, paddingBottom: 48, color: "white" }}>
        <div className="container-lg">
          <div style={{ display: "flex", gap: 8, fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
            <Link href="/directory" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Directory</Link>
            <span>/</span>
            <span>{tradie.name}</span>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
            <span style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", padding: "4px 14px", borderRadius: 50, fontSize: "0.78rem", fontWeight: 800 }}>
              🛡️ QBCC LICENCE ACTIVE
            </span>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>{tradie.qbcc}</span>
          </div>

          <h1 style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 10px" }}>{tradie.name}</h1>
          
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", fontSize: "0.95rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#f59e0b" }}>★</span>
              <strong style={{ color: "white" }}>{tradie.rating}</strong>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>({tradie.reviewsCount} reviews)</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
            <span>📍 {tradie.location}</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
            <span style={{ color: "var(--gold-light)", fontWeight: 700 }}>🛡️ {tradie.insurance}</span>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="container-lg detail-grid-wrap" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
        
        {/* Left Column: Portfolios & Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          
          {/* About section */}
          <div style={{ background: "white", padding: 32, borderRadius: "var(--radius-xl)", border: "1px solid var(--sand-200)", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--slate-dark)", marginBottom: 12, fontWeight: 800 }}>About Our Business</h3>
            <p style={{ color: "var(--slate-mid)", fontSize: "0.98rem", lineHeight: 1.75, margin: 0 }}>
              {tradie.longDescription}
            </p>
          </div>

          {/* B2B Partner benefits */}
          {tradie.b2bBenefit && (
            <div style={{ background: "linear-gradient(135deg, var(--ocean-50) 0%, #fef9f0 100%)", border: "1px solid var(--ocean-150)", padding: 24, borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: "2.2rem" }}>🎁</div>
              <div>
                <h4 style={{ color: "var(--ocean-700)", fontSize: "1rem", margin: "0 0 4px", fontWeight: 800 }}>Exclusive B2B Material Discount</h4>
                <p style={{ color: "var(--slate-mid)", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
                  Homeowners working with {tradie.name} qualify for direct wholesale trade discounts at our sponsor depots. Tagged items will be invoiced with an instant {tradie.name} discount code.
                </p>
              </div>
            </div>
          )}

          {/* Portfolios section */}
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "var(--slate-dark)", marginBottom: 20, fontWeight: 800 }}>Featured Projects & Spec Sheets</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {tradie.projects.map((proj, idx) => (
                <div key={idx} style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "grid", gridTemplateColumns: "240px 1fr", gap: 24 }} className="project-sub-grid">
                  <div style={{ position: "relative", minHeight: 180, width: "100%" }}>
                    <Image src={proj.image} alt={proj.title} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div style={{ padding: "20px 24px 20px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="project-sub-content">
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <h4 style={{ fontSize: "1.1rem", color: "var(--slate-dark)", fontWeight: 800, margin: 0 }}>{proj.title}</h4>
                        <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--gold)" }}>{proj.budget}</span>
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "var(--slate-light)", lineHeight: 1.6, margin: "0 0 12px" }}>{proj.desc}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.72rem", background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: "4px 12px", borderRadius: 50, color: "var(--ocean-600)", fontWeight: 700 }}>
                        📍 Featured Materials: {proj.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews section */}
          <div style={{ background: "white", padding: 32, borderRadius: "var(--radius-xl)", border: "1px solid var(--sand-200)", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--slate-dark)", marginBottom: 20, fontWeight: 800 }}>Verified Customer Reviews</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {tradie.reviews.map((rev, idx) => (
                <div key={idx} style={{ borderBottom: idx < tradie.reviews.length - 1 ? "1px solid var(--sand-200)" : "none", paddingBottom: idx < tradie.reviews.length - 1 ? 20 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div>
                      <strong style={{ color: "var(--slate-dark)", fontSize: "0.9rem" }}>{rev.author}</strong>
                      <span style={{ fontSize: "0.78rem", color: "var(--slate-light)" }}> · Suburb: {rev.suburb}</span>
                    </div>
                    <span style={{ fontSize: "0.78rem", color: "var(--slate-light)" }}>{rev.date}</span>
                  </div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} style={{ color: "#f59e0b", fontSize: "0.85rem" }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: "var(--slate-mid)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Direct Messaging & Verification Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Direct Quote Request Form */}
          <div style={{ background: "white", padding: 28, borderRadius: "var(--radius-xl)", border: "1px solid var(--sand-200)", boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--slate-dark)", marginBottom: 4, fontWeight: 800 }}>Direct Quote Request</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--slate-light)", marginBottom: 20, lineHeight: 1.5 }}>
              Send your renovation details directly to {tradie.name}. We will match it with your AI Scoped Planner files.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--slate-dark)", display: "block", marginBottom: 6 }} htmlFor="name">NAME *</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Peter Kim"
                  value={quoteForm.name}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--sand-300)", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--slate-dark)", display: "block", marginBottom: 6 }} htmlFor="email">EMAIL ADDRESS *</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="peter@example.com"
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--sand-300)", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--slate-dark)", display: "block", marginBottom: 6 }} htmlFor="phone">PHONE NUMBER *</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="04XX XXX XXX"
                  value={quoteForm.phone}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, phone: e.target.value }))}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--sand-300)", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--slate-dark)", display: "block", marginBottom: 6 }} htmlFor="message">PROJECT DETAILS *</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell EIJ Construction about your renovation scope, timeline, and material goals..."
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, message: e.target.value }))}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--sand-300)", fontSize: "0.85rem", resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))",
                  border: "none",
                  borderRadius: 50,
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(31,122,114,0.25)",
                }}
              >
                {submitting ? "⏳ Connecting..." : "Send Direct Quote Request"}
              </button>

              {success && (
                <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: 8, padding: 12, fontSize: "0.78rem", color: "var(--ocean-700)", textAlign: "center" }}>
                  ✔ Quote proposal successfully submitted!
                </div>
              )}
            </form>
          </div>

          {/* Compliance & QBCC Guarantee info */}
          <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: "var(--radius-xl)", padding: 24 }}>
            <h4 style={{ fontSize: "0.85rem", color: "var(--slate-dark)", fontWeight: 800, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              🛡️ Platform Safe-Harbor
            </h4>
            <ul style={{ paddingLeft: 16, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: "0.78rem", color: "var(--slate-mid)" }}>
              <li><strong>QBCC Insured:</strong> Projects over $3,300 are protected by QLD Home Warranty Insurance.</li>
              <li><strong>No Extra Fees:</strong> 100% free for homeowners. We never take a percentage of the contract.</li>
              <li><strong>Direct Contracts:</strong> Contract strictly binding between builder and consumer under QLD state law.</li>
            </ul>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .detail-grid-wrap {
            grid-template-columns: 1fr !important;
          }
          .project-sub-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .project-sub-content {
            padding: 0 20px 20px 20px !important;
          }
        }
      `}} />
    </div>
  );
}

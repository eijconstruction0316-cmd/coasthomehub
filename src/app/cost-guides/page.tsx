"use client";

import React, { useState } from "react";
import Link from "next/link";

const COST_CATEGORIES = {
  bathroom: {
    title: "Bathroom Renovation Costs (QLD 2026)",
    tagline: "Average prices for a standard 6sqm master bathroom bathroom in South East QLD.",
    table: [
      { item: "Demolition & Site Cleanup", budget: "$1,500 - $2,500", premium: "$3,000 - $4,500", desc: "Removing old tiles, wall sheets, bath, and debris disposal." },
      { item: "Plumbing Rough-in & Fit-off", budget: "$2,200 - $3,500", premium: "$4,000 - $6,500", desc: "Moving outlets, pipe installations, and final tapware fitting." },
      { item: "AS 3740 Certified Waterproofing", budget: "$1,200 - $1,800", premium: "$2,000 - $3,000", desc: "Critical wet area sealing. Required for certifier sign-off." },
      { item: "Tiling & Grouting (Labor)", budget: "$3,500 - $5,500", premium: "$6,000 - $9,500", desc: "Laying porcelain or ceramic sheets. Premium includes mosaics." },
      { item: "Vanity, Shower Screen & Fittings", budget: "$2,500 - $4,500", premium: "$6,500 - $12,000", desc: "Fixtures, glass screen, toilet suite, bathtub, and mixers." }
    ],
    totals: { budget: "$12,000 - $17,800", mid: "$18,000 - $27,500", luxury: "$28,000 - $45,000+" }
  },
  kitchen: {
    title: "Kitchen Renovation Costs (QLD 2026)",
    tagline: "Average prices based on a medium U-shape or open island kitchen layout.",
    table: [
      { item: "Demolition & Structural Prep", budget: "$2,000 - $3,500", premium: "$4,500 - $8,000", desc: "Stripping cabinetry. Premium includes minor non-load wall removal." },
      { item: "Custom Cabinetry & Joinery", budget: "$8,000 - $14,000", premium: "$16,500 - $28,000", desc: "Flat-pack vs custom floor/wall cupboards, pantry, soft-close." },
      { item: "Benchtop Fabrication & Install", budget: "$3,000 - $5,500", premium: "$7,000 - $15,000", desc: "Laminate vs Engineered Stone (20mm) vs Premium Quartzite." },
      { item: "Electrical, Lighting & Plumbing", budget: "$1,800 - $2,800", premium: "$3,500 - $6,000", desc: "Powerpoint rough-in, LED strip lighting, sink plumbing hookup." },
      { item: "Appliances & Backsplash", budget: "$2,500 - $5,000", premium: "$7,500 - $18,000+", desc: "Cooktop, oven, rangehood, dishwasher, and splashback tiles." }
    ],
    totals: { budget: "$19,500 - $29,000", mid: "$30,000 - $52,000", luxury: "$55,000 - $85,000+" }
  },
  decking: {
    title: "Timber Decking & Alfresco Costs (QLD 2026)",
    tagline: "Prices based on a ground-level 24sqm deck and structural louvre pergolas.",
    table: [
      { item: "Subframe Timber & Footings", budget: "$2,200 - $3,500", premium: "$4,000 - $6,000", desc: "Excavation, concrete stumps, treated pine bearers and joists." },
      { item: "Decking Boards (Material)", budget: "$3,500 - $5,800", premium: "$7,000 - $12,500", desc: "Treated Pine vs Merbau vs Premium Composite (ModWood/Ekodeck)." },
      { item: "Architectural Pergola Frame", budget: "$4,000 - $7,500", premium: "$9,000 - $18,000", desc: "Standard timber frame vs powdercoated Colorbond louvre roof." },
      { item: "Labor, Fixing & Coating", budget: "$3,000 - $5,000", premium: "$6,000 - $9,500", desc: "Board installation, hidden fasteners, and UV timber oil seal." }
    ],
    totals: { budget: "$11,500 - $16,000", mid: "$17,000 - $28,500", luxury: "$29,000 - $50,000+" }
  }
};

export default function CostGuidesPage() {
  const [activeCategory, setActiveCategory] = useState<"bathroom" | "kitchen" | "decking">("bathroom");
  const data = COST_CATEGORIES[activeCategory];

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Hero */}
      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", paddingTop: 130, paddingBottom: 64, color: "white", textAlign: "center" }}>
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.05)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>
            SE QLD Renovation Cost Guides
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 14, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>Know Your Renovation Budget</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", maxWidth: 640, margin: "0 auto", fontFamily: "Outfit, sans-serif" }}>
            Explore itemized construction cost breakdowns based on 2026 QBCC labor indexes and QLD safety regulations.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="container-lg guide-layout" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "280px 1fr", gap: 32 }}>
        
        {/* Left Side: Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 6, letterSpacing: "0.05em", fontFamily: "Outfit, sans-serif" }}>
            Select Project Type
          </span>
          {[
            { id: "bathroom", label: "Bathroom Renovation" },
            { id: "kitchen", label: "Kitchen Renovation" },
            { id: "decking", label: "Decking & Alfresco" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as "bathroom" | "kitchen" | "decking")}
              style={{
                padding: "16px 20px",
                borderRadius: 4,
                border: "1px solid var(--sand-300)",
                background: activeCategory === cat.id ? "var(--ocean-600)" : "white",
                color: activeCategory === cat.id ? "white" : "var(--slate-mid)",
                fontWeight: 700,
                fontSize: "0.92rem",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.2s ease",
                fontFamily: "Outfit, sans-serif"
              }}
            >
              {activeCategory === cat.id ? "✦ " : ""}{cat.label}
            </button>
          ))}

          {/* AI Banner Sidebar */}
          <div style={{ background: "var(--ocean-700)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, color: "white", marginTop: 20 }}>
            <h4 style={{ color: "white", fontSize: "0.95rem", marginBottom: 8, fontWeight: 800, fontFamily: "Lora, Georgia, serif" }}>✦ Need Custom Budgeting?</h4>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 16, fontFamily: "Outfit, sans-serif" }}>
              Upload your own room photos. Our AI will analyze sizes, extract materials, and output a detailed PDF budget pack.
            </p>
            <Link href="/quote" className="btn-gold" style={{ display: "block", textAlign: "center", fontSize: "0.82rem", padding: "10px", borderRadius: 4 }} id="cost-guide-ai-cta">
              Start AI Planner →
            </Link>
          </div>
        </div>

        {/* Right Side: Detailed Cost Guide */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          
          {/* Main cost sheet */}
          <div style={{ background: "white", padding: 32, borderRadius: 4, border: "1px solid var(--sand-300)", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontSize: "1.6rem", color: "var(--slate-dark)", marginBottom: 6, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>{data.title}</h2>
            <p style={{ color: "var(--slate-mid)", fontSize: "0.92rem", marginBottom: 24, fontFamily: "Outfit, sans-serif" }}>{data.tagline}</p>

            {/* Total Tiers Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[
                { tier: "Budget / DIY Finish", val: data.totals.budget, bg: "var(--sand-50)", border: "var(--sand-300)", color: "var(--slate-dark)" },
                { tier: "Mid-Range Tradesman", val: data.totals.mid, bg: "var(--ocean-50)", border: "var(--ocean-200)", color: "var(--ocean-700)" },
                { tier: "Architectural Custom", val: data.totals.luxury, bg: "#fef9f0", border: "var(--sand-300)", color: "#92650a" }
              ].map((t) => (
                <div key={t.tier} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: 4, padding: "16px 20px" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block", fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>{t.tier}</span>
                  <strong style={{ fontSize: "1.2rem", color: t.color, fontWeight: 700, display: "block", marginTop: 4, fontFamily: "Lora, Georgia, serif" }}>{t.val}</strong>
                </div>
              ))}
            </div>

            {/* Detailed Itemized Table */}
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 12, letterSpacing: "0.05em", fontFamily: "Outfit, sans-serif" }}>
                Itemized Cost Breakdown (Including Labor & GST)
              </span>
              <div style={{ border: "1px solid var(--sand-300)", borderRadius: 4, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left", fontFamily: "Outfit, sans-serif" }}>
                  <thead>
                    <tr style={{ background: "var(--sand-50)", borderBottom: "1px solid var(--sand-300)" }}>
                      <th style={{ padding: "12px 16px", minWidth: 160, fontWeight: 700 }}>Work Component</th>
                      <th style={{ padding: "12px 16px", fontWeight: 700 }}>Standard Cost</th>
                      <th style={{ padding: "12px 16px", fontWeight: 700 }}>High-End Cost</th>
                      <th style={{ padding: "12px 16px", fontWeight: 700 }}>Scope Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.table.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--sand-150)", background: idx % 2 === 0 ? "white" : "var(--off-white)" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--slate-dark)", fontFamily: "Lora, Georgia, serif" }}>{row.item}</td>
                        <td style={{ padding: "14px 16px", color: "var(--slate-mid)" }}>{row.budget}</td>
                        <td style={{ padding: "14px 16px", color: "var(--gold)", fontWeight: 700 }}>{row.premium}</td>
                        <td style={{ padding: "14px 16px", color: "var(--slate-light)", fontSize: "0.8rem", lineHeight: 1.5 }}>{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* compliance standards details (WOW content) */}
          <div style={{ background: "white", padding: 32, borderRadius: 4, border: "1px solid var(--sand-300)", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--slate-dark)", marginBottom: 16, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>✦ Critical QLD Construction Compliance</h3>
            <p style={{ color: "var(--slate-mid)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: 20, fontFamily: "Outfit, sans-serif" }}>
              Under Queensland legislation, certain waterproofing and glazing works carry severe penalties if not performed by a licensed QBCC contractor. Keep these standards in check to protect your warranty:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="compliance-grid">
              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", padding: 20, borderRadius: 4 }}>
                <h4 style={{ color: "var(--ocean-700)", fontSize: "0.95rem", fontWeight: 800, marginBottom: 8, fontFamily: "Lora, Georgia, serif" }}>✦ AS 3740 Waterproofing Standards</h4>
                <ul style={{ paddingLeft: 16, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", color: "var(--slate-mid)", lineHeight: 1.5, fontFamily: "Outfit, sans-serif" }}>
                  <li>Shower floors must be fully waterproofed with membranes extending 150mm up the walls.</li>
                  <li>All junctions (wall-to-floor, wall-to-wall) must have flexible bond breakers installed.</li>
                  <li>A certificate of compliance (Form 16) is mandatory upon completion for certifier sign-off.</li>
                </ul>
              </div>

              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", padding: 20, borderRadius: 4 }}>
                <h4 style={{ color: "var(--gold)", fontSize: "0.95rem", fontWeight: 800, marginBottom: 8, fontFamily: "Lora, Georgia, serif" }}>✦ AS 1288 Glazing & Safety Codes</h4>
                <ul style={{ paddingLeft: 16, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", color: "var(--slate-mid)", lineHeight: 1.5, fontFamily: "Outfit, sans-serif" }}>
                  <li>All glass panels in wet areas must use Grade A toughened safety glass (minimum 6mm thickness).</li>
                  <li>Frameless shower screen hinges and structural brackets must be anchor-fixed to timber studs.</li>
                  <li>Incorrect glazing void warranty cover and can cause severe liability in rental properties.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Directory CTA Card */}
          <div style={{ background: "var(--ocean-700)", border: "1px solid var(--sand-300)", padding: "40px", borderRadius: 4, color: "white", textAlign: "center" }}>
            <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: 12, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>Ready to get accurate local quotes?</h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", maxWidth: 520, margin: "0 auto 28px", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>
              Don&apos;t risk waterproofing or structural defects. Find local, QBCC-licensed building and tiling partners in our verified directory.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/directory" className="btn-gold" style={{ padding: "12px 30px", borderRadius: 4 }} id="cost-guide-directory-cta">
                ✦ Browse Verified Partners
              </Link>
              <Link href="/quote" style={{ display: "inline-flex", alignItems: "center", padding: "12px 28px", borderRadius: 4, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", color: "white", border: "1px solid rgba(255,255,255,0.3)" }} id="cost-guide-planner-cta">
                Start AI Design
              </Link>
            </div>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 820px) {
          .guide-layout {
            grid-template-columns: 1fr !important;
          }
          .compliance-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}

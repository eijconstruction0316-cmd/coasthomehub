"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DeckPlannerPage() {
  const [length, setLength] = useState(6.0);
  const [width, setWidth] = useState(4.0);
  const [material, setMaterial] = useState<"pine" | "merbau" | "composite">("merbau");
  const [clearance, setClearance] = useState<"low" | "mid" | "high">("low");
  const [includePergola, setIncludePergola] = useState(true);
  const [includeBalustrade, setIncludeBalustrade] = useState(false);

  // Math
  const area = length * width;
  const perimeter = (length + width) * 2;

  // Rate parameters
  const materialRates = { pine: 45, merbau: 85, composite: 140 }[material];
  const subframeRates = { low: 60, mid: 90, high: 150 }[clearance];
  const laborRates = { pine: 80, merbau: 120, composite: 110 }[material];

  // Calculations
  const costSubframe = area * subframeRates;
  const costPlanks = area * materialRates;
  const costLabor = area * laborRates;
  
  const costPergola = includePergola ? area * 180 : 0;
  const costBalustrades = includeBalustrade ? perimeter * 150 : 0;

  const subtotal = costSubframe + costPlanks + costLabor + costPergola + costBalustrades;
  const gst = subtotal * 0.1;
  const totalCost = subtotal + gst;

  // Oiling warning message
  const maintenanceGuide = material === "composite"
    ? "✦ Composite Maintenance: No oiling required! Clean twice annually with mild soapy water to remove dust/spill stains."
    : "⚠️ Hardwood Maintenance: Requires annual sanding and application of UV-Protection Decking Oil (approx $180/year in supplies).";

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Header */}
      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", paddingTop: 130, paddingBottom: 48, color: "white" }}>
        <div className="container-lg">
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>&gt;</span>
            <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>Tools</Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>&gt;</span>
            <span style={{ color: "var(--gold-light)", fontSize: "0.8rem" }}>Deck Planner</span>
          </div>

          <h1 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.5rem)", margin: 0, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            AI Timber Deck &amp; Pergola Planner
          </h1>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="container-lg planner-layout" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 440px", gap: 32 }}>
        {/* Left Side: Inputs */}
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 32, boxShadow: "var(--shadow-sm)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--slate-dark)", marginBottom: 24, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>
            Deck Area &amp; Materials
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Length slider */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                <label htmlFor="length">Deck Length</label>
                <span style={{ color: "var(--ocean-700)" }}>{length.toFixed(1)} m</span>
              </div>
              <input
                id="length"
                type="range"
                min="2.0"
                max="12.0"
                step="0.5"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "var(--ocean-700)" }}
              />
            </div>

            {/* Width slider */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                <label htmlFor="width">Deck Width</label>
                <span style={{ color: "var(--ocean-700)" }}>{width.toFixed(1)} m</span>
              </div>
              <input
                id="width"
                type="range"
                min="2.0"
                max="8.0"
                step="0.5"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "var(--ocean-700)" }}
              />
            </div>

            {/* Decking Material */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="material">Decking Boards Selection</label>
              <select
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value as "pine" | "merbau" | "composite")}
                style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
              >
                <option value="pine">Treated Pine (H3 softwood, budget friendly)</option>
                <option value="merbau">Merbau Hardwood (Solid durability, rich color)</option>
                <option value="composite">Premium Composite (Low maintenance, recycled polymer)</option>
              </select>
            </div>

            {/* Ground Clearance */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="clearance">Subframe Ground Clearance</label>
              <select
                id="clearance"
                value={clearance}
                onChange={(e) => setClearance(e.target.value as "low" | "mid" | "high")}
                style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
              >
                <option value="low">Ground Level (Less than 300mm, excavation required)</option>
                <option value="mid">Mid Clearance (300mm to 1.0m, concrete footings)</option>
                <option value="high">Balcony Height (Exceeding 1.0m, structural bracing)</option>
              </select>
            </div>

            {/* Extras */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", borderTop: "1px solid var(--sand-200)", paddingTop: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={includePergola}
                  onChange={(e) => setIncludePergola(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "var(--ocean-700)" }}
                />
                Include Louvred Pergola Roof Frame
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={includeBalustrade}
                  onChange={(e) => setIncludeBalustrade(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "var(--ocean-700)" }}
                />
                Include Stainless Wire Balustrade (Mandatory for &gt;1.0m high)
              </label>
            </div>
          </div>

          {/* Contextual Bunnings Banner */}
          <div
            style={{
              marginTop: 36,
              background: "#0d5c340a",
              border: "1px solid #0d5c3430",
              borderRadius: 4,
              padding: 24,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 16,
              alignItems: "center",
            }}
            className="sponsor-banner-wrap"
          >
            <div style={{ fontSize: "2.2rem" }}>🔨</div>
            <div>
              <span style={{ fontSize: "0.62rem", background: "#0d5c34", color: "white", padding: "2px 8px", borderRadius: 2, fontWeight: 800, textTransform: "uppercase" }}>
                Sponsored Partner
              </span>
              <h4 style={{ color: "#0d5c34", fontSize: "0.98rem", margin: "6px 0 4px", fontWeight: 800, fontFamily: "Lora, Georgia, serif" }}>
                Bunnings Warehouse Trade Curation
              </h4>
              <p style={{ fontSize: "0.78rem", color: "var(--slate-mid)", lineHeight: 1.5, margin: "0 0 12px" }}>
                Save 12% on **Ekodeck Composite Boards** via Bunnings Trade Powerpass. No warping, termites, or annual oil coating.
              </p>
              <Link
                href="/suppliers/bunnings"
                style={{
                  display: "inline-block",
                  background: "#0d5c34",
                  color: "white",
                  padding: "8px 18px",
                  borderRadius: 2,
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Claim Powerpass Offer &amp; Shop Decking →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Cost Output & Checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Total Cost Card */}
          <div style={{ background: "var(--ocean-700)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "32px", color: "white", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--sand-300)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              ESTIMATED DECK BUDGET
            </span>
            <strong style={{ display: "block", fontSize: "2.4rem", fontFamily: "Lora, Georgia, serif", color: "white", margin: "8px 0" }}>
              ${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} AUD
            </strong>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, margin: 0 }}>
              Calculated using average timber and composite construction rates in QLD. Includes structural subframe posts and GST.
            </p>
          </div>

          {/* Maintenance alert banner */}
          <div style={{ background: "#fdf8e2", border: "1px solid #fbc02d", padding: "14px 20px", borderRadius: 4, fontSize: "0.8rem", color: "#f57f17", fontWeight: 700 }}>
            {maintenanceGuide}
          </div>

          {/* Itemized Cost Breakdown Sheet */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 10, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
              Cost Components
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Treated Pine Subframe framing ({area.toFixed(1)} sqm):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costSubframe.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Decking Boards (Material):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costPlanks.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Joist prep &amp; installation labor:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costLabor.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {includePergola && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Louvred pergola roof structure:</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costPergola.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              {includeBalustrade && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Stainless steel balustrades ({perimeter.toFixed(1)} m):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costBalustrades.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--sand-200)", paddingTop: 10, marginTop: 4 }}>
                <span style={{ color: "var(--slate-light)" }}>GST (10%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* QLD Compliance Checklist Box */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.92rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 8, marginBottom: 14, fontFamily: "Lora, Georgia, serif" }}>
              ✦ Deck Safety &amp; Balustrades
            </h3>
            <ul style={{ paddingLeft: 16, margin: 0, fontSize: "0.78rem", color: "var(--slate-mid)", display: "flex", flexDirection: "column", gap: 8, lineHeight: 1.5 }}>
              <li><strong>Height &gt; 1.0m:</strong> Balustrades (minimum 1.0m high) are legally required by QLD code. Gaps must not exceed 125mm.</li>
              <li><strong>Height &gt; 4.0m:</strong> Balustrades must not have horizontal rails (climbing hazards).</li>
              <li><strong>Subframe Timber:</strong> Must be H3 rated (ground-contact resistant H4 for posts in soil).</li>
            </ul>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 820px) {
          .planner-layout {
            grid-template-columns: 1fr !important;
          }
          .sponsor-banner-wrap {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}} />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function KitchenPlannerPage() {
  const [layout, setLayout] = useState<"straight" | "lshape" | "ushape">("ushape");
  const [cabinetCount, setCabinetCount] = useState(12);
  const [benchtopMaterial, setBenchtopMaterial] = useState<"laminate" | "stone" | "quartzite">("stone");
  const [finishLevel, setFinishLevel] = useState<"budget" | "mid" | "premium">("mid");
  const [includePlumbing, setIncludePlumbing] = useState(true);
  const [includeLEDs, setIncludeLEDs] = useState(true);

  // Rate parameters
  const cabinetRates = { budget: 350, mid: 650, premium: 1100 }[finishLevel];
  const demoRates = { budget: 1000, mid: 2000, premium: 4000 }[finishLevel];

  // Calculations
  const costJoinery = cabinetCount * cabinetRates;
  const costDemo = demoRates;

  let costBenchtop = 0;
  if (benchtopMaterial === "laminate") {
    costBenchtop = layout === "straight" ? 600 : layout === "lshape" ? 1100 : 1600;
  } else if (benchtopMaterial === "stone") {
    costBenchtop = layout === "straight" ? 2200 : layout === "lshape" ? 3800 : 5200;
  } else {
    costBenchtop = layout === "straight" ? 4500 : layout === "lshape" ? 7500 : 9800; // premium quartzite waterfall edge
  }

  const costPlumbing = includePlumbing ? 850 : 0;
  const costElectrical = 600 + (includeLEDs ? 650 : 0);

  const subtotal = costJoinery + costDemo + costBenchtop + costPlumbing + costElectrical;
  const gst = subtotal * 0.1;
  const totalCost = subtotal + gst;

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
            <span style={{ color: "var(--gold-light)", fontSize: "0.8rem" }}>Kitchen Planner</span>
          </div>

          <h1 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.5rem)", margin: 0, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            AI Kitchen &amp; Joinery Planner
          </h1>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="container-lg planner-layout" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 440px", gap: 32 }}>
        {/* Left Side: Inputs */}
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 32, boxShadow: "var(--shadow-sm)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--slate-dark)", marginBottom: 24, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>
            Kitchen Layout &amp; Finishes
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Layout shape */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="layout">Kitchen Layout Shape</label>
              <select
                id="layout"
                value={layout}
                onChange={(e) => setLayout(e.target.value as "straight" | "lshape" | "ushape")}
                style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
              >
                <option value="straight">Straight Line Galley (Single wall run)</option>
                <option value="lshape">L-Shape Layout (Two walls meet)</option>
                <option value="ushape">U-Shape Layout &amp; Central Island</option>
              </select>
            </div>

            {/* Cabinet slider */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                <label htmlFor="cabinetCount">Cabinet Modules Count</label>
                <span style={{ color: "var(--ocean-700)" }}>{cabinetCount} Cabinets</span>
              </div>
              <input
                id="cabinetCount"
                type="range"
                min="4"
                max="30"
                step="1"
                value={cabinetCount}
                onChange={(e) => setCabinetCount(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "var(--ocean-700)" }}
              />
            </div>

            {/* Benchtop Material */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="benchtopMaterial">Benchtop Slab Selection</label>
              <select
                id="benchtopMaterial"
                value={benchtopMaterial}
                onChange={(e) => setBenchtopMaterial(e.target.value as "laminate" | "stone" | "quartzite")}
                style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
              >
                <option value="laminate">Postformed Laminate (Timber-look / scratch resistant)</option>
                <option value="stone">20mm Engineered Stone (Reconstituted Quartz)</option>
                <option value="quartzite">40mm Premium Natural Quartzite (Mitered waterfall edge)</option>
              </select>
            </div>

            {/* Finish type */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="finishLevel">Joinery Material Level</label>
              <select
                id="finishLevel"
                value={finishLevel}
                onChange={(e) => setFinishLevel(e.target.value as "budget" | "mid" | "premium")}
                style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
              >
                <option value="budget">Flatpack Modular Suite (DIY / Melamine doors)</option>
                <option value="mid">Mid-Range Trade Joiner (Custom polyurethane shaker doors)</option>
                <option value="premium">Premium Hand-Built (Tasmanian Oak veneer fronts, soft-touch glides)</option>
              </select>
            </div>

            {/* Extras */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", borderTop: "1px solid var(--sand-200)", paddingTop: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={includePlumbing}
                  onChange={(e) => setIncludePlumbing(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "var(--ocean-700)" }}
                />
                Include Sink Plumbing &amp; Tapware Fit-off
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={includeLEDs}
                  onChange={(e) => setIncludeLEDs(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "var(--ocean-700)" }}
                />
                Include Integrated LED Cabinet Strip-Lighting
              </label>
            </div>
          </div>

          {/* Contextual IKEA Banner */}
          <div
            style={{
              marginTop: 36,
              background: "#0051ba0a",
              border: "1px solid #0051ba30",
              borderRadius: 4,
              padding: 24,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 16,
              alignItems: "center",
            }}
            className="sponsor-banner-wrap"
          >
            <div style={{ fontSize: "2.2rem" }}>🇸🇪</div>
            <div>
              <span style={{ fontSize: "0.62rem", background: "#0051ba", color: "white", padding: "2px 8px", borderRadius: 2, fontWeight: 800, textTransform: "uppercase" }}>
                Sponsored Partner
              </span>
              <h4 style={{ color: "#0051ba", fontSize: "0.98rem", margin: "6px 0 4px", fontWeight: 800, fontFamily: "Lora, Georgia, serif" }}>
                IKEA METOD Joinery Curation
              </h4>
              <p style={{ fontSize: "0.78rem", color: "var(--slate-mid)", lineHeight: 1.5, margin: "0 0 12px" }}>
                Unlock **Free Site Delivery** on modular METOD kitchen packages over $1,200. Standardized soft-closing dampers, 25-year cabinet guarantee.
              </p>
              <Link
                href="/suppliers/ikea"
                style={{
                  display: "inline-block",
                  background: "#0051ba",
                  color: "white",
                  padding: "8px 18px",
                  borderRadius: 2,
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Claim Free Delivery &amp; Shop Cabinets →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Cost Output & Checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Total Cost Card */}
          <div style={{ background: "var(--ocean-700)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "32px", color: "white", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--sand-300)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              ESTIMATED KITCHEN BUDGET
            </span>
            <strong style={{ display: "block", fontSize: "2.4rem", fontFamily: "Lora, Georgia, serif", color: "white", margin: "8px 0" }}>
              ${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} AUD
            </strong>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, margin: 0 }}>
              Calculated using average modular and custom joinery cabinetry costs in QLD. Includes assembly, positioning, and GST.
            </p>
          </div>

          {/* Itemized Cost Breakdown Sheet */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 10, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
              Cost Components
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Cabinet Joinery ({cabinetCount} modules):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costJoinery.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Kitchen strip demolition & prep:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costDemo.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Benchtop Fabrication &amp; Position:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costBenchtop.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {includePlumbing && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Sink plumbing &amp; tap fit-off:</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costPlumbing.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Powerpoint rough-in &amp; electrical:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costElectrical.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--sand-200)", paddingTop: 10, marginTop: 4 }}>
                <span style={{ color: "var(--slate-light)" }}>GST (10%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* Kitchen compliance details */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.92rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 8, marginBottom: 14, fontFamily: "Lora, Georgia, serif" }}>
              ✦ Kitchen Layout Guide
            </h3>
            <ul style={{ paddingLeft: 16, margin: 0, fontSize: "0.78rem", color: "var(--slate-mid)", display: "flex", flexDirection: "column", gap: 8, lineHeight: 1.5 }}>
              <li><strong>Work Triangle:</strong> Place the sink, cooktop, and refrigerator in an ergonomic triangle setup.</li>
              <li><strong>Waterfall Edges:</strong> Natural quartzite edges must be mitered on-site by a stone mason.</li>
              <li><strong>Moisture barrier:</strong> Ensure cabinets surrounding the dishwasher have steam guard shields installed.</li>
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

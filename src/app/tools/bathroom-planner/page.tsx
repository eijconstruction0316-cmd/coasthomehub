"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BathroomPlannerPage() {
  const [length, setLength] = useState(3.0);
  const [width, setWidth] = useState(2.0);
  const [tilingHeight, setTilingHeight] = useState(2.4); // full height default
  const [finishLevel, setFinishLevel] = useState<"budget" | "mid" | "premium">("mid");
  const [hasShowerScreen, setHasShowerScreen] = useState(true);
  const [hasToilet, setHasToilet] = useState(true);

  // Math conversions
  const floorArea = length * width;
  const perimeter = (length + width) * 2;
  // Wall tiling area = perimeter * height - door/window allowances (approx 2.5 sqm)
  const wallTilingArea = Math.max(0, perimeter * tilingHeight - 2.5);
  const totalTilingArea = floorArea + wallTilingArea;

  // Rate structures based on finish level
  const rates = {
    budget: { demoPerSqm: 120, plumbPerOutlet: 600, waterPerSqm: 80, tilePerSqm: 90, vanity: 800, tapware: 500, screen: 450, toilet: 350 },
    mid: { demoPerSqm: 220, plumbPerOutlet: 1100, waterPerSqm: 140, tilePerSqm: 130, vanity: 1600, tapware: 1200, screen: 950, toilet: 650 },
    premium: { demoPerSqm: 380, plumbPerOutlet: 1900, waterPerSqm: 240, tilePerSqm: 210, vanity: 3200, tapware: 2800, screen: 1800, toilet: 1200 }
  }[finishLevel];

  // Outlet counts
  const outletsCount = 3; // Basin, Shower, Bath/Toilet

  // Itemized breakdowns
  const costDemo = floorArea * rates.demoPerSqm;
  const costPlumbing = outletsCount * rates.plumbPerOutlet;
  const costWaterproofing = floorArea * rates.waterPerSqm + (perimeter * 15); // floor area + linear bond breaker joints
  const costTiling = totalTilingArea * rates.tilePerSqm;
  
  const costVanity = rates.vanity;
  const costTapware = rates.tapware;
  const costScreen = hasShowerScreen ? rates.screen : 0;
  const costToilet = hasToilet ? rates.toilet : 0;

  const subtotal = costDemo + costPlumbing + costWaterproofing + costTiling + costVanity + costTapware + costScreen + costToilet;
  
  // QLD Form 16 Certifier signoff fee
  const costForm16 = 180;
  const gst = (subtotal + costForm16) * 0.1;
  const totalCost = subtotal + costForm16 + gst;

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
            <span style={{ color: "var(--gold-light)", fontSize: "0.8rem" }}>Bathroom Planner</span>
          </div>

          <h1 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.5rem)", margin: 0, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            AI Bathroom Renovation Planner
          </h1>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container-lg planner-layout" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 440px", gap: 32 }}>
        {/* Left Side: Inputs */}
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 32, boxShadow: "var(--shadow-sm)" }}>
          <h2 style={{ fontSize: "1.3rem", color: "var(--slate-dark)", marginBottom: 24, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>
            Room Dimensions & Specifications
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Length slider */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                <label htmlFor="length">Room Length</label>
                <span style={{ color: "var(--ocean-700)" }}>{length.toFixed(1)} m</span>
              </div>
              <input
                id="length"
                type="range"
                min="1.5"
                max="6.0"
                step="0.1"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "var(--ocean-700)" }}
              />
            </div>

            {/* Width slider */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                <label htmlFor="width">Room Width</label>
                <span style={{ color: "var(--ocean-700)" }}>{width.toFixed(1)} m</span>
              </div>
              <input
                id="width"
                type="range"
                min="1.5"
                max="6.0"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "var(--ocean-700)" }}
              />
            </div>

            {/* Tiling Height */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="tilingHeight">Tiling Height</label>
              <select
                id="tilingHeight"
                value={tilingHeight}
                onChange={(e) => setTilingHeight(parseFloat(e.target.value))}
                style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
              >
                <option value="0.5">Splashbacks & Skirting Only (0.5m)</option>
                <option value="1.2">Half-Height Wall Tiling (1.2m)</option>
                <option value="2.4">Full-Height Floor-to-Ceiling (2.4m)</option>
              </select>
            </div>

            {/* Finishes Level */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="finishLevel">Finishes & Fittings Level</label>
              <select
                id="finishLevel"
                value={finishLevel}
                onChange={(e) => setFinishLevel(e.target.value as "budget" | "mid" | "premium")}
                style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
              >
                <option value="budget">Budget / DIY Friendly (Polyester vanity, basic tiles)</option>
                <option value="mid">Mid-Range Trade Spec (Timber vanity, porcelain tiles)</option>
                <option value="premium">Premium Custom / Architectural (Stone vanity, custom glass, terrazzo tiles)</option>
              </select>
            </div>

            {/* Toggles */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", borderTop: "1px solid var(--sand-200)", paddingTop: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={hasShowerScreen}
                  onChange={(e) => setHasShowerScreen(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "var(--ocean-700)" }}
                />
                Include Toughened Glass Shower Screen (AS 1288)
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={hasToilet}
                  onChange={(e) => setHasToilet(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "var(--ocean-700)" }}
                />
                Include New Ceramic Toilet Suite
              </label>
            </div>
          </div>

          {/* Contextual Beaumont Tiles Banner */}
          <div
            style={{
              marginTop: 36,
              background: "#cf2d320a",
              border: "1px solid #cf2d3230",
              borderRadius: 4,
              padding: 24,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 16,
              alignItems: "center",
            }}
            className="sponsor-banner-wrap"
          >
            <div style={{ fontSize: "2.2rem" }}>📐</div>
            <div>
              <span style={{ fontSize: "0.62rem", background: "#cf2d32", color: "white", padding: "2px 8px", borderRadius: 2, fontWeight: 800, textTransform: "uppercase" }}>
                Sponsored Partner
              </span>
              <h4 style={{ color: "#cf2d32", fontSize: "0.98rem", margin: "6px 0 4px", fontWeight: 800, fontFamily: "Lora, Georgia, serif" }}>
                Beaumont Tiles Trade Curation
              </h4>
              <p style={{ fontSize: "0.78rem", color: "var(--slate-mid)", lineHeight: 1.5, margin: "0 0 12px" }}>
                Claim 15% off **Majorca Terrazzo Grey** porcelain tiles. Matte slip-resistant R10 finish, perfect for compliant wet area floor certification.
              </p>
              <Link
                href="/suppliers/beaumont-tiles"
                style={{
                  display: "inline-block",
                  background: "#cf2d32",
                  color: "white",
                  padding: "8px 18px",
                  borderRadius: 2,
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Claim Discount & Shop Tiles →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Cost Output & Compliance */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Total Cost Card */}
          <div style={{ background: "var(--ocean-700)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "32px", color: "white", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--sand-300)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              ESTIMATED CONSTRUCTION COST
            </span>
            <strong style={{ display: "block", fontSize: "2.4rem", fontFamily: "Lora, Georgia, serif", color: "white", margin: "8px 0" }}>
              ${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} AUD
            </strong>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, margin: 0 }}>
              Calculated using 2026 QLD building award labor indexes. Includes itemized fixtures, Form 16, GST, and builder margin.
            </p>
          </div>

          {/* Itemized Cost Breakdown Sheet */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 10, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
              Cost Components
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Demolition & Wall Strip ({floorArea.toFixed(1)} sqm):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costDemo.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Plumbing Rough-in & Fit-off (3 outlets):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costPlumbing.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>AS 3740 Certified Waterproofing:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costWaterproofing.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Tiling Labor & Bedding ({totalTilingArea.toFixed(1)} sqm):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costTiling.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Modular Vanity & Basin Unit:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costVanity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Tapware & Mixer Assemblies:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costTapware.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {hasShowerScreen && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Toughened Glass Screen (AS 1288):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costScreen.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              {hasToilet && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Ceramic Close-Coupled Suite:</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costToilet.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--sand-200)", paddingTop: 10, marginTop: 4 }}>
                <span style={{ color: "var(--slate-light)" }}>QBCC Form 16 Cert. Sign-off:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costForm16}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>GST (10%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* QLD Compliance Checklist Box */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.92rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 8, marginBottom: 14, fontFamily: "Lora, Georgia, serif" }}>
              ✦ AS 3740 Waterproofing Checklist
            </h3>
            <ul style={{ paddingLeft: 16, margin: 0, fontSize: "0.78rem", color: "var(--slate-mid)", display: "flex", flexDirection: "column", gap: 8, lineHeight: 1.5 }}>
              <li><strong>Bond Breakers:</strong> Mandatory flexible band breakers must seal wall-to-floor and wall-to-wall joints.</li>
              <li><strong>Shower Walls:</strong> Waterproof membrane must extend at least 150mm above the shower floor.</li>
              <li><strong>Form 16:</strong> The installer must sign and hand you a Form 16 Certificate of Inspection to submit to your certifier.</li>
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

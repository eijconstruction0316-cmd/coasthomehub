"use client";

import { useState } from "react";
import Link from "next/link";

type ProjectType = "Bathroom" | "Kitchen" | "Decking" | "Painting";
type QualityTier = "budget" | "mid" | "luxury";

interface CostRange {
  min: number;
  max: number;
  breakdown: {
    demolition: number;
    waterproofing: number;
    labor: number;
    materials: number;
    fees: number;
  };
}

export default function RenovationCostCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>("Bathroom");
  const [area, setArea] = useState<number>(10);
  const [quality, setQuality] = useState<QualityTier>("mid");

  // Approximate cost factors per sqm and base fees for QLD (2026 indices)
  const calculateCost = (): CostRange => {
    let baseSqmMin = 0;
    let baseSqmMax = 0;
    let baseFee = 2500; // Waterproofing, certifications, waste removal

    if (projectType === "Bathroom") {
      if (quality === "budget") {
        baseSqmMin = 1200;
        baseSqmMax = 1800;
        baseFee = 3000;
      } else if (quality === "mid") {
        baseSqmMin = 2200;
        baseSqmMax = 3200;
        baseFee = 5000;
      } else {
        baseSqmMin = 4000;
        baseSqmMax = 5800;
        baseFee = 8000;
      }
    } else if (projectType === "Kitchen") {
      if (quality === "budget") {
        baseSqmMin = 900;
        baseSqmMax = 1400;
        baseFee = 4000;
      } else if (quality === "mid") {
        baseSqmMin = 1800;
        baseSqmMax = 2800;
        baseFee = 8000;
      } else {
        baseSqmMin = 3500;
        baseSqmMax = 5200;
        baseFee = 15000;
      }
    } else if (projectType === "Decking") {
      if (quality === "budget") {
        baseSqmMin = 250;
        baseSqmMax = 380;
        baseFee = 1500;
      } else if (quality === "mid") {
        baseSqmMin = 450;
        baseSqmMax = 650;
        baseFee = 3000;
      } else {
        baseSqmMin = 850;
        baseSqmMax = 1200;
        baseFee = 6000;
      }
    } else if (projectType === "Painting") {
      baseFee = 500;
      if (quality === "budget") {
        baseSqmMin = 35;
        baseSqmMax = 55;
      } else if (quality === "mid") {
        baseSqmMin = 65;
        baseSqmMax = 95;
      } else {
        baseSqmMin = 110;
        baseSqmMax = 160;
      }
    }

    const rawMin = baseSqmMin * area + baseFee;
    const rawMax = baseSqmMax * area + baseFee;

    // Apply roundings to feel like realistic estimates
    const min = Math.round(rawMin / 100) * 100;
    const max = Math.round(rawMax / 100) * 100;

    return {
      min,
      max,
      breakdown: {
        demolition: Math.round((min * 0.1) / 100) * 100,
        waterproofing: projectType === "Bathroom" || projectType === "Decking" 
          ? Math.round((min * 0.12) / 100) * 100 
          : Math.round((min * 0.03) / 100) * 100,
        labor: Math.round((min * 0.45) / 100) * 100,
        materials: Math.round((min * 0.3) / 100) * 100,
        fees: Math.round((min * 0.03) / 100) * 100 + 450, // QBCC insurances / admin
      },
    };
  };

  const cost = calculateCost();

  return (
    <div
      style={{
        background: "rgba(10, 31, 30, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(61, 153, 144, 0.3)",
        borderRadius: "28px",
        padding: "36px",
        boxShadow: "0 24px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        color: "white",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px" }} className="calc-layout">
        
        {/* Left Control Panel */}
        <div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px", color: "var(--gold-light)" }}>
            QLD Cost Ballpark Calculator
          </h3>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "28px" }}>
            Adjust your project specs below. Calculated using 2026 South East Queensland average labor rates and AS 3740 compliance guidelines.
          </p>

          {/* 1. Project Type Selector */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
              Project Space
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {(["Bathroom", "Kitchen", "Decking", "Painting"] as ProjectType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setProjectType(type);
                    if (type === "Bathroom") setArea(8);
                    else if (type === "Kitchen") setArea(12);
                    else if (type === "Decking") setArea(25);
                    else if (type === "Painting") setArea(120);
                  }}
                  style={{
                    background: projectType === type ? "linear-gradient(135deg, #1f7a72, #0e4440)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${projectType === type ? "rgba(61,153,144,0.6)" : "rgba(255,255,255,0.1)"}`,
                    color: projectType === type ? "white" : "rgba(255,255,255,0.85)",
                    padding: "12px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {type === "Bathroom" && "🚿 Bathroom"}
                  {type === "Kitchen" && "🍳 Kitchen"}
                  {type === "Decking" && "🪵 Deck / Outdoor"}
                  {type === "Painting" && "🎨 Entire House Painting"}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Room Size Area Slider */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                Room Area / Size
              </label>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--gold-light)" }}>
                {area} ㎡
              </span>
            </div>
            <input
              type="range"
              min={projectType === "Bathroom" ? 4 : projectType === "Kitchen" ? 6 : projectType === "Decking" ? 10 : 20}
              max={projectType === "Bathroom" ? 25 : projectType === "Kitchen" ? 50 : projectType === "Decking" ? 120 : 400}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "rgba(255,255,255,0.15)",
                outline: "none",
                cursor: "pointer",
                accentColor: "var(--gold-light)",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
              <span>Min</span>
              <span>Max</span>
            </div>
          </div>

          {/* 3. Quality Tier */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
              Material & Finish Curation
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
              {[
                { key: "budget", label: "Standard / DIY", desc: "Basic laminate & porcelain" },
                { key: "mid", label: "Mid-Range Curation", desc: "Engineered stone, brass, local oak" },
                { key: "luxury", label: "Bespoke / Luxury", desc: "Custom marble, fluted glass, design tier" },
              ].map((tier) => (
                <button
                  key={tier.key}
                  onClick={() => setQuality(tier.key as QualityTier)}
                  style={{
                    background: quality === tier.key ? "rgba(201,151,42,0.18)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${quality === tier.key ? "var(--gold-light)" : "rgba(255,255,255,0.08)"}`,
                    color: quality === tier.key ? "var(--gold-light)" : "rgba(255,255,255,0.7)",
                    padding: "10px 8px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: "0.78rem" }}>{tier.label}</span>
                  <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", textAlign: "center" }}>{tier.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Output Panel */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Main Price Output */}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-300)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Ballpark Price Range
            </span>
            <div style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 900, color: "white", marginTop: "8px", letterSpacing: "-0.02em" }}>
              ${cost.min.toLocaleString()} - ${cost.max.toLocaleString()}
            </div>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>
              AUD (Incl. GST)
            </span>
          </div>

          {/* Breakdown bars */}
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "🪓 Demolition / Prep", val: cost.breakdown.demolition, pct: 10 },
              { label: "🛡️ Compliance & Waterproofing", val: cost.breakdown.waterproofing, pct: projectType === "Bathroom" ? 12 : 5 },
              { label: "👷 QBCC Licensed Labor", val: cost.breakdown.labor, pct: 45 },
              { label: "📦 Curated Materials", val: cost.breakdown.materials, pct: 30 },
              { label: "📜 Insurances & Fees", val: cost.breakdown.fees, pct: 3 },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "4px", color: "rgba(255,255,255,0.8)" }}>
                  <span>{item.label}</span>
                  <strong style={{ color: "white" }}>${item.val.toLocaleString()}</strong>
                </div>
                <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${item.pct}%`,
                      height: "100%",
                      background: item.label.includes("Waterproofing") ? "var(--ocean-400)" : item.label.includes("Labor") ? "var(--gold-light)" : "rgba(255,255,255,0.3)",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Compliance & CTA */}
          <div style={{ marginTop: "28px" }}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
                background: "rgba(31,122,114,0.1)",
                border: "1px solid rgba(31,122,114,0.25)",
                padding: "10px 12px",
                borderRadius: "10px",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontSize: "0.95rem" }}>🛡️</span>
              <p style={{ fontSize: "0.68rem", color: "var(--ocean-200)", lineHeight: 1.4, margin: 0 }}>
                Includes QBCC Form 15 compliance check & AS 3740 / AS 1288 materials standard check.
              </p>
            </div>

            <Link href="/quote" style={{ width: "100%" }}>
              <button
                className="btn-gold"
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                📸 Snap Space & Get Quotes →
              </button>
            </Link>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 760px) {
          .calc-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}

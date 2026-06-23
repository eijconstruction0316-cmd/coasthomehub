"use client";

import React from "react";
import Link from "next/link";

export default function ToolsHubPage() {
  const tools = [
    {
      id: "bathroom",
      title: "✦ AI Bathroom Renovation Planner",
      desc: "Estimate waterproofing membrane volumes, tiling labor, plumbing outlets, and compliance costs under QLD AS 3740.",
      icon: "🚿",
      href: "/tools/bathroom-planner",
      badge: "AS 3740 Certified",
      color: "var(--ocean-700)",
      bgLight: "rgba(31, 122, 114, 0.05)"
    },
    {
      id: "kitchen",
      title: "✦ AI Kitchen & Joinery Planner",
      desc: "Calculate cabinet counts, Laminex panel configurations, stone benchtop installation, and appliance fit-offs.",
      icon: "🍳",
      href: "/tools/kitchen-planner",
      badge: "Joinery & Layouts",
      color: "#92650a",
      bgLight: "rgba(146, 101, 10, 0.05)"
    },
    {
      id: "decking",
      title: "✦ AI Timber Deck & Pergola Planner",
      desc: "Measure timber subframe framing, composite decking boards volume, hidden fasteners, and annual oil maintenance.",
      icon: "🪵",
      href: "/tools/deck-planner",
      badge: "Composite & Timber",
      color: "#5c3d0d",
      bgLight: "rgba(92, 61, 13, 0.05)"
    }
  ];

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Editorial Header */}
      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", paddingTop: 130, paddingBottom: 64, color: "white", textAlign: "center" }}>
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.05)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>
            ✦ Interactive Construction Calculators
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", marginBottom: 14, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            AI Renovation Cost Estimating
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.08rem", maxWidth: 680, margin: "0 auto", fontFamily: "Outfit, sans-serif", lineHeight: 1.6 }}>
            Gain control of your budget before hiring contractors. Calculate required materials, average QLD labor rates, and compliance demands.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <div className="container-lg" style={{ marginTop: 56 }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 20, letterSpacing: "0.06em", fontFamily: "Outfit, sans-serif" }}>
          Select Calculator
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          {tools.map((t) => (
            <div
              key={t.id}
              style={{
                background: "white",
                border: "1px solid var(--sand-300)",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.2s ease",
              }}
              className="tool-card-hover"
            >
              {/* Top graphic block */}
              <div style={{ background: t.bgLight, padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--sand-200)" }}>
                <span style={{ fontSize: "3rem" }}>{t.icon}</span>
                <span style={{ background: "white", border: "1px solid var(--sand-300)", color: t.color, fontSize: "0.68rem", fontWeight: 800, padding: "4px 10px", borderRadius: 2 }}>
                  {t.badge}
                </span>
              </div>

              {/* Card info */}
              <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.25rem", color: "var(--slate-dark)", fontWeight: 600, margin: "0 0 10px" }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--slate-mid)", lineHeight: 1.5, margin: "0 0 24px", flex: 1, fontFamily: "Outfit, sans-serif" }}>
                  {t.desc}
                </p>
                <Link
                  href={t.href}
                  style={{
                    background: "var(--ocean-700)",
                    color: "white",
                    padding: "12px",
                    textAlign: "center",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    borderRadius: 2,
                    display: "block",
                  }}
                  id={`tools-cta-${t.id}`}
                >
                  Open Estimator →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Quote disclaimer */}
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 32, marginTop: 48, boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.2rem", fontWeight: 600, color: "var(--slate-dark)", marginBottom: 12 }}>
            ✦ Why Do We Use QLD Labor & Compliance Indexes?
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--slate-mid)", lineHeight: 1.6, margin: 0, fontFamily: "Outfit, sans-serif" }}>
            CoastHomeHub calculators are tailored to Queensland building specifications, referencing current QBCC award rates, insurance indexes, and crucial state standards (including AS 3740 for wet areas and AS 1288 for safety glass). While prices reflect South East Queensland (Gold Coast, Brisbane, Sunshine Coast), they provide an excellent guide for national comparisons.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tool-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md) !important;
          border-color: var(--ocean-300) !important;
        }
      `}} />
    </div>
  );
}

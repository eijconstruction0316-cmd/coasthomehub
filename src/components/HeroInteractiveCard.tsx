"use client";

import React, { useState } from "react";
import Link from "next/link";

type HeroView = "audit" | "pack";

export default function HeroInteractiveCard() {
  const [activeView, setActiveView] = useState<HeroView>("audit");

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.98)",
          border: "1px solid var(--sand-300)",
          borderRadius: 4,
          boxShadow: "0 18px 46px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 16px", borderBottom: "1px solid var(--sand-300)", background: "#f8f5ed" }}>
          <div>
            <span style={{ display: "block", color: "var(--ocean-700)", fontWeight: 900, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              RenoScope live brief
            </span>
            <strong style={{ display: "block", marginTop: 3, color: "var(--slate-dark)", fontSize: "0.94rem" }}>
              Bathroom - Burleigh Heads
            </strong>
          </div>
          <div style={{ background: "#102f2b", color: "white", padding: "10px 12px", minWidth: 92, textAlign: "right" }}>
            <span style={{ display: "block", fontSize: "0.58rem", color: "rgba(255,255,255,0.58)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 850 }}>
              Ready
            </span>
            <strong style={{ display: "block", color: "var(--gold-light)", fontSize: "1.28rem", lineHeight: 1 }}>86</strong>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, padding: 8, background: "#102f2b" }}>
          {[
            { id: "audit", label: "2D quote audit", sub: "Free" },
            { id: "pack", label: "Quote pack", sub: "Premium output" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as HeroView)}
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                background: activeView === item.id ? "var(--sand-100)" : "rgba(255,255,255,0.04)",
                color: activeView === item.id ? "var(--slate-dark)" : "rgba(255,255,255,0.78)",
                padding: "10px 12px",
                borderRadius: 3,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <strong style={{ display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</strong>
              <span style={{ display: "block", marginTop: 3, fontSize: "0.66rem", opacity: 0.72 }}>{item.sub}</span>
            </button>
          ))}
        </div>

        <div style={{ padding: 18 }}>
          {activeView === "audit" ? (
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) 0.9fr", gap: 14 }} className="hero-product-grid">
              <div style={{ background: "#eef1ea", border: "1px solid var(--sand-300)", padding: 12, borderRadius: 4 }}>
                <svg viewBox="0 0 320 260" style={{ width: "100%", display: "block" }} aria-label="Mini 2D renovation quote audit">
                  <defs>
                    <pattern id="hero-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(14,68,64,0.12)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect x="28" y="22" width="248" height="190" fill="#ded2bd" stroke="#163a35" strokeWidth="4" />
                  <rect x="28" y="22" width="248" height="190" fill="url(#hero-grid)" />
                  <rect x="46" y="130" width="82" height="68" fill="rgba(55,167,183,0.22)" stroke="#17859a" strokeDasharray="5 4" />
                  <line x1="56" y1="140" x2="118" y2="190" stroke="#17859a" strokeWidth="2" />
                  <line x1="118" y1="140" x2="56" y2="190" stroke="#17859a" strokeWidth="2" />
                  <circle cx="87" cy="164" r="6" fill="#102f2b" />
                  <rect x="52" y="44" width="78" height="46" fill="#fffdf7" stroke="#152f2c" strokeWidth="2" />
                  <ellipse cx="91" cy="67" rx="20" ry="11" fill="#f7f7f2" stroke="#647b77" />
                  <rect x="196" y="48" width="42" height="64" fill="#fffdf7" stroke="#152f2c" strokeWidth="2" />
                  <ellipse cx="217" cy="83" rx="14" ry="20" fill="#f7f7f2" stroke="#647b77" />
                  <line x1="28" y1="228" x2="276" y2="228" stroke="#102f2b" strokeWidth="1.5" />
                  <text x="152" y="246" textAnchor="middle" fill="#102f2b" fontSize="12" fontWeight="900">3200mm</text>
                  <text x="46" y="125" fill="#126276" fontSize="10" fontWeight="900">WET ZONE</text>
                  <text x="160" y="18" fill="#102f2b" fontSize="12" fontWeight="900" textAnchor="middle">Quote-ready 2D audit</text>
                </svg>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {[
                  { label: "Indicative range", value: "$41.2k-$55.4k" },
                  { label: "Missing before quote", value: "1 item" },
                  { label: "Trade pack", value: "4 stages" },
                ].map((item) => (
                  <div key={item.label} style={{ border: "1px solid var(--sand-300)", background: "var(--sand-50)", padding: "11px 12px", borderRadius: 4 }}>
                    <span style={{ display: "block", fontSize: "0.64rem", color: "var(--slate-light)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 850 }}>{item.label}</span>
                    <strong style={{ display: "block", marginTop: 4, color: "var(--slate-dark)", fontSize: "0.96rem" }}>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ border: "1px solid var(--sand-300)", background: "var(--sand-50)", padding: 14, borderRadius: 4 }}>
                <span style={{ display: "block", color: "var(--ocean-700)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 900 }}>
                  Contractor-facing output
                </span>
                <strong style={{ display: "block", marginTop: 6, color: "var(--slate-dark)", fontSize: "1.05rem" }}>
                  The brief answers quote questions before the first site call.
                </strong>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                {[
                  "Fixture list and layout dimensions",
                  "Waterproofing and fall-to-waste risk flags",
                  "Budget range and allowance notes",
                  "QBCC licence-class checklist",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", border: "1px solid var(--sand-300)", padding: "10px 11px", borderRadius: 4 }}>
                    <span style={{ width: 8, height: 8, marginTop: 5, background: "var(--gold)", flex: "0 0 auto" }} />
                    <span style={{ color: "var(--slate-mid)", fontSize: "0.76rem", lineHeight: 1.42, fontWeight: 700 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link
            href="/planner"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "var(--gold)",
              color: "white",
              padding: "14px",
              borderRadius: 4,
              fontWeight: 800,
              fontSize: "0.86rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textDecoration: "none",
              marginTop: 16,
            }}
          >
            Open the free planner
          </Link>
        </div>
      </div>

      <div
        className="hero-float"
        style={{
          position: "absolute",
          bottom: -18,
          left: -18,
          background: "white",
          borderRadius: 4,
          padding: "12px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "1px solid var(--sand-300)",
          zIndex: 20,
        }}
      >
        <span style={{ width: 9, height: 9, background: "var(--gold)", display: "inline-block" }} />
        <div>
          <div style={{ fontWeight: 850, fontSize: "0.8rem", color: "var(--slate-dark)", lineHeight: 1 }}>
            Not just a render
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--slate-light)", marginTop: 3 }}>
            A quote-ready renovation file
          </div>
        </div>
      </div>

      <style>{`
        .hero-product-grid,
        .hero-product-grid * {
          min-width: 0;
        }
        @media (max-width: 560px) {
          .hero-product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

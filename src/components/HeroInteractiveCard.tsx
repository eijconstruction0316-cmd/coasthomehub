"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function HeroInteractiveCard() {
  const [activeTab, setActiveTab] = useState<"slider" | "chat">("slider");

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Tab Switcher */}
      <div
        style={{
          display: "flex",
          gap: 6,
          background: "rgba(10, 31, 30, 0.4)",
          backdropFilter: "blur(12px)",
          padding: 6,
          borderRadius: 14,
          marginBottom: 16,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <button
          onClick={() => setActiveTab("slider")}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            border: "none",
            transition: "all 0.2s ease",
            background: activeTab === "slider" ? "var(--white)" : "transparent",
            color: activeTab === "slider" ? "var(--slate-dark)" : "rgba(255, 255, 255, 0.75)",
            boxShadow: activeTab === "slider" ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
          }}
        >
          ✨ AI Before & After
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            border: "none",
            transition: "all 0.2s ease",
            background: activeTab === "chat" ? "var(--white)" : "transparent",
            color: activeTab === "chat" ? "var(--slate-dark)" : "rgba(255, 255, 255, 0.75)",
            boxShadow: activeTab === "chat" ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
          }}
        >
          🌊 CoastAI Concierge
        </button>
      </div>

      {/* Main Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.98)",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 32px 80px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15)",
          minHeight: "440px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {activeTab === "slider" ? (
          /* Tab 1: Before / After Slider */
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyItems: "stretch" }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--slate-dark)" }}>
                Drag to reveal the transformation
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginTop: 4 }}>
                Watch our QLD Coastal style turn a dated bathroom into a luxury retreat.
              </p>
            </div>
            
            <div style={{ flex: 1, marginBottom: 16 }}>
              <BeforeAfterSlider
                beforeImage="/images/old_bathroom_before.png"
                afterImage="/images/modern_bathroom_after.png"
                height="280px"
              />
            </div>

            <Link
              href="/quote"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
                color: "white",
                padding: "14px",
                borderRadius: 14,
                fontWeight: 800,
                fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(201, 151, 42, 0.35)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              📸 Design my own space — free →
            </Link>
          </div>
        ) : (
          /* Tab 2: CoastAI Chat Simulation */
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            {/* Chat header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingBottom: 14,
                borderBottom: "1px solid #f0f0f0",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0e4440, #1f7a72)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                🌊
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--slate-dark)", lineHeight: 1 }}>
                  CoastAI
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--ocean-500)",
                    fontWeight: 600,
                    marginTop: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      background: "#22c55e",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>
                  Online · Ready to design
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{ flex: 1, overflowY: "auto", marginBottom: 14 }}>
              {/* User message */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <div style={{ maxWidth: "80%" }}>
                  <div style={{ background: "var(--ocean-500)", color: "white", padding: "10px 16px", borderRadius: "16px 16px 4px 16px", fontSize: "0.83rem", lineHeight: 1.5 }}>
                    Can you modernise our main bathroom? Budget around $30k.
                  </div>
                </div>
              </div>

              {/* AI reply */}
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0e4440, #1f7a72)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  🌊
                </div>
                <div
                  style={{
                    background: "#f8faf9",
                    border: "1px solid #e0eeec",
                    padding: "12px 16px",
                    borderRadius: "4px 16px 16px 16px",
                    fontSize: "0.83rem",
                    color: "var(--slate-mid)",
                    lineHeight: 1.65,
                  }}
                >
                  Love it. Here&rsquo;s a warm coastal concept — floating vanity, large-format tiles, matte black tapware. For a full reno at this size in QLD, expect{" "}
                  <strong style={{ color: "var(--ocean-700)" }}>$28k–$38k</strong>. Want me to line up <strong>3 licensed local tradies</strong> to quote it?
                </div>
              </div>

              {/* Concept chips */}
              <div style={{ display: "flex", gap: 7, marginBottom: 12, paddingLeft: 38, flexWrap: "wrap" }}>
                {["🪵 Warm coastal", "🛁 Floating vanity", "⬛ Matte black", "💡 $28k–$38k"].map((c) => (
                  <span
                    key={c}
                    style={{
                      background: "white",
                      border: "1px solid #d0e8e5",
                      color: "var(--ocean-600)",
                      borderRadius: "50px",
                      padding: "5px 12px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA inside card */}
            <Link
              href="/quote"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(135deg, var(--ocean-500) 0%, var(--ocean-400) 100%)",
                color: "white",
                padding: "14px",
                borderRadius: 14,
                fontWeight: 800,
                fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(31, 122, 114, 0.3)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              💬 Chat with CoastAI now →
            </Link>
          </div>
        )}
      </div>

      {/* Floating verified badge */}
      <div
        className="hero-float"
        style={{
          position: "absolute",
          bottom: -20,
          left: -20,
          background: "white",
          borderRadius: 16,
          padding: "12px 16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "1px solid rgba(0,0,0,0.06)",
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: "1.4rem" }}>✅</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: "0.8rem", color: "var(--slate-dark)", lineHeight: 1 }}>
            QBCC Verified
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--slate-light)", marginTop: 3 }}>
            Licence checked on every tradie
          </div>
        </div>
      </div>
    </div>
  );
}

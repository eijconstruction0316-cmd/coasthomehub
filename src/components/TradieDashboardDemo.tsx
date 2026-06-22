"use client";

import React, { useState } from "react";
import Image from "next/image";

type Lead = {
  id: string;
  suburb: string;
  category: string;
  budget: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  creditsCost: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  aiSpecs: string[];
  isLocked: boolean;
};

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    suburb: "Southport QLD",
    category: "Bathroom Renovation",
    budget: "$18k - $25k",
    description: "Complete overhaul of a 6sqm master bathroom. Removing old 80s tiling, installing new walk-in shower with safety glass panel, floating timber vanity, and premium brushed brass mixer fixtures.",
    beforeImage: "/images/old_bathroom_before.png",
    afterImage: "/images/modern_bathroom_after.png",
    creditsCost: 15,
    clientName: "Marcus Vance",
    clientPhone: "0491 570 156",
    clientEmail: "marcus.vance@example.com.au",
    aiSpecs: ["Reece Brushed Brass Tapware (Code: RE-129)", "Beaumont 600x600 Sandstone Porcelain Tiles", "AS 3740 Waterproofing Standard Checklist"],
    isLocked: true,
  },
  {
    id: "lead-2",
    suburb: "Noosa Heads QLD",
    category: "Kitchen & Servery Window",
    budget: "$45k - $60k",
    description: "Open plan kitchen renovation. Wall removal to merge dining area, installing a kitchen island with stone waterfall benchtop, and custom servery bifold windows opening to the deck.",
    beforeImage: "/images/luxury_kitchen.png",
    afterImage: "/images/noosa_servery_window.png",
    creditsCost: 30,
    clientName: "Samantha Brooke",
    clientPhone: "0491 570 334",
    clientEmail: "samantha.b@example.com.au",
    aiSpecs: ["Laminex Organic Ash Soft-close Cabinetry", "Colorbond Monument Trim & Framing", "Reece Brushed Brass Gooseneck Mixer"],
    isLocked: true,
  },
  {
    id: "lead-3",
    suburb: "Burleigh Waters QLD",
    category: "Outdoor Living & Decking",
    budget: "$12k - $16k",
    description: "Low-maintenance composite timber deck (approx 24sqm) with architectural louvre pergola. Semi-sunken seating area near the pool.",
    beforeImage: "/images/outdoor_living.png",
    afterImage: "/images/outdoor_living.png",
    creditsCost: 10,
    clientName: "David Miller",
    clientPhone: "0491 570 882",
    clientEmail: "dave.m@example.com.au",
    aiSpecs: ["Osmo Natural Timber UV-Protection Oil", "Colorbond Monument Structural Frame", "Beaumont Slate Deck Accents"],
    isLocked: false, // Start with one already unlocked to let them see both states
  },
];

export default function TradieDashboardDemo() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [credits, setCredits] = useState(45);
  const [selectedLeadId, setSelectedLeadId] = useState<string>("lead-1");
  const [unlocking, setUnlocking] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [proposalText, setProposalText] = useState("");

  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const handleUnlock = () => {
    if (credits < activeLead.creditsCost) {
      alert("Insufficient credits! Upgrade your subscription or purchase extra credits to unlock this lead.");
      return;
    }

    setUnlocking(true);
    // Simulate API authorization check
    setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) => (l.id === activeLead.id ? { ...l, isLocked: false } : l))
      );
      setCredits((prev) => prev - activeLead.creditsCost);
      setUnlocking(false);
    }, 1500);
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalText.trim()) return;

    setProposalSent(true);
    setTimeout(() => {
      setProposalSent(false);
      setProposalText("");
      alert(`Message successfully dispatched to ${activeLead.clientName}! Check your email for reply tracking.`);
    }, 1500);
  };

  return (
    <div
      style={{
        background: "linear-gradient(160deg, var(--slate-dark) 0%, var(--slate-mid) 100%)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "var(--shadow-xl)",
        padding: "32px",
        color: "white",
        fontFamily: "Outfit, sans-serif",
        maxWidth: 1040,
        margin: "0 auto",
      }}
    >
      {/* Dashboard Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          paddingBottom: 20,
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: 50, fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-300)" }}>
            🟢 LIVE TRADIE PORTAL DEMO
          </div>
          <h3 style={{ color: "white", fontSize: "1.35rem", margin: "6px 0 0" }}>Welcome back, EIJ Construction</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-lg)", padding: "10px 20px", textAlign: "right" }}>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", display: "block" }}>ACCOUNT TYPE</span>
            <span style={{ fontWeight: 800, color: "var(--gold-light)", fontSize: "0.95rem" }}>👑 Elite Partner</span>
          </div>
          <div style={{ background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))", borderRadius: "var(--radius-lg)", padding: "10px 20px", boxShadow: "0 4px 14px rgba(31,122,114,0.3)" }}>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", display: "block", fontWeight: 600 }}>AVAILABLE CREDITS</span>
            <span style={{ fontWeight: 900, color: "white", fontSize: "1.2rem" }}>🪙 {credits}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 28 }} className="demo-grid-wrap">
        {/* Left Side: Lead Feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Active Renovation Leads ({leads.length})
          </span>
          {leads.map((lead) => {
            const isSelected = lead.id === selectedLeadId;
            return (
              <button
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                style={{
                  border: isSelected ? "2px solid var(--ocean-400)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "var(--radius-lg)",
                  padding: "16px 18px",
                  background: isSelected ? "rgba(31,122,114,0.18)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  transition: "var(--transition-fast)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "var(--ocean-300)", fontWeight: 700, fontSize: "0.78rem" }}>📍 {lead.suburb}</span>
                  {lead.isLocked ? (
                    <span style={{ fontSize: "0.72rem", background: "rgba(245,158,11,0.15)", color: "var(--gold-light)", padding: "2px 8px", borderRadius: 50, fontWeight: 700 }}>
                      🔒 Locked ({lead.creditsCost} c)
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.72rem", background: "rgba(34,197,94,0.15)", color: "#4ade80", padding: "2px 8px", borderRadius: 50, fontWeight: 700 }}>
                      🔓 Unlocked
                    </span>
                  )}
                </div>
                <h4 style={{ color: "white", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 4px" }}>{lead.category}</h4>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", lineClamp: 1, WebkitLineClamp: 1, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", margin: "0 0 10px" }}>
                  {lead.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 }}>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>Estimated Budget</span>
                  <span style={{ color: "var(--gold-light)", fontWeight: 800, fontSize: "0.85rem" }}>{lead.budget}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Lead Details Viewer */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-xl)", padding: 24, minHeight: 460, position: "relative" }}>
          
          {/* Header info */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 16, marginBottom: 20 }}>
            <div>
              <span style={{ color: "var(--ocean-300)", fontSize: "0.82rem", fontWeight: 700 }}>{activeLead.category}</span>
              <h2 style={{ fontSize: "1.4rem", margin: "4px 0 0", color: "white" }}>{activeLead.suburb}</h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "block" }}>Est. Job Value</span>
              <strong style={{ fontSize: "1.2rem", color: "var(--gold)", fontWeight: 900 }}>{activeLead.budget}</strong>
            </div>
          </div>

          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 20 }}>
            {activeLead.description}
          </p>

          {activeLead.isLocked ? (
            /* ── LOCKED STATE OVERLAY ── */
            <div
              style={{
                background: "rgba(10,31,30,0.88)",
                border: "1px dashed rgba(61,153,144,0.3)",
                borderRadius: "var(--radius-lg)",
                padding: "36px 24px",
                textAlign: "center",
                backdropFilter: "blur(4px)",
                marginTop: 20,
              }}
            >
              <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>🔒</div>
              <h3 style={{ color: "white", fontSize: "1.1rem", marginBottom: 6, fontWeight: 800 }}>Contact Details Locked</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", maxWidth: 360, margin: "0 auto 20px", lineHeight: 1.6 }}>
                Unlock this lead using your monthly credits. You will gain immediate access to client&apos;s name, phone, email, and detailed room photos.
              </p>
              <button
                onClick={handleUnlock}
                disabled={unlocking}
                style={{
                  background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                  border: "none",
                  borderRadius: "50px",
                  padding: "12px 36px",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(201,151,42,0.3)",
                  transition: "var(--transition)",
                }}
              >
                {unlocking ? "⏳ Verifying QBCC Class..." : `🔑 Unlock Lead — ${activeLead.creditsCost} Credits`}
              </button>
            </div>
          ) : (
            /* ── UNLOCKED STATE DETAILED VIEW ── */
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              {/* Client Info Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 20px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "block" }}>CONTACT NAME</span>
                  <strong style={{ color: "white", fontSize: "0.95rem" }}>👤 {activeLead.clientName}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "block" }}>PHONE NUMBER</span>
                  <a href={`tel:${activeLead.clientPhone}`} style={{ color: "var(--ocean-300)", fontSize: "0.95rem", textDecoration: "none", fontWeight: 700 }}>
                    📞 {activeLead.clientPhone}
                  </a>
                </div>
                <div style={{ gridColumn: "span 2", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10, marginTop: 4 }}>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "block" }}>EMAIL ADDRESS</span>
                  <a href={`mailto:${activeLead.clientEmail}`} style={{ color: "var(--ocean-300)", fontSize: "0.95rem", textDecoration: "none" }}>
                    ✉️ {activeLead.clientEmail}
                  </a>
                </div>
              </div>

              {/* Photos comparison */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6 }}>CUSTOMER BEFORE PHOTO</span>
                  <div style={{ position: "relative", height: 140, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Image src={activeLead.beforeImage} alt="Before" fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6 }}>AI DESIGN CONCEPT</span>
                  <div style={{ position: "relative", height: 140, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Image src={activeLead.afterImage} alt="AI Concept" fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                </div>
              </div>

              {/* AI Spec list */}
              <div style={{ background: "rgba(61,153,144,0.08)", border: "1px solid rgba(61,153,144,0.15)", borderRadius: 12, padding: "16px 20px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--ocean-300)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>
                  ✦ AI Recommended Project Materials
                </span>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, margin: 0, padding: 0 }}>
                  {activeLead.aiSpecs.map((spec) => (
                    <li key={spec} style={{ display: "flex", gap: 8, fontSize: "0.82rem", color: "rgba(255,255,255,0.85)" }}>
                      <span style={{ color: "var(--gold-light)", fontWeight: 700 }}>✔</span>{spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Messaging Form */}
              <form onSubmit={handleSendProposal} style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }} htmlFor="proposalText">
                  Send Direct Quote Proposal / Message
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    id="proposalText"
                    type="text"
                    placeholder={`E.g. Hi ${activeLead.clientName}, I am a QBCC-licensed builder available to inspect your job this Wednesday...`}
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "50px",
                      padding: "10px 20px",
                      color: "white",
                      fontSize: "0.85rem",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={proposalSent}
                    style={{
                      background: "var(--ocean-500)",
                      border: "none",
                      borderRadius: "50px",
                      padding: "10px 24px",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {proposalSent ? "Sending..." : "Send Proposal"}
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 820px) {
          .demo-grid-wrap {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}

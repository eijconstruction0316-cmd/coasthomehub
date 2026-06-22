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
    isLocked: false,
  },
];

const MOCK_MATERIALS = [
  { id: "mat-1", brand: "Reece Plumbing", name: "Mizu Drift Brushed Brass Mixer", retailPrice: 420, tradeDiscount: 10, code: "RE-129", category: "Tapware" },
  { id: "mat-2", brand: "Beaumont Tiles", name: "Majorca Terrazzo Look Porcelain Tile (sqm)", retailPrice: 78, tradeDiscount: 10, code: "BM-884", category: "Tiling" },
  { id: "mat-3", brand: "Laminex", name: "AbsoluteMatte Organic Ash Panel (2400x1200)", retailPrice: 195, tradeDiscount: 10, code: "LM-093", category: "Joinery" },
  { id: "mat-4", brand: "Colorbond", name: "Monument Steel Roofing Panel (lineal meter)", retailPrice: 34, tradeDiscount: 10, code: "CB-702", category: "Roofing" },
];

export default function TradieDashboardDemo() {
  const [activeTab, setActiveTab] = useState<"leads" | "buyers" | "portfolio" | "seo">("leads");
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [credits, setCredits] = useState(45);
  const [selectedLeadId, setSelectedLeadId] = useState<string>("lead-1");
  const [unlocking, setUnlocking] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [proposalText, setProposalText] = useState("");

  // Buyers Club state
  const [orderQuantity, setOrderQuantity] = useState<{ [key: string]: number }>({ "mat-1": 1, "mat-2": 10 });
  const [orderingMatId, setOrderingMatId] = useState<string | null>(null);

  // Portfolio tagging state
  const [portfolioTags, setPortfolioTags] = useState<{ x: number; y: number; label: string }[]>([
    { x: 35, y: 40, label: "Reece Brushed Brass Gooseneck Mixer ($378 Trade)" },
    { x: 68, y: 55, label: "Laminex Organic Ash Soft-close Cabinetry ($175.5 Trade)" },
  ]);
  const [newTagName, setNewTagName] = useState("");
  const [taggingMode, setTaggingMode] = useState(false);

  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const handleUnlock = () => {
    if (credits < activeLead.creditsCost) {
      alert("Insufficient credits! Upgrade your subscription or purchase extra credits to unlock this lead.");
      return;
    }

    setUnlocking(true);
    setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) => (l.id === activeLead.id ? { ...l, isLocked: false } : l))
      );
      setCredits((prev) => prev - activeLead.creditsCost);
      setUnlocking(false);
    }, 1200);
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalText.trim()) return;

    setProposalSent(true);
    setTimeout(() => {
      setProposalSent(false);
      setProposalText("");
      alert(`Message successfully dispatched to ${activeLead.clientName}! Check your email for reply tracking.`);
    }, 1200);
  };

  const handleOrderMaterial = (matId: string, name: string, price: number) => {
    setOrderingMatId(matId);
    setTimeout(() => {
      setOrderingMatId(null);
      alert(`B2B Buyers Club order successfully placed!\nItem: ${name}\nTotal: $${price.toFixed(2)} AUD\nStatus: Dispatched to Gold Coast Depot (Free Courier Delivery)`);
    }, 1800);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!taggingMode || !newTagName.trim()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPortfolioTags((prev) => [...prev, { x, y, label: newTagName }]);
    setNewTagName("");
    setTaggingMode(false);
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
            🟢 INTERACTIVE PORTAL DEMO (ELITE PLAN)
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

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 28,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: 12,
          overflowX: "auto",
        }}
      >
        {[
          { id: "leads", label: "🪙 Leads Board", count: leads.length },
          { id: "buyers", label: "🤝 Buyers Club", badge: "10% Off" },
          { id: "portfolio", label: "📸 Portfolio Tags", badge: "Archipro" },
          { id: "seo", label: "📈 Google SEO Report", badge: "Live" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              background: activeTab === tab.id ? "var(--ocean-500)" : "rgba(255,255,255,0.05)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.2s ease",
            }}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span style={{ background: "rgba(255,255,255,0.2)", fontSize: "0.7rem", padding: "2px 6px", borderRadius: 50 }}>
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span style={{ background: "var(--gold)", color: "white", fontSize: "0.6rem", padding: "1px 6px", borderRadius: 50, fontWeight: 900 }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT: LEADS BOARD ── */}
      {activeTab === "leads" && (
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

          {/* Right Side: Lead Details */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-xl)", padding: 24, minHeight: 460, position: "relative" }}>
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
              <div style={{ background: "rgba(10,31,30,0.88)", border: "1px dashed rgba(61,153,144,0.3)", borderRadius: "var(--radius-lg)", padding: "36px 24px", textAlign: "center", backdropFilter: "blur(4px)", marginTop: 20 }}>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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

                <form onSubmit={handleSendProposal} style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                  <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }} htmlFor="proposalText">
                    Send Direct Quote Proposal / Message
                  </label>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input
                      id="proposalText"
                      type="text"
                      placeholder={`E.g. Hi ${activeLead.clientName}, I am a QBCC-licensed builder available to inspect your job...`}
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
      )}

      {/* ── TAB CONTENT: B2B BUYERS CLUB ── */}
      {activeTab === "buyers" && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-xl)", padding: 28 }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-300)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
              B2B Material Buyers Club Portal
            </span>
            <h3 style={{ color: "white", fontSize: "1.45rem", margin: 0 }}>Direct Supplier Integration & Wholesaling</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", marginTop: 4 }}>
              As an Elite Partner, get 10% direct trade discounts at major suppliers. Place orders instantly with free delivery directly to your active construction site.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {MOCK_MATERIALS.map((mat) => {
              const qty = orderQuantity[mat.id] || 1;
              const tradePrice = mat.retailPrice * (1 - mat.tradeDiscount / 100);
              const totalPrice = tradePrice * qty;
              const totalSavings = mat.retailPrice * (mat.tradeDiscount / 100) * qty;

              return (
                <div key={mat.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius-lg)", padding: 22, display: "flex", flexDirection: "column", justifySelf: "stretch" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--gold-light)", fontWeight: 700, background: "rgba(201,151,42,0.15)", padding: "2px 8px", borderRadius: 50 }}>
                      {mat.brand}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Code: {mat.code}</span>
                  </div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 800, margin: "0 0 12px", color: "white", minHeight: 40 }}>{mat.name}</h4>
                  
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 8, marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                      <span>Retail Price:</span>
                      <span style={{ textDecoration: "line-through" }}>${mat.retailPrice} AUD</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 800, color: "white" }}>
                      <span>Trade Member Price:</span>
                      <span style={{ color: "#4ade80" }}>${tradePrice.toFixed(2)} AUD</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>Quantity:</span>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={qty}
                      onChange={(e) => setOrderQuantity(prev => ({ ...prev, [mat.id]: parseInt(e.target.value) || 1 }))}
                      style={{
                        width: 54,
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 6,
                        color: "white",
                        padding: "4px 8px",
                        textAlign: "center",
                        fontSize: "0.85rem",
                      }}
                    />
                    <span style={{ fontSize: "0.72rem", color: "var(--gold-light)", fontWeight: 700 }}>
                      💾 Save ${totalSavings.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOrderMaterial(mat.id, mat.name, totalPrice)}
                    disabled={orderingMatId !== null}
                    style={{
                      marginTop: "auto",
                      padding: "10px",
                      background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))",
                      border: "none",
                      borderRadius: 8,
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {orderingMatId === mat.id ? "⏳ Securing Wholesale Allocation..." : `Order & Ship — $${totalPrice.toFixed(2)}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB CONTENT: PORTFOLIO TAGGING ── */}
      {activeTab === "portfolio" && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-xl)", padding: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 32 }} className="demo-grid-wrap">
            {/* Interactive Image Panel */}
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--ocean-300)", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Archipro-style Project Curation (Click Image to Add Tags)
              </span>
              
              <div
                onClick={handleImageClick}
                style={{
                  position: "relative",
                  width: "100%",
                  height: 340,
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: taggingMode ? "crosshair" : "default",
                  border: taggingMode ? "2px dashed var(--gold)" : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Image src="/images/luxury_kitchen.png" alt="Portfolio Spec" fill style={{ objectFit: "cover" }} unoptimized />
                
                {/* Render Tags */}
                {portfolioTags.map((tag, idx) => (
                  <div
                    key={idx}
                    title={tag.label}
                    style={{
                      position: "absolute",
                      left: `${tag.x}%`,
                      top: `${tag.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ position: "relative" }} className="tag-wrapper">
                      {/* Pulse point */}
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--gold)", border: "3px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.35)", animation: "pulse 2s infinite" }} />
                      {/* Tag Card */}
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          bottom: 28,
                          transform: "translateX(-50%)",
                          background: "rgba(10,31,30,0.92)",
                          border: "1.5px solid var(--gold)",
                          borderRadius: 8,
                          padding: "6px 12px",
                          color: "white",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          boxShadow: "var(--shadow-md)",
                          pointerEvents: "none",
                        }}
                      >
                        {tag.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", display: "block", marginTop: 8, textAlign: "center" }}>
                Hover over the gold dots to view integrated material specifications.
              </span>
            </div>

            {/* Tag Control Board */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--ocean-300)", fontWeight: 800 }}>ARCHIPRO BRAND EXPOSURE</span>
                <h4 style={{ color: "white", fontSize: "1.25rem", margin: "4px 0 0" }}>Interactive Material Tags</h4>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.6, marginTop: 8 }}>
                  Elite members can tag material codes directly in their portfolio photos. When homeowners click a tag, it links to our affiliate B2B suppliers, earning you **3% affiliate profit share** on purchases.
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: 18, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 700, display: "block", marginBottom: 8 }}>
                  Add Material Tag Simulator
                </label>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <input
                    type="text"
                    placeholder="E.g. Beaumont Tiles Matt Grey Tile..."
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      padding: "8px 14px",
                      color: "white",
                      fontSize: "0.8rem",
                    }}
                  />
                  <button
                    onClick={() => setTaggingMode(true)}
                    disabled={!newTagName.trim() || taggingMode}
                    style={{
                      background: "var(--gold)",
                      border: "none",
                      borderRadius: 8,
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      padding: "0 16px",
                      cursor: "pointer",
                    }}
                  >
                    Place Tag
                  </button>
                </div>
                {taggingMode && (
                  <div style={{ fontSize: "0.75rem", color: "var(--gold-light)", fontWeight: 700 }}>
                    ⚡ Now, click anywhere on the left kitchen photo to place the tag point!
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>CURRENT PHOTO TAGS</span>
                {portfolioTags.map((t, idx) => (
                  <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "6px 12px", borderRadius: 6, fontSize: "0.78rem", color: "rgba(255,255,255,0.8)" }}>
                    📍 {t.label}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── TAB CONTENT: SEO & MARKETING REPORT ── */}
      {activeTab === "seo" && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-xl)", padding: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32 }} className="demo-grid-wrap">
            {/* SEO Data Board */}
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-300)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                Google Search Engine Optimization Visibility
              </span>
              <h3 style={{ color: "white", fontSize: "1.45rem", margin: "0 0 20px" }}>Local Organic Traffic Report</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
                {[
                  { label: "Google Impressions", value: "14,820", trend: "+24% MoM" },
                  { label: "Profile Clicks", value: "920", trend: "+18% MoM" },
                  { label: "Est. Lead Value Sav.", value: "$2,760", trend: "Based on $30/lead CAC" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px" }}>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", display: "block" }}>{stat.label}</span>
                    <strong style={{ fontSize: "1.25rem", color: "white", display: "block", margin: "4px 0" }}>{stat.value}</strong>
                    <span style={{ fontSize: "0.68rem", color: "#4ade80", fontWeight: 700 }}>{stat.trend}</span>
                  </div>
                ))}
              </div>

              {/* Keywords SEO table */}
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                  Active Google Ranking Keywords for EIJ Construction
                </span>
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        <th style={{ padding: "10px 14px" }}>Keyword</th>
                        <th style={{ padding: "10px 14px" }}>Google Rank</th>
                        <th style={{ padding: "10px 14px" }}>Monthly Volume</th>
                        <th style={{ padding: "10px 14px" }}>Click CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { kw: "Gold Coast Luxury Renovations", rank: "#2", vol: "820", ctr: "12.4%" },
                        { kw: "Southport Bathroom Builder", rank: "#3", vol: "480", ctr: "9.8%" },
                        { kw: "Licensed Kitchen Builder Broadbeach", rank: "#1", vol: "290", ctr: "24.1%" },
                        { kw: "QLD Compliant Waterproofing", rank: "#5", vol: "1,120", ctr: "4.5%" },
                      ].map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 700 }}>{item.kw}</td>
                          <td style={{ padding: "10px 14px", color: "var(--gold-light)" }}>{item.rank}</td>
                          <td style={{ padding: "10px 14px" }}>{item.vol} /mo</td>
                          <td style={{ padding: "10px 14px", color: "#4ade80" }}>{item.ctr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* SEO Strategy Panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
              <div style={{ background: "rgba(61,153,144,0.08)", border: "1px solid rgba(61,153,144,0.15)", borderRadius: 12, padding: "20px 24px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--ocean-300)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  ✦ How We Rank Your Profile
                </span>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
                  We auto-generate schema-structured **Project Story Pages** from your portfolio uploads. These are dynamically index-registered on Google Search using QLD suburb keywords. 
                  <br /><br />
                  This bypasses the need for high marketing budgets — organic leads flow directly to your profile based on your local area.
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "18px 20px", borderRadius: 12 }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", display: "block" }}>LIVE PROFILE CANONICAL URL</span>
                <a href="/directory/t-1" target="_blank" style={{ color: "var(--ocean-300)", fontSize: "0.85rem", textDecoration: "none", fontWeight: 700, display: "block", marginTop: 4 }}>
                  🔗 coasthomehub.com.au/directory/t-1
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201,151,42,0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(201,151,42,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201,151,42,0); }
        }
        @media (max-width: 820px) {
          .demo-grid-wrap {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}

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
        background: "var(--sand-50)",
        borderRadius: 4,
        border: "1px solid var(--sand-300)",
        boxShadow: "0 4px 24px rgba(26, 35, 50, 0.03)",
        padding: "40px",
        color: "var(--slate-dark)",
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
          borderBottom: "3px double var(--sand-300)",
          paddingBottom: 24,
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--ocean-50)", padding: "4px 10px", borderRadius: 2, fontSize: "0.68rem", fontWeight: 800, color: "var(--ocean-700)", border: "1px solid var(--ocean-100)", letterSpacing: "0.05em" }}>
            ✦ INTERACTIVE PORTAL DEMO // ELITE PARTNER
          </div>
          <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--slate-dark)", margin: "8px 0 0" }}>Welcome back, EIJ Construction</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "10px 18px", textAlign: "right" }}>
            <span style={{ fontSize: "0.62rem", color: "var(--slate-light)", display: "block", letterSpacing: "0.04em", fontWeight: 700 }}>ACCOUNT TYPE</span>
            <span style={{ fontWeight: 800, color: "var(--gold)", fontSize: "0.88rem", fontFamily: "Outfit, sans-serif" }}>👑 Elite Partner</span>
          </div>
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "10px 18px", textAlign: "right" }}>
            <span style={{ fontSize: "0.62rem", color: "var(--slate-light)", display: "block", letterSpacing: "0.04em", fontWeight: 700 }}>AVAILABLE CREDITS</span>
            <span style={{ fontWeight: 800, color: "var(--ocean-600)", fontSize: "1.1rem", fontFamily: "Lora, Georgia, serif" }}>🪙 {credits}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 32,
          borderBottom: "1px solid var(--sand-300)",
          paddingBottom: 0,
          overflowX: "auto",
        }}
      >
        {[
          { id: "leads", label: "Leads Board", count: leads.length },
          { id: "buyers", label: "Buyers Club", badge: "10% Off" },
          { id: "portfolio", label: "Portfolio Tags", badge: "Archipro" },
          { id: "seo", label: "Google SEO Report", badge: "Live" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "12px 4px",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid var(--ocean-600)" : "2px solid transparent",
              background: "transparent",
              color: activeTab === tab.id ? "var(--slate-dark)" : "var(--slate-light)",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "var(--transition-fast)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span style={{ background: activeTab === tab.id ? "var(--ocean-50)" : "var(--sand-100)", color: activeTab === tab.id ? "var(--ocean-700)" : "var(--slate-mid)", fontSize: "0.72rem", padding: "2px 8px", borderRadius: 2, fontWeight: 800, border: activeTab === tab.id ? "1px solid var(--ocean-200)" : "1px solid var(--sand-200)" }}>
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span style={{ background: activeTab === tab.id ? "var(--gold)" : "var(--sand-300)", color: activeTab === tab.id ? "white" : "var(--slate-mid)", fontSize: "0.62rem", padding: "2px 6px", borderRadius: 2, fontWeight: 800, letterSpacing: "0.02em" }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT: LEADS BOARD ── */}
      {activeTab === "leads" && (
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 32 }} className="demo-grid-wrap">
          {/* Left Side: Lead Feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 4 }}>
              Active Renovation Leads ({leads.length})
            </span>
            {leads.map((lead) => {
              const isSelected = lead.id === selectedLeadId;
              return (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  style={{
                    border: isSelected ? "1px solid var(--ocean-600)" : "1px solid var(--sand-300)",
                    borderRadius: "4px",
                    padding: "20px 22px",
                    background: isSelected ? "white" : "rgba(255,255,255,0.5)",
                    boxShadow: isSelected ? "var(--shadow-sm)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "var(--transition-fast)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                    <span style={{ color: "var(--ocean-600)", fontWeight: 700, fontSize: "0.8rem", fontFamily: "Outfit, sans-serif" }}>📍 {lead.suburb}</span>
                    {lead.isLocked ? (
                      <span style={{ fontSize: "0.68rem", background: "var(--sand-100)", color: "var(--sand-50)", padding: "3px 8px", borderRadius: 2, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                        🔒 Locked
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.68rem", background: "var(--ocean-50)", color: "var(--ocean-600)", padding: "3px 8px", borderRadius: 2, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                        🔓 Unlocked
                      </span>
                    )}
                  </div>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", color: "var(--slate-dark)", fontSize: "1.05rem", fontWeight: 600, margin: "0 0 6px" }}>{lead.category}</h4>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.82rem", lineClamp: 2, WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", margin: "0 0 14px", lineHeight: 1.5 }}>
                    {lead.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--sand-200)", paddingTop: 10 }}>
                    <span style={{ fontSize: "0.74rem", color: "var(--slate-light)" }}>Estimated Budget</span>
                    <span style={{ fontFamily: "Lora, Georgia, serif", color: "var(--gold)", fontWeight: 600, fontSize: "0.92rem" }}>{lead.budget}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Lead Details */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: "4px", padding: "32px", minHeight: 460, position: "relative", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px double var(--sand-300)", paddingBottom: 20, marginBottom: 24 }}>
              <div>
                <span style={{ color: "var(--ocean-500)", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{activeLead.category}</span>
                <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", fontWeight: 600, margin: "6px 0 0", color: "var(--slate-dark)" }}>{activeLead.suburb}</h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block" }}>EST. JOB VALUE</span>
                <strong style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.4rem", color: "var(--gold)", fontWeight: 600 }}>{activeLead.budget}</strong>
              </div>
            </div>

            <p style={{ fontFamily: "Lora, Georgia, serif", color: "var(--slate-mid)", fontSize: "1.02rem", lineHeight: 1.8, marginBottom: 28 }}>
              {activeLead.description}
            </p>

            {activeLead.isLocked ? (
              <div style={{ background: "var(--sand-50)", border: "1px dashed var(--sand-300)", borderRadius: "4px", padding: "48px 32px", textAlign: "center", marginTop: 24 }}>
                <div style={{ fontSize: "2.4rem", marginBottom: 16 }}>🔒</div>
                <h3 style={{ fontFamily: "Lora, Georgia, serif", color: "var(--slate-dark)", fontSize: "1.2rem", marginBottom: 8, fontWeight: 600 }}>Contact Details Locked</h3>
                <p style={{ color: "var(--slate-light)", fontSize: "0.85rem", maxWidth: 400, margin: "0 auto 28px", lineHeight: 1.6 }}>
                  Unlock this lead using your monthly credits. You will gain immediate access to client&apos;s name, phone, email, and detailed room photos.
                </p>
                <button
                  onClick={handleUnlock}
                  disabled={unlocking}
                  style={{
                    background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                    border: "none",
                    borderRadius: "4px",
                    padding: "13px 36px",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(201,151,42,0.25)",
                    transition: "var(--transition)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {unlocking ? "⏳ Verifying QBCC Class..." : `🔑 Unlock Lead — ${activeLead.creditsCost} Credits`}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: "4px", padding: "20px 24px" }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block", letterSpacing: "0.02em" }}>CONTACT NAME</span>
                    <strong style={{ color: "var(--slate-dark)", fontSize: "0.92rem" }}>👤 {activeLead.clientName}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block", letterSpacing: "0.02em" }}>PHONE NUMBER</span>
                    <a href={`tel:${activeLead.clientPhone}`} style={{ color: "var(--ocean-600)", fontSize: "0.92rem", textDecoration: "none", fontWeight: 700 }}>
                      📞 {activeLead.clientPhone}
                    </a>
                  </div>
                  <div style={{ gridColumn: "span 2", borderTop: "1px solid var(--sand-200)", paddingTop: 12, marginTop: 4 }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block", letterSpacing: "0.02em" }}>EMAIL ADDRESS</span>
                    <a href={`mailto:${activeLead.clientEmail}`} style={{ color: "var(--ocean-600)", fontSize: "0.92rem", textDecoration: "none", fontWeight: 600 }}>
                      ✉️ {activeLead.clientEmail}
                    </a>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block", marginBottom: 8, letterSpacing: "0.02em" }}>CUSTOMER BEFORE PHOTO</span>
                    <div style={{ position: "relative", height: 160, borderRadius: "4px", overflow: "hidden", border: "1px solid var(--sand-200)" }}>
                      <Image src={activeLead.beforeImage} alt="Before" fill style={{ objectFit: "cover" }} unoptimized />
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block", marginBottom: 8, letterSpacing: "0.02em" }}>AI DESIGN CONCEPT</span>
                    <div style={{ position: "relative", height: 160, borderRadius: "4px", overflow: "hidden", border: "1px solid var(--sand-200)" }}>
                      <Image src={activeLead.afterImage} alt="AI Concept" fill style={{ objectFit: "cover" }} unoptimized />
                    </div>
                  </div>
                </div>

                <div style={{ background: "rgba(240, 249, 248, 0.6)", border: "1px solid var(--ocean-100)", borderRadius: "4px", padding: "20px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-700)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 10 }}>
                    ✦ AI Recommended Project Materials
                  </span>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0 }}>
                    {activeLead.aiSpecs.map((spec) => (
                      <li key={spec} style={{ display: "flex", gap: 10, fontSize: "0.85rem", color: "var(--slate-mid)", alignItems: "center" }}>
                        <span style={{ color: "var(--ocean-600)", fontWeight: 700 }}>✦</span><span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleSendProposal} style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid var(--sand-200)", paddingTop: 20 }}>
                  <label style={{ fontSize: "0.78rem", color: "var(--slate-light)", fontWeight: 700 }} htmlFor="proposalText">
                    Send Direct Quote Proposal / Message
                  </label>
                  <div style={{ display: "flex", gap: 12 }}>
                    <input
                      id="proposalText"
                      type="text"
                      placeholder={`E.g. Hi ${activeLead.clientName}, I am a QBCC-licensed builder available to inspect your job...`}
                      value={proposalText}
                      onChange={(e) => setProposalText(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        background: "white",
                        border: "1px solid var(--sand-300)",
                        borderRadius: "4px",
                        padding: "12px 16px",
                        color: "var(--slate-dark)",
                        fontSize: "0.88rem",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={proposalSent}
                      style={{
                        background: "var(--ocean-600)",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 24px",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontFamily: "Outfit, sans-serif",
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
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: "4px", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ marginBottom: 28, borderBottom: "3px double var(--sand-300)", paddingBottom: 20 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-600)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
              B2B Material Buyers Club Portal
            </span>
            <h3 style={{ fontFamily: "Lora, Georgia, serif", color: "var(--slate-dark)", fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>Direct Supplier Integration & Wholesaling</h3>
            <p style={{ color: "var(--slate-light)", fontSize: "0.88rem", marginTop: 6 }}>
              As an Elite Partner, get 10% direct trade discounts at major suppliers. Place orders instantly with free delivery directly to your active construction site.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {MOCK_MATERIALS.map((mat) => {
              const qty = orderQuantity[mat.id] || 1;
              const tradePrice = mat.retailPrice * (1 - mat.tradeDiscount / 100);
              const totalPrice = tradePrice * qty;
              const totalSavings = mat.retailPrice * (mat.tradeDiscount / 100) * qty;

              return (
                <div key={mat.id} style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: "4px", padding: 24, display: "flex", flexDirection: "column", justifySelf: "stretch" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: "0.68rem", color: "var(--gold)", fontWeight: 800, background: "white", padding: "4px 10px", borderRadius: 2, border: "1px solid var(--sand-300)", letterSpacing: "0.02em" }}>
                      {mat.brand}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--slate-light)" }}>Code: {mat.code}</span>
                  </div>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.05rem", fontWeight: 600, margin: "0 0 16px", color: "var(--slate-dark)", minHeight: 48, lineHeight: 1.4 }}>{mat.name}</h4>
                  
                  <div style={{ background: "white", padding: 16, borderRadius: "4px", border: "1px solid var(--sand-200)", marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--slate-light)", marginBottom: 6 }}>
                      <span>Retail Price:</span>
                      <span style={{ textDecoration: "line-through" }}>${mat.retailPrice} AUD</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 800, color: "var(--slate-dark)" }}>
                      <span>Trade Member Price:</span>
                      <span style={{ color: "var(--ocean-600)" }}>${tradePrice.toFixed(2)} AUD</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--slate-light)" }}>Quantity:</span>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={qty}
                      onChange={(e) => setOrderQuantity(prev => ({ ...prev, [mat.id]: parseInt(e.target.value) || 1 }))}
                      style={{
                        width: 58,
                        background: "white",
                        border: "1px solid var(--sand-300)",
                        borderRadius: 4,
                        color: "var(--slate-dark)",
                        padding: "6px 8px",
                        textAlign: "center",
                        fontSize: "0.85rem",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    />
                    <span style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 700 }}>
                      💾 Save ${totalSavings.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOrderMaterial(mat.id, mat.name, totalPrice)}
                    disabled={orderingMatId !== null}
                    style={{
                      marginTop: "auto",
                      padding: "12px",
                      background: "var(--ocean-600)",
                      border: "none",
                      borderRadius: "4px",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontFamily: "Outfit, sans-serif",
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
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: "4px", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 36 }} className="demo-grid-wrap">
            {/* Interactive Image Panel */}
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-600)", textTransform: "uppercase", display: "block", marginBottom: 12, letterSpacing: "0.04em" }}>
                Archipro-style Project Curation (Click Image to Add Tags)
              </span>
              
              <div
                onClick={handleImageClick}
                style={{
                  position: "relative",
                  width: "100%",
                  height: 380,
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: taggingMode ? "crosshair" : "default",
                  border: taggingMode ? "2px dashed var(--gold)" : "1px solid var(--sand-200)",
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
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--gold)", border: "2px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.35)", animation: "pulse 2s infinite" }} />
                      {/* Tag Card */}
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          bottom: 28,
                          transform: "translateX(-50%)",
                          background: "var(--slate-dark)",
                          border: "1px solid var(--gold)",
                          borderRadius: 2,
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
              <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", display: "block", marginTop: 10, textAlign: "center", fontStyle: "italic" }}>
                Hover over the gold dots to view integrated material specifications.
              </span>
            </div>

            {/* Tag Control Board */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
              <div>
                <span style={{ fontSize: "0.68rem", color: "var(--ocean-600)", fontWeight: 800, letterSpacing: "0.04em" }}>ARCHIPRO BRAND EXPOSURE</span>
                <h4 style={{ fontFamily: "Lora, Georgia, serif", color: "var(--slate-dark)", fontSize: "1.3rem", fontWeight: 600, margin: "6px 0 0" }}>Interactive Material Tags</h4>
                <p style={{ color: "var(--slate-light)", fontSize: "0.82rem", lineHeight: 1.65, marginTop: 8 }}>
                  Elite members can tag material codes directly in their portfolio photos. When homeowners click a tag, it links to our affiliate B2B suppliers, earning you **3% affiliate profit share** on purchases.
                </p>
              </div>

              <div style={{ background: "var(--sand-50)", padding: 20, borderRadius: "4px", border: "1px solid var(--sand-200)" }}>
                <label style={{ fontSize: "0.78rem", color: "var(--slate-dark)", fontWeight: 800, display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.02em" }}>
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
                      background: "white",
                      border: "1px solid var(--sand-300)",
                      borderRadius: 4,
                      padding: "10px 14px",
                      color: "var(--slate-dark)",
                      fontSize: "0.82rem",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  />
                  <button
                    onClick={() => setTaggingMode(true)}
                    disabled={!newTagName.trim() || taggingMode}
                    style={{
                      background: "var(--gold)",
                      border: "none",
                      borderRadius: 4,
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      padding: "0 18px",
                      cursor: "pointer",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Place Tag
                  </button>
                </div>
                {taggingMode && (
                  <div style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 700 }}>
                    ⚡ Now, click anywhere on the left kitchen photo to place the tag point!
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: "0.7rem", color: "var(--slate-light)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>CURRENT PHOTO TAGS</span>
                {portfolioTags.map((t, idx) => (
                  <div key={idx} style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: "8px 12px", borderRadius: 4, fontSize: "0.78rem", color: "var(--slate-mid)", fontFamily: "Outfit, sans-serif" }}>
                    ✦ {t.label}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── TAB CONTENT: SEO & MARKETING REPORT ── */}
      {activeTab === "seo" && (
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: "4px", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 36 }} className="demo-grid-wrap">
            {/* SEO Data Board */}
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-600)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                Google Search Engine Optimization Visibility
              </span>
              <h3 style={{ fontFamily: "Lora, Georgia, serif", color: "var(--slate-dark)", fontSize: "1.5rem", fontWeight: 600, margin: "0 0 24px" }}>Local Organic Traffic Report</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
                {[
                  { label: "Google Impressions", value: "14,820", trend: "+24% MoM" },
                  { label: "Profile Clicks", value: "920", trend: "+18% MoM" },
                  { label: "Est. Lead Value Sav.", value: "$2,760", trend: "Based on $30/lead CAC" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: 4, padding: "18px" }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--slate-light)", display: "block" }}>{stat.label}</span>
                    <strong style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.35rem", color: "var(--slate-dark)", display: "block", margin: "6px 0" }}>{stat.value}</strong>
                    <span style={{ fontSize: "0.68rem", color: "var(--ocean-600)", fontWeight: 700 }}>{stat.trend}</span>
                  </div>
                ))}
              </div>

              {/* Keywords SEO table */}
              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 12, letterSpacing: "0.02em" }}>
                  Active Google Ranking Keywords for EIJ Construction
                </span>
                <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 4, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "var(--sand-50)", borderBottom: "1px solid var(--sand-200)" }}>
                        <th style={{ padding: "12px 16px", color: "var(--slate-dark)", fontWeight: 800 }}>Keyword</th>
                        <th style={{ padding: "12px 16px", color: "var(--slate-dark)", fontWeight: 800 }}>Google Rank</th>
                        <th style={{ padding: "12px 16px", color: "var(--slate-dark)", fontWeight: 800 }}>Monthly Volume</th>
                        <th style={{ padding: "12px 16px", color: "var(--slate-dark)", fontWeight: 800 }}>Click CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { kw: "Gold Coast Luxury Renovations", rank: "#2", vol: "820", ctr: "12.4%" },
                        { kw: "Southport Bathroom Builder", rank: "#3", vol: "480", ctr: "9.8%" },
                        { kw: "Licensed Kitchen Builder Broadbeach", rank: "#1", vol: "290", ctr: "24.1%" },
                        { kw: "QLD Compliant Waterproofing", rank: "#5", vol: "1,120", ctr: "4.5%" },
                      ].map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid var(--sand-200)" }}>
                          <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--slate-dark)" }}>{item.kw}</td>
                          <td style={{ padding: "12px 16px", color: "var(--gold)", fontWeight: 700 }}>{item.rank}</td>
                          <td style={{ padding: "12px 16px" }}>{item.vol} /mo</td>
                          <td style={{ padding: "12px 16px", color: "var(--ocean-600)", fontWeight: 700 }}>{item.ctr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* SEO Strategy Panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
              <div style={{ background: "rgba(240, 249, 248, 0.75)", border: "1px solid var(--ocean-100)", borderRadius: 4, padding: "24px" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-700)", textTransform: "uppercase", display: "block", marginBottom: 8, letterSpacing: "0.02em" }}>
                  ✦ How We Rank Your Profile
                </span>
                <p style={{ fontSize: "0.82rem", color: "var(--slate-mid)", lineHeight: 1.7, margin: 0 }}>
                  We auto-generate schema-structured **Project Story Pages** from your portfolio uploads. These are dynamically index-registered on Google Search using QLD suburb keywords. 
                  <br /><br />
                  This bypasses the need for high marketing budgets — organic leads flow directly to your profile based on your local area.
                </p>
              </div>

              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: "20px", borderRadius: 4 }}>
                <span style={{ fontSize: "0.68rem", color: "var(--slate-light)", display: "block", letterSpacing: "0.02em" }}>LIVE PROFILE CANONICAL URL</span>
                <a href="/directory/t-1" target="_blank" style={{ color: "var(--ocean-600)", fontSize: "0.85rem", textDecoration: "none", fontWeight: 700, display: "block", marginTop: 6, borderBottom: "1px dashed var(--ocean-400)", width: "fit-content" }}>
                  coasthomehub.com.au/directory/t-1
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
            gap: 28px !important;
          }
        }
      `}} />
    </div>
  );
}

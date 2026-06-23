"use client";

import React, { useState } from "react";
import Link from "next/link";

type SubframeMaterial = "pine_h3" | "pine_h4" | "gal_steel";
type BoardMaterial = "pine" | "merbau" | "spotted_gum" | "composite_classic" | "composite_premium";
type FixingMethod = "face_screws" | "concealed_clips";
type BalustradeStyle = "none" | "timber_wire" | "steel_wire" | "glass";
type PergolaStyle = "none" | "louvred" | "flyover";
type GroundCondition = "concrete" | "soil" | "sandy";
type ClearanceLevel = "low" | "mid" | "high";
type FinishLevel = "budget" | "mid" | "premium";

export default function DeckPlannerPage() {
  // Inputs
  const [lengthInput, setLengthInput] = useState("6.00");
  const [widthInput, setWidthInput] = useState("4.00");
  const [clearance, setClearance] = useState<ClearanceLevel>("mid");
  const [ground, setGround] = useState<GroundCondition>("soil");
  
  // Selection configurations
  const [finishLevel, setFinishLevel] = useState<FinishLevel>("mid");
  const [subframe, setSubframe] = useState<SubframeMaterial>("pine_h3");
  const [joistSpacing, setJoistSpacing] = useState<450 | 400>(450);
  
  const [boardMaterial, setBoardMaterial] = useState<BoardMaterial>("merbau");
  const [boardWidth, setBoardWidth] = useState<90 | 140>(90);
  const [fixingMethod, setFixingMethod] = useState<FixingMethod>("face_screws");
  const [pictureFraming, setPictureFraming] = useState<0 | 1 | 2>(1); // none, single, double borders
  
  const [stepsCount, setStepsCount] = useState<number>(0);
  const [balustradeStyle, setBalustradeStyle] = useState<BalustradeStyle>("none");
  const [pergolaStyle, setPergolaStyle] = useState<PergolaStyle>("none");

  // Tabs state
  const [activeTab, setActiveTab] = useState<"dimensions" | "framering" | "boards" | "additions">("dimensions");

  // Presets Selection
  const applyPreset = (preset: "balcony" | "patio" | "verandah" | "custom") => {
    if (preset === "balcony") {
      setLengthInput("3.00");
      setWidthInput("2.00");
      setClearance("low");
      setGround("concrete");
      setBoardMaterial("pine");
      setBoardWidth(90);
      setFixingMethod("face_screws");
      setBalustradeStyle("timber_wire");
      setPergolaStyle("none");
      setStepsCount(0);
    } else if (preset === "patio") {
      setLengthInput("5.00");
      setWidthInput("4.00");
      setClearance("mid");
      setGround("soil");
      setBoardMaterial("merbau");
      setBoardWidth(90);
      setFixingMethod("face_screws");
      setBalustradeStyle("none");
      setPergolaStyle("none");
      setStepsCount(2);
    } else if (preset === "verandah") {
      setLengthInput("8.00");
      setWidthInput("5.00");
      setClearance("mid");
      setGround("soil");
      setBoardMaterial("spotted_gum");
      setBoardWidth(140);
      setFixingMethod("face_screws");
      setBalustradeStyle("timber_wire");
      setPergolaStyle("louvred");
      setStepsCount(3);
    } else if (preset === "custom") {
      setLengthInput("10.00");
      setWidthInput("6.00");
      setClearance("high");
      setGround("soil");
      setBoardMaterial("composite_premium");
      setBoardWidth(140);
      setFixingMethod("concealed_clips");
      setBalustradeStyle("glass");
      setPergolaStyle("flyover");
      setStepsCount(4);
    }
  };

  // Safe Dimension Parsing
  const length = Math.min(18.0, Math.max(1.5, parseFloat(lengthInput) || 6.0));
  const width = Math.min(12.0, Math.max(1.5, parseFloat(widthInput) || 4.0));

  // Step Controllers
  const adjustLength = (amount: number) => {
    const val = parseFloat(lengthInput) || 6.0;
    setLengthInput(Math.min(18.0, Math.max(1.5, val + amount)).toFixed(2));
  };
  const adjustWidth = (amount: number) => {
    const val = parseFloat(widthInput) || 4.0;
    setWidthInput(Math.min(12.0, Math.max(1.5, val + amount)).toFixed(2));
  };

  // 1. Structural calculations (QLD Span Tables / AS 1684 references)
  const area = length * width;
  const perimeter = (length + width) * 2;

  // Bearers run horizontally (width axis). Spacing between bearers is typically 1.5m - 1.8m for pine.
  const bearerSpacing = subframe === "gal_steel" ? 2.2 : 1.6;
  const bearersCount = Math.ceil(width / bearerSpacing) + 1;
  const totalBearersLength = bearersCount * length;

  // Joists run vertically (length axis) over the bearers. Spacing is 450mm or 400mm.
  const joistSpacingM = joistSpacing / 1000;
  const joistsCount = Math.ceil(length / joistSpacingM) + 1;
  const totalJoistsLength = joistsCount * width;

  // Stumps / Posts grid. Bearers are supported by stumps/posts every 1.5m - 1.8m.
  const postSpacing = subframe === "gal_steel" ? 2.5 : 1.5;
  const postsPerBearer = Math.ceil(length / postSpacing) + 1;
  const totalPostsStumps = bearersCount * postsPerBearer;

  // Concrete post-mix bags (2 bags per stump/post for soil footings)
  const concreteBagsNeeded = ground === "soil" ? totalPostsStumps * 2 : ground === "sandy" ? totalPostsStumps * 3 : 0;

  // 2. Decking boards calculations
  // Effective board width including 5mm expansion joint spacing
  const effBoardWidth = (boardWidth + 5) / 1000; 
  // Add 10% wastage standard, or 15% if picture framing border is used (more miter joints)
  const boardWastageFactor = pictureFraming > 0 ? 1.15 : 1.10;
  const linearMetersDecking = Math.ceil((area * boardWastageFactor) / effBoardWidth);

  // Decking Fasteners
  // Face screws: 2 screws per joist intersection.
  // Concealed clips: 1 clip per joist intersection.
  const intersectionsCount = joistsCount * Math.ceil(linearMetersDecking / length);
  const totalFasteners = fixingMethod === "face_screws" ? intersectionsCount * 2 : intersectionsCount;
  const fastenersPackSize = fixingMethod === "face_screws" ? 500 : 250;
  const fastenerPacksNeeded = Math.ceil(totalFasteners / fastenersPackSize);

  // Maintenance oil liters (for natural timbers: Pine, Merbau, Spotted Gum)
  // Standard coverage is 10 sqm per liter per coat (requires 2 coats)
  const isTimber = boardMaterial === "pine" || boardMaterial === "merbau" || boardMaterial === "spotted_gum";
  const deckOilLitersNeeded = isTimber ? Math.ceil((area * 2) / 10) : 0;

  // Financial Rates
  const subframeMaterialRates = { pine_h3: 16, pine_h4: 22, gal_steel: 48 }[subframe]; // cost per linear meter
  const boardMaterialRates = { 
    pine: 45, 
    merbau: 85, 
    spotted_gum: 110, 
    composite_classic: 135, 
    composite_premium: 185 
  }[boardMaterial]; // cost per sqm

  const clearanceRates = { low: 75, mid: 95, high: 160 }[clearance]; // subframe elevation prep rate per sqm
  const groundAnchorCost = { concrete: 12, soil: 38, sandy: 65 }[ground]; // anchor fitting cost per stump

  const costExcavationAnchor = (area * clearanceRates) + (totalPostsStumps * groundAnchorCost);
  const costSubframeMaterials = (totalBearersLength * subframeMaterialRates) + (totalJoistsLength * subframeMaterialRates * 0.75); // joist is thinner
  const costConcreteBags = concreteBagsNeeded * 12;

  const costBoardMaterials = area * boardMaterialRates * boardWastageFactor;
  const costFasteners = fastenerPacksNeeded * (fixingMethod === "face_screws" ? 75 : 145);
  const costOilSupplies = deckOilLitersNeeded * 35; // $35 per liter of quality decking oil

  // Labor rates per sqm
  const baseLaborRate = { budget: 75, mid: 120, premium: 185 }[finishLevel];
  const materialLaborSurcharge = isTimber ? 1.0 : 0.85; // composite boards are faster to install (clip systems)
  const costLabor = area * baseLaborRate * materialLaborSurcharge;

  // Balustrades (perimeter length along 3 sides, assuming deck attaches to house on one long side)
  const balustradeLength = length + (width * 2);
  const costBalustrades = balustradeStyle === "none" ? 0 : balustradeLength * {
    timber_wire: 160,
    steel_wire: 280,
    glass: 480
  }[balustradeStyle];

  // Stairs
  const costStairs = stepsCount * 280 + (stepsCount > 2 ? 650 : 0); // extra handrail cost for tall stairs

  // Pergolas
  const costPergola = pergolaStyle === "none" ? 0 : area * {
    louvred: 220,
    flyover: 380
  }[pergolaStyle];

  const subtotal = costExcavationAnchor + costSubframeMaterials + costConcreteBags + costBoardMaterials + costFasteners + costOilSupplies + costLabor + costBalustrades + costStairs + costPergola;
  
  const builderMarginRate = { budget: 0.1, mid: 0.18, premium: 0.25 }[finishLevel];
  const builderMargin = subtotal * builderMarginRate;
  const costForm15 = 220; // Structural timber engineering certificate (QLD Form 15)
  const gst = (subtotal + builderMargin + costForm15) * 0.1;
  const totalCost = subtotal + builderMargin + costForm15 + gst;

  // 2D Visualizer sizing
  const maxDim = Math.max(length, width);
  const scale = 250 / maxDim;
  const roomPixelLength = length * scale;
  const roomPixelWidth = width * scale;
  const xOffset = (280 - roomPixelLength) / 2;
  const yOffset = (280 - roomPixelWidth) / 2;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Oiling warning message
  const maintenanceGuide = boardMaterial.startsWith("composite")
    ? "✦ Composite Deck Curation: No annual oiling or sanding required! Clean twice annually with mild soapy water."
    : "⚠️ Natural Timber Maintenance: Requires annual sanding and application of UV-Protection Decking Oil (approx $180/year in supplies to prevent grey rot).";

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }} className="planner-page">
      {/* Header */}
      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", paddingTop: 130, paddingBottom: 48, color: "white" }} className="no-print">
        <div className="container-lg">
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>&gt;</span>
            <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>Tools</Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>&gt;</span>
            <span style={{ color: "var(--gold-light)", fontSize: "0.8rem" }}>Deck Planner</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.5rem)", margin: 0, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                AI Timber Deck &amp; Pergola Planner
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: "8px 0 0", fontFamily: "Outfit, sans-serif" }}>
                Formulate certified timber framing layouts, bearer spacings, and balustrade compliance sheets.
              </p>
            </div>
            <button
              onClick={handlePrint}
              style={{
                background: "var(--gold-light)",
                color: "var(--slate-dark)",
                border: "none",
                padding: "10px 20px",
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "Outfit, sans-serif"
              }}
            >
              🖨️ Print Builder&apos;s Brief
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container-lg planner-layout" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 440px", gap: 32 }}>
        
        {/* Left Side: Inputs */}
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 32, boxShadow: "var(--shadow-sm)" }} className="no-print">
          
          {/* Quick Presets */}
          <div style={{ marginBottom: 28 }}>
            <span style={{ display: "block", fontSize: "0.76rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", marginBottom: 10, letterSpacing: "0.04em" }}>
              Quick Deck Size Presets
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => applyPreset("balcony")}
                style={{ flex: "1 1 120px", padding: "10px", fontSize: "0.76rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                🌇 Small Balcony <br/><span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>3.0m x 2.0m (Low Deck)</span>
              </button>
              <button
                onClick={() => applyPreset("patio")}
                style={{ flex: "1 1 120px", padding: "10px", fontSize: "0.76rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                🌳 Standard Patio <br/><span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>5.0m x 4.0m (Merbau)</span>
              </button>
              <button
                onClick={() => applyPreset("verandah")}
                style={{ flex: "1 1 120px", padding: "10px", fontSize: "0.76rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                🏡 Large Verandah <br/><span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>8.0m x 5.0m + Pergola</span>
              </button>
              <button
                onClick={() => applyPreset("custom")}
                style={{ flex: "1 1 120px", padding: "10px", fontSize: "0.76rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                👑 Wrap-around Custom <br/><span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>10.0m x 6.0m + Glass</span>
              </button>
            </div>
          </div>

          {/* Tab Selection */}
          <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--sand-200)", paddingBottom: 16, marginBottom: 28, overflowX: "auto" }}>
            {[
              { id: "dimensions", label: "1. Dimensions & Site" },
              { id: "framering", label: "2. Framing & Subframe" },
              { id: "boards", label: "3. Decking Boards" },
              { id: "additions", label: "4. Accessories & Roof" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "dimensions" | "framering" | "boards" | "additions")}
                style={{
                  padding: "8px 16px",
                  borderRadius: 2,
                  border: activeTab === tab.id ? "1px solid var(--ocean-700)" : "1px solid var(--sand-300)",
                  background: activeTab === tab.id ? "var(--ocean-700)" : "white",
                  color: activeTab === tab.id ? "white" : "var(--slate-mid)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: DIMENSIONS */}
          {activeTab === "dimensions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Length */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="lengthText" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--slate-dark)" }}>Deck Length (m)</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button type="button" onClick={() => adjustLength(-0.10)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>-</button>
                    <input
                      id="lengthText"
                      type="text"
                      value={lengthInput}
                      onChange={(e) => setLengthInput(e.target.value)}
                      style={{ width: 70, padding: "4px", border: "1px solid var(--sand-300)", borderRadius: 2, textAlign: "center", fontSize: "0.88rem", fontWeight: 700 }}
                    />
                    <button type="button" onClick={() => adjustLength(0.10)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>+</button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="18.0"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLengthInput(e.target.value)}
                  style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                />
              </div>

              {/* Width */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="widthText" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--slate-dark)" }}>Deck Width (m)</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button type="button" onClick={() => adjustWidth(-0.10)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>-</button>
                    <input
                      id="widthText"
                      type="text"
                      value={widthInput}
                      onChange={(e) => setWidthInput(e.target.value)}
                      style={{ width: 70, padding: "4px", border: "1px solid var(--sand-300)", borderRadius: 2, textAlign: "center", fontSize: "0.88rem", fontWeight: 700 }}
                    />
                    <button type="button" onClick={() => adjustWidth(0.10)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>+</button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="12.0"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidthInput(e.target.value)}
                  style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                />
              </div>

              {/* Ground Clearance elevation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="clearance">Subframe Ground Clearance</label>
                <select
                  id="clearance"
                  value={clearance}
                  onChange={(e) => setClearance(e.target.value as ClearanceLevel)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="low">Ground Level (Less than 300mm clearance, excavation &amp; moisture shielding required)</option>
                  <option value="mid">Mid Clearance (300mm to 1.0m, standard concrete footings &amp; stumps)</option>
                  <option value="high">Balcony Elevated (Exceeding 1.0m, diagonal structural wind bracing, balustrades mandatory)</option>
                </select>
              </div>

              {/* Ground condition */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="ground">Soil / Substrate Conditions</label>
                <select
                  id="ground"
                  value={ground}
                  onChange={(e) => setGround(e.target.value as GroundCondition)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="concrete">Existing Concrete Slab (Can use anchor dynabolts directly - cheapest footing cost)</option>
                  <option value="soil">Standard Soil / Clay (Digging post holes &amp; concrete casting required)</option>
                  <option value="sandy">Sandy / Coastal Zone (Requires deeper footings &amp; high wind category anchors)</option>
                </select>
              </div>

              {/* Finish level */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="finishLevel">Construction Finishing Tier</label>
                <select
                  id="finishLevel"
                  value={finishLevel}
                  onChange={(e) => setFinishLevel(e.target.value as FinishLevel)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="budget">Budget DIY Spec (Softwood framing, standard screws)</option>
                  <option value="mid">Custom Builder Spec (Hardwood framing, concealed picture framing, dome-head screws)</option>
                  <option value="premium">Architectural Premium (Galvanized steel subframe, premium composite, concealed clips)</option>
                </select>
              </div>

            </div>
          )}

          {/* TAB 2: SUBFRAME */}
          {activeTab === "framering" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Subframe material */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="subframe">Subframe Framing Material</label>
                <select
                  id="subframe"
                  value={subframe}
                  onChange={(e) => setSubframe(e.target.value as SubframeMaterial)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="pine_h3">H3 Treated Pine (Standard above ground softwood framing)</option>
                  <option value="pine_h4">H4 Treated Pine (High chemical preservative, rated for ground contact)</option>
                  <option value="gal_steel">Hot-Dip Galvanized Structural Steel (Termite proof, long spans, zero warping)</option>
                </select>
              </div>

              {/* Joists spacing */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="joistSpacing">Joist Span Centers</label>
                <select
                  id="joistSpacing"
                  value={joistSpacing}
                  onChange={(e) => setJoistSpacing(parseInt(e.target.value) as 450 | 400)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value={450}>450mm Centers (Residential standard spacing)</option>
                  <option value={400}>400mm Centers (Stiffer residential feel - recommended for composite decking)</option>
                </select>
              </div>

            </div>
          )}

          {/* TAB 3: DECKING BOARDS */}
          {activeTab === "boards" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Board Material */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="boardMaterial">Decking Board Timber / Composite</label>
                <select
                  id="boardMaterial"
                  value={boardMaterial}
                  onChange={(e) => setBoardMaterial(e.target.value as BoardMaterial)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="pine">Treated Pine H3 Softwood (Most affordable, light gold shade)</option>
                  <option value="merbau">Merbau Hardwood (Extremely popular, durable, rich red-brown tone)</option>
                  <option value="spotted_gum">Australian Spotted Gum (Premium grain, Class 1 fire rating)</option>
                  <option value="composite_classic">Ekodeck Classic Composite (No oiling, low maintenance polymer)</option>
                  <option value="composite_premium">Premium Capped Composite (Capped shell protection, natural timber look)</option>
                </select>
              </div>

              {/* Board Width */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="boardWidth">Decking Board Width</label>
                <select
                  id="boardWidth"
                  value={boardWidth}
                  onChange={(e) => setBoardWidth(parseInt(e.target.value) as 90 | 140)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value={90}>90mm Standard Traditional Board width</option>
                  <option value={140}>140mm Modern Wide-Board width (Installs faster)</option>
                </select>
              </div>

              {/* Fixing method */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="fixingMethod">Board Fixing Fasteners</label>
                <select
                  id="fixingMethod"
                  value={fixingMethod}
                  onChange={(e) => setFixingMethod(e.target.value as FixingMethod)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="face_screws">Exposed Stainless Face Screws (Dome-head, traditional)</option>
                  <option value="concealed_clips">Concealed Hidden Clip System (Groove edge boards - zero visible screws on deck face)</option>
                </select>
              </div>

              {/* Picture framing border */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="pictureFraming">Perimeter Picture Framing Border</label>
                <select
                  id="pictureFraming"
                  value={pictureFraming}
                  onChange={(e) => setPictureFraming(parseInt(e.target.value) as 0 | 1 | 2)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value={0}>No Border (Deck boards run straight to outer timber edge)</option>
                  <option value={1}>Single Board Border Frame (Mitered corner outline)</option>
                  <option value={2}>Double Board Border Frame (Mitered corner outline - premium detailing)</option>
                </select>
              </div>

            </div>
          )}

          {/* TAB 4: ACCESSORIES */}
          {activeTab === "additions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Stairs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                  <label htmlFor="stepsCount">Access Steps / Staircase runs</label>
                  <span style={{ color: "var(--ocean-700)" }}>{stepsCount} Stairs</span>
                </div>
                <input
                  id="stepsCount"
                  type="range"
                  min="0"
                  max="6"
                  step="1"
                  value={stepsCount}
                  onChange={(e) => setStepsCount(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                />
              </div>

              {/* Balustrades */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="balustradeStyle">Perimeter Safety Balustrades</label>
                <select
                  id="balustradeStyle"
                  value={balustradeStyle}
                  onChange={(e) => setBalustradeStyle(e.target.value as BalustradeStyle)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="none">No Balustrades (Only compliant if deck elevation &lt; 1.0m)</option>
                  <option value="timber_wire">Timber Posts + Horizontal Stainless Steel Wire runs (Coastal spec)</option>
                  <option value="steel_wire">Stainless Steel Posts + Horizontal Wire runs (Modern minimalist)</option>
                  <option value="glass">Heavy-duty semi-frameless structural glass panels (AS 1288 certified)</option>
                </select>
              </div>

              {/* Pergola Roof */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="pergolaStyle">Overhead Pergola Structure</label>
                <select
                  id="pergolaStyle"
                  value={pergolaStyle}
                  onChange={(e) => setPergolaStyle(e.target.value as PergolaStyle)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="none">No Overhead structure (Open deck patio)</option>
                  <option value="louvred">Adjustable timber/aluminum Louvred Pergola frame (Manually adjustable blades)</option>
                  <option value="flyover">Insulated Colorbond Flyover Roof panels (Keeps deck cool in QLD summers)</option>
                </select>
              </div>

            </div>
          )}

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

        {/* Right Side: Outputs */}
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
              Calculated using average timber and composite construction rates in QLD. Includes structural subframe posts, GST, Form 15 compliance, and builder margin ({Math.round(builderMarginRate * 100)}%).
            </p>
          </div>

          {/* Maintenance alert banner */}
          <div style={{ background: "#fdf8e2", border: "1px solid #fbc02d", padding: "14px 20px", borderRadius: 4, fontSize: "0.8rem", color: "#f57f17", fontWeight: 700 }} className="no-print">
            {maintenanceGuide}
          </div>

          {/* 2D Interactive Frame Blueprint */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)", textAlign: "center" }} className="visualizer-card">
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, margin: "0 0 16px", borderBottom: "3px double var(--sand-300)", paddingBottom: 10, textAlign: "left", fontFamily: "Lora, Georgia, serif" }}>
              Interactive 2D Framing Blueprint
            </h3>
            
            <div style={{ display: "inline-block", background: "#f1f5f9", borderRadius: 4, padding: 12 }}>
              <svg width="280" height="280" style={{ background: "#f8fafc", borderRadius: 4, border: "1.5px dashed #cbd5e1" }}>
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Deck Outer Outline */}
                <rect 
                  x={xOffset} 
                  y={yOffset} 
                  width={roomPixelLength} 
                  height={roomPixelWidth} 
                  fill="#ffffff" 
                  stroke="var(--slate-dark)" 
                  strokeWidth="3.5" 
                  rx="2"
                />

                {/* Draw Bearer Lines (horizontal running along width axis) */}
                {Array.from({ length: bearersCount }).map((_, idx) => {
                  const yPos = yOffset + (roomPixelWidth / (bearersCount - 1)) * idx;
                  if (isNaN(yPos)) return null;
                  return (
                    <line 
                      key={idx}
                      x1={xOffset} 
                      y1={yPos} 
                      x2={xOffset + roomPixelLength} 
                      y2={yPos} 
                      stroke="#92650a" 
                      strokeWidth="3" 
                      strokeDasharray="5 2"
                    />
                  );
                })}

                {/* Draw Joist Lines (vertical running over bearers) */}
                {Array.from({ length: Math.min(joistsCount, 30) }).map((_, idx) => {
                  const xPos = xOffset + (roomPixelLength / (joistsCount - 1)) * idx;
                  if (isNaN(xPos)) return null;
                  return (
                    <line 
                      key={idx}
                      x1={xPos} 
                      y1={yOffset} 
                      x2={xPos} 
                      y2={yOffset + roomPixelWidth} 
                      stroke="#cbd5e1" 
                      strokeWidth="1" 
                    />
                  );
                })}

                {/* Draw post concrete footings (little circles at bearer intersections) */}
                {Array.from({ length: bearersCount }).map((_, bIdx) => {
                  const yPos = yOffset + (roomPixelWidth / (bearersCount - 1)) * bIdx;
                  if (isNaN(yPos)) return null;
                  return Array.from({ length: postsPerBearer }).map((__, pIdx) => {
                    const xPos = xOffset + (roomPixelLength / (postsPerBearer - 1)) * pIdx;
                    if (isNaN(xPos)) return null;
                    return (
                      <circle 
                        key={`${bIdx}-${pIdx}`}
                        cx={xPos} 
                        cy={yPos} 
                        r="4.5" 
                        fill="#64748b" 
                        stroke="#ffffff" 
                        strokeWidth="1.5" 
                      />
                    );
                  });
                })}

                {/* Stair steps indicators (drawn on bottom edge) */}
                {stepsCount > 0 && (
                  <g>
                    {Array.from({ length: stepsCount }).map((_, idx) => (
                      <rect 
                        key={idx}
                        x={xOffset + roomPixelLength / 2 - 25} 
                        y={yOffset + roomPixelWidth + idx * 4} 
                        width="50" 
                        height="4" 
                        fill="rgba(100, 116, 139, 0.4)" 
                        stroke="#64748b" 
                        strokeWidth="0.5" 
                      />
                    ))}
                    <text x={xOffset + roomPixelLength / 2} y={yOffset + roomPixelWidth + stepsCount * 4 + 10} fontSize="7" fill="#64748b" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">
                      STAIRS
                    </text>
                  </g>
                )}

                {/* Perimeter Balustrades lines */}
                {balustradeStyle !== "none" && (
                  <g>
                    {/* Left wall wire */}
                    <line x1={xOffset + 2} y1={yOffset} x2={xOffset + 2} y2={yOffset + roomPixelWidth} stroke="var(--ocean-700)" strokeWidth="2.5" />
                    {/* Right wall wire */}
                    <line x1={xOffset + roomPixelLength - 2} y1={yOffset} x2={xOffset + roomPixelLength - 2} y2={yOffset + roomPixelWidth} stroke="var(--ocean-700)" strokeWidth="2.5" />
                    {/* Bottom wall wire */}
                    <line x1={xOffset} y1={yOffset + roomPixelWidth - 2} x2={xOffset + roomPixelLength} y2={yOffset + roomPixelWidth - 2} stroke="var(--ocean-700)" strokeWidth="2.5" />
                  </g>
                )}

                {/* Pergola posts (4 corners) */}
                {pergolaStyle !== "none" && (
                  <g>
                    <rect x={xOffset - 3} y={yOffset - 3} width="7" height="7" fill="#0d5c34" stroke="white" strokeWidth="1" />
                    <rect x={xOffset + roomPixelLength - 4} y={yOffset - 3} width="7" height="7" fill="#0d5c34" stroke="white" strokeWidth="1" />
                    <rect x={xOffset - 3} y={yOffset + roomPixelWidth - 4} width="7" height="7" fill="#0d5c34" stroke="white" strokeWidth="1" />
                    <rect x={xOffset + roomPixelLength - 4} y={yOffset + roomPixelWidth - 4} width="7" height="7" fill="#0d5c34" stroke="white" strokeWidth="1" />
                    <text x={xOffset + roomPixelLength / 2} y={yOffset + 20} fontSize="7" fill="#0d5c34" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">
                      PERGOLA COVER OVERHEAD
                    </text>
                  </g>
                )}

                {/* Dimension label */}
                <line x1={xOffset} y1={yOffset - 15} x2={xOffset + roomPixelLength} y2={yOffset - 15} stroke="#64748b" strokeWidth="1.5" />
                <text x={xOffset + roomPixelLength/2} y={yOffset - 20} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="bold" fontFamily="Outfit, sans-serif">
                  {length.toFixed(2)}m
                </text>
                
                <line x1={xOffset - 15} y1={yOffset} x2={xOffset - 15} y2={yOffset + roomPixelWidth} stroke="#64748b" strokeWidth="1.5" />
                <text x={xOffset - 31} y={yOffset + roomPixelWidth/2} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="bold" fontFamily="Outfit, sans-serif" transform={`rotate(-90 ${xOffset - 31} ${yOffset + roomPixelWidth/2})`}>
                  {width.toFixed(2)}m
                </text>
              </svg>
            </div>
            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--slate-light)", marginTop: 8 }}>
              Dynamic subframe blueprint showing bearer runs (dashed brown), joist spacing (thin lines), and stumps grid (dots).
            </span>
          </div>

          {/* Itemized Cost Breakdown Sheet */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }} className="print-content">
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 10, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
              Bill of Quantities (BoQ) Takeoff
            </h3>
            
            {/* Dimensions Subsheet */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Dimensions &amp; Footprint
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", borderBottom: "1px solid var(--sand-200)", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total Deck Surface Area:</span>
                <span style={{ fontWeight: 700 }}>{area.toFixed(2)} sqm</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Outer Perimeter Layout:</span>
                <span style={{ fontWeight: 700 }}>{perimeter.toFixed(2)} m</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subframe elevation level:</span>
                <span style={{ fontWeight: 700, textTransform: "capitalize" }}>{clearance} clearance</span>
              </div>
            </div>

            {/* Quantities Takeoff Subsheet */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Physical Framing Takeoff
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", borderBottom: "1px solid var(--sand-200)", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Decking Boards ({boardWidth}mm width):</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{linearMetersDecking} Linear Meters ({Math.round(boardWastageFactor*100-100)}% waste)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subframe Bearers Timber length:</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{bearersCount} runs ({totalBearersLength.toFixed(1)}m total)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subframe Joists Timber length:</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{joistsCount} joists ({totalJoistsLength.toFixed(1)}m total @ {joistSpacing}mm)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Footing Stumps/Posts count:</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{totalPostsStumps} Footings grid</span>
              </div>
              {concreteBagsNeeded > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Footing Post-Mix Bags (20kg):</span>
                  <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{concreteBagsNeeded} Bags</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Board Fasteners Packs ({fastenersPackSize}/pack):</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{fastenerPacksNeeded} Packs ({totalFasteners} total screws/clips)</span>
              </div>
              {deckOilLitersNeeded > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>UV Deck Oil coating needed:</span>
                  <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{deckOilLitersNeeded} Liters (Double coat)</span>
                </div>
              )}
            </div>

            {/* Financial Estimates */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Estimated Budget Schedule
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Excavation &amp; Post Hole anchors:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costExcavationAnchor.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Subframe Timber/Steel framing ({subframe}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costSubframeMaterials.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {costConcreteBags > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Footings Concrete supplies:</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costConcreteBags.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Decking Boards material ({boardMaterial}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costBoardMaterials.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Face Screws / Concealed Clips:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costFasteners.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {costOilSupplies > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Deck Oil &amp; Applicator supplies:</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costOilSupplies.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Carpenter &amp; framing labor:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costLabor.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {costBalustrades > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Perimeter Balustrades ({balustradeStyle}):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costBalustrades.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              {costStairs > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Access Staircase ({stepsCount} steps):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costStairs.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              {costPergola > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Overhead Roof structure ({pergolaStyle}):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costPergola.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--sand-200)", paddingTop: 10, marginTop: 4 }}>
                <span style={{ color: "var(--slate-light)" }}>Builder Margin ({Math.round(builderMarginRate * 100)}%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${builderMargin.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Form 15 Engineering Sign-off:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costForm15}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>GST (10%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* Contractor Briefing & Communication Guide */}
          <div style={{ background: "#0d221f", color: "white", border: "2px double var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }} className="no-print">
            <h3 style={{ fontSize: "0.95rem", color: "var(--gold-light)", fontWeight: 700, borderBottom: "1px dashed rgba(255,255,255,0.15)", paddingBottom: 8, marginBottom: 14, fontFamily: "Lora, Georgia, serif" }}>
              ✦ Contractor Briefing &amp; Communication Guide
            </h3>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5, marginBottom: 16 }}>
              Use these tailor-made questions based on your specifications ({lengthInput}m x {widthInput}m deck using {boardMaterial} boards &amp; {subframe} subframe) to communicate clearly with your builder or carpenter.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: "0.8rem" }}>
                <strong style={{ color: "var(--gold-light)", display: "block", marginBottom: 3 }}>Subframe &amp; Elevation Briefing:</strong>
                <span style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.4, display: "block" }}>
                  &quot;I&apos;ve specified a {subframe} subframe. For a {clearance} clearance subframe structure, what footing depth and concrete stump size do you recommend for our soil type?&quot;
                </span>
              </div>
              <div style={{ fontSize: "0.8rem" }}>
                <strong style={{ color: "var(--gold-light)", display: "block", marginBottom: 3 }}>Decking Boards Briefing:</strong>
                <span style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.4, display: "block" }}>
                  &quot;We are laying {boardMaterial} boards. Are we using face-screwing or a concealed clipping system, and will we need a double picture-frame border around the edges?&quot;
                </span>
              </div>
              <div style={{ fontSize: "0.8rem" }}>
                <strong style={{ color: "var(--gold-light)", display: "block", marginBottom: 3 }}>Compliance &amp; Engineering:</strong>
                <span style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.4, display: "block" }}>
                  &quot;Will this deck configuration require a Form 15 design certificate for structural engineering sign-off, and does the balustrade height conform to the standard 1.0m QLD building code requirement?&quot;
                </span>
              </div>
            </div>
          </div>

          {/* QLD Compliance Checklist Box */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }} className="no-print">
            <h3 style={{ fontSize: "0.92rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 8, marginBottom: 14, fontFamily: "Lora, Georgia, serif" }}>
              ✦ Deck Safety &amp; Balustrades Compliance Notes
            </h3>
            <ul style={{ paddingLeft: 16, margin: 0, fontSize: "0.78rem", color: "var(--slate-mid)", display: "flex", flexDirection: "column", gap: 8, lineHeight: 1.5 }}>
              <li><strong>Height &gt; 1.0m:</strong> Balustrades (minimum 1.0m high) are legally required by QLD building code. Vertical wire gaps must not exceed 125mm.</li>
              <li><strong>Height &gt; 4.0m:</strong> Balustrades must not have horizontal wires or rails (climbing hazards). Frameless glass is standard for this tier.</li>
              <li><strong>Subframe Timber:</strong> Must be H3 rated for above-ground framing. Ground-contact stumps or posts MUST be H4 or concrete.</li>
              <li><strong>Form 15 Certificate:</strong> Necessary for structural timber certificates in QLD. Your certifier will require this prior to sign-off.</li>
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
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .planner-layout {
            display: block !important;
            margin-top: 0 !important;
          }
          .print-content {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .visualizer-card {
            page-break-after: avoid;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}} />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";

type KitchenLayout = "straight" | "lshape" | "ushape" | "island";
type DoorStyle = "melamine" | "shaker" | "polyurethane" | "veneer";
type HingeSystem = "standard" | "blum";
type CornerStorage = "none" | "lazysusan" | "magiccorner";
type PantryType = "none" | "standard" | "pullout";
type BenchtopMaterial = "laminate" | "stone" | "caesarstone" | "quartzite";
type SplashbackType = "tile" | "glass" | "stone";
type SinkMount = "topmount" | "undermount";
type CooktopType = "gas" | "induction";
type FinishLevel = "budget" | "mid" | "premium";

export default function KitchenPlannerPage() {
  // Inputs
  const [layout, setLayout] = useState<KitchenLayout>("island");
  const [runLengthInput, setRunLengthInput] = useState("4.8");
  const [islandLengthInput, setIslandLengthInput] = useState("2.4");
  const [islandWidthInput, setIslandWidthInput] = useState("0.9");
  const [ceilingHeight, setCeilingHeight] = useState(2.7);
  
  // Selection configurations
  const [finishLevel, setFinishLevel] = useState<FinishLevel>("mid");
  const [doorStyle, setDoorStyle] = useState<DoorStyle>("shaker");
  const [hingeSystem, setHingeSystem] = useState<HingeSystem>("blum");
  const [drawerRatio, setDrawerRatio] = useState<0.2 | 0.5 | 0.8>(0.5); // percentage of drawers vs doors
  const [cornerStorage, setCornerStorage] = useState<CornerStorage>("magiccorner");
  const [pantryType, setPantryType] = useState<PantryType>("standard");
  const [cabinetCount, setCabinetCount] = useState(16);
  
  const [benchtopMaterial, setBenchtopMaterial] = useState<BenchtopMaterial>("stone");
  const [benchThickness, setBenchThickness] = useState<20 | 40 | 60>(40);
  const [waterfallsCount, setWaterfallsCount] = useState<0 | 1 | 2>(2);
  const [splashbackType, setSplashbackType] = useState<SplashbackType>("tile");
  
  const [sinkMount, setSinkMount] = useState<SinkMount>("undermount");
  const [cooktopType, setCooktopType] = useState<CooktopType>("induction");
  const [includePlumbing, setIncludePlumbing] = useState(true);
  const [includeLEDs, setIncludeLEDs] = useState(true);

  // Tabs state
  const [activeTab, setActiveTab] = useState<"dimensions" | "cabinetry" | "benchtop" | "appliances">("dimensions");

  // Presets Selection
  const applyPreset = (preset: "galley" | "lshape" | "ushape" | "island") => {
    if (preset === "galley") {
      setLayout("straight");
      setRunLengthInput("3.00");
      setCabinetCount(8);
      setDrawerRatio(0.2);
      setCornerStorage("none");
      setPantryType("none");
      setWaterfallsCount(0);
    } else if (preset === "lshape") {
      setLayout("lshape");
      setRunLengthInput("4.20");
      setCabinetCount(14);
      setDrawerRatio(0.5);
      setCornerStorage("lazysusan");
      setPantryType("standard");
      setWaterfallsCount(0);
    } else if (preset === "ushape") {
      setLayout("ushape");
      setRunLengthInput("5.40");
      setCabinetCount(18);
      setDrawerRatio(0.5);
      setCornerStorage("magiccorner");
      setPantryType("standard");
      setWaterfallsCount(1);
    } else if (preset === "island") {
      setLayout("island");
      setRunLengthInput("4.80");
      setIslandLengthInput("2.40");
      setIslandWidthInput("0.90");
      setCabinetCount(20);
      setDrawerRatio(0.8);
      setCornerStorage("none");
      setPantryType("pullout");
      setWaterfallsCount(2);
    }
  };

  // Safe Sizing Parsing
  const runLength = Math.min(12.0, Math.max(1.5, parseFloat(runLengthInput) || 4.8));
  const islandLength = Math.min(6.0, Math.max(0.8, parseFloat(islandLengthInput) || 2.4));
  const islandWidth = Math.min(2.0, Math.max(0.6, parseFloat(islandWidthInput) || 0.9));

  // Step Controllers
  const adjustRunLength = (amount: number) => {
    const val = parseFloat(runLengthInput) || 4.8;
    setRunLengthInput(Math.min(12.0, Math.max(1.5, val + amount)).toFixed(2));
  };
  const adjustIslandLength = (amount: number) => {
    const val = parseFloat(islandLengthInput) || 2.4;
    setIslandLengthInput(Math.min(6.0, Math.max(0.8, val + amount)).toFixed(2));
  };
  const adjustIslandWidth = (amount: number) => {
    const val = parseFloat(islandWidthInput) || 0.9;
    setIslandWidthInput(Math.min(2.0, Math.max(0.6, val + amount)).toFixed(2));
  };

  // Benchtop Surface Calculations
  // Standard kitchen counter depth is 0.6m
  const mainRunArea = runLength * 0.6;
  const islandArea = layout === "island" ? islandLength * islandWidth : 0;
  // Waterfall end panels. Standard height is 0.9m.
  const waterfallArea = (layout === "island" || layout === "ushape") 
    ? (waterfallsCount * 0.9 * (layout === "island" ? islandWidth : 0.6)) 
    : 0;
  const totalBenchtopArea = mainRunArea + islandArea + waterfallArea;

  // Stone Slab count takeoff. Standard slab size is 3.0m x 1.4m = 4.2 sqm.
  // We factor in 20% waste for cutouts (sink, cooktop) and miters.
  const stoneSlabsNeeded = (benchtopMaterial !== "laminate") 
    ? Math.ceil((totalBenchtopArea * 1.25) / 4.2) 
    : 0;

  // Splashback takeoff area (runLength * 0.7m height)
  const splashbackArea = runLength * 0.7;
  const tilesBoxesNeeded = (splashbackType === "tile") 
    ? Math.ceil((splashbackArea * 1.15) / 1.44) // 1.44 sqm box coverage + 15% waste
    : 0;

  // Cabinet modules breakdown
  const doorModules = Math.round(cabinetCount * (1 - drawerRatio));
  const drawerModules = Math.round(cabinetCount * drawerRatio);

  // Financial Estimations
  const demoRates = { budget: 1100, mid: 2400, premium: 4800 }[finishLevel];
  const cabinetryUnitRate = { melamine: 320, shaker: 680, polyurethane: 890, veneer: 1450 }[doorStyle];
  
  const costJoineryBase = cabinetCount * cabinetryUnitRate;
  // Drawers add high runner hardware surcharge
  const costDrawersSurcharge = drawerModules * 160;
  const costHinges = hingeSystem === "blum" ? cabinetCount * 85 : 0;
  
  const costCornerHardware = (layout === "lshape" || layout === "ushape") 
    ? { none: 0, lazysusan: 480, magiccorner: 1350 }[cornerStorage] 
    : 0;

  const costPantry = { none: 0, standard: 680, pullout: 1550 }[pantryType];
  const costDemo = demoRates;

  const benchtopMaterialRate = { laminate: 380, stone: 890, caesarstone: 1400, quartzite: 2500 }[benchtopMaterial];
  let costBenchtop = totalBenchtopArea * benchtopMaterialRate;
  
  // Thickness miter surcharges
  if (benchtopMaterial !== "laminate" && benchThickness > 20) {
    const linearMiterLength = runLength + (layout === "island" ? islandLength * 2 : 0) + (waterfallsCount * 0.9 * 2);
    const thicknessMultiplier = benchThickness === 40 ? 80 : 160; // cost per linear meter
    costBenchtop += linearMiterLength * thicknessMultiplier;
  }
  // Waterfall masonry surcharge
  if (benchtopMaterial !== "laminate" && waterfallsCount > 0) {
    costBenchtop += waterfallsCount * 750; // on-site mason cutout/miter fee
  }

  const splashbackRate = { tile: 195, glass: 480, stone: 980 }[splashbackType];
  const costSplashback = (splashbackType === "stone" && benchtopMaterial !== "laminate")
    ? splashbackArea * benchtopMaterialRate * 0.75 // discount for wall slab vertical cut
    : splashbackArea * splashbackRate;

  const costPlumbing = includePlumbing 
    ? (890 + (sinkMount === "undermount" ? 450 : 0)) 
    : 0;

  const costElectrical = 650 
    + (includeLEDs ? 690 : 0) 
    + (cooktopType === "induction" ? 380 : 0); // dedicated electrical run

  const subtotal = costJoineryBase + costDrawersSurcharge + costHinges + costCornerHardware + costPantry + costDemo + costBenchtop + costSplashback + costPlumbing + costElectrical;
  
  const builderMarginRate = { budget: 0.1, mid: 0.18, premium: 0.25 }[finishLevel];
  const builderMargin = subtotal * builderMarginRate;
  const gst = (subtotal + builderMargin) * 0.1;
  const totalCost = subtotal + builderMargin + gst;

  // 2D Visualizer sizing
  const maxDim = layout === "island" ? Math.max(runLength, islandLength + 2.0) : runLength;
  const scale = 250 / maxDim;
  const mainPixelWidth = runLength * scale;
  const xOffset = (280 - mainPixelWidth) / 2;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

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
            <span style={{ color: "var(--gold-light)", fontSize: "0.8rem" }}>Kitchen Planner</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.5rem)", margin: 0, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                Professional Kitchen &amp; Joinery Planner
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: "8px 0 0", fontFamily: "Outfit, sans-serif" }}>
                Calculate custom joinery rates, stone waterfall returns, and plumbing points for trade quotes.
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
              Quick Layout Presets
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => applyPreset("galley")}
                style={{ flex: "1 1 120px", padding: "10px", fontSize: "0.76rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                🍳 Galley Compact <br/><span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>3.0m run (No Island)</span>
              </button>
              <button
                onClick={() => applyPreset("lshape")}
                style={{ flex: "1 1 120px", padding: "10px", fontSize: "0.76rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                📐 L-Shape Family <br/><span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>4.2m corner run</span>
              </button>
              <button
                onClick={() => applyPreset("ushape")}
                style={{ flex: "1 1 120px", padding: "10px", fontSize: "0.76rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                🏡 U-Shape Spacious <br/><span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>5.4m perimeter</span>
              </button>
              <button
                onClick={() => applyPreset("island")}
                style={{ flex: "1 1 120px", padding: "10px", fontSize: "0.76rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                👑 Entertainer Island <br/><span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>4.8m run + 2.4m island</span>
              </button>
            </div>
          </div>

          {/* Tab Selection */}
          <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--sand-200)", paddingBottom: 16, marginBottom: 28, overflowX: "auto" }}>
            {[
              { id: "dimensions", label: "1. Dimensions & Layout" },
              { id: "cabinetry", label: "2. Cabinetry & Hinges" },
              { id: "benchtop", label: "3. Benchtops & Splash" },
              { id: "appliances", label: "4. Services & Electrical" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "dimensions" | "cabinetry" | "benchtop" | "appliances")}
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
              
              {/* Layout shape selector */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="layout">Kitchen Layout Shape</label>
                <select
                  id="layout"
                  value={layout}
                  onChange={(e) => setLayout(e.target.value as KitchenLayout)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="straight">Straight Line Run (Single wall galley style)</option>
                  <option value="lshape">L-Shape Corner (Cabinet runs meet at 90°)</option>
                  <option value="ushape">U-Shape Walk-around (Perimeter wrap cabinetry)</option>
                  <option value="island">Main Wall Run + Central Island Benchtop</option>
                </select>
              </div>

              {/* Run length */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="runLengthText" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--slate-dark)" }}>Main Run Length (m)</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button type="button" onClick={() => adjustRunLength(-0.10)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>-</button>
                    <input
                      id="runLengthText"
                      type="text"
                      value={runLengthInput}
                      onChange={(e) => setRunLengthInput(e.target.value)}
                      style={{ width: 70, padding: "4px", border: "1px solid var(--sand-300)", borderRadius: 2, textAlign: "center", fontSize: "0.88rem", fontWeight: 700 }}
                    />
                    <button type="button" onClick={() => adjustRunLength(0.10)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>+</button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="12.0"
                  step="0.1"
                  value={runLength}
                  onChange={(e) => setRunLengthInput(e.target.value)}
                  style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                />
              </div>

              {/* Island Length */}
              {layout === "island" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label htmlFor="islandLengthText" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--slate-dark)" }}>Island Bench Length (m)</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button type="button" onClick={() => adjustIslandLength(-0.10)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>-</button>
                      <input
                        id="islandLengthText"
                        type="text"
                        value={islandLengthInput}
                        onChange={(e) => setIslandLengthInput(e.target.value)}
                        style={{ width: 70, padding: "4px", border: "1px solid var(--sand-300)", borderRadius: 2, textAlign: "center", fontSize: "0.88rem", fontWeight: 700 }}
                      />
                      <button type="button" onClick={() => adjustIslandLength(0.10)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>+</button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="6.0"
                    step="0.1"
                    value={islandLength}
                    onChange={(e) => setIslandLengthInput(e.target.value)}
                    style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                  />
                </div>
              )}

              {/* Island Width */}
              {layout === "island" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label htmlFor="islandWidthText" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--slate-dark)" }}>Island Bench Width (m)</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button type="button" onClick={() => adjustIslandWidth(-0.05)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>-</button>
                      <input
                        id="islandWidthText"
                        type="text"
                        value={islandWidthInput}
                        onChange={(e) => setIslandWidthInput(e.target.value)}
                        style={{ width: 70, padding: "4px", border: "1px solid var(--sand-300)", borderRadius: 2, textAlign: "center", fontSize: "0.88rem", fontWeight: 700 }}
                      />
                      <button type="button" onClick={() => adjustIslandWidth(0.05)} style={{ width: 28, height: 28, border: "1px solid var(--sand-300)", background: "#fafafa", cursor: "pointer", borderRadius: 2 }}>+</button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="2.0"
                    step="0.05"
                    value={islandWidth}
                    onChange={(e) => setIslandWidthInput(e.target.value)}
                    style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                  />
                </div>
              )}

              {/* ceiling height */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                  <label htmlFor="ceilingHeight">Ceiling Height (affects overhead cabinets)</label>
                  <span style={{ color: "var(--ocean-700)" }}>{ceilingHeight.toFixed(1)}m</span>
                </div>
                <select
                  id="ceilingHeight"
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(parseFloat(e.target.value))}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value={2.4}>2.4m Standard ceiling (Affordable bulkheads)</option>
                  <option value={2.7}>2.7m Modern ceiling height</option>
                  <option value={3.0}>3.0m High architectural ceiling (Requires tall overhead joinery)</option>
                </select>
              </div>

              {/* Finish level */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="finishLevel">Cabinetry &amp; Finish Quality Tier</label>
                <select
                  id="finishLevel"
                  value={finishLevel}
                  onChange={(e) => setFinishLevel(e.target.value as FinishLevel)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="budget">Budget flatpack modular (DIY friendly, Melamine finish)</option>
                  <option value="mid">Custom mid-range trade spec (Polyurethane painted fronts, soft-close)</option>
                  <option value="premium">Premium Architectural custom (High-end veneers, Blum runners, solid wood frames)</option>
                </select>
              </div>

            </div>
          )}

          {/* TAB 2: CABINETRY */}
          {activeTab === "cabinetry" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Door style */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="doorStyle">Cabinet Front Panel profile</label>
                <select
                  id="doorStyle"
                  value={doorStyle}
                  onChange={(e) => setDoorStyle(e.target.value as DoorStyle)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="melamine">Flat melamine panels (Highly durable, budget)</option>
                  <option value="shaker">Thermoformed vinyl shaker profile (Classic look)</option>
                  <option value="polyurethane">Polyurethane painted satin / gloss (Seamless modern look)</option>
                  <option value="veneer">Tasmanian Oak / Walnut Timber Veneer (Architectural premium)</option>
                </select>
              </div>

              {/* Hinge specs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="hingeSystem">Hinges &amp; Damper Hardware</label>
                <select
                  id="hingeSystem"
                  value={hingeSystem}
                  onChange={(e) => setHingeSystem(e.target.value as HingeSystem)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="standard">Standard soft-closing hinges (Standard trade spec)</option>
                  <option value="blum">Premium Blum hinges &amp; Legrabox runner systems (Austrian premium)</option>
                </select>
              </div>

              {/* Drawers ratio */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="drawerRatio">Base Drawer-to-Door Ratio</label>
                <select
                  id="drawerRatio"
                  value={drawerRatio}
                  onChange={(e) => setDrawerRatio(parseFloat(e.target.value) as 0.2 | 0.5 | 0.8)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value={0.2}>20% Drawers / 80% Doors (Affordable standard layout)</option>
                  <option value={0.5}>50% Drawers / 50% Doors (Ergonomic layout blend)</option>
                  <option value={0.8}>80% Drawers / 20% Doors (Premium convenience - drawers cost more)</option>
                </select>
              </div>

              {/* Corner storage */}
              {(layout === "lshape" || layout === "ushape") && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="cornerStorage">Corner Storage Hardware</label>
                  <select
                    id="cornerStorage"
                    value={cornerStorage}
                    onChange={(e) => setCornerStorage(e.target.value as CornerStorage)}
                    style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                  >
                    <option value="none">Standard fixed shelves (Deep corner space, hard to reach)</option>
                    <option value="lazysusan">Lazy Susan 270° swivel basket assembly</option>
                    <option value="magiccorner">Magic Corner blind-out drawer slides (Extends fully outside)</option>
                  </select>
                </div>
              )}

              {/* Pantry tower */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="pantryType">Pantry Configuration</label>
                <select
                  id="pantryType"
                  value={pantryType}
                  onChange={(e) => setPantryType(e.target.value as PantryType)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="none">No Pantry (Double door overhead cabinet instead)</option>
                  <option value="standard">Standard 600mm width shelved pantry cabinet</option>
                  <option value="pullout">Premium pull-out wire pantry tower with tandem runners</option>
                </select>
              </div>

              {/* Cabinet count slider */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                  <label htmlFor="cabinetCount">Cabinet Door/Drawer Modules</label>
                  <span style={{ color: "var(--ocean-700)" }}>{cabinetCount} Modules</span>
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

            </div>
          )}

          {/* TAB 3: BENCHTOPS */}
          {activeTab === "benchtop" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Benchtop material */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="benchtopMaterial">Benchtop Slab Material</label>
                <select
                  id="benchtopMaterial"
                  value={benchtopMaterial}
                  onChange={(e) => setBenchtopMaterial(e.target.value as BenchtopMaterial)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="laminate">Postformed laminate (Timber/stone look, budget)</option>
                  <option value="stone">20mm Engineered Stone (Reconstituted quartz panels)</option>
                  <option value="caesarstone">40mm Caesarstone (Thick mitered fascia edges)</option>
                  <option value="quartzite">60mm Natural Quartzite / Marble slabs (Architectural luxury)</option>
                </select>
              </div>

              {/* Benchtop thickness */}
              {benchtopMaterial !== "laminate" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="benchThickness">Stone Slab Profile Thickness</label>
                  <select
                    id="benchThickness"
                    value={benchThickness}
                    onChange={(e) => setBenchThickness(parseInt(e.target.value) as 20 | 40 | 60)}
                    style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                  >
                    <option value={20}>20mm Slimline Profile (Single slab edge, standard)</option>
                    <option value={40}>40mm Standard Mitered Apron (Slab jointed to 40mm apron)</option>
                    <option value={60}>60mm Chunkier Architectural Profile (Heavy stone profile)</option>
                  </select>
                </div>
              )}

              {/* Waterfall panels */}
              {(layout === "island" || layout === "ushape") && benchtopMaterial !== "laminate" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="waterfallsCount">Waterfall End Panels (90° side drop to floor)</label>
                  <select
                    id="waterfallsCount"
                    value={waterfallsCount}
                    onChange={(e) => setWaterfallsCount(parseInt(e.target.value) as 0 | 1 | 2)}
                    style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                  >
                    <option value={0}>No Waterfall returns (Straight stone overhang)</option>
                    <option value={1}>Single End Waterfall Panel (Return on one side)</option>
                    <option value={2}>Double End Waterfall Panels (Returns on both sides - recommended for islands)</option>
                  </select>
                </div>
              )}

              {/* Splashback type */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="splashbackType">Splashback Slabs &amp; Panels</label>
                <select
                  id="splashbackType"
                  value={splashbackType}
                  onChange={(e) => setSplashbackType(e.target.value as SplashbackType)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="tile">Porcelain / Ceramic Tiled Splashback (Tiled splashback area)</option>
                  <option value="glass">6mm Toughened painted glass splashback (Seamless, easy cleanup)</option>
                  <option value="stone">Matching benchtop stone vertical slab splashback (High-end layout)</option>
                </select>
              </div>

            </div>
          )}

          {/* TAB 4: APPLIANCES */}
          {activeTab === "appliances" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Sink mounting style */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="sinkMount">Sink Mounting Style</label>
                <select
                  id="sinkMount"
                  value={sinkMount}
                  onChange={(e) => setSinkMount(e.target.value as SinkMount)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="topmount">Top-Mount / Drop-in sink (Overlapping steel edge)</option>
                  <option value="undermount">Under-mount sink (Requires polished stone mason inside cutouts, +$450)</option>
                </select>
              </div>

              {/* Cooktop spec */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="cooktopType">Cooktop Connection Spec</label>
                <select
                  id="cooktopType"
                  value={cooktopType}
                  onChange={(e) => setCooktopType(e.target.value as CooktopType)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="gas">LPG / Natural gas lines (Requires plumber gas-fitting)</option>
                  <option value="induction">Induction high-amp cooktop (Requires dedicated electrical run, +$380)</option>
                </select>
              </div>

              {/* Toggles */}
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", borderTop: "1px solid var(--sand-200)", paddingTop: 20 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={includePlumbing}
                    onChange={(e) => setIncludePlumbing(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: "var(--ocean-700)" }}
                  />
                  Include Sink plumbing, filtration &amp; mixer tap fit-off
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={includeLEDs}
                    onChange={(e) => setIncludeLEDs(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: "var(--ocean-700)" }}
                  />
                  Include LED overhead cabinet strip-lighting
                </label>
              </div>

            </div>
          )}

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
                Get **Free Site Delivery** on modular METOD kitchen packages over $1,200. Standardized soft-closing dampers, 25-year cabinet guarantee.
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

        {/* Right Side: Outputs */}
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
              Calculated using average modular and custom joinery cabinetry costs in QLD. Includes assembly, positioning, GST, and builder margin ({Math.round(builderMarginRate * 100)}%).
            </p>
          </div>

          {/* 2D Interactive Blueprint */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)", textAlign: "center" }} className="visualizer-card">
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, margin: "0 0 16px", borderBottom: "3px double var(--sand-300)", paddingBottom: 10, textAlign: "left", fontFamily: "Lora, Georgia, serif" }}>
              Interactive 2D Cabinet Blueprint
            </h3>
            
            <div style={{ display: "inline-block", background: "#f1f5f9", borderRadius: 4, padding: 12 }}>
              <svg width="280" height="280" style={{ background: "#f8fafc", borderRadius: 4, border: "1.5px dashed #cbd5e1" }}>
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Main Cabinet Run (Top Wall) */}
                <rect 
                  x={xOffset} 
                  y={40} 
                  width={mainPixelWidth} 
                  height={0.6 * scale * 10} // 60cm deep
                  fill="rgba(15, 23, 42, 0.05)" 
                  stroke="var(--slate-dark)" 
                  strokeWidth="2.5" 
                />

                {/* Draw cabinet dividers inside main run */}
                {Array.from({ length: Math.min(cabinetCount, 10) }).map((_, idx, arr) => {
                  const segWidth = mainPixelWidth / arr.length;
                  return (
                    <line 
                      key={idx}
                      x1={xOffset + segWidth * idx} 
                      y1={40} 
                      x2={xOffset + segWidth * idx} 
                      y2={40 + 0.6 * scale * 10} 
                      stroke="var(--slate-light)" 
                      strokeWidth="0.8" 
                    />
                  );
                })}

                {/* L-Shape Side (Left Wall) */}
                {layout === "lshape" && (
                  <rect 
                    x={xOffset} 
                    y={40 + 0.6 * scale * 10} 
                    width={0.6 * scale * 10} 
                    height={Math.max(1.2, runLength * 0.4) * scale * 10} 
                    fill="rgba(15, 23, 42, 0.05)" 
                    stroke="var(--slate-dark)" 
                    strokeWidth="2.5" 
                  />
                )}

                {/* U-Shape Sides (Left & Right Walls) */}
                {layout === "ushape" && (
                  <>
                    <rect 
                      x={xOffset} 
                      y={40 + 0.6 * scale * 10} 
                      width={0.6 * scale * 10} 
                      height={Math.max(1.2, runLength * 0.3) * scale * 10} 
                      fill="rgba(15, 23, 42, 0.05)" 
                      stroke="var(--slate-dark)" 
                      strokeWidth="2.5" 
                    />
                    <rect 
                      x={xOffset + mainPixelWidth - 0.6 * scale * 10} 
                      y={40 + 0.6 * scale * 10} 
                      width={0.6 * scale * 10} 
                      height={Math.max(1.2, runLength * 0.3) * scale * 10} 
                      fill="rgba(15, 23, 42, 0.05)" 
                      stroke="var(--slate-dark)" 
                      strokeWidth="2.5" 
                    />
                  </>
                )}

                {/* Island Bench in the middle */}
                {layout === "island" && (
                  <g>
                    {/* Island Cabinet */}
                    <rect 
                      x={(280 - islandLength * scale * 10) / 2} 
                      y={150} 
                      width={islandLength * scale * 10} 
                      height={islandWidth * scale * 10} 
                      fill="rgba(146, 101, 10, 0.1)" 
                      stroke="#92650a" 
                      strokeWidth="2.5" 
                    />
                    
                    {/* Breakfast Bar Stools (circles) */}
                    {Array.from({ length: Math.min(6, Math.floor(islandLength / 0.6)) }).map((_, idx, arr) => {
                      const stoolSpacing = (islandLength * scale * 10) / (arr.length + 1);
                      return (
                        <circle 
                          key={idx}
                          cx={(280 - islandLength * scale * 10) / 2 + stoolSpacing * (idx + 1)} 
                          cy={150 + islandWidth * scale * 10 + 12} 
                          r="6" 
                          fill="#92650a" 
                          stroke="#ffffff" 
                          strokeWidth="1.5" 
                        />
                      );
                    })}
                    <text x="140" y={150 + (islandWidth * scale * 10)/2 + 4} fontSize="8" fill="#92650a" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">
                      ISLAND ({islandLength.toFixed(1)}m x {islandWidth.toFixed(1)}m)
                    </text>
                  </g>
                )}

                {/* Sink placement (drawn in main run center) */}
                <g>
                  <rect 
                    x={xOffset + mainPixelWidth/2 - 20} 
                    y={42} 
                    width="40" 
                    height="16" 
                    rx="2"
                    fill="white" 
                    stroke="var(--slate-dark)" 
                    strokeWidth="1.5" 
                  />
                  <line x1={xOffset + mainPixelWidth/2} y1={42} x2={xOffset + mainPixelWidth/2} y2={58} stroke="var(--slate-dark)" strokeWidth="1" />
                  <circle cx={xOffset + mainPixelWidth/2 + 10} cy={50} r="2" fill="var(--slate-dark)" />
                  <text x={xOffset + mainPixelWidth/2} y={35} fontSize="7" fill="var(--slate-dark)" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">SINK</text>
                </g>

                {/* Cooktop placement (drawn in main run side) */}
                <g>
                  <rect 
                    x={xOffset + 24} 
                    y={42} 
                    width="36" 
                    height="16" 
                    rx="1"
                    fill="#334155" 
                    stroke="white" 
                    strokeWidth="1" 
                  />
                  {/* Hob burner rings */}
                  <circle cx={xOffset + 32} cy={50} r="3" fill="none" stroke="white" strokeWidth="1" />
                  <circle cx={xOffset + 43} cy={50} r="2" fill="none" stroke="white" strokeWidth="1" />
                  <circle cx={xOffset + 52} cy={50} r="3" fill="none" stroke="white" strokeWidth="1" />
                  <text x={xOffset + 42} y={35} fontSize="7" fill="var(--slate-dark)" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">COOKTOP</text>
                </g>

                {/* Dimension label */}
                <line x1={xOffset} y1={25} x2={xOffset + mainPixelWidth} y2={25} stroke="#64748b" strokeWidth="1.5" />
                <text x={xOffset + mainPixelWidth/2} y={20} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="bold" fontFamily="Outfit, sans-serif">
                  {runLength.toFixed(2)}m
                </text>
              </svg>
            </div>
            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--slate-light)", marginTop: 8 }}>
              Dynamic blueprint of joinery run layouts with appliance positions.
            </span>
          </div>

          {/* Itemized Cost Breakdown Sheet */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }} className="print-content">
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 10, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
              Bill of Quantities (BoQ) Takeoff
            </h3>
            
            {/* Dimensions Subsheet */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Dimensions &amp; Surfaces
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", borderBottom: "1px solid var(--sand-200)", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Main Bench Counter Length:</span>
                <span style={{ fontWeight: 700 }}>{runLength.toFixed(2)} m</span>
              </div>
              {layout === "island" && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Island Counter Footprint:</span>
                  <span style={{ fontWeight: 700 }}>{islandLength.toFixed(2)}m x {islandWidth.toFixed(2)}m ({(islandLength * islandWidth).toFixed(2)} sqm)</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total Benchtop Area (inc. waterfalls):</span>
                <span style={{ fontWeight: 700 }}>{totalBenchtopArea.toFixed(2)} sqm</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Splashback Panel Area:</span>
                <span style={{ fontWeight: 700 }}>{splashbackArea.toFixed(2)} sqm</span>
              </div>
            </div>

            {/* Quantities Takeoff Subsheet */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Physical Materials Takeoff
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", borderBottom: "1px solid var(--sand-200)", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Standard Door Modules (base/overhead):</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{doorModules} Units</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Drawer Modules (soft-closing slides):</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{drawerModules} Drawer Modules ({Math.round(drawerRatio*100)}% ratio)</span>
              </div>
              {stoneSlabsNeeded > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Stone Slabs Required (3.0m x 1.4m):</span>
                  <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{stoneSlabsNeeded} Slabs (Miters &amp; waste included)</span>
                </div>
              )}
              {tilesBoxesNeeded > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Splashback Tile Boxes (1.44m² box):</span>
                  <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{tilesBoxesNeeded} Boxes</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Hinge assemblies count:</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{cabinetCount * 2} Dampeners</span>
              </div>
            </div>

            {/* Financial Estimates */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Estimated Budget Schedule
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Cabinetry Base Modules ({doorStyle}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costJoineryBase.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Drawer Runners Surcharges:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costDrawersSurcharge.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Soft-Close Hardware Upgrades ({hingeSystem}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costHinges.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {costCornerHardware > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Corner Slide Hardware ({cornerStorage}):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costCornerHardware.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              {costPantry > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Pantry Tower Unit ({pantryType}):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costPantry.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Demolition &amp; Bulkhead Framing:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costDemo.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Benchtop Fabrication ({benchtopMaterial} - {benchThickness}mm):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costBenchtop.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Splashback Panel/Tiling ({splashbackType}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costSplashback.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {includePlumbing && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Plumbing Fit-off ({sinkMount} sink):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costPlumbing.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Electrical runs &amp; cabinet LED lighting:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costElectrical.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--sand-200)", paddingTop: 10, marginTop: 4 }}>
                <span style={{ color: "var(--slate-light)" }}>Builder Margin ({Math.round(builderMarginRate * 100)}%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${builderMargin.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>GST (10%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* Kitchen guide rules */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }} className="no-print">
            <h3 style={{ fontSize: "0.92rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 8, marginBottom: 14, fontFamily: "Lora, Georgia, serif" }}>
              ✦ Kitchen Layout Guide
            </h3>
            <ul style={{ paddingLeft: 16, margin: 0, fontSize: "0.78rem", color: "var(--slate-mid)", display: "flex", flexDirection: "column", gap: 8, lineHeight: 1.5 }}>
              <li><strong>Work Triangle:</strong> Standard configurations locate the sink, cooktop, and refrigerator in an ergonomic triangle setup.</li>
              <li><strong>Waterfall Edges:</strong> Stone slab edges must be mitered on-site by a stone mason. Caesarstone recommends a 40mm apron minimum.</li>
              <li><strong>Steam Shields:</strong> Ensure cabinets surrounding dishwasher have steam guard metal protective shields installed to prevent swelling.</li>
              <li><strong>Induction high-amp lines:</strong> Standard wall outlets are 10-amp; induction cooktops require a dedicated 32-amp circuit running back to the main switchboard.</li>
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

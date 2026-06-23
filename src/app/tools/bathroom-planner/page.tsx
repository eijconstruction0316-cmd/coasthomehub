"use client";

import React, { useState } from "react";
import Link from "next/link";

type FinishLevel = "budget" | "mid" | "premium";
type ShowerType = "none" | "walkin" | "semi" | "frameless" | "overbath";
type BathType = "none" | "builtin" | "freestanding_acrylic" | "freestanding_stone";
type ToiletType = "none" | "closecoupled" | "wallfaced" | "inwall";
type TileSelection = "ceramic" | "porcelain" | "terrazzo" | "stone";
type TileSize = "300x300" | "600x600" | "600x1200";
type TilingPattern = "stacked" | "brickbond" | "herringbone";
type NicheStyle = "none" | "single" | "double" | "ledge";
type GroutType = "standard" | "epoxy";
type VanitySize = "600" | "900" | "1200" | "1500";
type TapwareFinish = "chrome" | "matteblack" | "brushedbrass" | "brushednickel";
type TapwareType = "mixer" | "threepiece";
type WaterproofingClass = "class2" | "class3";

export default function BathroomPlannerPage() {
  // Inputs
  const [lengthInput, setLengthInput] = useState("3.0");
  const [widthInput, setWidthInput] = useState("2.0");
  const [ceilingHeight, setCeilingHeight] = useState(2.7);
  const [tilingHeightSelection, setTilingHeightSelection] = useState<"splash" | "half" | "full">("full");
  
  // Selection configurations
  const [finishLevel, setFinishLevel] = useState<FinishLevel>("mid");
  const [showerType, setShowerType] = useState<ShowerType>("frameless");
  const [bathType, setBathType] = useState<BathType>("none");
  const [toiletType, setToiletType] = useState<ToiletType>("wallfaced");
  const [tileSelection, setTileSelection] = useState<TileSelection>("porcelain");
  const [tileSize, setTileSize] = useState<TileSize>("600x600");
  const [tilingPattern, setTilingPattern] = useState<TilingPattern>("stacked");
  const [nicheStyle, setNicheStyle] = useState<NicheStyle>("single");
  const [groutType, setGroutType] = useState<GroutType>("standard");
  const [waterproofingClass, setWaterproofingClass] = useState<WaterproofingClass>("class3");
  const [underfloorHeating, setUnderfloorHeating] = useState(false);
  
  const [vanitySize, setVanitySize] = useState<VanitySize>("900");
  const [tapwareFinish, setTapwareFinish] = useState<TapwareFinish>("chrome");
  const [tapwareType, setTapwareType] = useState<TapwareType>("mixer");
  const [outletsCount, setOutletsCount] = useState(3);
  
  const [exhaustFan, setExhaustFan] = useState<"standard" | "ixl3in1">("standard");
  const [gpoCount, setGpoCount] = useState(2);
  const [lightFixture, setLightFixture] = useState<"downlight" | "pendant" | "ledmirror">("downlight");

  // Tabs state
  const [activeTab, setActiveTab] = useState<"dimensions" | "materials" | "plumbing" | "electrical">("dimensions");

  // Sizing Presets
  const applyPreset = (preset: "ensuite" | "standard" | "master") => {
    if (preset === "ensuite") {
      setLengthInput("2.10");
      setWidthInput("1.80");
      setShowerType("walkin");
      setBathType("none");
      setToiletType("wallfaced");
      setVanitySize("600");
      setOutletsCount(3);
    } else if (preset === "standard") {
      setLengthInput("3.00");
      setWidthInput("2.00");
      setShowerType("frameless");
      setBathType("builtin");
      setToiletType("wallfaced");
      setVanitySize("900");
      setOutletsCount(4);
    } else if (preset === "master") {
      setLengthInput("3.60");
      setWidthInput("2.70");
      setShowerType("frameless");
      setBathType("freestanding_acrylic");
      setToiletType("inwall");
      setVanitySize("1500");
      setOutletsCount(5);
    }
  };

  // Safe Dimension Parsing
  const length = Math.min(10.0, Math.max(1.0, parseFloat(lengthInput) || 3.0));
  const width = Math.min(10.0, Math.max(1.0, parseFloat(widthInput) || 2.0));

  // Step Controllers
  const adjustLength = (amount: number) => {
    const val = parseFloat(lengthInput) || 3.0;
    setLengthInput(Math.min(10.0, Math.max(1.0, val + amount)).toFixed(2));
  };
  const adjustWidth = (amount: number) => {
    const val = parseFloat(widthInput) || 2.0;
    setWidthInput(Math.min(10.0, Math.max(1.0, val + amount)).toFixed(2));
  };

  // Sizing details
  const tilingHeight = tilingHeightSelection === "splash" ? 0.5 : tilingHeightSelection === "half" ? 1.2 : ceilingHeight;
  const floorArea = length * width;
  const perimeter = (length + width) * 2;
  const wallTilingArea = Math.max(0, perimeter * tilingHeight - 2.8); // Deduct standard door & window window (2.8sqm)
  const totalTilingArea = floorArea + wallTilingArea;
  const linearJoints = perimeter + (tilingHeight * 2); // vertical internal corner lines + floor outline

  // Wastage factors based on pattern
  const wastageFactor = { stacked: 1.10, brickbond: 1.15, herringbone: 1.20 }[tilingPattern];
  const boxCoverage = { "300x300": 1.08, "600x600": 1.44, "600x1200": 1.44 }[tileSize];
  const tilesBoxesNeeded = Math.ceil((totalTilingArea * wastageFactor) / boxCoverage);

  // Waterproofing (AS 3740) Liters takeoff:
  // Floor area + shower wall height area + skirtings
  const waterproofArea = floorArea + (showerType !== "none" ? 1.8 * 1.8 : 0) + (perimeter * 0.15);
  // 1 liter covers approx 1.5 sqm for 2 coats
  const waterproofLitersNeeded = Math.ceil(waterproofArea / 1.5);
  const bagsAdhesiveNeeded = Math.ceil(totalTilingArea / 3.5); // 20kg bag covers 3.5 sqm
  const groutRate = { "300x300": 0.8, "600x600": 0.4, "600x1200": 0.3 }[tileSize];
  const groutBagsNeeded = Math.ceil((totalTilingArea * groutRate) / 2); // 2kg bags
  const siliconeTubesNeeded = Math.ceil(linearJoints / 3.0);

  // Financial Rates
  const demoRates = { budget: 130, mid: 240, premium: 420 }[finishLevel];
  const plumbRoughInRate = { budget: 750, mid: 1200, premium: 1950 }[finishLevel];
  const waterProofingLaborRate = waterproofingClass === "class3" ? 220 : 150;
  
  const tilingLaborRate = { "300x300": 95, "600x600": 135, "600x1200": 190 }[tileSize];
  const tilingPatternSurcharge = tilingPattern === "herringbone" ? 1.2 : 1.0;
  const actualTilingLaborCost = totalTilingArea * tilingLaborRate * tilingPatternSurcharge;

  const tileMaterialRate = { ceramic: 38, porcelain: 70, terrazzo: 105, stone: 175 }[tileSelection];

  const costDemo = floorArea * demoRates;
  const costPlumbing = outletsCount * plumbRoughInRate + (tapwareType === "threepiece" ? outletsCount * 120 : 0);
  const costWaterproofing = (floorArea * waterProofingLaborRate) + (linearJoints * 18);
  const costTilingLabor = actualTilingLaborCost;
  const costTileMaterials = totalTilingArea * tileMaterialRate * wastageFactor;
  const costSupplies = (waterproofLitersNeeded * 22) + (bagsAdhesiveNeeded * 32) + (groutBagsNeeded * 18) + (siliconeTubesNeeded * 12);

  const costNiche = { none: 0, single: 420, double: 750, ledge: 850 }[nicheStyle];
  const costUnderfloor = underfloorHeating ? (floorArea * 250 + 450) : 0;

  const costShowerGlass = { none: 0, walkin: 850, semi: 680, frameless: 1550, overbath: 600 }[showerType];
  const costBath = { none: 0, builtin: 720, freestanding_acrylic: 1380, freestanding_stone: 3400 }[bathType];
  const costToilet = { none: 0, closecoupled: 480, wallfaced: 820, inwall: 1480 }[toiletType];

  const baseVanity = { "600": 580, "900": 895, "1200": 1320, "1500": 2100 }[vanitySize];
  const costVanity = baseVanity * (finishLevel === "premium" ? 1.6 : 1.0);

  const tapwarePvdRates = { chrome: 1.0, matteblack: 1.15, brushedbrass: 1.45, brushednickel: 1.35 }[tapwareFinish];
  const costTapware = outletsCount * 280 * tapwarePvdRates;
  
  const costExhaust = { standard: 280, ixl3in1: 690 }[exhaustFan];
  const costElectrical = (gpoCount * 140) + { downlight: 380, pendant: 650, ledmirror: 980 }[lightFixture] + (underfloorHeating ? 300 : 0);

  const subtotal = costDemo + costPlumbing + costWaterproofing + costTilingLabor + costTileMaterials + costSupplies + costNiche + costUnderfloor + costShowerGlass + costBath + costToilet + costVanity + costTapware + costExhaust + costElectrical;
  
  const builderMarginRate = { budget: 0.1, mid: 0.18, premium: 0.25 }[finishLevel];
  const builderMargin = subtotal * builderMarginRate;
  const costForm16 = 180; // QLD compliance certificate
  const gst = (subtotal + builderMargin + costForm16) * 0.1;
  const totalCost = subtotal + builderMargin + costForm16 + gst;

  // 2D Visualizer layout scale calculations
  const maxDim = Math.max(length, width);
  const scale = 250 / maxDim; // Fit inside 250px box
  const roomPixelLength = length * scale;
  const roomPixelWidth = width * scale;
  const xOffset = (280 - roomPixelLength) / 2;
  const yOffset = (280 - roomPixelWidth) / 2;

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
            <span style={{ color: "var(--gold-light)", fontSize: "0.8rem" }}>Bathroom Planner</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.5rem)", margin: 0, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                Professional Bathroom Renovation Planner
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: "8px 0 0", fontFamily: "Outfit, sans-serif" }}>
                Formulate a professional construction schedule &amp; takeoff list under AS 3740 / AS 1288 rules.
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
        
        {/* Left Side: Accordion/Tab Controls */}
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 32, boxShadow: "var(--shadow-sm)" }} className="no-print">
          
          {/* Presets Selection */}
          <div style={{ marginBottom: 28 }}>
            <span style={{ display: "block", fontSize: "0.76rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", marginBottom: 10, letterSpacing: "0.04em" }}>
              Quick Size Templates
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => applyPreset("ensuite")}
                style={{ flex: 1, padding: "10px", fontSize: "0.78rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                🛁 Ensuite Preset <br/><span style={{ fontSize: "0.7rem", color: "var(--slate-light)" }}>2.1m x 1.8m</span>
              </button>
              <button
                onClick={() => applyPreset("standard")}
                style={{ flex: 1, padding: "10px", fontSize: "0.78rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                🏡 Family Preset <br/><span style={{ fontSize: "0.7rem", color: "var(--slate-light)" }}>3.0m x 2.0m</span>
              </button>
              <button
                onClick={() => applyPreset("master")}
                style={{ flex: 1, padding: "10px", fontSize: "0.78rem", border: "1px solid var(--sand-300)", borderRadius: 3, background: "#fbfcfc", cursor: "pointer", fontWeight: 600 }}
              >
                👑 Master Preset <br/><span style={{ fontSize: "0.7rem", color: "var(--slate-light)" }}>3.6m x 2.7m</span>
              </button>
            </div>
          </div>

          {/* Tab Selection */}
          <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--sand-200)", paddingBottom: 16, marginBottom: 28, overflowX: "auto" }}>
            {[
              { id: "dimensions", label: "1. Dimensions & Layout" },
              { id: "materials", label: "2. Tiles & Waterproofing" },
              { id: "plumbing", label: "3. Fixtures & Plumbing" },
              { id: "electrical", label: "4. Electrical & Extras" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "dimensions" | "materials" | "plumbing" | "electrical")}
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
              
              {/* Length controllers */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="lengthText" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--slate-dark)" }}>Room Length (m)</label>
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
                  min="1.0"
                  max="8.0"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLengthInput(e.target.value)}
                  style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                />
              </div>

              {/* Width controllers */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="widthText" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--slate-dark)" }}>Room Width (m)</label>
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
                  min="1.0"
                  max="8.0"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidthInput(e.target.value)}
                  style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                />
              </div>

              {/* ceiling height */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                  <label htmlFor="ceilingHeight">Ceiling Wall Height</label>
                  <span style={{ color: "var(--ocean-700)" }}>{ceilingHeight.toFixed(1)}m</span>
                </div>
                <select
                  id="ceilingHeight"
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(parseFloat(e.target.value))}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value={2.4}>2.4m Standard ceiling (Affordable plastering)</option>
                  <option value={2.7}>2.7m Tall ceiling (Standard modern Queenslander)</option>
                  <option value={3.0}>3.0m High architectural spacing</option>
                </select>
              </div>

              {/* Finish quality level */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="finishLevel">Material &amp; Finishing Tier</label>
                <select
                  id="finishLevel"
                  value={finishLevel}
                  onChange={(e) => setFinishLevel(e.target.value as FinishLevel)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="budget">Budget / Builder Spec (Flatpack melamine, standard mixers)</option>
                  <option value="mid">Mid-Range Trade Spec (Polyurethane joinery, PVD finishes)</option>
                  <option value="premium">Architectural Premium (Timber veneers, mitered stone tops, high custom finish)</option>
                </select>
              </div>

            </div>
          )}

          {/* TAB 2: TILES & WATERPROOFING */}
          {activeTab === "materials" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Tile Material */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="tileSelection">Tile Substrate</label>
                <select
                  id="tileSelection"
                  value={tileSelection}
                  onChange={(e) => setTileSelection(e.target.value as TileSelection)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="ceramic">Ceramic Tiles (Soft substrate, easy DIY cutting)</option>
                  <option value="porcelain">Glazed Vitrified Porcelain (Dense, &lt;0.5% water absorption)</option>
                  <option value="terrazzo">Terrazzo stone aggregate slabs (Architectural detail)</option>
                  <option value="stone">Travertine / Marble natural slabs (Requires protective sealing)</option>
                </select>
              </div>

              {/* Tile Dimension */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="tileSize">Tile Sizing</label>
                <select
                  id="tileSize"
                  value={tileSize}
                  onChange={(e) => setTileSize(e.target.value as TileSize)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="300x300">300x300mm (Recommended for fall-to-waste floor grades)</option>
                  <option value="600x600">600x600mm (Popular balanced look)</option>
                  <option value="600x1200">600x1200mm Large Format (Higher labor surcharge)</option>
                </select>
              </div>

              {/* Tiling pattern layout */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="tilingPattern">Tiling Layout Pattern</label>
                <select
                  id="tilingPattern"
                  value={tilingPattern}
                  onChange={(e) => setTilingPattern(e.target.value as TilingPattern)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="stacked">Standard Stacked Grid (10% waste)</option>
                  <option value="brickbond">Brickbond / 50% Offset (15% waste - classic brick styling)</option>
                  <option value="herringbone">Herringbone 45° Pattern (20% waste, +20% tiling labor surcharge)</option>
                </select>
              </div>

              {/* Wall height */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="tilingHeightSelection">Tiling Wall Height Coverage</label>
                <select
                  id="tilingHeightSelection"
                  value={tilingHeightSelection}
                  onChange={(e) => setTilingHeightSelection(e.target.value as "splash" | "half" | "full")}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="splash">Skirting &amp; Splashback only (0.5m height)</option>
                  <option value="half">Half-height perimeter wall (1.2m height)</option>
                  <option value="full">Full ceiling height wall (Floor-to-ceiling tiling)</option>
                </select>
              </div>

              {/* Recessed Niche */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="nicheStyle">Wall Niches &amp; Ledges</label>
                <select
                  id="nicheStyle"
                  value={nicheStyle}
                  onChange={(e) => setNicheStyle(e.target.value as NicheStyle)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="none">No recess niche (Standard wall mount shelves)</option>
                  <option value="single">Single Recessed Niche (300mm x 300mm framed)</option>
                  <option value="double">Double Recessed Niche (Stacked soap/shampoo bays)</option>
                  <option value="ledge">Full Width Tiled Ledge / Half wall projection</option>
                </select>
              </div>

              {/* Waterproofing AS 3740 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="waterproofingClass">Waterproofing Membrane Grade</label>
                <select
                  id="waterproofingClass"
                  value={waterproofingClass}
                  onChange={(e) => setWaterproofingClass(e.target.value as WaterproofingClass)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="class2">Class II Standard Acrylic membrane (Slower curing)</option>
                  <option value="class3">Class III High-Flex Liquid Polyurethane (Recommended for timber structures)</option>
                </select>
              </div>

              {/* Grout Type */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="groutType">Grout Specifications</label>
                <select
                  id="groutType"
                  value={groutType}
                  onChange={(e) => setGroutType(e.target.value as GroutType)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="standard">Standard Cementitious (Porous joints, budget)</option>
                  <option value="epoxy">Epoxy Grout (Stain-proof, mold resistant - recommended for wet area floor joints)</option>
                </select>
              </div>

              {/* Underfloor heating */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  id="underfloorHeating"
                  type="checkbox"
                  checked={underfloorHeating}
                  onChange={(e) => setUnderfloorHeating(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "var(--ocean-700)", cursor: "pointer" }}
                />
                <label htmlFor="underfloorHeating" style={{ fontSize: "0.88rem", fontWeight: 700, cursor: "pointer" }}>
                  Include Electric Underfloor Heating (Programmable thermostat)
                </label>
              </div>

            </div>
          )}

          {/* TAB 3: FIXTURES */}
          {activeTab === "plumbing" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Shower screen */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="showerType">Shower Screen Configuration</label>
                <select
                  id="showerType"
                  value={showerType}
                  onChange={(e) => setShowerType(e.target.value as ShowerType)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="none">No Shower Suite (Separate walk-in closet)</option>
                  <option value="walkin">Frameless single walk-in panel (Modern wetroom)</option>
                  <option value="semi">Semi-Framed safety glass door assembly</option>
                  <option value="frameless">10mm fully frameless hinges (Toughened safety glass AS 1288)</option>
                  <option value="overbath">Swing out bath screen panel mounted to bath edge</option>
                </select>
              </div>

              {/* Bathtub */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="bathType">Bathtub Type</label>
                <select
                  id="bathType"
                  value={bathType}
                  onChange={(e) => setBathType(e.target.value as BathType)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="none">No Bathtub (Shower area only)</option>
                  <option value="builtin">Built-In pod bath (Tiled base surround)</option>
                  <option value="freestanding_acrylic">Freestanding Curved Acrylic Bath (Lightweight)</option>
                  <option value="freestanding_stone">Architectural Composite Stone Bath (Extremely heavy)</option>
                </select>
              </div>

              {/* Toilet */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="toiletType">Toilet Suite</label>
                <select
                  id="toiletType"
                  value={toiletType}
                  onChange={(e) => setToiletType(e.target.value as ToiletType)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="none">No Toilet (Plumbed in separate room)</option>
                  <option value="closecoupled">Close-Coupled Ceramic Suite (Visible traps)</option>
                  <option value="wallfaced">Wall Faced Back-to-Wall (Concealed traps)</option>
                  <option value="inwall">In-Wall Concealed Cistern (Minimalist layout)</option>
                </select>
              </div>

              {/* Vanity size */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="vanitySize">Vanity Sizing width</label>
                <select
                  id="vanitySize"
                  value={vanitySize}
                  onChange={(e) => setVanitySize(e.target.value as VanitySize)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="600">600mm compact vanity (Single basin)</option>
                  <option value="900">900mm standard vanity (Single basin)</option>
                  <option value="1200">1200mm spacious vanity (Single or Double basin option)</option>
                  <option value="1500">1500mm master vanity (Double basin standard)</option>
                </select>
              </div>

              {/* Tapware finish */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="tapwareFinish">Tapware Metal Finish</label>
                <select
                  id="tapwareFinish"
                  value={tapwareFinish}
                  onChange={(e) => setTapwareFinish(e.target.value as TapwareFinish)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="chrome">Polished Chrome (Electroplated, durable standard)</option>
                  <option value="matteblack">Matte Black (Sleek contemporary accent)</option>
                  <option value="brushedbrass">PVD Brushed Brass / Gold (Architectural warm metal)</option>
                  <option value="brushednickel">PVD Brushed Nickel (Soft satin champagne metal)</option>
                </select>
              </div>

              {/* Tapware type */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="tapwareType">Tapware Valves</label>
                <select
                  id="tapwareType"
                  value={tapwareType}
                  onChange={(e) => setTapwareType(e.target.value as TapwareType)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="mixer">Single Lever Ceramic Cartridge Mixers</option>
                  <option value="threepiece">Traditional 3-Piece Assembly (Spout + separate hot/cold spindles)</option>
                </select>
              </div>

              {/* Plumbing outlets slider */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                  <label htmlFor="outletsCount">Water Outlets / Plumbing Points</label>
                  <span style={{ color: "var(--ocean-700)" }}>{outletsCount} Points</span>
                </div>
                <input
                  id="outletsCount"
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={outletsCount}
                  onChange={(e) => setOutletsCount(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                />
              </div>

            </div>
          )}

          {/* TAB 4: ELECTRICAL */}
          {activeTab === "electrical" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Extraction Fan */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="exhaustFan">Extraction Ventilation</label>
                <select
                  id="exhaustFan"
                  value={exhaustFan}
                  onChange={(e) => setExhaustFan(e.target.value as "standard" | "ixl3in1")}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="standard">Standard Wall/Ceiling extraction fan (Ducts outside)</option>
                  <option value="ixl3in1">3-in-1 IXL heat lamps, extraction, and LED downlight unit</option>
                </select>
              </div>

              {/* Power outlets */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700 }}>
                  <label htmlFor="gpoCount">Double GPO Powerpoints (IP Rated)</label>
                  <span style={{ color: "var(--ocean-700)" }}>{gpoCount} Double GPOs</span>
                </div>
                <input
                  id="gpoCount"
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={gpoCount}
                  onChange={(e) => setGpoCount(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--ocean-700)" }}
                />
              </div>

              {/* Lighting */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }} htmlFor="lightFixture">Decorative Lighting Profile</label>
                <select
                  id="lightFixture"
                  value={lightFixture}
                  onChange={(e) => setLightFixture(e.target.value as "downlight" | "pendant" | "ledmirror")}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "12px 14px", color: "var(--slate-dark)", fontSize: "0.88rem" }}
                >
                  <option value="downlight">IP44 Recessed Dimmable LED Downlights</option>
                  <option value="pendant">Vanity Pendant Droplight assemblies (Accent detailing)</option>
                  <option value="ledmirror">Backlit LED Demisting mirror cabinet panel</option>
                </select>
              </div>

            </div>
          )}

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
                Get 15% off **Majorca Terrazzo Grey** porcelain tiles. Matte slip-resistant R10 finish, perfect for compliant wet area floor certification.
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
                Claim Discount &amp; Shop Tiles →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Cost Output, 2D visualizer, & Detailed takeoff BoQ */}
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
              Calculated using 2026 QLD building award labor indexes. Includes itemized fixtures, Form 16 certification sign-off, GST, and builder margin ({Math.round(builderMarginRate * 100)}%).
            </p>
          </div>

          {/* Interactive 2D SVG Visualizer */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)", textAlign: "center" }} className="visualizer-card">
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, margin: "0 0 16px", borderBottom: "3px double var(--sand-300)", paddingBottom: 10, textAlign: "left", fontFamily: "Lora, Georgia, serif" }}>
              Interactive 2D Room Blueprint
            </h3>
            
            <div style={{ display: "inline-block", background: "#f1f5f9", borderRadius: 4, padding: 12 }}>
              <svg width="280" height="280" style={{ background: "#f8fafc", borderRadius: 4, border: "1.5px dashed #cbd5e1" }}>
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Room Border */}
                <rect 
                  x={xOffset} 
                  y={yOffset} 
                  width={roomPixelLength} 
                  height={roomPixelWidth} 
                  fill="#ffffff" 
                  stroke="#0c2422" 
                  strokeWidth="5" 
                  rx="3"
                />

                {/* Grid markings */}
                <line x1={xOffset} y1={yOffset - 10} x2={xOffset + roomPixelLength} y2={yOffset - 10} stroke="#64748b" strokeWidth="1.5" />
                <text x={xOffset + roomPixelLength/2} y={yOffset - 14} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="bold" fontFamily="Outfit, sans-serif">
                  {length.toFixed(2)}m
                </text>

                <line x1={xOffset - 10} y1={yOffset} x2={xOffset - 10} y2={yOffset + roomPixelWidth} stroke="#64748b" strokeWidth="1.5" />
                <text x={xOffset - 26} y={yOffset + roomPixelWidth/2} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="bold" fontFamily="Outfit, sans-serif" transform={`rotate(-90 ${xOffset - 26} ${yOffset + roomPixelWidth/2})`}>
                  {width.toFixed(2)}m
                </text>

                {/* Shower graphic */}
                {showerType !== "none" && (
                  <g>
                    <rect 
                      x={xOffset + 4} 
                      y={yOffset + 4} 
                      width={Math.min(90 * scale / 100, roomPixelLength - 8)} 
                      height={Math.min(90 * scale / 100, roomPixelWidth - 8)} 
                      fill="rgba(31, 122, 114, 0.15)" 
                      stroke="var(--ocean-700)" 
                      strokeWidth="2" 
                    />
                    <circle cx={xOffset + 4 + Math.min(45*scale/100, (roomPixelLength-8)/2)} cy={yOffset + 15} r="4" fill="var(--ocean-700)" />
                    <line x1={xOffset+4} y1={yOffset+4} x2={xOffset + Math.min(90*scale/100, roomPixelLength-8)} y2={yOffset + Math.min(90*scale/100, roomPixelWidth-8)} stroke="var(--ocean-700)" strokeWidth="0.5" strokeDasharray="3 3" />
                    <text x={xOffset + 4 + Math.min(45*scale/100, (roomPixelLength-8)/2)} y={yOffset + 38} fontSize="8" fill="var(--ocean-700)" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">SHOWER</text>
                  </g>
                )}

                {/* Bathtub graphic */}
                {bathType !== "none" && (
                  <g>
                    <rect 
                      x={xOffset + roomPixelLength - Math.min(160 * scale / 100, roomPixelLength - 8) - 4} 
                      y={yOffset + 4} 
                      width={Math.min(160 * scale / 100, roomPixelLength - 8)} 
                      height={Math.min(80 * scale / 100, roomPixelWidth - 8)} 
                      rx="20"
                      fill="rgba(146, 101, 10, 0.08)" 
                      stroke="#92650a" 
                      strokeWidth="2" 
                    />
                    <ellipse
                      cx={xOffset + roomPixelLength - Math.min(80 * scale / 100, roomPixelLength - 8)/2 - 12}
                      cy={yOffset + Math.min(40 * scale / 100, roomPixelWidth - 8)/2 + 4}
                      rx={Math.min(65 * scale / 100, roomPixelLength - 20)/2}
                      ry={Math.min(25 * scale / 100, roomPixelWidth - 20)/2}
                      fill="none"
                      stroke="#92650a"
                      strokeWidth="1"
                    />
                    <text x={xOffset + roomPixelLength - Math.min(80 * scale / 100, roomPixelLength/2) - 4} y={yOffset + 35} fontSize="8" fill="#92650a" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">BATHTUB</text>
                  </g>
                )}

                {/* Vanity cabinet */}
                <g>
                  <rect 
                    x={xOffset + 4} 
                    y={yOffset + roomPixelWidth - Math.min(45 * scale / 100, roomPixelWidth - 8) - 4} 
                    width={Math.min((parseInt(vanitySize) / 10) * scale / 10, roomPixelLength - 8)} 
                    height={Math.min(45 * scale / 100, roomPixelWidth - 8)} 
                    fill="rgba(15, 23, 42, 0.04)" 
                    stroke="var(--slate-dark)" 
                    strokeWidth="2" 
                  />
                  {/* Basin cutout */}
                  <ellipse 
                    cx={xOffset + 4 + Math.min((parseInt(vanitySize) / 10) * scale / 10, roomPixelLength - 8)/2} 
                    cy={yOffset + roomPixelWidth - Math.min(45 * scale / 100, roomPixelWidth - 8)/2 - 4} 
                    rx="12" 
                    ry="8" 
                    fill="white" 
                    stroke="var(--slate-dark)" 
                    strokeWidth="1.5" 
                  />
                  {parseInt(vanitySize) >= 1500 && (
                    <>
                      {/* Left Basin */}
                      <ellipse 
                        cx={xOffset + 4 + Math.min((parseInt(vanitySize) / 10) * scale / 10, roomPixelLength - 8)/4} 
                        cy={yOffset + roomPixelWidth - Math.min(45 * scale / 100, roomPixelWidth - 8)/2 - 4} 
                        rx="12" 
                        ry="8" 
                        fill="white" 
                        stroke="var(--slate-dark)" 
                        strokeWidth="1.5" 
                      />
                      {/* Right Basin */}
                      <ellipse 
                        cx={xOffset + 4 + (Math.min((parseInt(vanitySize) / 10) * scale / 10, roomPixelLength - 8)*3)/4} 
                        cy={yOffset + roomPixelWidth - Math.min(45 * scale / 100, roomPixelWidth - 8)/2 - 4} 
                        rx="12" 
                        ry="8" 
                        fill="white" 
                        stroke="var(--slate-dark)" 
                        strokeWidth="1.5" 
                      />
                    </>
                  )}
                  <text x={xOffset + 4 + Math.min((parseInt(vanitySize) / 10) * scale / 10, roomPixelLength - 8)/2} y={yOffset + roomPixelWidth - 10} fontSize="8" fill="var(--slate-dark)" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">
                    VANITY ({vanitySize}mm)
                  </text>
                </g>

                {/* Toilet Suite */}
                {toiletType !== "none" && (
                  <g>
                    <rect 
                      x={xOffset + roomPixelLength - Math.min(65 * scale / 100, roomPixelLength - 8) - 4} 
                      y={yOffset + roomPixelWidth - Math.min(40 * scale / 100, roomPixelWidth - 8) - 4} 
                      width={Math.min(65 * scale / 100, roomPixelLength - 8)} 
                      height={Math.min(40 * scale / 100, roomPixelWidth - 8)} 
                      rx="4"
                      fill="rgba(100, 116, 139, 0.08)" 
                      stroke="#64748b" 
                      strokeWidth="1.8" 
                    />
                    <rect
                      x={xOffset + roomPixelLength - Math.min(20 * scale / 100, roomPixelLength - 8) - 6}
                      y={yOffset + roomPixelWidth - Math.min(36 * scale / 100, roomPixelWidth - 8)}
                      width={Math.min(16 * scale / 100, roomPixelLength - 8)}
                      height={Math.min(32 * scale / 100, roomPixelWidth - 8)}
                      fill="white"
                      stroke="#64748b"
                      strokeWidth="1"
                    />
                    <text x={xOffset + roomPixelLength - Math.min(32 * scale / 100, roomPixelLength/2) - 4} y={yOffset + roomPixelWidth - 12} fontSize="8" fill="#64748b" fontWeight="bold" fontFamily="Outfit, sans-serif" textAnchor="middle">WC</text>
                  </g>
                )}
              </svg>
            </div>
            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--slate-light)", marginTop: 8 }}>
              Dynamic visual representation of the selected floor footprint.
            </span>
          </div>

          {/* Itemized Cost Breakdown Sheet */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }} className="print-content">
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 10, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
              Bill of Quantities (BoQ) Takeoff
            </h3>
            
            {/* Dimensions Subsheet */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Dimensions &amp; Surface Calculations
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", borderBottom: "1px solid var(--sand-200)", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Floor Surface Area:</span>
                <span style={{ fontWeight: 700 }}>{floorArea.toFixed(2)} sqm</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Wall Tiling Area (less openings):</span>
                <span style={{ fontWeight: 700 }}>{wallTilingArea.toFixed(2)} sqm</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total Surface Tiling Area:</span>
                <span style={{ fontWeight: 700 }}>{totalTilingArea.toFixed(2)} sqm</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Waterproofing Zone Area (AS 3740):</span>
                <span style={{ fontWeight: 700 }}>{waterproofArea.toFixed(2)} sqm</span>
              </div>
            </div>

            {/* Materials Takeoff Subsheet */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Physical Quantities Required
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", borderBottom: "1px solid var(--sand-200)", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tile Boxes ({tileSize} - coverage {boxCoverage}m²):</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{tilesBoxesNeeded} Boxes ({Math.round(wastageFactor*100-100)}% waste factored)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Waterproofing Membrane Liquid:</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{waterproofLitersNeeded} Liters</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tile Adhesive Bags (20kg):</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{bagsAdhesiveNeeded} Bags</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tile Grout Bags (2kg):</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{groutBagsNeeded} Bags ({groutType === "epoxy" ? "Epoxy spec" : "Cementitious"})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Silicone Sealant Tubes:</span>
                <span style={{ fontWeight: 700, color: "var(--ocean-700)" }}>{siliconeTubesNeeded} Tubes</span>
              </div>
            </div>

            {/* Financial Estimates */}
            <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em", marginBottom: 12 }}>
              Estimated Costing Schedule
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Demolition &amp; Wall Strip:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costDemo.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Plumbing Rough-in ({outletsCount} points):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costPlumbing.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Waterproofing Labor (AS 3740):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costWaterproofing.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Tiling Labor ({tilingPattern}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costTilingLabor.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Tile Materials ({tileSelection}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costTileMaterials.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Building Consumables &amp; Supplies:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costSupplies.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Vanity Console ({vanitySize}mm):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costVanity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {costShowerGlass > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Shower Screen ({showerType}):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costShowerGlass.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              {costBath > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Bathtub ({bathType}):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costBath.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              {costToilet > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Toilet Suite ({toiletType}):</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costToilet.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Tapware &amp; Fittings ({tapwareFinish}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costTapware.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {costNiche > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Framed Wall Recess/Niches:</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costNiche.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              {underfloorHeating && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-light)" }}>Underfloor Heating &amp; Thermostat:</span>
                  <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costUnderfloor.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Electrical, GPOs &amp; Fan ({exhaustFan}):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${(costElectrical + costExhaust).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--sand-200)", paddingTop: 10, marginTop: 4 }}>
                <span style={{ color: "var(--slate-light)" }}>Builder Margin ({Math.round(builderMarginRate * 100)}%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${builderMargin.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Form 16 QBCC Sign-off:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${costForm16}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>GST (10%):</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>${gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* QLD Compliance Checklist Box */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }} className="no-print">
            <h3 style={{ fontSize: "0.92rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 8, marginBottom: 14, fontFamily: "Lora, Georgia, serif" }}>
              ✦ AS 3740 Waterproofing &amp; Compliance Notes
            </h3>
            <ul style={{ paddingLeft: 16, margin: 0, fontSize: "0.78rem", color: "var(--slate-mid)", display: "flex", flexDirection: "column", gap: 8, lineHeight: 1.5 }}>
              <li><strong>Bond Breakers:</strong> Mandatory flexible band breakers must seal wall-to-floor and wall-to-wall joints.</li>
              <li><strong>Shower Walls:</strong> Waterproof membrane must extend at least 150mm above the shower floor.</li>
              <li><strong>AS 1288 Safety Glass:</strong> Shower screens must consist of certified toughened safety glass (minimum 10mm thickness for frameless panels).</li>
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

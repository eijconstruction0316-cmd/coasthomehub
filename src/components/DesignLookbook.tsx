"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Renovation3DPreview, { StudioFixture, StudioFixtureType } from "./Renovation3DPreview";

type StudioMode = "plan" | "preview" | "scope";
type PaywallReason = "register" | "quota" | "premium";
type DragState = { id: string; offsetX: number; offsetY: number } | null;

interface ProjectBrief {
  suburb: string;
  roomType: string;
  propertyType: string;
  homeEra: string;
  access: string;
  targetBudget: string;
  priority: string;
  objective: string;
}

interface StyleSystem {
  id: string;
  name: string;
  tag: string;
  floor: string;
  wall: string;
  cabinet: string;
  metal: string;
  baseBudget: number;
  notes: string[];
}

interface FixtureCatalogItem {
  type: StudioFixtureType;
  label: string;
  width: number;
  depth: number;
  estimate: number;
  trade: string;
}

const ROOM = {
  width: 320,
  depth: 260,
};

const STYLE_SYSTEMS: StyleSystem[] = [
  {
    id: "coastal",
    name: "Coastal Warm Minimal",
    tag: "Fastest to quote",
    floor: "#ded2bd",
    wall: "#f8f5ed",
    cabinet: "#b49a77",
    metal: "#c59a43",
    baseBudget: 28500,
    notes: ["600x600 slip-rated porcelain allowance", "Warm timber vanity finish", "Brushed brass tapware allowance"],
  },
  {
    id: "resort",
    name: "Resort Stone Spa",
    tag: "Premium wet room",
    floor: "#c8d3c4",
    wall: "#eef1ea",
    cabinet: "#63766c",
    metal: "#9ba3a7",
    baseBudget: 34600,
    notes: ["Terrazzo-look tile schedule", "Frameless glass allowance", "Low-sheen nickel fittings"],
  },
  {
    id: "heritage",
    name: "Heritage Marble Edit",
    tag: "Highest spec",
    floor: "#e7e4dc",
    wall: "#faf9f5",
    cabinet: "#263b41",
    metal: "#d0a341",
    baseBudget: 41800,
    notes: ["Chevron floor option", "Ribbed cabinet face", "Feature stone allowance"],
  },
];

const FIXTURE_CATALOG: FixtureCatalogItem[] = [
  { type: "vanity", label: "Wall vanity 900", width: 90, depth: 50, estimate: 2100, trade: "Joinery + plumbing" },
  { type: "shower", label: "Walk-in shower", width: 100, depth: 100, estimate: 4800, trade: "Waterproofing + glazing" },
  { type: "toilet", label: "Back-to-wall toilet", width: 46, depth: 68, estimate: 1350, trade: "Plumbing" },
  { type: "bath", label: "Freestanding bath", width: 160, depth: 78, estimate: 3400, trade: "Plumbing + tiling" },
  { type: "linen", label: "Recessed linen", width: 58, depth: 42, estimate: 1250, trade: "Carpentry" },
  { type: "door", label: "Entry swing", width: 82, depth: 8, estimate: 650, trade: "Carpentry" },
];

const INITIAL_FIXTURES: StudioFixture[] = [
  { id: "shower-1", type: "shower", label: "Walk-in shower", x: 18, y: 142, width: 100, depth: 100, rotation: 0 },
  { id: "vanity-1", type: "vanity", label: "Wall vanity 900", x: 28, y: 18, width: 90, depth: 50, rotation: 0 },
  { id: "toilet-1", type: "toilet", label: "Back-to-wall toilet", x: 208, y: 24, width: 46, depth: 68, rotation: 0 },
  { id: "door-1", type: "door", label: "Entry swing", x: 214, y: 244, width: 82, depth: 8, rotation: 0 },
];

const ADD_ONS = [
  { id: "waterproofing", label: "Full wet-area membrane system", price: 2600 },
  { id: "underfloor", label: "Electric underfloor heating zone", price: 2200 },
  { id: "glazing", label: "Frameless glass upgrade", price: 1850 },
  { id: "electrical", label: "LED mirror + GPO relocation", price: 1400 },
  { id: "waste", label: "Drainage and fall-to-waste review", price: 1200 },
];

const DEFAULT_BRIEF: ProjectBrief = {
  suburb: "Burleigh Heads",
  roomType: "Bathroom",
  propertyType: "Townhouse / low-rise unit",
  homeEra: "1980s-2000s",
  access: "Standard driveway access",
  targetBudget: "$30k-$45k",
  priority: "Quote confidence",
  objective: "Modernise the wet area, keep layout practical, and reduce quote ambiguity before site visits.",
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function snap(value: number) {
  return Math.round(value / 5) * 5;
}

function formatCurrency(value: number) {
  return `$${(Math.round(value / 100) * 100).toLocaleString("en-AU")}`;
}

function fixtureEstimate(type: StudioFixtureType) {
  return FIXTURE_CATALOG.find((item) => item.type === type)?.estimate ?? 900;
}

function symbolFor(type: StudioFixtureType) {
  if (type === "vanity") return "V";
  if (type === "toilet") return "WC";
  if (type === "shower") return "SH";
  if (type === "bath") return "BT";
  if (type === "linen") return "LN";
  return "DR";
}

function tradeFor(type: StudioFixtureType) {
  return FIXTURE_CATALOG.find((item) => item.type === type)?.trade ?? "Builder review";
}

export default function DesignLookbook() {
  const [activeMode, setActiveMode] = useState<StudioMode>("plan");
  const [styleId, setStyleId] = useState("coastal");
  const [brief, setBrief] = useState<ProjectBrief>(DEFAULT_BRIEF);
  const [fixtures, setFixtures] = useState<StudioFixture[]>(INITIAL_FIXTURES);
  const [selectedId, setSelectedId] = useState("shower-1");
  const [dragState, setDragState] = useState<DragState>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["waterproofing", "waste"]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isPremiumSubscribed, setIsPremiumSubscribed] = useState(false);
  const [remainingCredits, setRemainingCredits] = useState(3);
  const [unlockedModes, setUnlockedModes] = useState<StudioMode[]>([]);
  const [paywallReason, setPaywallReason] = useState<PaywallReason>("premium");
  const [showPaywall, setShowPaywall] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [notice, setNotice] = useState("Free mode: build a 2D quote audit. 3D concept and quote pack use credits.");
  const [photoName, setPhotoName] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(10);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("unlocked") !== "1") return;
      setIsRegistered(true);
      setIsPremiumSubscribed(true);
      setUnlockedModes(["preview", "scope"]);
      setNotice("Premium Studio active. 3D concept and quote pack are unlocked.");
      if (params.get("studio") === "3d") setActiveMode("preview");
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (photoPreview) window.URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const activeStyle = STYLE_SYSTEMS.find((style) => style.id === styleId) ?? STYLE_SYSTEMS[0];
  const selectedFixture = fixtures.find((fixture) => fixture.id === selectedId) ?? fixtures[0];
  const scale = 1.18;
  const planX = 74;
  const planY = 72;
  const planW = ROOM.width * scale;
  const planH = ROOM.depth * scale;
  const roomArea = (ROOM.width * ROOM.depth) / 10000;

  const riskItems = useMemo(() => {
    const risks: { label: string; severity: "high" | "medium" | "low" }[] = [];
    const shower = fixtures.find((fixture) => fixture.type === "shower");
    const vanity = fixtures.find((fixture) => fixture.type === "vanity");
    const toilet = fixtures.find((fixture) => fixture.type === "toilet");
    const door = fixtures.find((fixture) => fixture.type === "door");

    if (shower && vanity) {
      const dx = shower.x + shower.width / 2 - (vanity.x + vanity.width / 2);
      const dy = shower.y + shower.depth / 2 - (vanity.y + vanity.depth / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        risks.push({ label: "Vanity sits close to the wet zone. Confirm membrane upturn and splash exposure.", severity: "high" });
      }
    }

    if (toilet) {
      const frontClearance = ROOM.depth - (toilet.y + toilet.depth);
      if (frontClearance < 70) {
        risks.push({ label: "Toilet front clearance is tight. Recheck pan offset before quote.", severity: "medium" });
      }
    }

    if (door && shower && Math.abs(door.x - shower.x) < 110) {
      risks.push({ label: "Entry swing may conflict with wet-zone access. Consider a cavity slider or hinge change.", severity: "medium" });
    }

    if (!selectedAddOns.includes("waterproofing")) {
      risks.push({ label: "Waterproofing allowance is missing from the visible scope.", severity: "high" });
    }

    if (!selectedAddOns.includes("waste")) {
      risks.push({ label: "Drainage and floor-fall review is not included yet.", severity: "medium" });
    }

    if (fixtures.some((fixture) => fixture.type === "bath") && ROOM.width < 330) {
      risks.push({ label: "Bath is possible but will compress circulation. Confirm dimensions on site.", severity: "low" });
    }

    return risks;
  }, [fixtures, selectedAddOns]);

  const missingItems = useMemo(() => {
    const items: string[] = [];
    if (!photoPreview) items.push("Add at least one site photo");
    if (!brief.suburb.trim()) items.push("Confirm suburb");
    if (!brief.objective.trim()) items.push("Write the renovation objective");
    if (!selectedAddOns.includes("waterproofing")) items.push("Include waterproofing allowance");
    if (!selectedAddOns.includes("waste")) items.push("Include drainage/fall review");
    if (fixtures.length < 4) items.push("Confirm core fixtures");
    if (riskItems.some((risk) => risk.severity === "high")) items.push("Resolve high-risk layout flags");
    return items;
  }, [brief.objective, brief.suburb, fixtures.length, photoPreview, riskItems, selectedAddOns]);

  const fixtureTotal = fixtures.reduce((sum, fixture) => sum + fixtureEstimate(fixture.type), 0);
  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    return sum + (ADD_ONS.find((item) => item.id === id)?.price ?? 0);
  }, 0);
  const riskLoad = riskItems.filter((risk) => risk.severity === "high").length * 1900 + riskItems.filter((risk) => risk.severity === "medium").length * 800;
  const budgetLow = activeStyle.baseBudget + fixtureTotal + addOnTotal + riskLoad;
  const budgetHigh = Math.round(budgetLow * 1.28 + roomArea * 320);
  const readiness = clamp(62 + (photoPreview ? 12 : 0) + selectedAddOns.length * 4 + fixtures.length * 2 - missingItems.length * 5 - riskItems.filter((risk) => risk.severity === "high").length * 8, 38, 96);
  const evidenceScore = photoPreview ? 86 : 42;
  const scopeScore = clamp(52 + fixtures.length * 7 + selectedAddOns.length * 6, 45, 94);
  const complianceScore = clamp(84 - riskItems.length * 9 + (selectedAddOns.includes("waterproofing") ? 8 : 0) + (selectedAddOns.includes("waste") ? 5 : 0), 36, 95);
  const pricingScore = clamp(72 + (brief.targetBudget ? 8 : 0) - riskItems.length * 4, 42, 91);
  const creditLabel = isPremiumSubscribed ? "Unlimited" : `${remainingCredits}/3 credits`;
  const leadStatus = readiness >= 82 ? "Ready for matched quotes" : readiness >= 65 ? "Needs 1-2 site details" : "Not quote-ready yet";

  const updateBrief = (key: keyof ProjectBrief, value: string) => {
    setBrief((current) => ({ ...current, [key]: value }));
  };

  const openPaywall = (reason: PaywallReason) => {
    setPaywallReason(reason);
    setShowPaywall(true);
  };

  const unlockMode = (mode: StudioMode) => {
    if (mode === "plan") {
      setActiveMode("plan");
      return;
    }

    if (isPremiumSubscribed || unlockedModes.includes(mode)) {
      setActiveMode(mode);
      return;
    }

    if (!isRegistered) {
      openPaywall("register");
      return;
    }

    if (remainingCredits <= 0) {
      openPaywall("quota");
      return;
    }

    setRemainingCredits((current) => Math.max(0, current - 1));
    setUnlockedModes((current) => [...current, mode]);
    setActiveMode(mode);
    setNotice(`${mode === "preview" ? "3D concept" : "Quote pack"} unlocked. ${Math.max(0, remainingCredits - 1)} credits remain.`);
  };

  const handleRegister = () => {
    setIsRegistered(true);
    setRemainingCredits(3);
    setShowPaywall(false);
    setNotice("Trial active. You have 3 credits for 3D concepts or quote-pack exports.");
  };

  const handleSubscribe = async () => {
    setCheckoutLoading(true);
    setNotice("Opening secure homeowner checkout...");

    try {
      const res = await fetch("/api/create-homeowner-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnPath: "/planner?unlocked=1&studio=3d" }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setNotice(data.error || "Payment is not configured yet.");
        setCheckoutLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setNotice("Could not start checkout. Please try again from the homeowner account page.");
      setCheckoutLoading(false);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photoPreview) window.URL.revokeObjectURL(photoPreview);
    setPhotoName(file.name);
    setPhotoPreview(window.URL.createObjectURL(file));
    setNotice("Site evidence attached. The quote pack now has stronger context.");
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const addFixture = (item: FixtureCatalogItem) => {
    idRef.current += 1;
    const next: StudioFixture = {
      id: `${item.type}-${idRef.current}`,
      type: item.type,
      label: item.label,
      width: item.width,
      depth: item.depth,
      x: clamp(ROOM.width / 2 - item.width / 2, 8, ROOM.width - item.width - 8),
      y: clamp(ROOM.depth / 2 - item.depth / 2, 8, ROOM.depth - item.depth - 8),
      rotation: 0,
    };
    setFixtures((current) => [...current, next]);
    setSelectedId(next.id);
    setNotice(`${item.label} added. Drag it on the plan; it snaps to a 50mm grid.`);
  };

  const rotateSelected = () => {
    setFixtures((current) =>
      current.map((fixture) =>
        fixture.id === selectedId ? { ...fixture, rotation: (fixture.rotation + 90) % 360 } : fixture
      )
    );
  };

  const removeSelected = () => {
    if (!selectedId || fixtures.length <= 1) return;
    const next = fixtures.filter((fixture) => fixture.id !== selectedId);
    setFixtures(next);
    setSelectedId(next[0]?.id ?? "");
  };

  const resetStudio = () => {
    setFixtures(INITIAL_FIXTURES);
    setSelectedId("shower-1");
    setSelectedAddOns(["waterproofing", "waste"]);
    setNotice("Layout reset to the quote-ready bathroom baseline.");
  };

  const clientToRoom = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const transformed = point.matrixTransform(svg.getScreenCTM()?.inverse());
    return {
      x: (transformed.x - planX) / scale,
      y: (transformed.y - planY) / scale,
    };
  };

  const pointerDown = (fixture: StudioFixture, event: React.PointerEvent<SVGGElement>) => {
    const point = clientToRoom(event.clientX, event.clientY);
    setSelectedId(fixture.id);
    setDragState({ id: fixture.id, offsetX: point.x - fixture.x, offsetY: point.y - fixture.y });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragState) return;
    const fixture = fixtures.find((item) => item.id === dragState.id);
    if (!fixture) return;
    const point = clientToRoom(event.clientX, event.clientY);
    const nextX = clamp(snap(point.x - dragState.offsetX), 4, ROOM.width - fixture.width - 4);
    const nextY = clamp(snap(point.y - dragState.offsetY), 4, ROOM.depth - fixture.depth - 4);
    setFixtures((current) =>
      current.map((item) => item.id === dragState.id ? { ...item, x: nextX, y: nextY } : item)
    );
  };

  const pointerUp = () => setDragState(null);

  const paywallTitle =
    paywallReason === "register"
      ? "Unlock the first 3 quote-pack credits"
      : paywallReason === "quota"
        ? "Trial credits are used"
        : "Upgrade to Homeowner Premium";
  const paywallBody =
    paywallReason === "register"
      ? "The 2D quote audit stays free. Register to unlock 3D concepts and contractor-ready quote packs with 3 included credits."
      : paywallReason === "quota"
        ? "Premium keeps 3D concepts, saved quote packs and repeat layout options unlocked while you refine the brief."
        : "Premium is built for homeowners who want a polished renovation file before speaking with contractors.";

  const activeQuery = `/quote?style=${styleId}&suburb=${encodeURIComponent(brief.suburb)}&budgetLow=${budgetLow}&budgetHigh=${budgetHigh}&fixtures=${fixtures.map((fixture) => fixture.type).join(",")}`;

  return (
    <section
      id="design-pack-studio"
      style={{
        width: "100%",
        maxWidth: 1220,
        margin: "0 auto",
        border: "1px solid var(--sand-300)",
        background: "#fdfcf9",
        boxShadow: "0 22px 64px rgba(26,35,50,0.13)",
        color: "var(--slate-dark)",
      }}
    >
      <div
        style={{
          padding: "26px 30px",
          borderBottom: "1px solid var(--sand-300)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 300px",
          gap: 24,
          alignItems: "start",
        }}
        className="renoscope-top"
      >
        <div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
            <span className="studio-kicker">RenoScope Studio</span>
            <span className="studio-pill">2D free</span>
            <span className="studio-pill dark">3D + quote pack use credits</span>
          </div>
          <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(1.85rem, 3vw, 2.65rem)", fontWeight: 500, lineHeight: 1.08, margin: "0 0 12px" }}>
            Turn a vague renovation idea into a file tradies can actually quote.
          </h3>
          <p style={{ color: "var(--slate-light)", maxWidth: 760, lineHeight: 1.72, margin: 0, fontSize: "0.98rem" }}>
            Capture the room context, arrange the wet-area plan, flag likely quote risks, then unlock a 3D concept and contractor-facing quote pack.
          </p>
        </div>

        <div style={{ background: "#102f2b", color: "white", border: "1px solid var(--sand-300)", padding: "17px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
            <span style={{ fontSize: "0.66rem", color: "rgba(255,255,255,0.58)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 850 }}>
              Quote readiness
            </span>
            <strong style={{ color: "var(--gold-light)", fontSize: "1.4rem" }}>{readiness}</strong>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.12)", margin: "10px 0 10px" }}>
            <div style={{ width: `${readiness}%`, height: "100%", background: "var(--gold-light)" }} />
          </div>
          <strong style={{ display: "block", fontSize: "0.88rem", marginBottom: 4 }}>{leadStatus}</strong>
          <span style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.64)" }}>
            {isPremiumSubscribed ? "Premium homeowner" : isRegistered ? "Registered trial" : "Guest audit"} - {creditLabel}
          </span>
        </div>
      </div>

      <div style={{ padding: "15px 30px", borderBottom: "1px solid var(--sand-300)", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", background: "var(--sand-50)" }}>
        <span style={{ fontSize: "0.84rem", color: "var(--slate-mid)", fontWeight: 700 }}>{notice}</span>
        <span style={{ fontSize: "0.78rem", color: "var(--slate-light)" }}>Built as a lead magnet: useful 2D audit first, premium outcomes after commitment.</span>
      </div>

      <div className="renoscope-grid" style={{ display: "grid", gridTemplateColumns: "280px minmax(0, 1fr) 300px", minHeight: 720 }}>
        <aside style={{ borderRight: "1px solid var(--sand-300)", padding: 18, display: "flex", flexDirection: "column", gap: 18, background: "white" }}>
          <div>
            <span className="panel-label">Project intake</span>
            <div style={{ display: "grid", gap: 9 }}>
              <label className="studio-field">
                <span>Suburb</span>
                <input value={brief.suburb} onChange={(event) => updateBrief("suburb", event.target.value)} />
              </label>
              <label className="studio-field">
                <span>Room type</span>
                <select value={brief.roomType} onChange={(event) => updateBrief("roomType", event.target.value)}>
                  <option>Bathroom</option>
                  <option>Kitchen</option>
                  <option>Laundry</option>
                  <option>Ensuite</option>
                  <option>Alfresco</option>
                </select>
              </label>
              <label className="studio-field">
                <span>Home era</span>
                <select value={brief.homeEra} onChange={(event) => updateBrief("homeEra", event.target.value)}>
                  <option>Pre-1980s</option>
                  <option>1980s-2000s</option>
                  <option>2000s-2015</option>
                  <option>Recent build</option>
                </select>
              </label>
              <label className="studio-field">
                <span>Target budget</span>
                <select value={brief.targetBudget} onChange={(event) => updateBrief("targetBudget", event.target.value)}>
                  <option>$20k-$30k</option>
                  <option>$30k-$45k</option>
                  <option>$45k-$70k</option>
                  <option>$70k+</option>
                </select>
              </label>
              <label className="studio-field">
                <span>Objective</span>
                <textarea value={brief.objective} onChange={(event) => updateBrief("objective", event.target.value)} rows={4} />
              </label>
            </div>
          </div>

          <div>
            <span className="panel-label">Site evidence</span>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="evidence-drop">
              {photoPreview ? (
                <span style={{ display: "grid", gap: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoPreview} alt="Uploaded room evidence preview" style={{ width: "100%", height: 92, objectFit: "cover", border: "1px solid var(--sand-300)" }} />
                  <strong>{photoName}</strong>
                  <span>Replace photo</span>
                </span>
              ) : (
                <span style={{ display: "grid", gap: 5 }}>
                  <strong>Add room photo</strong>
                  <span>Raises quote readiness and gives tradies context.</span>
                </span>
              )}
            </button>
          </div>

          <div>
            <span className="panel-label">Finish system</span>
            <div style={{ display: "grid", gap: 8 }}>
              {STYLE_SYSTEMS.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setStyleId(style.id)}
                  className={styleId === style.id ? "studio-choice active" : "studio-choice"}
                >
                  <strong>{style.name}</strong>
                  <span>{style.tag}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="panel-label">Fixtures</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {FIXTURE_CATALOG.map((item) => (
                <button key={item.type} onClick={() => addFixture(item)} className="fixture-button">
                  <strong>{symbolFor(item.type)}</strong>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="panel-label">Quote allowances</span>
            <div style={{ display: "grid", gap: 8 }}>
              {ADD_ONS.map((item) => {
                const active = selectedAddOns.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleAddOn(item.id)}
                    className={active ? "allowance-button active" : "allowance-button"}
                  >
                    <span />
                    <strong>{item.label}</strong>
                    <em>+{formatCurrency(item.price)}</em>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main style={{ minWidth: 0, background: "#0d2422", color: "white", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, padding: 12, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            {[
              { id: "plan", label: "2D quote audit", sub: "Free" },
              { id: "preview", label: "3D concept", sub: isPremiumSubscribed || unlockedModes.includes("preview") ? "Unlocked" : "1 credit" },
              { id: "scope", label: "Quote pack", sub: isPremiumSubscribed || unlockedModes.includes("scope") ? "Unlocked" : "1 credit" },
            ].map((tab) => (
              <button key={tab.id} onClick={() => unlockMode(tab.id as StudioMode)} className={activeMode === tab.id ? "mode-tab active" : "mode-tab"}>
                <strong>{tab.label}</strong>
                <span>{tab.sub}</span>
              </button>
            ))}
          </div>

          {activeMode === "plan" && (
            <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="plan-summary">
                <div>
                  <span>Client brief</span>
                  <strong>{brief.roomType} - {brief.suburb || "Suburb needed"}</strong>
                </div>
                <div>
                  <span>Indicative range</span>
                  <strong>{formatCurrency(budgetLow)} - {formatCurrency(budgetHigh)}</strong>
                </div>
                <div>
                  <span>Missing before quote</span>
                  <strong>{missingItems.length}</strong>
                </div>
              </div>

              <svg
                ref={svgRef}
                viewBox="0 0 530 430"
                onPointerMove={pointerMove}
                onPointerUp={pointerUp}
                onPointerLeave={pointerUp}
                style={{ width: "100%", minHeight: 430, background: "#eef1ea", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 4, touchAction: "none" }}
              >
                <defs>
                  <pattern id="reno-grid" width="23.6" height="23.6" patternUnits="userSpaceOnUse">
                    <path d="M 23.6 0 L 0 0 0 23.6" fill="none" stroke="rgba(14,68,64,0.12)" strokeWidth="1" />
                  </pattern>
                  <pattern id="floor-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
                    <rect width="48" height="48" fill={activeStyle.floor} />
                    <path d="M 0 0 L 48 0 L 48 48" fill="none" stroke="rgba(26,35,50,0.09)" strokeWidth="1" />
                  </pattern>
                  <marker id="fall-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#17859a" />
                  </marker>
                </defs>
                <rect x={planX} y={planY} width={planW} height={planH} fill="url(#floor-pattern)" stroke="#1d332f" strokeWidth="4" />
                <rect x={planX} y={planY} width={planW} height={planH} fill="url(#reno-grid)" />

                <text x={planX} y={planY - 26} fill="#102f2b" fontSize="13" fontWeight="900">
                  {brief.roomType} quote audit - {ROOM.width / 100}m x {ROOM.depth / 100}m
                </text>
                <text x={planX + planW - 18} y={planY - 26} fill="#49635f" fontSize="11" fontWeight="800" textAnchor="end">
                  Snap grid: 50mm
                </text>

                <line x1={planX} y1={planY + planH + 24} x2={planX + planW} y2={planY + planH + 24} stroke="#102f2b" strokeWidth="1.5" />
                <text x={planX + planW / 2} y={planY + planH + 43} fill="#102f2b" fontSize="12" fontWeight="900" textAnchor="middle">{ROOM.width}0mm</text>
                <line x1={planX - 24} y1={planY} x2={planX - 24} y2={planY + planH} stroke="#102f2b" strokeWidth="1.5" />
                <text x={planX - 36} y={planY + planH / 2} fill="#102f2b" fontSize="12" fontWeight="900" textAnchor="middle" transform={`rotate(-90 ${planX - 36} ${planY + planH / 2})`}>{ROOM.depth}0mm</text>

                <rect x={planX + 18 * scale} y={planY + 142 * scale} width={100 * scale} height={100 * scale} fill="rgba(55,167,183,0.16)" stroke="#17859a" strokeDasharray="6 4" />
                <text x={planX + 22 * scale} y={planY + 158 * scale} fill="#126276" fontSize="10" fontWeight="900">WET ZONE</text>
                <line x1={planX + 66 * scale} y1={planY + 194 * scale} x2={planX + 105 * scale} y2={planY + 229 * scale} stroke="#17859a" strokeWidth="2" markerEnd="url(#fall-arrow)" />
                <text x={planX + 112 * scale} y={planY + 231 * scale} fill="#126276" fontSize="10" fontWeight="900">FALL 1:80 TBC</text>

                {selectedFixture && (
                  <g pointerEvents="none">
                    <line x1={planX} y1={planY + (selectedFixture.y + selectedFixture.depth / 2) * scale} x2={planX + selectedFixture.x * scale} y2={planY + (selectedFixture.y + selectedFixture.depth / 2) * scale} stroke="#c9972a" strokeWidth="1.5" strokeDasharray="5 4" />
                    <text x={planX + selectedFixture.x * scale / 2} y={planY + (selectedFixture.y + selectedFixture.depth / 2) * scale - 7} fill="#8a6619" fontSize="10" fontWeight="900" textAnchor="middle">
                      {Math.round(selectedFixture.x * 10)}mm
                    </text>
                    <line x1={planX + (selectedFixture.x + selectedFixture.width / 2) * scale} y1={planY} x2={planX + (selectedFixture.x + selectedFixture.width / 2) * scale} y2={planY + selectedFixture.y * scale} stroke="#c9972a" strokeWidth="1.5" strokeDasharray="5 4" />
                    <text x={planX + (selectedFixture.x + selectedFixture.width / 2) * scale + 8} y={planY + selectedFixture.y * scale / 2} fill="#8a6619" fontSize="10" fontWeight="900">
                      {Math.round(selectedFixture.y * 10)}mm
                    </text>
                  </g>
                )}

                {fixtures.map((fixture) => {
                  const selected = fixture.id === selectedId;
                  const fill = fixture.type === "shower" ? "rgba(23,133,154,0.22)" : fixture.type === "door" ? "#c8aa7a" : fixture.type === "linen" ? activeStyle.cabinet : "#fffdf7";
                  return (
                    <g
                      key={fixture.id}
                      transform={`translate(${planX + fixture.x * scale} ${planY + fixture.y * scale}) rotate(${fixture.rotation} ${fixture.width * scale / 2} ${fixture.depth * scale / 2})`}
                      onPointerDown={(event) => pointerDown(fixture, event)}
                      style={{ cursor: dragState?.id === fixture.id ? "grabbing" : "grab" }}
                    >
                      {selected && (
                        <rect x="-7" y="-7" width={fixture.width * scale + 14} height={fixture.depth * scale + 14} fill="none" stroke="#c9972a" strokeWidth="2.5" strokeDasharray="7 4" />
                      )}
                      <rect width={fixture.width * scale} height={fixture.depth * scale} fill={fill} stroke="#152f2c" strokeWidth="2" rx="3" />
                      {fixture.type === "toilet" && (
                        <>
                          <rect x={6} y={6} width={fixture.width * scale - 12} height={17} fill="#f2f4f1" stroke="#213a37" strokeWidth="1" />
                          <ellipse cx={fixture.width * scale / 2} cy={fixture.depth * scale * 0.62} rx={fixture.width * scale * 0.26} ry={fixture.depth * scale * 0.25} fill="#f8faf8" stroke="#647b77" />
                        </>
                      )}
                      {fixture.type === "vanity" && (
                        <>
                          <rect x={8} y={8} width={fixture.width * scale - 16} height={fixture.depth * scale - 16} fill={activeStyle.cabinet} opacity="0.5" />
                          <ellipse cx={fixture.width * scale / 2} cy={fixture.depth * scale / 2} rx={22} ry={12} fill="#f7f7f2" stroke="#667b77" />
                          <circle cx={fixture.width * scale / 2} cy={13} r="4" fill={activeStyle.metal} />
                        </>
                      )}
                      {fixture.type === "shower" && (
                        <>
                          <line x1="0" y1="0" x2={fixture.width * scale} y2={fixture.depth * scale} stroke="#17859a" strokeWidth="1.5" />
                          <line x1="0" y1={fixture.depth * scale} x2={fixture.width * scale} y2="0" stroke="#17859a" strokeWidth="1.5" />
                          <circle cx={fixture.width * scale / 2} cy={fixture.depth * scale / 2} r="7" fill="#102f2b" />
                        </>
                      )}
                      {fixture.type === "bath" && (
                        <ellipse cx={fixture.width * scale / 2} cy={fixture.depth * scale / 2} rx={fixture.width * scale / 2 - 8} ry={fixture.depth * scale / 2 - 8} fill="#fbfbf6" stroke="#405652" strokeWidth="2" />
                      )}
                      {fixture.type === "door" && (
                        <path d={`M 0 ${fixture.depth * scale} Q ${fixture.width * scale * 0.65} ${-fixture.width * scale * 0.45} ${fixture.width * scale} ${fixture.depth * scale}`} fill="none" stroke="#c9972a" strokeWidth="2" strokeDasharray="4 3" />
                      )}
                      <text x={fixture.width * scale / 2} y={fixture.depth * scale / 2 + 4} textAnchor="middle" fill="#102f2b" fontSize="12" fontWeight="900">
                        {symbolFor(fixture.type)}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={rotateSelected} className="studio-action">Rotate selected</button>
                  <button onClick={removeSelected} className="studio-action danger">Remove</button>
                  <button onClick={resetStudio} className="studio-action">Reset baseline</button>
                </div>
                <span style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.78rem", alignSelf: "center" }}>
                  Selected: {selectedFixture?.label ?? "None"}
                </span>
              </div>
            </div>
          )}

          {activeMode === "preview" && (
            <div style={{ flex: 1, minHeight: 560, position: "relative" }}>
              <Renovation3DPreview
                fixtures={fixtures}
                roomWidth={ROOM.width}
                roomDepth={ROOM.depth}
                wallColor={activeStyle.wall}
                floorColor={activeStyle.floor}
                cabinetColor={activeStyle.cabinet}
                metalColor={activeStyle.metal}
              />
              <div className="preview-overlay">
                <strong>3D concept view</strong>
                <span>Drag to orbit. Final drawings require site measure and contractor validation.</span>
              </div>
            </div>
          )}

          {activeMode === "scope" && (
            <div style={{ padding: 24, overflow: "auto" }}>
              <div style={{ background: "white", color: "var(--slate-dark)", border: "1px solid var(--sand-300)", padding: 28, borderRadius: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap", borderBottom: "1px solid var(--sand-300)", paddingBottom: 18, marginBottom: 18 }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 850, color: "var(--ocean-600)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Contractor-facing draft</span>
                    <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.55rem", margin: "5px 0 0", fontWeight: 600 }}>{brief.roomType} RenoScope Quote Pack</h4>
                    <p style={{ margin: "8px 0 0", color: "var(--slate-light)", fontSize: "0.86rem" }}>{brief.suburb} - {brief.propertyType} - {brief.homeEra}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "block", fontSize: "0.72rem", color: "var(--slate-light)" }}>Indicative range</span>
                    <strong style={{ color: "var(--gold)", fontSize: "1.2rem" }}>{formatCurrency(budgetLow)} - {formatCurrency(budgetHigh)}</strong>
                    <span style={{ display: "block", fontSize: "0.72rem", color: "var(--slate-light)", marginTop: 4 }}>Quote readiness {readiness}</span>
                  </div>
                </div>

                <div className="scope-banner">
                  <strong>Client objective</strong>
                  <span>{brief.objective}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="scope-grid">
                  <div>
                    <h5 className="scope-heading">Included fixtures</h5>
                    <ul className="scope-list">
                      {fixtures.map((fixture) => (
                        <li key={fixture.id}>{fixture.label}: {tradeFor(fixture.type)}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="scope-heading">Finish and allowance notes</h5>
                    <ul className="scope-list">
                      {activeStyle.notes.map((note) => <li key={note}>{note}</li>)}
                      {selectedAddOns.map((id) => <li key={id}>{ADD_ONS.find((item) => item.id === id)?.label}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="scope-heading">Risk flags to price clearly</h5>
                    <ul className="scope-list">
                      {(riskItems.length ? riskItems : [{ label: "No major layout flags from the concept plan.", severity: "low" as const }]).map((risk) => (
                        <li key={risk.label}>{risk.severity.toUpperCase()}: {risk.label}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="scope-heading">Before tradie introduction</h5>
                    <ul className="scope-list">
                      {(missingItems.length ? missingItems : ["Enough detail for initial matched quote conversation."]).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="scope-heading">Quote comparison rules</h5>
                    <ul className="scope-list">
                      <li>Separate demolition, rough-in, waterproofing, tiling and fit-off lines.</li>
                      <li>State exclusions for asbestos, structural changes and hidden damage.</li>
                      <li>Confirm QBCC licence class before matching.</li>
                      <li>Confirm Home Warranty eligibility only after final contract scope and value.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="scope-heading">Evidence attached</h5>
                    <ul className="scope-list">
                      <li>{photoPreview ? `Photo attached: ${photoName}` : "No photo attached yet."}</li>
                      <li>Room dimensions: {ROOM.width / 100}m x {ROOM.depth / 100}m concept basis.</li>
                      <li>Access note: {brief.access}.</li>
                      <li>Target budget: {brief.targetBudget}.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <aside style={{ borderLeft: "1px solid var(--sand-300)", background: "white", padding: 18, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="readiness-card">
            <span>Lead outcome</span>
            <strong>{leadStatus}</strong>
            <p>Readiness improves when the brief has site evidence, clear fixture scope, risk flags and allowance notes.</p>
          </div>

          <div>
            <h4 className="side-heading">Readiness breakdown</h4>
            {[
              { label: "Evidence", value: evidenceScore },
              { label: "Scope clarity", value: scopeScore },
              { label: "Pricing basis", value: pricingScore },
              { label: "Compliance risk", value: complianceScore },
            ].map((item) => (
              <div key={item.label} className="score-row">
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div><span style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="side-heading">Live budget range</h4>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <strong style={{ color: "var(--gold)", fontSize: "1.32rem" }}>{formatCurrency(budgetLow)}</strong>
              <span style={{ color: "var(--slate-light)" }}>to</span>
              <strong style={{ color: "var(--gold)", fontSize: "1.32rem" }}>{formatCurrency(budgetHigh)}</strong>
            </div>
            <p style={{ color: "var(--slate-light)", fontSize: "0.75rem", lineHeight: 1.6, marginTop: 8 }}>
              Indicative only. Formal quote must come from a licensed contractor after inspection.
            </p>
          </div>

          <div>
            <h4 className="side-heading">Missing before quote</h4>
            <div style={{ display: "grid", gap: 8 }}>
              {(missingItems.length ? missingItems : ["No critical items missing for an initial quote conversation."]).slice(0, 5).map((item) => (
                <div key={item} className="missing-item">
                  <span />
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="side-heading">Risk pre-check</h4>
            <div style={{ display: "grid", gap: 8 }}>
              {(riskItems.length ? riskItems : [{ label: "No major layout risks detected in this concept.", severity: "low" as const }]).map((risk) => (
                <div key={risk.label} className={risk.severity === "high" ? "risk-card high" : "risk-card"}>
                  <strong>{risk.severity}</strong>
                  <span>{risk.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "auto", display: "grid", gap: 9 }}>
            <button onClick={() => unlockMode("scope")} className="studio-primary">Unlock quote pack</button>
            <button onClick={() => unlockMode("preview")} className="studio-secondary-button">Open 3D concept</button>
            <Link href={activeQuery} className="studio-secondary">Send to quote brief</Link>
          </div>
        </aside>
      </div>

      {showPaywall && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(8,24,23,0.76)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ width: "100%", maxWidth: 540, background: "white", border: "1px solid var(--sand-300)", boxShadow: "0 24px 80px rgba(0,0,0,0.36)", padding: 30, position: "relative" }}>
            <button onClick={() => setShowPaywall(false)} style={{ position: "absolute", top: 15, right: 15, border: "none", background: "transparent", fontSize: "1.2rem", cursor: "pointer", color: "var(--slate-light)" }}>x</button>
            <span style={{ display: "inline-flex", border: "1px solid var(--sand-300)", background: "var(--sand-50)", padding: "6px 10px", fontWeight: 850, color: "var(--gold)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Premium unlock</span>
            <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.65rem", fontWeight: 600, margin: "18px 0 8px" }}>{paywallTitle}</h4>
            <p style={{ color: "var(--slate-light)", lineHeight: 1.65, margin: "0 0 20px", fontSize: "0.92rem" }}>{paywallBody}</p>
            <div style={{ border: "1px solid var(--sand-300)", background: "var(--sand-50)", padding: 18, marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", marginBottom: 10 }}>
                <strong>Homeowner Premium</strong>
                <span><strong style={{ color: "var(--ocean-700)", fontSize: "1.35rem" }}>$19</strong> /mo + GST</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, color: "var(--slate-mid)", fontSize: "0.82rem" }}>
                <li>Unlimited 3D concept previews</li>
                <li>Quote-ready scope pack surface</li>
                <li>Risk flags, missing-info checks and licence-class checklist</li>
                <li>Repeat versions before speaking with tradies</li>
              </ul>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <button onClick={handleSubscribe} disabled={checkoutLoading} className="studio-primary">
                {checkoutLoading ? "Opening checkout..." : "Subscribe to Premium"}
              </button>
              {!isRegistered && (
                <button onClick={handleRegister} className="studio-secondary-button">Register trial - 3 credits</button>
              )}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .studio-kicker,
        .studio-pill,
        .panel-label,
        .side-heading {
          font-family: Outfit, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 850;
        }
        #design-pack-studio,
        #design-pack-studio * {
          min-width: 0;
        }
        #design-pack-studio {
          max-width: 100%;
          overflow: hidden;
        }
        #design-pack-studio h3,
        #design-pack-studio p,
        #design-pack-studio strong,
        #design-pack-studio span {
          overflow-wrap: break-word;
        }
        .studio-kicker {
          border: 1px solid var(--ocean-200);
          background: var(--ocean-50);
          color: var(--ocean-700);
          padding: 8px 12px;
          font-size: 0.72rem;
        }
        .studio-pill {
          border: 1px solid var(--sand-300);
          color: var(--slate-mid);
          padding: 8px 10px;
          font-size: 0.66rem;
          background: white;
        }
        .studio-pill.dark {
          background: #102f2b;
          color: white;
          border-color: #102f2b;
        }
        .panel-label {
          display: block;
          font-size: 0.7rem;
          color: var(--slate-light);
          margin-bottom: 10px;
        }
        .studio-field {
          display: grid;
          gap: 5px;
        }
        .studio-field span {
          color: var(--slate-light);
          font-size: 0.69rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .studio-field input,
        .studio-field select,
        .studio-field textarea {
          width: 100%;
          border: 1px solid var(--sand-300);
          background: var(--sand-50);
          color: var(--slate-dark);
          border-radius: 4px;
          padding: 9px 10px;
          font: inherit;
          font-size: 0.82rem;
        }
        .studio-field textarea { resize: vertical; line-height: 1.45; }
        .evidence-drop {
          width: 100%;
          border: 1px dashed var(--ocean-300);
          background: var(--ocean-50);
          color: var(--slate-dark);
          text-align: left;
          padding: 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .evidence-drop strong {
          color: var(--ocean-700);
          font-size: 0.82rem;
        }
        .evidence-drop span {
          color: var(--slate-light);
          font-size: 0.74rem;
          line-height: 1.45;
        }
        .studio-choice {
          text-align: left;
          background: white;
          color: var(--slate-dark);
          border: 1px solid var(--sand-300);
          padding: 11px 12px;
          cursor: pointer;
          border-radius: 4px;
        }
        .studio-choice.active {
          background: #102f2b;
          color: white;
          border-color: var(--gold);
        }
        .studio-choice strong,
        .fixture-button strong {
          display: block;
          font-size: 0.82rem;
          margin-bottom: 2px;
        }
        .studio-choice span,
        .fixture-button span {
          display: block;
          font-size: 0.68rem;
          color: var(--slate-light);
        }
        .studio-choice.active span { color: rgba(255,255,255,0.64); }
        .fixture-button {
          background: var(--sand-50);
          border: 1px solid var(--sand-300);
          padding: 10px 8px;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          min-height: 70px;
        }
        .fixture-button strong { color: var(--ocean-700); font-size: 0.86rem; }
        .allowance-button {
          display: grid;
          grid-template-columns: 16px minmax(0, 1fr) auto;
          gap: 9px;
          align-items: start;
          text-align: left;
          background: white;
          border: 1px solid var(--sand-300);
          padding: 10px 11px;
          border-radius: 4px;
          cursor: pointer;
        }
        .allowance-button.active {
          background: var(--ocean-50);
          border-color: var(--ocean-300);
        }
        .allowance-button > span {
          width: 14px;
          height: 14px;
          margin-top: 2px;
          border: 1px solid var(--ocean-600);
          background: transparent;
        }
        .allowance-button.active > span { background: var(--ocean-600); }
        .allowance-button strong {
          color: var(--slate-dark);
          font-size: 0.76rem;
          line-height: 1.35;
        }
        .allowance-button em {
          color: var(--slate-light);
          font-size: 0.68rem;
          font-style: normal;
          white-space: nowrap;
        }
        .mode-tab {
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.82);
          padding: 11px 12px;
          text-align: left;
          cursor: pointer;
          border-radius: 4px;
        }
        .mode-tab.active {
          background: var(--sand-100);
          color: var(--slate-dark);
        }
        .mode-tab strong {
          display: block;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .mode-tab span {
          display: block;
          font-size: 0.68rem;
          margin-top: 3px;
          opacity: 0.72;
        }
        .plan-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .plan-summary > div {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          padding: 10px 12px;
          border-radius: 4px;
        }
        .plan-summary span {
          display: block;
          color: rgba(255,255,255,0.55);
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 850;
        }
        .plan-summary strong {
          display: block;
          margin-top: 3px;
          font-size: 0.86rem;
          color: white;
        }
        .studio-action,
        .studio-primary,
        .studio-secondary,
        .studio-secondary-button {
          border-radius: 4px;
          font-family: Outfit, sans-serif;
          font-weight: 850;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: var(--transition-fast);
        }
        .studio-action {
          border: 1px solid rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.06);
          color: white;
          padding: 9px 12px;
          font-size: 0.72rem;
        }
        .studio-action.danger { color: #ffc0b8; }
        .studio-primary {
          border: 1px solid var(--gold);
          background: var(--gold);
          color: white;
          padding: 13px 15px;
          font-size: 0.78rem;
        }
        .studio-secondary,
        .studio-secondary-button {
          border: 1px solid var(--sand-300);
          background: white;
          color: var(--slate-dark);
          padding: 12px 15px;
          font-size: 0.76rem;
        }
        .preview-overlay {
          position: absolute;
          left: 18px;
          bottom: 18px;
          max-width: 320px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(9,26,24,0.82);
          color: white;
          padding: 13px 14px;
          border-radius: 4px;
          backdrop-filter: blur(8px);
        }
        .preview-overlay strong,
        .preview-overlay span {
          display: block;
        }
        .preview-overlay strong { font-size: 0.86rem; margin-bottom: 4px; }
        .preview-overlay span { font-size: 0.75rem; color: rgba(255,255,255,0.66); line-height: 1.5; }
        .readiness-card {
          border: 1px solid var(--sand-300);
          padding: 16px;
          background: var(--sand-50);
        }
        .readiness-card span {
          display: block;
          font-size: 0.68rem;
          color: var(--slate-light);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 850;
        }
        .readiness-card strong {
          display: block;
          color: var(--ocean-700);
          font-size: 1.18rem;
          margin-top: 6px;
        }
        .readiness-card p {
          margin: 8px 0 0;
          color: var(--slate-light);
          font-size: 0.78rem;
          line-height: 1.55;
        }
        .side-heading {
          font-size: 0.78rem;
          color: var(--slate-dark);
          margin: 0 0 10px;
        }
        .score-row {
          display: grid;
          gap: 5px;
          margin-bottom: 10px;
        }
        .score-row > div:first-child {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: var(--slate-mid);
          font-size: 0.78rem;
        }
        .score-row > div:last-child {
          height: 7px;
          background: var(--sand-100);
        }
        .score-row > div:last-child span {
          display: block;
          height: 100%;
          background: var(--ocean-600);
        }
        .missing-item {
          display: flex;
          gap: 9px;
          align-items: flex-start;
          border: 1px solid var(--sand-300);
          background: var(--sand-50);
          padding: 9px 10px;
          border-radius: 4px;
        }
        .missing-item span {
          width: 8px;
          height: 8px;
          background: var(--gold);
          margin-top: 5px;
          flex: 0 0 auto;
        }
        .missing-item strong {
          color: var(--slate-mid);
          font-size: 0.76rem;
          line-height: 1.45;
        }
        .risk-card {
          border: 1px solid var(--sand-300);
          padding: 10px 11px;
          background: var(--sand-50);
        }
        .risk-card.high { background: #fff4ef; }
        .risk-card strong {
          display: block;
          font-size: 0.68rem;
          color: var(--ocean-700);
          text-transform: uppercase;
          margin-bottom: 3px;
        }
        .risk-card.high strong { color: #b45309; }
        .risk-card span {
          color: var(--slate-mid);
          font-size: 0.77rem;
          line-height: 1.5;
        }
        .scope-banner {
          display: grid;
          gap: 5px;
          border: 1px solid var(--sand-300);
          background: var(--sand-50);
          padding: 14px 16px;
          margin-bottom: 18px;
        }
        .scope-banner strong {
          color: var(--ocean-700);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 0.72rem;
        }
        .scope-banner span {
          color: var(--slate-mid);
          line-height: 1.55;
          font-size: 0.86rem;
        }
        .scope-heading {
          margin: 0 0 8px;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ocean-700);
        }
        .scope-list {
          margin: 0;
          padding-left: 18px;
          color: var(--slate-mid);
          display: grid;
          gap: 6px;
          font-size: 0.82rem;
          line-height: 1.55;
        }
        @media (max-width: 1120px) {
          .renoscope-grid { grid-template-columns: 1fr !important; }
          .renoscope-grid > aside { border-right: none !important; border-left: none !important; border-bottom: 1px solid var(--sand-300); }
          .renoscope-top { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          #design-pack-studio { border-left: none !important; border-right: none !important; }
          #design-pack-studio h3 { font-size: 1.9rem !important; }
          .plan-summary { grid-template-columns: 1fr !important; }
          .scope-grid { grid-template-columns: 1fr !important; }
          .mode-tab strong { font-size: 0.68rem; }
          .mode-tab { padding: 9px; }
        }
      `}} />
    </section>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Bathroom", "Kitchen", "Living Room", "Exterior", "Bedroom"];

// 디자인별 잡지급 사진 (Unsplash, 상업 사용 무료)
const designImages: Record<number, string> = {
  1: "/gallery/interior-1.jpg",
  2: "/gallery/interior-2.jpg",
  3: "/gallery/interior-6.jpg",
  4: "/gallery/interior-1.jpg",
  5: "/gallery/interior-5.jpg",
  6: "/gallery/interior-7.jpg",
  7: "/gallery/interior-8.jpg",
  8: "/gallery/interior-4.jpg",
  9: "/gallery/interior-3.jpg",
};

const designs = [
  {
    id: 1,
    category: "Bathroom",
    name: "Coastal Minimalism",
    year: "2025",
    trending: true,
    emoji: "🌊",
    palette: ["#e8f5f4", "#a8d8d3", "#1f7a72"],
    subtitle: "Clean lines, natural textures, ocean-inspired calm",
    description:
      "Coastal minimalism strips away the clutter and replaces it with organic textures, muted ocean tones, and natural materials. Popular in Gold Coast and Sunshine Coast homes where the indoor-outdoor lifestyle thrives.",
    pros: [
      "Timeless — won't feel dated in 5 years",
      "Works in small and large spaces equally well",
      "Natural materials age beautifully",
      "Calming and easy to live with",
      "Strong resale value in QLD market",
    ],
    cons: [
      "Natural stone and timber can be expensive",
      "Light colours show dirt and grout staining more",
      "Requires regular sealing of natural stone",
      "Minimal decor can feel cold if done wrong",
    ],
    bestFor: "Units, beach houses, modern family homes",
    difficulty: "Medium",
    cost: "$$$",
    tag: "#1 in QLD 2025",
    tagColor: "#1f7a72",
  },
  {
    id: 2,
    category: "Bathroom",
    name: "Japandi Style",
    year: "2025",
    trending: true,
    emoji: "🍵",
    palette: ["#f5f0e8", "#c8b89a", "#3d2b1f"],
    subtitle: "Japanese wabi-sabi meets Scandinavian simplicity",
    description:
      "Japandi fuses Japanese wabi-sabi philosophy with Scandinavian hygge. Think warm neutrals, handmade ceramic finishes, exposed timber, and perfectly imperfect details. A rising favourite in Brisbane and Sunshine Coast renovations.",
    pros: [
      "Incredibly calming and zen atmosphere",
      "Sustainable — uses natural, long-lasting materials",
      "Very low visual clutter — easy to maintain clean look",
      "Works in small bathrooms and ensuites",
      "Extremely photogenic for Airbnb/rental properties",
    ],
    cons: [
      "Premium handmade ceramics and fixtures cost more",
      "Very specific aesthetic — not for everyone",
      "Warm tones may clash with bright QLD sunlight",
      "Hard to find authentic pieces locally — may need to import",
    ],
    bestFor: "Ensuites, boutique rentals, design-focused owners",
    difficulty: "High",
    cost: "$$$$",
    tag: "Trending Fast",
    tagColor: "#7c3aed",
  },
  {
    id: 3,
    category: "Kitchen",
    name: "Bold Earthy Tones",
    year: "2025",
    trending: true,
    emoji: "🏔️",
    palette: ["#d4a574", "#8b5e3c", "#2d1b0e"],
    subtitle: "Terracotta, clay, and rich earth tones take over",
    description:
      "Earth tones have broken through in 2025 — terracotta cabinetry, clay render walls, olive green joinery, and warm amber lighting. This trend brings warmth and personality that the grey-everything era lacked.",
    pros: [
      "Makes a bold, memorable statement",
      "Hides dirt and wear better than whites",
      "Warm tones work exceptionally well in QLD light",
      "High contrast styling photographs beautifully",
      "Affordable — paint and tile swaps can transform a space",
    ],
    cons: [
      "Strong colours can reduce resale appeal to some buyers",
      "Difficult to change later if tastes shift",
      "Terracotta tiles need regular sealing",
      "Clashes with cool-toned fixtures (chrome, silver)",
    ],
    bestFor: "Family homes, owner-occupiers, bold personalities",
    difficulty: "Low–Medium",
    cost: "$$",
    tag: "Value for Money",
    tagColor: "#d97706",
  },
  {
    id: 4,
    category: "Bathroom",
    name: "Dark & Moody",
    year: "2025",
    trending: false,
    emoji: "🖤",
    palette: ["#1a1a2e", "#2d2d44", "#4a4a6a"],
    subtitle: "Charcoal, navy, and matte black for dramatic depth",
    description:
      "Dark bathrooms are having a huge moment. Charcoal tiles from floor to ceiling, matte black fixtures, and moody lighting create a hotel-spa atmosphere. Best executed with good lighting design.",
    pros: [
      "Dramatic, luxurious hotel-spa feel",
      "Dark tiles hide watermarks and soap scum",
      "Matte black fixtures are extremely durable",
      "Creates a strong, memorable design identity",
      "Pairs well with gold accents for extra luxury",
    ],
    cons: [
      "Dark rooms need excellent lighting (adds cost)",
      "Can make small bathrooms feel cave-like",
      "Requires strong exhaust to prevent mould in dark grout",
      "Not universally appealing for resale",
      "Shows dust and lint on dark surfaces",
    ],
    bestFor: "Large ensuites, confident designers, Airbnb hosts",
    difficulty: "High",
    cost: "$$$",
    tag: "Bold Statement",
    tagColor: "#374151",
  },
  {
    id: 5,
    category: "Living Room",
    name: "Biophilic Design",
    year: "2025",
    trending: true,
    emoji: "🌿",
    palette: ["#d4edda", "#6ab187", "#1e5631"],
    subtitle: "Nature inside the home — plants, light, organic shapes",
    description:
      "Biophilic design integrates nature into your living space through living walls, natural light maximisation, organic curved furniture, and raw natural materials. Perfect for Queensland's subtropical lifestyle.",
    pros: [
      "Proven to reduce stress and improve wellbeing",
      "Naturally improves air quality",
      "Works with almost any existing design style",
      "Highly adaptable — add as much or as little as you like",
      "Strong appeal to health-conscious buyers",
    ],
    cons: [
      "Plants require maintenance — can look neglected if ignored",
      "Living walls need irrigation systems ($$$)",
      "Humidity from plants can cause mould in poorly ventilated spaces",
      "Full biophilic fitout (living walls, sky lights) is expensive",
    ],
    bestFor: "Open plan living areas, sunrooms, home offices",
    difficulty: "Low–High (depends on scope)",
    cost: "$–$$$$",
    tag: "Wellness Trend",
    tagColor: "#16a34a",
  },
  {
    id: 6,
    category: "Kitchen",
    name: "Two-Tone Cabinetry",
    year: "2025",
    trending: true,
    emoji: "🎨",
    palette: ["#f0f0f0", "#2d3748", "#ffffff"],
    subtitle: "Upper white, lower charcoal — the most popular kitchen update",
    description:
      "Two-tone kitchens combine light upper cabinetry with darker lower joinery, or vice versa. This technique adds visual interest and depth without overwhelming the space. It's the #1 budget kitchen refresh in 2025.",
    pros: [
      "Cost-effective way to update an existing kitchen",
      "Adds depth and character without full renovation",
      "Adaptable to many styles (coastal, modern, classic)",
      "Very popular with real estate agents for sale prep",
      "Works in kitchens of all sizes",
    ],
    cons: [
      "Colour choice is crucial — bad combos look cheap",
      "Requires professional painting for clean line results",
      "May date faster than single-tone timeless alternatives",
      "Darker lower cabinets can show scuffs from shoes/bags",
    ],
    bestFor: "Pre-sale renovations, rental upgrades, budget makeovers",
    difficulty: "Low–Medium",
    cost: "$–$$",
    tag: "Best ROI",
    tagColor: "#0891b2",
  },
  {
    id: 7,
    category: "Exterior",
    name: "Modern Hamptons",
    year: "2025",
    trending: false,
    emoji: "🏛️",
    palette: ["#f5f5f5", "#d4d4d4", "#1a3a5c"],
    subtitle: "White weatherboards, navy accents, classic coastal charm",
    description:
      "The Hamptons look continues to dominate Queensland streetscapes — particularly on the Gold Coast. White or light grey cladding, navy blue accents, and timber shutters define this enduringly popular style.",
    pros: [
      "Extremely popular in QLD — strong resale value",
      "Classic and timeless — not easily dated",
      "Works for new builds and renovations equally",
      "Strong kerb appeal and street presence",
      "Light colours keep homes cooler in QLD heat",
    ],
    cons: [
      "Very common in QLD — lacks uniqueness in some suburbs",
      "White exteriors require regular repainting (3–7 years)",
      "Authentic materials (weatherboard, shiplap) are expensive",
      "Navy accent trim requires careful maintenance to avoid fading",
    ],
    bestFor: "Family homes, investment properties, coastal suburbs",
    difficulty: "Medium",
    cost: "$$$",
    tag: "Classic Favourite",
    tagColor: "#1a3a5c",
  },
  {
    id: 8,
    category: "Bedroom",
    name: "Soft Organic Luxury",
    year: "2025",
    trending: true,
    emoji: "🌙",
    palette: ["#f5ede8", "#d4b8a8", "#7a5c50"],
    subtitle: "Curved forms, linen textures, warm blush and caramel tones",
    description:
      "Soft organic luxury replaces hard edges with curves — arched bed heads, rounded furniture, organic cotton bedding, and warm terracotta or blush palettes. This is the bedroom trend dominating Instagram in 2025.",
    pros: [
      "Creates a cocoon-like retreat atmosphere",
      "Highly achievable — mainly furniture and soft furnishings",
      "Warm tones are universally flattering under warm lighting",
      "Strong social media appeal (great for Airbnb marketing)",
      "Can be achieved at any budget range",
    ],
    cons: [
      "Curved and organic furniture pieces can be hard to source in QLD",
      "Light linen fabrics stain and wrinkle easily",
      "Can feel overly feminine — not for all households",
      "Blush and warm tones may feel dated in a few years",
    ],
    bestFor: "Master bedrooms, Airbnb/holiday lets, design lovers",
    difficulty: "Low",
    cost: "$–$$$",
    tag: "Instagram Favourite",
    tagColor: "#be185d",
  },
  {
    id: 9,
    category: "Exterior",
    name: "Blackened Timber & Raw Concrete",
    year: "2025",
    trending: true,
    emoji: "🏗️",
    palette: ["#1a1a1a", "#3d3d3d", "#8b7355"],
    subtitle: "Industrial-meets-organic for a bold modern Australian exterior",
    description:
      "Dark charred timber (Shou Sugi Ban), raw concrete renders, and black steel frames create a striking contemporary exterior. Increasingly popular in prestige Queensland homes and architect-designed builds.",
    pros: [
      "Extremely unique — stands out on any street",
      "Charred timber is naturally fire and rot resistant",
      "Low maintenance exterior once installed",
      "Ages beautifully — improves with weathering",
      "Strong architectural identity and premium appeal",
    ],
    cons: [
      "High initial material and labour cost",
      "Not suitable for all neighbourhood aesthetics",
      "Dark exteriors absorb more heat — needs good insulation",
      "Council restrictions may apply in some areas",
      "Difficult to reverse if you change your mind",
    ],
    bestFor: "Prestige builds, architect-designed homes, design-forward owners",
    difficulty: "High",
    cost: "$$$$",
    tag: "Premium Statement",
    tagColor: "#374151",
  },
];

const costMap: Record<string, string> = {
  "$": "Budget-friendly (under $5k)",
  "$$": "Mid-range ($5k–$15k)",
  "$$$": "Premium ($15k–$40k)",
  "$$$$": "Luxury ($40k+)",
  "$–$$": "Flexible ($1k–$15k)",
  "$–$$$$": "Flexible (any budget)",
  "$–$$$": "Flexible ($1k–$40k)",
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<null | (typeof designs)[0]>(null);

  const filtered =
    activeFilter === "All"
      ? designs
      : designs.filter((d) => d.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--sand-50) 0%, var(--ocean-50) 100%)",
          paddingTop: 120,
          paddingBottom: 64,
        }}
      >
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>
            2025 Design Gallery
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 16 }}>
            Home Design Trends for 2025
            <br />
            <span style={{ color: "var(--ocean-500)" }}>Pros, Cons & Real Costs</span>
          </h1>
          <p
            style={{
              color: "var(--slate-light)",
              fontSize: "1.05rem",
              maxWidth: 600,
              lineHeight: 1.7,
            }}
          >
            Thinking about renovating? Browse the hottest Australian home design styles of 2025 — with honest pros, cons, and real cost estimates so you can decide what&apos;s right for your home.
          </p>
        </div>
      </section>

      {/* Sticky Filter */}
      <section
        style={{
          background: "white",
          borderBottom: "1px solid var(--sand-200)",
          position: "sticky",
          top: 72,
          zIndex: 100,
        }}
      >
        <div className="container-lg" style={{ padding: "16px 24px", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 10, minWidth: "max-content" }}>
            {categories.map((cat) => {
              const active = activeFilter === cat;
              const count = cat === "All" ? designs.length : designs.filter((d) => d.category === cat).length;
              return (
                <button
                  key={cat}
                  id={`filter-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "50px",
                    border: active ? "2px solid var(--ocean-400)" : "1px solid var(--sand-200)",
                    background: active ? "var(--ocean-50)" : "white",
                    color: active ? "var(--ocean-700)" : "var(--slate-mid)",
                    fontWeight: active ? 700 : 500,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                    transition: "var(--transition-fast)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                  <span
                    style={{
                      marginLeft: 6,
                      background: active ? "var(--ocean-200)" : "var(--sand-200)",
                      color: active ? "var(--ocean-700)" : "var(--slate-light)",
                      borderRadius: "50px",
                      padding: "1px 7px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Design Grid */}
      <section style={{ background: "var(--off-white)", padding: "48px 0 96px" }}>
        <div className="container-lg">
          <p style={{ fontSize: "0.85rem", color: "var(--slate-light)", marginBottom: 28 }}>
            Showing {filtered.length} design{filtered.length !== 1 ? "s" : ""}
            {activeFilter !== "All" ? ` for "${activeFilter}"` : ""}
            &nbsp;· Click any card to see full pros &amp; cons
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {filtered.map((design) => (
              <article
                key={design.id}
                id={`design-${design.id}`}
                className="card"
                onClick={() => setSelected(design)}
                style={{ cursor: "pointer", overflow: "hidden" }}
              >
                {/* Photo visual header */}
                <div
                  style={{
                    height: 200,
                    backgroundImage: `url(${designImages[design.id]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    padding: "16px",
                    position: "relative",
                  }}
                >
                  {/* 가독성용 하단 그라데이션 */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)" }} />
                  {/* Palette dots */}
                  <div style={{ display: "flex", gap: 8, position: "relative", zIndex: 1 }}>
                    {design.palette.map((color) => (
                      <div
                        key={color}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: color,
                          border: "2px solid rgba(255,255,255,0.85)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Trending badge */}
                  {design.trending && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                        color: "white",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        padding: "3px 10px",
                        borderRadius: "50px",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      🔥 Trending
                    </div>
                  )}

                  {/* Tag */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      background: design.tagColor,
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "50px",
                    }}
                  >
                    {design.tag}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px 24px 24px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                    <span
                      style={{
                        background: "var(--ocean-50)",
                        color: "var(--ocean-600)",
                        border: "1px solid var(--ocean-100)",
                        borderRadius: "50px",
                        padding: "2px 10px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {design.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--slate-light)" }}>2025</span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", marginBottom: 4, lineHeight: 1.3 }}>{design.name}</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--ocean-500)", fontWeight: 500, marginBottom: 12 }}>
                    {design.subtitle}
                  </p>

                  {/* Quick pros/cons preview */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                    <div
                      style={{
                        flex: 1,
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: 8,
                        padding: "8px 10px",
                      }}
                    >
                      <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>✅ TOP PRO</div>
                      <div style={{ fontSize: "0.78rem", color: "#166534", lineHeight: 1.4 }}>{design.pros[0]}</div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        background: "#fff7ed",
                        border: "1px solid #fed7aa",
                        borderRadius: 8,
                        padding: "8px 10px",
                      }}
                    >
                      <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#c2410c", marginBottom: 4 }}>⚠️ TOP CON</div>
                      <div style={{ fontSize: "0.78rem", color: "#9a3412", lineHeight: 1.4 }}>{design.cons[0]}</div>
                    </div>
                  </div>

                  {/* Cost & difficulty */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--slate-mid)" }}>
                        <span style={{ fontWeight: 700 }}>Cost:</span> {design.cost}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--slate-mid)" }}>
                        <span style={{ fontWeight: 700 }}>Difficulty:</span> {design.difficulty}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ocean-500)" }}>
                      Full Guide →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Detail Modal */}
      {selected && (
        <div
          id="design-modal"
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,35,50,0.88)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              maxWidth: 640,
              width: "100%",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl)",
              margin: "auto",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                backgroundImage: `url(${designImages[selected.id]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 220,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                padding: "28px 32px",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  {selected.palette.map((c) => (
                    <div key={c} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: "2px solid rgba(255,255,255,0.85)", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }} />
                  ))}
                </div>
                <h2 style={{ color: "#fff", fontSize: "1.6rem", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                  {selected.name}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{selected.subtitle}</p>
              </div>
              <div style={{ fontSize: "4rem" }}>{selected.emoji}</div>
              <button
                id="design-modal-close"
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "28px 32px 32px" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ background: "var(--ocean-50)", color: "var(--ocean-600)", border: "1px solid var(--ocean-100)", borderRadius: "50px", padding: "3px 12px", fontSize: "0.75rem", fontWeight: 700 }}>
                  {selected.category}
                </span>
                <span style={{ background: selected.tagColor + "20", color: selected.tagColor, border: `1px solid ${selected.tagColor}40`, borderRadius: "50px", padding: "3px 12px", fontSize: "0.75rem", fontWeight: 700 }}>
                  {selected.tag}
                </span>
                {selected.trending && (
                  <span style={{ background: "#fef3c7", color: "#d97706", border: "1px solid #fde68a", borderRadius: "50px", padding: "3px 12px", fontSize: "0.75rem", fontWeight: 700 }}>
                    🔥 Trending 2025
                  </span>
                )}
              </div>

              <p style={{ color: "var(--slate-mid)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 24 }}>
                {selected.description}
              </p>

              {/* Pros & Cons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--radius-md)", padding: 20 }}>
                  <h4 style={{ color: "#166534", fontSize: "0.9rem", marginBottom: 12 }}>✅ Pros</h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {selected.pros.map((p) => (
                      <li key={p} style={{ display: "flex", gap: 8, fontSize: "0.85rem", color: "#166534" }}>
                        <span style={{ fontWeight: 700, marginTop: 1 }}>+</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "var(--radius-md)", padding: 20 }}>
                  <h4 style={{ color: "#9a3412", fontSize: "0.9rem", marginBottom: 12 }}>⚠️ Cons</h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {selected.cons.map((c) => (
                      <li key={c} style={{ display: "flex", gap: 8, fontSize: "0.85rem", color: "#9a3412" }}>
                        <span style={{ fontWeight: 700, marginTop: 1 }}>−</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Summary row */}
              <div
                style={{
                  background: "var(--sand-50)",
                  border: "1px solid var(--sand-200)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px 20px",
                  display: "flex",
                  gap: 24,
                  flexWrap: "wrap",
                  marginBottom: 24,
                }}
              >
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--slate-light)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>Estimated Cost</div>
                  <div style={{ fontWeight: 800, color: "var(--ocean-600)" }}>{selected.cost}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--slate-light)" }}>{costMap[selected.cost] ?? ""}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--slate-light)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>Difficulty</div>
                  <div style={{ fontWeight: 800, color: "var(--ocean-600)" }}>{selected.difficulty}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--slate-light)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>Best For</div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--slate-dark)" }}>{selected.bestFor}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/quote" className="btn-primary" style={{ fontSize: "0.9rem", padding: "11px 24px" }} id="modal-get-quote">
                  🔧 Get a Quote for This Style
                </Link>
                <button onClick={() => setSelected(null)} className="btn-secondary" style={{ fontSize: "0.9rem", padding: "11px 22px" }}>
                  ← Back to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-400))",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12 }}>
            Found a Style You Love?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Get a free quote from a licensed QLD tradie who can make it a reality — from Gold Coast to Sunshine Coast.
          </p>
          <Link href="/quote" className="btn-gold" id="gallery-cta">
            🔧 Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}

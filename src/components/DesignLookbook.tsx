"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LookbookItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  swatches: { name: string; hex: string }[];
  materials: string[];
  compliance: {
    standards: string[];
    licenseClass: string;
  };
}

const LOOKBOOK_DATA: LookbookItem[] = [
  {
    id: "burleigh",
    name: "Burleigh Organic Modern",
    subtitle: "Tactile timber, raw linens, and warm sand tones.",
    description: "Inspired by the laid-back, organic feel of Burleigh Heads, this look combines natural oak grain, fluted glass, and sand-textured porcelain to create a tranquil sanctuary.",
    image: "/images/coastal_living_room.png",
    swatches: [
      { name: "Sand Dune", hex: "#e6dfd3" },
      { name: "Warm Oak", hex: "#b2a490" },
      { name: "Coast Cream", hex: "#faf8f4" },
      { name: "Aged Brass", hex: "#bfa26b" },
    ],
    materials: [
      "Osmo-sealed select Tasmanian Oak timber vanities",
      "10mm toughened safety fluted glass shower screens",
      "Satin brushed brass mixers and handrails",
      "Matte textured clay handmade subway wall tiles",
    ],
    compliance: {
      standards: ["AS 3740 Waterproofing", "AS 1288 Toughened Safety Glass"],
      licenseClass: "QBCC Carpentry, Joinery or Wall & Floor Tiling",
    },
  },
  {
    id: "noosa",
    name: "Noosa Resort Minimalist",
    subtitle: "Monolithic limestone, eucalyptus sage, and clean lines.",
    description: "Designed for premium indoor-outdoor flow. Incorporates matte eucalyptus green tones with limestone-look benchtops and minimal frameless profiles to feel like a boutique spa.",
    image: "/images/luxury_kitchen.png",
    swatches: [
      { name: "Eucalyptus", hex: "#cbd6c2" },
      { name: "Limestone", hex: "#e5dec9" },
      { name: "Deep Forest", hex: "#333d39" },
      { name: "Brushed Nickel", hex: "#a8afb2" },
    ],
    materials: [
      "Mitred waterfall-edge engineered limestone benchtops",
      "Matte sage green moisture-resistant polyurethane cabinet panels",
      "Low-lead brushed nickel tapware and hardware",
      "600x600 slip-resistant micro-terrazzo floor tiling",
    ],
    compliance: {
      standards: ["AS 3740 Wet Area Membrane", "Form 15 Structural Framing"],
      licenseClass: "QBCC Joinery, Tiling or Builder Low Rise",
    },
  },
  {
    id: "paddington",
    name: "Paddington Heritage Modern",
    subtitle: "Classic slate, carrara marble, and charcoal steel.",
    description: "A nod to Brisbane's traditional cottages. Rich dark metal steel accents combined with classic white Carrara marble and vertical ribbed cabinetry profiles.",
    image: "/images/master_bedroom.png",
    swatches: [
      { name: "Carrara White", hex: "#ffffff" },
      { name: "Paddington Slate", hex: "#1a2d33" },
      { name: "Steel Charcoal", hex: "#3d3d3d" },
      { name: "Classic Gold", hex: "#d4af37" },
    ],
    materials: [
      "Bespoke Italian Carrara marble vanity tops",
      "Ribbed shiplap profiling cabinetry with moisture-resistant MDF casing",
      "Electroplated gunmetal grey or gold fixtures",
      "Chevron-patterned porcelain marble tile floors",
    ],
    compliance: {
      standards: ["AS/NZS 2208 Glazing certification", "BCA Waterproofing System Class 3"],
      licenseClass: "QBCC Builder Low Rise or Glazing & Tiling",
    },
  },
];

export default function DesignLookbook() {
  const [activeTab, setActiveTab] = useState<string>("burleigh");

  const activeData = LOOKBOOK_DATA.find((item) => item.id === activeTab) || LOOKBOOK_DATA[0];

  return (
    <div
      style={{
        background: "white",
        border: "1px solid var(--sand-200)",
        borderRadius: "28px",
        padding: "36px",
        boxShadow: "var(--shadow-sm)",
        color: "var(--slate-dark)",
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--slate-dark)", marginBottom: "10px" }}>
          Queensland Design Edit & Lookbook
        </h3>
        <p style={{ fontSize: "0.95rem", color: "var(--slate-light)", maxWidth: "560px", margin: "0 auto" }}>
          Choose a design direction curated for Queensland climate and building compliance. Click a theme below to view details.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "40px",
          borderBottom: "1px solid var(--sand-200)",
          paddingBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        {LOOKBOOK_DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: activeTab === item.id ? "var(--ocean-50)" : "transparent",
              border: activeTab === item.id ? "1px solid var(--ocean-200)" : "1px solid transparent",
              color: activeTab === item.id ? "var(--ocean-600)" : "var(--slate-light)",
              padding: "10px 24px",
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {item.name.split(" ")[0]} Style
          </button>
        ))}
      </div>

      {/* Content Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }} className="lookbook-grid">
        
        {/* Left: Swatches, Materials and Compliance */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "var(--gold)",
                letterSpacing: "0.06em",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Style Profile
            </span>
            <h4 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px" }}>
              {activeData.name}
            </h4>
            <p style={{ fontSize: "0.9rem", color: "var(--slate-mid)", fontStyle: "italic", marginBottom: "16px", lineHeight: 1.5 }}>
              &ldquo;{activeData.subtitle}&rdquo;
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--slate-light)", lineHeight: 1.6, marginBottom: "28px" }}>
              {activeData.description}
            </p>

            {/* Color Swatches */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", color: "var(--slate-mid)", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Mood Color Palette
              </label>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {activeData.swatches.map((swatch) => (
                  <div key={swatch.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: swatch.hex,
                        border: "1px solid var(--sand-200)",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
                      }}
                    />
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--slate-dark)" }}>{swatch.name}</div>
                      <div style={{ fontSize: "0.6rem", color: "var(--slate-light)" }}>{swatch.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Materials */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", color: "var(--slate-mid)", letterSpacing: "0.05em", marginBottom: "10px" }}>
                Curated Trade Materials
              </label>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {activeData.materials.map((m) => (
                  <li key={m} style={{ fontSize: "0.82rem", color: "var(--slate-mid)", lineHeight: 1.5 }}>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compliance Card */}
          <div
            style={{
              background: "var(--off-white)",
              border: "1px solid var(--sand-200)",
              borderRadius: "16px",
              padding: "16px 20px",
              marginTop: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "1rem" }}>📋</span>
              <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--slate-dark)", letterSpacing: "0.04em" }}>
                QLD Compliance & Licensing
              </strong>
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--slate-light)", lineHeight: 1.4 }}>
              <strong>BCA Standards:</strong> {activeData.compliance.standards.join(", ")}
              <br />
              <strong style={{ display: "inline-block", marginTop: "4px" }}>Required Trades:</strong> {activeData.compliance.licenseClass}
            </div>
          </div>
        </div>

        {/* Right: Visual Image Curation & Plan CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              position: "relative",
              height: "360px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid var(--sand-200)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Image
              src={activeData.image}
              alt={activeData.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>

          <Link href={`/quote?style=${activeData.id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #0e4440, #1f7a72)",
                color: "white",
                padding: "20px 24px",
                borderRadius: "16px",
                textAlign: "center",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(31,122,114,0.2)",
                transition: "var(--transition)",
              }}
              className="lookbook-cta"
            >
              ✨ Apply {activeData.name.split(" ")[0]} Style to My AI Brief
            </div>
          </Link>
        </div>

      </div>

      <style>{`
        .lookbook-cta:hover { transform: translateY(-2px); opacity: 0.95; box-shadow: 0 12px 30px rgba(31,122,114,0.3); }
        @media (max-width: 760px) {
          .lookbook-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}

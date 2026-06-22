"use client";

import React from "react";

const PARTNERS = [
  {
    name: "Reece Plumbing",
    logo: (
      <svg width="120" height="30" viewBox="0 0 120 30" fill="currentColor">
        <path d="M10,25 C12,25 15,22 15,18 C15,13 10,7 10,7 C10,7 5,13 5,18 C5,22 8,25 10,25 Z" fill="var(--ocean-600)" />
        <text x="24" y="21" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.05em">REECE</text>
      </svg>
    ),
  },
  {
    name: "Beaumont Tiles",
    logo: (
      <svg width="150" height="30" viewBox="0 0 150 30" fill="currentColor">
        <rect x="5" y="6" width="7" height="7" rx="1" fill="var(--gold)" />
        <rect x="14" y="6" width="7" height="7" rx="1" fill="var(--gold-light)" />
        <rect x="5" y="15" width="7" height="7" rx="1" fill="var(--gold-light)" />
        <rect x="14" y="15" width="7" height="7" rx="1" fill="var(--gold)" />
        <text x="28" y="21" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.05em">BEAUMONT TILES</text>
      </svg>
    ),
  },
  {
    name: "Laminex",
    logo: (
      <svg width="120" height="30" viewBox="0 0 120 30" fill="currentColor">
        <path d="M5,7 L18,7 L14,21 L5,21 Z" fill="var(--ocean-700)" />
        <text x="24" y="21" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.08em">LAMINEX</text>
      </svg>
    ),
  },
  {
    name: "Colorbond",
    logo: (
      <svg width="130" height="30" viewBox="0 0 130 30" fill="currentColor">
        <path d="M5,10 Q10,5 15,10 T25,10" stroke="var(--gold)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M5,17 Q10,12 15,17 T25,17" stroke="var(--gold-light)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="32" y="21" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.05em">COLORBOND</text>
      </svg>
    ),
  },
  {
    name: "Osmo",
    logo: (
      <svg width="100" height="30" viewBox="0 0 100 30" fill="currentColor">
        <circle cx="12" cy="15" r="7" stroke="var(--ocean-500)" strokeWidth="3.5" fill="none" />
        <text x="26" y="21" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="17" letterSpacing="0.1em">OSMO</text>
      </svg>
    ),
  },
];

export default function PartnershipBanner() {
  // We duplicate the list to ensure seamless transition loop
  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div style={{ background: "var(--sand-50)", borderTop: "1px solid var(--sand-200)", borderBottom: "1px solid var(--sand-200)", padding: "36px 0", overflow: "hidden", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 45px;
          color: var(--slate-light);
          opacity: 0.65;
          transition: all 0.3s ease;
        }
        .marquee-item:hover {
          color: var(--slate-dark);
          opacity: 0.95;
          transform: scale(1.05);
        }
      `}} />
      
      <div className="container-lg" style={{ marginBottom: 16, textAlign: "center" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--slate-light)", opacity: 0.8 }}>
          Official B2B Material Partners
        </span>
      </div>

      <div style={{ display: "flex", overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
        <div className="marquee-track">
          {duplicatedPartners.map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="marquee-item" title={partner.name}>
              {partner.logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

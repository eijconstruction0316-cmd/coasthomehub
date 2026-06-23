"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SUPPLIERS, getAllProducts } from "@/lib/supplierCms";

export default function SupplierHubPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const products = getAllProducts();
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Editorial Header */}
      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", paddingTop: 130, paddingBottom: 64, color: "white", textAlign: "center" }}>
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.05)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>
            ✦ B2B Trade Buyers Club & Curation
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", marginBottom: 14, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Curated Home Materials & Trade Discounts
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.08rem", maxWidth: 680, margin: "0 auto", fontFamily: "Outfit, sans-serif", lineHeight: 1.6 }}>
            Bypass retail markups. Explore building supplies, architectural lighting, and premium fixtures sourced from Australia&apos;s leading national suppliers.
          </p>
        </div>
      </section>

      <div className="container-lg" style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 56 }}>
        {/* Section 1: Partnered Brands Grid */}
        <div>
          <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 16, letterSpacing: "0.06em", fontFamily: "Outfit, sans-serif" }}>
            Partnered National Brands
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {SUPPLIERS.map((s) => (
              <Link
                key={s.slug}
                href={`/suppliers/${s.slug}`}
                style={{
                  background: "white",
                  border: "1px solid var(--sand-300)",
                  borderRadius: 4,
                  padding: 24,
                  textDecoration: "none",
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                className="supplier-card-hover"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ fontSize: "2rem", width: 48, height: 48, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                    {s.logo}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--slate-dark)", margin: 0, fontFamily: "Lora, Georgia, serif" }}>
                      {s.name}
                    </h3>
                    <span style={{ fontSize: "0.68rem", color: "var(--slate-light)" }}>Partner since {s.partnerSince}</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--slate-mid)", lineHeight: 1.5, margin: "0 0 16px", flex: 1, fontFamily: "Outfit, sans-serif" }}>
                  {s.description}
                </p>
                <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: "10px 14px", borderRadius: 2, fontSize: "0.75rem", fontWeight: 800, color: s.color, textAlign: "center", fontFamily: "Outfit, sans-serif" }}>
                  ✦ {s.exclusiveOffer}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2: Product Catalog & Curation */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, borderBottom: "3px double var(--sand-300)", paddingBottom: 16, marginBottom: 28 }}>
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", letterSpacing: "0.06em", fontFamily: "Outfit, sans-serif" }}>
                Curated Recommendations
              </span>
              <h2 style={{ fontSize: "1.6rem", color: "var(--slate-dark)", fontWeight: 500, fontFamily: "Lora, Georgia, serif", margin: "6px 0 0" }}>
                Vetted Building Materials & Finishes
              </h2>
            </div>
            {/* Category Filter Pills */}
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 20,
                    border: activeCategory === cat ? "1px solid var(--ocean-700)" : "1px solid var(--sand-300)",
                    background: activeCategory === cat ? "var(--ocean-700)" : "white",
                    color: activeCategory === cat ? "white" : "var(--slate-mid)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {filteredProducts.map((p) => {
              const tradePrice = p.retailPrice * (1 - p.tradeDiscount / 100);
              const savings = p.retailPrice * (p.tradeDiscount / 100);

              return (
                <div
                  key={p.id}
                  style={{
                    background: "white",
                    border: "1px solid var(--sand-300)",
                    borderRadius: 4,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* Image & Ribbon */}
                  <div style={{ position: "relative", height: 200, width: "100%", background: "var(--sand-100)" }}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                    <div style={{ position: "absolute", top: 12, left: 12, background: "var(--ocean-600)", color: "white", padding: "4px 10px", fontSize: "0.68rem", fontWeight: 800, borderRadius: 2, textTransform: "uppercase" }}>
                      {p.category}
                    </div>
                    <div style={{ position: "absolute", top: 12, right: 12, background: "var(--gold)", color: "white", padding: "4px 8px", fontSize: "0.68rem", fontWeight: 800, borderRadius: 2 }}>
                      ★ {p.rating}
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.65rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em" }}>
                      {p.supplierName} &middot; CODE: {p.code}
                    </span>
                    <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.15rem", fontWeight: 600, color: "var(--slate-dark)", margin: "6px 0 12px", lineHeight: 1.35, minHeight: 46 }}>
                      {p.title}
                    </h3>
                    
                    {/* Price block */}
                    <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-250)", padding: 14, borderRadius: 2, marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--slate-light)" }}>
                        <span>Retail Price:</span>
                        <span style={{ textDecoration: "line-through" }}>${p.retailPrice.toFixed(2)} AUD</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", fontWeight: 800, marginTop: 4 }}>
                        <span style={{ color: "var(--slate-dark)" }}>Trade Club Price:</span>
                        <span style={{ color: "var(--ocean-700)" }}>${tradePrice.toFixed(2)} AUD</span>
                      </div>
                      <div style={{ textAlign: "right", fontSize: "0.68rem", color: "var(--gold)", fontWeight: 800, marginTop: 4 }}>
                        ✦ You save ${savings.toFixed(2)} ({p.tradeDiscount}%)
                      </div>
                    </div>

                    {/* Specifications */}
                    <div style={{ marginBottom: 20 }}>
                      <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--slate-light)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                        Key Specifications
                      </span>
                      <ul style={{ margin: 0, paddingLeft: 14, fontSize: "0.78rem", color: "var(--slate-mid)", display: "flex", flexDirection: "column", gap: 4 }}>
                        {p.specs.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <p style={{ fontSize: "0.8rem", color: "var(--slate-mid)", fontStyle: "italic", background: "#f8f5ee", borderLeft: "3px solid var(--gold)", padding: "10px 12px", borderRadius: "0 2px 2px 0", margin: "0 0 24px", lineHeight: 1.5 }}>
                      &ldquo;{p.recommendation}&rdquo;
                    </p>

                    {/* Affiliate Links */}
                    <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Link
                        href={`/suppliers/${p.supplierSlug}`}
                        style={{
                          border: "1px solid var(--sand-300)",
                          borderRadius: 2,
                          background: "white",
                          color: "var(--slate-dark)",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          padding: "12px",
                          textAlign: "center",
                          textDecoration: "none",
                        }}
                      >
                        Brand Details
                      </Link>
                      <a
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "var(--ocean-700)",
                          borderRadius: 2,
                          color: "white",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          padding: "12px",
                          textAlign: "center",
                          textDecoration: "none",
                        }}
                      >
                        Buy at {p.supplierName.split(" ")[0]} →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: B2B Call to Action Banner */}
        <div style={{ background: "var(--ocean-700)", border: "1px solid var(--sand-300)", padding: "48px 40px", borderRadius: 4, color: "white", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 12 }}>
            ✦ Are you a licensed QBCC Trade Partner?
          </span>
          <h3 style={{ color: "white", fontSize: "1.7rem", marginBottom: 12, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>
            Unlock High-Volume B2B Supply Pricing
          </h3>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.98rem", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>
            Join our Founding or Elite membership tiers to unlock custom trade integrations, site-delivery coordination, and commissions on your client specs.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/tradies/register" className="btn-gold" style={{ padding: "14px 32px", borderRadius: 2 }}>
              ✦ Register as Trade Partner
            </Link>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: 2, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .supplier-card-hover:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md) !important;
          border-color: var(--ocean-300) !important;
        }
      `}} />
    </div>
  );
}

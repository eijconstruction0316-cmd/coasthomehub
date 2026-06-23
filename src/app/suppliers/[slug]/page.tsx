import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSupplierBySlug, SUPPLIERS } from "@/lib/supplierCms";

type SupplierPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SUPPLIERS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: SupplierPageProps) {
  const { slug } = await params;
  const supplier = getSupplierBySlug(slug);
  if (!supplier) return { title: "Supplier Not Found | CoastHomeHub" };

  return {
    title: `${supplier.name} Trade Curation | CoastHomeHub`,
    description: `Access vetted trade discounts, buying checklists, and curated product recommendations from ${supplier.name} at CoastHomeHub.`,
  };
}

export default async function SupplierBrandPage({ params }: SupplierPageProps) {
  const { slug } = await params;
  const supplier = getSupplierBySlug(slug);

  if (!supplier) {
    notFound();
  }

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Brand Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0a1f1e, #0e4440)",
          borderBottom: "3px double var(--sand-300)",
          paddingTop: 130,
          paddingBottom: 64,
          color: "white",
        }}
      >
        <div className="container-lg">
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>&gt;</span>
            <Link href="/suppliers" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>Suppliers</Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>&gt;</span>
            <span style={{ color: "var(--gold-light)", fontSize: "0.8rem" }}>{supplier.name}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div
              style={{
                fontSize: "3rem",
                width: 80,
                height: 80,
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              {supplier.logo}
            </div>
            <div>
              <h1 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.8rem)", margin: 0, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                {supplier.name}
              </h1>
              <p style={{ color: "var(--gold-light)", margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>
                ✦ {supplier.exclusiveOffer}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-lg" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        {/* Left Side: Product Recommendations */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ background: "white", padding: 32, borderRadius: 4, border: "1px solid var(--sand-300)", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--slate-dark)", marginBottom: 8, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>
              Curated Trade Recommendation Catalog
            </h2>
            <p style={{ color: "var(--slate-mid)", fontSize: "0.9rem", marginBottom: 28, fontFamily: "Outfit, sans-serif" }}>
              These materials comply with Australian Building Standards and have been vetted by licensed QBCC contractors for high durability and straightforward installation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {supplier.products.map((p) => {
                const tradePrice = p.retailPrice * (1 - p.tradeDiscount / 100);
                const savings = p.retailPrice * (p.tradeDiscount / 100);

                return (
                  <div
                    key={p.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "180px 1fr",
                      gap: 24,
                      borderBottom: "1px solid var(--sand-200)",
                      paddingBottom: 24,
                    }}
                    className="product-row-wrap"
                  >
                    {/* Image */}
                    <div style={{ position: "relative", height: 140, borderRadius: 2, overflow: "hidden", border: "1px solid var(--sand-300)" }}>
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                    </div>

                    {/* Details */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                        <div>
                          <span style={{ fontSize: "0.62rem", color: "var(--slate-light)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.04em" }}>
                            {p.category} &middot; CODE: {p.code}
                          </span>
                          <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.08rem", fontWeight: 600, color: "var(--slate-dark)", margin: "4px 0 8px" }}>
                            {p.title}
                          </h3>
                        </div>
                        <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", padding: "4px 10px", borderRadius: 2, fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-700)" }}>
                          ★ {p.rating}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 24, margin: "8px 0 16px", flexWrap: "wrap", alignItems: "center" }}>
                        <div style={{ fontSize: "0.82rem", color: "var(--slate-light)" }}>
                          Retail: <span style={{ textDecoration: "line-through" }}>${p.retailPrice.toFixed(2)}</span>
                        </div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--ocean-700)" }}>
                          Trade: ${tradePrice.toFixed(2)} AUD
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 800 }}>
                          ✦ Save ${savings.toFixed(2)} ({p.tradeDiscount}% Off)
                        </div>
                      </div>

                      <p style={{ fontSize: "0.8rem", color: "var(--slate-mid)", fontStyle: "italic", background: "#f8f5ee", borderLeft: "3px solid var(--gold)", padding: "8px 12px", margin: "0 0 16px", lineHeight: 1.5 }}>
                        &ldquo;{p.recommendation}&rdquo;
                      </p>

                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <a
                          href={p.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "var(--ocean-700)",
                            color: "white",
                            padding: "8px 20px",
                            borderRadius: 2,
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          Buy Item at {supplier.name.split(" ")[0]} →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Supplier details card */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.98rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 10, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
              About Partner
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--slate-mid)", lineHeight: 1.6, margin: "0 0 16px", fontFamily: "Outfit, sans-serif" }}>
              {supplier.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.75rem", borderTop: "1px solid var(--sand-200)", paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>Partnership:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>Active Status</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--slate-light)" }}>B2B Courier Support:</span>
                <span style={{ fontWeight: 700, color: "var(--slate-dark)" }}>Yes (QLD Metro)</span>
              </div>
            </div>
          </div>

          {/* How to use discount card */}
          <div style={{ background: "var(--ocean-700)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, color: "white" }}>
            <h3 style={{ color: "white", fontSize: "0.95rem", fontWeight: 800, marginBottom: 12, fontFamily: "Lora, Georgia, serif" }}>
              ✦ How to Apply Trade Code
            </h3>
            <ol style={{ paddingLeft: 16, margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", display: "flex", flexDirection: "column", gap: 10, lineHeight: 1.5, fontFamily: "Outfit, sans-serif" }}>
              <li>Browse your preferred materials and add them to your cart.</li>
              <li>When checking out, enter the exclusive member code in the promotional coupon field.</li>
              <li>Or, link your trade account via the supplier portal in your contractor dashboard.</li>
            </ol>
            <div
              style={{
                marginTop: 20,
                background: "rgba(255,255,255,0.06)",
                border: "1px dashed rgba(255,255,255,0.2)",
                padding: "10px 14px",
                borderRadius: 2,
                fontSize: "0.78rem",
                textAlign: "center",
                fontFamily: "Courier, monospace",
              }}
            >
              MEMBERSHIP CODE: CHH-TRADE-2026
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 820px) {
          .product-row-wrap {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MagazineArticleCard from "@/components/MagazineArticleCard";
import { getArticlesByCollection, getArticlesByType } from "@/lib/magazineCms";
import { buildBreadcrumbSchema } from "@/lib/seoSchemas";

export const metadata: Metadata = {
  title: "Inspiration | CoastHomeHub",
  description:
    "Queensland renovation inspiration, style guides, palettes, material ideas and design direction for bathrooms, kitchens and outdoor spaces.",
  alternates: { canonical: "https://coasthomehub.com.au/inspiration" },
};

export default function InspirationPage() {
  const articles = getArticlesByCollection("inspiration");
  const styleGuides = getArticlesByType("Style Guide");

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Inspiration", path: "/inspiration" },
        ])}
      />

      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", padding: "136px 0 64px" }}>
        <div className="container-lg">
          <div style={{ maxWidth: 720 }}>
            <div className="badge" style={{ marginBottom: 18, background: "rgba(255,255,255,0.05)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>Inspiration</div>
            <h1 style={{ fontSize: "clamp(2.1rem,5vw,3.3rem)", lineHeight: 1.1, marginBottom: 16, color: "white", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
              Style guides for Queensland renovation decisions
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.75, fontFamily: "Outfit, sans-serif" }}>
              The old gallery is now an editorial inspiration library: style guides with palettes, material logic, cost levels and practical planning notes.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "white", padding: "52px 0 30px" }}>
        <div className="container-lg">
          <h2 className="editorial-heading-serif" style={{ fontSize: "1.6rem", marginBottom: 22, fontWeight: 500 }}>Featured style guides</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 24 }}>
            {styleGuides.map((article) => (
              <MagazineArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--off-white)", padding: "46px 0 88px" }}>
        <div className="container-lg">
          <h2 className="editorial-heading-serif" style={{ fontSize: "1.45rem", marginBottom: 22, fontWeight: 500 }}>All inspiration</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {articles.map((article) => (
              <MagazineArticleCard key={article.slug} article={article} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

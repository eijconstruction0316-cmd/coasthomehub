import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import MagazineArticleCard from "@/components/MagazineArticleCard";
import {
  contentTypeRegistry,
  getFeaturedMagazineArticles,
  getPublishedMagazineArticles,
  type MagazineContentType,
} from "@/lib/magazineCms";
import { buildBreadcrumbSchema } from "@/lib/seoSchemas";

export const metadata: Metadata = {
  title: "Magazine | CoastHomeHub",
  description:
    "High-end Queensland renovation journals, project stories, cost guides and expert trade interviews in South East Queensland.",
  alternates: { canonical: "https://coasthomehub.com.au/magazine" },
};

const contentTypes = Object.keys(contentTypeRegistry) as MagazineContentType[];

export default function MagazinePage() {
  const articles = getPublishedMagazineArticles();
  const featured = getFeaturedMagazineArticles();
  
  // Cover Story: The absolute latest featured article
  const coverStory = featured[0] ?? articles[0];
  
  // Editor's Picks: Next 3 articles for the right-side layout
  const editorsPicks = articles.filter(a => a.slug !== coverStory?.slug).slice(0, 3);
  
  // Catalog: The rest of the articles in the asymmetric grid
  const catalogArticles = articles.filter(a => a.slug !== coverStory?.slug && !editorsPicks.some(ep => ep.slug === a.slug));

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Magazine", path: "/magazine" },
        ])}
      />

      {/* Masthead Banner */}
      <section style={{ background: "var(--off-white)", borderBottom: "1px solid var(--sand-200)", paddingTop: 110 }}>
        <div className="container-lg" style={{ padding: "40px 24px" }}>
          
          {/* Print Style Header */}
          <div style={{ textAlign: "center", borderBottom: "2px double var(--sand-300)", paddingBottom: 24, marginBottom: 32 }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.22em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
              Gold Coast · Brisbane · Sunshine Coast
            </span>
            <h1 style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(2.5rem, 7vw, 4.8rem)",
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              lineHeight: 1.0,
              color: "var(--ocean-700)",
              margin: "0 0 12px 0"
            }}>
              C O A S T  L I V I N G
            </h1>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--slate-light)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 10px" }}>
              <span>2026 EDITION // ISSUE NO. 12</span>
              <span>Queensland&apos;s Renovation Journal</span>
              <span>Vetted QBCC Verified Publication</span>
            </div>
          </div>

          {/* Split-Grid Cover Hero */}
          {coverStory && (
            <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 40, alignItems: "start" }} className="cover-grid">
              
              {/* Left Column: Massive Cover Story Image & Text */}
              <Link href={`/magazine/${coverStory.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }} className="cover-left-hover">
                <div style={{
                  position: "relative",
                  height: "min(40vw, 440px)",
                  minHeight: 280,
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 20,
                  border: "1px solid var(--sand-200)",
                  boxShadow: "var(--shadow-md)"
                }}>
                  <Image
                    src={coverStory.heroImage}
                    alt={coverStory.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: "cover" }}
                    priority
                    unoptimized
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.15), transparent)" }} />
                </div>
                <div style={{ padding: "0 10px" }}>
                  <span style={{ color: "var(--gold)", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                    ★ Cover Story · {coverStory.category} · {coverStory.readTime}
                  </span>
                  <h2 style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "clamp(1.6rem, 3.5vw, 2.35rem)",
                    lineHeight: 1.15,
                    color: "var(--slate-dark)",
                    marginBottom: 12,
                    fontWeight: 500
                  }} className="editorial-heading-serif">
                    {coverStory.title}
                  </h2>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.98rem", lineHeight: 1.65, margin: 0 }}>
                    {coverStory.excerpt}
                  </p>
                </div>
              </Link>

              {/* Right Column: Editor's Picks (Visual Text Spread) */}
              <div style={{ borderLeft: "1px solid var(--sand-200)", paddingLeft: 32 }} className="cover-right-panel">
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  color: "var(--ocean-600)",
                  marginBottom: 20,
                  borderBottom: "1px solid var(--sand-200)",
                  paddingBottom: 8
                }}>
                  Latest Features
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {editorsPicks.map((pick, pIdx) => (
                    <Link href={`/magazine/${pick.slug}`} key={pick.slug} style={{ textDecoration: "none", color: "inherit", display: "block" }} className="pick-hover">
                      <span style={{ fontSize: "0.72rem", color: "var(--slate-light)", letterSpacing: "0.04em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                        {pick.type} · {pick.category}
                      </span>
                      <h4 style={{
                        fontFamily: "'Lora', Georgia, serif",
                        fontSize: "1.15rem",
                        lineHeight: 1.3,
                        fontWeight: 600,
                        color: "var(--slate-dark)",
                        marginBottom: 6
                      }} className="editorial-title-hover">
                        {pick.title}
                      </h4>
                      <p style={{ color: "var(--slate-light)", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
                        {pick.excerpt}
                      </p>
                      {pIdx < editorsPicks.length - 1 && (
                        <div style={{ height: 1, background: "var(--sand-200)", marginTop: 20 }} />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Editorial Category Tags */}
      <section style={{ background: "white", padding: "32px 0", borderBottom: "1px solid var(--sand-200)" }}>
        <div className="container-lg">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            <span style={{ background: "var(--ocean-50)", color: "var(--ocean-600)", border: "1px solid var(--ocean-200)", padding: "8px 18px", borderRadius: 50, fontSize: "0.82rem", fontWeight: 700 }}>
              All Publications
            </span>
            {contentTypes.map((type) => (
              <span key={type} style={{ background: "var(--sand-50)", color: "var(--slate-mid)", border: "1px solid var(--sand-200)", padding: "8px 18px", borderRadius: 50, fontSize: "0.82rem", fontWeight: 500 }}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetric Catalog Listing Grid */}
      <section style={{ background: "var(--off-white)", padding: "64px 0 96px" }}>
        <div className="container-lg">
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 800,
            color: "var(--slate-light)",
            marginBottom: 32,
            textAlign: "center"
          }}>
            Explore the Journal Archive
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }} className="asymmetric-grid">
            {catalogArticles.map((article, index) => {
              // We alternate layout cards dynamically to create an asymmetric print layout
              const isLargeCard = index % 5 === 0;
              
              // Interspersed Quote card to break up rigid rows
              if (index === 2) {
                return (
                  <div key="interspersed-quote" style={{
                    background: "linear-gradient(135deg, var(--ocean-700) 0%, var(--ocean-600) 100%)",
                    borderRadius: varRadiusLarge(),
                    padding: "36px 32px",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px solid var(--ocean-800)",
                    boxShadow: "var(--shadow-sm)",
                    minHeight: 280
                  }}>
                    <div style={{ fontSize: "2.4rem", color: "var(--gold-light)", lineHeight: 1 }}>“</div>
                    <p style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "1.15rem",
                      lineHeight: 1.65,
                      color: "white",
                      margin: "0 0 20px 0"
                    }}>
                      Waterproofing is the single most critical structural step in QLD renovations. Rushing AS 3740 compliance will always nullify your home warranty protection.
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem" }}>
                      <span style={{ color: "var(--gold-light)", fontWeight: 700 }}>👷 VERIFIED BUILDER INSPECTION</span>
                      <span style={{ color: "rgba(255,255,255,0.6)" }}>QBCC-1102941</span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={article.slug} style={{ gridColumn: isLargeCard ? "span 1" : "auto" }} className="catalog-card-wrap">
                  <MagazineArticleCard article={article} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .cover-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .cover-right-panel {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
        .cover-left-hover:hover h2 {
          color: var(--ocean-600) !important;
        }
        .pick-hover:hover h4 {
          color: var(--ocean-600) !important;
        }
      `}} />
    </>
  );
}

function varRadiusLarge() {
  return "20px";
}

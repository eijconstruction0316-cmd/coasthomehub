import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MagazineArticleCard from "@/components/MagazineArticleCard";
import PartnershipBanner from "@/components/PartnershipBanner";
import {
  getArticleBySlug,
  getPublishedMagazineArticles,
  getRelatedArticles,
} from "@/lib/magazineCms";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/seoSchemas";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const LOCAL_CONTRACTORS = [
  {
    id: "t-1",
    name: "EIJ Construction Pty Ltd",
    qbcc: "QBCC-1279144 (Active Builder)",
    category: "Bathroom & Kitchen Renovation",
    rating: 4.9,
    reviewsCount: 128,
    location: "Gold Coast & South Brisbane",
    b2bBenefit: "✦ Elite Sponsor: 10% Off Reece & Laminex",
    tags: ["bathroom", "kitchen", "waterproofing", "renovation", "marble", "stone", "cabinetry", "structural", "style guide"]
  },
  {
    id: "t-2",
    name: "Noosa Coastal Carpentry & Decks",
    qbcc: "QBCC-1530291 (Active Carpentry)",
    category: "Decking & General Build",
    rating: 4.85,
    reviewsCount: 64,
    location: "Sunshine Coast & Noosa",
    b2bBenefit: "✦ Partner: 5% Off Colorbond & Osmo",
    tags: ["outdoor", "decking", "hardwood", "composite", "pool", "landscaping"]
  },
  {
    id: "t-3",
    name: "Paddington Tiling & Waterproofing",
    qbcc: "QBCC-1102941 (Active Tiling)",
    category: "Bathroom & Tiling",
    rating: 4.95,
    reviewsCount: 92,
    location: "Brisbane CBD & West Brisbane",
    b2bBenefit: "✦ Partner: 5% Off Beaumont Tiles",
    tags: ["bathroom", "waterproofing", "as 3740", "microcement", "tiling", "stone"]
  },
  {
    id: "t-4",
    name: "Gold Coast Balustrades & Glass",
    qbcc: "QBCC-1309482 (Active Glazing)",
    category: "Pool Fencing & Glass Shower Screens",
    rating: 4.7,
    reviewsCount: 45,
    location: "Gold Coast & Tweed Heads",
    b2bBenefit: "✦ Safety Glass compliant with AS 1288",
    tags: ["glass", "fluted glass", "pool", "landscaping", "bathroom", "shower screen"]
  }
];

function getMatchedContractors(articleTags: string[], category: string) {
  const normalizedTags = [...articleTags.map(t => t.toLowerCase()), category.toLowerCase()];
  
  const matches = LOCAL_CONTRACTORS.filter(c => {
    return c.tags.some(t => normalizedTags.includes(t));
  });

  if (matches.length === 0) {
    return [LOCAL_CONTRACTORS[0]]; // fallback to premium sponsor
  }
  return matches;
}

export function generateStaticParams() {
  return getPublishedMagazineArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found | CoastHomeHub" };

  return {
    title: { absolute: article.seo.title },
    description: article.seo.description,
    alternates: {
      canonical: `https://coasthomehub.com.au/magazine/${article.slug}`,
    },
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      url: `https://coasthomehub.com.au/magazine/${article.slug}`,
      type: "article",
      images: [article.heroImage],
    },
  };
}

export default async function MagazineArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Magazine", path: "/magazine" },
    { name: article.title, path: `/magazine/${article.slug}` },
  ];
  const related = getRelatedArticles(article);
  const matchedTrades = getMatchedContractors(article.tags, article.category);

  return (
    <>
      <JsonLd data={buildArticleSchema(article)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      {article.faq.length > 0 && <JsonLd data={buildFaqSchema(article.faq)} />}

      <article style={{ background: "var(--off-white)", minHeight: "100vh" }}>
        {/* Dynamic Editorial Hero section */}
        <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", padding: "124px 0 54px" }}>
          <div className="container-lg">
            <div style={{ display: "flex", gap: 8, color: "rgba(255,255,255,0.64)", fontSize: "0.82rem", marginBottom: 22, flexWrap: "wrap", fontFamily: "Outfit, sans-serif" }}>
              <Link href="/magazine" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 700 }}>Magazine</Link>
              <span>/</span>
              <span>{article.type}</span>
            </div>
            <div className="badge" style={{ background: "rgba(255,255,255,0.06)", borderColor: "var(--sand-300)", color: "#e8b84b", marginBottom: 16, borderRadius: 2 }}>
              {article.type}
            </div>
            <h1 style={{ color: "white", fontSize: "clamp(2rem,5vw,3.35rem)", lineHeight: 1.08, marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
              {article.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: 20, fontFamily: "Outfit, sans-serif" }}>
              {article.subtitle}
            </p>
            <p style={{ color: "rgba(255,255,255,0.58)", fontSize: "0.88rem", fontFamily: "Outfit, sans-serif" }}>
              {article.author} · {article.readTime} · Updated {new Date(article.updatedAt).toLocaleDateString("en-AU")}
            </p>
          </div>
        </section>

        {/* 2-Column Responsive Layout */}
        <div className="container-lg editorial-main-wrap" style={{ padding: "40px 24px 84px" }}>
          <div className="editorial-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
            
            {/* Left Column: Image and Main Article Content */}
            <div>
              {/* Asymmetric Multi-Angle Lookbook Gallery */}
              {article.lookbook ? (
                <div style={{ marginBottom: 36 }}>
                  <span style={{
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    color: "var(--gold)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 12,
                    fontFamily: "Outfit, sans-serif"
                  }}>
                    ✦ Design Portfolio // Multi-Angle Perspectives
                  </span>
                  
                  <div className="lookbook-asymmetric-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.8fr",
                    gap: 16,
                    alignItems: "stretch"
                  }}>
                    {/* Main Wide Angle Shot */}
                    <div style={{
                      position: "relative",
                      borderRadius: 4,
                      overflow: "hidden",
                      border: "1px solid var(--sand-300)",
                      boxShadow: "var(--shadow-md)",
                      height: 380,
                      cursor: "zoom-in"
                    }} className="lookbook-frame">
                      <Image
                        src={article.lookbook.wideAngle}
                        alt="Wide Angle Perspective"
                        fill
                        style={{ objectFit: "cover" }}
                        className="editorial-card-img"
                        unoptimized
                      />
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        padding: "16px 20px",
                        color: "white"
                      }}>
                        <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 2, fontFamily: "Outfit, sans-serif" }}>
                          Angle 01 // Wide Perspective
                        </span>
                        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.9)", margin: 0, fontFamily: "Outfit, sans-serif" }}>
                          {article.lookbook.captions.wideAngle}
                        </p>
                      </div>
                    </div>

                    {/* Right Stack for Details */}
                    <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 16 }} className="lookbook-side-stack">
                      
                      {/* Detail Shot */}
                      <div style={{
                        position: "relative",
                        borderRadius: 4,
                        overflow: "hidden",
                        border: "1px solid var(--sand-300)",
                        boxShadow: "var(--shadow-sm)",
                        cursor: "zoom-in",
                        height: "100%",
                        minHeight: 180
                      }} className="lookbook-frame">
                        <Image
                          src={article.lookbook.detailShot}
                          alt="Detail Perspective"
                          fill
                          style={{ objectFit: "cover" }}
                          className="editorial-card-img"
                          unoptimized
                        />
                        <div style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                          padding: "10px 14px",
                          color: "white"
                        }}>
                          <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 2, fontFamily: "Outfit, sans-serif" }}>
                            Angle 02 // Close-Up Detail
                          </span>
                          <p style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.9)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "Outfit, sans-serif" }}>
                            {article.lookbook.captions.detailShot}
                          </p>
                        </div>
                      </div>

                      {/* Material Spec / Substrate Shot */}
                      <div style={{
                        position: "relative",
                        borderRadius: 4,
                        overflow: "hidden",
                        border: "1px solid var(--sand-300)",
                        boxShadow: "var(--shadow-sm)",
                        cursor: "zoom-in",
                        height: "100%",
                        minHeight: 180
                      }} className="lookbook-frame">
                        <Image
                          src={article.lookbook.materialSpec}
                          alt="Material Specification"
                          fill
                          style={{ objectFit: "cover" }}
                          className="editorial-card-img"
                          unoptimized
                        />
                        <div style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                          padding: "10px 14px",
                          color: "white"
                        }}>
                          <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 2, fontFamily: "Outfit, sans-serif" }}>
                            Angle 03 // Technical Spec
                          </span>
                          <p style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.9)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "Outfit, sans-serif" }}>
                            {article.lookbook.captions.materialSpec}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ) : (
                /* Fallback Hero Visual Asset */
                <div
                  style={{
                    height: "min(48vw, 460px)",
                    minHeight: 250,
                    backgroundImage: `url(${article.heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 4,
                    border: "1px solid var(--sand-300)",
                    marginBottom: 32,
                    boxShadow: "var(--shadow-lg)",
                  }}
                />
              )}

              {/* YouTube Video Embed if present */}
              {article.video && (
                <div style={{ marginBottom: 32 }} className="magazine-video-container">
                  <span style={{
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    color: "var(--gold)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 12,
                    fontFamily: "Outfit, sans-serif"
                  }}>
                    ✦ Video Tutorial // {article.video.title}
                  </span>
                  <div style={{
                    position: "relative",
                    paddingBottom: "56.25%", /* 16:9 Aspect Ratio */
                    height: 0,
                    overflow: "hidden",
                    borderRadius: 4,
                    border: "1px solid var(--sand-300)",
                    boxShadow: "var(--shadow-md)",
                    background: "#000"
                  }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${article.video.youtubeId}`}
                      title={article.video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Mobile Specs Widget */}
              <div className="mobile-specs-widget" style={{ display: "none", marginBottom: 24 }}>
                {article.projectMeta && (
                  <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "18px 22px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                    <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.85rem" }}><strong>Location:</strong><br />{article.projectMeta.location}</span>
                    <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.85rem" }}><strong>Budget:</strong><br />{article.projectMeta.budgetRange}</span>
                    <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.85rem" }}><strong>Timeline:</strong><br />{article.projectMeta.timeline}</span>
                    <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.85rem" }}><strong>Type:</strong><br />{article.projectMeta.projectType}</span>
                  </div>
                )}
                {article.styleMeta && (
                  <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "18px 22px", marginTop: 12 }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                      {article.styleMeta.palette.map((color) => (
                        <span key={color} style={{ width: 20, height: 20, borderRadius: "50%", background: color, border: "2px solid white", boxShadow: "0 0 0 1px var(--sand-200)" }} />
                      ))}
                    </div>
                    <p style={{ color: "var(--slate-mid)", fontSize: "0.85rem", lineHeight: 1.5, fontFamily: "Outfit, sans-serif" }}>
                      <strong>Style For:</strong> {article.styleMeta.bestFor}<br />
                      <strong>Cost Tier:</strong> {article.styleMeta.costLevel}
                    </p>
                  </div>
                )}
              </div>

              {/* Main Content Body */}
              <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "38px 38px 44px", boxShadow: "var(--shadow-sm)" }}>
                {article.sections.map((section, sIdx) => (
                  <section key={sIdx} style={{ marginBottom: 36 }}>
                    <h2 className="editorial-heading-serif" style={{ fontSize: "1.6rem", marginBottom: 16, borderBottom: "1px solid var(--sand-100)", paddingBottom: 8, fontFamily: "Lora, Georgia, serif", fontWeight: 600 }}>
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((paragraph, pIdx) => {
                      const isFirstParagraph = sIdx === 0 && pIdx === 0;
                      return (
                        <p
                          key={pIdx}
                          className={isFirstParagraph ? "editorial-paragraph editorial-dropcap" : "editorial-paragraph"}
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                    {section.bullets && (
                      <ul style={{ paddingLeft: 22, display: "grid", gap: 8, color: "var(--slate-mid)", lineHeight: 1.65, marginBottom: 16, fontFamily: "Outfit, sans-serif", listStyleType: "square" }}>
                        {section.bullets.map((bullet, bIdx) => <li key={bIdx}>{bullet}</li>)}
                      </ul>
                    )}

                    {/* Rich Quote Render */}
                    {section.quote && (
                      <blockquote style={{
                        margin: "26px 0",
                        padding: "18px 26px",
                        borderLeft: "4px solid var(--gold)",
                        background: "var(--sand-50)",
                        borderRadius: 0
                      }}>
                        <p style={{
                          fontFamily: "'Lora', Georgia, serif",
                          fontStyle: "italic",
                          fontSize: "1.12rem",
                          lineHeight: 1.7,
                          color: "var(--slate-dark)",
                          marginBottom: 8
                        }}>
                          &ldquo;{section.quote}&rdquo;
                        </p>
                        {section.quoteAuthor && (
                          <cite style={{
                            display: "block",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: "var(--slate-light)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            fontStyle: "normal",
                            fontFamily: "Outfit, sans-serif"
                          }}>
                            — {section.quoteAuthor}
                          </cite>
                        )}
                      </blockquote>
                    )}

                    {/* Aside Highlight Box Render */}
                    {section.aside && (
                      <aside style={{
                        margin: "30px 0",
                        background: "var(--sand-50)",
                        border: "1px solid var(--sand-300)",
                        borderRadius: 4,
                        padding: "24px 28px",
                        boxShadow: "var(--shadow-sm)"
                      }}>
                        <h4 style={{
                          fontSize: "1rem",
                          fontWeight: 800,
                          color: "var(--ocean-700)",
                          marginBottom: 10,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "Lora, Georgia, serif"
                        }}>
                          ✦ {section.aside.title}
                        </h4>
                        <p style={{
                          fontSize: "0.92rem",
                          color: "var(--slate-mid)",
                          lineHeight: 1.6,
                          marginBottom: 12,
                          fontFamily: "Outfit, sans-serif"
                        }}>
                          {section.aside.text}
                        </p>
                        {section.aside.list && (
                          <ul style={{
                            paddingLeft: 18,
                            display: "grid",
                            gap: 6,
                            color: "var(--slate-mid)",
                            fontSize: "0.88rem",
                            lineHeight: 1.55,
                            fontFamily: "Outfit, sans-serif",
                            listStyleType: "square"
                          }}>
                            {section.aside.list.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </aside>
                    )}

                    {/* Embedded Section Image */}
                    {section.image && (
                      <div style={{ marginTop: 28, marginBottom: 28 }}>
                        <div style={{ position: "relative", height: "min(38vw, 360px)", minHeight: 200, width: "100%", borderRadius: 4, overflow: "hidden", border: "1px solid var(--sand-300)", boxShadow: "var(--shadow-sm)" }}>
                          <Image
                            src={section.image}
                            alt={section.imageCaption || section.heading}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: "cover" }}
                            unoptimized
                          />
                        </div>
                        {section.imageCaption && (
                          <p style={{ color: "var(--slate-light)", fontSize: "0.8rem", marginTop: 8, fontStyle: "italic", textAlign: "center", fontFamily: "Outfit, sans-serif" }}>
                            {section.imageCaption}
                          </p>
                        )}
                      </div>
                    )}
                  </section>
                ))}

                {/* FAQ Accordion Section */}
                {article.faq.length > 0 && (
                  <section style={{ borderTop: "1px solid var(--sand-300)", paddingTop: 32, marginTop: 24 }}>
                    <h2 style={{ fontSize: "1.45rem", color: "var(--slate-dark)", marginBottom: 18, fontWeight: 600, fontFamily: "Lora, Georgia, serif" }}>
                      Frequently Asked Questions
                    </h2>
                    <div style={{ display: "grid", gap: 16 }}>
                      {article.faq.map((item) => (
                        <div key={item.question} style={{ background: "var(--off-white)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "18px 20px" }}>
                          <h3 style={{ fontSize: "1rem", color: "var(--slate-dark)", marginBottom: 8, fontWeight: 700, fontFamily: "Lora, Georgia, serif" }}>
                            ✦ {item.question}
                          </h3>
                          <p style={{ color: "var(--slate-light)", fontSize: "0.92rem", lineHeight: 1.65, fontFamily: "Outfit, sans-serif" }}>
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Mobile Contractor Spotlights */}
              <div className="mobile-contractors-section" style={{ display: "none", marginTop: 32 }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
                  ✦ Vetted QLD Contractor Matches
                </h3>
                {matchedTrades.map((c) => (
                  <div key={c.id} style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 20, marginBottom: 16, boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", padding: "2px 8px", borderRadius: 2, fontSize: "0.68rem", fontWeight: 800 }}>
                        QBCC ACTIVE
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--slate-light)" }}>{c.qbcc.split(" ")[0]}</span>
                    </div>
                    <h4 style={{ fontSize: "1.02rem", fontWeight: 800, margin: "0 0 4px", fontFamily: "Lora, Georgia, serif" }}>{c.name}</h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", marginBottom: 8, fontFamily: "Outfit, sans-serif" }}>{c.category} · {c.location}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12, fontFamily: "Outfit, sans-serif" }}>
                      <span style={{ color: "#f59e0b" }}>✦</span>
                      <strong style={{ fontSize: "0.82rem" }}>{c.rating}</strong>
                      <span style={{ fontSize: "0.82rem", color: "var(--slate-light)" }}>({c.reviewsCount} reviews)</span>
                    </div>
                    {c.b2bBenefit && (
                      <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 2, padding: "8px 10px", fontSize: "0.76rem", color: "var(--ocean-600)", fontWeight: 700, marginBottom: 12, fontFamily: "Outfit, sans-serif" }}>
                        {c.b2bBenefit}
                      </div>
                    )}
                    <Link href={`/directory/${c.id}`} className="btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none", fontSize: "0.85rem", padding: "12px", borderRadius: 4 }}>
                      View Showroom & Get Quote
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sticky specs & trade matcher */}
            <div className="editorial-sidebar" style={{ position: "sticky", top: 110, display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Spec Card */}
              {(article.projectMeta || article.styleMeta) && (
                <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
                  <h4 style={{ fontSize: "0.8rem", color: "var(--slate-light)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 800, marginBottom: 16, borderBottom: "1px solid var(--sand-100)", paddingBottom: 10, fontFamily: "Outfit, sans-serif" }}>
                    ✦ Design Specifications
                  </h4>

                  {article.projectMeta && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, fontSize: "0.88rem", fontFamily: "Outfit, sans-serif" }}>
                      <div>
                        <span style={{ color: "var(--slate-light)" }}>Location:</span>
                        <p style={{ fontWeight: 700, color: "var(--slate-dark)", marginTop: 2 }}>{article.projectMeta.location}</p>
                      </div>
                      <div>
                        <span style={{ color: "var(--slate-light)" }}>Budget Index:</span>
                        <p style={{ fontWeight: 700, color: "var(--gold)", marginTop: 2 }}>{article.projectMeta.budgetRange}</p>
                      </div>
                      <div>
                        <span style={{ color: "var(--slate-light)" }}>Timeline:</span>
                        <p style={{ fontWeight: 700, color: "var(--slate-dark)", marginTop: 2 }}>{article.projectMeta.timeline}</p>
                      </div>
                    </div>
                  )}

                  {article.styleMeta && (
                    <div style={{ fontSize: "0.88rem", fontFamily: "Outfit, sans-serif" }}>
                      <span style={{ color: "var(--slate-light)", display: "block", marginBottom: 6 }}>Color Palette:</span>
                      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                        {article.styleMeta.palette.map((color) => (
                          <span key={color} style={{ width: 22, height: 22, borderRadius: "50%", background: color, border: "2px solid white", boxShadow: "0 0 0 1px var(--sand-200)" }} />
                        ))}
                      </div>
                      <div style={{ color: "var(--slate-mid)", fontSize: "0.82rem", lineHeight: 1.5 }}>
                        <strong>Best for:</strong> {article.styleMeta.bestFor}<br />
                        <strong style={{ display: "block", marginTop: 4 }}>Cost tier:</strong> {article.styleMeta.costLevel}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Vetted Trades List */}
              <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
                <h4 style={{ fontSize: "0.8rem", color: "var(--slate-light)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 800, marginBottom: 16, borderBottom: "1px solid var(--sand-100)", paddingBottom: 10, fontFamily: "Outfit, sans-serif" }}>
                  ✦ Vetted QLD Contractor Matches
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginBottom: 16, lineHeight: 1.45, fontFamily: "Outfit, sans-serif" }}>
                  Homeowners reading this guide can directly hire our verified QBCC partners specializing in this design style:
                </p>

                {matchedTrades.map((c) => (
                  <div key={c.id} style={{
                    background: "white",
                    border: "1px solid var(--sand-300)",
                    borderRadius: 4,
                    padding: 14,
                    marginBottom: 12,
                    fontSize: "0.82rem"
                  }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                      <span style={{
                        background: "rgba(34,197,94,0.1)",
                        color: "#16a34a",
                        padding: "1px 6px",
                        borderRadius: 2,
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        fontFamily: "Outfit, sans-serif"
                      }}>
                        QBCC ACTIVE
                      </span>
                    </div>
                    <h5 style={{ fontSize: "0.88rem", fontWeight: 800, margin: "0 0 2px", fontFamily: "Lora, Georgia, serif" }}>
                      {c.name}
                    </h5>
                    <p style={{ fontSize: "0.74rem", color: "var(--slate-light)", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                      {c.category.split(" & ")[0]}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 8, fontFamily: "Outfit, sans-serif" }}>
                      <span style={{ color: "#f59e0b", fontSize: "0.76rem" }}>✦</span>
                      <strong>{c.rating}</strong>
                      <span style={{ color: "var(--slate-light)", fontSize: "0.72rem" }}>({c.reviewsCount})</span>
                    </div>
                    {c.b2bBenefit && (
                      <div style={{
                        background: "var(--sand-50)",
                        border: "1px solid var(--sand-300)",
                        borderRadius: 2,
                        padding: "6px 8px",
                        fontSize: "0.72rem",
                        color: "var(--ocean-600)",
                        fontWeight: 700,
                        marginBottom: 8,
                        fontFamily: "Outfit, sans-serif"
                      }}>
                        {c.b2bBenefit}
                      </div>
                    )}
                    <Link href={`/directory/${c.id}`} style={{
                      display: "block",
                      textAlign: "center",
                      background: "var(--ocean-700)",
                      color: "white",
                      border: "none",
                      textDecoration: "none",
                      fontWeight: 800,
                      fontSize: "0.76rem",
                      padding: "8px",
                      borderRadius: 4,
                      transition: "var(--transition)"
                    }} className="btn-hover-effect">
                      View Showroom
                    </Link>
                  </div>
                ))}
              </div>

              {/* B2B Club Advert */}
              <div style={{
                background: "var(--ocean-700)",
                border: "1px solid var(--sand-300)",
                borderRadius: 4,
                padding: 24,
                color: "white",
                boxShadow: "var(--shadow-md)"
              }}>
                <div style={{ fontSize: "1rem", color: "var(--gold-light)", fontWeight: "bold", marginBottom: 10 }}>✦ B2B</div>
                <h4 style={{ color: "white", fontSize: "0.95rem", fontWeight: 800, marginBottom: 6, fontFamily: "Lora, Georgia, serif" }}>
                  B2B wholesale discounts
                </h4>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.45, marginBottom: 14, fontFamily: "Outfit, sans-serif" }}>
                  Connect with any verified partner on CoastHomeHub and get up to 10% off wholesale orders at Reece plumbing, Laminex, and Beaumont Tiles.
                </p>
                <Link href="/directory" style={{
                  display: "inline-block",
                  color: "var(--gold-light)",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  fontFamily: "Outfit, sans-serif"
                }}>
                  Explore Directory →
                </Link>
              </div>

            </div>
          </div>

          {/* Related Reading Grid */}
          {related.length > 0 && (
            <section style={{ marginTop: 56, borderTop: "1px solid var(--sand-300)", paddingTop: 40 }}>
              <h2 style={{ fontSize: "1.55rem", marginBottom: 22, fontWeight: 600, fontFamily: "Lora, Georgia, serif" }}>Related reading</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 24 }}>
                {related.map((item) => <MagazineArticleCard key={item.slug} article={item} compact />)}
              </div>
            </section>
          )}
        </div>

        {/* Material Partners Marquee */}
        <PartnershipBanner />
      </article>

      {/* Styled Responsive Queries */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 990px) {
          .editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .editorial-sidebar {
            display: none !important;
          }
          .mobile-specs-widget {
            display: block !important;
          }
          .mobile-contractors-section {
            display: block !important;
          }
        }
        @media (max-width: 768px) {
          .lookbook-asymmetric-grid {
            grid-template-columns: 1fr !important;
          }
          .lookbook-side-stack {
            grid-template-rows: auto !important;
            gap: 16px !important;
          }
          .lookbook-frame {
            height: 240px !important;
          }
        }
        .btn-hover-effect:hover {
          background: var(--ocean-600) !important;
          color: white !important;
          border-color: var(--ocean-600) !important;
        }
        .lookbook-frame {
          transition: transform 0.4s ease, border-color 0.4s ease;
        }
        .lookbook-frame:hover {
          transform: translateY(-2px);
          border-color: var(--gold) !important;
        }
      `}} />
    </>
  );
}

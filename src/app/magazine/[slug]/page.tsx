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
    b2bBenefit: "🎁 Elite Sponsor: 10% Off Reece & Laminex",
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
    b2bBenefit: "🎁 Partner: 5% Off Colorbond & Osmo",
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
    b2bBenefit: "🎁 Partner: 5% Off Beaumont Tiles",
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
    b2bBenefit: "🎁 Safety Glass compliant with AS 1288",
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
        <section style={{ background: "linear-gradient(160deg,#0a1f1e,#155e58)", padding: "124px 0 54px" }}>
          <div className="container-lg">
            <div style={{ display: "flex", gap: 8, color: "rgba(255,255,255,0.64)", fontSize: "0.82rem", marginBottom: 22, flexWrap: "wrap" }}>
              <Link href="/magazine" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 700 }}>Magazine</Link>
              <span>/</span>
              <span>{article.type}</span>
            </div>
            <div className="badge" style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.2)", color: "#e8b84b", marginBottom: 16 }}>
              {article.type}
            </div>
            <h1 style={{ color: "white", fontSize: "clamp(2rem,5vw,3.35rem)", lineHeight: 1.08, marginBottom: 16 }}>
              {article.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: 20 }}>
              {article.subtitle}
            </p>
            <p style={{ color: "rgba(255,255,255,0.58)", fontSize: "0.88rem" }}>
              {article.author} · {article.readTime} · Updated {new Date(article.updatedAt).toLocaleDateString("en-AU")}
            </p>
          </div>
        </section>

        {/* 2-Column Responsive Layout */}
        <div className="container-lg editorial-main-wrap" style={{ padding: "40px 24px 84px" }}>
          <div className="editorial-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
            
            {/* Left Column: Image and Main Article Content */}
            <div>
              {/* Massive Hero Visual Asset */}
              <div
                style={{
                  height: "min(48vw, 460px)",
                  minHeight: 250,
                  backgroundImage: `url(${article.heroImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 18,
                  marginBottom: 32,
                  boxShadow: "var(--shadow-lg)",
                }}
              />

              {/* Mobile Specs Widget */}
              <div className="mobile-specs-widget" style={{ display: "none", marginBottom: 24 }}>
                {article.projectMeta && (
                  <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "18px 22px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                    <span><strong>Location:</strong><br />{article.projectMeta.location}</span>
                    <span><strong>Budget:</strong><br />{article.projectMeta.budgetRange}</span>
                    <span><strong>Timeline:</strong><br />{article.projectMeta.timeline}</span>
                    <span><strong>Type:</strong><br />{article.projectMeta.projectType}</span>
                  </div>
                )}
                {article.styleMeta && (
                  <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "18px 22px", marginTop: 12 }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                      {article.styleMeta.palette.map((color) => (
                        <span key={color} style={{ width: 20, height: 20, borderRadius: "50%", background: color, border: "2px solid white", boxShadow: "0 0 0 1px var(--sand-200)" }} />
                      ))}
                    </div>
                    <p style={{ color: "var(--slate-mid)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                      <strong>Style For:</strong> {article.styleMeta.bestFor}<br />
                      <strong>Cost Tier:</strong> {article.styleMeta.costLevel}
                    </p>
                  </div>
                )}
              </div>

              {/* Main Content Body */}
              <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 18, padding: "38px 38px 44px", boxShadow: "var(--shadow-sm)" }}>
                {article.sections.map((section, sIdx) => (
                  <section key={sIdx} style={{ marginBottom: 36 }}>
                    <h2 style={{ fontSize: "1.45rem", color: "var(--slate-dark)", marginBottom: 14, fontWeight: 800 }}>
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx} style={{ color: "var(--slate-mid)", fontSize: "1rem", lineHeight: 1.82, marginBottom: 14 }}>
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul style={{ paddingLeft: 22, display: "grid", gap: 8, color: "var(--slate-mid)", lineHeight: 1.65, marginBottom: 16 }}>
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
                        borderRadius: "0 12px 12px 0"
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
                            fontStyle: "normal"
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
                        background: "linear-gradient(135deg, var(--sand-50) 0%, #faf5ec 100%)",
                        border: "1px solid var(--sand-200)",
                        borderRadius: 16,
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
                          gap: 8
                        }}>
                          📋 {section.aside.title}
                        </h4>
                        <p style={{
                          fontSize: "0.92rem",
                          color: "var(--slate-mid)",
                          lineHeight: 1.6,
                          marginBottom: 12
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
                            lineHeight: 1.55
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
                        <div style={{ position: "relative", height: "min(38vw, 360px)", minHeight: 200, width: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid var(--sand-200)", boxShadow: "var(--shadow-sm)" }}>
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
                          <p style={{ color: "var(--slate-light)", fontSize: "0.8rem", marginTop: 8, fontStyle: "italic", textAlign: "center" }}>
                            {section.imageCaption}
                          </p>
                        )}
                      </div>
                    )}
                  </section>
                ))}

                {/* FAQ Accordion Section */}
                {article.faq.length > 0 && (
                  <section style={{ borderTop: "1px solid var(--sand-200)", paddingTop: 32, marginTop: 24 }}>
                    <h2 style={{ fontSize: "1.45rem", color: "var(--slate-dark)", marginBottom: 18, fontWeight: 800 }}>
                      Frequently Asked Questions
                    </h2>
                    <div style={{ display: "grid", gap: 16 }}>
                      {article.faq.map((item) => (
                        <div key={item.question} style={{ background: "var(--off-white)", border: "1px solid var(--sand-200)", borderRadius: 12, padding: "18px 20px" }}>
                          <h3 style={{ fontSize: "1rem", color: "var(--slate-dark)", marginBottom: 8, fontWeight: 700 }}>
                            {item.question}
                          </h3>
                          <p style={{ color: "var(--slate-light)", fontSize: "0.92rem", lineHeight: 1.65 }}>
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
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 16 }}>
                  👷 Vetted QLD Contractor Matches
                </h3>
                {matchedTrades.map((c) => (
                  <div key={c.id} style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", padding: "2px 8px", borderRadius: 50, fontSize: "0.68rem", fontWeight: 800 }}>
                        🛡️ QBCC ACTIVE
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--slate-light)" }}>{c.qbcc.split(" ")[0]}</span>
                    </div>
                    <h4 style={{ fontSize: "1.02rem", fontWeight: 800, margin: "0 0 4px" }}>{c.name}</h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", marginBottom: 8 }}>{c.category} · {c.location}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
                      <span style={{ color: "#f59e0b" }}>★</span>
                      <strong style={{ fontSize: "0.82rem" }}>{c.rating}</strong>
                      <span style={{ fontSize: "0.82rem", color: "var(--slate-light)" }}>({c.reviewsCount} reviews)</span>
                    </div>
                    {c.b2bBenefit && (
                      <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: 8, padding: "8px 10px", fontSize: "0.76rem", color: "var(--ocean-600)", fontWeight: 700, marginBottom: 12 }}>
                        {c.b2bBenefit}
                      </div>
                    )}
                    <Link href={`/directory/${c.id}`} className="btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none", fontSize: "0.85rem", padding: "12px" }}>
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
                <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow-sm)" }}>
                  <h4 style={{ fontSize: "0.8rem", color: "var(--slate-light)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 800, marginBottom: 16, borderBottom: "1px solid var(--sand-100)", paddingBottom: 10 }}>
                    📋 Design Specifications
                  </h4>

                  {article.projectMeta && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, fontSize: "0.88rem" }}>
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
                    <div style={{ fontSize: "0.88rem" }}>
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
              <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow-sm)" }}>
                <h4 style={{ fontSize: "0.8rem", color: "var(--slate-light)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 800, marginBottom: 16, borderBottom: "1px solid var(--sand-100)", paddingBottom: 10 }}>
                  👷 Vetted QLD Contractor Matches
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginBottom: 16, lineHeight: 1.45 }}>
                  Homeowners reading this guide can directly hire our verified QBCC partners specializing in this design style:
                </p>

                {matchedTrades.map((c) => (
                  <div key={c.id} style={{
                    background: "var(--sand-50)",
                    border: "1px solid var(--sand-200)",
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 12,
                    fontSize: "0.82rem"
                  }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                      <span style={{
                        background: "rgba(34,197,94,0.1)",
                        color: "#16a34a",
                        padding: "1px 6px",
                        borderRadius: 50,
                        fontSize: "0.62rem",
                        fontWeight: 800
                      }}>
                        🛡️ QBCC ACTIVE
                      </span>
                    </div>
                    <h5 style={{ fontSize: "0.88rem", fontWeight: 800, margin: "0 0 2px" }}>
                      {c.name}
                    </h5>
                    <p style={{ fontSize: "0.74rem", color: "var(--slate-light)", marginBottom: 6 }}>
                      {c.category.split(" & ")[0]}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 8 }}>
                      <span style={{ color: "#f59e0b", fontSize: "0.76rem" }}>★</span>
                      <strong>{c.rating}</strong>
                      <span style={{ color: "var(--slate-light)", fontSize: "0.72rem" }}>({c.reviewsCount})</span>
                    </div>
                    {c.b2bBenefit && (
                      <div style={{
                        background: "white",
                        border: "1px solid var(--sand-200)",
                        borderRadius: 6,
                        padding: "6px 8px",
                        fontSize: "0.72rem",
                        color: "var(--ocean-600)",
                        fontWeight: 700,
                        marginBottom: 8
                      }}>
                        {c.b2bBenefit}
                      </div>
                    )}
                    <Link href={`/directory/${c.id}`} style={{
                      display: "block",
                      textAlign: "center",
                      background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-50))",
                      color: "var(--ocean-700)",
                      border: "1px solid var(--ocean-300)",
                      textDecoration: "none",
                      fontWeight: 800,
                      fontSize: "0.76rem",
                      padding: "8px",
                      borderRadius: 50,
                      transition: "var(--transition)"
                    }} className="btn-hover-effect">
                      View Showroom
                    </Link>
                  </div>
                ))}
              </div>

              {/* B2B Club Advert */}
              <div style={{
                background: "linear-gradient(135deg, var(--ocean-700) 0%, var(--ocean-600) 100%)",
                borderRadius: 16,
                padding: 24,
                color: "white",
                boxShadow: "var(--shadow-md)"
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>🎁</div>
                <h4 style={{ color: "white", fontSize: "0.95rem", fontWeight: 800, marginBottom: 6 }}>
                  B2B wholesale discounts
                </h4>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.45, marginBottom: 14 }}>
                  Connect with any verified partner on CoastHomeHub and get up to 10% off wholesale orders at Reece plumbing, Laminex, and Beaumont Tiles.
                </p>
                <Link href="/directory" style={{
                  display: "inline-block",
                  color: "#e8b84b",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  textDecoration: "none"
                }}>
                  Explore Directory →
                </Link>
              </div>

            </div>
          </div>

          {/* Related Reading Grid */}
          {related.length > 0 && (
            <section style={{ marginTop: 56, borderTop: "1px solid var(--sand-200)", paddingTop: 40 }}>
              <h2 style={{ fontSize: "1.55rem", marginBottom: 22, fontWeight: 800 }}>Related reading</h2>
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
        .btn-hover-effect:hover {
          background: var(--ocean-600) !important;
          color: white !important;
          border-color: var(--ocean-600) !important;
        }
      `}} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MagazineArticleCard from "@/components/MagazineArticleCard";
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

  return (
    <>
      <JsonLd data={buildArticleSchema(article)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      {article.faq.length > 0 && <JsonLd data={buildFaqSchema(article.faq)} />}

      <article style={{ background: "var(--off-white)", minHeight: "100vh" }}>
        <section style={{ background: "linear-gradient(160deg,#0a1f1e,#155e58)", padding: "124px 0 48px" }}>
          <div className="container-md">
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

        <div className="container-md" style={{ padding: "34px 24px 84px" }}>
          <div
            style={{
              height: "min(52vw,420px)",
              minHeight: 240,
              backgroundImage: `url(${article.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 18,
              marginBottom: 32,
              boxShadow: "var(--shadow-lg)",
            }}
          />

          {article.projectMeta && (
            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "18px 22px", marginBottom: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
              <span><strong>Location:</strong><br />{article.projectMeta.location}</span>
              <span><strong>Budget:</strong><br />{article.projectMeta.budgetRange}</span>
              <span><strong>Timeline:</strong><br />{article.projectMeta.timeline}</span>
              <span><strong>Type:</strong><br />{article.projectMeta.projectType}</span>
            </div>
          )}

          {article.styleMeta && (
            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "18px 22px", marginBottom: 28 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                {article.styleMeta.palette.map((color) => (
                  <span key={color} style={{ width: 24, height: 24, borderRadius: "50%", background: color, border: "2px solid white", boxShadow: "0 0 0 1px var(--sand-200)" }} />
                ))}
              </div>
              <p style={{ color: "var(--slate-mid)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                <strong>Best for:</strong> {article.styleMeta.bestFor}<br />
                <strong>Cost level:</strong> {article.styleMeta.costLevel}
              </p>
            </div>
          )}

          <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 18, padding: "34px 34px 38px", boxShadow: "var(--shadow-sm)" }}>
            {article.sections.map((section) => (
              <section key={section.heading} style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: "1.35rem", marginBottom: 12 }}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} style={{ color: "var(--slate-mid)", fontSize: "1rem", lineHeight: 1.82, marginBottom: 13 }}>
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul style={{ paddingLeft: 22, display: "grid", gap: 8, color: "var(--slate-mid)", lineHeight: 1.65 }}>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}

            {article.faq.length > 0 && (
              <section style={{ borderTop: "1px solid var(--sand-200)", paddingTop: 28 }}>
                <h2 style={{ fontSize: "1.35rem", marginBottom: 16 }}>FAQ</h2>
                <div style={{ display: "grid", gap: 14 }}>
                  {article.faq.map((item) => (
                    <div key={item.question} style={{ background: "var(--off-white)", border: "1px solid var(--sand-200)", borderRadius: 12, padding: "16px 18px" }}>
                      <h3 style={{ fontSize: "0.98rem", marginBottom: 7 }}>{item.question}</h3>
                      <p style={{ color: "var(--slate-light)", fontSize: "0.9rem", lineHeight: 1.65 }}>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {related.length > 0 && (
            <section style={{ marginTop: 46 }}>
              <h2 style={{ fontSize: "1.55rem", marginBottom: 22 }}>Related reading</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20 }}>
                {related.map((item) => <MagazineArticleCard key={item.slug} article={item} compact />)}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}

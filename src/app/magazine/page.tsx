import type { Metadata } from "next";
import Link from "next/link";
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
    "Renovation style guides, project stories, cost guides and expert interviews for South East Queensland homeowners.",
  alternates: { canonical: "https://coasthomehub.com.au/magazine" },
};

const contentTypes = Object.keys(contentTypeRegistry) as MagazineContentType[];

export default function MagazinePage() {
  const articles = getPublishedMagazineArticles();
  const featured = getFeaturedMagazineArticles();
  const hero = featured[0] ?? articles[0];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Magazine", path: "/magazine" },
        ])}
      />

      <section style={{ background: "linear-gradient(160deg,#0a1f1e 0%,#0e4440 58%,#155e58 100%)", padding: "128px 0 78px" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(320px,0.95fr)", gap: 42, alignItems: "center" }} className="magazine-hero-grid">
            <div>
              <div className="badge" style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.2)", color: "#e8b84b", marginBottom: 18 }}>
                CoastHomeHub Magazine
              </div>
              <h1 style={{ color: "white", fontSize: "clamp(2.2rem,5vw,3.7rem)", lineHeight: 1.08, marginBottom: 18 }}>
                Renovation intelligence for Queensland homes
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 620 }}>
                A CMS-ready content hub for style guides, real project stories, cost guides and expert interviews. Built to help homeowners plan before they spend.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
                <Link href="/inspiration" className="btn-gold">Browse inspiration</Link>
                <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.88)", border: "2px solid rgba(255,255,255,0.24)", borderRadius: 50, padding: "12px 26px", textDecoration: "none", fontWeight: 800 }}>
                  View projects
                </Link>
              </div>
            </div>

            {hero && (
              <Link href={`/magazine/${hero.slug}`} style={{ display: "block", textDecoration: "none", borderRadius: 20, overflow: "hidden", background: "white", boxShadow: "0 26px 70px rgba(0,0,0,0.28)" }}>
                <div style={{ height: 260, backgroundImage: `url(${hero.heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ padding: "24px 26px 26px" }}>
                  <p style={{ color: "var(--gold)", fontSize: "0.76rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
                    Featured · {hero.type}
                  </p>
                  <h2 style={{ fontSize: "1.35rem", lineHeight: 1.28, marginBottom: 10 }}>{hero.title}</h2>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.9rem", lineHeight: 1.6 }}>{hero.excerpt}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section style={{ background: "white", padding: "54px 0 34px", borderBottom: "1px solid var(--sand-200)" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14 }}>
            {contentTypes.map((type) => (
              <div key={type} style={{ border: "1px solid var(--sand-200)", borderRadius: 14, padding: "18px 18px 20px", background: "var(--off-white)" }}>
                <h3 style={{ fontSize: "0.98rem", marginBottom: 8 }}>{type}</h3>
                <p style={{ color: "var(--slate-light)", fontSize: "0.84rem", lineHeight: 1.55 }}>
                  {contentTypeRegistry[type].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--off-white)", padding: "56px 0 92px" }}>
        <div className="container-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 18, flexWrap: "wrap", marginBottom: 28 }}>
            <div>
              <div className="badge" style={{ marginBottom: 12 }}>Latest</div>
              <h2 style={{ fontSize: "clamp(1.7rem,4vw,2.4rem)" }}>All magazine content</h2>
            </div>
            <p style={{ color: "var(--slate-light)", fontSize: "0.9rem" }}>{articles.length} published articles</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 24 }}>
            {articles.map((article) => (
              <MagazineArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .magazine-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

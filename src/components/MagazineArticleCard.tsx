import Link from "next/link";
import type { MagazineArticle } from "@/lib/magazineCms";

type MagazineArticleCardProps = {
  article: MagazineArticle;
  compact?: boolean;
};

export default function MagazineArticleCard({ article, compact = false }: MagazineArticleCardProps) {
  return (
    <Link
      href={`/magazine/${article.slug}`}
      className="editorial-card"
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      <div className="editorial-card-img-wrap" style={{ height: compact ? 170 : 230 }}>
        <div
          className="editorial-card-img"
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: `url(${article.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.25))" }} />
          <span
            style={{
              position: "absolute",
              left: 14,
              top: 14,
              background: "white",
              color: "var(--ocean-600)",
              borderRadius: 2,
              padding: "4px 12px",
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: ".05em",
              textTransform: "uppercase",
              boxShadow: "var(--shadow-sm)",
              fontFamily: "Outfit, sans-serif"
            }}
          >
            {article.type}
          </span>
        </div>
      </div>
      <div style={{ padding: compact ? "16px 20px" : "22px 24px 24px" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6 }}>
          {article.category} · {article.readTime}
        </p>
        <h3 className="editorial-heading-serif" style={{ fontSize: compact ? "1rem" : "1.2rem", lineHeight: 1.32, marginBottom: 8, fontWeight: 600 }}>
          {article.title}
        </h3>
        <p style={{ color: "var(--slate-light)", fontSize: compact ? "0.82rem" : "0.88rem", lineHeight: 1.55, marginBottom: 14, fontFamily: "'Lora', Georgia, serif" }}>
          {article.excerpt}
        </p>
        <span style={{ color: "var(--ocean-500)", fontWeight: 800, fontSize: "0.82rem" }} className="read-more-text">
          Read Article →
        </span>
      </div>
    </Link>
  );
}

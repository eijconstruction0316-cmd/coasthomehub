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
      className="card"
      style={{
        display: "block",
        overflow: "hidden",
        textDecoration: "none",
        background: "white",
      }}
    >
      <div
        style={{
          height: compact ? 160 : 220,
          backgroundImage: `url(${article.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.42))" }} />
        <span
          style={{
            position: "absolute",
            left: 14,
            top: 14,
            background: "white",
            color: "var(--ocean-600)",
            borderRadius: 50,
            padding: "4px 11px",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: ".05em",
            textTransform: "uppercase",
          }}
        >
          {article.type}
        </span>
      </div>
      <div style={{ padding: compact ? "18px 20px" : "22px 24px 24px" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.74rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
          {article.category} · {article.readTime}
        </p>
        <h3 style={{ fontSize: compact ? "1rem" : "1.18rem", color: "var(--slate-dark)", lineHeight: 1.35, marginBottom: 9 }}>
          {article.title}
        </h3>
        <p style={{ color: "var(--slate-light)", fontSize: compact ? "0.84rem" : "0.9rem", lineHeight: 1.6, marginBottom: 16 }}>
          {article.excerpt}
        </p>
        <span style={{ color: "var(--ocean-500)", fontWeight: 800, fontSize: "0.86rem" }}>
          Read article →
        </span>
      </div>
    </Link>
  );
}

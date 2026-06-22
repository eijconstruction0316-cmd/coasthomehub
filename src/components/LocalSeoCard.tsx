import Link from "next/link";
import type { LocalSeoLandingPage } from "@/lib/localSeo";

type LocalSeoCardProps = {
  page: LocalSeoLandingPage;
};

export default function LocalSeoCard({ page }: LocalSeoCardProps) {
  return (
    <Link
      href={page.path}
      className="card"
      style={{
        display: "block",
        textDecoration: "none",
        background: "white",
        padding: "22px 24px",
        border: "1px solid var(--sand-200)",
      }}
    >
      <p style={{ color: "var(--gold)", fontSize: "0.74rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
        {page.city.name} · {page.service.shortName}
      </p>
      <h3 style={{ fontSize: "1.08rem", lineHeight: 1.35, marginBottom: 9 }}>
        {page.title}
      </h3>
      <p style={{ color: "var(--slate-light)", fontSize: "0.88rem", lineHeight: 1.58, marginBottom: 16 }}>
        {page.metaDescription}
      </p>
      <span style={{ color: "var(--ocean-500)", fontSize: "0.86rem", fontWeight: 800 }}>
        View local guide →
      </span>
    </Link>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LocalSeoCard from "@/components/LocalSeoCard";
import {
  getAllLocalSeoLandingPages,
  localSeoCities,
  localSeoServices,
} from "@/lib/localSeo";
import { buildBreadcrumbSchema } from "@/lib/seoSchemas";

export const metadata: Metadata = {
  title: "Service Areas | CoastHomeHub",
  description:
    "Local renovation planning guides for Brisbane, Gold Coast, Sunshine Coast, Noosa and Toowoomba homeowners.",
  alternates: { canonical: "https://coasthomehub.com.au/locations" },
};

export default function LocationsPage() {
  const landingPages = getAllLocalSeoLandingPages();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />

      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", padding: "126px 0 66px" }}>
        <div className="container-lg">
          <div style={{ maxWidth: 760 }}>
            <div className="badge" style={{ marginBottom: 18, background: "rgba(255,255,255,0.06)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>Service Areas</div>
            <h1 style={{ fontSize: "clamp(2.1rem,5vw,3.35rem)", lineHeight: 1.1, marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "white" }}>
              Local renovation planning across Queensland
            </h1>
            <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.05rem", lineHeight: 1.75, fontFamily: "Outfit, sans-serif" }}>
              Programmatic local landing pages for bathroom renovation, kitchen renovation, painting and flooring across Brisbane, Gold Coast, Sunshine Coast, Noosa and Toowoomba.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 0 28px", borderBottom: "1px solid var(--sand-200)" }}>
        <div className="container-lg">
          <h2 style={{ fontSize: "1.6rem", marginBottom: 20, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Cities</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14 }}>
            {localSeoCities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="card"
                style={{ display: "block", padding: "20px 22px", textDecoration: "none", background: "var(--off-white)", borderRadius: 4, border: "1px solid var(--sand-300)" }}
              >
                <h3 style={{ fontSize: "1.15rem", marginBottom: 7, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>{city.name}</h3>
                <p style={{ color: "var(--slate-light)", fontSize: "0.86rem", lineHeight: 1.55, fontFamily: "Outfit, sans-serif" }}>{city.serviceAreaSummary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--off-white)", padding: "48px 0 92px" }}>
        <div className="container-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            <div>
              <div className="badge" style={{ marginBottom: 12, background: "var(--sand-100)", borderColor: "var(--sand-300)", color: "var(--ocean-700)", borderRadius: 2 }}>Local landing pages</div>
              <h2 style={{ fontSize: "1.75rem", fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>City and service pages</h2>
            </div>
            <p style={{ color: "var(--slate-light)", fontSize: "0.9rem", fontFamily: "Outfit, sans-serif" }}>
              ✦ {localSeoCities.length} cities · {localSeoServices.length} services · {landingPages.length} pages
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {landingPages.map((page) => (
              <LocalSeoCard key={page.path} page={page} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

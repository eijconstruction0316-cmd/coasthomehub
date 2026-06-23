import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import LocalSeoCard from "@/components/LocalSeoCard";
import {
  getLocalSeoCity,
  getLocalSeoLandingPage,
  localSeoCities,
  localSeoServices,
} from "@/lib/localSeo";
import { buildBreadcrumbSchema } from "@/lib/seoSchemas";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return localSeoCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getLocalSeoCity(citySlug);
  if (!city) return { title: "Location Not Found | CoastHomeHub" };

  return {
    title: `${city.name} Renovation Services | CoastHomeHub`,
    description: `Local renovation planning guides for bathroom renovation, kitchen renovation, painting and flooring in ${city.name}.`,
    alternates: { canonical: `https://coasthomehub.com.au/locations/${city.slug}` },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = getLocalSeoCity(citySlug);
  if (!city) notFound();

  const pages = localSeoServices.map((service) => getLocalSeoLandingPage(city.slug, service.slug)!);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: city.name, path: `/locations/${city.slug}` },
        ])}
      />

      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", padding: "126px 0 64px" }}>
        <div className="container-lg">
          <div style={{ maxWidth: 760 }}>
            <div className="badge" style={{ marginBottom: 18, background: "rgba(255,255,255,0.06)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>{city.region}</div>
            <h1 style={{ fontSize: "clamp(2.1rem,5vw,3.3rem)", lineHeight: 1.1, marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "white" }}>
              Renovation services in {city.name}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.05rem", lineHeight: 1.75, fontFamily: "Outfit, sans-serif" }}>
              {city.intro}
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "white", padding: "46px 0", borderBottom: "1px solid var(--sand-200)" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(260px,360px)", gap: 30 }} className="local-city-grid">
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Local planning notes</h2>
              <ul style={{ paddingLeft: 20, display: "grid", gap: 10, color: "var(--slate-mid)", lineHeight: 1.65, fontFamily: "Outfit, sans-serif", listStyleType: "square" }}>
                {city.localConsiderations.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div style={{ background: "var(--off-white)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 22px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 10, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Areas covered</h3>
              <p style={{ color: "var(--slate-light)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 12, fontFamily: "Outfit, sans-serif" }}>{city.serviceAreaSummary}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {city.suburbs.map((suburb) => (
                  <span key={suburb} style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 2, padding: "5px 10px", color: "var(--slate-mid)", fontSize: "0.78rem", fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--off-white)", padding: "52px 0 92px" }}>
        <div className="container-lg">
          <h2 style={{ fontSize: "1.6rem", marginBottom: 24, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>{city.name} service pages</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {pages.map((page) => <LocalSeoCard key={page.path} page={page} />)}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 840px) {
          .local-city-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </>
  );
}

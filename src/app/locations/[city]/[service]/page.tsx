import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import {
  getAllLocalSeoLandingPages,
  getLocalSeoLandingPage,
  localSeoCities,
  localSeoServices,
} from "@/lib/localSeo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalServiceSchema,
} from "@/lib/seoSchemas";

type LocalServicePageProps = {
  params: Promise<{ city: string; service: string }>;
};

export function generateStaticParams() {
  return getAllLocalSeoLandingPages().map((page) => ({
    city: page.city.slug,
    service: page.service.slug,
  }));
}

export async function generateMetadata({ params }: LocalServicePageProps): Promise<Metadata> {
  const { city, service } = await params;
  const page = getLocalSeoLandingPage(city, service);
  if (!page) return { title: "Local Service Not Found | CoastHomeHub" };

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `https://coasthomehub.com.au${page.path}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://coasthomehub.com.au${page.path}`,
      type: "website",
    },
  };
}

export default async function LocalServicePage({ params }: LocalServicePageProps) {
  const { city, service } = await params;
  const page = getLocalSeoLandingPage(city, service);
  if (!page) notFound();

  const relatedCities = localSeoCities.filter((item) => item.slug !== page.city.slug);
  const relatedServices = localSeoServices.filter((item) => item.slug !== page.service.slug);

  return (
    <>
      <JsonLd data={buildLocalServiceSchema(page)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: page.city.name, path: `/locations/${page.city.slug}` },
          { name: page.service.name, path: page.path },
        ])}
      />
      <JsonLd data={buildFaqSchema(page.faq)} />

      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", padding: "126px 0 70px" }}>
        <div className="container-lg">
          <div style={{ maxWidth: 780 }}>
            <div className="badge" style={{ background: "rgba(255,255,255,0.06)", borderColor: "var(--sand-300)", color: "#e8b84b", marginBottom: 18, borderRadius: 2 }}>
              {page.city.name} · {page.service.shortName}
            </div>
            <h1 style={{ color: "white", fontSize: "clamp(2.1rem,5vw,3.45rem)", lineHeight: 1.1, marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
              {page.h1}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 680, fontFamily: "Outfit, sans-serif" }}>
              {page.intro}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
              <Link href="/quote" className="btn-gold" style={{ borderRadius: 4 }}>Request a quote</Link>
              <Link href="/planner" style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.88)", border: "2px solid rgba(255,255,255,0.24)", borderRadius: 4, padding: "12px 26px", textDecoration: "none", fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>
                Plan with AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 0", borderBottom: "1px solid var(--sand-200)" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
            {[
              ["Budget range", page.service.costRange],
              ["Typical timeline", page.service.timeline],
              ["Service area", page.city.serviceAreaSummary],
            ].map(([label, value]) => (
              <div key={label} style={{ background: "var(--off-white)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 22px" }}>
                <p style={{ color: "var(--gold)", fontSize: "0.74rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8, fontFamily: "Outfit, sans-serif" }}>✦ {label}</p>
                <p style={{ color: "var(--slate-dark)", fontWeight: 700, lineHeight: 1.55, fontFamily: "Outfit, sans-serif" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--off-white)", padding: "54px 0 36px" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(280px,390px)", gap: 28, alignItems: "start" }} className="local-service-grid">
            <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "30px 32px", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ fontSize: "1.55rem", marginBottom: 14, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>What this page covers</h2>
              <p style={{ color: "var(--slate-light)", lineHeight: 1.75, marginBottom: 22, fontFamily: "Outfit, sans-serif" }}>
                {page.city.intro}
              </p>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 10, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Typical scope</h3>
              <ul style={{ paddingLeft: 20, display: "grid", gap: 9, color: "var(--slate-mid)", lineHeight: 1.65, marginBottom: 28, fontFamily: "Outfit, sans-serif", listStyleType: "square" }}>
                {page.service.scope.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 10, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Local considerations in {page.city.name}</h3>
              <ul style={{ paddingLeft: 20, display: "grid", gap: 9, color: "var(--slate-mid)", lineHeight: 1.65, fontFamily: "Outfit, sans-serif", listStyleType: "square" }}>
                {page.city.localConsiderations.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <aside style={{ display: "grid", gap: 18 }}>
              <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "22px 24px", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Quality checklist</h3>
                <ul style={{ display: "grid", gap: 9, listStyle: "none", padding: 0 }}>
                  {page.service.qualitySignals.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 9, color: "var(--slate-mid)", fontSize: "0.9rem", lineHeight: 1.55, fontFamily: "Outfit, sans-serif" }}>
                      <span style={{ color: "var(--gold)", fontWeight: 700 }}>✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "22px 24px", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Nearby areas</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {page.city.suburbs.map((suburb) => (
                    <span key={suburb} style={{ background: "var(--off-white)", border: "1px solid var(--sand-300)", borderRadius: 2, padding: "5px 10px", color: "var(--slate-mid)", fontSize: "0.78rem", fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>
                      {suburb}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--off-white)", padding: "20px 0 84px" }}>
        <div className="container-lg">
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "28px 30px", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontSize: "1.45rem", marginBottom: 18, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>FAQ</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {page.faq.map((item) => (
                <div key={item.question} style={{ background: "var(--off-white)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "16px 18px" }}>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: 7, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>✦ {item.question}</h3>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.9rem", lineHeight: 1.65, fontFamily: "Outfit, sans-serif" }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18, marginTop: 26 }}>
            <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 22px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Same service, other areas</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {relatedCities.map((cityItem) => (
                  <Link key={cityItem.slug} href={`/locations/${cityItem.slug}/${page.service.slug}`} style={{ color: "var(--ocean-700)", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem", fontFamily: "Outfit, sans-serif" }}>
                    ✦ {page.service.name} {cityItem.name} →
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 22px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>More services in {page.city.name}</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {relatedServices.map((serviceItem) => (
                  <Link key={serviceItem.slug} href={`/locations/${page.city.slug}/${serviceItem.slug}`} style={{ color: "var(--ocean-700)", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem", fontFamily: "Outfit, sans-serif" }}>
                    ✦ {serviceItem.name} {page.city.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) {
          .local-service-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </>
  );
}

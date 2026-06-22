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

      <section style={{ background: "linear-gradient(160deg,#0a1f1e,#155e58)", padding: "126px 0 70px" }}>
        <div className="container-lg">
          <div style={{ maxWidth: 780 }}>
            <div className="badge" style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.2)", color: "#e8b84b", marginBottom: 18 }}>
              {page.city.name} · {page.service.shortName}
            </div>
            <h1 style={{ color: "white", fontSize: "clamp(2.1rem,5vw,3.45rem)", lineHeight: 1.1, marginBottom: 16 }}>
              {page.h1}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 680 }}>
              {page.intro}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
              <Link href="/quote" className="btn-gold">Request a quote</Link>
              <Link href="/planner" style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.88)", border: "2px solid rgba(255,255,255,0.24)", borderRadius: 50, padding: "12px 26px", textDecoration: "none", fontWeight: 800 }}>
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
              <div key={label} style={{ background: "var(--off-white)", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "20px 22px" }}>
                <p style={{ color: "var(--gold)", fontSize: "0.74rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
                <p style={{ color: "var(--slate-mid)", fontWeight: 700, lineHeight: 1.55 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--off-white)", padding: "54px 0 36px" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(280px,390px)", gap: 28, alignItems: "start" }} className="local-service-grid">
            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 18, padding: "30px 32px", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ fontSize: "1.55rem", marginBottom: 14 }}>What this page covers</h2>
              <p style={{ color: "var(--slate-light)", lineHeight: 1.75, marginBottom: 22 }}>
                {page.city.intro}
              </p>
              <h3 style={{ fontSize: "1.08rem", marginBottom: 10 }}>Typical scope</h3>
              <ul style={{ paddingLeft: 20, display: "grid", gap: 9, color: "var(--slate-mid)", lineHeight: 1.65, marginBottom: 28 }}>
                {page.service.scope.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <h3 style={{ fontSize: "1.08rem", marginBottom: 10 }}>Local considerations in {page.city.name}</h3>
              <ul style={{ paddingLeft: 20, display: "grid", gap: 9, color: "var(--slate-mid)", lineHeight: 1.65 }}>
                {page.city.localConsiderations.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <aside style={{ display: "grid", gap: 18 }}>
              <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "22px 24px", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 12 }}>Quality checklist</h3>
                <ul style={{ display: "grid", gap: 9, listStyle: "none" }}>
                  {page.service.qualitySignals.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 9, color: "var(--slate-mid)", fontSize: "0.9rem", lineHeight: 1.55 }}>
                      <span style={{ color: "var(--ocean-500)", fontWeight: 900 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "22px 24px", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 12 }}>Nearby areas</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {page.city.suburbs.map((suburb) => (
                    <span key={suburb} style={{ background: "var(--off-white)", border: "1px solid var(--sand-200)", borderRadius: 50, padding: "5px 10px", color: "var(--slate-mid)", fontSize: "0.78rem", fontWeight: 700 }}>
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
          <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 18, padding: "28px 30px", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: 18 }}>FAQ</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {page.faq.map((item) => (
                <div key={item.question} style={{ background: "var(--off-white)", border: "1px solid var(--sand-200)", borderRadius: 12, padding: "16px 18px" }}>
                  <h3 style={{ fontSize: "0.98rem", marginBottom: 7 }}>{item.question}</h3>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.9rem", lineHeight: 1.65 }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18, marginTop: 26 }}>
            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: 12 }}>Same service, other areas</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {relatedCities.map((cityItem) => (
                  <Link key={cityItem.slug} href={`/locations/${cityItem.slug}/${page.service.slug}`} style={{ color: "var(--ocean-500)", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
                    {page.service.name} {cityItem.name} →
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: "20px 22px" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: 12 }}>More services in {page.city.name}</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {relatedServices.map((serviceItem) => (
                  <Link key={serviceItem.slug} href={`/locations/${page.city.slug}/${serviceItem.slug}`} style={{ color: "var(--ocean-500)", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
                    {serviceItem.name} {page.city.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .local-service-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

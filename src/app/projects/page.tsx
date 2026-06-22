import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MagazineArticleCard from "@/components/MagazineArticleCard";
import { getArticlesByCollection } from "@/lib/magazineCms";
import { buildBreadcrumbSchema } from "@/lib/seoSchemas";

export const metadata: Metadata = {
  title: "Projects | CoastHomeHub",
  description:
    "Queensland renovation project stories showing scope, budget ranges, timelines, materials and real planning decisions.",
  alternates: { canonical: "https://coasthomehub.com.au/projects" },
};

export default function ProjectsPage() {
  const projects = getArticlesByCollection("projects");

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <section style={{ background: "linear-gradient(160deg,#0a1f1e,#155e58)", padding: "126px 0 72px" }}>
        <div className="container-lg">
          <div style={{ maxWidth: 760 }}>
            <div className="badge" style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.2)", color: "#e8b84b", marginBottom: 18 }}>
              Project stories
            </div>
            <h1 style={{ color: "white", fontSize: "clamp(2.1rem,5vw,3.4rem)", lineHeight: 1.1, marginBottom: 16 }}>
              Realistic renovation stories before you start yours
            </h1>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem", lineHeight: 1.75 }}>
              Project stories explain the scope, materials, cost drivers, timeline and trade sequence behind Queensland renovations.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--off-white)", padding: "54px 0 92px" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {projects.map((project) => (
              <div key={project.slug} style={{ display: "grid", gap: 14 }}>
                <MagazineArticleCard article={project} />
                {project.projectMeta && (
                  <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 14, padding: "16px 18px", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "grid", gap: 8, color: "var(--slate-mid)", fontSize: "0.86rem" }}>
                      <span><strong>Location:</strong> {project.projectMeta.location}</span>
                      <span><strong>Budget:</strong> {project.projectMeta.budgetRange}</span>
                      <span><strong>Timeline:</strong> {project.projectMeta.timeline}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

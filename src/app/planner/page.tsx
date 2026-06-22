import type { Metadata } from "next";
import PlannerWorkflow from "@/components/PlannerWorkflow";

export const metadata: Metadata = {
  title: "AI Renovation Planner | CoastHomeHub",
  description:
    "Create a structured renovation project brief with scope, budget range, timeline, location, materials, photos and PDF export.",
};

export default function PlannerPage() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f0f9f8 0%, #faf8f5 58%, #e8f0f5 100%)",
        paddingTop: 118,
        paddingBottom: 64,
      }}
    >
      <div className="container-lg">
        <div style={{ maxWidth: 720, marginBottom: 30 }}>
          <div className="badge" style={{ marginBottom: 14 }}>
            AI Renovation Planner
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", lineHeight: 1.12, marginBottom: 14 }}>
            Turn a renovation idea into a structured project brief
          </h1>
          <p style={{ color: "var(--slate-light)", fontSize: "1.03rem", lineHeight: 1.7, maxWidth: 640 }}>
            Pick the project type, answer focused planning questions, then generate a saved brief and PDF with scope, budget range, timeline, location, materials and photo notes.
          </p>
        </div>

        <PlannerWorkflow />
      </div>
    </section>
  );
}

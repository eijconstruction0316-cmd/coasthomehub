import type { Metadata } from "next";
import DesignLookbook from "@/components/DesignLookbook";
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
        background: "var(--off-white)",
        paddingTop: 118,
        paddingBottom: 64,
      }}
    >
      <div className="container-lg">
        <div style={{ maxWidth: 720, marginBottom: 30 }}>
          <div className="badge" style={{ marginBottom: 14 }}>
            RenoScope Planner
          </div>
          <h1 className="planner-title" style={{ fontSize: "clamp(2rem,5vw,3rem)", lineHeight: 1.12, marginBottom: 14, overflowWrap: "break-word" }}>
            Turn a room layout into a quote-ready renovation brief
          </h1>
          <p style={{ color: "var(--slate-light)", fontSize: "1.03rem", lineHeight: 1.7, maxWidth: 640 }}>
            Start with the free 2D audit, unlock the 3D concept and scope pack, then move into the detailed AI brief when you are ready to request quotes.
          </p>
        </div>

        <DesignLookbook />

        <div style={{ marginTop: 54, maxWidth: 720, marginBottom: 24 }}>
          <div className="badge" style={{ marginBottom: 14 }}>
            Detailed brief builder
          </div>
          <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(1.7rem,4vw,2.35rem)", fontWeight: 500, marginBottom: 10 }}>
            Add project answers and photos after the layout is scoped
          </h2>
          <p style={{ color: "var(--slate-light)", fontSize: "0.98rem", lineHeight: 1.7 }}>
            The next step turns your selected scope into a fuller brief with budget, timeline, location, materials and PDF export.
          </p>
        </div>
        <PlannerWorkflow />
      </div>
      <style>{`
        @media (max-width: 520px) {
          .planner-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

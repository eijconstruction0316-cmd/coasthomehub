import type { Metadata } from "next";
import DesignChat from "@/components/DesignChat";

export const metadata: Metadata = {
  title: "Design My Space with AI | CoastHomeHub",
  description:
    "Upload a photo of your room and let CoastAI design it, give you a real QLD ballpark cost, then match you with up to 3 verified licensed tradies.",
};

export default function DesignPage() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #e8f5f4 0%, #f5f0e8 55%, #e8f0f5 100%)",
        paddingTop: 110,
        paddingBottom: 56,
      }}
    >
      <div className="container-md">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div className="badge" style={{ marginBottom: 14, display: "inline-flex" }}>
            ✨ AI Renovation Designer
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 12, lineHeight: 1.15 }}>
            See your renovation before you spend a dollar
          </h1>
          <p style={{ color: "var(--slate-light)", fontSize: "1.02rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Snap a photo, chat with CoastAI, and get a design plus a realistic QLD price — free. When you’re ready, we line up up to 3 verified licensed tradies to quote it.
          </p>
        </div>

        <div
          className="card"
          style={{
            background: "white",
            height: "min(72vh, 680px)",
            overflow: "hidden",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid rgba(255,255,255,0.7)",
          }}
        >
          <DesignChat />
        </div>

        <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", marginTop: 22 }}>
          {[
            ["✅", "QBCC-licensed tradies only"],
            ["🔒", "No spam — your details aren’t sold"],
            ["🏠", "Up to 3 quotes, never 10"],
          ].map(([icon, label]) => (
            <span key={label} style={{ fontSize: "0.84rem", color: "var(--slate-mid)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span>{icon}</span> {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

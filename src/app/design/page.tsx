import type { Metadata } from "next";
import { Suspense } from "react";
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
        background: "var(--off-white)",
        paddingTop: 110,
        paddingBottom: 56,
      }}
    >
      <div className="container-md">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div className="badge" style={{ marginBottom: 14, display: "inline-flex", background: "rgba(31, 122, 114, 0.05)", borderColor: "var(--ocean-200)", color: "var(--ocean-600)", borderRadius: 2 }}>
            ✦ AI Renovation Designer
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: 12, lineHeight: 1.15, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            See your renovation before you spend a dollar
          </h1>
          <p style={{ color: "var(--slate-mid)", fontSize: "1.02rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>
            Snap a photo, chat with CoastAI, and get a design plus a realistic QLD price — free. When you’re ready, we line up up to 3 verified licensed tradies to quote it.
          </p>
        </div>

        <div
          className="card"
          style={{
            background: "white",
            height: "min(72vh, 680px)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
            border: "1px solid var(--sand-300)",
            borderRadius: 4,
          }}
        >
          <Suspense fallback={null}>
            <DesignChat />
          </Suspense>
        </div>

        <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", marginTop: 22 }}>
          {[
            ["✦", "QBCC-licensed tradies only"],
            ["✦", "No spam — your details aren’t sold"],
            ["✦", "Up to 3 quotes, never 10"],
          ].map(([icon, label]) => (
            <span key={label} style={{ fontSize: "0.84rem", color: "var(--slate-mid)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "Outfit, sans-serif" }}>
              <span style={{ color: "var(--gold)" }}>{icon}</span> {label}
            </span>
          ))}
        </div>
        <p style={{ fontSize: "0.68rem", color: "var(--slate-light)", opacity: 0.7, maxWidth: 560, margin: "18px auto 0", lineHeight: 1.7, textAlign: "center", fontFamily: "Outfit, sans-serif" }}>
          AI cost estimates are indicative ballpark figures only — not formal quotes. Tradie matching is subject to availability. <a href="/terms" style={{ color: "var(--ocean-600)" }}>Terms apply.</a>
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIY Home Repair Guides for Queensland Homeowners | CoastHomeHub",
  description:
    "Step-by-step DIY guides for common Queensland home repairs — re-seal showers, re-grout tiles, fix running toilets, paint walls, and more. Written by a QBCC-licensed builder.",
};

const guides = [
  {
    id: 2,
    title: "Re-Seal Your Shower",
    difficulty: "Easy",
    difficultyColor: "#16a34a",
    time: "1 day",
    cost: "$20–$50",
    saves: "~$250",
    summary: "Remove old silicone, clean and dry joints, apply bathroom-grade silicone, smooth and remove tape.",
    steps: 5,
    tag: "Bathroom",
  },
  {
    id: 8,
    title: "Re-Grout Bathroom Tiles",
    difficulty: "Medium",
    difficultyColor: "#d97706",
    time: "1–2 days",
    cost: "$60–$120",
    saves: "~$500",
    summary: "Remove old grout with oscillating tool, clean joints, mix and apply new grout, seal when cured.",
    steps: 6,
    tag: "Bathroom",
  },
  {
    id: 9,
    title: "Fix a Running Toilet",
    difficulty: "Easy",
    difficultyColor: "#16a34a",
    time: "Under 1 hour",
    cost: "$20–$40",
    saves: "~$300/yr",
    summary: "Diagnose flapper or fill valve, turn off water, replace the faulty part, test and adjust water level.",
    steps: 4,
    tag: "Plumbing",
  },
  {
    id: 10,
    title: "Paint a Room Like a Pro",
    difficulty: "Medium",
    difficultyColor: "#d97706",
    time: "1–2 days",
    cost: "$80–$200",
    saves: "~$800",
    summary: "Fill, sand, sugar soap walls, prime, cut in with a quality brush, roll two thin coats.",
    steps: 7,
    tag: "Interior",
  },
  {
    id: 6,
    title: "Tile Your Own Floor or Wall",
    difficulty: "Hard",
    difficultyColor: "#dc2626",
    time: "Weekend",
    cost: "$150–$300",
    saves: "~$1,500",
    summary: "Check QLD licensing rules first, prep surface, lay tiles on adhesive, grout and seal.",
    steps: 5,
    tag: "Tiling",
  },
];

const rules = [
  {
    can: true,
    title: "You CAN do yourself (owner-occupier, personal residence)",
    items: [
      "Re-seal showers and baths with silicone",
      "Re-grout tiles (no waterproofing work)",
      "Replace toilet cistern parts (fill valve, flapper, flush button)",
      "Paint interiors and exteriors",
      "Replace tap washers and O-rings",
      "Fix squeaky hinges, door handles, cabinet hardware",
      "Install shelving, picture rails, curtain rods",
    ],
  },
  {
    can: false,
    title: "You CANNOT do yourself — must be licensed in QLD",
    items: [
      "Waterproofing in wet areas (AS 3740 compliance required)",
      "Any electrical work beyond changing a lightbulb",
      "Moving or installing new plumbing waste/supply lines",
      "Gas work of any kind",
      "Structural alterations (remove walls, extend rooms)",
      "Any building work over $3,300 in labour value",
    ],
  },
];

const quickFixes = [
  { problem: "Squeaky door hinge", fix: "Lift hinge pin, coat with petroleum jelly or olive oil, replace pin. 2 minutes." },
  { problem: "Dripping tap (ceramic disc)", fix: "Isolate water, unscrew handle and head, replace ceramic disc cartridge. $10–$20 from hardware store. 30 min." },
  { problem: "Mould on bathroom ceiling", fix: "Mix 1 part bleach to 4 parts water. Spray on, leave 20 min, wipe off. Repaint with mould-resistant paint after drying." },
  { problem: "Door not latching (sticking)", fix: "Mark the door frame where the latch catches. Chisel the strike plate mortise slightly deeper, or reposition strike plate with longer screws." },
  { problem: "Sliding door hard to open", fix: "Vacuum track first. Apply silicone spray lubricant to the track — not WD-40 (it attracts dirt). Lift door slightly to check roller height." },
  { problem: "Shower drain slow", fix: "Pour boiling water first (dissolves soap). Then baking soda + vinegar, wait 15 min, flush. For hair blockages, use a drain snake ($5 from hardware)." },
];

export default function DIYPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "#0c2422",
          borderBottom: "3px double var(--sand-300)",
          paddingTop: 120,
          paddingBottom: 72,
        }}
      >
        <div className="container-lg">
          <Link href="/blog" style={{ color: "var(--gold)", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24, fontFamily: "Outfit, sans-serif" }}>
            ← All Articles
          </Link>
          <br />
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.06)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>DIY Guides</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 16, lineHeight: 1.15, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "white" }}>
            Fix It Yourself —
            <br />
            <span style={{ color: "var(--gold)" }}>Real Guides for Queensland Homes</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 580, marginBottom: 24, fontFamily: "Outfit, sans-serif" }}>
            Step-by-step repair guides written by a QBCC-licensed Queensland builder. Each guide tells you exactly what to do, what tools you need, how much it should cost — and when to call a tradie instead.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>
            <span>✦ 5 full guides</span>
            <span>✦ 6 quick fixes</span>
            <span>✦ QLD licence rules explained</span>
          </div>
        </div>
      </section>

      {/* Full DIY Guides */}
      <section style={{ background: "var(--off-white)", padding: "64px 0" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 14, display: "inline-flex", background: "var(--sand-100)", borderColor: "var(--sand-300)", color: "var(--ocean-700)", borderRadius: 2 }}>Step-by-Step Guides</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Full Weekend DIY Projects</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {guides.map((g) => (
              <div key={g.id} className="card" style={{ padding: 0, overflow: "hidden", borderRadius: 4, border: "1px solid var(--sand-300)" }}>
                <div style={{ background: "var(--sand-50)", padding: "24px 24px 18px", borderBottom: "1px solid var(--sand-300)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: "1.2rem", color: "var(--gold)" }}>✦</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, background: `${g.difficultyColor}18`, color: g.difficultyColor, border: `1px solid ${g.difficultyColor}30`, borderRadius: 2, padding: "3px 10px" }}>
                      {g.difficulty}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: 6, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>{g.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--slate-light)", lineHeight: 1.55, fontFamily: "Outfit, sans-serif" }}>{g.summary}</p>
                </div>
                <div style={{ padding: "16px 24px 22px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 18, textAlign: "center" }}>
                    {[["Duration", g.time], ["Parts", g.cost], ["Savings", `Save ${g.saves}`]].map(([label, val]) => (
                      <div key={label} style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: 4, padding: "8px 4px" }}>
                        <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "var(--slate-light)", letterSpacing: "0.04em", fontFamily: "Outfit, sans-serif" }}>{label}</div>
                        <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--ocean-700)", marginTop: 3, fontFamily: "Outfit, sans-serif" }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/blog/${g.id}`} className="btn-primary" style={{ display: "block", textAlign: "center", width: "100%", boxSizing: "border-box", fontSize: "0.88rem", padding: "11px 20px", borderRadius: 4 }}>
                    Read Full Guide ({g.steps} steps) →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Fixes */}
      <section style={{ background: "white", padding: "64px 0", borderBottom: "1px solid var(--sand-200)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 14, display: "inline-flex", background: "var(--sand-100)", borderColor: "var(--sand-300)", color: "var(--ocean-700)", borderRadius: 2 }}>Quick Fixes</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", marginBottom: 10, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>Common Problems — Fast Answers</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "0.98rem", maxWidth: 500, margin: "0 auto", fontFamily: "Outfit, sans-serif" }}>
              No full guide needed. These are the quick fixes most Queensland homes need at some point.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {quickFixes.map((fix) => (
              <div key={fix.problem} className="card" style={{ padding: "22px 24px", display: "flex", gap: 16, alignItems: "flex-start", borderRadius: 4, border: "1px solid var(--sand-300)" }}>
                <div style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 2, color: "var(--gold)" }}>✦</div>
                <div>
                  <h3 style={{ fontSize: "1rem", marginBottom: 8, color: "var(--slate-dark)", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>{fix.problem}</h3>
                  <p style={{ fontSize: "0.84rem", color: "var(--slate-light)", lineHeight: 1.65, fontFamily: "Outfit, sans-serif" }}>{fix.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QLD Licence Rules */}
      <section style={{ background: "var(--off-white)", padding: "64px 0" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 14, display: "inline-flex", background: "var(--sand-100)", borderColor: "var(--sand-300)", color: "var(--ocean-700)", borderRadius: 2 }}>Know the Rules</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", marginBottom: 10, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>What Queenslanders Can (and Can&apos;t) DIY</h2>
            <p style={{ color: "var(--slate-light)", fontSize: "0.98rem", maxWidth: 560, margin: "0 auto", fontFamily: "Outfit, sans-serif" }}>
              Queensland law is clear on what owner-occupiers can do themselves. Getting this wrong can invalidate your home insurance and QBCC warranty — so it&apos;s worth knowing.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="rules-grid">
            {rules.map((rule) => (
              <div key={rule.title} className="card" style={{ padding: "28px 32px", border: rule.can ? "1px solid #bbf7d0" : "1px solid #fecaca", background: rule.can ? "#f0fdf4" : "#fff5f5", borderRadius: 4 }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: 18, color: rule.can ? "#15803d" : "#dc2626", display: "flex", gap: 10, alignItems: "center", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                  <span style={{ fontSize: "1rem" }}>✦</span> {rule.title}
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, padding: 0 }}>
                  {rule.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, fontSize: "0.88rem", color: "var(--slate-mid)", alignItems: "flex-start", fontFamily: "Outfit, sans-serif" }}>
                      <span style={{ color: rule.can ? "#16a34a" : "#dc2626", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--slate-light)", marginTop: 24, fontFamily: "Outfit, sans-serif" }}>
            Source: QBCC (Queensland Building and Construction Commission). Always verify current rules at <strong>qbcc.qld.gov.au</strong> — regulations are updated periodically.
          </p>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@media(max-width:700px){.rules-grid{grid-template-columns:1fr!important;}}` }} />
      </section>

      {/* When to call a tradie CTA */}
      <section style={{ background: "#0c2422", borderTop: "3px double var(--sand-300)", padding: "72px 0", textAlign: "center" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Bigger Than a Weekend Fix?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.76)", marginBottom: 12, maxWidth: 500, margin: "0 auto 12px", fontSize: "1rem", lineHeight: 1.7, fontFamily: "Outfit, sans-serif" }}>
            Chat with CoastAI first — describe or photo your space and get a realistic QLD ballpark for free. Then get up to 3 QBCC-licensed quotes with no obligation.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/design" className="btn-gold" style={{ borderRadius: 4 }}>Chat with CoastAI →</Link>
            <Link href="/quote" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: "4px", fontWeight: 700, color: "white", border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.95rem", fontFamily: "Outfit, sans-serif" }}>
              Get 3 Free Quotes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

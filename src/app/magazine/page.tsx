"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const ARTICLES = [
  {
    id: 1,
    free: true,
    category: "COST GUIDE",
    title: "The Hidden Costs of Bathroom Renovations in QLD",
    excerpt: "Most homeowners budget for tiles and vanities — but forget the four costs that blow out 80% of bathroom renos. We break them down with real QLD figures.",
    readTime: "5 min read",
    content: `
**The bathroom renovation trap**

Queensland homeowners consistently underestimate bathroom renovation costs by 25–40%. Here's what they miss:

**1. Waterproofing re-work ($800–$3,500)**
If your existing waterproofing is older than 10 years or was done without a QBCC licence, a tradie must strip it out and start fresh. This isn't optional — it's a non-negotiable code requirement. Budget $1,800 on average.

**2. Structural drying time (adds 3–7 days)**
After waterproofing, QLD building code requires a minimum cure time before tiling. If your tradie rushes this step, your tiles will crack within 2 years. Budget for extended scaffolding hire or temporary shower facilities.

**3. Hot water system upgrade ($600–$2,200)**
Older homes (pre-2000) often have undersized hot water systems. A bathroom reno is the perfect time to upgrade to an instant gas system or heat pump. If you don't do it now, you'll pay twice the labour later.

**4. Council approval for structural changes ($400–$1,800)**
Moving a wall? Relocating the shower? That's a building approval. Skipping it means you can't sell the property without retrospective approval — which costs 5x more.

**Real QLD ballparks for 2026:**
- Budget bathroom refresh (cosmetic only): $8,000–$14,000
- Mid-range full reno (new fixtures, tiling, waterproofing): $18,000–$28,000
- Luxury master ensuite (freestanding bath, large-format tiles): $35,000–$60,000+

*Always get 3 quotes from QBCC-licensed tradies before committing.*
    `,
  },
  {
    id: 2,
    free: true,
    category: "DESIGN TRENDS",
    title: "Coastal Kitchen Refresh: QLD Trends for 2026",
    excerpt: "Bright white kitchens are out. These are the palettes, materials and layouts dominating South East QLD renovations this year — and why they work in our climate.",
    readTime: "4 min read",
    content: `
**Why QLD kitchens are different**

South East Queensland's humidity, UV exposure and indoor-outdoor lifestyle demand different design decisions than Melbourne or Sydney kitchens. Here's what's trending for 2026 — and what actually performs.

**Colours moving in:**
- Warm whites with limewash undertones (vs cool blue-whites that look tired in QLD light)
- Sage green cabinetry — hides fingerprints, ages beautifully
- Terrazzo benchtops in warm sand tones

**Materials that survive QLD:**
- Porcelain slabs (not marble — it stains with our humidity)
- Powder-coated aluminium handles (rust-proof)
- Hybrid timber flooring rated to 90% humidity

**The indoor-outdoor kitchen**
With outdoor living being so central to QLD life, the trend is connecting the kitchen to a covered alfresco with a servery window. Budget $4,000–$12,000 for the window and deck connection.

**Layout shift: the galley is back**
Open-plan kitchens are giving way to defined galley kitchens with a clear "work zone" — separating cooking from socialising. This improves function and ventilation in the QLD heat.

**2026 cost ranges:**
- Cabinet respray + new handles: $2,500–$5,000
- New benchtops only: $3,500–$9,000
- Full kitchen refresh (keep layout): $22,000–$40,000
- Full reno with new layout: $45,000–$90,000+
    `,
  },
  {
    id: 3,
    free: false,
    category: "LEGAL & COMPLIANCE",
    title: "QBCC Licence Check: What Every QLD Homeowner Must Know",
    excerpt: "Hiring an unlicensed tradie in Queensland voids your home warranty and can cost you tens of thousands. Here's the 2-minute check that protects you.",
    readTime: "3 min read",
    content: `SUBSCRIBER CONTENT`,
  },
  {
    id: 4,
    free: false,
    category: "OUTDOOR LIVING",
    title: "Deck vs Patio: Which Adds More Value to Your QLD Home?",
    excerpt: "Both can transform your outdoor space — but only one gives you a measurable return at sale time. We look at the numbers, the council rules, and the QLD climate factor.",
    readTime: "6 min read",
    content: `SUBSCRIBER CONTENT`,
  },
  {
    id: 5,
    free: false,
    category: "PROJECT PLANNING",
    title: "The Ultimate QLD Home Renovation Timeline (2026 Edition)",
    excerpt: "From first quote to final inspection — a week-by-week timeline for every major renovation type, with Queensland-specific delays built in.",
    readTime: "8 min read",
    content: `SUBSCRIBER CONTENT`,
  },
  {
    id: 6,
    free: false,
    category: "MATERIALS",
    title: "What Actually Survives the QLD Climate: A Material Guide",
    excerpt: "UV, humidity, salt air, cyclone-prep — Queensland throws a lot at your home. Which materials win? Which ones fail? Real data from QLD tradespeople.",
    readTime: "7 min read",
    content: `SUBSCRIBER CONTENT`,
  },
  {
    id: 7,
    free: false,
    category: "INVESTMENT",
    title: "Which Renovations Return the Most in South East QLD (2026 Data)",
    excerpt: "Not all renovations add equal value. We surveyed QLD property valuers and agents to rank the renovations with the highest return on investment in our market.",
    readTime: "5 min read",
    content: `SUBSCRIBER CONTENT`,
  },
  {
    id: 8,
    free: false,
    category: "DIY vs TRADIE",
    title: "What You Can (and Cannot) Legally DIY in Queensland",
    excerpt: "QLD has some of the strictest owner-builder rules in Australia. Get it wrong and you face fines, voided insurance, and unsellable property. Know the line.",
    readTime: "4 min read",
    content: `SUBSCRIBER CONTENT`,
  },
];

function MagazineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [subscribed, setSubscribed] = useState(false);
  const [openArticle, setOpenArticle] = useState<number | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  useEffect(() => {
    if (searchParams.get("unlocked") === "1") {
      localStorage.setItem("chub_access", "unlocked");
      router.replace("/magazine");
    }
    setSubscribed(localStorage.getItem("chub_access") === "unlocked");
  }, [searchParams, router]);

  async function subscribe() {
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/create-homeowner-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ returnPath: "/magazine" }),
      });
      const { url, error } = await res.json();
      if (error) { alert(error); return; }
      window.location.href = url;
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingCheckout(false);
    }
  }

  const article = openArticle !== null ? ARTICLES.find((a) => a.id === openArticle) : null;

  if (article) {
    const canRead = article.free || subscribed;
    return (
      <div style={{ minHeight: "100vh", background: "#faf9f6" }}>
        <div style={{ background: "linear-gradient(135deg,#0a1f1e,#0e4440)", padding: "16px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setOpenArticle(null)} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: "0.85rem", fontFamily: "inherit" }}>← Back</button>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: ".08em" }}>{article.category}</span>
          </div>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
          <h1 style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 800, color: "#1a2332", lineHeight: 1.25, marginBottom: 16 }}>{article.title}</h1>
          <p style={{ color: "#4a607a", fontSize: "0.9rem", marginBottom: 40 }}>{article.readTime} · CoastHomeHub Magazine</p>

          {canRead ? (
            <div style={{ fontSize: "1rem", color: "#2d3f54", lineHeight: 1.85 }}>
              {article.content.trim().split("\n").map((line, i) => {
                const bold = line.startsWith("**") && line.endsWith("**");
                if (bold) return <h3 key={i} style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0e4440", margin: "28px 0 8px" }}>{line.slice(2, -2)}</h3>;
                if (line.trim() === "") return <br key={i} />;
                if (line.startsWith("- ")) return <li key={i} style={{ marginLeft: 20, marginBottom: 6 }}>{line.slice(2)}</li>;
                return <p key={i} style={{ marginBottom: 14 }}>{line}</p>;
              })}
            </div>
          ) : (
            <div>
              <p style={{ fontSize: "1.05rem", color: "#2d3f54", lineHeight: 1.8, marginBottom: 40 }}>{article.excerpt}</p>
              <div style={{ background: "linear-gradient(135deg,rgba(201,151,42,0.08),rgba(232,184,75,0.04))", border: "1px solid rgba(201,151,42,0.3)", borderRadius: 20, padding: "36px 32px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🔒</div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1a2332", margin: "0 0 12px" }}>Subscribers Only</h2>
                <p style={{ color: "#4a607a", lineHeight: 1.7, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
                  Get full access to every magazine article + unlimited AI quote briefs for <strong>$10/month AUD</strong>. Cancel anytime.
                </p>
                <button onClick={subscribe} disabled={loadingCheckout} style={{ background: "linear-gradient(135deg,#c9972a,#e8b84b)", color: "white", border: "none", borderRadius: 50, padding: "14px 32px", fontWeight: 700, fontSize: "1rem", cursor: loadingCheckout ? "default" : "pointer", fontFamily: "inherit" }}>
                  {loadingCheckout ? "Loading…" : "Subscribe for $10/month →"}
                </button>
                <p style={{ fontSize: "0.75rem", color: "#9c7d55", marginTop: 12 }}>2 free quote briefs included with every account · Cancel anytime</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f6" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#0a1f1e 0%,#0e4440 60%,#155e58 100%)", padding: "64px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(201,151,42,0.2)", border: "1px solid rgba(201,151,42,0.4)", borderRadius: 50, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ color: "#e8b84b", fontSize: "0.8rem", fontWeight: 700, letterSpacing: ".08em" }}>✦ COASTHOMEHUB MAGAZINE</span>
        </div>
        <h1 style={{ color: "white", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>
          Renovation Insights for<br /><span style={{ background: "linear-gradient(90deg,#c9972a,#e8b84b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>South East Queensland</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Expert guides, cost data, design trends and legal essentials — written for QLD homeowners by people who know the local market.
        </p>
        {!subscribed ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <button onClick={subscribe} disabled={loadingCheckout} style={{ background: "linear-gradient(135deg,#c9972a,#e8b84b)", color: "white", border: "none", borderRadius: 50, padding: "14px 32px", fontWeight: 700, fontSize: "1rem", cursor: loadingCheckout ? "default" : "pointer", fontFamily: "inherit" }}>
              {loadingCheckout ? "Loading…" : "Subscribe for $10/month →"}
            </button>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>2 articles free · Cancel anytime</span>
          </div>
        ) : (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(31,122,114,0.3)", border: "1px solid rgba(31,122,114,0.5)", borderRadius: 50, padding: "8px 20px" }}>
            <span style={{ color: "#6dd8d0", fontSize: "0.9rem", fontWeight: 700 }}>✅ Full access unlocked</span>
          </div>
        )}
      </div>

      {/* Article grid */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {ARTICLES.map((a) => {
            const locked = !a.free && !subscribed;
            return (
              <div
                key={a.id}
                onClick={() => setOpenArticle(a.id)}
                style={{ background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #e8dfd0", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
              >
                {/* Category stripe */}
                <div style={{ height: 5, background: a.free ? "linear-gradient(90deg,#1f7a72,#3d9990)" : "linear-gradient(90deg,#c9972a,#e8b84b)" }} />
                <div style={{ padding: "22px 22px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".08em", color: a.free ? "#1f7a72" : "#c9972a", background: a.free ? "#f0f9f8" : "rgba(201,151,42,0.1)", padding: "3px 10px", borderRadius: 50 }}>{a.category}</span>
                    {locked ? <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>🔒 Subscribers</span> : <span style={{ fontSize: "0.75rem", color: "#1f7a72", fontWeight: 600 }}>✓ Free</span>}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a2332", margin: "0 0 10px", lineHeight: 1.4 }}>{a.title}</h3>
                  <p style={{ fontSize: "0.87rem", color: "#4a607a", lineHeight: 1.6, margin: "0 0 16px" }}>{a.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.78rem", color: "#9c7d55" }}>{a.readTime}</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: locked ? "#c9972a" : "#1f7a72" }}>
                      {locked ? "Subscribe to read →" : "Read now →"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!subscribed && (
          <div style={{ marginTop: 48, background: "linear-gradient(135deg,#0a1f1e,#0e4440)", borderRadius: 20, padding: "40px 36px", textAlign: "center" }}>
            <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 12px" }}>Unlock Every Article</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 28px", lineHeight: 1.7 }}>
              $10/month AUD · Unlimited AI quote briefs · Full magazine library · Cancel anytime
            </p>
            <button onClick={subscribe} disabled={loadingCheckout} style={{ background: "linear-gradient(135deg,#c9972a,#e8b84b)", color: "white", border: "none", borderRadius: 50, padding: "14px 36px", fontWeight: 700, fontSize: "1rem", cursor: loadingCheckout ? "default" : "pointer", fontFamily: "inherit" }}>
              {loadingCheckout ? "Loading…" : "Subscribe — $10/month AUD →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MagazinePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#faf9f6" }} />}>
      <MagazineContent />
    </Suspense>
  );
}

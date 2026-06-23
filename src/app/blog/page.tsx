import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Design Trends & DIY Guides | CoastHomeHub",
  description:
    "Explore 2025 Australian home design trends, DIY renovation guides, and expert tips for Gold Coast and Sunshine Coast homes.",
};

const posts = [
  {
    id: 7,
    tag: "Renovation Costs",
    title: "Why Is Renovation So Expensive in QLD? An Honest Answer to “The Neighbour Got It Half Price”",
    excerpt:
      "“My neighbour got theirs done for half that.” A licensed QLD builder explains what the cheap quote really leaves out — and why renovation cost is mostly people, not paint.",
    readTime: "6 min read",
    color: "var(--gold)",
    date: "June 21, 2026",
  },
  {
    id: 1,
    tag: "2025 Trends",
    title: "Top 10 Australian Home Design Trends for 2025",
    excerpt:
      "From coastal textures and organic shapes to bold earthy tones — discover what's dominating Queensland interiors this year and how to incorporate them into your home.",
    readTime: "5 min read",
    color: "var(--ocean-700)",
    date: "June 12, 2025",
  },
  {
    id: 2,
    tag: "DIY Guide",
    title: "How to Re-Seal Your Shower (Step by Step)",
    excerpt:
      "Mouldy or cracked silicone? Before calling a tradie, try this licensed professional's guide to refreshing your shower seals at home. Saves thousands if you're handy.",
    readTime: "8 min read",
    color: "var(--ocean-700)",
    date: "June 8, 2025",
  },
  {
    id: 3,
    tag: "Buyer's Guide",
    title: "Choosing the Right Waterproofing for QLD's Climate",
    excerpt:
      "Queensland's humid heat is brutal on homes. Here's the definitive guide to which waterproofing materials actually perform in Gold Coast and Sunshine Coast conditions.",
    readTime: "6 min read",
    color: "var(--ocean-700)",
    date: "June 3, 2025",
  },
  {
    id: 4,
    tag: "Design Trends",
    title: "Coastal Minimalism: The Queensland Interior Look for 2025",
    excerpt:
      "Less is more — but with texture. The coastal minimalism trend combines natural materials, muted palettes, and open spaces for a relaxed yet premium feel.",
    readTime: "7 min read",
    color: "var(--ocean-700)",
    date: "May 28, 2025",
  },
  {
    id: 5,
    tag: "Cost Guide",
    title: "How Much Does a Bathroom Renovation Cost in QLD? (2025 Prices)",
    excerpt:
      "We've surveyed dozens of licensed Queensland tradies to give you real 2025 pricing for bathroom renovations of every size and complexity.",
    readTime: "9 min read",
    color: "var(--ocean-700)",
    date: "May 22, 2025",
  },
  {
    id: 6,
    tag: "DIY Guide",
    title: "Tiling Your Own Bathroom: What You Need to Know Before You Start",
    excerpt:
      "Thinking of tiling it yourself? Read this first. We cover what DIYers often get wrong, what requires a licensed tradie, and how to get professional results.",
    readTime: "10 min read",
    color: "var(--ocean-700)",
    date: "May 15, 2025",
  },
  {
    id: 8,
    tag: "DIY Guide",
    title: "How to Re-Grout Bathroom Tiles (Step by Step)",
    excerpt:
      "Crumbling grout lets water behind your tiles and ruins your waterproofing. Here's the full weekend DIY guide — removal, mixing, application, and sealing — with QLD humidity tips.",
    readTime: "9 min read",
    color: "var(--ocean-700)",
    date: "June 14, 2026",
  },
  {
    id: 9,
    tag: "DIY Guide",
    title: "Fix a Running Toilet in Under an Hour (Replace the Fill Valve & Flapper)",
    excerpt:
      "A running toilet wastes up to 200,000L a year. The fix costs $20–$40 in parts and takes under an hour — here's the step-by-step guide, plus what QLD law says homeowners can do themselves.",
    readTime: "7 min read",
    color: "var(--ocean-700)",
    date: "June 10, 2026",
  },
  {
    id: 10,
    tag: "DIY Guide",
    title: "Painting Your Home Interior in Queensland: Products, Prep & a Pro Finish",
    excerpt:
      "The highest-ROI DIY job you can do. The full guide to paint selection, prep, priming, cutting in, and rolling — with tips specific to QLD's humidity, heat, and coastal conditions.",
    readTime: "11 min read",
    color: "var(--ocean-700)",
    date: "June 7, 2026",
  },
];

const categories = ["All", "DIY Guide", "Renovation Costs", "2025 Trends", "Buyer's Guide", "Cost Guide", "Design Trends"];

export default function BlogPage() {
  const featured = posts[0];
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "#0c2422",
          borderBottom: "3px double var(--sand-300)",
          paddingTop: 120,
          paddingBottom: 64,
        }}
      >
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 20, display: "inline-flex", background: "rgba(255,255,255,0.06)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>
            Design Hub
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "white" }}>
            Home Design Trends & Guides
          </h1>
          <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.1rem", maxWidth: 560, fontFamily: "Outfit, sans-serif" }}>
            Expert advice, 2025 design inspiration, and practical DIY guides — written for Queensland homeowners.
          </p>

          {/* Categories */}
          <div style={{ display: "flex", gap: 10, marginTop: 32, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                style={{
                  padding: "8px 18px",
                  borderRadius: "4px",
                  border: cat === "All" ? "2px solid var(--gold)" : "1px solid rgba(255,255,255,0.15)",
                  background: cat === "All" ? "rgba(255,255,255,0.08)" : "transparent",
                  color: cat === "All" ? "#e8b84b" : "rgba(255,255,255,0.7)",
                  fontWeight: cat === "All" ? 700 : 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontFamily: "Outfit, sans-serif",
                  transition: "var(--transition-fast)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ background: "var(--off-white)", padding: "64px 0 96px" }}>
        <div className="container-lg">
          {/* Featured post */}
          <div
            className="card"
            style={{
              marginBottom: 40,
              borderRadius: 4,
              border: "1px solid var(--sand-300)",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
            id="featured-post"
          >
            <div
              style={{
                background: "var(--sand-50)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                color: "var(--gold)",
                fontWeight: "bold",
                padding: "48px",
                minHeight: 260,
                borderRight: "1px solid var(--sand-300)",
                fontFamily: "Lora, Georgia, serif"
              }}
            >
              ✦
            </div>
            <div style={{ padding: "40px" }}>
              <span
                style={{
                  display: "inline-block",
                  background: "var(--sand-100)",
                  color: "var(--ocean-700)",
                  border: "1px solid var(--sand-300)",
                  borderRadius: 2,
                  padding: "4px 12px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginBottom: 16,
                  fontFamily: "Outfit, sans-serif"
                }}
              >
                ✦ FEATURED · {featured.tag}
              </span>
              <h2 style={{ fontSize: "1.6rem", marginBottom: 12, lineHeight: 1.3, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>
                {featured.title}
              </h2>
              <p style={{ color: "var(--slate-light)", lineHeight: 1.7, marginBottom: 24, fontSize: "0.95rem", fontFamily: "Outfit, sans-serif" }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                <Link href={`/blog/${featured.id}`} className="btn-primary" style={{ fontSize: "0.9rem", padding: "10px 24px", borderRadius: 4 }} id="read-featured">
                  Read Article →
                </Link>
                <span style={{ fontSize: "0.8rem", color: "var(--slate-light)", fontFamily: "Outfit, sans-serif" }}>⏱ {featured.readTime} · {featured.date}</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {posts.slice(1).map((post) => (
              <article key={post.id} className="card" style={{ overflow: "hidden", borderRadius: 4, border: "1px solid var(--sand-300)" }}>
                <div
                  style={{
                    height: 140,
                    background: "var(--sand-50)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    color: "var(--gold)",
                    borderBottom: "1px solid var(--sand-300)"
                  }}
                >
                  ✦
                </div>
                <div style={{ padding: "24px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "var(--sand-100)",
                      color: "var(--ocean-700)",
                      border: "1px solid var(--sand-200)",
                      borderRadius: 2,
                      padding: "3px 10px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      fontFamily: "Outfit, sans-serif"
                    }}
                  >
                    {post.tag}
                  </span>
                  <h3 style={{ fontSize: "1.15rem", lineHeight: 1.4, marginBottom: 10, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>{post.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--slate-light)", lineHeight: 1.65, marginBottom: 16, fontFamily: "Outfit, sans-serif" }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--slate-light)", fontFamily: "Outfit, sans-serif" }}>⏱ {post.readTime}</span>
                    <Link
                      href={`/blog/${post.id}`}
                      style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ocean-700)", textDecoration: "none", fontFamily: "Outfit, sans-serif" }}
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#0c2422",
          borderTop: "3px double var(--sand-300)",
          padding: "72px 0",
          textAlign: "center",
        }}
      >
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "2rem", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.76)", marginBottom: 32, fontFamily: "Outfit, sans-serif" }}>
            Get a free quote from a licensed QLD tradie within 24 hours.
          </p>
          <Link href="/quote" className="btn-gold" id="blog-cta" style={{ borderRadius: 4 }}>
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </>
  );
}

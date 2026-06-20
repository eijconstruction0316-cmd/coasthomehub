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
    emoji: "💰",
    date: "June 21, 2026",
  },
  {
    id: 1,
    tag: "2025 Trends",
    title: "Top 10 Australian Home Design Trends for 2025",
    excerpt:
      "From coastal textures and organic shapes to bold earthy tones — discover what's dominating Queensland interiors this year and how to incorporate them into your home.",
    readTime: "5 min read",
    color: "var(--ocean-400)",
    emoji: "🏠",
    date: "June 12, 2025",
  },
  {
    id: 2,
    tag: "DIY Guide",
    title: "How to Re-Seal Your Shower (Step by Step)",
    excerpt:
      "Mouldy or cracked silicone? Before calling a tradie, try this licensed professional's guide to refreshing your shower seals at home. Saves thousands if you're handy.",
    readTime: "8 min read",
    color: "var(--sand-500)",
    emoji: "🚿",
    date: "June 8, 2025",
  },
  {
    id: 3,
    tag: "Buyer's Guide",
    title: "Choosing the Right Waterproofing for QLD's Climate",
    excerpt:
      "Queensland's humid heat is brutal on homes. Here's the definitive guide to which waterproofing materials actually perform in Gold Coast and Sunshine Coast conditions.",
    readTime: "6 min read",
    color: "#7c3aed",
    emoji: "🌧️",
    date: "June 3, 2025",
  },
  {
    id: 4,
    tag: "Design Trends",
    title: "Coastal Minimalism: The Queensland Interior Look for 2025",
    excerpt:
      "Less is more — but with texture. The coastal minimalism trend combines natural materials, muted palettes, and open spaces for a relaxed yet premium feel.",
    readTime: "7 min read",
    color: "#0891b2",
    emoji: "🌊",
    date: "May 28, 2025",
  },
  {
    id: 5,
    tag: "Cost Guide",
    title: "How Much Does a Bathroom Renovation Cost in QLD? (2025 Prices)",
    excerpt:
      "We've surveyed dozens of licensed Queensland tradies to give you real 2025 pricing for bathroom renovations of every size and complexity.",
    readTime: "9 min read",
    color: "#16a34a",
    emoji: "💰",
    date: "May 22, 2025",
  },
  {
    id: 6,
    tag: "DIY Guide",
    title: "Tiling Your Own Bathroom: What You Need to Know Before You Start",
    excerpt:
      "Thinking of tiling it yourself? Read this first. We cover what DIYers often get wrong, what requires a licensed tradie, and how to get professional results.",
    readTime: "10 min read",
    color: "#d97706",
    emoji: "🧱",
    date: "May 15, 2025",
  },
];

const categories = ["All", "Renovation Costs", "2025 Trends", "DIY Guide", "Buyer's Guide", "Cost Guide", "Design Trends"];

export default function BlogPage() {
  const featured = posts[0];
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--ocean-50) 0%, var(--sand-50) 100%)",
          paddingTop: 120,
          paddingBottom: 64,
        }}
      >
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>
            Design Hub
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 16 }}>
            Home Design Trends & Guides
          </h1>
          <p style={{ color: "var(--slate-light)", fontSize: "1.1rem", maxWidth: 560 }}>
            Expert advice, 2025 design inspiration, and practical DIY guides — written for Queensland homeowners.
          </p>

          {/* Categories */}
          <div style={{ display: "flex", gap: 10, marginTop: 32, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                style={{
                  padding: "8px 18px",
                  borderRadius: "50px",
                  border: cat === "All" ? "2px solid var(--ocean-400)" : "1px solid var(--sand-200)",
                  background: cat === "All" ? "var(--ocean-50)" : "white",
                  color: cat === "All" ? "var(--ocean-600)" : "var(--slate-mid)",
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
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
            id="featured-post"
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${featured.color}22, ${featured.color}44)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "6rem",
                padding: "48px",
                minHeight: 260,
              }}
            >
              {featured.emoji}
            </div>
            <div style={{ padding: "40px" }}>
              <span
                style={{
                  display: "inline-block",
                  background: "var(--ocean-50)",
                  color: "var(--ocean-600)",
                  border: "1px solid var(--ocean-100)",
                  borderRadius: "50px",
                  padding: "4px 12px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                ⭐ FEATURED · {featured.tag}
              </span>
              <h2 style={{ fontSize: "1.5rem", marginBottom: 12, lineHeight: 1.3 }}>
                {featured.title}
              </h2>
              <p style={{ color: "var(--slate-light)", lineHeight: 1.7, marginBottom: 24, fontSize: "0.95rem" }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                <Link href={`/blog/${featured.id}`} className="btn-primary" style={{ fontSize: "0.9rem", padding: "10px 24px" }} id="read-featured">
                  Read Article →
                </Link>
                <span style={{ fontSize: "0.8rem", color: "var(--slate-light)" }}>⏱ {featured.readTime} · {featured.date}</span>
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
              <article key={post.id} className="card" style={{ overflow: "hidden" }}>
                <div
                  style={{
                    height: 140,
                    background: `linear-gradient(135deg, ${post.color}18, ${post.color}35)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3.5rem",
                  }}
                >
                  {post.emoji}
                </div>
                <div style={{ padding: "24px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: `${post.color}15`,
                      color: post.color,
                      border: `1px solid ${post.color}30`,
                      borderRadius: "50px",
                      padding: "3px 10px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {post.tag}
                  </span>
                  <h3 style={{ fontSize: "1rem", lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--slate-light)", lineHeight: 1.65, marginBottom: 16 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--slate-light)" }}>⏱ {post.readTime}</span>
                    <Link
                      href={`/blog/${post.id}`}
                      style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ocean-500)", textDecoration: "none" }}
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
          background: "linear-gradient(135deg, var(--slate-dark), var(--slate-mid))",
          padding: "72px 0",
          textAlign: "center",
        }}
      >
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "2rem", marginBottom: 12 }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32 }}>
            Get a free quote from a licensed QLD tradie within 24 hours.
          </p>
          <Link href="/quote" className="btn-gold" id="blog-cta">
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts: Record<string, {
  id: number;
  tag: string;
  title: string;
  emoji: string;
  color: string;
  date: string;
  readTime: string;
  author: string;
  intro: string;
  sections: { heading: string; body: string }[];
  tips: string[];
  relatedIds: number[];
}> = {
  "1": {
    id: 1,
    tag: "2025 Trends",
    title: "Top 10 Australian Home Design Trends for 2025",
    emoji: "🏠",
    color: "var(--ocean-400)",
    date: "June 12, 2025",
    readTime: "5 min read",
    author: "Peter Kim, EIJ Construction",
    intro: "Australia's home design landscape is evolving fast. After years of grey-on-grey minimalism, 2025 is seeing a bold shift toward warmth, texture, and personality. Here's what's dominating Queensland interiors this year — and why.",
    sections: [
      {
        heading: "1. Coastal Minimalism with Texture",
        body: "Clean lines are staying, but the cold white walls of the 2010s are gone. In their place: limewash plaster, reeded timber panels, and textured stone tiles. Queensland's coastal lifestyle demands it — warm, tactile, and effortlessly relaxed.",
      },
      {
        heading: "2. Earthy Terracotta & Clay Tones",
        body: "Terracotta is back — and not in the dated 1990s sense. 2025 sees sophisticated clay render walls, burnt orange cabinetry, and warm amber lighting creating a rich, grounded palette that works beautifully in Queensland's sun-drenched light.",
      },
      {
        heading: "3. Japandi: Japanese Wabi-Sabi Meets Scandinavian",
        body: "Warm neutrals, handmade ceramics, exposed natural timber, and perfectly imperfect finishes. Japandi is the biggest crossover style of the year — and it's finding a natural home in Queensland ensuites and living rooms.",
      },
      {
        heading: "4. Dark & Moody Bathrooms",
        body: "Hotel-spa energy is coming home. Charcoal floor-to-ceiling tiles, matte black fixtures, and warm pendant lighting are transforming bathrooms into genuine retreats. Bold, but done right, absolutely timeless.",
      },
      {
        heading: "5. Biophilic Design — Nature Inside",
        body: "Trailing plants, living walls, timber ceilings, and rattan accents — homeowners want nature in every room. This isn't a passing trend; biophilic design is proven to reduce stress and improve wellbeing.",
      },
      {
        heading: "6. Curved & Organic Forms",
        body: "Goodbye sharp 90-degree corners. Arched doorways, curved sofas, rounded kitchen islands, and organic-shaped mirrors are softening homes across the country. This works especially well in bedroom and living spaces.",
      },
      {
        heading: "7. Two-Tone Kitchen Cabinetry",
        body: "Light uppers, dark lowers — or vice versa. Two-tone kitchens are the #1 renovation trend for homeowners who want a dramatic update without full demolition. A great way to modernise before selling.",
      },
      {
        heading: "8. Bold Feature Tiles",
        body: "Patterned floor tiles in bathrooms and laundries are having their moment. Zellige, scallop, and handmade-look tiles add character that standard rectified tiles simply can't match.",
      },
      {
        heading: "9. Modern Hamptons Goes Native",
        body: "The Hamptons look isn't going anywhere in Queensland, but it's evolving — incorporating more native Australian timber, raw stone, and warm organic tones rather than pure classic white-and-navy.",
      },
      {
        heading: "10. Outdoor-Indoor Living Perfected",
        body: "QLD's climate demands it. 2025 sees a strong push toward retractable glass walls, alfresco tiling that matches interiors seamlessly, and waterproofed timber decks that blur the boundary between inside and out.",
      },
    ],
    tips: [
      "Start with one room — test a trend before committing to the whole house",
      "Warm lighting (2700–3000K) makes earthy tones sing — avoid cool daylight globes",
      "Mix textures within a neutral palette rather than mixing too many colours",
      "In Queensland's humidity, always seal natural stone and unsealed grout",
    ],
    relatedIds: [2, 3, 4],
  },
  "2": {
    id: 2,
    tag: "DIY Guide",
    title: "How to Re-Seal Your Shower (Step by Step)",
    emoji: "🚿",
    color: "var(--sand-500)",
    date: "June 8, 2025",
    readTime: "8 min read",
    author: "Peter Kim, EIJ Construction",
    intro: "Mouldy, cracked, or discoloured silicone is one of the most common home maintenance issues in Queensland. The good news? If you're reasonably handy, you can replace shower silicone yourself in a day — saving hundreds on a call-out fee. Here's exactly how to do it.",
    sections: [
      {
        heading: "What You'll Need",
        body: "Silicone remover gel or blade scraper, isopropyl alcohol (IPA), bathroom-grade silicone (sanitary silicone, not general purpose), a caulking gun, masking tape, a smoothing tool or your finger, and rubber gloves.",
      },
      {
        heading: "Step 1: Remove All Old Silicone",
        body: "Apply silicone remover gel and leave for 2–3 hours. Use a blade scraper (be careful not to scratch tiles) to lift the old silicone. Remove every trace — new silicone won't bond over old. This step is where most DIY jobs fail.",
      },
      {
        heading: "Step 2: Clean and Dry Thoroughly",
        body: "Wipe all joints with isopropyl alcohol. This removes soap residue, oils, and mould spores that prevent bonding. The joint must be completely dry before applying new silicone — ideally leave overnight.",
      },
      {
        heading: "Step 3: Apply Masking Tape",
        body: "Apply masking tape along both sides of each joint, leaving a 4–6mm gap. This gives you clean, straight lines even if your application isn't perfectly even. Worth the extra 15 minutes.",
      },
      {
        heading: "Step 4: Apply Silicone",
        body: "Cut the nozzle at 45° to match your joint width. Apply consistent pressure in one smooth, continuous bead. Don't stop and start — it creates lumps. Work one joint at a time from one end to the other.",
      },
      {
        heading: "Step 5: Smooth and Remove Tape",
        body: "Dip your finger in water or use a silicone smoothing tool. Press firmly along the joint in one smooth pass. Immediately remove the masking tape while the silicone is still wet. Leave 24 hours before using the shower.",
      },
      {
        heading: "When to Call a Professional",
        body: "If there's mould growing behind the tiles (you'll see discolouration through grout), structural movement causing repeat cracking, or waterproofing failure (water pooling under tiles) — call a licensed tradie. DIY silicone won't fix underlying waterproofing issues.",
      },
    ],
    tips: [
      "Always buy sanitary/bathroom-grade silicone — not the cheap general-purpose variety",
      "Mould-resistant silicone is worth the extra $5 in Queensland's humid climate",
      "Don't rush drying time — silicone needs 24hrs minimum, 48hrs in humid conditions",
      "If you see water damage or soft tiles, stop and call a licensed waterproofing tradie",
    ],
    relatedIds: [1, 3, 5],
  },
  "3": {
    id: 3,
    tag: "Buyer's Guide",
    title: "Choosing the Right Waterproofing for QLD's Climate",
    emoji: "🌧️",
    color: "#7c3aed",
    date: "June 3, 2025",
    readTime: "6 min read",
    author: "Peter Kim, EIJ Construction",
    intro: "Queensland's subtropical climate — intense UV, heavy summer rainfall, and high humidity — is one of the most demanding environments for home waterproofing in Australia. Here's what you need to know before your next renovation.",
    sections: [
      {
        heading: "Why Queensland is Different",
        body: "Brisbane and the Gold Coast receive over 1,000mm of rainfall annually, with high summer humidity regularly exceeding 80%. Combined with UV index levels that degrade materials faster than cooler climates, the wrong waterproofing product will fail prematurely — sometimes within 2–3 years.",
      },
      {
        heading: "Wet Area Waterproofing (Bathrooms & Showers)",
        body: "Australian Standard AS 3740 mandates specific waterproofing requirements for wet areas. In QLD, you must use a compliant membrane system applied by a licensed waterproofer. Sheet membranes (e.g. Laykold, Gripset) or liquid-applied systems are both compliant when installed correctly.",
      },
      {
        heading: "Balcony & Deck Waterproofing",
        body: "Exposed concrete balconies in QLD are particularly vulnerable to water ingress, which can cause concrete cancer and structural damage. A polyurethane or acrylic-based liquid membrane applied over a primer coat is the most durable and flexible solution for movement joints.",
      },
      {
        heading: "Roof Waterproofing",
        body: "Flat or low-pitch concrete roofs require a robust UV-stable coating system. In QLD, look for a product with a UV stabiliser rating suitable for tropical conditions. Expect to recoat every 7–10 years — or immediately if you see cracking or chalking.",
      },
      {
        heading: "What to Ask Your Waterproofer",
        body: "Always ask: Is this product compliant with AS 3740? What's the warranty period for materials and workmanship? Is the waterproofer QBCC licensed? Do you provide a waterproofing certificate? Any reputable tradie should answer all of these confidently.",
      },
    ],
    tips: [
      "Never let a tiler lay tiles without waterproofing membranes in wet areas — it's illegal and will cost you dearly",
      "Get a waterproofing test certificate after installation — this is required for resale in QLD",
      "In coastal areas (within 1km of the ocean), use marine-grade products wherever possible",
      "Budget for waterproofing first, then finishes — cutting costs here always costs more later",
    ],
    relatedIds: [1, 2, 5],
  },
  "4": {
    id: 4,
    tag: "Design Trends",
    title: "Coastal Minimalism: The Queensland Interior Look for 2025",
    emoji: "🌊",
    color: "#0891b2",
    date: "May 28, 2025",
    readTime: "7 min read",
    author: "Peter Kim, EIJ Construction",
    intro: "Queensland homeowners have always been drawn to the coast — but 2025's coastal minimalism is nothing like the seashell-and-driftwood interiors of years past. It's sophisticated, calm, and built for the way Queenslanders actually live.",
    sections: [
      {
        heading: "The Core Philosophy",
        body: "Coastal minimalism strips away visual clutter and replaces it with quality materials, natural textures, and a palette inspired by sand, water, and sky. The goal is a space that feels effortlessly calm — as if the beach is just outside.",
      },
      {
        heading: "The Palette",
        body: "Think warm whites (not stark), natural linen, soft sage, weathered timber tones, and occasional deep ocean blue as an accent. Avoid cool grey — it conflicts with QLD's warm natural light.",
      },
      {
        heading: "Materials to Use",
        body: "Travertine and limestone tiles (honed, not polished), reeded or panelled timber, linen upholstery, rattan and cane accents, and hand-thrown ceramic vessels. Authenticity matters — avoid plastic faux-timber laminates.",
      },
      {
        heading: "The Bathroom Application",
        body: "Large-format limestone-look tiles, a wall-hung timber vanity, matte brushed nickel fittings, and a walk-in shower with a simple linear drain. A single arched mirror and a potted plant complete the look. No clutter on benchtops.",
      },
      {
        heading: "Why It Works in Queensland",
        body: "Coastal minimalism isn't just aesthetic — it's practical. Light colours reflect heat, natural materials breathe, and the open, uncluttered layout suits Queensland's indoor-outdoor lifestyle perfectly. It also photographs exceptionally well for Airbnb listings.",
      },
    ],
    tips: [
      "Layer textures within a neutral palette rather than adding more colours",
      "Use indoor plants liberally — they're the easiest way to add life without clutter",
      "Invest in one quality piece (e.g. a travertine vanity top) rather than many cheap ones",
      "Keep window treatments minimal — sheer linen curtains maximise natural light",
    ],
    relatedIds: [1, 3, 5],
  },
  "5": {
    id: 5,
    tag: "Cost Guide",
    title: "How Much Does a Bathroom Renovation Cost in QLD? (2025 Prices)",
    emoji: "💰",
    color: "#16a34a",
    date: "May 22, 2025",
    readTime: "9 min read",
    author: "Peter Kim, EIJ Construction",
    intro: "2025 pricing for bathroom renovations across Queensland — from a basic refresh to a luxury master ensuite. We've surveyed dozens of licensed tradies to give you real numbers, not vague estimates.",
    sections: [
      {
        heading: "Basic Bathroom Refresh: $3,000–$8,000",
        body: "This covers re-siliconing, re-grouting, replacing a vanity, new tapware, and a toilet. No structural changes, no new tiling. Great for investment properties or pre-sale preparation. 3–5 day turnaround.",
      },
      {
        heading: "Mid-Range Renovation: $8,000–$18,000",
        body: "Full strip-out, new waterproofing, new floor and wall tiles (standard range), new vanity and toilet, frameless shower screen, and new tapware. Most family bathrooms fall into this range. 2–4 week project.",
      },
      {
        heading: "Premium Renovation: $18,000–$35,000",
        body: "Large format tiles, feature tile walls, freestanding bath, floor-to-ceiling tiling, premium tapware and fixtures, custom vanity, underfloor heating, and designer finishes. 4–8 week project.",
      },
      {
        heading: "Luxury Master Ensuite: $35,000+",
        body: "High-end stone, custom joinery, rainhead shower, heated towel rails, smart mirror, dual vanity, freestanding bath, and premium imported fixtures. These projects can run 10–14 weeks with the right tradie.",
      },
      {
        heading: "What Drives Up the Cost",
        body: "Access issues (e.g. upper floor with no direct access), wet area compliance fails, asbestos removal (pre-1990 homes), structural changes, imported or custom materials, and tight project timelines all increase cost significantly.",
      },
      {
        heading: "How to Save Without Cutting Corners",
        body: "Don't compromise on waterproofing — this is where failures happen. Do save on fixtures by choosing quality mid-range brands (e.g. Caroma, Methven, Kado) rather than imported designer pieces. Buy your own tiles after getting a quote — retail markup is significant.",
      },
    ],
    tips: [
      "Always get 3 quotes — and check each tradie's QBCC licence before proceeding",
      "Ask specifically what's included: waterproofing, waste, tiling, fixtures, and clean-up",
      "A detailed written quote protects you — avoid verbal agreements",
      "Budget 15% contingency on top of your quote for unexpected issues",
    ],
    relatedIds: [2, 3, 1],
  },
  "6": {
    id: 6,
    tag: "DIY Guide",
    title: "Tiling Your Own Bathroom: What You Need to Know Before You Start",
    emoji: "🧱",
    color: "#d97706",
    date: "May 15, 2025",
    readTime: "10 min read",
    author: "Peter Kim, EIJ Construction",
    intro: "DIY tiling can save you thousands — or cost you thousands more if done wrong. A licensed Queensland tiler shares what homeowners get wrong, what requires a licensed professional, and how to get professional results if you choose to DIY.",
    sections: [
      {
        heading: "What You Can Legally DIY in Queensland",
        body: "In Queensland, homeowners may tile their own properties for personal (non-commercial) use without a QBCC licence, provided: the work doesn't involve waterproofing in wet areas, structural changes, or works over $3,300 in labour value. When in doubt, check with QBCC directly.",
      },
      {
        heading: "What You Cannot DIY",
        body: "Waterproofing in bathrooms and wet areas is required by law to be performed by a licensed waterproofer in Queensland. You cannot lay tiles in a shower recess or bathroom floor without compliant waterproofing underneath. This is not optional.",
      },
      {
        heading: "The Most Common DIY Tiling Mistakes",
        body: "1. Not checking for level before starting (leads to lippage). 2. Using cheap adhesive and grout that cracks. 3. Not soaking porous tiles before laying. 4. Rushing and not allowing adhesive to set. 5. Using the wrong trowel notch size for large format tiles.",
      },
      {
        heading: "Tile Selection Tips",
        body: "For floors, choose tiles with a slip rating of R10 or above (R11 or higher for outdoors). For walls, rectified tiles give cleaner grout lines for large format installations. Avoid using wall tiles on floors — they're not rated for foot traffic.",
      },
      {
        heading: "Tools You Actually Need",
        body: "A quality tile saw (rent, don't buy for a one-off), an angle grinder with diamond blade, notched trowel, rubber mallet, tile spacers, level, and a grout float. Budget $150–$300 to rent tools for a weekend project.",
      },
    ],
    tips: [
      "Order 10–15% more tiles than measured — wastage from cuts adds up fast",
      "Wet-cut tiles only — dry cutting creates dust that's extremely harmful to lungs",
      "Let adhesive cure for 24 hours before grouting — 48 hours in humid Queensland",
      "Use a grout sealer after grouting — especially important in Queensland's humidity",
    ],
    relatedIds: [2, 5, 3],
  },
};

const allPosts = Object.values(posts);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = posts[id];
  if (!post) return { title: "Article Not Found | CoastHomeHub" };
  return {
    title: `${post.title} | CoastHomeHub`,
    description: post.intro.slice(0, 155),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts[id];
  if (!post) notFound();

  const related = post.relatedIds
    .map((rid) => posts[String(rid)])
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(160deg, ${post.color}15 0%, var(--sand-50) 100%)`,
          paddingTop: 120,
          paddingBottom: 56,
        }}
      >
        <div className="container-md">
          <Link href="/blog" style={{ color: "var(--ocean-500)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            ← Back to All Articles
          </Link>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ display: "inline-block", background: `${post.color}18`, color: post.color, border: `1px solid ${post.color}35`, borderRadius: "50px", padding: "4px 14px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {post.tag}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", marginBottom: 20, lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--slate-light)", fontSize: "0.875rem", flexWrap: "wrap" }}>
            <span>✍️ {post.author}</span>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: "white", padding: "48px 0 80px" }}>
        <div className="container-md">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 56, alignItems: "flex-start" }} className="article-grid">
            {/* Content */}
            <div>
              {/* Intro */}
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--slate-mid)", marginBottom: 40, fontWeight: 500, borderLeft: `4px solid ${post.color}`, paddingLeft: 20 }}>
                {post.intro}
              </p>

              {/* Sections */}
              {post.sections.map((section) => (
                <div key={section.heading} style={{ marginBottom: 36 }}>
                  <h2 style={{ fontSize: "1.2rem", marginBottom: 12, color: "var(--slate-dark)" }}>
                    {section.heading}
                  </h2>
                  <p style={{ color: "var(--slate-mid)", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-line" }}>
                    {section.body}
                  </p>
                </div>
              ))}

              {/* Tips box */}
              <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: "var(--radius-lg)", padding: "28px 32px", marginTop: 48, marginBottom: 48 }}>
                <h3 style={{ color: "var(--ocean-700)", fontSize: "1.05rem", marginBottom: 16 }}>
                  💡 Expert Tips from EIJ Construction
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {post.tips.map((tip) => (
                    <li key={tip} style={{ display: "flex", gap: 10, fontSize: "0.9rem", color: "var(--ocean-700)" }}>
                      <span style={{ fontWeight: 700, color: "var(--ocean-400)", marginTop: 2 }}>→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author CTA */}
              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: "var(--radius-lg)", padding: "28px 32px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ width: 60, height: 60, background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>
                  👷
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Written by Peter Kim</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--slate-light)" }}>Licensed waterproofing specialist & founder of EIJ Construction. 8+ years across Gold Coast to Sunshine Coast.</div>
                </div>
                <Link href="/quote" className="btn-primary" style={{ fontSize: "0.875rem", padding: "10px 20px", whiteSpace: "nowrap" }} id="article-get-quote">
                  Get a Free Quote
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 96 }}>
              <div style={{ background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))", borderRadius: "var(--radius-lg)", padding: 24, color: "white" }}>
                <h4 style={{ color: "white", marginBottom: 12, fontSize: "1rem" }}>Need a Tradie?</h4>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>
                  Get a free quote from a licensed QLD professional within 24 hours.
                </p>
                <Link href="/quote" style={{ display: "block", background: "white", color: "var(--ocean-600)", padding: "11px 20px", borderRadius: "50px", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", textAlign: "center" }} id="sidebar-get-quote">
                  Get Free Quote →
                </Link>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <h4 style={{ fontSize: "0.9rem", marginBottom: 14 }}>📖 More Articles</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {related.map((r) => r && (
                    <Link key={r.id} href={`/blog/${r.id}`} style={{ display: "flex", gap: 10, textDecoration: "none", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "1.2rem" }}>{r.emoji}</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--slate-mid)", lineHeight: 1.4, fontWeight: 500 }}>{r.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 20, background: "var(--sand-50)", border: "1px solid var(--sand-200)" }}>
                <h4 style={{ fontSize: "0.9rem", marginBottom: 10 }}>🗺️ Service Areas</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--slate-light)", lineHeight: 1.6 }}>
                  Gold Coast · Tweed Heads · Logan · Brisbane · Sunshine Coast · Noosa
                </p>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:800px){.article-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Related Articles */}
      <section style={{ background: "var(--off-white)", padding: "64px 0" }}>
        <div className="container-lg">
          <h2 style={{ fontSize: "1.6rem", marginBottom: 32 }}>Related Articles</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {related.map((r) => r && (
              <Link key={r.id} href={`/blog/${r.id}`} style={{ textDecoration: "none" }}>
                <article className="card" style={{ overflow: "hidden" }}>
                  <div style={{ height: 120, background: `linear-gradient(135deg, ${r.color}20, ${r.color}40)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                    {r.emoji}
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: r.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.tag}</span>
                    <h3 style={{ fontSize: "0.95rem", marginTop: 6, lineHeight: 1.4, color: "var(--slate-dark)" }}>{r.title}</h3>
                    <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginTop: 6 }}>⏱ {r.readTime} · {r.date}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--slate-dark), var(--slate-mid))", padding: "64px 0", textAlign: "center" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "1.8rem", marginBottom: 12 }}>Ready to Start Your Project?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Get a free quote from a licensed QLD tradie within 24 hours.</p>
          <Link href="/quote" className="btn-gold" id="article-cta">Get a Free Quote →</Link>
        </div>
      </section>
    </>
  );
}

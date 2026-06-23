import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Waterproofing & Home Renovation | CoastHomeHub",
  description:
    "Professional waterproofing, silicone sealing, tiling, and bathroom renovation services across Gold Coast and Sunshine Coast, QLD. Vetted QBCC compliance.",
};

const services = [
  {
    id: "waterproofing",
    title: "Waterproofing",
    subtitle: "Licensed QLD Waterproofing Specialists",
    desc: "Queensland's subtropical climate and heavy summer rainfall put immense hydraulic pressure on your home's structural framing. Wet areas, balconies, and basements must be sealed using premium materials and compliant techniques to prevent timber dry rot, slab damage, and mould growth.",
    technicalSpecs: {
      standards: "AS 3740 (Waterproofing of domestic wet areas) & AS 4654.2 (External)",
      materials: "Class III high-extensibility liquid polyurethane membranes & flexible bond-breaker bands",
      certifications: "Form 16 statutory certificate of inspection issued by a licensed applicator"
    },
    features: [
      "Class III high-extensibility liquid polyurethane waterproofing",
      "Shower recess, hobless, and wet area bathroom membranes",
      "Balcony, terrace, and external deck liquid & sheet membranes",
      "Retaining wall, subterranean basement, and planter box waterproofing",
      "Installation of compliant water stop angles and floor puddle flanges",
      "Comprehensive 10-year structural waterproofing warranty"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $400–$1,200 per area",
  },
  {
    id: "silicone",
    title: "Silicone Sealing",
    subtitle: "Premium Weatherproof Silicone Application",
    desc: "A failing, cracked, or mouldy silicone bead is the primary cause of slow-leak water damage that quietly rots wall studs. We perform full extraction of old sealant, treat the joints for active mould spores, and apply high-modulus, neutral-cure silicone to ensure long-term flexibility and waterproofing.",
    technicalSpecs: {
      standards: "ISO 11600 (Building construction joint sealants)",
      materials: "High-grade sanitiser-resistant, neutral-cure sanitary silicone (anti-fungal)",
      certifications: "Expansion joint movement capacity validation (up to ±25%)"
    },
    features: [
      "Shower screen, bathtub, and vanity basin perimeter sealing",
      "Anti-fungal, sanitiser-resistant bathroom-grade silicone",
      "Kitchen benchtop, splashback, and under-mount sink joints",
      "Window frame, door frame, and external masonry expansion joints",
      "Chemical mould extraction and deep surface preparation",
      "Colour-matched silicone lines to match your grout and tiles"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $150–$600 per job",
  },
  {
    id: "renovation",
    title: "Bathroom Renovation",
    subtitle: "Full Bathroom Refits from Concept to Completion",
    desc: "Transform your dated bathroom into a high-end, functional sanctuary. Our end-to-end renovation service manages all phases of construction. We coordinate structural framing repairs, rough-in plumbing, compliant electrical works, waterproofing membranes, and precision tile laying under strict builder supervision.",
    technicalSpecs: {
      standards: "BCA Part 10.2 (Wet Areas) & AS/NZS 3000 (Electrical Safety)",
      materials: "High moisture-resistant (HMR) cabinetry bases & premium brass or nickel hardware",
      certifications: "QBCC Home Warranty Scheme protection & Form 21 Final Certifier Approval"
    },
    features: [
      "End-to-end design layout consultation & structural engineering",
      "Complete demolition, framing correction (AS 1684), and stud alignment",
      "AS 3740 wet area waterproofing with Form 16 sign-off",
      "Laying sloped screed beds to guarantee 1:60 fall-to-waste drainage",
      "Vanity, smart toilet, frameless glass screen (AS 1288) & tapware installation",
      "Stripe Escrow payment milestone security & builder warranty"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $8,000–$30,000",
  },
  {
    id: "tiling",
    title: "Tiling",
    subtitle: "Professional Floor & Wall Tiling Throughout QLD",
    desc: "Tile laying requires absolute precision to prevent 'lippage' and ensure correct fall-to-waste. Our licensed tilers handle everything from classic ceramic subway tiles to heavy, large-format porcelain sheets. We use flexible adhesives and stain-resistant epoxy grouts for a finish that stands up to daily wet-area use.",
    technicalSpecs: {
      standards: "AS 3958.1 (Guide to the installation of ceramic tiles)",
      materials: "AS 4586 P3/P4 slip-resistance rated tiles & flexible polymer-modified adhesives",
      certifications: "Dry film thickness verification & epoxy grout joint validation"
    },
    features: [
      "Floor and wall tiling for bathrooms, laundries, and entryways",
      "Large-format porcelain sheet laying (600mm x 1200mm and larger)",
      "Hand-mitred external corners (45-degree bevelled edge joints)",
      "Epoxy, acid-resistant grouting to prevent discolouration and mildew",
      "Alfresco dining, pool coping (travertine), and external pathway tiling",
      "Subfloor preparation, leveling, and acoustic underlay installation"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $50–$120 per m²",
  },
  {
    id: "design",
    title: "Design & Spatial Consultation",
    subtitle: "Premium Layout & Compliance Specification Planning",
    desc: "Avoid costly mistakes before construction starts. Our design and spatial planning services combine visual aesthetics with building code realities. We help you choose layouts that keep plumbing costs stable, select materials suited to Queensland's humidity, and specify fixtures that comply with WELS water efficiency benchmarks.",
    technicalSpecs: {
      standards: "AS 6400 (WELS water efficient products rating and labelling)",
      materials: "Natural stone curation, Osmo timber sealers & low-VOC architectural coatings",
      certifications: "Form 15 structural design certificates for wall removals & layout plans"
    },
    features: [
      "Detailed 2D spatial layout drawings & fixture placement check",
      "Curation of material boards: stone, timber (Osmo-sealed), and tile textures",
      "WELS rating planning (optimizing flow rates to save on water bills)",
      "Structural load-bearing wall checks & private certifier coordination advice",
      "Detailed scope-of-work documents for accurate tradie quoting",
      "Virtual design consultation sessions or in-person site walk-throughs"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $150 per session",
  },
];

export default function ServicesPage() {
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
            Our Services
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "white" }}>
            Expert Home Services Across
            <br />
            <span style={{ color: "var(--gold)" }}>Gold Coast to Sunshine Coast</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1.1rem", maxWidth: 560, marginBottom: 36, fontFamily: "Outfit, sans-serif" }}>
            All services are performed by licensed, insured Queensland tradies with years of local experience.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/quote" className="btn-gold" id="services-get-quote" style={{ borderRadius: 4 }}>
              Get a Free Quote
            </Link>
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              {["✦ QBCC Licensed", "✦ Fully Insured", "✦ SEQ Specialists"].map((b) => (
                <span key={b} style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", fontFamily: "Outfit, sans-serif" }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CoastAI nudge */}
      <section style={{ background: "white", padding: "32px 0", borderBottom: "1px solid var(--sand-100)" }}>
        <div className="container-lg">
          <div style={{ display: "flex", gap: 20, alignItems: "center", background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 28px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "2rem", color: "var(--gold)" }}>✦</div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, fontFamily: "Lora, Georgia, serif", fontSize: "1.1rem", color: "var(--slate-dark)" }}>Not sure what layout works best?</div>
              <div style={{ fontSize: "0.875rem", color: "var(--slate-light)", fontFamily: "Outfit, sans-serif" }}>Use our interactive CAD Space Planner on the homepage or lookbook. Arrange fixtures, test AS 3740 clearances, and get a realistic price.</div>
            </div>
            <Link href="/quote" className="btn-primary" style={{ fontSize: "0.875rem", padding: "10px 22px", whiteSpace: "nowrap", borderRadius: 4 }}>
              Start Planning Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Service Sections */}
      <section style={{ background: "var(--off-white)", padding: "64px 0 96px" }}>
        <div className="container-lg">
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {services.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                className="card"
                style={{
                  padding: "0",
                  borderRadius: 4,
                  border: "1px solid var(--sand-300)",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: idx % 2 === 0 ? "1.2fr 0.8fr" : "0.8fr 1.2fr",
                  minHeight: 300,
                  scrollMarginTop: 100,
                }}
              >
                {/* Left/Content block */}
                {idx % 2 !== 0 && (
                  <div style={{ padding: "48px 40px" }}>
                    <ServiceContent service={service} />
                  </div>
                )}
                
                {/* Details / Spec card */}
                <div
                  style={{
                    background: service.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 20,
                    padding: "48px 32px",
                    borderLeft: idx % 2 !== 0 ? `1px solid var(--sand-200)` : undefined,
                    borderRight: idx % 2 === 0 ? `1px solid var(--sand-200)` : undefined,
                  }}
                >
                  <div style={{ fontSize: "2rem", color: "var(--gold)" }}>✦</div>
                  
                  {/* Pricing Badge */}
                  <div
                    style={{
                      background: "white",
                      borderRadius: 4,
                      padding: "14px 20px",
                      textAlign: "center",
                      boxShadow: "var(--shadow-sm)",
                      border: `1px solid var(--sand-300)`,
                      width: "100%",
                      maxWidth: 240
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", color: "var(--slate-light)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, fontFamily: "Outfit, sans-serif" }}>
                      Typical Cost
                    </div>
                    <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--ocean-700)", fontFamily: "Outfit, sans-serif" }}>
                      {service.price}
                    </div>
                  </div>

                  {/* Dynamic Technical Specs Table */}
                  <div style={{ width: "100%", maxWidth: 280, background: "white", border: "1px solid var(--sand-300)", padding: 16, borderRadius: 4, fontSize: "0.74rem", fontFamily: "Outfit, sans-serif" }}>
                    <div style={{ borderBottom: "1px solid var(--sand-200)", paddingBottom: 6, marginBottom: 8 }}>
                      <span style={{ color: "var(--slate-light)", display: "block" }}>Compliance Code</span>
                      <strong style={{ color: "var(--slate-dark)" }}>{service.technicalSpecs.standards}</strong>
                    </div>
                    <div style={{ borderBottom: "1px solid var(--sand-200)", paddingBottom: 6, marginBottom: 8 }}>
                      <span style={{ color: "var(--slate-light)", display: "block" }}>Approved Materials</span>
                      <strong style={{ color: "var(--slate-dark)" }}>{service.technicalSpecs.materials}</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--slate-light)", display: "block" }}>Statutory Form / Check</span>
                      <strong style={{ color: "var(--ocean-700)" }}>{service.technicalSpecs.certifications}</strong>
                    </div>
                  </div>

                  <Link
                    href="/quote"
                    className="btn-primary"
                    style={{ fontSize: "0.85rem", padding: "10px 22px", borderRadius: 4 }}
                  >
                    Book Quote →
                  </Link>
                </div>

                {idx % 2 === 0 && (
                  <div style={{ padding: "48px 40px" }}>
                    <ServiceContent service={service} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .card { grid-template-columns: 1fr !important; }
          }
        `}} />
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#0c2422",
          borderTop: "3px double var(--sand-300)",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "2rem", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Not Sure Which Service You Need?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "1rem", marginBottom: 32, fontFamily: "Outfit, sans-serif" }}>
            Describe your problem and we&apos;ll match you with the right professional — free of charge.
          </p>
          <Link href="/quote" className="btn-gold" id="services-bottom-cta" style={{ borderRadius: 4 }}>
            Get My Free Recommendation →
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceContent({ service }: { service: typeof services[0] }) {
  return (
    <div>
      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "Outfit, sans-serif" }}>
        {service.subtitle}
      </div>
      <h2 style={{ fontSize: "1.8rem", marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>{service.title}</h2>
      <p style={{ color: "var(--slate-light)", lineHeight: 1.7, marginBottom: 24, fontSize: "0.95rem", fontFamily: "Outfit, sans-serif" }}>
        {service.desc}
      </p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, padding: 0 }}>
        {service.features.map((f) => (
          <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.9rem", color: "var(--slate-mid)", fontFamily: "Outfit, sans-serif" }}>
            <span style={{ color: "var(--gold)", fontWeight: 700, marginTop: 1 }}>✦</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

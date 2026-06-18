import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Waterproofing & Home Renovation | CoastHomeHub",
  description:
    "Professional waterproofing, silicone sealing, tiling, and bathroom renovation services across Gold Coast and Sunshine Coast, QLD.",
};

const services = [
  {
    id: "waterproofing",
    icon: "💧",
    title: "Waterproofing",
    subtitle: "Licensed QLD Waterproofing Specialists",
    desc: "Queensland's subtropical climate puts enormous pressure on your home's waterproofing. Whether it's a wet area bathroom, balcony, or roof — professionally applied waterproofing is essential to protect your investment.",
    features: [
      "Bathroom & wet area waterproofing",
      "Balcony & deck membranes",
      "Roof & gutter waterproofing",
      "Retaining wall & basement protection",
      "Compliance with AS 3740 (Australian Standards)",
      "10-year workmanship guarantee",
    ],
    color: "var(--ocean-50)",
    accent: "var(--ocean-400)",
    price: "From $400–$1,200 per area",
  },
  {
    id: "silicone",
    icon: "🔧",
    title: "Silicone Sealing",
    subtitle: "Premium Weatherproof Silicone Application",
    desc: "Cracked, mouldy, or failing silicone can allow water damage that costs thousands to repair. Our licensed team applies premium-grade silicone to all joints, giving you a clean, durable, waterproof seal.",
    features: [
      "Shower and bath silicone renewal",
      "Window and door frame sealing",
      "Kitchen benchtop and splashback joints",
      "External facade and expansion joints",
      "Sanitiser-resistant bathroom-grade silicone",
      "Full mould removal & surface prep included",
    ],
    color: "#f0f9ff",
    accent: "#0891b2",
    price: "From $150–$600 per job",
  },
  {
    id: "renovation",
    icon: "🏡",
    title: "Bathroom Renovation",
    subtitle: "Full Bathroom Refits from Concept to Completion",
    desc: "Transform your outdated bathroom into a modern, functional space. Our end-to-end renovation service handles everything — from design and demolition to waterproofing, tiling, and final fit-out.",
    features: [
      "Full bathroom design consultation",
      "Demolition and strip-out",
      "Waterproofing and screeding",
      "Tiling (floor, walls, feature tiles)",
      "Vanity, toilet, and shower installation",
      "Final waterproofing test certificate",
    ],
    color: "var(--sand-50)",
    accent: "var(--sand-500)",
    price: "From $8,000–$30,000",
  },
  {
    id: "tiling",
    icon: "🧱",
    title: "Tiling",
    subtitle: "Professional Floor & Wall Tiling Throughout QLD",
    desc: "From small bathroom tiling jobs to large format porcelain floors — our licensed tilers deliver precision finishes that last. We work with all tile types including marble, porcelain, ceramic, and stone.",
    features: [
      "Floor and wall tiling",
      "Large format tiles (60cm × 120cm+)",
      "Feature walls and splashbacks",
      "Outdoor alfresco and pool areas",
      "Grout sealing and maintenance",
      "Tile repair and replacement",
    ],
    color: "#fef9f0",
    accent: "#d97706",
    price: "From $50–$120 per m²",
  },
  {
    id: "design",
    icon: "📐",
    title: "Design Consultation",
    subtitle: "2025 Design Trends for Queensland Homes",
    desc: "Not sure what style, materials, or layout works best? Our design consultation service helps you plan your renovation with confidence — with knowledge of current trends, council requirements, and smart budgeting.",
    features: [
      "1-hour in-home consultation",
      "Mood board and material selection",
      "2025 trend recommendations",
      "Budget breakdown and priority planning",
      "Tradie coordination advice",
      "Video or in-person available",
    ],
    color: "#f5f0ff",
    accent: "#7c3aed",
    price: "From $150 per session",
  },
];

export default function ServicesPage() {
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
            Our Services
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 16 }}>
            Expert Home Services Across
            <br />
            <span style={{ color: "var(--ocean-500)" }}>Gold Coast to Sunshine Coast</span>
          </h1>
          <p style={{ color: "var(--slate-light)", fontSize: "1.1rem", maxWidth: 560, marginBottom: 36 }}>
            All services are performed by licensed, insured Queensland tradies with years of local experience.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-primary" id="services-get-quote">
              Get a Free Quote
            </Link>
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              {["✅ QLD Licensed", "🛡️ Fully Insured", "⭐ 5-Star Rated"].map((b) => (
                <span key={b} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--slate-mid)" }}>
                  {b}
                </span>
              ))}
            </div>
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
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: idx % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr",
                  minHeight: 300,
                  scrollMarginTop: 100,
                }}
              >
                {/* Colour block */}
                {idx % 2 !== 0 && (
                  <div style={{ padding: "48px 40px" }}>
                    <ServiceContent service={service} />
                  </div>
                )}
                <div
                  style={{
                    background: service.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 12,
                    padding: "48px 32px",
                    borderLeft: idx % 2 !== 0 ? `1px solid ${service.accent}30` : undefined,
                    borderRight: idx % 2 === 0 ? `1px solid ${service.accent}30` : undefined,
                  }}
                >
                  <div style={{ fontSize: "4rem" }}>{service.icon}</div>
                  <div
                    style={{
                      background: "white",
                      borderRadius: "var(--radius-md)",
                      padding: "16px 20px",
                      textAlign: "center",
                      boxShadow: "var(--shadow-sm)",
                      border: `1px solid ${service.accent}25`,
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", color: "var(--slate-light)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                      Starting Price
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "1rem", color: service.accent }}>
                      {service.price}
                    </div>
                  </div>
                  <Link
                    href="/quote"
                    className="btn-primary"
                    style={{ fontSize: "0.85rem", padding: "10px 22px" }}
                  >
                    Get Quote →
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
        <style>{`
          @media (max-width: 768px) {
            .card { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-400))",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "2rem", marginBottom: 12 }}>
            Not Sure Which Service You Need?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: 32 }}>
            Describe your problem and we&apos;ll match you with the right professional — free of charge.
          </p>
          <Link href="/quote" className="btn-gold" id="services-bottom-cta">
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
      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: service.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
        {service.subtitle}
      </div>
      <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>{service.title}</h2>
      <p style={{ color: "var(--slate-light)", lineHeight: 1.7, marginBottom: 24, fontSize: "0.95rem" }}>
        {service.desc}
      </p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {service.features.map((f) => (
          <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.9rem", color: "var(--slate-mid)" }}>
            <span style={{ color: service.accent, fontWeight: 700, marginTop: 1 }}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Expert Trade Services | CoastHomeHub",
  description:
    "Professional carpentry, plumbing, electrical, tiling, waterproofing, and painting services across Gold Coast, Brisbane, and Sunshine Coast, QLD. Vetted QBCC compliance.",
};

const services = [
  {
    id: "carpentry",
    title: "Building & Carpentry",
    subtitle: "Licensed QLD Carpentry & Structural Services",
    desc: "High-quality framing, structural timber works, decks, and structural wall removals. All structural carpentry complies strictly with QLD building regulations and timber standards.",
    technicalSpecs: {
      standards: "AS 1684 (Residential timber-framed construction) & NCC Series",
      materials: "F27 kiln-dried hardwood, H3/H4 treated framing timber, stainless steel fixings",
      certifications: "Form 15 structural design certificate by licensed building certifier"
    },
    features: [
      "Structural framing correction, wall removal & load-bearing checks",
      "Custom hardwood and composite deck builds with compliance warranty",
      "Pergola, gazebo, and alfresco outdoor living builds",
      "Window and door installation including framing modifications",
      "QBCC warranty protection on all structural carpentry works"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "Custom Quote / Project Rates",
  },
  {
    id: "plumbing",
    title: "Plumbing & Gasfitting",
    subtitle: "Licensed QLD Plumbing & Drainage Contractors",
    desc: "End-to-end plumbing rough-in, drainage, gas fitting, and appliance connection services. All plumbing is performed by fully qualified, QBCC-licensed plumbers.",
    technicalSpecs: {
      standards: "AS/NZS 3500 (Plumbing and drainage standards)",
      materials: "Premium copper pipework, certified PEX piping, brass press fittings",
      certifications: "Form 1 compliance certificate submitted to council/certifier"
    },
    features: [
      "Rough-in pipework for kitchens, bathrooms, and laundries",
      "Hot water system installs, repairs, and thermal efficiency upgrades",
      "Gas line installation and safety leak testing",
      "Drainage checks, sewer repairs, and waste line rerouting",
      "Fixture fit-offs (toilets, basins, bath mixers, sinks)"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $180 (Service call / fit-offs)",
  },
  {
    id: "electrical",
    title: "Electrical & Smart Home",
    subtitle: "Licensed QLD Electricians & Automation",
    desc: "From switchboard upgrades to high-end architectural lighting layouts and smart automation. Safe, certified electrical works to power your home.",
    technicalSpecs: {
      standards: "AS/NZS 3000 (Wiring Rules) & electrical safety standards",
      materials: "Low-smoke zero-halogen cabling, IPX4+ wet area safety switches",
      certifications: "Electrical Safety Certificate of Compliance (COoC)"
    },
    features: [
      "Switchboard safety upgrades, RCD protection & smart metering",
      "Architectural lighting layout design and energy-efficient LED installs",
      "Dedicated high-amp lines (induction cooktops, EV chargers)",
      "Smart home automation, networking, and home theatre installs",
      "Kitchen/bathroom safety outlets and mechanical ventilation"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $150 (Service call / diagnostics)",
  },
  {
    id: "tiling",
    title: "Tiling & Waterproofing",
    subtitle: "Complete Wall/Floor Tiling & AS 3740 Waterproofing",
    desc: "High-end wall and floor tiling combined with certified wet-area waterproofing. We seal wet areas with premium Class III liquid membranes and lay tiles with perfect alignment and screeding.",
    technicalSpecs: {
      standards: "AS 3740 (Wet area waterproofing) & AS 3958.1 (Tiling installation)",
      materials: "Class III high-extensibility polyurethane membranes & epoxy stain-free grout",
      certifications: "Form 16 statutory certificate of inspection issued by licensed applicator"
    },
    features: [
      "Certified wet-area waterproofing for showers, baths, and laundries",
      "Laying screed beds to guarantee 1:60 fall-to-waste drainage",
      "Large-format porcelain, ceramic, natural stone, and terrazzo tiles",
      "Stain-resistant, acid-proof epoxy grout for long-term protection",
      "Shower screen and bath perimeter sanitiser-resistant silicone sealing"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $50 per m² / area estimates",
  },
  {
    id: "painting",
    title: "Painting & Plastering",
    subtitle: "Premium Internal & External Architectural Finishes",
    desc: "Professional plasterboard installation, patching, and multi-coat paint finishes. Protect and elevate your home with premium coatings suited to the QLD climate.",
    technicalSpecs: {
      standards: "AS/NZS 2311 (Guide to the painting of buildings) & plaster standards",
      materials: "Low-VOC, anti-mould wash-and-wear architectural paint coatings",
      certifications: "Lippage, flatness, and paint film thickness verification"
    },
    features: [
      "Full internal and external residential painting services",
      "Plasterboard gyprock hanging, jointing, flushing, and cornices",
      "Deep paint prep, active mould treatment, and peeling remediation",
      "Premium timber decking restoration, staining, and oiling",
      "Feature walls, texture coatings, and wallpaper installations"
    ],
    color: "var(--off-white)",
    accent: "var(--ocean-700)",
    price: "From $40 per m² / room estimates",
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

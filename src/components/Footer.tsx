import Link from "next/link";

const services = [
  { label: "Waterproofing", href: "/services#waterproofing" },
  { label: "Silicone Sealing", href: "/services#silicone" },
  { label: "Home Renovation", href: "/services#renovation" },
  { label: "Design Consultation", href: "/services#design" },
];

const resources = [
  { label: "Magazine", href: "/magazine" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Project Stories", href: "/projects" },
  { label: "Service Areas", href: "/locations" },
  { label: "DIY Guides", href: "/blog/diy" },
  { label: "AI Planner", href: "/planner" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--slate-dark)",
        color: "rgba(255,255,255,0.75)",
        paddingTop: "72px",
        paddingBottom: "32px",
      }}
    >
      <div className="container-lg">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "48px",
            paddingBottom: "48px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "var(--slate-mid)",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  color: "white"
                }}
              >
                ✦
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "white" }}>
                  CoastHome<span style={{ color: "var(--ocean-300)" }}>Hub</span>
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--ocean-300)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  South East QLD
                </div>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Queensland&apos;s trusted home improvement platform. Connecting homeowners with licensed tradies across South East QLD — Brisbane, Gold Coast and the Sunshine Coast.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 4,
                padding: "8px 14px",
                fontSize: "0.8rem",
              }}
            >
              <span style={{ color: "var(--gold)" }}>✦</span>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>Licensed builder — QBCC verified</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "white", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "var(--transition-fast)",
                    }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: "white", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
              Resources
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {resources.map((r) => (
                <li key={r.label}>
                  <Link
                    href={r.href}
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "white", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
              Contact EIJ Construction
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { text: "South East QLD — Brisbane · Gold Coast · Sunshine Coast" },
                { text: "info@coasthomehub.com.au" },
                { text: "Live chat — ask us anything, anytime" },
                { text: "Mon–Sat: 7am–5pm" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--gold)" }}>✦</span>
                  <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)" }}>{item.text}</span>
                </div>
              ))}
            </div>
            <Link href="/quote" className="btn-primary" style={{ marginTop: 20, display: "inline-flex", fontSize: "0.85rem", padding: "10px 20px" }}>
              Get Free Quote
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            © 2026 CoastHomeHub & EIJ Construction Pty Ltd. All rights reserved. ABN 79 674 743 545 · ACN 674 743 545
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "About Us", href: "/about" },
            ].map((t) => (
              <Link key={t.label} href={t.href} style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

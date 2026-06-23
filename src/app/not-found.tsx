import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--off-white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 64px",
        textAlign: "center",
        borderBottom: "3px double var(--sand-300)"
      }}
    >
      <div style={{ maxWidth: 520 }}>
        {/* Big 404 */}
        <div
          style={{
            fontSize: "clamp(6rem, 20vw, 10rem)",
            fontWeight: 500,
            lineHeight: 1,
            color: "var(--ocean-700)",
            fontFamily: "Lora, Georgia, serif",
            marginBottom: 16,
            letterSpacing: "-0.04em",
          }}
        >
          404
        </div>
        <div style={{ fontSize: "1.5rem", color: "var(--gold)", marginBottom: 16 }}>✦</div>
        <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", marginBottom: 16, fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "var(--slate-dark)" }}>
          Oops — this page doesn&apos;t exist!
        </h1>
        <p style={{ color: "var(--slate-light)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 40, fontFamily: "Outfit, sans-serif" }}>
          Looks like this page has moved or never existed. Try heading back to the homepage or browse our design guides — maybe you&apos;ll find something even better.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" id="not-found-home" style={{ borderRadius: 4 }}>
            ← Back to Home
          </Link>
          <Link href="/blog" className="btn-secondary" id="not-found-blog" style={{ borderRadius: 4 }}>
            Browse Design Guides
          </Link>
        </div>
        <div style={{ marginTop: 48, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { href: "/services", label: "Services" },
            { href: "/inspiration", label: "Inspiration" },
            { href: "/projects", label: "Projects" },
            { href: "/quote", label: "Get a Quote" },
            { href: "/tradies", label: "For Tradies" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: "0.875rem", color: "var(--ocean-600)", fontWeight: 700, textDecoration: "none", fontFamily: "Outfit, sans-serif" }}>
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

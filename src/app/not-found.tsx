import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, var(--ocean-50) 0%, var(--sand-50) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 64px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 520 }}>
        {/* Big 404 */}
        <div
          style={{
            fontSize: "clamp(6rem, 20vw, 10rem)",
            fontWeight: 900,
            lineHeight: 1,
            background: "linear-gradient(135deg, var(--ocean-400), var(--ocean-200))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 16,
            letterSpacing: "-0.04em",
          }}
        >
          404
        </div>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🏠</div>
        <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", marginBottom: 12 }}>
          Oops — this page doesn&apos;t exist!
        </h1>
        <p style={{ color: "var(--slate-light)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 40 }}>
          Looks like this page has moved or never existed. Try heading back to the homepage or browse our design guides — maybe you&apos;ll find something even better.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" id="not-found-home">
            ← Back to Home
          </Link>
          <Link href="/blog" className="btn-secondary" id="not-found-blog">
            Browse Design Guides
          </Link>
        </div>
        <div style={{ marginTop: 48, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { href: "/services", label: "Services" },
            { href: "/gallery", label: "Gallery" },
            { href: "/quote", label: "Get a Quote" },
            { href: "/tradies", label: "For Tradies" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: "0.875rem", color: "var(--ocean-500)", fontWeight: 600, textDecoration: "none" }}>
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

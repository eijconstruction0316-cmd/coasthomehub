import Link from "next/link";

const planDetails: Record<string, { name: string; price: number; tagline: string }> = {
  founding: { name: "Founding Member", price: 149, tagline: "Unlimited matching leads for launch partners" },
  growth: { name: "Growth", price: 249, tagline: "Up to 30 leads/month" },
  elite: { name: "Elite", price: 399, tagline: "Unlimited matching leads + Portfolio uploads" },
  starter: { name: "Starter", price: 99, tagline: "Up to 5 leads/month" },
  pro: { name: "Pro", price: 179, tagline: "Up to 20 leads/month" },
  premium: { name: "Premium", price: 299, tagline: "Unlimited leads" },
};


function safeDecodeParam(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  try {
    return decodeURIComponent(value).slice(0, 120);
  } catch {
    return fallback;
  }
}

export default async function RegisterSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; name?: string; business?: string; email?: string }>;
}) {
  const params = await searchParams;
  const plan = planDetails[params.plan || "founding"] || planDetails.founding;
  const name = safeDecodeParam(params.name, "there");
  const business = safeDecodeParam(params.business, "your business");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--off-white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 64px",
        borderBottom: "3px double var(--sand-300)"
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        {/* Editorial Success Mark */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "var(--ocean-700)",
            border: "1px solid var(--sand-300)",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "var(--gold)",
            margin: "0 auto 28px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          ✦
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", marginBottom: 16, color: "var(--slate-dark)", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
          Welcome to CoastHomeHub, {name}!
        </h1>

        <p style={{ color: "var(--slate-light)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 32, fontFamily: "Outfit, sans-serif" }}>
          <strong>{business}</strong> has been registered on the{" "}
          <strong style={{ color: "var(--ocean-700)" }}>
            {plan.name} Plan
          </strong>
          . We&apos;re verifying your QBCC licence and your profile will go live within <strong>24 hours</strong>.
        </p>

        {/* Summary card */}
        <div
          style={{
            background: "white",
            borderRadius: 4,
            padding: "28px 32px",
            border: "1px solid var(--sand-300)",
            marginBottom: 32,
            boxShadow: "var(--shadow-sm)",
            textAlign: "left",
          }}
        >
          <h3 style={{ fontSize: "0.8rem", color: "var(--slate-light)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16, fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
            ✦ Membership Summary
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Plan", `${plan.name} — ${plan.tagline}`],
              ["First Month", `$${Math.round(plan.price * 0.5)} AUD (50% launch discount)`],
              ["From Month 2", `$${plan.price}/month`],
              ["Confirmation Email", "Sent to your registered address"],
              ["Profile Live", "Within 24 hours after licence verification"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 16, alignItems: "flex-start", fontFamily: "Outfit, sans-serif" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--slate-light)", minWidth: 140, fontWeight: 700 }}>{k}:</span>
                <span style={{ fontSize: "0.85rem", color: "var(--slate-dark)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div
          style={{
            background: "var(--ocean-700)",
            border: "1px solid var(--sand-300)",
            borderRadius: 4,
            padding: "24px 28px",
            marginBottom: 32,
            textAlign: "left",
            color: "white",
            boxShadow: "var(--shadow-md)"
          }}
        >
          <h3 style={{ color: "white", fontSize: "1.1rem", marginBottom: 14, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>✦ What happens next</h3>
          <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "We verify your QBCC licence number (within 24 hours)",
              "Your profile goes live and leads start flowing in",
              "You'll get an SMS + email for every new lead in your area",
              "Our team will call you within 1 week for an onboarding check-in",
            ].map((step) => (
              <li key={step} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, fontFamily: "Outfit, sans-serif" }}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" id="success-home" style={{ borderRadius: 4 }}>
            Back to Home
          </Link>
          <Link href="/tradies" className="btn-secondary" id="success-tradies" style={{ borderRadius: 4 }}>
            Tradie Hub →
          </Link>
        </div>

        <p style={{ marginTop: 24, fontSize: "0.8rem", color: "var(--slate-light)", fontFamily: "Outfit, sans-serif" }}>
          Questions? Email{" "}
          <a href="mailto:info@coasthomehub.com.au" style={{ color: "var(--ocean-700)", fontWeight: 700 }}>
            info@coasthomehub.com.au
          </a>{" "}
          or use the live chat on our site.
        </p>
      </div>
    </div>
  );
}

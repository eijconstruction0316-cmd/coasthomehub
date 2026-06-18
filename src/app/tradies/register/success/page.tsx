import Link from "next/link";

const planDetails: Record<string, { name: string; price: number; tagline: string }> = {
  starter: { name: "Starter", price: 99, tagline: "Up to 5 leads/month" },
  pro: { name: "Pro", price: 179, tagline: "Up to 20 leads/month" },
  premium: { name: "Premium", price: 299, tagline: "Unlimited leads" },
};

export default async function RegisterSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; name?: string; business?: string; email?: string }>;
}) {
  const params = await searchParams;
  const plan = planDetails[params.plan || "pro"] || planDetails.pro;
  const name = params.name || "there";
  const business = params.business || "your business";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, var(--ocean-50) 0%, var(--sand-50) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 64px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        {/* Animated tick */}
        <div
          style={{
            width: 96,
            height: 96,
            background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            margin: "0 auto 28px",
            boxShadow: "0 8px 32px rgba(31,122,114,0.35)",
          }}
        >
          ✅
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)", marginBottom: 12, color: "var(--ocean-600)" }}>
          Welcome to CoastHomeHub, {decodeURIComponent(name)}!
        </h1>

        <p style={{ color: "var(--slate-light)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 32 }}>
          <strong>{decodeURIComponent(business)}</strong> has been registered on the{" "}
          <strong style={{ color: plan.name === "Premium" ? "var(--gold)" : "var(--ocean-500)" }}>
            {plan.name} Plan
          </strong>
          . We&apos;re verifying your QBCC licence and your profile will go live within <strong>24 hours</strong>.
        </p>

        {/* Summary card */}
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "28px 32px",
            border: "1px solid var(--sand-200)",
            marginBottom: 32,
            boxShadow: "var(--shadow-md)",
            textAlign: "left",
          }}
        >
          <h3 style={{ fontSize: "0.85rem", color: "var(--slate-light)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
            Membership Summary
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Plan", `${plan.name} — ${plan.tagline}`],
              ["First Month", `$${Math.round(plan.price * 0.5)} AUD (50% launch discount)`],
              ["From Month 2", `$${plan.price}/month`],
              ["Confirmation Email", "Sent to your registered address"],
              ["Profile Live", "Within 24 hours after licence verification"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--slate-light)", minWidth: 140, fontWeight: 600 }}>{k}:</span>
                <span style={{ fontSize: "0.85rem", color: "var(--slate-dark)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
            marginBottom: 32,
            textAlign: "left",
            color: "white",
          }}
        >
          <h3 style={{ color: "white", fontSize: "1rem", marginBottom: 14 }}>✅ What happens next</h3>
          <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "We verify your QBCC licence number (within 24 hours)",
              "Your profile goes live and leads start flowing in",
              "You'll get an SMS + email for every new lead in your area",
              "Our team will call you within 1 week for an onboarding check-in",
            ].map((step) => (
              <li key={step} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" id="success-home">
            Back to Home
          </Link>
          <Link href="/tradies" className="btn-secondary" id="success-tradies">
            Tradie Hub →
          </Link>
        </div>

        <p style={{ marginTop: 24, fontSize: "0.8rem", color: "var(--slate-light)" }}>
          Questions? Email{" "}
          <a href="mailto:info@eijconstruction.com.au" style={{ color: "var(--ocean-500)", fontWeight: 600 }}>
            info@eijconstruction.com.au
          </a>{" "}
          or call +61 (0) XXX XXX XXX
        </p>
      </div>
    </div>
  );
}

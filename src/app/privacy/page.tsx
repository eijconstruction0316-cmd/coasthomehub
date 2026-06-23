import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CoastHomeHub",
  description: "CoastHomeHub Privacy Policy — how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988.",
};

export default function PrivacyPage() {
  const lastUpdated = "18 June 2025";
  return (
    <>
      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", paddingTop: 130, paddingBottom: 54 }}>
        <div className="container-md">
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.05)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>Legal</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 12, color: "white", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>Privacy Policy</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Outfit, sans-serif" }}>Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 0 96px" }}>
        <div className="container-md">
          <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "20px 24px", marginBottom: 40, fontFamily: "Outfit, sans-serif" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--slate-mid)", margin: 0, lineHeight: 1.7 }}>
              <strong>Summary:</strong> We collect your name, email, phone, and job details only to connect you with qualified tradies and operate our platform. We never sell your data. You can request deletion at any time by emailing us.
            </p>
          </div>

          {[
            {
              title: "1. Who We Are",
              content: `CoastHomeHub is operated by EIJ Construction Pty Ltd (ABN 79 674 743 545, ACN 674 743 545), a Queensland-based company. Our platform connects Australian homeowners with licensed local trade professionals.

Contact: info@coasthomehub.com.au`,
            },
            {
              title: "2. Information We Collect",
              content: `We collect information you provide directly to us, including:

• Homeowners: Name, email address, phone number, property address, job descriptions, and photos you upload when requesting quotes.
• Tradies: Business name, ABN, Queensland licence number, contact details, service categories, and payment information when registering.
• All users: IP address, browser type, pages visited, and cookies (for site functionality and analytics).

We do not collect sensitive information such as health records, financial account details beyond payment processing, or government ID numbers beyond your ABN and licence number.`,
            },
            {
              title: "3. How We Use Your Information",
              content: `Your information is used to:

• Match homeowners with qualified tradies based on location and job type
• Send quote requests and lead notifications to registered tradies
• Process subscription payments for tradie memberships
• Send transactional emails (quote confirmations, registration verification)
• Improve our platform through analytics
• Comply with legal obligations in Australia

We will not use your information for unsolicited marketing without your explicit consent.`,
            },
            {
              title: "4. Who We Share Your Information With",
              content: `We share limited information with:

• Licensed tradies on our platform: When you submit a quote request, your name, contact details, job description and photos are shared with up to 3 matched tradies.
• Payment processors: Stripe Inc. processes subscription payments. We do not store full credit card details on our servers.
• Analytics providers: We use Google Analytics (anonymised) to understand how our site is used.
• Legal authorities: If required by Australian law, court order, or to prevent fraud.

We do not sell, rent, or trade your personal information to third parties for marketing purposes.`,
            },
            {
              title: "5. Data Retention",
              content: `We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by emailing info@coasthomehub.com.au. We will respond within 30 days.

Some information may be retained for up to 7 years to comply with Australian tax and accounting obligations.`,
            },
            {
              title: "6. Cookies",
              content: `We use essential cookies to operate our website (session management, form security) and optional analytics cookies (Google Analytics) to improve the site.

You may disable cookies in your browser settings, though this may affect site functionality. On first visit, we display a cookie consent notice. You can withdraw consent at any time.`,
            },
            {
              title: "7. Security",
              content: `We implement industry-standard security measures including SSL/TLS encryption for all data transmitted to and from our website. Payment data is processed by Stripe and never stored on our servers.

No method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password for any accounts created on our platform.`,
            },
            {
              title: "8. Your Rights (Australian Privacy Act 1988)",
              content: `Under the Australian Privacy Act 1988 and Australian Privacy Principles (APPs), you have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your data (subject to legal retention obligations)
• Complain about a breach of the Australian Privacy Principles

To exercise any of these rights, contact us at info@coasthomehub.com.au. If you are unsatisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au.`,
            },
            {
              title: "9. Changes to This Policy",
              content: `We may update this Privacy Policy from time to time. We will notify registered users of material changes via email. The "Last updated" date at the top of this page reflects the most recent version.

Continued use of our platform after changes are posted constitutes your acceptance of the updated policy.`,
            },
            {
              title: "10. Contact Us",
              content: `For any privacy-related questions or requests:

EIJ Construction Pty Ltd
Email: info@coasthomehub.com.au
Address: Brisbane, QLD, Australia`,
            },
          ].map((section) => (
            <div key={section.title} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid var(--sand-300)" }}>
              <h2 style={{ fontSize: "1.25rem", marginBottom: 16, color: "var(--slate-dark)", fontFamily: "Lora, Georgia, serif", fontWeight: 600 }}>{section.title}</h2>
              <div style={{ whiteSpace: "pre-line", fontSize: "0.9rem", color: "var(--slate-mid)", lineHeight: 1.8, fontFamily: "Outfit, sans-serif" }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

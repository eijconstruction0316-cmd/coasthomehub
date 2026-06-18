import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CoastHomeHub",
  description: "CoastHomeHub Terms of Service — terms and conditions for homeowners and trade businesses using our platform.",
};

export default function TermsPage() {
  const lastUpdated = "18 June 2025";
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, var(--sand-50) 0%, var(--ocean-50) 100%)", paddingTop: 120, paddingBottom: 48 }}>
        <div className="container-md">
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Legal</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", marginBottom: 12 }}>Terms of Service</h1>
          <p style={{ color: "var(--slate-light)" }}>Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 0 96px" }}>
        <div className="container-md">
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "var(--radius-md)", padding: "20px 24px", marginBottom: 40 }}>
            <p style={{ fontSize: "0.9rem", color: "#9a3412", margin: 0, lineHeight: 1.7 }}>
              <strong>Important:</strong> By using CoastHomeHub, you agree to these Terms. Please read them carefully. These Terms govern both homeowners (Free Users) and trade businesses (Tradie Members).
            </p>
          </div>

          {[
            {
              title: "1. About CoastHomeHub",
              content: `CoastHomeHub is an online platform operated by EIJ Construction Pty Ltd (ABN: XX XXX XXX XXX) ("we", "us", "our"). The platform connects Queensland homeowners ("Homeowners") with licensed trade professionals ("Tradies") for home improvement projects.

CoastHomeHub is a referral platform only. We are not a party to any contract between Homeowners and Tradies, and we do not guarantee the quality, timing, or outcome of any services arranged through our platform.`,
            },
            {
              title: "2. Eligibility",
              content: `To use CoastHomeHub you must:
• Be at least 18 years of age
• Be an Australian resident or hold a valid Australian business registration (for Tradies)
• Provide accurate and complete information during registration

Tradies must additionally hold a valid Queensland Building and Construction Commission (QBCC) licence (or applicable trade licence) for all services they offer on the platform.`,
            },
            {
              title: "3. Homeowner Terms",
              content: `As a Homeowner using CoastHomeHub, you agree to:

• Provide accurate descriptions of work required, including photos where requested
• Respond to tradie contact within a reasonable timeframe
• Enter into any contract for work directly with the Tradie (CoastHomeHub is not a party)
• Not submit false, misleading, or spam quote requests
• Treat all Tradies with respect and professionalism

Quote requests are free of charge. CoastHomeHub will share your contact details and job description with up to 3 matched Tradies.`,
            },
            {
              title: "4. Tradie Member Terms",
              content: `As a Tradie Member, you agree to:

• Hold and maintain a valid QBCC licence (or applicable licence) for all services listed
• Respond to leads within 24 hours where possible
• Provide accurate quotes and not engage in misleading pricing practices
• Complete work to the standard required by Australian Consumer Law
• Maintain current public liability insurance of at least $5,000,000 AUD
• Not contact leads for purposes other than the job requested
• Not circumvent the platform to avoid subscription fees (e.g. referring customers back to you for future jobs is fine; discouraging use of the platform is not)

We reserve the right to suspend or terminate Tradie accounts for licence lapses, customer complaints, or breach of these Terms.`,
            },
            {
              title: "5. Subscriptions & Payments",
              content: `Tradie subscriptions are billed monthly via Stripe. Prices are shown in Australian Dollars (AUD) exclusive of GST.

• Subscriptions auto-renew monthly unless cancelled before the next billing date
• Cancellations take effect at the end of the current billing period — no partial refunds
• If your payment fails, we will retry 3 times over 7 days before suspending your account
• Introductory pricing (e.g. 50% off first month) applies to new members only, one offer per ABN

We reserve the right to change subscription pricing with 30 days notice to registered members.`,
            },
            {
              title: "6. Refund Policy",
              content: `Subscription fees are non-refundable except where:
• You cancel within 48 hours of initial registration and have received no leads
• We fail to verify your licence and your account is not activated
• There is a technical error resulting in duplicate charges

Refund requests must be submitted in writing to info@eijconstruction.com.au within 7 days of the charge.

Under Australian Consumer Law, our services come with guarantees that cannot be excluded. Nothing in these Terms limits your rights under the Australian Consumer Law.`,
            },
            {
              title: "7. Intellectual Property",
              content: `All content on CoastHomeHub — including text, design, logos, blog articles, and code — is owned by EIJ Construction Pty Ltd unless otherwise indicated.

You may not reproduce, distribute, or use our content for commercial purposes without written permission.

By uploading photos or other content to our platform, you grant us a non-exclusive licence to display that content on our platform and in marketing materials (with attribution where applicable). You retain ownership of your content.`,
            },
            {
              title: "8. Limitation of Liability",
              content: `CoastHomeHub is a referral platform. We do not:
• Employ, supervise, or control Tradies
• Guarantee the quality or outcome of any work arranged through our platform
• Verify every piece of information provided by Tradies beyond licence number checks

To the maximum extent permitted by Australian law, our total liability to you for any claim arising from use of our platform is limited to the subscription fees you paid in the 3 months prior to the claim.

We are not liable for indirect, consequential, or incidental damages, including lost profits or data.`,
            },
            {
              title: "9. Dispute Resolution",
              content: `If you have a dispute with a Tradie or Homeowner you connected with through our platform, we encourage you to resolve it directly first.

If you have a dispute with CoastHomeHub:
1. Contact us at info@eijconstruction.com.au — we aim to resolve disputes within 10 business days
2. If unresolved, disputes will be subject to the laws of Queensland, Australia
3. Both parties agree to attempt mediation before commencing legal proceedings`,
            },
            {
              title: "10. Changes to These Terms",
              content: `We may update these Terms at any time. Material changes will be notified to registered users via email with at least 14 days notice. Your continued use of the platform after changes take effect constitutes acceptance.

If you do not accept the updated Terms, you may cancel your account before the effective date.

Contact: info@eijconstruction.com.au | +61 (0) XXX XXX XXX
EIJ Construction Pty Ltd, Brisbane QLD Australia`,
            },
          ].map((section) => (
            <div key={section.title} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid var(--sand-200)" }}>
              <h2 style={{ fontSize: "1.2rem", marginBottom: 16, color: "var(--slate-dark)" }}>{section.title}</h2>
              <div style={{ whiteSpace: "pre-line", fontSize: "0.9rem", color: "var(--slate-mid)", lineHeight: 1.8 }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

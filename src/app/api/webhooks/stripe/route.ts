import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    // ── New subscription started ──────────────────────────────────
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { businessName, contactName, plan, licenceNumber } = session.metadata || {};
      const email = session.customer_details?.email;

      if (email) {
        // Welcome email to new tradie
        await resend.emails.send({
          from: process.env.FROM_EMAIL || "noreply@coasthomehub.com.au",
          to: email,
          subject: `🎉 Welcome to CoastHomeHub — ${businessName || "Your Business"} is registered!`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f5f0e8; padding: 24px; border-radius: 12px;">
              <div style="background: linear-gradient(135deg, #1f7a72, #3d9990); padding: 28px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🔧</div>
                <h1 style="color: white; margin: 0; font-size: 1.4rem;">Welcome to CoastHomeHub!</h1>
                <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 0.9rem;">Your ${plan || "Pro"} membership is now active</p>
              </div>

              <div style="background: white; border-radius: 10px; padding: 24px; margin-bottom: 16px;">
                <p style="color: #1a2332; font-size: 1rem; margin: 0 0 16px;">Hi <strong>${contactName || "there"}</strong>,</p>
                <p style="color: #4a607a; line-height: 1.7; margin: 0 0 16px;">
                  Your business <strong>${businessName}</strong> is now listed on CoastHomeHub. We&apos;re verifying your QBCC licence number (<strong>${licenceNumber}</strong>) and your profile will go live within 24 hours.
                </p>

                <div style="background: #f0f9f8; border: 1px solid #a8d8d3; border-radius: 8px; padding: 16px 20px; margin: 16px 0;">
                  <strong style="color: #155e58; font-size: 0.9rem;">What happens next:</strong>
                  <ol style="color: #1f7a72; margin: 10px 0 0; padding-left: 20px; font-size: 0.875rem; line-height: 2;">
                    <li>We verify your QLD licence (within 24 hours)</li>
                    <li>Your profile goes live on the platform</li>
                    <li>First lead notification arrives within 48 hours</li>
                    <li>Our team will call you to complete onboarding</li>
                  </ol>
                </div>

                <p style="color: #4a607a; line-height: 1.7; margin: 16px 0 0; font-size: 0.875rem;">
                  Questions? Reply to this email or call us at <a href="tel:+61XXXXXXXXX" style="color: #1f7a72;">+61 (0) XXX XXX XXX</a>
                </p>
              </div>

              <p style="color: #9c7d55; font-size: 0.78rem; text-align: center;">
                © 2025 CoastHomeHub & EIJ Construction · coasthomehub.com.au
              </p>
            </div>
          `,
        });

        // Notify admin of new registration
        await resend.emails.send({
          from: process.env.FROM_EMAIL || "noreply@coasthomehub.com.au",
          to: process.env.CONTACT_EMAIL || "info@eijconstruction.com.au",
          subject: `💳 New Tradie Registration: ${businessName} (${plan})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #1f7a72;">New Tradie Registered</h2>
              <table style="width:100%; border-collapse: collapse; background: #f5f0e8; border-radius: 8px; padding: 16px;">
                ${[
                  ["Business", businessName],
                  ["Contact", contactName],
                  ["Email", email],
                  ["Plan", plan],
                  ["Licence #", licenceNumber],
                  ["Session ID", session.id],
                ]
                  .map(
                    ([k, v]) =>
                      `<tr><td style="padding:8px; font-weight:600; color:#4a607a; width:120px;">${k}</td><td style="padding:8px; color:#1a2332;">${v}</td></tr>`
                  )
                  .join("")}
              </table>
              <p style="color:#4a607a; margin-top:16px; font-size:0.875rem;">
                ✅ Action required: Verify QBCC licence and activate profile in dashboard.
              </p>
            </div>
          `,
        });
      }
      break;
    }

    // ── Subscription cancelled ────────────────────────────────────
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;

      if (customer.email) {
        await resend.emails.send({
          from: process.env.FROM_EMAIL || "noreply@coasthomehub.com.au",
          to: customer.email,
          subject: "Your CoastHomeHub subscription has been cancelled",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
              <h2>Subscription Cancelled</h2>
              <p>Hi ${customer.name || "there"},</p>
              <p>Your CoastHomeHub subscription has been cancelled. Your profile will remain visible until the end of your current billing period.</p>
              <p>We'd love to have you back. <a href="${process.env.NEXT_PUBLIC_APP_URL}/tradies/register">Re-subscribe anytime →</a></p>
              <p style="color:#4a607a; font-size:0.875rem;">— The CoastHomeHub Team</p>
            </div>
          `,
        });
      }
      break;
    }

    // ── Payment failed ─────────────────────────────────────────────
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const custEmail = invoice.customer_email;

      if (custEmail) {
        await resend.emails.send({
          from: process.env.FROM_EMAIL || "noreply@coasthomehub.com.au",
          to: custEmail,
          subject: "⚠️ Payment failed — CoastHomeHub",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #dc2626;">Payment Failed</h2>
              <p>We couldn't process your CoastHomeHub subscription payment. Please update your payment method to keep your profile active.</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/tradies" style="display: inline-block; background: #1f7a72; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 700; margin-top: 12px;">
                Update Payment Method →
              </a>
              <p style="color:#4a607a; font-size:0.875rem; margin-top:16px;">We'll retry the payment 3 times over 7 days before suspending your account.</p>
            </div>
          `,
        });
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

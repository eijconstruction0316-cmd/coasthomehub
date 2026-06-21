import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

const priceIds: Record<string, string | undefined> = {
  founding: process.env.STRIPE_PRICE_FOUNDING,
  // legacy plan IDs kept for backward-compatibility with any existing Stripe webhooks
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  premium: process.env.STRIPE_PRICE_PREMIUM,
};

const planDetails: Record<string, { name: string; price: number }> = {
  founding: { name: "Founding Member", price: 149 },
  starter: { name: "Starter", price: 99 },
  pro: { name: "Pro", price: 179 },
  premium: { name: "Premium", price: 299 },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      plan,
      businessName,
      email,
      contactName,
      abn,
      licenceNumber,
      phone,
    } = body;

    const priceId = priceIds[plan];
    const details = planDetails[plan];

    if (!details) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3031";

    // Block checkout if Stripe price ID is not properly configured
    if (!priceId || !priceId.startsWith("price_")) {
      console.error(`Stripe price ID not configured for plan: ${plan}`);
      return NextResponse.json(
        { error: "Payment is not configured yet. Please contact us at info@coasthomehub.com.au to register." },
        { status: 503 }
      );
    }

    // Create or retrieve Stripe customer
    let customer;
    const existing = await stripe.customers.list({ email, limit: 1 });
    if (existing.data.length > 0) {
      customer = existing.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name: contactName,
        metadata: {
          businessName,
          abn,
          licenceNumber,
          phone,
          plan,
        },
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/tradies/register/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${appUrl}/tradies/register?plan=${plan}&cancelled=true`,
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 0,
        metadata: {
          businessName,
          abn,
          licenceNumber,
          plan,
        },
      },
      metadata: {
        businessName,
        contactName,
        abn,
        licenceNumber,
        phone,
        plan,
      },
      custom_text: {
        submit: {
          message: `Welcome to CoastHomeHub, ${businessName}! Your founding member profile will go live within 7 days after licence verification.`,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

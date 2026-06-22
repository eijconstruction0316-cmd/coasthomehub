import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { tradieCheckoutSchema } from "@/lib/apiSchemas";
import { logError, logWarn } from "@/lib/logger";
import {
  getAppUrl,
  isProduction,
  jsonError,
  parseJson,
  productionMockCheckoutBlocked,
  rateLimit,
  requireStripeSecretKey,
  verifySameOrigin,
} from "@/lib/security";

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
  const limited = rateLimit(req, {
    key: "tradie-checkout",
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  const originError = verifySameOrigin(req);
  if (originError) return originError;

  const parsed = await parseJson(req, tradieCheckoutSchema);
  if (parsed.error) return parsed.error;

  try {
    const {
      plan,
      businessName,
      email,
      contactName,
      abn,
      licenceNumber,
      phone,
      services,
      areas,
    } = parsed.data;

    const priceId = priceIds[plan];
    const details = planDetails[plan];

    if (!details) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const appUrl = getAppUrl();
    const allowMockCheckout = process.env.ALLOW_MOCK_CHECKOUT === "true" && !isProduction;

    if (productionMockCheckoutBlocked()) {
      return jsonError("Mock checkout is not allowed in production", 500);
    }

    if (!priceId || !priceId.startsWith("price_")) {
      if (allowMockCheckout) {
        return NextResponse.json({
          url: `${appUrl}/tradies/register/success?plan=${plan}&name=${encodeURIComponent(contactName)}&business=${encodeURIComponent(businessName)}&email=${encodeURIComponent(email)}&mock=1`,
        });
      }

      logWarn("checkout:price-id", `Price ID not configured for plan: ${plan}`);
      return NextResponse.json(
        { error: "Payment is not configured yet. Please contact us at info@coasthomehub.com.au to register." },
        { status: 503 }
      );
    }

    let stripeSecretKey: string;
    try {
      stripeSecretKey = requireStripeSecretKey();
    } catch (err) {
      logError("checkout:stripe-key", err);
      return jsonError("Payment is not configured", 503);
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-05-27.dahlia",
    });

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
          services: services.join(", ").slice(0, 500),
          areas: areas.join(", ").slice(0, 500),
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
          services: services.join(", ").slice(0, 500),
          areas: areas.join(", ").slice(0, 500),
        },
      },
      metadata: {
        businessName,
        contactName,
        abn,
        licenceNumber,
        phone,
        plan,
        services: services.join(", ").slice(0, 500),
        areas: areas.join(", ").slice(0, 500),
      },
      custom_text: {
        submit: {
          message: `Welcome to CoastHomeHub, ${businessName}! Your founding member profile will go live within 7 days after licence verification.`,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    logError("create-checkout-session", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, returnPath = "/design" } = body as { email?: string; returnPath?: string };

    const priceId = process.env.STRIPE_PRICE_HOMEOWNER;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://coasthomehub.com.au";

    if (!priceId || !priceId.startsWith("price_")) {
      return NextResponse.json(
        { error: "Subscription not configured yet. Please contact info@coasthomehub.com.au" },
        { status: 503 }
      );
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}${returnPath}?unlocked=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}${returnPath}?cancelled=1`,
      allow_promotion_codes: true,
      subscription_data: { trial_period_days: 0 },
      custom_text: {
        submit: { message: "Unlock unlimited quotes + full magazine access. Cancel anytime." },
      },
    };

    if (email) {
      const existing = await stripe.customers.list({ email, limit: 1 });
      sessionParams.customer = existing.data.length > 0
        ? existing.data[0].id
        : (await stripe.customers.create({ email })).id;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("homeowner-session error:", err);
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }
}

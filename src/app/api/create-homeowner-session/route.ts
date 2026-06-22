import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { homeownerSessionSchema } from "@/lib/apiSchemas";
import { logError } from "@/lib/logger";
import {
  getAppUrl,
  jsonError,
  parseJson,
  rateLimit,
  requireStripePrice,
  requireStripeSecretKey,
  safeReturnPath,
  verifySameOrigin,
} from "@/lib/security";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, {
    key: "homeowner-checkout",
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  const originError = verifySameOrigin(req);
  if (originError) return originError;

  const parsed = await parseJson(req, homeownerSessionSchema);
  if (parsed.error) return parsed.error;

  const { email } = parsed.data;
  const returnPath = safeReturnPath(parsed.data.returnPath, "/design");
  let priceId: string;
  let stripeSecretKey: string;

  try {
    priceId = requireStripePrice("STRIPE_PRICE_HOMEOWNER");
    stripeSecretKey = requireStripeSecretKey();
  } catch (err) {
    logError("homeowner-session:config", err);
    return jsonError("Payment is not configured", 503);
  }

  try {
    const appUrl = getAppUrl();
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-05-27.dahlia",
    });

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
    logError("homeowner-session", err);
    return jsonError("Could not create checkout session", 500);
  }
}

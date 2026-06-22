import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { z } from "zod";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  __coastHomeHubRateLimits?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalRateLimitStore.__coastHomeHubRateLimits ??
  new Map<string, RateLimitEntry>();

globalRateLimitStore.__coastHomeHubRateLimits = rateLimitStore;

export const isProduction = process.env.NODE_ENV === "production";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-real-ip") ??
    forwardedFor ??
    "unknown"
  );
}

export function rateLimit(req: NextRequest, options: RateLimitOptions) {
  const now = Date.now();
  const ip = getClientIp(req);
  const storeKey = `${options.key}:${ip}`;
  const entry = rateLimitStore.get(storeKey);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(storeKey, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return null;
  }

  entry.count += 1;

  if (entry.count <= options.limit) return null;

  const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
  return NextResponse.json(
    { error: "Too many requests. Please try again shortly." },
    {
      status: 429,
      headers: {
        "retry-after": String(retryAfterSeconds),
      },
    }
  );
}

export async function parseJson<T extends z.ZodType>(
  req: NextRequest,
  schema: T
): Promise<{ data: z.infer<T>; error: null } | { data: null; error: NextResponse }> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return { data: null, error: jsonError("Bad request", 400) };
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return { data: null, error: jsonError("Invalid request", 400) };
  }

  return { data: result.data, error: null };
}

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeHtmlArray(values: string[] | null | undefined) {
  return (values ?? []).map((value) => escapeHtml(value));
}

export function mailtoHref(email: string, params?: Record<string, string>) {
  const query = params ? new URLSearchParams(params).toString() : "";
  return escapeHtml(`mailto:${encodeURIComponent(email)}${query ? `?${query}` : ""}`);
}

export function telHref(phone: string) {
  const normalized = phone.replace(/[^\d+]/g, "");
  if (!normalized) return "";
  return escapeHtml(`tel:${encodeURIComponent(normalized)}`);
}

export function getAppUrl() {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return configured.replace(/\/$/, "");
  return isProduction ? "https://coasthomehub.com.au" : "http://localhost:3000";
}

function sameHost(a: URL, b: URL) {
  return a.protocol === b.protocol && a.host === b.host;
}

export function verifySameOrigin(req: NextRequest) {
  if (!isProduction) return null;

  const appUrl = new URL(getAppUrl());
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  try {
    if (origin && sameHost(new URL(origin), appUrl)) return null;
    if (referer && sameHost(new URL(referer), appUrl)) return null;
  } catch {
    return jsonError("Request origin is not allowed", 403);
  }

  return jsonError("Request origin is not allowed", 403);
}

export function checkQuoteBotSignals(body: { website?: string; company?: string; url?: string }) {
  if (body.website || body.company || body.url) {
    return jsonError("Submission rejected", 400);
  }

  return null;
}

export function safeReturnPath(value: string | undefined, fallback = "/design") {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  if (value.includes("\\")) return fallback;
  return value.split("#")[0].slice(0, 120);
}

export function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function requireStripeSecretKey() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === "sk_test_placeholder") {
    throw new Error("Stripe secret key is not configured");
  }
  return key;
}

export function requireStripePrice(name: string) {
  const priceId = process.env[name];
  if (!priceId || !priceId.startsWith("price_")) {
    throw new Error(`${name} is not configured`);
  }
  return priceId;
}

export function productionMockCheckoutBlocked() {
  return isProduction && process.env.ALLOW_MOCK_CHECKOUT === "true";
}

function getReportSigningSecret() {
  const secret = process.env.REPORT_SIGNING_SECRET;
  if (secret) return secret;
  if (isProduction) throw new Error("REPORT_SIGNING_SECRET is required in production");
  return "development-report-signing-secret";
}

export function requireReportSigningSecret() {
  return getReportSigningSecret();
}

function base64url(value: string) {
  return Buffer.from(value)
    .toString("base64url");
}

function hmac(value: string) {
  return createHmac("sha256", getReportSigningSecret()).update(value).digest("base64url");
}

export function signPayload(payload: unknown, ttlSeconds = 15 * 60) {
  const body = JSON.stringify({
    payload,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  });
  const encoded = base64url(body);
  return `${encoded}.${hmac(encoded)}`;
}

export function verifySignedPayload<T>(token: string | undefined, expectedPayload: T) {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  let expectedSignature: string;
  try {
    expectedSignature = hmac(encoded);
  } catch {
    return false;
  }
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as {
      payload: T;
      exp: number;
    };
    if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) return false;
    return JSON.stringify(decoded.payload) === JSON.stringify(expectedPayload);
  } catch {
    return false;
  }
}

export const commonText = z.string().trim().max(2_000);
export const shortText = z.string().trim().max(200);
export const emailSchema = z.string().trim().email().max(254);
export const phoneSchema = z.string().trim().max(40).optional().default("");

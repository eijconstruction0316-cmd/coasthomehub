# CoastHomeHub Security Audit

Generated: 2026-06-22

## Scope

This audit covers the public Next.js application and all API routes under `src/app/api`.
The sprint focused only on security and operational safety. No user-facing UI changes were introduced.

## Executive Summary

Sprint 1 added request throttling, schema validation, production checkout guards, safer email rendering, security headers, and XSS hardening across the public API surface.

The app now blocks malformed JSON, rejects oversized or unexpected request bodies, rate limits all public API routes, verifies same-origin browser POSTs in production, and prevents mock checkout paths from being used in production.

## Public API Route Audit

| Route | Protections Added |
| --- | --- |
| `/api/send-quote` | Rate limit, production same-origin check, Zod validation, quote bot-signal rejection, Resend env guard, escaped email HTML, encoded `mailto:`/`tel:` hrefs |
| `/api/design-chat` | Rate limit, production same-origin check, Zod validation for messages and uploaded image payloads |
| `/api/generate-report` | Rate limit, production same-origin check, Zod validation for input messages, Zod validation for AI-generated report JSON, signed report token generation |
| `/api/send-report` | Rate limit, production same-origin check, Zod validation, signed report token verification, escaped report/customer/conversation email HTML, encoded contact hrefs |
| `/api/create-checkout-session` | Rate limit, production same-origin check, Zod validation, Stripe env guard, production mock checkout block |
| `/api/create-homeowner-session` | Rate limit, production same-origin check, Zod validation, safe return path handling, Stripe env guard |
| `/api/webhooks/stripe` | Rate limit, Stripe signature requirement, webhook secret requirement, Stripe/Resend env guard, escaped webhook email HTML |

## XSS Review

No `dangerouslySetInnerHTML` or direct DOM `innerHTML` usage was found in the audited app source.

Reviewed user-controlled paths:

| Source | Destination | Result |
| --- | --- | --- |
| Quote form fields | Business and customer emails | Escaped with `escapeHtml`; href attributes are encoded separately |
| CoastAI chat messages | React chat UI, Gemini request, report generation | React escapes UI text by default; server validates shape and length |
| Uploaded image previews | Client preview and Gemini image payload | Server limits MIME type to JPEG/PNG/WebP and caps image data length |
| AI-generated report JSON | Customer/business emails | AI output is validated with Zod, signed, then escaped before email rendering |
| Customer contact fields in report submission | Business email | Validated with Zod, escaped for HTML, raw email used only for Resend recipient/reply-to |
| Stripe metadata | Webhook emails | Escaped before rendering into HTML email bodies |
| Checkout success query params | Success page text | Safely decoded with fallback and length cap; React escapes rendered text |
| LocalStorage unlock flags | Magazine/design access state | Not treated as authority for server-side payment or quote submission |

## Email HTML Safety

All dynamic values rendered into server-generated email HTML are escaped before insertion.
Email links use dedicated `mailtoHref` and `telHref` helpers so display text and URL attributes are handled separately.

## Checkout Safety

Mock checkout is disabled by default and only works when `ALLOW_MOCK_CHECKOUT=true` outside production.
If `ALLOW_MOCK_CHECKOUT=true` is set in production, `/api/create-checkout-session` returns an error instead of producing a bypass URL.

Stripe checkout now requires valid `STRIPE_SECRET_KEY` and `price_` IDs before creating sessions.

## Security Headers

Global headers were added in `next.config.ts`:

- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

The CSP permits current required sources for Stripe, Google Gemini, Google Fonts, local/blob/data image previews, and existing Unsplash content images.

## Residual Risks

- Rate limiting is in-memory per Node process. For multi-instance production, replace it with Redis, Upstash, Vercel KV, or another shared store.
- Bot protection is intentionally limited to server-side same-origin checks plus honeypot-field rejection because this sprint did not change UI. A future sprint should add Turnstile, reCAPTCHA, or a similar invisible challenge for quote submissions.
- CSP still allows `'unsafe-inline'` and `'unsafe-eval'` because the current app uses extensive inline styles and Next tooling may require eval in some modes. A stronger CSP should use nonces/hashes after a styling cleanup.
- Stripe webhook handling does not persist processed event IDs. Add idempotency storage before high-volume production use.
- `npm audit --audit-level=moderate` reports a moderate PostCSS advisory through `next@16.2.9`. `npm audit fix --force` is not safe because it proposes a breaking downgrade. Monitor for the next stable Next.js patch and upgrade `next` plus `eslint-config-next` together.

## Verification

Passing:

- `./node_modules/.bin/tsc --noEmit --pretty false`
- `npm run lint`
- `npm run build`

Known audit finding:

- `npm audit --audit-level=moderate` fails with 2 moderate findings from PostCSS bundled under Next.js.

# CoastHomeHub Architecture

Generated: 2026-06-22

## Application Stack

- Framework: Next.js App Router
- UI: React client components with inline design-system styles from `src/app/globals.css`
- AI provider: Google Gemini through `@google/genai`
- Payments: Stripe Checkout
- Email: Resend
- Validation: Zod
- Runtime: Node.js for AI, Stripe, file storage, and PDF routes

## Main Areas

| Area | Path | Responsibility |
| --- | --- | --- |
| Public site | `src/app/*` | Marketing, services, gallery, blog, quote and planner pages |
| Shared UI | `src/components/*` | Navigation, footer, AI design chat, planner workflow |
| Public APIs | `src/app/api/*` | AI chat, report generation, planner, email, checkout and Stripe webhooks |
| Security helpers | `src/lib/security.ts` | Rate limiting, same-origin checks, env guards, escaping, signed payloads |
| API schemas | `src/lib/apiSchemas.ts` | Zod contracts for public API requests and generated objects |
| Planner domain | `src/lib/planner.ts` | Project-type questions, AI prompts and fallback brief generation |
| Planner storage | `src/lib/plannerDatabase.ts` | MVP file-backed brief persistence |
| Planner PDF | `src/lib/plannerPdf.ts` | Dependency-free PDF generation |

## Request Safety Pattern

Public mutating APIs follow this order:

1. Rate limit by route and client IP.
2. Enforce same-origin browser requests in production, except Stripe webhooks.
3. Parse JSON through Zod.
4. Guard required runtime configuration.
5. Execute the route-specific operation.
6. Return structured JSON errors.

Stripe webhooks use signature verification instead of same-origin checks.

## AI Planner Flow

The planner lives at `/planner`.

Client flow:

1. User selects a project type.
2. Client requests the next planner question from `/api/planner/question`.
3. User answers each question and may attach photo metadata.
4. Client requests a structured brief from `/api/planner/brief`.
5. Server generates or falls back to a validated brief.
6. Server saves the brief.
7. Client receives the saved brief ID and `/api/planner/pdf/[id]` PDF URL.

The planner does not connect contractors and does not trigger quote matching.

## Planner Persistence

Sprint 1 MVP persistence uses a JSON file at `/tmp/coasthomehub-planner-briefs.json`.

This is suitable for local MVP validation and single-node demos. Production should replace `src/lib/plannerDatabase.ts` with a durable database adapter such as Postgres, Supabase, Neon, PlanetScale, or another managed database.

## Security Headers

Security headers are configured in `next.config.ts`:

- Content Security Policy
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Production Notes

- Use a shared rate-limit store in multi-instance deployments.
- Use durable storage for planner briefs and Stripe webhook idempotency.
- Store real photo objects in object storage if the planner needs to retain image binaries.
- Keep `GOOGLE_GENERATIVE_AI_API_KEY`, Stripe keys, Resend keys and signing secrets out of the repository.

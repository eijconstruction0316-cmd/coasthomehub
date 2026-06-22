# Contractor Portal Architecture

Generated: 2026-06-22

## Status

Architecture only.

No contractor portal UI, API route, database table, matching engine, payment workflow or notification workflow has been implemented in this phase.

## Phase Scope

This document defines the planned contractor-side architecture for Coast Home Hub.

The portal will support:

- Contractor profiles
- License number capture
- Insurance verification
- Service areas
- Project matching
- Lead acceptance
- Lead history
- Ratings

The portal must not connect contractors to homeowners until verification, lead routing, privacy, and operational controls are production-ready.

## Product Boundary

The contractor portal is separate from the homeowner planning and quote-submission flows.

Homeowner-facing flows create demand signals and project briefs.
The contractor portal manages supply-side contractor eligibility, routing, acceptance, and performance history.

## Planned User Roles

| Role | Purpose |
| --- | --- |
| Contractor owner | Manages company profile, licenses, insurance, service areas and lead preferences |
| Contractor staff | Views and responds to assigned leads for an approved contractor account |
| Coast Home Hub admin | Reviews verification status, resolves disputes and manages lead routing safety |
| Homeowner | Does not access the contractor portal, but may indirectly rate completed contractor interactions |

## Contractor Profile

Each contractor profile should represent a real trading entity, not an individual marketing listing.

Required profile fields:

- Business name
- Trading name
- ABN or ACN
- Primary contact name
- Primary contact email
- Primary contact phone
- Business address
- Website
- Service categories
- Service areas
- License number
- Insurance status
- Verification status
- Lead acceptance settings
- Public profile status

Optional profile fields:

- Logo
- Business description
- Years in operation
- Portfolio photos
- Certifications
- Warranty notes
- Emergency availability
- Minimum project value

## License Number

License numbers should be stored as structured verification records, not plain profile text.

Planned license fields:

```ts
{
  id: string;
  contractorId: string;
  jurisdiction: "QLD" | "NSW" | "VIC" | "SA" | "WA" | "TAS" | "ACT" | "NT";
  licenseNumber: string;
  licenseType: string;
  holderName: string;
  status: "pending" | "verified" | "rejected" | "expired" | "manual_review";
  checkedAt: string | null;
  expiresAt: string | null;
  verificationSource: string | null;
  notes: string | null;
}
```

Production requirements:

- Validate license number format server-side.
- Keep an audit trail for license status changes.
- Do not show unverified licenses as verified.
- Require manual review when automated checks are unavailable or inconclusive.

## Insurance Verification

Insurance verification should block lead eligibility when required coverage is missing or expired.

Planned insurance fields:

```ts
{
  id: string;
  contractorId: string;
  insurerName: string;
  policyNumber: string;
  coverageType: "public_liability" | "workers_compensation" | "professional_indemnity" | "other";
  coverageAmount: number;
  status: "pending" | "verified" | "rejected" | "expired" | "manual_review";
  documentUrl: string | null;
  issuedAt: string | null;
  expiresAt: string | null;
  verifiedAt: string | null;
}
```

Production requirements:

- Store uploaded documents in private object storage.
- Use signed URLs for temporary document access.
- Restrict document access to the contractor owner and approved admins.
- Alert contractors before insurance expiry.
- Remove contractors from matching eligibility when required insurance expires.

## Service Areas

Service areas should support both broad city-level targeting and more precise suburb/postcode targeting.

Initial service area structure:

```ts
{
  id: string;
  contractorId: string;
  state: string;
  city: string;
  suburbs: string[];
  postcodes: string[];
  radiusKm: number | null;
  services: Array<"Bathroom Renovation" | "Kitchen Renovation" | "Painting" | "Flooring" | "Outdoor">;
  active: boolean;
}
```

Operational rules:

- Contractors can only receive leads for active service areas.
- Matching must compare homeowner project location against contractor coverage.
- Service area expansion should be reviewed for quality before going live.
- The local SEO city architecture can inform location taxonomy but must not imply verified contractor availability.

## Project Matching

Matching should be deterministic and explainable before any AI-assisted ranking is introduced.

Minimum matching inputs:

- Project type
- Project location
- Budget range
- Timeline
- Required license type
- Contractor service categories
- Contractor service areas
- Verification status
- Lead capacity
- Recent acceptance behavior
- Rating and complaint status

Eligibility gates:

1. Contractor profile is active.
2. License status is verified where required.
3. Insurance status is verified and not expired.
4. Contractor supports the project service category.
5. Contractor covers the project location.
6. Contractor has not exceeded lead capacity.
7. Contractor is not paused, suspended or under manual review.

Ranking signals:

- Location fit
- Service fit
- Budget fit
- Response rate
- Acceptance rate
- Completed project history
- Homeowner ratings
- Complaint or dispute history

## Lead Acceptance

Lead acceptance must be explicit.

Contractors should not receive homeowner contact details until the lead is accepted under the configured business rules.

Planned lead states:

```ts
type LeadStatus =
  | "matched"
  | "offered"
  | "accepted"
  | "declined"
  | "expired"
  | "cancelled"
  | "completed"
  | "disputed";
```

Acceptance rules:

- Lead offers should have an expiry window.
- Contractors must accept before receiving full contact details.
- Declines should capture a structured reason.
- Expired leads should return to the routing pool when appropriate.
- Accepted leads should create a permanent lead history record.

## Lead History

Lead history should support operational review, contractor performance analysis and dispute resolution.

Required lead history fields:

- Lead ID
- Contractor ID
- Homeowner project ID
- Offered at
- Accepted at
- Declined at
- Expired at
- Completed at
- Decline reason
- Project type
- Project suburb/postcode
- Budget band
- Timeline band
- Matching score snapshot
- Routing rule version

Important constraint:

Do not rely on recalculating matching data later.
Store the routing decision snapshot used at the time the lead was offered.

## Ratings

Ratings should attach to completed interactions, not standalone profile marketing claims.

Planned rating fields:

```ts
{
  id: string;
  contractorId: string;
  leadId: string;
  homeownerProjectId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewText: string | null;
  status: "pending_moderation" | "published" | "rejected" | "hidden";
  createdAt: string;
  moderatedAt: string | null;
}
```

Rating safety rules:

- Only homeowners with a completed lead should be able to rate.
- Reviews require moderation before public display.
- Contractor replies should be moderated.
- Suspicious rating patterns should trigger admin review.
- Ratings must not expose private project details.

## Planned Pages

No pages are implemented in this phase.

Recommended future route structure:

| Route | Purpose |
| --- | --- |
| `/contractors/login` | Contractor authentication entry |
| `/contractors/onboarding` | Profile, license, insurance and service area setup |
| `/contractors/dashboard` | Overview of verification, active leads and history |
| `/contractors/profile` | Business profile management |
| `/contractors/licenses` | License records and verification status |
| `/contractors/insurance` | Insurance records and document upload |
| `/contractors/service-areas` | Service coverage and category management |
| `/contractors/leads` | Offered and accepted lead management |
| `/contractors/leads/[id]` | Lead details and acceptance workflow |
| `/contractors/ratings` | Ratings and review history |

## Planned API Surface

No API routes are implemented in this phase.

Recommended future API groups:

| API Group | Purpose |
| --- | --- |
| `/api/contractors/profile` | Contractor profile CRUD |
| `/api/contractors/licenses` | License submission and status retrieval |
| `/api/contractors/insurance` | Insurance submission and document metadata |
| `/api/contractors/service-areas` | Service area management |
| `/api/contractors/leads` | Lead listing, acceptance and decline |
| `/api/contractors/ratings` | Rating retrieval and contractor response workflow |
| `/api/admin/contractors` | Admin verification and suspension tools |
| `/api/admin/leads` | Lead routing review and dispute support |

All future contractor APIs should use:

- Authentication
- Authorization by contractor account
- Server-side validation with Zod
- Rate limiting
- CSRF or same-origin protection where browser sessions are used
- Audit logging for sensitive changes

## Data Model Summary

Recommended core tables or collections:

- `contractor_accounts`
- `contractor_users`
- `contractor_profiles`
- `contractor_licenses`
- `contractor_insurance_policies`
- `contractor_service_areas`
- `contractor_verification_events`
- `project_leads`
- `lead_offers`
- `lead_history`
- `contractor_ratings`
- `contractor_reviews`
- `contractor_audit_events`

## Security And Privacy

Contractor portal data includes sensitive business, identity and insurance records.

Security requirements:

- Do not expose license or insurance documents publicly.
- Encrypt sensitive document storage at rest.
- Use signed URLs for temporary file access.
- Log all verification status changes.
- Separate contractor owner permissions from staff permissions.
- Prevent contractors from accessing leads assigned to other accounts.
- Redact homeowner contact details until lead acceptance.
- Apply production checkout and lead-routing guards before monetized lead flows go live.

## Operational Controls

The portal should include admin-level controls before contractor matching is enabled:

- Approve or reject contractor profiles
- Approve or reject licenses
- Approve or reject insurance records
- Pause contractor matching
- Suspend contractor accounts
- Review lead disputes
- Review rating moderation queues
- Inspect matching decision snapshots

## Matching Release Plan

Phase 1 architecture:

- Define profile, verification, service area, lead and rating models.
- Do not route real leads.

Phase 2 internal beta:

- Add contractor onboarding behind an admin-approved feature flag.
- Allow internal test leads only.
- Validate verification and service area workflows.

Phase 3 controlled launch:

- Enable real lead offers for verified contractors only.
- Start with limited services and cities.
- Monitor acceptance rate, response time and homeowner complaints.

Phase 4 optimization:

- Improve matching weights using historical outcomes.
- Add contractor availability windows.
- Add lead pricing or subscription logic only after routing safety is proven.

## Open Decisions

- Authentication provider for contractor accounts
- Manual versus automated license verification source by state
- Insurance document review process
- Whether leads are exclusive or offered to multiple contractors
- Lead expiry window
- Public profile publishing rules
- Rating publication threshold
- Admin workflow ownership

## Implementation Guardrails

When implementation begins:

- Keep contractor portal routes separate from homeowner routes.
- Do not reuse public quote APIs for contractor lead acceptance.
- Do not expose homeowner contact details in matched or offered states.
- Do not publish contractor ratings before moderation is designed.
- Do not enable production matching without verification gates.
- Do not add payment or checkout logic until lead routing cannot be bypassed.

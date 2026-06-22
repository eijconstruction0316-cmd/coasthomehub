# Australia Local SEO Architecture

Generated: 2026-06-22

## Phase Scope

Created a programmatic local SEO structure for five Australian service areas:

- Brisbane
- Gold Coast
- Sunshine Coast
- Noosa
- Toowoomba

Each city supports four renovation service landing pages:

- Bathroom Renovation
- Kitchen Renovation
- Painting
- Flooring

## URL Structure

Base index:

- `/locations`

City hubs:

- `/locations/brisbane`
- `/locations/gold-coast`
- `/locations/sunshine-coast`
- `/locations/noosa`
- `/locations/toowoomba`

City and service pages:

- `/locations/{city}/{service}`

Examples:

- `/locations/brisbane/bathroom-renovation`
- `/locations/gold-coast/kitchen-renovation`
- `/locations/sunshine-coast/painting`
- `/locations/noosa/flooring`
- `/locations/toowoomba/bathroom-renovation`

## Programmatic Page Count

- 1 locations index page
- 5 city hub pages
- 20 city-service landing pages

Total new local SEO pages: 26

## Implementation Files

| File | Purpose |
| --- | --- |
| `src/lib/localSeo.ts` | City/service data model and landing page generator |
| `src/app/locations/page.tsx` | Local SEO index page |
| `src/app/locations/[city]/page.tsx` | Programmatic city hub page |
| `src/app/locations/[city]/[service]/page.tsx` | Programmatic city-service landing page |
| `src/components/LocalSeoCard.tsx` | Shared internal-link card |
| `src/lib/seoSchemas.ts` | Breadcrumb, FAQ and Local Service schema helpers |
| `src/app/sitemap.ts` | Sitemap coverage for all local SEO routes |

## SEO Schema

Each city-service page includes:

- `Service` schema
- `BreadcrumbList` schema
- `FAQPage` schema

City hub and locations index pages include breadcrumb schema.

## Content Strategy

The local SEO pages are not thin doorway pages. Each page includes:

- City-specific introduction
- Service-specific scope
- Budget range
- Timeline
- Local considerations
- Nearby suburb/area references
- Quality checklist
- FAQ
- Internal links to related cities and services

## City Data Model

Each city has:

- `slug`
- `name`
- `region`
- `intro`
- `serviceAreaSummary`
- `suburbs`
- `localConsiderations`

## Service Data Model

Each service has:

- `slug`
- `name`
- `shortName`
- `description`
- `scope`
- `costRange`
- `timeline`
- `qualitySignals`

## Internal Linking

The architecture creates three internal-link layers:

1. `/locations` links to all city hubs and all city-service pages.
2. City hubs link to all service pages for that city.
3. City-service pages link to:
   - Same service in other cities
   - Other services in the same city

This keeps crawl paths shallow and avoids orphaned programmatic pages.

## Sitemap

`src/app/sitemap.ts` now includes:

- `/locations`
- 5 city hub URLs
- 20 city-service URLs

## Production Notes

- Keep local claims accurate. Do not imply a physical office in every city unless one exists.
- Add reviews, photos and completed project examples only when they are real and attributable.
- Add Google Business Profile links only for verified locations.
- Track page performance by city and service, then expand only where search demand and conversion data support it.
- Future CMS support can move city and service data out of `src/lib/localSeo.ts` while preserving the same route structure.

## Expansion Plan

Phase 2 candidates:

- Add suburb-level pages only for proven demand.
- Add local project stories to each city hub.
- Add testimonial modules with location-safe attribution.
- Add service-specific images and before/after galleries.
- Add lead-quality tracking by local landing page.

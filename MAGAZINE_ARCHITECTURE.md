# Magazine Platform Architecture

Generated: 2026-06-22

## Phase 1 Status

Implemented a CMS-ready magazine architecture with three public surfaces:

- `/magazine` - editorial hub for all content types
- `/inspiration` - style-guide library replacing the old gallery experience
- `/projects` - project-story library

The legacy `/gallery` route now redirects to `/inspiration`.

## Content Types

Supported content types:

- Style Guide
- Project Story
- Cost Guide
- Builder Interview
- Designer Interview

Each content item is defined through the shared `MagazineArticle` contract in `src/lib/magazineCms.ts`.

## CMS Support

Phase 1 uses a typed, file-based content registry:

- Content registry: `src/lib/magazineCms.ts`
- CMS content model: `cms/magazine-content-model.json`
- Card renderer: `src/components/MagazineArticleCard.tsx`
- JSON-LD renderer: `src/components/JsonLd.tsx`

This gives the app a clear migration path to a headless CMS. A CMS adapter only needs to return the `MagazineArticle` shape.

## Routing

| Route | Purpose |
| --- | --- |
| `/magazine` | All published editorial content |
| `/magazine/[slug]` | Canonical article detail page |
| `/inspiration` | Style Guide collection |
| `/projects` | Project Story collection |
| `/gallery` | Legacy redirect to `/inspiration` |

## SEO Schema

Article detail pages generate:

- Article schema
- Breadcrumb schema
- FAQ schema when the article has visible FAQ content

Schema helpers live in `src/lib/seoSchemas.ts`.

## Editorial Model

Each article supports:

- `slug`
- `title`
- `subtitle`
- `excerpt`
- `type`
- `collection`
- `category`
- `heroImage`
- `readTime`
- `publishedAt`
- `updatedAt`
- `author`
- `tags`
- `featured`
- `status`
- `seo`
- `sections`
- `faq`
- Optional `projectMeta`
- Optional `styleMeta`

## Collection Strategy

`/inspiration` is for design decision content: palettes, materials, style direction and renovation ideas.

`/projects` is for project-story content: scope, cost drivers, timeline and delivery sequence.

`/magazine` is the canonical hub and includes all content types.

`/magazine/[slug]` is the canonical article URL for SEO. Collection pages link into the same article detail route so schema and metadata are consistent.

## Phase 2 Recommendations

- Replace static registry with CMS fetch adapter.
- Add preview mode for draft content.
- Add author profiles.
- Add category and tag landing pages.
- Add search and filtering across content types.
- Add image focal-point fields for CMS-managed hero media.
- Add canonical redirects from legacy blog posts where content overlaps.

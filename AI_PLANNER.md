# AI Renovation Planner MVP

Generated: 2026-06-22

## Status

Implemented as an MVP at `/planner`.

The planner creates a structured project brief for:

- Bathroom
- Kitchen
- Flooring
- Painting
- Outdoor

It does not connect contractors.

## User Flow

1. User selects a project type.
2. Planner asks focused questions for that project type.
3. User optionally attaches photo metadata.
4. Planner generates a structured brief.
5. Brief is saved through the planner database adapter.
6. User can download a generated PDF.

## Output Fields

The generated brief includes:

- Scope
- Budget range
- Timeline
- Location
- Materials
- Photos
- Assumptions
- Risks
- Next planning steps

## API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/planner/question` | POST | Returns the next AI-assisted planning question |
| `/api/planner/brief` | POST | Generates, validates and saves the structured brief |
| `/api/planner/pdf/[id]` | GET | Generates a PDF for a saved brief |

All planner POST routes use:

- Rate limiting
- Production same-origin checks
- Zod validation
- AI fallback behavior if Gemini is unavailable

## Data Model

Planner brief record:

```ts
{
  id: string;
  createdAt: string;
  projectType: "Bathroom" | "Kitchen" | "Flooring" | "Painting" | "Outdoor";
  answers: Array<{
    questionId: string;
    question: string;
    answer: string;
  }>;
  photos: Array<{
    name: string;
    type: string;
    size: number;
    lastModified?: number;
  }>;
  brief: {
    scope: string[];
    budgetRange: string;
    timeline: string;
    location: string | null;
    materials: string[];
    photos: {
      count: number;
      notes: string[];
    };
    assumptions: string[];
    risks: string[];
    nextSteps: string[];
  };
}
```

## AI Behavior

Question generation uses Gemini when `GOOGLE_GENERATIVE_AI_API_KEY` is configured.
If Gemini is unavailable or returns invalid JSON, the route falls back to project-specific question templates.

Brief generation also uses Gemini when available.
If Gemini is unavailable or returns invalid JSON, the route saves a deterministic fallback brief based on the user's answers.

All AI output is validated with Zod before being returned or saved.

## PDF Generation

PDFs are generated server-side without adding a new dependency.
The PDF route reads a saved brief and renders a simple structured PDF with the key project planning fields.

## MVP Limitations

- The database is file-backed JSON for MVP validation.
- The local database path is `/tmp/coasthomehub-planner-briefs.json`.
- Photo binaries are not stored; only metadata is saved.
- PDFs use a simple text renderer and do not include image thumbnails.
- Brief IDs are unguessable UUIDs, but there is no authenticated owner model yet.
- The planner does not perform payment checks, quote matching, contractor dispatch or CRM sync.

## Production Follow-Up

- Replace file storage with durable database storage.
- Store photos in object storage with signed URLs.
- Add authenticated ownership or signed access tokens for PDF downloads.
- Add observability for AI failures and fallback usage.
- Add analytics for question completion and brief generation rates.
- Add versioning for question templates and prompt changes.

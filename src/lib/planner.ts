import { z } from "zod";
import {
  plannerAnswerSchema,
  plannerBriefSchema,
  plannerPhotoSchema,
  plannerProjectTypeSchema,
} from "./apiSchemas";

export type PlannerProjectType = z.infer<typeof plannerProjectTypeSchema>;
export type PlannerAnswer = z.infer<typeof plannerAnswerSchema>;
export type PlannerPhoto = z.infer<typeof plannerPhotoSchema>;
export type PlannerBrief = z.infer<typeof plannerBriefSchema>;

export type PlannerQuestion = {
  id: string;
  text: string;
  helper: string;
  placeholder: string;
  required: boolean;
};

export const PLANNER_PROJECT_TYPES: PlannerProjectType[] = [
  "Bathroom",
  "Kitchen",
  "Flooring",
  "Painting",
  "Outdoor",
];

const questions: Record<PlannerProjectType, PlannerQuestion[]> = {
  Bathroom: [
    {
      id: "location",
      text: "Which suburb or area is the bathroom project in?",
      helper: "A suburb is enough. This helps with Queensland pricing and availability assumptions.",
      placeholder: "Example: Burleigh Heads",
      required: true,
    },
    {
      id: "current-state",
      text: "What is the current bathroom like, and what needs to change?",
      helper: "Mention leaks, layout issues, old fixtures, waterproofing concerns, or access issues.",
      placeholder: "Old shower over bath, leaking vanity, want a walk-in shower",
      required: true,
    },
    {
      id: "size-layout",
      text: "What is the approximate size and layout?",
      helper: "Include whether plumbing is staying in the same place.",
      placeholder: "About 2.4m x 2m, toilet and shower stay where they are",
      required: true,
    },
    {
      id: "finish-level",
      text: "What finish level are you aiming for?",
      helper: "Budget refresh, mid-range renovation, or premium ensuite.",
      placeholder: "Mid-range, coastal style, brushed nickel fixtures",
      required: true,
    },
    {
      id: "budget",
      text: "Do you have a budget range in mind?",
      helper: "A rough range is enough. If unsure, say that.",
      placeholder: "$18k to $28k, but flexible",
      required: true,
    },
    {
      id: "timeline",
      text: "When would you like the work planned or started?",
      helper: "Include any hard deadlines or preferred timing.",
      placeholder: "Within 3 months, ideally before school holidays",
      required: true,
    },
  ],
  Kitchen: [
    {
      id: "location",
      text: "Which suburb or area is the kitchen project in?",
      helper: "A suburb is enough for planning and pricing assumptions.",
      placeholder: "Example: Noosa Heads",
      required: true,
    },
    {
      id: "current-state",
      text: "What is not working in the current kitchen?",
      helper: "Mention storage, layout, appliances, ventilation, lighting, or worn finishes.",
      placeholder: "Not enough storage, old benchtop, poor lighting",
      required: true,
    },
    {
      id: "scope",
      text: "Are you keeping the layout or changing plumbing/electrical locations?",
      helper: "Layout changes affect cost and timeline.",
      placeholder: "Keep sink location, move cooktop to island",
      required: true,
    },
    {
      id: "materials",
      text: "What materials or finishes do you prefer?",
      helper: "Cabinet colour, benchtop, splashback, handles, flooring, and appliance level all help.",
      placeholder: "Warm white cabinetry, stone-look benchtop, brass handles",
      required: true,
    },
    {
      id: "budget",
      text: "What budget range should the plan work within?",
      helper: "If unsure, say whether you want budget, mid-range, or premium.",
      placeholder: "$35k to $55k",
      required: true,
    },
    {
      id: "timeline",
      text: "What timing constraints should the plan allow for?",
      helper: "Mention move-in dates, family needs, or staged work.",
      placeholder: "Need it finished before Christmas",
      required: true,
    },
  ],
  Flooring: [
    {
      id: "location",
      text: "Which suburb or area is the flooring project in?",
      helper: "This helps with climate and access assumptions.",
      placeholder: "Example: Robina",
      required: true,
    },
    {
      id: "rooms",
      text: "Which rooms or areas need new flooring?",
      helper: "Include stairs, wet areas, outdoor transitions, or bedrooms.",
      placeholder: "Living, hallway, three bedrooms, no stairs",
      required: true,
    },
    {
      id: "existing-floor",
      text: "What flooring is there now, and does it need removal?",
      helper: "Removal and floor preparation can change the budget.",
      placeholder: "Old carpet and some cracked tiles to remove",
      required: true,
    },
    {
      id: "materials",
      text: "What flooring material are you considering?",
      helper: "Hybrid, engineered timber, vinyl plank, tile, carpet, or not sure.",
      placeholder: "Hybrid timber-look boards, light oak",
      required: true,
    },
    {
      id: "budget",
      text: "Do you have a target budget or quality level?",
      helper: "Square metres and product grade drive the range.",
      placeholder: "$12k to $18k, mid-range product",
      required: true,
    },
    {
      id: "timeline",
      text: "When do you need the flooring completed?",
      helper: "Mention whether furniture can be moved out.",
      placeholder: "Next month, house will be mostly empty",
      required: true,
    },
  ],
  Painting: [
    {
      id: "location",
      text: "Which suburb or area is the painting project in?",
      helper: "Location helps with weather and access assumptions.",
      placeholder: "Example: Caloundra",
      required: true,
    },
    {
      id: "areas",
      text: "What areas need painting?",
      helper: "Interior, exterior, ceilings, trims, fences, or feature walls.",
      placeholder: "Interior walls and ceilings, 4-bedroom house",
      required: true,
    },
    {
      id: "condition",
      text: "What condition are the surfaces in?",
      helper: "Mention peeling paint, water damage, cracks, mould, or render repairs.",
      placeholder: "Some cracks and peeling near windows",
      required: true,
    },
    {
      id: "finish",
      text: "What colours or finish level do you want?",
      helper: "Include whether you need colour advice.",
      placeholder: "Warm white, low-sheen walls, semi-gloss trims",
      required: true,
    },
    {
      id: "budget",
      text: "Do you have a budget range?",
      helper: "If unsure, say whether you want quick refresh or premium finish.",
      placeholder: "$6k to $10k",
      required: true,
    },
    {
      id: "timeline",
      text: "When should painting happen?",
      helper: "Mention move-in dates, weather windows, or staged work.",
      placeholder: "Before listing the property in 6 weeks",
      required: true,
    },
  ],
  Outdoor: [
    {
      id: "location",
      text: "Which suburb or area is the outdoor project in?",
      helper: "Location affects weather exposure and coastal material choices.",
      placeholder: "Example: Palm Beach",
      required: true,
    },
    {
      id: "project-area",
      text: "What outdoor area are you planning?",
      helper: "Deck, patio, pergola, fencing, paving, outdoor kitchen, or landscaping.",
      placeholder: "Replace old deck and add covered seating",
      required: true,
    },
    {
      id: "site-condition",
      text: "What is the site like now?",
      helper: "Mention slope, drainage, access, existing structures, or salt exposure.",
      placeholder: "Slight slope, old timber deck, limited side access",
      required: true,
    },
    {
      id: "materials",
      text: "What materials or style do you prefer?",
      helper: "Timber, composite decking, concrete, tiles, aluminium, privacy screens, or planting.",
      placeholder: "Composite decking, coastal palette, low maintenance",
      required: true,
    },
    {
      id: "budget",
      text: "What budget range should the plan target?",
      helper: "Outdoor scopes can vary widely, so a rough range helps.",
      placeholder: "$20k to $35k",
      required: true,
    },
    {
      id: "timeline",
      text: "When do you want the outdoor area ready?",
      helper: "Mention events, summer timing, or staged delivery.",
      placeholder: "Ready before summer if possible",
      required: true,
    },
  ],
};

export function getFallbackPlannerQuestion(projectType: PlannerProjectType, answers: PlannerAnswer[]) {
  const projectQuestions = questions[projectType];
  const nextQuestion = projectQuestions[answers.length];
  return {
    complete: !nextQuestion,
    question: nextQuestion ?? null,
  };
}

function answerFor(answers: PlannerAnswer[], id: string) {
  return answers.find((answer) => answer.questionId === id)?.answer ?? "";
}

function splitList(value: string) {
  return value
    .split(/,|\n| and /i)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export function buildPlannerBriefFallback(input: {
  projectType: PlannerProjectType;
  answers: PlannerAnswer[];
  photos: PlannerPhoto[];
}): PlannerBrief {
  const { projectType, answers, photos } = input;
  const location = answerFor(answers, "location") || null;
  const budgetRange = answerFor(answers, "budget") || "Budget to be confirmed after site review";
  const timeline = answerFor(answers, "timeline") || "Timeline to be confirmed";
  const materialAnswer = answerFor(answers, "materials") || answerFor(answers, "finish") || answerFor(answers, "finish-level");
  const materials = splitList(materialAnswer);
  const scopeAnswers = answers
    .filter((answer) => !["location", "budget", "timeline", "materials"].includes(answer.questionId))
    .map((answer) => answer.answer);

  return {
    scope: [
      `${projectType} project planning and scope confirmation`,
      ...scopeAnswers.slice(0, 6),
    ].slice(0, 10),
    budgetRange,
    timeline,
    location,
    materials,
    photos: {
      count: photos.length,
      notes: photos.map((photo) => photo.name).slice(0, 8),
    },
    assumptions: [
      "Final pricing depends on site inspection, access, measurements, and product selections.",
      "Licensed trades must confirm compliance requirements before work starts.",
    ],
    risks: [
      "Hidden defects, moisture, structural issues, and service relocations may affect cost or timing.",
    ],
    nextSteps: [
      "Confirm measurements and site access.",
      "Choose preferred finishes and product level.",
      "Prepare a trade-ready scope before seeking quotes.",
    ],
  };
}

export function buildPlannerQuestionPrompt(input: {
  projectType: PlannerProjectType;
  answers: PlannerAnswer[];
  fallbackQuestion: PlannerQuestion;
}) {
  return `You are CoastAI, a Queensland renovation planning assistant.

Rewrite the next planning question so it is specific to this project, short, and practical.
Do not ask to connect contractors. Do not ask for personal contact details.

Project type: ${input.projectType}
Previous answers:
${input.answers.map((answer) => `- ${answer.question}: ${answer.answer}`).join("\n") || "- None yet"}

Question intent:
- id: ${input.fallbackQuestion.id}
- base question: ${input.fallbackQuestion.text}
- helper: ${input.fallbackQuestion.helper}

Return only JSON:
{
  "text": "question text",
  "helper": "short helper text",
  "placeholder": "short placeholder answer"
}`;
}

export function buildPlannerBriefPrompt(input: {
  projectType: PlannerProjectType;
  answers: PlannerAnswer[];
  photos: PlannerPhoto[];
}) {
  return `You are CoastAI, a Queensland renovation project planner.

Create a structured, trade-ready project brief from the homeowner's answers.
Do not connect contractors. Do not promise exact prices. Use AUD ranges and Queensland renovation assumptions.

Project type: ${input.projectType}
Answers:
${input.answers.map((answer) => `- ${answer.question}: ${answer.answer}`).join("\n")}

Photo metadata:
${input.photos.length ? input.photos.map((photo) => `- ${photo.name} (${photo.type}, ${photo.size} bytes)`).join("\n") : "- No photos uploaded"}

Return only valid JSON with this exact shape:
{
  "scope": ["specific work item"],
  "budgetRange": "$ range or explanation",
  "timeline": "estimated planning/build timeline",
  "location": "suburb or null",
  "materials": ["material or finish"],
  "photos": { "count": 0, "notes": ["photo note"] },
  "assumptions": ["planning assumption"],
  "risks": ["risk or dependency"],
  "nextSteps": ["next planning step"]
}`;
}

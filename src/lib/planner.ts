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
  "Waterproofing",
  "Tiling",
  "Decking & Carpentry",
  "Landscaping & Paving",
  "Electrical & Smart Home",
  "Plumbing",
  "Roofing & Cladding",
  "Plastering & Gyprock"
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
      placeholder: "$28k to $42k, but flexible",
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
      placeholder: "$45k to $70k",
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
      placeholder: "$16k to $26k, mid-range product",
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
      placeholder: "$9k to $16k",
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
      placeholder: "$30k to $55k",
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
  Waterproofing: [
    {
      id: "location",
      text: "Which suburb is the waterproofing project in?",
      helper: "Required for matching with verified local waterproofer contractors.",
      placeholder: "Example: Southport",
      required: true,
    },
    {
      id: "area",
      text: "Which areas require waterproofing membrane application?",
      helper: "Mention bathroom, shower recess, balcony, planter boxes, or retaining walls.",
      placeholder: "Shower recess and main bathroom floor",
      required: true,
    },
    {
      id: "substrate",
      text: "What is the current substrate condition?",
      helper: "Concrete slab, fiber cement sheets, timber floorboards, or old tiles to remove.",
      placeholder: "New fiber cement sheeting installed over timber joists",
      required: true,
    },
    {
      id: "compliance",
      text: "Do you require a Form 16 Waterproofing Certificate?",
      helper: "Required for QLD building certification of all wet area works.",
      placeholder: "Yes, needed for building certifier approval",
      required: true,
    },
    {
      id: "budget",
      text: "What is your target budget for waterproofing?",
      helper: "Professional Class III membranes typically range from $1,200 to $4,500.",
      placeholder: "Around $2,000",
      required: true,
    },
    {
      id: "timeline",
      text: "When does the membrane application need to be completed?",
      helper: "Include curing periods (normally 24-48 hours per coat) before tiling.",
      placeholder: "Ready in 2 weeks, before tiling begins",
      required: true,
    },
  ],
  Tiling: [
    {
      id: "location",
      text: "Which suburb is the tiling project in?",
      helper: "Required for matching with qualified local tilers.",
      placeholder: "Example: Broadbeach",
      required: true,
    },
    {
      id: "area",
      text: "What spaces need to be tiled?",
      helper: "Mention bathroom floors, feature walls, kitchen splashbacks, or outdoor patio.",
      placeholder: "Bathroom walls up to ceiling, and main floor area",
      required: true,
    },
    {
      id: "tile-spec",
      text: "What tiles are you planning to lay?",
      helper: "Ceramic, porcelain, natural stone, terrazzo, or custom mosaics. Mention size.",
      placeholder: "600x600 porcelain tiles, stone-look finish",
      required: true,
    },
    {
      id: "layout",
      text: "What is your preferred tile layout style?",
      helper: "Standard stack bond, brick bond, herringbone, or mitered edges.",
      placeholder: "Stacked vertical wall tiles, standard floor tiles with epoxy grout",
      required: true,
    },
    {
      id: "budget",
      text: "What is your estimated budget for tiling works?",
      helper: "Hourly rates or square-meter rates apply depending on design complexity.",
      placeholder: "$4,000 to $7,000",
      required: true,
    },
    {
      id: "timeline",
      text: "What is the timeline for starting the tiling work?",
      helper: "Ensure waterproofing has cured before tilers start layout.",
      placeholder: "In 3 weeks",
      required: true,
    },
  ],
  "Decking & Carpentry": [
    {
      id: "location",
      text: "Which suburb is the decking / carpentry project in?",
      helper: "Location helps with structural timber selection and coastal durability rules.",
      placeholder: "Example: Coolangatta",
      required: true,
    },
    {
      id: "scope",
      text: "What are the key structural carpentry items needed?",
      helper: "New deck, timber framing, pergola roof, cladding, or structural timber posts.",
      placeholder: "New timber deck around pool and privacy screen",
      required: true,
    },
    {
      id: "materials",
      text: "What decking material do you prefer?",
      helper: "Tasmanian Oak, Spotted Gum, Jarrah, or low-maintenance capped composite boards.",
      placeholder: "Low-maintenance composite timber boards in grey tone",
      required: true,
    },
    {
      id: "site-access",
      text: "What is the site slope and side access like?",
      helper: "Slope affects post heights, and side access affects material transport.",
      placeholder: "Mostly flat sandy ground, good side access via driveway",
      required: true,
    },
    {
      id: "budget",
      text: "What budget range is allocated for the carpentry works?",
      helper: "Premium decking generally ranges from $15,000 to $50,000.",
      placeholder: "$25,000",
      required: true,
    },
    {
      id: "timeline",
      text: "When would you like the framing or deck completed?",
      helper: "Allow 2-4 weeks site construction time.",
      placeholder: "Before the summer holidays",
      required: true,
    },
  ],
  "Landscaping & Paving": [
    {
      id: "location",
      text: "Which suburb is the landscaping project in?",
      helper: "Enables matching with local QLD garden and paving contractors.",
      placeholder: "Example: Robina",
      required: true,
    },
    {
      id: "scope",
      text: "What features are included in your outdoor plan?",
      helper: "Retaining walls, paving, turf laying, garden beds, pool surrounds, or pathways.",
      placeholder: "Retaining wall (under 1m) and concrete pavers around pool",
      required: true,
    },
    {
      id: "site-condition",
      text: "What is the current soil and slope condition?",
      helper: "Clay, sand, rocky ground, slope, or drainage issues.",
      placeholder: "Flat sandy soil, some old roots to clear",
      required: true,
    },
    {
      id: "style",
      text: "What landscaping aesthetic are you aiming for?",
      helper: "Coastal modern, native Australian, tropical, or minimalist lawn.",
      placeholder: "Coastal modern, white stones, native grasses, large pavers",
      required: true,
    },
    {
      id: "budget",
      text: "What is the budget for the landscaping works?",
      helper: "Varies depending on structural walls and soil prep requirements.",
      placeholder: "$10,000 to $20,000",
      required: true,
    },
    {
      id: "timeline",
      text: "When should the planting or paving begin?",
      helper: "Typically sequenced after heavy house or deck building is completed.",
      placeholder: "Within 2 months",
      required: true,
    },
  ],
  "Electrical & Smart Home": [
    {
      id: "location",
      text: "Which suburb is the electrical work in?",
      helper: "Required for matching with licensed local electricians.",
      placeholder: "Example: Surfers Paradise",
      required: true,
    },
    {
      id: "scope",
      text: "What electrical or lighting systems need installation?",
      helper: "LED downlights, backlit mirrors, ceiling fans, smart switches, or switchboard upgrade.",
      placeholder: "Install LED strip lighting, backlit mirrors, and 4 new GPOs",
      required: true,
    },
    {
      id: "smart-home",
      text: "Are you integrating smart home control systems?",
      helper: "Smart dimmers, motion sensors, app-controlled lighting, or audio wiring.",
      placeholder: "App-controlled dimmers for living room and ensuite",
      required: true,
    },
    {
      id: "switchboard",
      text: "Does the current switchboard require an upgrade?",
      helper: "Necessary if adding high-draw appliances or modern safety switches.",
      placeholder: "Unknown, needs inspection by electrician",
      required: true,
    },
    {
      id: "budget",
      text: "What is the budget for electrical fixtures and labor?",
      helper: "Include allowances for designer light fittings.",
      placeholder: "$2,000 to $4,500",
      required: true,
    },
    {
      id: "timeline",
      text: "When should electrical rough-in and fit-out happen?",
      helper: "Rough-in happens before plasterboard; fit-out happens after painting.",
      placeholder: "Rough-in next week, final fit-out in 4 weeks",
      required: true,
    },
  ],
  Plumbing: [
    {
      id: "location",
      text: "Which suburb is the plumbing project in?",
      helper: "Required for matching with licensed local plumbers.",
      placeholder: "Example: Paddington",
      required: true,
    },
    {
      id: "scope",
      text: "What plumbing tasks need to be performed?",
      helper: "Rough-in pipelines, tapware fit-out, shower drainage, gas lines, or hot water systems.",
      placeholder: "Move shower drain location and connect vanity basins",
      required: true,
    },
    {
      id: "layout-changes",
      text: "Are you moving existing waste outlets or water lines?",
      helper: "Altering layout in concrete slabs requires core drilling and increases costs.",
      placeholder: "Moving shower waste by 500mm, vanity stays close to copper stacks",
      required: true,
    },
    {
      id: "hot-water",
      text: "Do you require hot water system upgrades?",
      helper: "Continuous gas flow, solar hot water, or heat pump systems.",
      placeholder: "No hot water changes needed",
      required: true,
    },
    {
      id: "budget",
      text: "What is the allocated plumbing budget?",
      helper: "Plumbing rough-in and fit-out averages $2,500 to $7,000 for renovations.",
      placeholder: "Around $3,500",
      required: true,
    },
    {
      id: "timeline",
      text: "When do plumbing lines need to be ready?",
      helper: "Rough-in occurs before wall sheet lining and waterproofing.",
      placeholder: "Needs rough-in within 10 days",
      required: true,
    },
  ],
  "Roofing & Cladding": [
    {
      id: "location",
      text: "Which suburb is the roofing / cladding project in?",
      helper: "Required for matching with licensed roofers and cladding specialists.",
      placeholder: "Example: Caloundra",
      required: true,
    },
    {
      id: "scope",
      text: "What roofing or wall cladding work is needed?",
      helper: "Colorbond re-roofing, tile repairs, weatherboard cladding, gutters, or downpipes.",
      placeholder: "Replace old tiles with Colorbond steel roof and new gutters",
      required: true,
    },
    {
      id: "materials",
      text: "What cladding or roof sheeting profile do you prefer?",
      helper: "Colorbond Custom Orb, Trimdek, wood cladding, or structural weatherboard.",
      placeholder: "Colorbond Custom Orb in Monument shade",
      required: true,
    },
    {
      id: "leaks",
      text: "Are there active leaks or structural timber damage?",
      helper: "Helps roofers prioritize structural timber restoration.",
      placeholder: "Active leak in ceiling near skylight, timber battens feel soft",
      required: true,
    },
    {
      id: "budget",
      text: "What is the estimated budget for the roofing or cladding work?",
      helper: "Complete re-roofing projects usually start at $15,000.",
      placeholder: "$18,000 to $25,000",
      required: true,
    },
    {
      id: "timeline",
      text: "When would you like the roofing work completed?",
      helper: "Requires dry weather windows to prevent structural water damage.",
      placeholder: "Within 2 months, before storm season starts",
      required: true,
    },
  ],
  "Plastering & Gyprock": [
    {
      id: "location",
      text: "Which suburb is the plastering project in?",
      helper: "Required for matching with local plasterers.",
      placeholder: "Example: Noosa Heads",
      required: true,
    },
    {
      id: "scope",
      text: "What plastering work is required?",
      helper: "Plasterboard sheeting, ceiling replacement, patch repairs, cornices, or rendering.",
      placeholder: "Sheet and plaster walls and ceiling for renovated bathroom",
      required: true,
    },
    {
      id: "finish-level",
      text: "What level of plaster finish do you require?",
      helper: "Level 4 (standard paint finish), Level 5 (premium light-critical finish), or textures.",
      placeholder: "Level 4 standard finish, matching existing cornices",
      required: true,
    },
    {
      id: "water-resistance",
      text: "Are there wet areas requiring moisture-resistant board?",
      helper: "BCA regulations mandate blue-board or fiber cement sheeting in bathrooms and showers.",
      placeholder: "Yes, bathroom wet walls require moisture-resistant lining sheets",
      required: true,
    },
    {
      id: "budget",
      text: "What is the budget for plastering works?",
      helper: "Includes supply, hanging, flushing, and sanding.",
      placeholder: "$1,500 to $3,000",
      required: true,
    },
    {
      id: "timeline",
      text: "When should plastering start?",
      helper: "Sequenced after rough-in plumbing/electrical and insulation are completed.",
      placeholder: "In 3 weeks",
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

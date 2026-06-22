export type MagazineContentType =
  | "Style Guide"
  | "Project Story"
  | "Cost Guide"
  | "Builder Interview"
  | "Designer Interview";

export type MagazineCollection = "inspiration" | "projects" | "magazine";

export type MagazineFaq = {
  question: string;
  answer: string;
};

export type MagazineSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type MagazineArticle = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  type: MagazineContentType;
  collection: MagazineCollection;
  category: string;
  heroImage: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  featured?: boolean;
  status: "draft" | "published";
  seo: {
    title: string;
    description: string;
  };
  projectMeta?: {
    location: string;
    projectType: string;
    budgetRange: string;
    timeline: string;
  };
  styleMeta?: {
    palette: string[];
    bestFor: string;
    costLevel: string;
  };
  sections: MagazineSection[];
  faq: MagazineFaq[];
};

export const contentTypeRegistry: Record<MagazineContentType, {
  description: string;
  primaryCollection: MagazineCollection;
  editorialGoal: string;
}> = {
  "Style Guide": {
    description: "Evergreen inspiration and decision guides for renovation styles, materials and finishes.",
    primaryCollection: "inspiration",
    editorialGoal: "Help homeowners choose a direction before they request a quote.",
  },
  "Project Story": {
    description: "Narrative case studies built from real or representative QLD renovation scenarios.",
    primaryCollection: "projects",
    editorialGoal: "Show scope, trade sequence, cost drivers and homeowner decisions.",
  },
  "Cost Guide": {
    description: "Practical budget ranges and cost drivers for Queensland renovations.",
    primaryCollection: "magazine",
    editorialGoal: "Set realistic expectations before homeowners speak to trades.",
  },
  "Builder Interview": {
    description: "Trade-led explainers from licensed builders and specialists.",
    primaryCollection: "magazine",
    editorialGoal: "Build trust and surface compliance or delivery risks.",
  },
  "Designer Interview": {
    description: "Design-led interviews with styling, material and layout advice.",
    primaryCollection: "magazine",
    editorialGoal: "Give homeowners taste-level guidance with practical constraints.",
  },
};

export const magazineArticles: MagazineArticle[] = [
  {
    slug: "coastal-minimalist-bathroom-style-guide",
    title: "Coastal Minimalist Bathroom Style Guide",
    subtitle: "Clean lines, warm whites, natural texture and Queensland-ready finishes.",
    excerpt: "A practical style guide for homeowners who want a calm coastal bathroom without creating a cold or generic space.",
    type: "Style Guide",
    collection: "inspiration",
    category: "Bathroom",
    heroImage: "/gallery/interior-1.jpg",
    readTime: "6 min read",
    publishedAt: "2026-01-08",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Bathroom", "Coastal", "Materials", "Style"],
    featured: true,
    status: "published",
    seo: {
      title: "Coastal Minimalist Bathroom Style Guide | CoastHomeHub",
      description: "A Queensland-focused coastal minimalist bathroom style guide covering palette, materials, budget level and trade considerations.",
    },
    styleMeta: {
      palette: ["#f5f0e8", "#d8f0ed", "#1f7a72"],
      bestFor: "Ensuites, apartments, beach houses and family bathrooms",
      costLevel: "$18k-$45k depending on scope",
    },
    sections: [
      {
        heading: "Why This Style Works In South East Queensland",
        paragraphs: [
          "Coastal minimalism suits Queensland light because it keeps surfaces calm while adding texture through timber, stone-look porcelain, brushed fixtures and soft greens.",
          "The best versions avoid bright blue-white finishes and use warmer neutrals that stay softer in strong daylight.",
        ],
      },
      {
        heading: "Core Materials",
        paragraphs: ["The look depends on restraint. Choose fewer materials and let the detail sit in texture, grout, fixture finish and lighting."],
        bullets: [
          "Large-format porcelain floor tiles with slip resistance",
          "Timber-look vanity or warm white cabinetry",
          "Brushed nickel, chrome or aged brass tapware",
          "Micro texture wall tile or vertical stack feature tile",
        ],
      },
      {
        heading: "Planning Notes",
        paragraphs: [
          "Keep plumbing locations stable if budget is tight. Spend more on waterproofing, tile set-out and ventilation before decorative upgrades.",
        ],
      },
    ],
    faq: [
      {
        question: "Is coastal minimalism expensive?",
        answer: "It can be mid-range if plumbing stays put and the material palette is controlled. Custom stone, niche lighting and premium tapware push the budget up.",
      },
      {
        question: "What is the main mistake to avoid?",
        answer: "Using too many beach-themed accents. The style works better when coastal cues come from texture, light and durable materials.",
      },
    ],
  },
  {
    slug: "warm-coastal-kitchen-refresh-guide",
    title: "Warm Coastal Kitchen Refresh Guide",
    subtitle: "A Queensland kitchen palette built around warmth, durability and indoor-outdoor living.",
    excerpt: "How to refresh a coastal kitchen with warm whites, practical benchtops, better lighting and layout changes that do not overcapitalise.",
    type: "Style Guide",
    collection: "inspiration",
    category: "Kitchen",
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop",
    readTime: "5 min read",
    publishedAt: "2026-02-12",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Kitchen", "Coastal", "Cabinetry"],
    status: "published",
    seo: {
      title: "Warm Coastal Kitchen Refresh Guide | CoastHomeHub",
      description: "A Queensland kitchen refresh guide covering warm coastal palettes, layout choices, benchtop options and budget ranges.",
    },
    styleMeta: {
      palette: ["#faf8f5", "#c8b89a", "#155e58"],
      bestFor: "Apartments, family homes and pre-sale kitchen updates",
      costLevel: "$8k-$45k depending on cabinetry and layout",
    },
    sections: [
      {
        heading: "The Refresh Strategy",
        paragraphs: [
          "A refresh works when the kitchen layout is serviceable but tired. Cabinet fronts, benchtops, splashback, lighting and handles can shift the room without a full rebuild.",
        ],
      },
      {
        heading: "Material Direction",
        paragraphs: ["Queensland kitchens need finishes that handle humidity, fingerprints and strong daylight."],
        bullets: [
          "Warm white or muted green cabinetry",
          "Porcelain or engineered stone-look surfaces",
          "Powder-coated or brushed hardware",
          "Layered task lighting rather than one central light",
        ],
      },
      {
        heading: "When To Go Full Renovation",
        paragraphs: [
          "Move beyond refresh if the work triangle is poor, appliances are undersized, water damage is present, or storage cannot be fixed with cabinetry changes.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I keep the existing cabinetry boxes?",
        answer: "Often yes, if the carcasses are square, dry and structurally sound. A site inspection should confirm this before ordering fronts.",
      },
    ],
  },
  {
    slug: "burleigh-bathroom-project-story",
    title: "Project Story: Burleigh Bathroom Rebuild",
    subtitle: "How a leaking bathroom became a calm, trade-ready coastal ensuite.",
    excerpt: "A project story showing the sequence, budget drivers and decisions behind a Burleigh Heads bathroom rebuild.",
    type: "Project Story",
    collection: "projects",
    category: "Bathroom",
    heroImage: "/gallery/interior-2.jpg",
    readTime: "7 min read",
    publishedAt: "2026-03-04",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Projects",
    tags: ["Bathroom", "Waterproofing", "Project Story"],
    featured: true,
    status: "published",
    seo: {
      title: "Burleigh Bathroom Rebuild Project Story | CoastHomeHub",
      description: "A Queensland bathroom project story covering waterproofing, trade sequence, material choices, budget range and timeline.",
    },
    projectMeta: {
      location: "Burleigh Heads",
      projectType: "Bathroom rebuild",
      budgetRange: "$24k-$34k",
      timeline: "5-7 weeks site time",
    },
    sections: [
      {
        heading: "The Starting Point",
        paragraphs: [
          "The homeowner had a tired bathroom with a leaking vanity wall, poor ventilation and a shower layout that made the room feel smaller than it was.",
        ],
      },
      {
        heading: "Scope",
        paragraphs: ["The brief focused on keeping plumbing close to existing locations while correcting waterproofing and ventilation issues."],
        bullets: [
          "Strip out existing fixtures and tiles",
          "Inspect substrate and replace damaged sheeting",
          "Install compliant waterproofing system",
          "Retile floors and wet walls",
          "Install walk-in shower, vanity, lighting and exhaust",
        ],
      },
      {
        heading: "Cost Drivers",
        paragraphs: [
          "The biggest budget variables were substrate repair, tile selection, shower screen detail and whether plumbing could stay close to the original wall positions.",
        ],
      },
    ],
    faq: [
      {
        question: "Why does waterproofing affect the timeline?",
        answer: "Waterproofing needs correct preparation, application and cure time before tiling. Rushing this step is a common cause of future failures.",
      },
    ],
  },
  {
    slug: "sunshine-coast-deck-project-story",
    title: "Project Story: Sunshine Coast Deck Upgrade",
    subtitle: "Composite decking, better shade and a lower-maintenance outdoor room.",
    excerpt: "A project story for an outdoor living upgrade shaped by salt air, summer use and maintenance expectations.",
    type: "Project Story",
    collection: "projects",
    category: "Outdoor",
    heroImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80&auto=format&fit=crop",
    readTime: "6 min read",
    publishedAt: "2026-03-18",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Projects",
    tags: ["Outdoor", "Decking", "Project Story"],
    status: "published",
    seo: {
      title: "Sunshine Coast Deck Upgrade Project Story | CoastHomeHub",
      description: "A Sunshine Coast outdoor project story covering decking materials, shade, salt-air durability and cost drivers.",
    },
    projectMeta: {
      location: "Sunshine Coast",
      projectType: "Deck and outdoor living upgrade",
      budgetRange: "$28k-$48k",
      timeline: "4-8 weeks depending on approvals and structure",
    },
    sections: [
      {
        heading: "The Brief",
        paragraphs: [
          "The homeowners wanted a deck that could handle weekend use, summer heat and less ongoing maintenance than their existing painted timber boards.",
        ],
      },
      {
        heading: "Material Choices",
        paragraphs: ["Composite decking reduced maintenance, while aluminium balustrade and stainless fixings helped manage coastal exposure."],
        bullets: ["Composite boards", "Powder-coated aluminium", "Stainless fixings", "Integrated shade planning"],
      },
      {
        heading: "Delivery Notes",
        paragraphs: [
          "The planning stage focused on structure, drainage, shade direction and whether the existing frame could be reused.",
        ],
      },
    ],
    faq: [
      {
        question: "Is composite decking always better than timber?",
        answer: "Not always. Composite is lower maintenance, but timber can be repaired and refinished more easily. The better choice depends on exposure, budget and desired finish.",
      },
    ],
  },
  {
    slug: "bathroom-renovation-cost-guide-qld",
    title: "Bathroom Renovation Cost Guide For Queensland",
    subtitle: "What drives the difference between a cosmetic refresh and a full rebuild.",
    excerpt: "A practical QLD cost guide covering waterproofing, tiles, plumbing, fixtures, approvals and hidden defects.",
    type: "Cost Guide",
    collection: "magazine",
    category: "Cost Guide",
    heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80&auto=format&fit=crop",
    readTime: "8 min read",
    publishedAt: "2026-01-24",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Cost Guide", "Bathroom", "Queensland"],
    featured: true,
    status: "published",
    seo: {
      title: "Bathroom Renovation Cost Guide QLD | CoastHomeHub",
      description: "Queensland bathroom renovation cost guide with budget, mid-range and premium ranges plus key cost drivers.",
    },
    sections: [
      {
        heading: "Typical Ranges",
        paragraphs: ["Bathroom costs vary because demolition can expose water damage, non-compliant waterproofing or substrate issues."],
        bullets: [
          "Cosmetic refresh: $8k-$14k",
          "Mid-range renovation: $18k-$32k",
          "Premium ensuite: $35k-$65k+",
        ],
      },
      {
        heading: "Biggest Cost Drivers",
        paragraphs: [
          "Moving plumbing, changing walls, large-format tile set-out, custom screens, premium fixtures and hidden moisture damage usually move the budget fastest.",
        ],
      },
      {
        heading: "Budget Control",
        paragraphs: [
          "Keep plumbing stable, choose a restrained tile palette, confirm ventilation early and carry contingency for substrate repair.",
        ],
      },
    ],
    faq: [
      {
        question: "What contingency should I allow?",
        answer: "For a full bathroom renovation, many homeowners allow 10-20 percent depending on age, access and known water damage risk.",
      },
      {
        question: "Can I renovate a bathroom in two weeks?",
        answer: "Some small scopes can move quickly, but waterproofing cure times, trade sequencing and material availability usually make realistic timelines longer.",
      },
    ],
  },
  {
    slug: "builder-interview-waterproofing-red-flags",
    title: "Builder Interview: Waterproofing Red Flags",
    subtitle: "What a licensed builder checks before a bathroom is tiled.",
    excerpt: "A builder-led interview on the waterproofing details homeowners should ask about before a bathroom renovation starts.",
    type: "Builder Interview",
    collection: "magazine",
    category: "Builder Interview",
    heroImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80&auto=format&fit=crop",
    readTime: "5 min read",
    publishedAt: "2026-04-10",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Builder Interview", "Waterproofing", "Compliance"],
    status: "published",
    seo: {
      title: "Builder Interview: Waterproofing Red Flags | CoastHomeHub",
      description: "A builder interview explaining waterproofing red flags, documentation and bathroom renovation compliance checks.",
    },
    sections: [
      {
        heading: "Question: What Do You Check First?",
        paragraphs: [
          "The first check is whether the substrate is suitable. Waterproofing is only as good as the surface it is applied to, so movement, moisture and damaged sheeting need to be fixed first.",
        ],
      },
      {
        heading: "Question: What Should Homeowners Ask For?",
        paragraphs: [
          "Ask who is doing the waterproofing, what system is being used, what areas are included and how curing will be handled before tiling starts.",
        ],
      },
      {
        heading: "Question: What Is The Biggest Warning Sign?",
        paragraphs: [
          "The biggest warning sign is speed without explanation. If a wet area is stripped, waterproofed and tiled too quickly, ask how preparation and cure times were managed.",
        ],
      },
    ],
    faq: [
      {
        question: "Should waterproofing be documented?",
        answer: "Yes. Homeowners should keep invoices, product/system details and any compliance documentation provided by the contractor.",
      },
    ],
  },
  {
    slug: "designer-interview-small-kitchen-layouts",
    title: "Designer Interview: Small Kitchen Layouts",
    subtitle: "How designers make compact Queensland kitchens work harder.",
    excerpt: "A designer interview on storage, lighting, appliance placement and visual tricks for smaller kitchens.",
    type: "Designer Interview",
    collection: "magazine",
    category: "Designer Interview",
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop",
    readTime: "5 min read",
    publishedAt: "2026-05-02",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Designer Interview", "Kitchen", "Small Spaces"],
    status: "published",
    seo: {
      title: "Designer Interview: Small Kitchen Layouts | CoastHomeHub",
      description: "Designer advice for small kitchen renovations, including storage, lighting, appliance placement and layout trade-offs.",
    },
    sections: [
      {
        heading: "Question: Where Should A Small Kitchen Budget Go?",
        paragraphs: [
          "Spend first on layout, storage and lighting. Decorative finishes matter, but a compact kitchen fails quickly if everyday movement and storage are not solved.",
        ],
      },
      {
        heading: "Question: What Makes A Kitchen Feel Larger?",
        paragraphs: [
          "Consistent floor finish, fewer upper cabinets where possible, good task lighting and a calm palette can make a compact room feel less broken up.",
        ],
      },
      {
        heading: "Question: What Is Worth Customising?",
        paragraphs: [
          "Custom pantry inserts, corner storage and appliance garages can be worth it if they remove clutter from the benchtop.",
        ],
      },
    ],
    faq: [
      {
        question: "Should small kitchens use dark colours?",
        answer: "They can, but use contrast carefully. Dark lower cabinetry with lighter walls and good lighting is safer than an all-dark compact kitchen.",
      },
    ],
  },
];

export function getPublishedMagazineArticles() {
  return magazineArticles
    .filter((article) => article.status === "published")
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getFeaturedMagazineArticles() {
  return getPublishedMagazineArticles().filter((article) => article.featured);
}

export function getArticlesByType(type: MagazineContentType) {
  return getPublishedMagazineArticles().filter((article) => article.type === type);
}

export function getArticlesByCollection(collection: MagazineCollection) {
  return getPublishedMagazineArticles().filter((article) => article.collection === collection);
}

export function getArticleBySlug(slug: string) {
  return getPublishedMagazineArticles().find((article) => article.slug === slug) ?? null;
}

export function getRelatedArticles(article: MagazineArticle) {
  return getPublishedMagazineArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .filter((candidate) => candidate.type === article.type || candidate.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3);
}

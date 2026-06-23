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
  image?: string;
  imageCaption?: string;
  quote?: string;
  quoteAuthor?: string;
  aside?: {
    title: string;
    text: string;
    list?: string[];
  };
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
  lookbook?: {
    wideAngle: string;
    detailShot: string;
    materialSpec: string;
    captions: {
      wideAngle: string;
      detailShot: string;
      materialSpec: string;
    };
  };
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
    tags: ["Bathroom", "Coastal", "Materials", "Style Guide"],
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
          "The best versions avoid bright blue-white finishes and use warmer neutrals that stay softer in strong daylight. The goal is to capture the light refraction without creating a clinical or sterile look."
        ],
        quote: "Minimalism is not about deleting; it is about calibrating. A single brass detail next to warm Tasmanian Oak carries more design weight than ten mismatched fixtures.",
        quoteAuthor: "EIJ Construction Pty Ltd"
      },
      {
        heading: "Core Materials & Specifications",
        paragraphs: [
          "The look depends on restraint. Choose fewer materials and let the detail sit in texture, grout, fixture finish and lighting. Slip resistance is a primary technical parameter that must not be neglected."
        ],
        bullets: [
          "Large-format porcelain floor tiles with slip resistance (P3/P4 rating)",
          "Timber-look vanity or warm white cabinetry (HMR sub-base)",
          "Brushed nickel, chrome or aged brass tapware with high WELS rating",
          "Micro texture wall tile or vertical stack feature tile with matching grout lines"
        ],
        aside: {
          title: "Wet Area Tile Slip and Layout Index",
          text: "For QLD residential bathroom floors, specify Beaumont Tiles or Reece Porcelain with the following characteristics:",
          list: [
            "Floor Tiles: Minimum P3 slip resistance rating (P4 for outdoor/spa zones)",
            "Grout: Epoxy or polyurethane-based to prevent moisture stains and mold",
            "Substrate prep: 12mm minimum fiber cement underlay over floor joists"
          ]
        }
      },
      {
        heading: "Planning Notes & Trade Sequencing",
        paragraphs: [
          "Keep plumbing locations stable if budget is tight. Spend more on waterproofing, tile set-out and ventilation before decorative upgrades. An active mechanical exhaust fan must be sized correctly according to the room volume to prevent timber warping."
        ]
      }
    ],
    faq: [
      {
        question: "Is coastal minimalism expensive?",
        answer: "It can be mid-range if plumbing stays put and the material palette is controlled. Custom stone, niche lighting and premium tapware push the budget up."
      },
      {
        question: "What is the main mistake to avoid?",
        answer: "Using too many beach-themed accents. The style works better when coastal cues come from texture, light and durable materials."
      }
    ],
    lookbook: {
      wideAngle: "/gallery/interior-1.jpg",
      detailShot: "/images/microcement_backlit_mirror.png",
      materialSpec: "/images/brushed_brass_macro.png",
      captions: {
        wideAngle: "Main perspective: Seamless warm sand tiles with custom oak timber vanity.",
        detailShot: "Detail shot: Warm backlit round mirror against textured microcement.",
        materialSpec: "Material specification: Macro view of brushed brass fittings."
      }
    }
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
    tags: ["Kitchen", "Coastal", "Cabinetry", "Style Guide"],
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
          "A refresh works when the kitchen layout is serviceable but tired. Cabinet fronts, benchtops, splashback, lighting and handles can shift the room without a full rebuild. This keeps construction waste low and reduces the overall timeline to under two weeks."
        ],
        quote: "A kitchen refresh must prioritize the workflow. Upgrading only the cabinet fronts while leaving a broken work triangle is a missed opportunity.",
        quoteAuthor: "Noosa Coastal Carpentry & Decks"
      },
      {
        heading: "Material Direction and Humidity Resistance",
        paragraphs: [
          "Queensland kitchens need finishes that handle humidity, fingerprints and strong daylight. Low-cost alternatives often peel at the seams under constant coastal moisture."
        ],
        bullets: [
          "Warm white or muted green cabinetry (polyurethane coated)",
          "Porcelain or engineered stone-look surfaces (reconstituted quartz)",
          "Powder-coated or brushed hardware with anti-tarnish coating",
          "Layered task lighting rather than one central ceiling light"
        ],
        aside: {
          title: "Kitchen Joinery Material Specifications",
          text: "Queensland's high humidity requires cabinetry materials that resist swelling. Select standard-complying options:",
          list: [
            "Carcass: High moisture resistant (HMR) particleboard with 1mm ABS edges",
            "Fronts: Laminex high pressure laminate or polyurethane-painted MR MDF",
            "Adhesives: PUR (Polyurethane) glue line to prevent water-wicking at seams"
          ]
        }
      },
      {
        heading: "When To Go Full Renovation",
        paragraphs: [
          "Move beyond refresh if the work triangle is poor, appliances are undersized, water damage is present, or storage cannot be fixed with cabinetry changes. If structural load-bearing walls must be removed, certifier approval is mandatory."
        ]
      }
    ],
    faq: [
      {
        question: "Can I keep the existing cabinetry boxes?",
        answer: "Often yes, if the carcasses are square, dry and structurally sound. A site inspection should confirm this before ordering fronts."
      }
    ]
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
        heading: "The Starting Point & Defect Discovery",
        paragraphs: [
          "The homeowner had a tired bathroom with a leaking vanity wall, poor ventilation and a shower layout that made the room feel smaller than it was. Demolition immediately exposed structural dry rot."
        ],
        quote: "When we stripped the old lining, we found significant wet rot in the pine wall studs. Correcting the timber framing and applying structural timber sealer saved the build.",
        quoteAuthor: "Paddington Tiling & Waterproofing"
      },
      {
        heading: "Scope of Works",
        paragraphs: ["The brief focused on keeping plumbing close to existing locations while correcting waterproofing and ventilation issues to ensure statutory home warranty protection."],
        bullets: [
          "Strip out existing fixtures and tiles to framing substrate",
          "Inspect studs and replace water-damaged pine timber sheets",
          "Install compliant AS 3740 Class III waterproofing membrane",
          "Retile floors and wet walls with miters on external corners",
          "Install walk-in shower, floating oak vanity, custom LED lighting"
        ],
        aside: {
          title: "Substrate and Framing Compliance (AS 1684)",
          text: "Before waterproofing, verify that the timber wall studs conform to QLD residential framing standards:",
          list: [
            "Stud spacing: Maximum 450mm centers for wet area lining boards",
            "Nogging: Active mid-height noggings installed to prevent sheet deflection",
            "Sealing: Structural timber framing sealed with protective wood oil"
          ]
        }
      },
      {
        heading: "Cost Drivers and Budget Allocation",
        paragraphs: [
          "The biggest budget variables were substrate repair, tile selection, shower screen detail and whether plumbing could stay close to the original wall positions. Keeping the waste outlets in place saved over $3,500 in concrete drilling fees."
        ]
      }
    ],
    faq: [
      {
        question: "Why does waterproofing affect the timeline?",
        answer: "Waterproofing needs correct preparation, application and cure time before tiling. Rushing this step is a common cause of future failures."
      }
    ],
    lookbook: {
      wideAngle: "/gallery/interior-2.jpg",
      detailShot: "/images/waterproofing_detail.png",
      materialSpec: "/images/old_bathroom_before.png",
      captions: {
        wideAngle: "Main perspective: The completed organic bathroom ensuite overhaul.",
        detailShot: "Detail shot: Fluted safety glass shower screen and brass drainage trim.",
        materialSpec: "Work in progress: Water damage discovered on stud wall during strip-out."
      }
    }
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
        heading: "The Brief & Coastal Challenges",
        paragraphs: [
          "The homeowners wanted a deck that could handle weekend use, summer heat and less ongoing maintenance than their existing painted timber boards. Being located close to the beach, high-salinity air was a critical factor."
        ],
        quote: "Composite decking is a long-term investment. To prevent structural warping, we engineered double-joists at all butt joints and used custom hidden clips.",
        quoteAuthor: "Noosa Coastal Carpentry & Decks"
      },
      {
        heading: "Material Choices & Corrosion Protection",
        paragraphs: [
          "Composite decking reduced maintenance, while aluminium balustrade and stainless fixings helped manage coastal exposure. Timber framing underneath was double coated in timber preservative."
        ],
        bullets: [
          "Capped composite boards with high fade resistance",
          "Powder-coated aluminium perimeter posts",
          "Grade 316 marine-grade stainless steel fixings",
          "Integrated shade planning with high UV blocks"
        ],
        aside: {
          title: "QLD Coastal Subframe Checklist",
          text: "For decks built within 1km of saltwater spray (Sunshine Coast, Gold Coast), specify the following:",
          list: [
            "Fasteners: Grade 316 marine-grade stainless steel screws and joist hanger brackets",
            "Subframe: H3 or H4 treated pine joists, or structural anodized aluminium framing",
            "Spacing: Minimum 4mm side-to-side board gap to allow salt crystallization clearance"
          ]
        }
      },
      {
        heading: "Delivery Notes and Spans",
        paragraphs: [
          "The planning stage focused on structure, drainage, shade direction and whether the existing frame could be reused. Certifying the subframe loading capacity was critical before final structural sign-off."
        ]
      }
    ],
    faq: [
      {
        question: "Is composite decking always better than timber?",
        answer: "Not always. Composite is lower maintenance, but timber can be repaired and refinished more easily. The better choice depends on exposure, budget and desired finish."
      }
    ]
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
        heading: "Typical Renovation Ranges (2026 Index)",
        paragraphs: [
          "Bathroom costs vary because demolition can expose water damage, non-compliant waterproofing or substrate issues. Rerouting plumbing across concrete slabs is the highest contributor to cost increases."
        ],
        bullets: [
          "Cosmetic refresh: $8,000 - $14,000",
          "Mid-range renovation: $18,000 - $32,000",
          "Premium ensuite: $35,000 - $65,000+"
        ],
        quote: "Always keep a 15% contingency for renovations. Demolition is the only way to inspect the plumbing history, and pre-1990 homes often require major copper pipe rerouting.",
        quoteAuthor: "EIJ Construction Pty Ltd"
      },
      {
        heading: "Biggest Budget Drivers",
        paragraphs: [
          "Moving plumbing points, changing wall frames, laying large-format tile sheets, frameless glass screens, and high-end brass tapware move the budget fastest. Proper sequencing ensures labor is not wasted."
        ],
        aside: {
          title: "2026 QLD Renovation Labor Rates",
          text: "Vetted hourly rates for QLD trades (as of 2026 indexes):",
          list: [
            "Licensed Plumber: $95 - $125 per hour plus callout fees",
            "Licensed Electrician: $90 - $115 per hour for lighting and wiring layout",
            "Licensed Tiler / Waterproofer: $75 - $95 per hour (includes Form 16 prep)"
          ]
        }
      },
      {
        heading: "Budget Control Strategy",
        paragraphs: [
          "Keep plumbing outlets stable, choose a restrained tiles palette, confirm ventilation requirements early, and carry a strict contingency for timber subfloor repair."
        ]
      }
    ],
    faq: [
      {
        question: "What contingency should I allow?",
        answer: "For a full bathroom renovation, many homeowners allow 10-20 percent depending on age, access and known water damage risk."
      },
      {
        question: "Can I renovate a bathroom in two weeks?",
        answer: "Some small scopes can move quickly, but waterproofing cure times, trade sequencing and material availability usually make realistic timelines longer."
      }
    ]
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
          "The first check is whether the substrate is suitable. Waterproofing is only as good as the surface it is applied to, so movement, moisture and damaged sheeting need to be fixed first."
        ],
        quote: "Rushing the waterproofing membrane to cure is the single most expensive mistake a builder can make. If the membrane is tiled over while damp, the trapped solvent will blister and tear it.",
        quoteAuthor: "Paddington Tiling & Waterproofing"
      },
      {
        heading: "Question: What Should Homeowners Ask For?",
        paragraphs: [
          "Ask who is doing the waterproofing, what system is being used, what areas are included and how curing will be handled before tiling starts. In QLD, this must be backed by a Form 16."
        ],
        aside: {
          title: "Waterproofing Compliance Verification",
          text: "Ensure your contractor provides the following documentation before final sign-off:",
          list: [
            "Form 16: statutory certificate of inspection signed by a licensed applicator",
            "Product specification sheet showing Class III high-extensibility liquid polymer usage",
            "Photographic log of wall-to-floor bond breakers and water stop angles"
          ]
        }
      },
      {
        heading: "Question: What Is The Biggest Warning Sign?",
        paragraphs: [
          "The biggest warning sign is speed without explanation. If a wet area is stripped, waterproofed and tiled too quickly, ask how preparation and cure times were managed. Correct dry film thickness (DFT) requires at least 24 hours between coats."
        ]
      }
    ],
    faq: [
      {
        question: "Should waterproofing be documented?",
        answer: "Yes. Homeowners should keep invoices, product/system details and any compliance documentation provided by the contractor."
      }
    ]
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
          "Spend first on layout, storage and lighting. Decorative finishes matter, but a compact kitchen fails quickly if everyday movement and storage are not solved."
        ],
        quote: "Compact spaces succeed when clutter is designed out. Custom appliance garages with pocket doors allow you to hide the toaster and kettle instantly.",
        quoteAuthor: "EIJ Construction Pty Ltd"
      },
      {
        heading: "Question: What Makes A Kitchen Feel Larger?",
        paragraphs: [
          "Consistent floor finish, fewer upper cabinets where possible, good task lighting and a calm palette can make a compact room feel less broken up. Backlit splashbacks also help."
        ],
        aside: {
          title: "Small Space Design Rules",
          text: "Optimize compact kitchen floor plans with these design constraints:",
          list: [
            "Fridge door clearance: Ensure door swing does not block adjacent walkways",
            "Corner cupboards: Specify custom lazy-susans or pull-out blind-corner shelves",
            "Task lighting: Install under-cabinet LED ribbons at 3000K to prevent shadow casting"
          ]
        }
      },
      {
        heading: "Question: What Is Worth Customising?",
        paragraphs: [
          "Custom pantry inserts, corner storage and appliance garages are worth the extra carpentry budget because they keep the primary stone benchtop clear of clutter."
        ]
      }
    ],
    faq: [
      {
        question: "Should small kitchens use dark colours?",
        answer: "They can, but use contrast carefully. Dark lower cabinetry with lighter walls and good lighting is safer than an all-dark compact kitchen."
      }
    ]
  },
  {
    slug: "the-material-edit-fluted-glass-tasmanian-oak",
    title: "The Material Edit: Fluted Glass & Tasmanian Oak",
    subtitle: "A Vogue-inspired material pairing meets strict QLD building compliance.",
    excerpt: "How to balance the tactile warmth of natural Australian hardwood with the structural light-refraction of vertical ribbed glass in ensuite designs.",
    type: "Style Guide",
    collection: "inspiration",
    category: "Bathroom",
    heroImage: "/gallery/interior-3.jpg",
    readTime: "7 min read",
    publishedAt: "2026-06-20",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Bathroom", "Materials", "Tasmanian Oak", "Fluted Glass"],
    featured: true,
    status: "published",
    seo: {
      title: "Tactile Bathroom Style Guide: Fluted Glass & Tasmanian Oak | CoastHomeHub",
      description: "Learn how to style Tasmanian Oak and fluted glass in Queensland bathroom renovations while staying compliant with waterproofing and AS 1288 glass standards."
    },
    styleMeta: {
      palette: ["#e3d8c5", "#ffffff", "#3d3d3d"],
      bestFor: "Luxury master ensuites, parent retreats and light-filled bathrooms",
      costLevel: "Premium fixture and carpentry tier"
    },
    sections: [
      {
        heading: "The Aesthetic Chemistry (Vogue Styling)",
        paragraphs: [
          "In contemporary design, luxury is defined by the conversation between natural textures and architectural glass. Tasmanian Oak offers a warm, honey-toned grain that feels soft and grounded. When paired with the sharp, vertical lines of fluted glass, it creates a striking balance of texture and light refraction.",
          "To keep this look editorial, avoid heavy black metal frames. Opt for frameless or minimal brass/gold brackets. This allows the glass texture and timber grain to remain the central design elements, keeping the space open and serene."
        ],
        quote: "When working with natural Tasmanian Oak veneer in high-moisture bathrooms, we specify triple coats of Osmo Polyx-Oil to seal the grain. This preserves the matte organic texture while offering high water resistance.",
        quoteAuthor: "EIJ Construction Pty Ltd",
        image: "/images/brushed_brass_macro.png",
        imageCaption: "Figure 1.1: A detailed macro close-up of custom brushed gold fixtures mounted against Osmo-sealed warm Tasmanian Oak timber."
      },
      {
        heading: "The Construction Reality (QBCC & AS 1288 Standards)",
        paragraphs: [
          "While timber brings high-end aesthetics, raw hardwood in wet areas is a major liability under QLD's high humidity. Tasmanian Oak used in vanities or wall features must be double-sealed with marine-grade polyurethane or Osmo oil. Proper mechanical ventilation is mandatory to prevent mold and timber warping.",
          "Furthermore, any glass panel installed in a wet area must comply with Australian Standard AS 1288. For frameless shower screens, this means using a minimum of 10mm toughened safety glass. Ensure your QBCC-licensed glazier provides a certificate of compliance upon installation."
        ],
        aside: {
          title: "AS 1288 Safety Glass Standards",
          text: "All glazed installations in QLD bathrooms must conform to standard mechanical tolerances:",
          list: [
            "Frameless shower screens must use a minimum of 10mm toughened safety glass",
            "Semi-framed or framed screens require a minimum of 6mm safety glass",
            "All panels must carry a permanent acid-etched watermark verifying AS 1288 compliance"
          ]
        },
        image: "/images/waterproofing_detail.png",
        imageCaption: "Figure 1.2: The intersection of 10mm safety fluted glass, sage wall tiles, and a brass floor waste drain complying with QLD AS 3740/1288 standards."
      },
      {
        heading: "Get the Look: Trade Specifications",
        paragraphs: [
          "When submitting your project brief through CoastHomeHub, specify the following details to ensure accurate quoting from local contractors:"
        ],
        bullets: [
          "Timber: Select select-grade Tasmanian Oak veneer with moisture-resistant MDF casing.",
          "Glass: 10mm toughened safety fluted glass shower screen with polished edges.",
          "Hardware: Brushed gold or satin brass wall brackets (no perimeter frame).",
          "Waterproofing: Class 3 membrane system fully compliant with AS 3740."
        ]
      }
    ],
    faq: [
      {
        question: "Is Tasmanian Oak safe for high-moisture bathrooms?",
        answer: "Yes, but only if it is correctly sealed on all sides (including the back and cut-outs) before installation, and the bathroom has an active mechanical exhaust fan sized for the room."
      },
      {
        question: "Does fluted glass require more cleaning?",
        answer: "No. The textured ribbed surface actually hides water spots and fingerprints much better than clear glass, making it both beautiful and low-maintenance."
      }
    ],
    lookbook: {
      wideAngle: "/gallery/interior-3.jpg",
      detailShot: "/images/brushed_brass_macro.png",
      materialSpec: "/images/waterproofing_detail.png",
      captions: {
        wideAngle: "Main perspective: Tasmanian Oak and ribbed glass ensuite styling.",
        detailShot: "Fixture specification: Brushed gold macro details.",
        materialSpec: "AS 1288 screen bracket fixing into Sage stack tiles."
      }
    }
  },
  {
    slug: "noosa-pavilion-kitchen-transformation",
    title: "Project Story: The Noosa Pavilion Kitchen Transformation",
    subtitle: "A Kinfolk-inspired indoor-outdoor flow backed by structural steel engineering.",
    excerpt: "Behind the scenes of a high-end Noosa kitchen renovation where load-bearing walls were replaced with custom black steel beams.",
    type: "Project Story",
    collection: "projects",
    category: "Kitchen",
    heroImage: "/gallery/interior-4.jpg",
    readTime: "8 min read",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Projects",
    tags: ["Kitchen", "Structural", "Noosa", "Project Story"],
    featured: true,
    status: "published",
    seo: {
      title: "Noosa Pavilion Kitchen Renovation Project Story | CoastHomeHub",
      description: "Inside the Noosa Pavilion renovation: a structural kitchen redesign featuring load-bearing wall removal, custom steel engineering, and high-end timber curation."
    },
    projectMeta: {
      location: "Noosa Heads",
      projectType: "Structural wall removal & luxury kitchen refit",
      budgetRange: "$65k-$95k",
      timeline: "6-8 weeks site time"
    },
    sections: [
      {
        heading: "The Editorial Brief",
        paragraphs: [
          "The goal for this Noosa Heads pavilion home was to erase the boundary between the kitchen and the outdoor entertaining deck. The original 1990s layout was enclosed, blocking the sun and isolating the cook from the family area.",
          "Drawing inspiration from minimalist European design, we planned a wide island bench in light limestone-look quartz, contrasted with matte black cabinetry and integrated timber shelves. The highlight is the wide servery window that folds completely open to the alfresco dining space."
        ],
        quote: "Removing internal load-bearing walls is a structural operation. We lift the custom engineered steel universal beam into place using a material lift to ensure zero deflection of the roof rafters.",
        quoteAuthor: "Noosa Coastal Carpentry & Decks",
        image: "/images/noosa_servery_window.png",
        imageCaption: "Figure 2.1: Kinfolk-style wide-angle shot of the completed Noosa pavilion kitchen bifold servery window opening onto the outdoor deck."
      },
      {
        heading: "The Structural Challenge (Structural Steel & Permits)",
        paragraphs: [
          "To achieve the open-plan flow, we had to remove a 4.2-meter load-bearing timber wall that supported the roof rafters. This required a structural engineer to design a custom steel beam (universal beam) to span the opening, resting on new double studs at each end.",
          "Under Queensland regulations, structural modifications require building approval (BA) from a private certifier. We submitted engineering drawings (Form 15) and obtained the necessary permits before starting demolition. An experienced QBCC-licensed carpenter coordinated the steel lift using a specialized material hoist."
        ],
        aside: {
          title: "QLD Internal Structural Modification Checklist",
          text: "Before starting any internal wall demolition, ensure your builder has coordinated the following regulatory steps:",
          list: [
            "Engage a registered structural engineer to design structural spans and supply a Form 15 Certificate",
            "Submit drawings to a private certifier to secure Building Approval (BA)",
            "Check wall cavities for active electrical wiring or plumbing vents before cutting studs"
          ]
        },
        image: "/gallery/interior-8.jpg",
        imageCaption: "Figure 2.2: A detailed close-up of custom integrated oak shelves and matte black joinery panels."
      },
      {
        heading: "Exact Budget & Materials Breakdown",
        paragraphs: [
          "The project total ended at $84,500. Major cost drivers included the structural steel fabrication and certifier fees ($9,200), premium engineered stone for the waterfall island ($14,500), and custom integrated polyurethane cabinetry ($28,000). The remaining budget covered plumbing, electrical upgrades, and commercial-grade aluminum bifold windows."
        ]
      }
    ],
    faq: [
      {
        question: "Do I need a building permit to remove an internal wall in QLD?",
        answer: "If the wall is load-bearing, yes. You must engage a structural engineer to design the replacement beam and obtain building approval from a licensed certifier."
      },
      {
        question: "What is a Form 15 in QLD construction?",
        answer: "A Form 15 is a Certificate of Design Compliance. It is issued by the structural engineer to certify that the proposed steel beam design complies with the Building Code of Australia (BCA)."
      }
    ],
    lookbook: {
      wideAngle: "/images/noosa_servery_window.png",
      detailShot: "/images/luxury_kitchen.png",
      materialSpec: "/gallery/interior-8.jpg",
      captions: {
        wideAngle: "Main perspective: Custom bifold window opening onto the alfresco deck.",
        detailShot: "Interior view: Waterfall-edge limestone island and integrated black cabinetry.",
        materialSpec: "Joinery specification: Solid oak floating shelving integration."
      }
    }
  },
  {
    slug: "the-2026-qld-renovation-budget-blueprint",
    title: "The 2026 QLD Renovation Budget Blueprint",
    subtitle: "A Dwell-style cost guide for smart mix-and-match choices and waterproofing protection.",
    excerpt: "How to budget like a builder and style like an editor. Real numbers, labor trends, and cost-saving choices for Queensland homes.",
    type: "Cost Guide",
    collection: "magazine",
    category: "Cost Guide",
    heroImage: "/gallery/interior-5.jpg",
    readTime: "9 min read",
    publishedAt: "2026-06-15",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Cost Guide", "Budgeting", "Materials", "Queensland"],
    status: "published",
    seo: {
      title: "2026 QLD Renovation Budget & Cost Guide | CoastHomeHub",
      description: "Maximize your renovation budget in South East Queensland. Dwell-style high-low cost strategy, waterproofing safety advice, and 2026 labor cost trends."
    },
    sections: [
      {
        heading: "High-Low Mix: Where to Invest vs. Save",
        paragraphs: [
          "Great editors know how to mix high-end luxury items with cost-effective basics to create a stunning overall impression. In renovations, this is called the High-Low Mix strategy. To get the best return on your investment, direct your budget where it will have the most tactile and visual impact.",
          "Invest in touchpoints: spend on designer tapware, a stone vanity top, and a feature wall tile that catches the eye. Save on hidden items: use standard laminate or polyurethane cabinet boxes, standard white wet-wall tiles for non-feature walls, and off-the-shelf mirror cabinets."
        ],
        quote: "To get the Dwell look without the price tag, spend on high-touch areas: a premium stonemasonry mitered island edge and designer kitchen tapware. Use HMR laminate panel fronts for secondary cupboards.",
        quoteAuthor: "EIJ Construction Pty Ltd",
        image: "/gallery/interior-5.jpg",
        imageCaption: "Figure 3.1: An editorial high-low mix bathroom styling layout featuring a custom mirror cabinet and standard tile backing."
      },
      {
        heading: "The Invisible Costs: Waterproofing & Prep",
        paragraphs: [
          "The biggest mistake homeowners make is allocating 100% of their budget to visible finishes. In QLD, the highest source of building disputes is water leaks. If your bathroom waterproofing fails, you will have to strip the tiles and start again — nullifying any savings.",
          "Ensure your budget allocates at least $2,000-$3,500 for professional waterproofing by a QBCC-licensed contractor. Rushing the screed or membrane drying times to save labor costs will always lead to long-term structural issues."
        ],
        image: "/images/old_bathroom_before.png",
        imageCaption: "Figure 3.2: Moisture and structural rot discovered behind old sheeting during demolition highlight the risk of improper waterproofing."
      },
      {
        heading: "Labor and Inflation Trends in QLD (2026)",
        paragraphs: [
          "Renovation labor costs in South East Queensland have stabilized after the surges of recent years, but trade availability remains tight. Expect carpentry labor to average $75-$95/hour, while specialized trades like plumbing and electrical range from $90-$120/hour.",
          "When planning your budget, always add a strict 15% contingency buffer for unforeseen issues (like structural dry rot behind old walls, asbestos removal, or rerouting old copper pipes) that can only be diagnosed after demolition."
        ],
        aside: {
          title: "Renovation Contingency Allocation Checklist",
          text: "Protect your project budget against common hidden defects discovered during strip-out:",
          list: [
            "Allocate 10-15% of the total contract value as a contingency cash buffer",
            "Confirm whether the building was constructed pre-1990 to allow for safe asbestos removal fees",
            "Inspect the subfloor framing with a moisture meter to detect dry rot before ordering timber"
          ]
        }
      }
    ],
    faq: [
      {
        question: "How much does a standard bathroom cost in QLD for 2026?",
        answer: "A standard family bathroom renovation currently ranges between $22,000 and $36,000, depending on size, plumbing movements, and finish quality."
      },
      {
        question: "Can I do the demolition myself to save money?",
        answer: "Yes, but with caution. You can save $1,000-$2,000, but you must ensure you don't damage active plumbing or electrical lines, and you must get a licensed professional to inspect and remove any asbestos before you start."
      }
    ]
  },
  {
    slug: "the-waterproofing-bible-as-3740-compliance",
    title: "The Waterproofing Bible: AS 3740 Compliance Guide",
    subtitle: "What QLD certifiers check before you lay a single bathroom tile.",
    excerpt: "A deep technical dive into wet area membranes, flashing, and form 16 certification in Queensland home building.",
    type: "Builder Interview",
    collection: "magazine",
    category: "Compliance",
    heroImage: "/images/waterproofing_membrane_detail.png",
    readTime: "9 min read",
    publishedAt: "2026-06-21",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Engineering",
    tags: ["Waterproofing", "AS 3740", "Builder Interview", "Compliance"],
    featured: true,
    status: "published",
    seo: {
      title: "AS 3740 Waterproofing Compliance Guide | CoastHomeHub",
      description: "Avoid waterproofing failures in QLD. Learn about class 3 membranes, bond breakers, wall sheeting, and Form 16 certification codes under AS 3740."
    },
    sections: [
      {
        heading: "The Substrate prep (Crucial Foundation)",
        paragraphs: [
          "Waterproofing never fails on its own; it fails because the substrate underneath moves, cracks, or rots. Under Australian Standard AS 3740, the wall and floor sheeting must be completely rigid and securely fastened. For timber-framed floors, compressed fiber cement (CFC) sheeting of at least 19mm is required, or certified structural-grade subflooring.",
          "Before applying the liquid membrane, all gaps, screw holes, and joints must be filled with a polyurethane sealant (such as Sikaflex 11FC). The substrate must be vacuumed clean of all plaster dust and primed with a specialized solvent or water-based primer to guarantee membrane adhesion."
        ],
        image: "/images/waterproofing_membrane_detail.png",
        imageCaption: "Figure 4.1: Close-up of professional Class III liquid membrane application over joint reinforcement mesh at a bathroom wall-to-floor junction."
      },
      {
        heading: "Bond Breakers & Flashing (The AS 3740 Core)",
        paragraphs: [
          "A membrane must be able to stretch if the building settles. If you paint membrane directly over a joint, any movement will tear it. AS 3740 mandates the use of a 'bond breaker' at all wall-to-floor and wall-to-wall intersections. This is achieved by installing a flexible backing rod or elastic sealing tape over a polyurethane fillet.",
          "For showers, the waterproofing must extend at least 150mm up the wall sheets from the finished shower floor level. In frameless shower designs, the entire bathroom floor must be waterproofed, and a water stop angle (a metal or plastic L-profile) must be anchor-fixed at the doorway to prevent water wicking into the hallway carpets."
        ]
      },
      {
        heading: "Form 16 Certification and QBCC Penalties",
        paragraphs: [
          "In Queensland, a waterproofing contractor must hold a specific QBCC Waterproofing Licence. Upon completion of the membrane cure, the applicator must issue a Form 16 (Inspection Certificate) to the building certifier. Doing waterproofing work without a license or failing to supply a Form 16 can lead to severe fines and renders home warranty insurance completely void."
        ]
      }
    ],
    faq: [
      {
        question: "How many coats of waterproofing are required?",
        answer: "Typically, two liberal coats are required to achieve the manufacturer's specified dry film thickness (usually 1.0mm to 1.2mm). Each coat must be applied perpendicular to the previous one."
      },
      {
        question: "What is a Form 16 in QLD waterproofing?",
        answer: "It is a statutory building certificate of inspection signed by a licensed waterproofing installer, certifying that the wet area works comply with the Building Code of Australia and AS 3740."
      }
    ]
  },
  {
    slug: "composite-vs-hardwood-qld-decking-guide",
    title: "Resort Style Decking: Composite vs Hardwood in QLD",
    subtitle: "Managing salt air, direct UV sun, and high maintenance in Brisbane & Gold Coast deck renovations.",
    excerpt: "An honest editorial comparison of Merbau, Spotted Gum, and premium composite decking under QLD coastal climates.",
    type: "Style Guide",
    collection: "inspiration",
    category: "Outdoor",
    heroImage: "/images/composite_decking_detail.png",
    readTime: "8 min read",
    publishedAt: "2026-06-20",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Landscaping",
    tags: ["Outdoor", "Decking", "Hardwood", "Composite"],
    status: "published",
    seo: {
      title: "Composite vs Hardwood Decking QLD Guide | CoastHomeHub",
      description: "Choose the right decking material for Gold Coast and Sunshine Coast homes. Merbau vs Spotted Gum vs Premium Composites for UV and salt resistance."
    },
    styleMeta: {
      palette: ["#8b5a2b", "#6e757c", "#0f3a36"],
      bestFor: "Pool decks, beachside alfresco areas, and low-maintenance backyards",
      costLevel: "Mid to high tier depending on subframe structural span"
    },
    sections: [
      {
        heading: "Natural Hardwood: Merbau vs. Spotted Gum",
        paragraphs: [
          "Natural timber decks carry a classic, tactile warmth that composite cannot fully copy. In Queensland, the two most popular species are Merbau (imported class-1 durability) and Spotted Gum (native Australian hardwood). Spotted Gum is highly favored for its beautiful wavy grain and natural fire resistance (up to BAL 29).",
          "However, timber requires commitment. In SE QLD's intense sun, a hardwood deck must be washed and oiled every 6 to 12 months. Without maintenance, Spotted Gum will split and turn a silver-grey color due to UV bleaching. Merbau also contains high amounts of tannin, which will bleed red-brown stains onto surrounding concrete when it rains."
        ]
      },
      {
        heading: "Composite Decking: The Low-Maintenance Revolution",
        paragraphs: [
          "Premium composite boards (like Ekodeck, ModWood, or Trex) are made from a blend of recycled wood fibers and polymer plastics. The main selling point is zero maintenance: no sanding, staining, or oiling is ever required. They do not splinter, making them highly safe for barefoot pool areas.",
          "The trade-off is thermal absorption. In a Queensland summer, composite boards get significantly hotter underfoot than natural wood. Capcapped composites are also more expensive initially, with material costs roughly 30% higher than standard Merbau boards."
        ],
        image: "/images/composite_decking_detail.png",
        imageCaption: "Figure 5.1: Luxury pool deck featuring premium composite decking boards installed with hidden clip fasteners to prevent visible screw heads."
      }
    ],
    faq: [
      {
        question: "Does composite decking warp in QLD heat?",
        answer: "Composite expands and contracts lineally. If the installer leaves correct gap spacing at butt joints and uses matching clips, it will not warp. Proper ventilation underneath the subframe is mandatory."
      },
      {
        question: "How do I stop timber deck tannins from staining concrete?",
        answer: "Pre-wash the timber boards with a deck cleaner multiple times to strip the excess tannins before laying them, or opt for composite decking which does not contain tannins."
      }
    ]
  },
  {
    slug: "integrated-marble-slab-kitchen-detailing",
    title: "Integrated Marble Slab Detailing in Modern Kitchens",
    subtitle: "Mitered waterfall edges, seamless slab splashbacks, and premium brass hardware integration.",
    excerpt: "How to budget and coordinate high-end marble installations with stonemasons and QBCC joiners.",
    type: "Style Guide",
    collection: "inspiration",
    category: "Kitchen",
    heroImage: "/images/luxury_marble_splashback.png",
    readTime: "7 min read",
    publishedAt: "2026-06-19",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Kitchen", "Marble", "Stone", "Cabinetry"],
    featured: true,
    status: "published",
    seo: {
      title: "Integrated Marble Slab Kitchen Design Guide | CoastHomeHub",
      description: "Design an editorial kitchen in Queensland. Waterfall island edges, marble slab splashbacks, and brushed gold socket integrations."
    },
    styleMeta: {
      palette: ["#ffffff", "#dedede", "#c9a054"],
      bestFor: "Luxury custom kitchens, open plan pavilion homes, and executive residences",
      costLevel: "High-end premium stonemasonry tier"
    },
    sections: [
      {
        heading: "The Waterfall Island & Slab Splashback Integration",
        paragraphs: [
          "In high-end kitchen design, the island benchtop is treated as a solid piece of stone sculpture. A mitered waterfall edge — where the marble vein flows continuously from the horizontal benchtop down the vertical side panel — requires precision CNC cutting by a stonemason.",
          "Extending this stone slab vertically onto the wall as a seamless splashback removes grout lines entirely. This creates a clean, architectural look that elevates the entire kitchen. To keep the focus on the marble, recess powerpoints or use brushed metal faceplates that harmonize with the stone veining."
        ],
        image: "/images/luxury_marble_splashback.png",
        imageCaption: "Figure 6.1: High-end kitchen slab splashback featuring integrated brushed brass dual electrical outlets flush-mounted to Calacatta marble."
      },
      {
        heading: "Stone Selection: Natural Marble vs. Engineered Alternatives",
        paragraphs: [
          "Calacatta and Carrara marble are the gold standards of luxury, but natural marble is porous and prone to staining from lemon juice, wine, or vinegar. It requires annual sealing and careful daily maintenance.",
          "For high-use family kitchens, engineered quartz or sintered porcelain slabs offer identical visual vein patterns but are entirely non-porous and scratch-resistant. These alternatives do not require sealing and can withstand direct heat from hot pots."
        ]
      }
    ],
    faq: [
      {
        question: "How thick should a kitchen stone benchtop be?",
        answer: "Standard slabs are 20mm thick. For a chunkier look (e.g. 40mm or 80mm), the stonemason builds a mitered apron edge around the perimeter."
      },
      {
        question: "Are natural marble splashbacks hard to maintain?",
        answer: "If sealed correctly with a high-grade sealer, they resist splashing. Clean splatters immediately and avoid harsh acidic spray cleaners."
      }
    ]
  },
  {
    slug: "the-ultimate-travertine-pool-landscaping-guide",
    title: "The Resort Landscape: Travertine & Pool Detailing",
    subtitle: "Mitered drop-face coping, saltwater-resistant sealers, and compliance with QLD AS 2610 pool safety standards.",
    excerpt: "How to design a resort-style pool deck on the Gold Coast. Stone selection, slip ratings, and structural drainage details.",
    type: "Style Guide",
    collection: "inspiration",
    category: "Outdoor",
    heroImage: "/images/pool_travertine_coping.png",
    readTime: "8 min read",
    publishedAt: "2026-06-20",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Landscaping",
    tags: ["Outdoor", "Pool", "Travertine", "Landscaping"],
    featured: true,
    status: "published",
    seo: {
      title: "Travertine Pool Coping & Landscaping Guide QLD | CoastHomeHub",
      description: "How to design a resort pool deck with ivory travertine. Covers mitered drop-face edges, AS 2610 safety fences, slip ratings, and sealing."
    },
    styleMeta: {
      palette: ["#eae3d2", "#a6d6d2", "#1e5e59"],
      bestFor: "In-ground concrete swimming pools, pool surrounds, and luxury landscape designs",
      costLevel: "Premium stonemasonry and structural landscaping tier"
    },
    sections: [
      {
        heading: "The Design Chemistry: Ivory Travertine Meets Turquoise Water",
        paragraphs: [
          "Ivory travertine is the absolute gold standard for coastal pool landscaping. Its natural cream tones reflect heat, keeping the stone surface comfortable to walk on even under South East Queensland's scorching summer sun. When framed by crystal-clear turquoise pool water, it creates a striking aesthetic contrast that mimics luxury resorts.",
          "To keep the layout clean, design with large-format travertine tiles (such as 600x600mm or 800x400mm). Lay them in a running-bond or modular pattern to emphasize the size of the deck, and use matching sand-colored grout to make the joints vanish."
        ],
        quote: "A pool deck is only as good as the masonry details. Rushing the travertine installation without structural expansion joints is the number one cause of cracked tiles on Gold Coast coastal properties.",
        quoteAuthor: "Noosa Coastal Carpentry & Landscapes",
        image: "/images/pool_travertine_coping.png",
        imageCaption: "Figure 7.1: A stunning travertine pool coping with drop-face mitered edge, frameless glass pool fence, and subtropical foliage."
      },
      {
        heading: "The Safety Standard: AS 2610 and Slip Ratings",
        paragraphs: [
          "Under Australian Standard AS 2610, pool surrounds must meet strict safety guidelines. For outdoor pedestrian wet areas, a minimum P4 slip resistance rating is mandatory, although P5 is highly recommended for pool steps and high-splash zones. Ensure your stone supplier provides certified slip-test reports before you purchase.",
          "Additionally, the pool fence must comply with local QLD safety legislation. Ensure any climbable trees, barbecues, or deck chairs are placed outside the 900mm non-climbable zone surrounding the fence."
        ],
        aside: {
          title: "AS 2610 Pool Fencing & Gates Checklist",
          text: "Never compromise on pool safety compliance. Private certifiers check the following details:",
          list: [
            "Gate must swing outwards (away from the pool area)",
            "Gate latch must be at least 1500mm above finished ground level",
            "Glass panels must carry safety toughness markings",
            "No climbable objects within 900mm non-climbable zone"
          ]
        }
      },
      {
        heading: "Technical Sealing & Saltwater Protection",
        paragraphs: [
          "Travertine is a highly porous sedimentary rock. If you have a saltwater pool, salt crystals will penetrate the stone. As the water evaporates, the salt crystallizes and expands, causing the stone to flake and erode (salt attack).",
          "To prevent this, apply two coats of a premium consolidating sealer (like Dry-Treat or Stain-Proof) specifically designed for porous stone around saltwater pools. This sealer must be reapplied every 3 to 5 years depending on traffic and exposure."
        ]
      }
    ],
    faq: [
      {
        question: "Does travertine get hot in the sun?",
        answer: "Light-colored travertine (like Ivory or Classic) stays significantly cooler underfoot than darker stones (like Granite or Slate) or composite decking, making it ideal for bare feet."
      },
      {
        question: "How do I clean travertine pool surrounds?",
        answer: "Pressure wash the stone once or twice a year with a mild pH-neutral stone cleaner. Avoid acidic cleaners as they will permanently etch the calcium carbonate structure of the travertine."
      }
    ],
    lookbook: {
      wideAngle: "/images/pool_travertine_coping.png",
      detailShot: "/images/outdoor_living.png",
      materialSpec: "/images/composite_decking_detail.png",
      captions: {
        wideAngle: "Main perspective: Drop-face mitered travertine pool coping and glass balustrades.",
        detailShot: "Alfresco lounge: Travertine paved pathway leading to the pool entry.",
        materialSpec: "Transition detail: Composite deck meeting travertine coping joints."
      }
    }
  },
  {
    slug: "microcement-and-backlit-mirrors-ensuite-guide",
    title: "The Spa Ensuite: Microcement & Backlit Mirror Detailing",
    subtitle: "Grout-free seamless walls, class-3 waterproofing compliance, and ambient color temperature specification.",
    excerpt: "Elevate your bathroom into a luxury residential spa. Master the styling, engineering, and AS 3740 compliance of microcement wet areas.",
    type: "Style Guide",
    collection: "inspiration",
    category: "Bathroom",
    heroImage: "/images/microcement_backlit_mirror.png",
    readTime: "7 min read",
    publishedAt: "2026-06-20",
    updatedAt: "2026-06-22",
    author: "CoastHomeHub Editorial",
    tags: ["Bathroom", "Microcement", "Lighting", "Style Guide"],
    featured: true,
    status: "published",
    seo: {
      title: "Microcement & Backlit Mirrors Bathroom Guide | CoastHomeHub",
      description: "How to apply microcement in wet areas. Grout-free styling tips, Class 3 AS 3740 waterproofing, and backlit LED mirror specifications."
    },
    styleMeta: {
      palette: ["#a19d98", "#ffffff", "#bca685"],
      bestFor: "Luxury master ensuites, powder rooms, and micro-bathrooms looking for visual expansion",
      costLevel: "Premium artisan rendering tier"
    },
    sections: [
      {
        heading: "The Visual Expansion: Seamless Microcement Walls",
        paragraphs: [
          "Traditional bathroom tiles create a grid of grout lines that can make small bathrooms feel busy and enclosed. Microcement — a composite coating based on cement, water-based resins, and silica sand — offers a completely seamless finish that flows across floors, walls, and even vanity benches.",
          "This lack of grout lines provides a clean, unbroken canvas that makes the space feel visually larger and calmer. The hand-applied texture adds warmth and depth that tiles cannot replicate, giving the ensuite an organic, residential spa character."
        ],
        quote: "Microcement is a premium hand-applied finish. The beauty lies in the subtle trowel marks and texture variations created by the artisan.",
        quoteAuthor: "Paddington Tiling & Waterproofing",
        image: "/images/microcement_backlit_mirror.png",
        imageCaption: "Figure 8.1: A minimalist vanity area featuring warm backlit round mirror, grey microcement walls, raw stone sink, and gold hardware."
      },
      {
        heading: "Technical Waterproofing Under Microcement",
        paragraphs: [
          "A common misconception is that microcement itself is waterproof. While the polyurethane sealer coats prevent surface water penetration, Queensland building certifiers require a fully compliant Class 3 waterproofing membrane underneath.",
          "Any movement in the subfloor (timber framing) will crack the microcement. Applying an elastic, fiber-reinforced liquid or sheet membrane is mandatory before the base render coats are troweled on."
        ],
        aside: {
          title: "Microcement Substrate & Preparation Checklist",
          text: "To avoid hairline cracks and guarantee waterproofing integrity, ensure your builder follows these guidelines:",
          list: [
            "Use 19mm Compressed Fiber Cement (CFC) sheeting on floors",
            "Embed fiberglass reinforcing mesh between the base microcement coats",
            "Apply three coats of water-based polyurethane sealer to lock in the finish",
            "Leave 5-10mm perimeter expansion joints filled with matching elastic sealant"
          ]
        }
      },
      {
        heading: "Illuminating the Space: Backlit Mirror Specification",
        paragraphs: [
          "To bring out the organic texture of microcement walls, use raking light. A round backlit mirror creates a soft halo of light that highlights the subtle trowel variations while eliminating harsh shadows on your face.",
          "For master bathrooms, specify 2700K (warm white) LEDs to create a relaxing evening ambiance, and wire it to a secondary dimmable circuit separate from the bright overhead downlights."
        ]
      }
    ],
    faq: [
      {
        question: "Is microcement slippery on bathroom floors?",
        answer: "No. Microcement can be finished with varying grades of silica sand in the final sealer coat to achieve the required R10 or R11 slip resistance class for residential bathrooms."
      },
      {
        question: "Can you apply microcement over existing tiles?",
        answer: "Yes. Provided the existing tiles are structurally sound, flat, and not leaking, a specialized epoxy primer and mesh can be applied to bond the microcement directly over the old tiles without demolition."
      }
    ],
    lookbook: {
      wideAngle: "/images/microcement_backlit_mirror.png",
      detailShot: "/gallery/interior-3.jpg",
      materialSpec: "/images/waterproofing_membrane_detail.png",
      captions: {
        wideAngle: "Main perspective: Microcement vanity wall featuring backlit round amber LED mirror.",
        detailShot: "Ensuite view: Grout-free floor-to-ceiling render with integrated stone vanity.",
        materialSpec: "Technical view: Class III liquid waterproofing membrane application over bond breakers."
      }
    }
  }
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

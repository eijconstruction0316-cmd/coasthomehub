export type LocalSeoCity = {
  slug: string;
  name: string;
  region: string;
  intro: string;
  serviceAreaSummary: string;
  suburbs: string[];
  localConsiderations: string[];
};

export type LocalSeoService = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  scope: string[];
  costRange: string;
  timeline: string;
  qualitySignals: string[];
};

export type LocalSeoLandingPage = {
  city: LocalSeoCity;
  service: LocalSeoService;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faq: Array<{ question: string; answer: string }>;
};

export const localSeoCities: LocalSeoCity[] = [
  {
    slug: "brisbane",
    name: "Brisbane",
    region: "South East Queensland",
    intro: "Brisbane homes range from Queenslanders and post-war cottages to apartments and new family builds, so renovation planning needs to account for access, age, ventilation and compliance.",
    serviceAreaSummary: "Inner Brisbane, northside, southside, eastside, westside and nearby Logan/Ipswich corridors.",
    suburbs: ["New Farm", "Paddington", "Chermside", "Carindale", "Sunnybank", "Mt Gravatt"],
    localConsiderations: [
      "Older homes may need extra allowance for substrate repairs, services and access constraints.",
      "Summer humidity makes ventilation and moisture control important in wet areas and kitchens.",
      "Apartment projects often need body corporate access, lift protection and work-hour planning.",
    ],
  },
  {
    slug: "gold-coast",
    name: "Gold Coast",
    region: "South East Queensland",
    intro: "Gold Coast renovations need materials that handle coastal air, strong UV, apartment access and busy family or holiday-home use.",
    serviceAreaSummary: "Northern Gold Coast, central coastal suburbs, southern beaches and hinterland homes.",
    suburbs: ["Southport", "Surfers Paradise", "Broadbeach", "Burleigh Heads", "Robina", "Coolangatta"],
    localConsiderations: [
      "Salt exposure can influence exterior paint systems, fixings and outdoor material selections.",
      "High-rise and apartment work often needs careful scheduling, parking and waste removal planning.",
      "Beachside homes benefit from low-maintenance finishes that handle sand, humidity and UV.",
    ],
  },
  {
    slug: "sunshine-coast",
    name: "Sunshine Coast",
    region: "South East Queensland",
    intro: "Sunshine Coast projects often balance relaxed coastal design with practical choices for humidity, salt air, outdoor living and family use.",
    serviceAreaSummary: "Caloundra, Mooloolaba, Maroochydore, Buderim, Coolum and surrounding coastal suburbs.",
    suburbs: ["Caloundra", "Mooloolaba", "Maroochydore", "Buderim", "Coolum", "Nambour"],
    localConsiderations: [
      "Coastal humidity makes waterproofing, ventilation and paint preparation especially important.",
      "Outdoor-indoor transitions need durable flooring and finishes that handle sand and moisture.",
      "Some homes have sloped sites or access constraints that affect delivery and trade sequencing.",
    ],
  },
  {
    slug: "noosa",
    name: "Noosa",
    region: "Sunshine Coast",
    intro: "Noosa renovations are often design-led, with a focus on premium coastal finishes, holiday-home durability and careful project staging.",
    serviceAreaSummary: "Noosa Heads, Noosaville, Sunshine Beach, Tewantin, Peregian Beach and nearby hinterland areas.",
    suburbs: ["Noosa Heads", "Noosaville", "Sunshine Beach", "Tewantin", "Peregian Beach", "Doonan"],
    localConsiderations: [
      "Holiday homes may need work planned around peak occupancy and body corporate requirements.",
      "Premium coastal finishes should still be selected for humidity, UV and maintenance.",
      "Lead times for specialty fixtures and trades can influence realistic timelines.",
    ],
  },
  {
    slug: "toowoomba",
    name: "Toowoomba",
    region: "Darling Downs",
    intro: "Toowoomba homes have different climate pressures from the coast, with cooler winters, older housing stock and practical family-home renovation needs.",
    serviceAreaSummary: "Toowoomba city, Rangeville, Middle Ridge, East Toowoomba, Highfields and nearby Darling Downs areas.",
    suburbs: ["Rangeville", "Middle Ridge", "East Toowoomba", "Highfields", "Newtown", "Harristown"],
    localConsiderations: [
      "Cooler seasonal conditions can affect paint curing, flooring choices and project scheduling.",
      "Older homes may need extra checks for substrate condition, services and previous renovation work.",
      "Family homes often benefit from durable finishes and staged work to reduce disruption.",
    ],
  },
];

export const localSeoServices: LocalSeoService[] = [
  {
    slug: "bathroom-renovation",
    name: "Bathroom Renovation",
    shortName: "Bathroom",
    description: "Plan a bathroom renovation with realistic scope, waterproofing, tiling, fixtures, ventilation and budget expectations.",
    scope: [
      "Demolition and strip-out planning",
      "Waterproofing and wet-area compliance",
      "Floor and wall tiling",
      "Vanity, toilet, shower and tapware selections",
      "Ventilation, lighting and final fit-off",
    ],
    costRange: "$18k-$45k+ depending on size, layout and finish level",
    timeline: "Typically 4-8 weeks after design, selections and trade availability are confirmed",
    qualitySignals: [
      "QBCC-licensed trade involvement",
      "Waterproofing system and documentation",
      "Clear tile set-out and product selections",
      "Allowance for hidden moisture or substrate repairs",
    ],
  },
  {
    slug: "kitchen-renovation",
    name: "Kitchen Renovation",
    shortName: "Kitchen",
    description: "Plan a kitchen renovation around layout, cabinetry, benchtops, splashback, lighting, appliances and service changes.",
    scope: [
      "Layout and workflow planning",
      "Cabinetry, benchtop and splashback selections",
      "Plumbing, electrical and appliance coordination",
      "Lighting and ventilation improvements",
      "Flooring, painting and final finish details",
    ],
    costRange: "$25k-$90k+ depending on layout changes, cabinetry and appliance level",
    timeline: "Typically 6-12 weeks after design sign-off and cabinetry lead times",
    qualitySignals: [
      "Detailed cabinetry and appliance schedule",
      "Early plumbing and electrical review",
      "Durable benchtop and splashback selections",
      "Clear temporary kitchen and access plan",
    ],
  },
  {
    slug: "painting",
    name: "Painting",
    shortName: "Painting",
    description: "Plan interior or exterior painting with surface preparation, product choice, weather windows and finish expectations.",
    scope: [
      "Surface washing, sanding, patching and preparation",
      "Primer and coating system selection",
      "Interior walls, ceilings, trims or exterior surfaces",
      "Colour consultation and finish schedule",
      "Protection, clean-up and final inspection",
    ],
    costRange: "$3k-$18k+ depending on home size, access and preparation required",
    timeline: "Typically 2-10 working days for most residential scopes, weather permitting",
    qualitySignals: [
      "Documented surface preparation",
      "Paint system matched to substrate and exposure",
      "Moisture, mould and peeling addressed before coating",
      "Clear protection plan for floors, fixtures and landscaping",
    ],
  },
  {
    slug: "flooring",
    name: "Flooring",
    shortName: "Flooring",
    description: "Plan flooring replacement around removal, subfloor preparation, product choice, transitions and furniture movement.",
    scope: [
      "Existing floor removal and disposal",
      "Subfloor checks and levelling",
      "Hybrid, vinyl, timber, tile or carpet selection",
      "Skirting, trims and transition details",
      "Furniture movement and staged installation planning",
    ],
    costRange: "$80-$250+ per square metre depending on product, preparation and installation method",
    timeline: "Typically 2-7 working days for many homes after materials arrive",
    qualitySignals: [
      "Subfloor moisture and flatness checks",
      "Product matched to room use and climate",
      "Transition and skirting details confirmed upfront",
      "Allowance for removal, disposal and floor preparation",
    ],
  },
];

export function getLocalSeoCity(slug: string) {
  return localSeoCities.find((city) => city.slug === slug) ?? null;
}

export function getLocalSeoService(slug: string) {
  return localSeoServices.find((service) => service.slug === slug) ?? null;
}

export function getLocalSeoPath(citySlug: string, serviceSlug: string) {
  return `/locations/${citySlug}/${serviceSlug}`;
}

export function getLocalSeoLandingPage(citySlug: string, serviceSlug: string): LocalSeoLandingPage | null {
  const city = getLocalSeoCity(citySlug);
  const service = getLocalSeoService(serviceSlug);
  if (!city || !service) return null;

  return {
    city,
    service,
    path: getLocalSeoPath(city.slug, service.slug),
    title: `${service.name} ${city.name}`,
    metaTitle: `${service.name} ${city.name} | CoastHomeHub`,
    metaDescription: `${service.name} planning for ${city.name} homes. Scope, budget range, timeline, materials and local renovation considerations for ${city.region}.`,
    h1: `${service.name} in ${city.name}`,
    intro: `${service.description} This ${city.name} landing page is built for homeowners comparing scope, budget, timeline and local project considerations before requesting quotes.`,
    faq: [
      {
        question: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
        answer: `A realistic starting range is ${service.costRange}. Final pricing depends on site access, existing condition, product selections and whether services or structure need to change.`,
      },
      {
        question: `How long does ${service.name.toLowerCase()} take in ${city.name}?`,
        answer: `${service.timeline}. Lead times, approvals, weather, strata access and product availability can affect the final schedule.`,
      },
      {
        question: `What should I check before starting a ${service.shortName.toLowerCase()} project?`,
        answer: `Confirm scope, access, existing condition, preferred materials, budget range and whether the work needs licensed trades or compliance documentation.`,
      },
    ],
  };
}

export function getAllLocalSeoLandingPages() {
  return localSeoCities.flatMap((city) =>
    localSeoServices.map((service) => getLocalSeoLandingPage(city.slug, service.slug)!)
  );
}

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
    slug: "building-carpentry",
    name: "Building & Carpentry",
    shortName: "Carpentry",
    description: "Plan structural framing, timber decks, extensions, and custom timber work with QLD AS 1684 wood framing compliance.",
    scope: [
      "Structural wall framing & extensions",
      "Timber decking & pergolas",
      "Stairs, cladding & eaves timber work",
      "Form 15 & 16 engineering certifications",
      "Licensed carpenter coordination",
    ],
    costRange: "$10k-$90k+ depending on timber grade and engineering scope",
    timeline: "2-6 weeks for framing and decking, up to 12 weeks for structural extensions",
    qualitySignals: [
      "QBCC active builder license",
      "AS 1684 timber framing compliance",
      "Certified footings & subframe engineering",
      "Termite protection treatment certificate",
    ],
  },
  {
    slug: "plumbing-gasfitting",
    name: "Plumbing & Gasfitting",
    shortName: "Plumbing",
    description: "Plan water lines, rough-ins, drain relocations, gas lines, and fixtures compliance with QLD AS/NZS 3500 plumbing standards.",
    scope: [
      "Hot and cold water line rough-ins",
      "Drain chasing and slab relocations",
      "Gas line connections and compliance",
      "Fixtures, vanity, toilet, and tap fit-off",
      "Form 1 Certificate of Compliance",
    ],
    costRange: "$5k-$20k+ depending on slab work and gas routing",
    timeline: "3-10 working days for rough-ins and final trade fit-off",
    qualitySignals: [
      "QBCC plumbing contractor license",
      "AS/NZS 3500 plumbing standard compliance",
      "Form 1 local government cert submission",
      "Tarnishing protection and pressure testing",
    ],
  },
  {
    slug: "electrical-smarthome",
    name: "Electrical & Smart Home",
    shortName: "Electrical",
    description: "Plan lighting layouts, dedicated appliance lines, switchboard upgrades, and smart home automation with AS/NZS 3000 compliance.",
    scope: [
      "Switchboard safety upgrades & RCD testing",
      "LED lighting design & smart dimmer layouts",
      "High-amp appliance runs (induction cooktops)",
      "Data, TV, and outdoor weather-proof outlets",
      "Electrical Safety Certificate (Form 11)",
    ],
    costRange: "$3k-$15k+ depending on automation and switchboard scope",
    timeline: "2-7 working days for rough-in and final installation",
    qualitySignals: [
      "Licensed electrical contractor (QLD)",
      "AS/NZS 3000 wiring rule compliance",
      "IPX4 safety zones for wet area layouts",
      "Electrical Safety Certificate issued",
    ],
  },
  {
    slug: "tiling-waterproofing",
    name: "Tiling & Waterproofing",
    shortName: "Waterproofing",
    description: "Plan wet area waterproofing, wall and floor tiling, joint sealing, and epoxy grouting with AS 3740 and AS 3958.1 compliance.",
    scope: [
      "Wet area substrate inspection & prep",
      "Class III waterproofing membrane application",
      "Wall and floor tile set-out & laying",
      "Epoxy grout & silicone joint sealing",
      "Statutory Form 16 inspection certificate",
    ],
    costRange: "$8k-$28k+ depending on tile format and room area",
    timeline: "1-3 weeks depending on dry film cure times and tiling patterns",
    qualitySignals: [
      "QBCC waterproofing & tiling licenses",
      "AS 3740 waterproofing & AS 3958.1 tiling standards",
      "Form 16 statutory certificate of inspection",
      "Minimum P3 slip rating on floor tiles",
    ],
  },
  {
    slug: "painting-plastering",
    name: "Painting & Plastering",
    shortName: "Painting",
    description: "Plan drywall plasterboard, patching, interior wall painting, and exterior weather-resistant coatings with AS/NZS 2311 standard compliance.",
    scope: [
      "Gyprock drywall lining & plaster patching",
      "Sanding, dust-prevention & surface priming",
      "Multi-coat internal paint applications (low-VOC)",
      "Exterior weather-resistant coating systems",
      "Mould and structural timber sealing",
    ],
    costRange: "$4k-$18k+ depending on wall area, preparation, and coatings",
    timeline: "3-10 working days depending on drying conditions",
    qualitySignals: [
      "Licensed painting contractor (QLD)",
      "AS/NZS 2311 painting standards compliance",
      "Thorough sanding & multi-coat primer-sealer usage",
      "Low-VOC premium washable coatings",
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

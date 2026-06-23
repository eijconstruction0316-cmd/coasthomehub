export interface SupplierProduct {
  id: string;
  title: string;
  category: string;
  retailPrice: number;
  tradeDiscount: number; // percentage (e.g. 10 for 10% off)
  code: string;
  image: string;
  affiliateUrl: string;
  rating: number;
  specs: string[];
  recommendation: string;
}

export interface Supplier {
  name: string;
  slug: string;
  logo: string; // Emoji/icon representation
  color: string; // CSS color token
  description: string;
  partnerSince: string;
  exclusiveOffer: string;
  products: SupplierProduct[];
}

export const SUPPLIERS: Supplier[] = [
  {
    name: "Bunnings Warehouse",
    slug: "bunnings",
    logo: "🔨",
    color: "#0d5c34", // Dark green
    description: "Australia's largest home improvement and outdoor living retailer, supplying trades, builders, and DIY renovators with timber, tools, and garden assets.",
    partnerSince: "July 2024",
    exclusiveOffer: "Up to 12% off composite decking and structural timber",
    products: [
      {
        id: "bun-1",
        title: "Ozito PXC 18V Brushless Random Orbital Sander Kit",
        category: "Tools & Sanding",
        retailPrice: 189,
        tradeDiscount: 10,
        code: "OZ-SND-18V",
        image: "/images/deck_refinishing_1782209238396.png",
        affiliateUrl: "https://www.bunnings.com.au/search/products?q=sander",
        rating: 4.8,
        specs: ["18V Brushless Motor", "Dust Extraction bag", "9-speed electronic control"],
        recommendation: "Perfect for deck preparation and furniture sanding. The brushless motor holds consistent RPM under load, resulting in a perfectly level finish without swirl marks."
      },
      {
        id: "bun-2",
        title: "Ekodeck Classic Composite Decking Boards (Pack of 5)",
        category: "Decking & Alfresco",
        retailPrice: 245,
        tradeDiscount: 12,
        code: "EKO-CL-137",
        image: "/images/deck_refinishing_1782209238396.png",
        affiliateUrl: "https://www.bunnings.com.au/search/products?q=ekodeck",
        rating: 4.7,
        specs: ["137x23mm profile", "No oiling required", "UV-stabilized engineered composite"],
        recommendation: "Highly recommended for Gold Coast and QLD climates. Resists rotting, warping, and fading without needing annual sanding or oiling. Saves hundreds in long-term maintenance."
      },
      {
        id: "bun-3",
        title: "Crommelin 15L Waterproofing Wet Area Membrane",
        category: "Waterproofing",
        retailPrice: 210,
        tradeDiscount: 10,
        code: "CRM-WPR-15L",
        image: "/images/deck_refinishing_1782209238396.png",
        affiliateUrl: "https://www.bunnings.com.au/search/products?q=waterproofing",
        rating: 4.9,
        specs: ["Class III flexible elastomeric membrane", "Complies with AS 3740 & AS/NZS 4858", "Low VOC formula"],
        recommendation: "Vetted Class III liquid membrane for shower recesses. Pairs exceptionally well with reinforcement bandages for joint stress zones. Form 16 sign-off friendly."
      }
    ]
  },
  {
    name: "IKEA Australia",
    slug: "ikea",
    logo: "🇸🇪",
    color: "#0051ba", // Blue
    description: "Global design leader offering flat-pack modular kitchen cabinets, modular wardrobes, and Scandinavian styling accessories tailored for smart space budgeting.",
    partnerSince: "September 2024",
    exclusiveOffer: "Free site delivery on METOD modular kitchen sets exceeding $1,200",
    products: [
      {
        id: "ik-1",
        title: "METOD Custom Modular Kitchen Cabinet Suite",
        category: "Joinery & Kitchens",
        retailPrice: 1450,
        tradeDiscount: 8,
        code: "MET-KTC-02",
        image: "/images/mid_century_furniture_1782209207001.png",
        affiliateUrl: "https://www.ikea.com/au/en/cat/metod-kitchen-cabinets-24254/",
        rating: 4.6,
        specs: ["Melamine-faced particleboard", "Soft-close hinge integration", "25-year structural warranty"],
        recommendation: "The best cost-to-quality modular cabinet setup in Australia. Trades appreciate the standardized drill holes which speed up assembly and structural leveling on-site."
      },
      {
        id: "ik-2",
        title: "HAVSEN Ceramic Apron Front Double Bowl Sink",
        category: "Sinks & Tapware",
        retailPrice: 349,
        tradeDiscount: 10,
        code: "HAV-CER-DBL",
        image: "/images/mid_century_furniture_1782209207001.png",
        affiliateUrl: "https://www.ikea.com/au/en/p/havsen-apron-front-double-bowl-sink-white-s19250273/",
        rating: 4.5,
        specs: ["Stoneware ceramic finish", "62x48cm sizing", "Scratch-resistant glazing"],
        recommendation: "Perfect fit for Hamptons or Coastal farmhouse styling. Solid ceramic construction that does not stain and can handle heavy kitchen pots without scratching."
      }
    ]
  },
  {
    name: "Beacon Lighting",
    slug: "beacon-lighting",
    logo: "💡",
    color: "#ffc20e", // Yellow
    description: "Australia's leading specialty retailer of premium decorative lighting, architectural fittings, smart switches, and energy-efficient ceiling fan solutions.",
    partnerSince: "November 2024",
    exclusiveOffer: "15% off architectural pendants and smart LED downlights",
    products: [
      {
        id: "bea-1",
        title: "Lucci Air Climate III 3-Blade DC Ceiling Fan",
        category: "Lighting & Electrical",
        retailPrice: 299,
        tradeDiscount: 15,
        code: "LUC-CL3-DC",
        image: "/images/mid_century_furniture_1782209207001.png",
        affiliateUrl: "https://www.beaconlighting.com.au/search?q=fan",
        rating: 4.8,
        specs: ["Energy-efficient DC Motor", "3 ABS non-rust blades", "6-speed remote control included"],
        recommendation: "Our absolute top pick for coastal alfresco ceilings. DC fans consume 70% less energy than standard AC models and operate with near-silent bearing spin."
      },
      {
        id: "bea-2",
        title: "Ando Concrete Cylinder Decorative Pendant Light",
        category: "Lighting & Electrical",
        retailPrice: 159,
        tradeDiscount: 10,
        code: "AND-CON-PDN",
        image: "/images/mid_century_furniture_1782209207001.png",
        affiliateUrl: "https://www.beaconlighting.com.au/search?q=pendant",
        rating: 4.4,
        specs: ["Raw cast concrete body", "1.8m suspension cord", "E27 globe base"],
        recommendation: "Ideal for kitchen island bars or bedroom bedside suspension. The textured concrete finish adds an earthy, architectural element to industrial/warm-minimalist schemes."
      }
    ]
  },
  {
    name: "Beaumont Tiles",
    slug: "beaumont-tiles",
    logo: "📐",
    color: "#cf2d32", // Red
    description: "Designer tiles, bathroom mixers, tapware, and construction chemicals provider, featuring advanced water barrier and tiling membranes.",
    partnerSince: "October 2024",
    exclusiveOffer: "15% off designer porcelain slab ranges & adhesives",
    products: [
      {
        id: "bt-1",
        title: "Majorca Terrazzo Look Grey Porcelain Tile (Sqm)",
        category: "Tiling & Flooring",
        retailPrice: 78,
        tradeDiscount: 15,
        code: "BM-MAJ-GRY",
        image: "/images/mid_century_furniture_1782209207001.png",
        affiliateUrl: "https://www.tile.com.au/search?q=terrazzo",
        rating: 4.9,
        specs: ["600x600mm size", "Glazed porcelain", "R10 slip rating suitable for bathrooms"],
        recommendation: "Stunning matte terrazzo look without the high maintenance and sealing requirements of real cement. Slip-rated for wet area floors to keep certification compliant."
      },
      {
        id: "bt-2",
        title: "Mizu Drift Brushed Brass Gooseneck Mixer",
        category: "Sinks & Tapware",
        retailPrice: 420,
        tradeDiscount: 10,
        code: "MIZ-DR-BB",
        image: "/images/mid_century_furniture_1782209207001.png",
        affiliateUrl: "https://www.tile.com.au/search?q=mizu",
        rating: 4.7,
        specs: ["Solid brass construction", "WELS 4 Star, 7.5L/min rating", "PVD wear-resistant coating"],
        recommendation: "PVD brushed brass finish holds up against hard water spotting. Ceramic disc cartridges prevent dripping and ensure smooth lever control over time."
      }
    ]
  }
];

export function getSupplierBySlug(slug: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.slug === slug);
}

export function getAllProducts(): (SupplierProduct & { supplierSlug: string; supplierName: string })[] {
  return SUPPLIERS.flatMap((s) =>
    s.products.map((p) => ({
      ...p,
      supplierSlug: s.slug,
      supplierName: s.name,
    }))
  );
}

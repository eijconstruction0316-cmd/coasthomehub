export interface ForumReply {
  id: string;
  authorName: string;
  authorRole: string; // e.g. 'Builder', 'Homeowner', 'Tiler'
  isVerifiedTrade: boolean;
  date: string;
  content: string;
  upvotes: number;
}

export interface ForumThread {
  id: string;
  category: "DIY Projects & Styling" | "Licences & QBCC Rules" | "Renovation Pricing & Quotes";
  title: string;
  authorName: string;
  authorRole: string;
  isVerifiedTrade: boolean;
  date: string;
  content: string;
  upvotes: number;
  tags: string[];
  replies: ForumReply[];
}

export const FORUM_THREADS: ForumThread[] = [
  {
    id: "thread-1",
    category: "Licences & QBCC Rules",
    title: "AS 3740 Wet Area Waterproofing — Who can sign Form 16?",
    authorName: "Timothy Reynolds",
    authorRole: "Homeowner",
    isVerifiedTrade: false,
    date: "June 18, 2026",
    content: "We are currently owner-building a main bathroom renovation in Southport. The certifier is asking for a Form 16 Waterproofing certificate. Can I apply the membrane myself and have a licensed tradie sign it off, or does the licensed contractor have to apply it from start to finish?",
    upvotes: 42,
    tags: ["Waterproofing", "AS 3740", "Form 16", "Gold Coast"],
    replies: [
      {
        id: "rep-1-1",
        authorName: "EIJ Construction Pty Ltd",
        authorRole: "Builder (QBCC-1279144)",
        isVerifiedTrade: true,
        date: "June 19, 2026",
        content: "Hi Timothy. Short answer is NO: a licensed contractor cannot sign off a Form 16 for waterproofing work they did not perform or supervise directly. In Queensland, wet area waterproofing is a strictly licensed trade. The installer must carry a QBCC Waterproofing licence (or a Builder licence) and certify that the installation complies with AS 3740. Doing it yourself without licensing voids insurance and the certifier will reject the bathroom sign-off.",
        upvotes: 38
      },
      {
        id: "rep-1-2",
        authorName: "Paddington Tiling & Waterproofing",
        authorRole: "Tiler & Waterproofer",
        isVerifiedTrade: true,
        date: "June 19, 2026",
        content: "Spot on. Certifiers are very strict on this now due to the high volume of waterproofing defects in South East QLD. Make sure whoever you hire supplies the Form 16 immediately upon curing, before tiling starts. It's for your own protection as wet area defects are the most expensive items to fix later.",
        upvotes: 14
      }
    ]
  },
  {
    id: "thread-2",
    category: "DIY Projects & Styling",
    title: "Osmo UV Protection Oil vs Sikkens Cetol for Merbau Deck",
    authorName: "Sarah Jenkins",
    authorRole: "Homeowner",
    isVerifiedTrade: false,
    date: "June 20, 2026",
    content: "Just finished building a 24sqm Merbau deck on the Gold Coast. I'm torn between Osmo UV Protection Oil (natural finish) and Sikkens Cetol. I want a matte look that doesn't peel under heavy summer sun. Any advice?",
    upvotes: 28,
    tags: ["Decking", "Osmo", "Timber Oil", "DIY Guides"],
    replies: [
      {
        id: "rep-2-1",
        authorName: "Noosa Coastal Carpentry & Decks",
        authorRole: "Builder (QBCC-1530291)",
        isVerifiedTrade: true,
        date: "June 21, 2026",
        content: "We use Osmo Natural oil exclusively for our high-end Sunshine Coast projects. Unlike film-forming coatings, which can eventually crack and peel under intense QLD sun, Osmo penetrates deep into the grain. When it comes time to maintain (usually every 12-18 months), you don't need to sand it back — just wash and apply a single fresh coat.",
        upvotes: 25
      },
      {
        id: "rep-2-2",
        authorName: "Alex K.",
        authorRole: "Homeowner",
        isVerifiedTrade: false,
        date: "June 22, 2026",
        content: "I used Osmo on my deck last year and the matte look is fantastic. It doesn't get slippery in wet weather either. Highly recommend it.",
        upvotes: 9
      }
    ]
  },
  {
    id: "thread-3",
    category: "Renovation Pricing & Quotes",
    title: "Why do custom cabinetry quotes differ by up to $15k?",
    authorName: "David Park",
    authorRole: "Homeowner",
    isVerifiedTrade: false,
    date: "June 21, 2026",
    content: "I received three quotes for a U-shaped kitchen cabinet installation. Quote A is $12,500 (flat-pack assemble/install), Quote B is $18,000, and Quote C is $27,500. Why is there such a massive gap? Are materials that different?",
    upvotes: 35,
    tags: ["Kitchen", "Cabinetry", "Quotes", "Renovation Costs"],
    replies: [
      {
        id: "rep-3-1",
        authorName: "EIJ Construction Pty Ltd",
        authorRole: "Builder (QBCC-1279144)",
        isVerifiedTrade: true,
        date: "June 22, 2026",
        content: "The discrepancy comes down to three things: 1) Flat-pack vs Fully Custom Bench-built cabinets (pre-assembled in a cabinet shop). 2) Hardware (e.g. Blum soft-close glides vs generic Chinese slides). 3) Board materials (Laminex MDF panels vs cheap raw particleboard). Make sure to ask for the exact hardware brand and board specifications before deciding. Quote B sounds like a reasonable mid-range custom spec, whereas C is likely architectural-grade.",
        upvotes: 31
      }
    ]
  }
];

export function getThreadById(id: string): ForumThread | undefined {
  return FORUM_THREADS.find((t) => t.id === id);
}

export function getAllThreads(): ForumThread[] {
  return FORUM_THREADS;
}

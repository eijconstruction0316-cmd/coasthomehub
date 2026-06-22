import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts: Record<string, {
  id: number;
  tag: string;
  title: string;
  emoji: string;
  color: string;
  date: string;
  readTime: string;
  author: string;
  intro: string;
  sections: { heading: string; body: string }[];
  tips: string[];
  relatedIds: number[];
}> = {
  "1": {
    id: 1,
    tag: "2025 Trends",
    title: "Top 10 Australian Home Design Trends for 2025",
    emoji: "🏠",
    color: "var(--ocean-400)",
    date: "June 12, 2025",
    readTime: "5 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "Australia's home design landscape is evolving fast. After years of grey-on-grey minimalism, 2025 is seeing a bold shift toward warmth, texture, and personality. Here's what's dominating Queensland interiors this year — and why.",
    sections: [
      {
        heading: "1. Coastal Minimalism with Texture",
        body: "Clean lines are staying, but the cold white walls of the 2010s are gone. In their place: limewash plaster, reeded timber panels, and textured stone tiles. Queensland's coastal lifestyle demands it — warm, tactile, and effortlessly relaxed.",
      },
      {
        heading: "2. Earthy Terracotta & Clay Tones",
        body: "Terracotta is back — and not in the dated 1990s sense. 2025 sees sophisticated clay render walls, burnt orange cabinetry, and warm amber lighting creating a rich, grounded palette that works beautifully in Queensland's sun-drenched light.",
      },
      {
        heading: "3. Japandi: Japanese Wabi-Sabi Meets Scandinavian",
        body: "Warm neutrals, handmade ceramics, exposed natural timber, and perfectly imperfect finishes. Japandi is the biggest crossover style of the year — and it's finding a natural home in Queensland ensuites and living rooms.",
      },
      {
        heading: "4. Dark & Moody Bathrooms",
        body: "Hotel-spa energy is coming home. Charcoal floor-to-ceiling tiles, matte black fixtures, and warm pendant lighting are transforming bathrooms into genuine retreats. Bold, but done right, absolutely timeless.",
      },
      {
        heading: "5. Biophilic Design — Nature Inside",
        body: "Trailing plants, living walls, timber ceilings, and rattan accents — homeowners want nature in every room. This isn't a passing trend; biophilic design is proven to reduce stress and improve wellbeing.",
      },
      {
        heading: "6. Curved & Organic Forms",
        body: "Goodbye sharp 90-degree corners. Arched doorways, curved sofas, rounded kitchen islands, and organic-shaped mirrors are softening homes across the country. This works especially well in bedroom and living spaces.",
      },
      {
        heading: "7. Two-Tone Kitchen Cabinetry",
        body: "Light uppers, dark lowers — or vice versa. Two-tone kitchens are the #1 renovation trend for homeowners who want a dramatic update without full demolition. A great way to modernise before selling.",
      },
      {
        heading: "8. Bold Feature Tiles",
        body: "Patterned floor tiles in bathrooms and laundries are having their moment. Zellige, scallop, and handmade-look tiles add character that standard rectified tiles simply can't match.",
      },
      {
        heading: "9. Modern Hamptons Goes Native",
        body: "The Hamptons look isn't going anywhere in Queensland, but it's evolving — incorporating more native Australian timber, raw stone, and warm organic tones rather than pure classic white-and-navy.",
      },
      {
        heading: "10. Outdoor-Indoor Living Perfected",
        body: "QLD's climate demands it. 2025 sees a strong push toward retractable glass walls, alfresco tiling that matches interiors seamlessly, and waterproofed timber decks that blur the boundary between inside and out.",
      },
    ],
    tips: [
      "Start with one room — test a trend before committing to the whole house",
      "Warm lighting (2700–3000K) makes earthy tones sing — avoid cool daylight globes",
      "Mix textures within a neutral palette rather than mixing too many colours",
      "In Queensland's humidity, always seal natural stone and unsealed grout",
    ],
    relatedIds: [2, 3, 4],
  },
  "2": {
    id: 2,
    tag: "DIY Guide",
    title: "How to Re-Seal Your Shower (Step by Step)",
    emoji: "🚿",
    color: "var(--sand-500)",
    date: "June 8, 2025",
    readTime: "8 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "Mouldy, cracked, or discoloured silicone is one of the most common home maintenance issues in Queensland. The good news? If you're reasonably handy, you can replace shower silicone yourself in a day — saving hundreds on a call-out fee. Here's exactly how to do it.",
    sections: [
      {
        heading: "What You'll Need",
        body: "Silicone remover gel or blade scraper, isopropyl alcohol (IPA), bathroom-grade silicone (sanitary silicone, not general purpose), a caulking gun, masking tape, a smoothing tool or your finger, and rubber gloves.",
      },
      {
        heading: "Step 1: Remove All Old Silicone",
        body: "Apply silicone remover gel and leave for 2–3 hours. Use a blade scraper (be careful not to scratch tiles) to lift the old silicone. Remove every trace — new silicone won't bond over old. This step is where most DIY jobs fail.",
      },
      {
        heading: "Step 2: Clean and Dry Thoroughly",
        body: "Wipe all joints with isopropyl alcohol. This removes soap residue, oils, and mould spores that prevent bonding. The joint must be completely dry before applying new silicone — ideally leave overnight.",
      },
      {
        heading: "Step 3: Apply Masking Tape",
        body: "Apply masking tape along both sides of each joint, leaving a 4–6mm gap. This gives you clean, straight lines even if your application isn't perfectly even. Worth the extra 15 minutes.",
      },
      {
        heading: "Step 4: Apply Silicone",
        body: "Cut the nozzle at 45° to match your joint width. Apply consistent pressure in one smooth, continuous bead. Don't stop and start — it creates lumps. Work one joint at a time from one end to the other.",
      },
      {
        heading: "Step 5: Smooth and Remove Tape",
        body: "Dip your finger in water or use a silicone smoothing tool. Press firmly along the joint in one smooth pass. Immediately remove the masking tape while the silicone is still wet. Leave 24 hours before using the shower.",
      },
      {
        heading: "When to Call a Professional",
        body: "If there's mould growing behind the tiles (you'll see discolouration through grout), structural movement causing repeat cracking, or waterproofing failure (water pooling under tiles) — call a licensed tradie. DIY silicone won't fix underlying waterproofing issues.",
      },
    ],
    tips: [
      "Always buy sanitary/bathroom-grade silicone — not the cheap general-purpose variety",
      "Mould-resistant silicone is worth the extra $5 in Queensland's humid climate",
      "Don't rush drying time — silicone needs 24hrs minimum, 48hrs in humid conditions",
      "If you see water damage or soft tiles, stop and call a licensed waterproofing tradie",
    ],
    relatedIds: [1, 3, 5],
  },
  "3": {
    id: 3,
    tag: "Buyer's Guide",
    title: "Choosing the Right Waterproofing for QLD's Climate",
    emoji: "🌧️",
    color: "#7c3aed",
    date: "June 3, 2025",
    readTime: "6 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "Queensland's subtropical climate — intense UV, heavy summer rainfall, and high humidity — is one of the most demanding environments for home waterproofing in Australia. Here's what you need to know before your next renovation.",
    sections: [
      {
        heading: "Why Queensland is Different",
        body: "Brisbane and the Gold Coast receive over 1,000mm of rainfall annually, with high summer humidity regularly exceeding 80%. Combined with UV index levels that degrade materials faster than cooler climates, the wrong waterproofing product will fail prematurely — sometimes within 2–3 years.",
      },
      {
        heading: "Wet Area Waterproofing (Bathrooms & Showers)",
        body: "Australian Standard AS 3740 mandates specific waterproofing requirements for wet areas. In QLD, you must use a compliant membrane system applied by a licensed waterproofer. Sheet membranes (e.g. Laykold, Gripset) or liquid-applied systems are both compliant when installed correctly.",
      },
      {
        heading: "Balcony & Deck Waterproofing",
        body: "Exposed concrete balconies in QLD are particularly vulnerable to water ingress, which can cause concrete cancer and structural damage. A polyurethane or acrylic-based liquid membrane applied over a primer coat is the most durable and flexible solution for movement joints.",
      },
      {
        heading: "Roof Waterproofing",
        body: "Flat or low-pitch concrete roofs require a robust UV-stable coating system. In QLD, look for a product with a UV stabiliser rating suitable for tropical conditions. Expect to recoat every 7–10 years — or immediately if you see cracking or chalking.",
      },
      {
        heading: "What to Ask Your Waterproofer",
        body: "Always ask: Is this product compliant with AS 3740? What's the warranty period for materials and workmanship? Is the waterproofer QBCC licensed? Do you provide a waterproofing certificate? Any reputable tradie should answer all of these confidently.",
      },
    ],
    tips: [
      "Never let a tiler lay tiles without waterproofing membranes in wet areas — it's illegal and will cost you dearly",
      "Get a waterproofing test certificate after installation — this is required for resale in QLD",
      "In coastal areas (within 1km of the ocean), use marine-grade products wherever possible",
      "Budget for waterproofing first, then finishes — cutting costs here always costs more later",
    ],
    relatedIds: [1, 2, 5],
  },
  "4": {
    id: 4,
    tag: "Design Trends",
    title: "Coastal Minimalism: The Queensland Interior Look for 2025",
    emoji: "🌊",
    color: "#0891b2",
    date: "May 28, 2025",
    readTime: "7 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "Queensland homeowners have always been drawn to the coast — but 2025's coastal minimalism is nothing like the seashell-and-driftwood interiors of years past. It's sophisticated, calm, and built for the way Queenslanders actually live.",
    sections: [
      {
        heading: "The Core Philosophy",
        body: "Coastal minimalism strips away visual clutter and replaces it with quality materials, natural textures, and a palette inspired by sand, water, and sky. The goal is a space that feels effortlessly calm — as if the beach is just outside.",
      },
      {
        heading: "The Palette",
        body: "Think warm whites (not stark), natural linen, soft sage, weathered timber tones, and occasional deep ocean blue as an accent. Avoid cool grey — it conflicts with QLD's warm natural light.",
      },
      {
        heading: "Materials to Use",
        body: "Travertine and limestone tiles (honed, not polished), reeded or panelled timber, linen upholstery, rattan and cane accents, and hand-thrown ceramic vessels. Authenticity matters — avoid plastic faux-timber laminates.",
      },
      {
        heading: "The Bathroom Application",
        body: "Large-format limestone-look tiles, a wall-hung timber vanity, matte brushed nickel fittings, and a walk-in shower with a simple linear drain. A single arched mirror and a potted plant complete the look. No clutter on benchtops.",
      },
      {
        heading: "Why It Works in Queensland",
        body: "Coastal minimalism isn't just aesthetic — it's practical. Light colours reflect heat, natural materials breathe, and the open, uncluttered layout suits Queensland's indoor-outdoor lifestyle perfectly. It also photographs exceptionally well for Airbnb listings.",
      },
    ],
    tips: [
      "Layer textures within a neutral palette rather than adding more colours",
      "Use indoor plants liberally — they're the easiest way to add life without clutter",
      "Invest in one quality piece (e.g. a travertine vanity top) rather than many cheap ones",
      "Keep window treatments minimal — sheer linen curtains maximise natural light",
    ],
    relatedIds: [1, 3, 5],
  },
  "5": {
    id: 5,
    tag: "Cost Guide",
    title: "How Much Does a Bathroom Renovation Cost in QLD? (2025 Prices)",
    emoji: "💰",
    color: "#16a34a",
    date: "May 22, 2025",
    readTime: "9 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "2026 pricing for bathroom renovations across Queensland — from a basic refresh to a luxury master ensuite. We've surveyed dozens of licensed tradies to give you real numbers, not vague estimates.",
    sections: [
      {
        heading: "Basic Bathroom Refresh: $12,000–$18,000",
        body: "This covers re-siliconing, re-grouting, replacing a vanity, new tapware, and a toilet. No structural changes, no new tiling. Great for investment properties or pre-sale preparation. Labour alone now runs $80–$120/hr for a licensed tiler or plumber in SEQ. 3–5 day turnaround.",
      },
      {
        heading: "Mid-Range Renovation: $18,000–$38,000",
        body: "Full strip-out, new waterproofing, new floor and wall tiles (standard range), new vanity and toilet, frameless shower screen, and new tapware. Material costs are up 20–25% since 2022. Most family bathrooms fall into this range. 2–4 week project.",
      },
      {
        heading: "Premium Renovation: $38,000–$65,000",
        body: "Large format tiles, feature tile walls, freestanding bath, floor-to-ceiling tiling, premium tapware and fixtures, custom vanity, underfloor heating, and designer finishes. Gold Coast and Sunshine Coast command a 5–10% regional premium over Brisbane. 4–8 week project.",
      },
      {
        heading: "Luxury Master Ensuite: $65,000+",
        body: "High-end stone, custom joinery, rainhead shower, heated towel rails, smart mirror, dual vanity, freestanding bath, and premium imported fixtures. With current labour shortages in SEQ, premium tradies book out 8–12 weeks. These projects can run 10–14 weeks with the right tradie.",
      },
      {
        heading: "What Drives Up the Cost",
        body: "Access issues (e.g. upper floor with no direct access), wet area compliance fails, asbestos removal (pre-1990 homes), structural changes, imported or custom materials, and tight project timelines all increase cost significantly.",
      },
      {
        heading: "How to Save Without Cutting Corners",
        body: "Don't compromise on waterproofing — this is where failures happen. Do save on fixtures by choosing quality mid-range brands (e.g. Caroma, Methven, Kado) rather than imported designer pieces. Buy your own tiles after getting a quote — retail markup is significant.",
      },
    ],
    tips: [
      "Always get 3 quotes — and check each tradie's QBCC licence before proceeding",
      "Ask specifically what's included: waterproofing, waste, tiling, fixtures, and clean-up",
      "A detailed written quote protects you — avoid verbal agreements",
      "Budget 15% contingency on top of your quote for unexpected issues",
    ],
    relatedIds: [2, 3, 1],
  },
  "6": {
    id: 6,
    tag: "DIY Guide",
    title: "Tiling Your Own Bathroom: What You Need to Know Before You Start",
    emoji: "🧱",
    color: "#d97706",
    date: "May 15, 2025",
    readTime: "10 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "DIY tiling can save you thousands — or cost you thousands more if done wrong. A licensed Queensland tiler shares what homeowners get wrong, what requires a licensed professional, and how to get professional results if you choose to DIY.",
    sections: [
      {
        heading: "What You Can Legally DIY in Queensland",
        body: "In Queensland, homeowners may tile their own properties for personal (non-commercial) use without a QBCC licence, provided: the work doesn't involve waterproofing in wet areas, structural changes, or works over $3,300 in labour value. When in doubt, check with QBCC directly.",
      },
      {
        heading: "What You Cannot DIY",
        body: "Waterproofing in bathrooms and wet areas is required by law to be performed by a licensed waterproofer in Queensland. You cannot lay tiles in a shower recess or bathroom floor without compliant waterproofing underneath. This is not optional.",
      },
      {
        heading: "The Most Common DIY Tiling Mistakes",
        body: "1. Not checking for level before starting (leads to lippage). 2. Using cheap adhesive and grout that cracks. 3. Not soaking porous tiles before laying. 4. Rushing and not allowing adhesive to set. 5. Using the wrong trowel notch size for large format tiles.",
      },
      {
        heading: "Tile Selection Tips",
        body: "For floors, choose tiles with a slip rating of R10 or above (R11 or higher for outdoors). For walls, rectified tiles give cleaner grout lines for large format installations. Avoid using wall tiles on floors — they're not rated for foot traffic.",
      },
      {
        heading: "Tools You Actually Need",
        body: "A quality tile saw (rent, don't buy for a one-off), an angle grinder with diamond blade, notched trowel, rubber mallet, tile spacers, level, and a grout float. Budget $150–$300 to rent tools for a weekend project.",
      },
    ],
    tips: [
      "Order 10–15% more tiles than measured — wastage from cuts adds up fast",
      "Wet-cut tiles only — dry cutting creates dust that's extremely harmful to lungs",
      "Let adhesive cure for 24 hours before grouting — 48 hours in humid Queensland",
      "Use a grout sealer after grouting — especially important in Queensland's humidity",
    ],
    relatedIds: [2, 5, 3],
  },
  "7": {
    id: 7,
    tag: "Renovation Costs",
    title: "Why Is Renovation So Expensive in QLD? An Honest Answer to “The Neighbour Got It Half Price”",
    emoji: "💰",
    color: "var(--gold)",
    date: "June 21, 2026",
    readTime: "6 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "Almost every homeowner asks it: “Why is this so expensive? My neighbour got theirs done for half that.” It’s a fair question — and the honest answer surprises most people. After years on the tools across South East QLD, here’s what that “half price” quote usually leaves out, and why the real cost of a renovation is mostly people, not paint.",
    sections: [
      {
        heading: "“Half price” usually means something is missing",
        body: "A quote can be half the price for a reason — the trick is finding where the other half went. Nine times out of ten, the cheap quote is missing one of these: no QBCC licence, no insurance, waterproofing done in a single coat instead of two, or demolition and rubbish removal quietly left off the page. You don’t see what’s missing on quote day. You see it 18 months later when the bathroom leaks.",
      },
      {
        heading: "The biggest cost isn’t materials — it’s labour",
        body: "Homeowners assume tiles and fittings are where the money goes. They’re not. In Australia, the largest line item is almost always labour. Licensed tradespeople here are paid award wages, carry public liability and workers’ compensation insurance, and work to strict safety and building codes. That hourly rate isn’t a markup — it’s a qualified, insured professional who is legally accountable for the work. A cash job with no licence skips all of that, which is exactly why it looks cheaper.",
      },
      {
        heading: "Why a licence and insurance actually matter to you",
        body: "In Queensland, building work over a set value must be done by a QBCC-licensed contractor, and that licence comes with up to 6.5 years of statutory warranty cover. If an unlicensed operator damages your home — or injures themselves on your property without insurance — the liability can land on you, the homeowner. The licensed price includes that protection. The “half price” job often transfers the risk straight to you without telling you.",
      },
      {
        heading: "The false economy: waterproofing",
        body: "This is the one that costs people the most. Proper waterproofing is two coats, correctly cured, with special attention to corners and floor wastes — because corners are where leaks almost always start. A cheap quote saves money by doing one coat, or rushing the corners. It holds for a year, maybe two. Then water gets into the wall, and you’re not paying to fix waterproofing — you’re paying to rip out and rebuild the whole bathroom. That’s the real “double price.”",
      },
      {
        heading: "So how do you compare quotes fairly?",
        body: "Don’t compare the total — compare what’s inside it. Ask every quote the same questions: Are you QBCC licensed? Is the price including demolition and rubbish removal? How many coats of waterproofing, and is it warranted? Are you insured? When the cheap quote answers honestly, the gap usually closes on its own. Cheap isn’t cheap — it’s just the bill you can’t see yet.",
      },
    ],
    tips: [
      "Always ask for the QBCC licence number — you can verify it free on the QBCC website",
      "Make sure demolition and rubbish removal are written into the quote, not assumed",
      "Insist on two-coat waterproofing with a written warranty — it’s the cheapest insurance you’ll ever buy",
      "Confirm the contractor carries public liability and workers’ compensation insurance",
      "A quote that’s far below the rest isn’t a bargain — ask what’s missing before you sign",
    ],
    relatedIds: [5, 3, 2],
  },
  "8": {
    id: 8,
    tag: "DIY Guide",
    title: "How to Re-Grout Bathroom Tiles (Step by Step)",
    emoji: "🪣",
    color: "#0891b2",
    date: "June 14, 2026",
    readTime: "9 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "Crumbling, discoloured grout makes even a clean bathroom look dirty — and left too long, it lets water seep behind tiles and ruin your waterproofing. The good news: re-grouting is one of the most satisfying DIY jobs you can do on a weekend. Here's exactly how to do it properly.",
    sections: [
      {
        heading: "Tools & Materials You'll Need",
        body: "Oscillating multi-tool with grout blade (or manual grout rake), vacuum, grout float, sponge, grout (unsanded for joints under 3mm, sanded for wider), grout sealer, painter's tape, safety glasses, and rubber gloves. Budget $60–$120 for materials. Renting an oscillating tool saves money on a one-off job.",
      },
      {
        heading: "Step 1: Remove the Old Grout",
        body: "Use your oscillating grout removal blade to rake out the old grout to a depth of at least 2mm — deeper if it's cracked all the way through. Work carefully along each joint. Don't rush; forcing the tool can chip tile edges. Vacuum all dust and debris before moving on. This is the hardest part of the job — budget 2–3 hours for an average bathroom.",
      },
      {
        heading: "Step 2: Clean and Dry Thoroughly",
        body: "Vacuum again, then wipe joints with a damp cloth to remove any remaining dust. Any grease, soap residue, or moisture will prevent the new grout from bonding properly. Let the joints dry completely — at least 2 hours, or overnight in Queensland's humidity.",
      },
      {
        heading: "Step 3: Mix Your Grout",
        body: "Mix grout to a thick peanut-butter consistency — too watery and it'll crack, too stiff and it won't work into the joints. In QLD's heat, work in small batches (enough for one wall at a time) because grout sets fast. Always add powder to water, not the other way around.",
      },
      {
        heading: "Step 4: Apply the Grout",
        body: "Load your grout float and work it diagonally across the tiles, pressing firmly to pack grout into every joint. Cover a 1m² section at a time. Don't worry about the mess on the tile faces — you'll clean it off. Hold the float at 45° to force grout into the joints without pulling it back out.",
      },
      {
        heading: "Step 5: Clean and Finish",
        body: "Wait 15–20 minutes after grouting a section, then wipe with a damp (not wet) sponge in circular motions to remove excess grout from tile faces. Rinse your sponge constantly. Repeat with a clean damp sponge for a final wipe. A grout haze may remain — buff it off with a dry microfibre cloth after 1 hour.",
      },
      {
        heading: "Step 6: Seal the Grout (Don't Skip This)",
        body: "After the grout has cured for 72 hours (longer in humidity), apply a penetrating grout sealer. In Queensland's humid climate, this step is critical — unsealed grout absorbs moisture and grows mould fast. Apply with a small brush or foam applicator, wipe off excess, and reapply annually.",
      },
      {
        heading: "When to Call a Tradie Instead",
        body: "If tiles are loose or hollow (tap them — a dull thud means the adhesive has failed), if you see water damage or staining on the wall behind the tiles, or if the waterproofing membrane is compromised — stop. These are signs of a bigger problem that DIY re-grouting will only hide temporarily. A licensed tiler will diagnose the real issue.",
      },
    ],
    tips: [
      "Always use bathroom/tile grout — not wall filler or general-purpose grout",
      "In Queensland's heat, mist tile surfaces lightly before grouting to slow the set time",
      "Don't re-grout over existing grout — removal is non-negotiable for a proper bond",
      "Epoxy grout is more durable and stain-resistant but harder to work with — good for shower floors",
      "Replace silicone sealant at internal corners at the same time — never use grout in corners (it cracks)",
    ],
    relatedIds: [2, 6, 3],
  },
  "9": {
    id: 9,
    tag: "DIY Guide",
    title: "Fix a Running Toilet in Under an Hour (Replace the Fill Valve & Flapper)",
    emoji: "🚽",
    color: "#16a34a",
    date: "June 10, 2026",
    readTime: "7 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "A running toilet can waste up to 200,000 litres of water a year — and add hundreds of dollars to your water bill. In most cases the fix costs $20–$40 in parts and takes under an hour with no special skills. Here's how to diagnose and fix the two most common causes.",
    sections: [
      {
        heading: "Diagnose First: Which Part is Failing?",
        body: "Put a few drops of food colouring in the cistern (tank). Wait 15 minutes without flushing. If colour appears in the bowl, your flapper is leaking. If the water level is up at the overflow pipe, the fill valve (ballcock) isn't shutting off properly. If both tests fail, replace both — they're cheap and the job is already half done.",
      },
      {
        heading: "Tools & Materials",
        body: "Adjustable wrench, sponge, bucket, replacement fill valve (Caroma and Geberit are reliable Australian brands, $15–$40), replacement flapper (match the brand on your cistern, $5–$15), and rubber gloves. Most hardware stores stock universal kits. Take a photo of your cistern before going shopping.",
      },
      {
        heading: "Step 1: Turn Off the Water Supply",
        body: "Find the isolation valve on the pipe behind or below the toilet and turn it clockwise until it stops. Flush the toilet to empty the cistern. Use a sponge to mop out any remaining water in the bottom of the cistern. Lay a towel on the floor — there will be drips.",
      },
      {
        heading: "Step 2: Replace the Flapper",
        body: "Unhook the chain from the flush lever. Unhook the old flapper from the pegs on either side of the flush valve seat. Clip the new flapper onto the same pegs and reconnect the chain, leaving about 1–2cm of slack. Too much slack and the flapper won't seal; too tight and it won't drop back down after flushing.",
      },
      {
        heading: "Step 3: Replace the Fill Valve",
        body: "Disconnect the water supply line from the bottom of the cistern (have your bucket ready — some water will come out). Remove the locknut holding the old fill valve in place. Lift out the old valve. Drop in the new fill valve, adjust the height per the instructions, and hand-tighten the locknut. Reconnect the water supply line.",
      },
      {
        heading: "Step 4: Test and Adjust",
        body: "Turn the water supply back on slowly and let the cistern fill. Adjust the water level on the new fill valve so it sits about 25mm below the top of the overflow pipe — most valves have a simple clip or screw adjustment. Flush a few times and check for leaks at the supply line connection. Done.",
      },
      {
        heading: "Queensland Note: Plumbing Licence Requirements",
        body: "In Queensland, homeowners can perform minor maintenance like replacing a toilet cistern filling valve, flapper, or flush button on their own home — this is classified as 'owner-occupier work'. However, moving or installing new plumbing fixtures, altering waste pipes, or any work on gas connections must be done by a licensed Queensland plumber. When in doubt, check with the QBCC.",
      },
    ],
    tips: [
      "Take a photo of your toilet model number (inside the cistern lid) before buying parts — compatibility matters",
      "Replace both flapper and fill valve at the same time — the cost difference is minimal if you're already in there",
      "After reassembly, add a few drops of food colouring in the cistern again to confirm the flapper is sealing",
      "If the cistern still runs after replacing both parts, the flush valve seat may be corroded — call a plumber",
      "Caroma and Geberit parts are widely available in QLD and have good support — avoid unknown imports",
    ],
    relatedIds: [2, 8, 6],
  },
  "10": {
    id: 10,
    tag: "DIY Guide",
    title: "Painting Your Home Interior in Queensland: Products, Prep, and Getting a Professional Finish",
    emoji: "🖌️",
    color: "#d97706",
    date: "June 7, 2026",
    readTime: "11 min read",
    author: "James Whitfield, EIJ Construction",
    intro: "Interior painting is one of the highest-ROI DIY jobs you can do — a single room weekend project can dramatically transform a space. But in Queensland's humid subtropical climate, getting a lasting, professional-quality finish requires the right products and prep. Here's the complete guide.",
    sections: [
      {
        heading: "Choosing the Right Paint for Queensland",
        body: "Queensland's humidity (often 70–85% in summer) and temperature swings demand moisture-resistant, mould-inhibiting paint. For bathrooms and kitchens: use a dedicated bathroom paint (Dulux Wash & Wear Bathroom or Taubmans Endure Bathroom) — not standard interior paint. For living areas and bedrooms: a premium low-VOC acrylic in low-sheen or satin finish suits QLD homes well. Avoid flat/matt finishes in humid rooms — they absorb moisture and grow mould.",
      },
      {
        heading: "Preparation is 80% of the Job",
        body: "Fill cracks and nail holes with flexible filler (Selleys No More Gaps for corners and joints, Spakfilla for flat surfaces). Sand smooth when dry. Remove any mould with a sugar soap and bleach solution — never paint over mould. Clean all surfaces with sugar soap to remove grease and dust. Fill, sand, and sugar soap in that order, then let walls dry completely before painting.",
      },
      {
        heading: "Prime: Don't Skip It",
        body: "New plasterboard, repaired areas, or previously unpainted surfaces must be primed. Use a sealer/primer that suits the surface type. On previously painted walls in good condition, a quality paint + primer combo (like Dulux Wash & Wear +Primer) can work. In Queensland's humid areas, use a mould-resistant primer. Skipping primer on bare surfaces almost always shows through as uneven sheen and poor coverage.",
      },
      {
        heading: "The Right Tools Make a Huge Difference",
        body: "Invest in a quality roller (25mm nap for textured walls, 12mm for smooth), a good angled brush (65mm for cutting in), a roller tray, painter's tape, drop sheets, and an extension pole. Cheap rollers leave fibres in the paint and create a stippled finish. For large rooms, a 230mm wide roller cuts job time in half. A good 65mm angled brush lets you cut in cleanly without taping every edge.",
      },
      {
        heading: "Cutting In: The Skill That Separates DIY from Pro",
        body: "Cutting in means painting the edges (where walls meet ceilings, cornices, trim, and other walls) with a brush before rolling. Load the brush and tap off excess — don't wipe the brush on the rim or you'll dry it out. Use the angled tip and draw a steady line with your forearm resting against the wall for control. Work in 50cm sections. In Queensland's heat, cut in one wall at a time and roll immediately — you want a wet edge where the brush meets the roller.",
      },
      {
        heading: "Rolling: Technique for a Smooth Finish",
        body: "Use a W or M pattern — roll diagonally across the wall, then back-roll vertically without reloading to even out the finish. Maintain a wet edge and work wall to wall without stopping in the middle. Two thin coats are always better than one thick coat. In Queensland's humidity, allow full cure time between coats (2–4 hours in summer heat is usually enough, but longer in humid conditions — feel the paint, don't guess).",
      },
      {
        heading: "Queensland-Specific: Heat and Humidity Tips",
        body: "Paint in the morning before the afternoon heat peaks — above 35°C, paint dries too fast and shows lap marks. Close windows on humid days to slow drying and avoid dust settling in wet paint. Never paint in direct sunlight. If you see condensation on walls in the morning (common in coastal QLD), wait for it to evaporate completely before starting.",
      },
    ],
    tips: [
      "Always buy 10% more paint than calculated — colour-matching a second tin is hit and miss",
      "In QLD bathrooms, use a mould-inhibiting primer even if you can't see mould — it's often microscopic",
      "Store leftover paint in a sealed container with a piece of glad wrap pressed against the surface to prevent skinning",
      "Remove painter's tape while the final coat is still slightly tacky — pulling off dry tape can peel the paint edge",
      "A quality brush is the single best investment — a Purdy or Wooster brush used carefully outlasts 10 cheap brushes",
    ],
    relatedIds: [1, 4, 5],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = posts[id];
  if (!post) return { title: "Article Not Found | CoastHomeHub" };
  return {
    title: `${post.title} | CoastHomeHub`,
    description: post.intro.slice(0, 155),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts[id];
  if (!post) notFound();

  const related = post.relatedIds
    .map((rid) => posts[String(rid)])
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(160deg, ${post.color}20 0%, var(--sand-50) 100%)`,
          paddingTop: 120,
          paddingBottom: 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative large emoji */}
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", fontSize: "10rem", opacity: 0.08, pointerEvents: "none", userSelect: "none" }}>
          {post.emoji}
        </div>
        <div className="container-md" style={{ position: "relative" }}>
          <Link href="/blog" style={{ color: "var(--ocean-500)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            ← Back to All Articles
          </Link>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "1.8rem" }}>{post.emoji}</span>
            <span style={{ display: "inline-block", background: `${post.color}18`, color: post.color, border: `1px solid ${post.color}35`, borderRadius: "50px", padding: "4px 14px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {post.tag}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", marginBottom: 20, lineHeight: 1.2, maxWidth: 680 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: 20, alignItems: "center", color: "var(--slate-light)", fontSize: "0.875rem", flexWrap: "wrap" }}>
            <span>✍️ {post.author}</span>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: "white", padding: "48px 0 80px" }}>
        <div className="container-md">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 56, alignItems: "flex-start" }} className="article-grid">
            {/* Content */}
            <div>
              {/* Intro */}
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--slate-mid)", marginBottom: 40, fontWeight: 500, borderLeft: `4px solid ${post.color}`, paddingLeft: 20 }}>
                {post.intro}
              </p>

              {/* Sections */}
              {post.sections.map((section) => (
                <div key={section.heading} style={{ marginBottom: 36 }}>
                  <h2 style={{ fontSize: "1.2rem", marginBottom: 12, color: "var(--slate-dark)" }}>
                    {section.heading}
                  </h2>
                  <p style={{ color: "var(--slate-mid)", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-line" }}>
                    {section.body}
                  </p>
                </div>
              ))}

              {/* Tips box */}
              <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: "var(--radius-lg)", padding: "28px 32px", marginTop: 48, marginBottom: 48 }}>
                <h3 style={{ color: "var(--ocean-700)", fontSize: "1.05rem", marginBottom: 16 }}>
                  💡 Expert Tips from EIJ Construction
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {post.tips.map((tip) => (
                    <li key={tip} style={{ display: "flex", gap: 10, fontSize: "0.9rem", color: "var(--ocean-700)" }}>
                      <span style={{ fontWeight: 700, color: "var(--ocean-400)", marginTop: 2 }}>→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author CTA */}
              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: "var(--radius-lg)", padding: "28px 32px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ width: 60, height: 60, background: "linear-gradient(135deg, var(--ocean-500), var(--ocean-400))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>
                  👷
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Written by James Whitfield</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--slate-light)" }}>QBCC-licensed waterproofing specialist & founder of EIJ Construction. Gold Coast · Sunshine Coast · SEQ.</div>
                </div>
                <Link href="/quote" className="btn-primary" style={{ fontSize: "0.875rem", padding: "10px 20px", whiteSpace: "nowrap" }} id="article-get-quote">
                  Get a Free Quote
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 96 }}>
              <div style={{ background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-500))", borderRadius: "var(--radius-lg)", padding: 24, color: "white" }}>
                <h4 style={{ color: "white", marginBottom: 12, fontSize: "1rem" }}>Need a Tradie?</h4>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>
                  Get a free quote from a licensed QLD professional within 24 hours.
                </p>
                <Link href="/quote" style={{ display: "block", background: "white", color: "var(--ocean-600)", padding: "11px 20px", borderRadius: "50px", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", textAlign: "center" }} id="sidebar-get-quote">
                  Get Free Quote →
                </Link>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <h4 style={{ fontSize: "0.9rem", marginBottom: 14 }}>📖 More Articles</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {related.map((r) => r && (
                    <Link key={r.id} href={`/blog/${r.id}`} style={{ display: "flex", gap: 10, textDecoration: "none", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "1.2rem" }}>{r.emoji}</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--slate-mid)", lineHeight: 1.4, fontWeight: 500 }}>{r.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 20, background: "var(--sand-50)", border: "1px solid var(--sand-200)" }}>
                <h4 style={{ fontSize: "0.9rem", marginBottom: 10 }}>🗺️ Service Areas</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--slate-light)", lineHeight: 1.6 }}>
                  Gold Coast · Tweed Heads · Logan · Brisbane · Sunshine Coast · Noosa
                </p>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:800px){.article-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Related Articles */}
      <section style={{ background: "var(--off-white)", padding: "64px 0" }}>
        <div className="container-lg">
          <h2 style={{ fontSize: "1.6rem", marginBottom: 32 }}>Related Articles</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {related.map((r) => r && (
              <Link key={r.id} href={`/blog/${r.id}`} style={{ textDecoration: "none" }}>
                <article className="card" style={{ overflow: "hidden" }}>
                  <div style={{ height: 120, background: `linear-gradient(135deg, ${r.color}20, ${r.color}40)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                    {r.emoji}
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: r.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.tag}</span>
                    <h3 style={{ fontSize: "0.95rem", marginTop: 6, lineHeight: 1.4, color: "var(--slate-dark)" }}>{r.title}</h3>
                    <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginTop: 6 }}>⏱ {r.readTime} · {r.date}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--slate-dark), var(--slate-mid))", padding: "64px 0", textAlign: "center" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "1.8rem", marginBottom: 12 }}>Ready to Start Your Project?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Get a free quote from a licensed QLD tradie within 24 hours.</p>
          <Link href="/quote" className="btn-gold" id="article-cta">Get a Free Quote →</Link>
        </div>
      </section>
    </>
  );
}

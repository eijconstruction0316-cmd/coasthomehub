import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const EXTRACT_PROMPT = `You are a renovation project analyst. Analyse the conversation below between a homeowner and CoastAI, then extract a structured job brief in JSON.

Return ONLY valid JSON with these exact fields (use null for unknown values):
{
  "jobType": string,           // e.g. "Bathroom Renovation", "Kitchen Refresh", "Deck Rebuild"
  "location": string | null,   // suburb/area mentioned, e.g. "Surfers Paradise"
  "budget": string | null,     // customer's stated budget, e.g. "$20k", "$15k–$25k"
  "estimatedCost": string | null, // AI's QLD cost estimate, e.g. "$18k–$24k"
  "timeline": string | null,   // e.g. "1-2 weeks", "ASAP", "Within 3 months"
  "scope": string[],           // list of specific work items, e.g. ["New vanity", "Large-format tiles", "Matte black tapware"]
  "materials": string[],       // materials/finishes mentioned, e.g. ["Floating vanity", "Porcelain tiles"]
  "designConcept": string | null, // AI's design style/concept summary, e.g. "Warm coastal — floating vanity, matte black"
  "aiSummary": string,         // 2-3 sentence professional summary of the job for tradespeople
  "urgency": "low" | "medium" | "high" | null,
  "hasPhoto": boolean          // true if user uploaded a photo
}`;

type InMsg = { role: string; text: string; image?: { media_type: string; data: string } };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI not configured" }, { status: 503 });

  let messages: InMsg[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (messages.length < 2) return NextResponse.json({ error: "Not enough conversation" }, { status: 400 });

  const hasPhoto = messages.some((m) => m.image?.data);

  const conversationText = messages
    .map((m) => `${m.role === "user" ? "Homeowner" : "CoastAI"}: ${m.text}`)
    .join("\n\n");

  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const result = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            { text: EXTRACT_PROMPT },
            { text: "\n\n--- CONVERSATION ---\n\n" + conversationText },
          ],
        },
      ],
    });

    const raw = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return NextResponse.json({ error: "Could not extract report" }, { status: 500 });

    const report = JSON.parse(jsonMatch[0]);
    report.hasPhoto = hasPhoto;

    return NextResponse.json({ report });
  } catch (err) {
    console.error("generate-report error:", err);
    return NextResponse.json({ error: "Report generation failed" }, { status: 500 });
  }
}

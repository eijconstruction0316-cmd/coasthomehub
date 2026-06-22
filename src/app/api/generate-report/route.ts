import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { extractedReportSchema, generateReportSchema } from "@/lib/apiSchemas";
import { logError } from "@/lib/logger";
import {
  jsonError,
  parseJson,
  rateLimit,
  requireReportSigningSecret,
  signPayload,
  verifySameOrigin,
} from "@/lib/security";

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

type InMsg = { role: string; text: string; hasPhoto?: boolean; imageCount?: number };

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, {
    key: "generate-report",
    limit: 12,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  const originError = verifySameOrigin(req);
  if (originError) return originError;

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI not configured" }, { status: 503 });

  try {
    requireReportSigningSecret();
  } catch (err) {
    logError("generate-report:signing", err);
    return jsonError("Report signing is not configured", 503);
  }

  const parsed = await parseJson(req, generateReportSchema);
  if (parsed.error) return parsed.error;
  const { messages } = parsed.data as { messages: InMsg[] };

  if (messages.length < 2) return NextResponse.json({ error: "Not enough conversation" }, { status: 400 });

  const hasPhoto = messages.some((m) => m.hasPhoto);
  const photoCount = messages.reduce((sum, m) => sum + (m.imageCount ?? (m.hasPhoto ? 1 : 0)), 0);

  // 비용 절감: 최대 20개 메시지만 분석 (요약에는 충분한 컨텍스트).
  const capped = messages.slice(-20);
  const conversationText = capped
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

    const aiReport = JSON.parse(jsonMatch[0]);
    const parsedReport = extractedReportSchema.safeParse({
      ...aiReport,
      hasPhoto,
      photoCount,
    });

    if (!parsedReport.success) {
      return NextResponse.json({ error: "Could not validate report" }, { status: 500 });
    }

    return NextResponse.json({
      report: parsedReport.data,
      reportToken: signPayload(parsedReport.data),
    });
  } catch (err) {
    logError("generate-report", err);
    return NextResponse.json({ error: "Report generation failed" }, { status: 500 });
  }
}

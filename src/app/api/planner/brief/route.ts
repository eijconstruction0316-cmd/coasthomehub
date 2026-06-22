import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { plannerBriefRequestSchema, plannerBriefSchema } from "@/lib/apiSchemas";
import { jsonError, parseJson, rateLimit, verifySameOrigin } from "@/lib/security";
import { buildPlannerBriefFallback, buildPlannerBriefPrompt } from "@/lib/planner";
import { generatePdfAccessToken, savePlannerBrief } from "@/lib/plannerDatabase";
import { logError } from "@/lib/logger";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, {
    key: "planner-brief",
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  const originError = verifySameOrigin(req);
  if (originError) return originError;

  const parsed = await parseJson(req, plannerBriefRequestSchema);
  if (parsed.error) return parsed.error;

  const input = parsed.data;
  let brief = buildPlannerBriefFallback(input);

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
      const result = await ai.models.generateContent({
        model,
        contents: [
          {
            role: "user",
            parts: [{ text: buildPlannerBriefPrompt(input) }],
          },
        ],
      });

      const raw = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const aiBrief = plannerBriefSchema.safeParse(JSON.parse(jsonMatch[0]));
        if (aiBrief.success) brief = aiBrief.data;
      }
    } catch (err) {
      logError("planner-brief:ai", err);
    }
  }

  try {
    const record = await savePlannerBrief({
      projectType: input.projectType,
      answers: input.answers,
      photos: input.photos,
      brief,
    });

    const token = generatePdfAccessToken(record.id);
    return NextResponse.json({
      id: record.id,
      brief: record.brief,
      pdfUrl: `/api/planner/pdf/${record.id}?token=${token}`,
    });
  } catch (err) {
    logError("planner-brief", err);
    return jsonError("Could not save project brief", 500);
  }
}

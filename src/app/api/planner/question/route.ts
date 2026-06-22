import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { plannerQuestionRequestSchema } from "@/lib/apiSchemas";
import { parseJson, rateLimit, verifySameOrigin } from "@/lib/security";
import { logError } from "@/lib/logger";
import { buildPlannerQuestionPrompt, getFallbackPlannerQuestion } from "@/lib/planner";

export const runtime = "nodejs";
export const maxDuration = 30;

const aiQuestionSchema = z.object({
  text: z.string().trim().min(1).max(500),
  helper: z.string().trim().min(1).max(500),
  placeholder: z.string().trim().min(1).max(240),
}).strip();

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, {
    key: "planner-question",
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });
  if (limited) return limited;

  const originError = verifySameOrigin(req);
  if (originError) return originError;

  const parsed = await parseJson(req, plannerQuestionRequestSchema);
  if (parsed.error) return parsed.error;

  const { projectType, answers } = parsed.data;
  const fallback = getFallbackPlannerQuestion(projectType, answers);
  if (fallback.complete || !fallback.question) {
    return NextResponse.json({ complete: true, question: null });
  }

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ complete: false, question: fallback.question });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const result = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: buildPlannerQuestionPrompt({
                projectType,
                answers,
                fallbackQuestion: fallback.question,
              }),
            },
          ],
        },
      ],
    });

    const raw = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ complete: false, question: fallback.question });
    }

    const aiQuestion = aiQuestionSchema.safeParse(JSON.parse(jsonMatch[0]));
    if (!aiQuestion.success) {
      return NextResponse.json({ complete: false, question: fallback.question });
    }

    return NextResponse.json({
      complete: false,
      question: {
        ...fallback.question,
        ...aiQuestion.data,
      },
    });
  } catch (err) {
    logError("planner-question", err);
    return NextResponse.json({ complete: false, question: fallback.question });
  }
}

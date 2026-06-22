import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, rateLimit } from "@/lib/security";
import { getPlannerBrief } from "@/lib/plannerDatabase";
import { generatePlannerPdf } from "@/lib/plannerPdf";

export const runtime = "nodejs";

const briefIdSchema = z.string().uuid();

export async function GET(
  req: NextRequest,
  context: { params: Promise<unknown> }
) {
  const limited = rateLimit(req, {
    key: "planner-pdf",
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });
  if (limited) return limited;

  const params = await context.params;
  const id = typeof params === "object" && params !== null && "id" in params
    ? String(params.id)
    : "";
  const parsedId = briefIdSchema.safeParse(id);
  if (!parsedId.success) return jsonError("Invalid brief id", 400);

  const record = await getPlannerBrief(parsedId.data);
  if (!record) return jsonError("Brief not found", 404);

  const pdf = generatePlannerPdf(record);
  return new NextResponse(pdf, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="coasthomehub-planner-${record.id}.pdf"`,
      "cache-control": "private, no-store",
    },
  });
}

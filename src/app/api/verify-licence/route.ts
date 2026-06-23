import { NextRequest, NextResponse } from "next/server";
import { verifyLicenceSchema } from "@/lib/apiSchemas";
import { logError } from "@/lib/logger";
import { verifyAbnAndLicence } from "@/lib/licenceVerifier";
import {
  parseJson,
  rateLimit,
  verifySameOrigin,
} from "@/lib/security";

export async function POST(req: NextRequest) {
  // 1. Rate Limiting (Prevent registry API spam / brute-force)
  const limited = rateLimit(req, {
    key: "licence-verification",
    limit: 15,
    windowMs: 15 * 60 * 1000, // 15 requests per 15 minutes
  });
  if (limited) return limited;

  // 2. Same Origin check in production
  const originError = verifySameOrigin(req);
  if (originError) return originError;

  // 3. Body validation
  const parsed = await parseJson(req, verifyLicenceSchema);
  if (parsed.error) return parsed.error;

  try {
    const { abn, licenceNumber, businessNameHint } = parsed.data;

    // 4. Perform ABN and QBCC licence check
    const result = await verifyAbnAndLicence(abn, licenceNumber, businessNameHint);

    return NextResponse.json(result);
  } catch (error) {
    logError("verify-licence-api", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during verification. Please try again.",
        logs: ["System error occurred during verification. Please try again."],
      },
      { status: 500 }
    );
  }
}

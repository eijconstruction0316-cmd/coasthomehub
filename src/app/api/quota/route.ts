import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/security";

export const runtime = "nodejs";

const FREE_QUOTA = 2;
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30일

// QUOTA_SIGNING_SECRET 없으면 REPORT_SIGNING_SECRET 재사용, 없으면 dev 기본값
function secret() {
  return (
    process.env.QUOTA_SIGNING_SECRET ||
    process.env.REPORT_SIGNING_SECRET ||
    "dev-quota-secret-change-in-prod"
  );
}

function sign(count: number): string {
  return createHmac("sha256", secret())
    .update(String(count))
    .digest("hex")
    .slice(0, 16);
}

function parseQuotaCookie(value: string | undefined): number {
  if (!value) return 0;
  const dot = value.lastIndexOf(".");
  if (dot < 0) return 0;
  const countStr = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const count = parseInt(countStr, 10);
  if (isNaN(count) || count < 0) return 0;
  // 서명 검증 — 조작된 쿠키는 0으로 리셋
  if (sign(count) !== sig) return 0;
  return count;
}

function cookieValue(count: number) {
  return `${count}.${sign(count)}`;
}

// GET /api/quota — 현재 사용량 조회
export async function GET(req: NextRequest) {
  const used = parseQuotaCookie(req.cookies.get("chub_quota")?.value);
  const subscribed = req.cookies.get("chub_access")?.value === "unlocked";
  return NextResponse.json({
    used,
    limit: FREE_QUOTA,
    atLimit: !subscribed && used >= FREE_QUOTA,
    subscribed,
  });
}

// POST /api/quota — brief 제출 성공 후 카운터 증가
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, { key: "quota-inc", limit: 10, windowMs: 60 * 60 * 1000 });
  if (limited) return limited;

  const current = parseQuotaCookie(req.cookies.get("chub_quota")?.value);
  const next = current + 1;

  const res = NextResponse.json({ used: next, limit: FREE_QUOTA });
  res.cookies.set("chub_quota", cookieValue(next), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}

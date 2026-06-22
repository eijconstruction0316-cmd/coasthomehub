import { createHmac, randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import type { PlannerAnswer, PlannerBrief, PlannerPhoto, PlannerProjectType } from "./planner";

// PDF 다운로드 URL에 포함되는 단방향 접근 토큰.
// DB 저장 없이 서버에서 검증 가능 (id → HMAC 결정론적).
export function generatePdfAccessToken(id: string): string {
  const secret =
    process.env.REPORT_SIGNING_SECRET ||
    process.env.QUOTA_SIGNING_SECRET ||
    "dev-signing-secret-change-in-prod";
  return createHmac("sha256", secret)
    .update(`planner-pdf:${id}`)
    .digest("hex")
    .slice(0, 32);
}

export function verifyPdfAccessToken(id: string, token: string): boolean {
  const expected = generatePdfAccessToken(id);
  if (expected.length !== token.length) return false;
  try {
    return createHmac("sha256", expected)
      .update(token)
      .digest("hex") === createHmac("sha256", expected).update(expected).digest("hex");
  } catch {
    return false;
  }
}

const DEFAULT_PLANNER_DB_FILE = "/tmp/coasthomehub-planner-briefs.json";
const DEFAULT_PLANNER_DB_DIR = "/tmp";

export type PlannerBriefRecord = {
  id: string;
  createdAt: string;
  projectType: PlannerProjectType;
  answers: PlannerAnswer[];
  photos: PlannerPhoto[];
  brief: PlannerBrief;
};

type PlannerDatabase = {
  briefs: Record<string, PlannerBriefRecord>;
};

function dbFilePath() {
  return DEFAULT_PLANNER_DB_FILE;
}

async function readDatabase(): Promise<PlannerDatabase> {
  try {
    const raw = await readFile(dbFilePath(), "utf8");
    const parsed = JSON.parse(raw) as PlannerDatabase;
    return { briefs: parsed.briefs ?? {} };
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      return { briefs: {} };
    }
    throw err;
  }
}

async function writeDatabase(data: PlannerDatabase) {
  const file = dbFilePath();
  await mkdir(DEFAULT_PLANNER_DB_DIR, { recursive: true });
  const tempFile = `${file}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tempFile, JSON.stringify(data, null, 2), "utf8");
  await rename(tempFile, file);
}

export async function savePlannerBrief(input: Omit<PlannerBriefRecord, "id" | "createdAt">) {
  const database = await readDatabase();
  const record: PlannerBriefRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  database.briefs[record.id] = record;
  await writeDatabase(database);
  return record;
}

export async function getPlannerBrief(id: string) {
  const database = await readDatabase();
  return database.briefs[id] ?? null;
}

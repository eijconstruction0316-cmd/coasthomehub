import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import type { PlannerAnswer, PlannerBrief, PlannerPhoto, PlannerProjectType } from "./planner";

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

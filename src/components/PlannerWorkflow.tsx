"use client";

import { useState } from "react";
import { PlannerProjectType } from "@/lib/planner";
import LocationInput from "@/components/LocationInput";

type ProjectType = PlannerProjectType;

type PlannerQuestion = {
  id: string;
  text: string;
  helper: string;
  placeholder: string;
  required: boolean;
};

type PlannerAnswer = {
  questionId: string;
  question: string;
  answer: string;
};

type PlannerPhoto = {
  name: string;
  type: string;
  size: number;
  lastModified?: number;
};

type PlannerBrief = {
  scope: string[];
  budgetRange: string;
  timeline: string;
  location: string | null;
  materials: string[];
  photos: {
    count: number;
    notes: string[];
  };
  assumptions: string[];
  risks: string[];
  nextSteps: string[];
};

type PlannerResult = {
  id: string;
  brief: PlannerBrief;
  pdfUrl: string;
};

const PROJECT_TYPES: Array<{ type: ProjectType; label: string; description: string }> = [
  { type: "Bathroom", label: "Bathroom", description: "Waterproofing, fixtures, tiling, layout and finishes." },
  { type: "Kitchen", label: "Kitchen", description: "Cabinetry, benchtops, appliance layout and services." },
  { type: "Flooring", label: "Flooring", description: "Timber, laminate, carpet, vinyl prep and install." },
  { type: "Painting", label: "Painting", description: "Interior or exterior painting, prep, colours and finishes." },
  { type: "Outdoor", label: "Outdoor", description: "Patios, pergolas, gazebos, external structures and seating." },
  { type: "Waterproofing", label: "Waterproofing", description: "Shower recess, wet areas, balconies, QBCC compliance." },
  { type: "Tiling", label: "Tiling", description: "Wall and floor tiles, screeding, splashbacks and layouts." },
  { type: "Decking & Carpentry", label: "Decking & Carpentry", description: "Timber or composite decks, framing, doors and fit-out." },
  { type: "Landscaping & Paving", label: "Landscaping & Paving", description: "Gardens, turfing, retaining walls, paths and driveways." },
  { type: "Electrical & Smart Home", label: "Electrical & Smart Home", description: "Lighting layout, switchboards, smart devices and GPOs." },
  { type: "Plumbing", label: "Plumbing", description: "Hot water systems, fixtures, drainage and pipe relocation." },
  { type: "Roofing & Cladding", label: "Roofing & Cladding", description: "Repairs, re-roofing, gutters, downpipes and cladding." },
  { type: "Plastering & Gyprock", label: "Plastering & Gyprock", description: "Plasterboard hanging, jointing, sanding and cornices." },
];

function formatBytes(size: number) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function section(title: string, children: React.ReactNode) {
  return (
    <div style={{ borderTop: "1px solid var(--sand-200)", paddingTop: 18 }}>
      <h3 style={{ fontSize: "0.82rem", color: "var(--slate-light)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function list(items: string[]) {
  if (items.length === 0) return <p style={{ color: "var(--slate-light)", fontSize: "0.92rem" }}>Not specified</p>;
  return (
    <ul style={{ display: "grid", gap: 8, paddingLeft: 18, color: "var(--slate-mid)", fontSize: "0.92rem", lineHeight: 1.6 }}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function PlannerWorkflow() {
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [question, setQuestion] = useState<PlannerQuestion | null>(null);
  const [answers, setAnswers] = useState<PlannerAnswer[]>([]);
  const [answerText, setAnswerText] = useState("");
  const [photos, setPhotos] = useState<PlannerPhoto[]>([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [briefLoading, setBriefLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [result, setResult] = useState<PlannerResult | null>(null);
  const [error, setError] = useState("");

  async function fetchQuestion(type: ProjectType, nextAnswers: PlannerAnswer[]) {
    setQuestionLoading(true);
    setError("");
    try {
      const res = await fetch("/api/planner/question", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectType: type, answers: nextAnswers }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not load the next question");
      if (body.complete) {
        setComplete(true);
        setQuestion(null);
      } else {
        setComplete(false);
        setQuestion(body.question);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the next question");
    } finally {
      setQuestionLoading(false);
    }
  }

  async function start(type: ProjectType) {
    setProjectType(type);
    setAnswers([]);
    setAnswerText("");
    setPhotos([]);
    setResult(null);
    setComplete(false);
    await fetchQuestion(type, []);
  }

  async function submitAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!projectType || !question || !answerText.trim()) return;

    const nextAnswers = [
      ...answers,
      {
        questionId: question.id,
        question: question.text,
        answer: answerText.trim(),
      },
    ];

    setAnswers(nextAnswers);
    setAnswerText("");
    await fetchQuestion(projectType, nextAnswers);
  }

  async function generateBrief() {
    if (!projectType || answers.length < 3) return;
    setBriefLoading(true);
    setError("");
    try {
      const res = await fetch("/api/planner/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectType, answers, photos }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not generate the brief");
      setResult(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate the brief");
    } finally {
      setBriefLoading(false);
    }
  }

  function onPhotoPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []).map((file) => ({
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      lastModified: file.lastModified,
    }));
    setPhotos((current) => [...current, ...picked].slice(0, 8));
    e.target.value = "";
  }

  function resetPlanner() {
    setProjectType(null);
    setQuestion(null);
    setAnswers([]);
    setAnswerText("");
    setPhotos([]);
    setQuestionLoading(false);
    setBriefLoading(false);
    setComplete(false);
    setResult(null);
    setError("");
  }

  return (
    <div style={{ display: "grid", gap: 32 }} className="page-fade-in">
      <div style={{ display: "grid", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", borderBottom: "3px double var(--sand-300)", paddingBottom: 16 }}>
          <div>
            <p style={{ color: "var(--ocean-600)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4, fontFamily: "Outfit, sans-serif" }}>
              ✦ Interactive Project Planner
            </p>
            <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", margin: 0, fontWeight: 500, color: "var(--slate-dark)" }}>Start with a project type</h2>
          </div>
          {projectType && (
            <button
              type="button"
              onClick={resetPlanner}
              style={{ border: "1px solid var(--sand-300)", background: "white", color: "var(--slate-mid)", borderRadius: 4, padding: "8px 16px", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", transition: "var(--transition-fast)" }}
              className="btn-secondary-hover"
            >
              Reset Planner
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
          {PROJECT_TYPES.map((project) => {
            const active = projectType === project.type;
            return (
              <button
                key={project.type}
                type="button"
                onClick={() => start(project.type)}
                style={{
                  textAlign: "left",
                  border: active ? "1px solid var(--ocean-600)" : "1px solid var(--sand-300)",
                  background: active ? "var(--sand-50)" : "white",
                  borderRadius: 4,
                  padding: "20px 20px 18px",
                  cursor: "pointer",
                  minHeight: 130,
                  transition: "var(--transition-fast)",
                  fontFamily: "inherit",
                }}
                className="project-type-card"
              >
                <span style={{ display: "block", fontFamily: "Lora, Georgia, serif", fontSize: "1.1rem", fontWeight: 600, color: active ? "var(--ocean-700)" : "var(--slate-dark)", marginBottom: 8 }}>
                  {active ? "✦ " : ""}{project.label}
                </span>
                <span style={{ display: "block", color: "var(--slate-light)", fontSize: "0.82rem", lineHeight: 1.55 }}>
                  {project.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {projectType && (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(280px,360px)", gap: 24, alignItems: "start" }} className="planner-grid">
          <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 4, padding: 28, boxShadow: "0 2px 12px rgba(26, 35, 50, 0.03)" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 24, borderBottom: "1px solid var(--sand-200)", paddingBottom: 16 }}>
              <span style={{ width: 36, height: 36, borderRadius: 2, background: "var(--ocean-50)", color: "var(--ocean-700)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, border: "1px solid var(--ocean-200)", fontSize: "0.88rem", fontFamily: "Lora, Georgia, serif" }}>
                ✦ {answers.length + (complete ? 1 : 0)}
              </span>
              <div>
                <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.15rem", fontWeight: 600, margin: 0, color: "var(--slate-dark)" }}>{projectType} planning questions</h3>
                <p style={{ margin: "4px 0 0", color: "var(--slate-light)", fontSize: "0.82rem", lineHeight: 1.4 }}>
                  Answer the prompts below. The brief is generated after the final question.
                </p>
              </div>
            </div>

            {questionLoading && (
              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: 4, padding: 20, color: "var(--slate-light)", fontWeight: 600, fontSize: "0.9rem" }}>
                Preparing the next question...
              </div>
            )}

            {!questionLoading && question && (
              <form onSubmit={submitAnswer} style={{ display: "grid", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "Lora, Georgia, serif", fontSize: "1.15rem", fontWeight: 500, color: "var(--slate-dark)", marginBottom: 8, lineHeight: 1.4 }}>
                    {question.text}
                  </label>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.85rem", lineHeight: 1.55, marginBottom: 14 }}>
                    {question.helper}
                  </p>
                  {question.id === "location" ? (
                    <LocationInput
                      value={answerText}
                      onChange={setAnswerText}
                      placeholder={question.placeholder}
                      required={question.required}
                    />
                  ) : (
                    <textarea
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder={question.placeholder}
                      rows={5}
                      style={{ width: "100%", resize: "vertical", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "14px 16px", fontSize: "0.92rem", fontFamily: "inherit", color: "var(--slate-dark)", outline: "none", lineHeight: 1.6, background: "var(--sand-50)/10" }}
                      className="form-textarea-editorial"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!answerText.trim()}
                  style={{ justifySelf: "start", border: "none", background: answerText.trim() ? "var(--ocean-600)" : "var(--sand-300)", color: "white", borderRadius: 4, padding: "12px 28px", fontWeight: 600, fontSize: "0.92rem", cursor: answerText.trim() ? "pointer" : "default", fontFamily: "inherit", transition: "var(--transition-fast)" }}
                  className="btn-continue-effect"
                >
                  Continue →
                </button>
              </form>
            )}

            {!questionLoading && complete && !result && (
              <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: 4, padding: 24 }}>
                <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.15rem", fontWeight: 600, marginBottom: 8, color: "var(--ocean-700)" }}>Ready to generate the project brief</h3>
                <p style={{ color: "var(--slate-mid)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 20 }}>
                  The planner will create a structured scope, budget range, timeline, location, materials list, and photo summary. No contractor connection is triggered.
                </p>
                <button
                  type="button"
                  onClick={generateBrief}
                  disabled={briefLoading}
                  style={{ border: "none", background: briefLoading ? "var(--sand-300)" : "var(--gold)", color: "white", borderRadius: 4, padding: "14px 30px", fontWeight: 700, fontSize: "0.95rem", cursor: briefLoading ? "default" : "pointer", fontFamily: "inherit", transition: "var(--transition-fast)" }}
                  className="btn-gold-hover"
                >
                  {briefLoading ? "Generating brief..." : "Generate Project Brief"}
                </button>
              </div>
            )}

            {error && (
              <p style={{ color: "#b91c1c", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: 4, padding: "12px 14px", marginTop: 16, fontSize: "0.88rem", fontFamily: "Outfit, sans-serif" }}>
                ✦ {error}
              </p>
            )}
          </div>

          <aside style={{ display: "grid", gap: 16 }}>
            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 4, padding: 20, boxShadow: "0 2px 8px rgba(26, 35, 50, 0.02)" }}>
              <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1rem", fontWeight: 600, marginBottom: 12, borderBottom: "1px solid var(--sand-100)", paddingBottom: 8 }}>Photos</h3>
              <p style={{ color: "var(--slate-light)", fontSize: "0.82rem", lineHeight: 1.55, marginBottom: 14 }}>
                Add optional project photos. This prototype stores photo metadata only.
              </p>
              <input type="file" accept="image/*" multiple onChange={onPhotoPick} style={{ fontSize: "0.82rem", width: "100%" }} />
              {photos.length > 0 && (
                <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
                  {photos.map((photo) => (
                    <div key={`${photo.name}-${photo.size}`} style={{ border: "1px solid var(--sand-200)", borderRadius: 2, padding: "8px 12px", background: "var(--sand-50)" }}>
                      <p style={{ fontSize: "0.8rem", color: "var(--slate-dark)", fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{photo.name}</p>
                      <p style={{ fontSize: "0.74rem", color: "var(--slate-light)" }}>{formatBytes(photo.size)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 4, padding: 20, boxShadow: "0 2px 8px rgba(26, 35, 50, 0.02)" }}>
              <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1rem", fontWeight: 600, marginBottom: 12, borderBottom: "1px solid var(--sand-100)", paddingBottom: 8 }}>Answers</h3>
              {answers.length === 0 ? (
                <p style={{ color: "var(--slate-light)", fontSize: "0.82rem", fontStyle: "italic" }}>Your answers will appear here as you proceed.</p>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {answers.map((answer, index) => (
                    <div key={`${answer.questionId}-${index}`} style={{ borderBottom: "1px solid var(--sand-100)", paddingBottom: 10 }}>
                      <p style={{ color: "var(--ocean-600)", fontSize: "0.72rem", fontWeight: 800, marginBottom: 3, fontFamily: "Outfit, sans-serif" }}>QUESTION {index + 1}</p>
                      <p style={{ color: "var(--slate-dark)", fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.45 }}>{answer.question}</p>
                      <p style={{ color: "var(--slate-light)", fontSize: "0.8rem", lineHeight: 1.45, marginTop: 4, fontStyle: "italic" }}>{answer.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {result && (
        <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "36px", boxShadow: "0 4px 20px rgba(26, 35, 50, 0.04)", display: "grid", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", borderBottom: "3px double var(--sand-300)", paddingBottom: 20 }}>
            <div>
              <p style={{ color: "var(--ocean-600)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                ✦ Generated Specifications Sheet
              </p>
              <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", margin: 0, fontWeight: 500 }}>Structured Project Brief</h2>
              <p style={{ color: "var(--slate-light)", fontSize: "0.82rem", marginTop: 4 }}>Document Reference: {result.id}</p>
            </div>
            <a href={result.pdfUrl} style={{ textDecoration: "none", background: "var(--ocean-600)", color: "white", borderRadius: 4, padding: "12px 24px", fontWeight: 700, fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: 6, transition: "var(--transition-fast)" }} className="btn-primary-hover">
              Download PDF Spec
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, borderBottom: "1px solid var(--sand-200)", paddingBottom: 20 }}>
            {section("Budget range", <p style={{ color: "var(--slate-dark)", fontWeight: 700, fontSize: "1rem", fontFamily: "Lora, Georgia, serif", fontStyle: "italic" }}>{result.brief.budgetRange}</p>)}
            {section("Timeline", <p style={{ color: "var(--slate-dark)", fontWeight: 700, fontSize: "1.05rem", fontFamily: "Outfit, sans-serif" }}>{result.brief.timeline}</p>)}
            {section("Location", <p style={{ color: "var(--slate-dark)", fontWeight: 700, fontSize: "1.05rem", fontFamily: "Outfit, sans-serif" }}>{result.brief.location || "Not specified"}</p>)}
            {section("Photos", <p style={{ color: "var(--slate-dark)", fontWeight: 700, fontSize: "1.05rem", fontFamily: "Outfit, sans-serif" }}>{result.brief.photos.count} photo(s)</p>)}
          </div>

          {section("Scope of Work", list(result.brief.scope))}
          {section("Materials & Palette", list(result.brief.materials))}
          {section("Photo notes & Details", list(result.brief.photos.notes))}
          {section("Assumptions & Preparations", list(result.brief.assumptions))}
          {section("Project Risks", list(result.brief.risks))}
          {section("Next Planning Steps", list(result.brief.nextSteps))}
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .planner-grid { grid-template-columns: 1fr !important; }
        }
        .project-type-card:hover {
          border-color: var(--gold) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 35, 50, 0.04);
        }
        .form-textarea-editorial:focus {
          border-color: var(--ocean-500) !important;
          background: white !important;
        }
        .btn-secondary-hover:hover {
          border-color: var(--slate-dark) !important;
          color: var(--slate-dark) !important;
        }
        .btn-gold-hover:hover {
          background: #b5821d !important;
        }
        .btn-continue-effect:hover {
          background: var(--ocean-700) !important;
        }
      `}</style>
    </div>
  );
}

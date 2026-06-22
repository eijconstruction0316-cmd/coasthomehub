"use client";

import { useState } from "react";

type ProjectType = "Bathroom" | "Kitchen" | "Flooring" | "Painting" | "Outdoor";

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
  { type: "Flooring", label: "Flooring", description: "Rooms, existing floor removal, product choice and install plan." },
  { type: "Painting", label: "Painting", description: "Interior or exterior painting, prep, colours and finish level." },
  { type: "Outdoor", label: "Outdoor", description: "Decks, patios, pergolas, paving and outdoor living areas." },
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
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "var(--ocean-500)", fontWeight: 800, fontSize: "0.78rem", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>
              Project planner
            </p>
            <h2 style={{ fontSize: "1.35rem", margin: 0 }}>Start with a project type</h2>
          </div>
          {projectType && (
            <button
              type="button"
              onClick={resetPlanner}
              style={{ border: "1px solid var(--sand-200)", background: "white", color: "var(--slate-mid)", borderRadius: 10, padding: "9px 14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            >
              Reset
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12 }}>
          {PROJECT_TYPES.map((project) => {
            const active = projectType === project.type;
            return (
              <button
                key={project.type}
                type="button"
                onClick={() => start(project.type)}
                style={{
                  textAlign: "left",
                  border: active ? "2px solid var(--ocean-500)" : "1px solid var(--sand-200)",
                  background: active ? "var(--ocean-50)" : "white",
                  borderRadius: 12,
                  padding: "16px 16px 15px",
                  cursor: "pointer",
                  minHeight: 120,
                  boxShadow: active ? "var(--shadow-md)" : "var(--shadow-sm)",
                  fontFamily: "inherit",
                }}
              >
                <span style={{ display: "block", fontWeight: 800, color: active ? "var(--ocean-600)" : "var(--slate-dark)", marginBottom: 8 }}>
                  {project.label}
                </span>
                <span style={{ display: "block", color: "var(--slate-light)", fontSize: "0.84rem", lineHeight: 1.5 }}>
                  {project.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {projectType && (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(280px,360px)", gap: 20, alignItems: "start" }} className="planner-grid">
          <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: 22, boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--ocean-50)", color: "var(--ocean-600)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                {answers.length + (complete ? 1 : 0)}
              </span>
              <div>
                <h3 style={{ fontSize: "1rem", margin: 0 }}>{projectType} planning questions</h3>
                <p style={{ margin: "2px 0 0", color: "var(--slate-light)", fontSize: "0.84rem" }}>
                  Answer the prompts. The brief is generated after the final question.
                </p>
              </div>
            </div>

            {questionLoading && (
              <div style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", borderRadius: 12, padding: 18, color: "var(--slate-light)", fontWeight: 600 }}>
                Preparing the next question...
              </div>
            )}

            {!questionLoading && question && (
              <form onSubmit={submitAnswer} style={{ display: "grid", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "1.05rem", fontWeight: 800, color: "var(--slate-dark)", marginBottom: 7 }}>
                    {question.text}
                  </label>
                  <p style={{ color: "var(--slate-light)", fontSize: "0.88rem", lineHeight: 1.55, marginBottom: 12 }}>
                    {question.helper}
                  </p>
                  <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder={question.placeholder}
                    rows={5}
                    style={{ width: "100%", resize: "vertical", border: "1.5px solid var(--sand-200)", borderRadius: 12, padding: "13px 14px", fontSize: "0.95rem", fontFamily: "inherit", color: "var(--slate-dark)", outline: "none", lineHeight: 1.55 }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!answerText.trim()}
                  style={{ justifySelf: "start", border: "none", background: answerText.trim() ? "linear-gradient(135deg,var(--ocean-500),var(--ocean-400))" : "var(--sand-300)", color: "white", borderRadius: 50, padding: "12px 22px", fontWeight: 800, cursor: answerText.trim() ? "pointer" : "default", fontFamily: "inherit" }}
                >
                  Continue
                </button>
              </form>
            )}

            {!questionLoading && complete && !result && (
              <div style={{ background: "var(--ocean-50)", border: "1px solid var(--ocean-100)", borderRadius: 14, padding: 20 }}>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>Ready to generate the project brief</h3>
                <p style={{ color: "var(--slate-light)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 16 }}>
                  The planner will create a structured scope, budget range, timeline, location, materials list, and photo summary. No contractor connection is triggered.
                </p>
                <button
                  type="button"
                  onClick={generateBrief}
                  disabled={briefLoading}
                  style={{ border: "none", background: briefLoading ? "var(--sand-300)" : "linear-gradient(135deg,var(--gold),var(--gold-light))", color: "white", borderRadius: 50, padding: "12px 24px", fontWeight: 800, cursor: briefLoading ? "default" : "pointer", fontFamily: "inherit" }}
                >
                  {briefLoading ? "Generating brief..." : "Generate Project Brief"}
                </button>
              </div>
            )}

            {error && (
              <p style={{ color: "#b91c1c", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: 10, padding: "10px 12px", marginTop: 14, fontSize: "0.88rem" }}>
                {error}
              </p>
            )}
          </div>

          <aside style={{ display: "grid", gap: 14 }}>
            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: 18, boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ fontSize: "0.98rem", marginBottom: 10 }}>Photos</h3>
              <p style={{ color: "var(--slate-light)", fontSize: "0.84rem", lineHeight: 1.55, marginBottom: 12 }}>
                Add optional project photos. This MVP stores photo metadata only.
              </p>
              <input type="file" accept="image/*" multiple onChange={onPhotoPick} />
              {photos.length > 0 && (
                <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                  {photos.map((photo) => (
                    <div key={`${photo.name}-${photo.size}`} style={{ border: "1px solid var(--sand-100)", borderRadius: 10, padding: "8px 10px" }}>
                      <p style={{ fontSize: "0.82rem", color: "var(--slate-dark)", fontWeight: 700, marginBottom: 2 }}>{photo.name}</p>
                      <p style={{ fontSize: "0.76rem", color: "var(--slate-light)" }}>{formatBytes(photo.size)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 16, padding: 18, boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ fontSize: "0.98rem", marginBottom: 10 }}>Answers</h3>
              {answers.length === 0 ? (
                <p style={{ color: "var(--slate-light)", fontSize: "0.84rem" }}>Your answers will appear here.</p>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {answers.map((answer, index) => (
                    <div key={`${answer.questionId}-${index}`} style={{ borderBottom: "1px solid var(--sand-100)", paddingBottom: 10 }}>
                      <p style={{ color: "var(--slate-light)", fontSize: "0.76rem", fontWeight: 800, marginBottom: 3 }}>Q{index + 1}</p>
                      <p style={{ color: "var(--slate-dark)", fontSize: "0.83rem", fontWeight: 700, lineHeight: 1.45 }}>{answer.question}</p>
                      <p style={{ color: "var(--slate-light)", fontSize: "0.82rem", lineHeight: 1.45, marginTop: 3 }}>{answer.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {result && (
        <div style={{ background: "white", border: "1px solid var(--sand-200)", borderRadius: 18, padding: "26px 26px 28px", boxShadow: "var(--shadow-md)", display: "grid", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "var(--ocean-500)", fontWeight: 800, fontSize: "0.78rem", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>
                Saved brief
              </p>
              <h2 style={{ fontSize: "1.45rem", margin: 0 }}>Structured project brief</h2>
              <p style={{ color: "var(--slate-light)", fontSize: "0.86rem", marginTop: 6 }}>Brief ID: {result.id}</p>
            </div>
            <a href={result.pdfUrl} style={{ textDecoration: "none", background: "linear-gradient(135deg,var(--ocean-500),var(--ocean-400))", color: "white", borderRadius: 50, padding: "12px 20px", fontWeight: 800, fontSize: "0.92rem" }}>
              Download PDF
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
            {section("Budget range", <p style={{ color: "var(--slate-mid)", fontWeight: 700 }}>{result.brief.budgetRange}</p>)}
            {section("Timeline", <p style={{ color: "var(--slate-mid)", fontWeight: 700 }}>{result.brief.timeline}</p>)}
            {section("Location", <p style={{ color: "var(--slate-mid)", fontWeight: 700 }}>{result.brief.location || "Not specified"}</p>)}
            {section("Photos", <p style={{ color: "var(--slate-mid)", fontWeight: 700 }}>{result.brief.photos.count} photo(s)</p>)}
          </div>

          {section("Scope", list(result.brief.scope))}
          {section("Materials", list(result.brief.materials))}
          {section("Photo notes", list(result.brief.photos.notes))}
          {section("Assumptions", list(result.brief.assumptions))}
          {section("Risks", list(result.brief.risks))}
          {section("Next planning steps", list(result.brief.nextSteps))}
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .planner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

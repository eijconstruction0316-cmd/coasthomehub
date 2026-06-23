"use client";

import React, { useState, useEffect, useRef } from "react";

interface VerificationLog {
  text: string;
  type: "info" | "success" | "warn" | "accent";
  timestamp: string;
}

interface VerificationResult {
  success: boolean;
  entityName: string;
  entityType: string;
  abnStatus: string;
  licenceClass: string;
  licenceStatus: string;
  insuranceDetail: string;
  logs: string[];
}

export default function LicenceVerifierConsole() {
  const [abnInput, setAbnInput] = useState("");
  const [licenceInput, setLicenceInput] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [logs, setLogs] = useState<VerificationLog[]>([]);
  const [apiLogs, setApiLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [resultData, setResultData] = useState<VerificationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Animate logs printing one by one
  useEffect(() => {
    if (status !== "verifying" || apiLogs.length === 0) return;
    if (logIndex >= apiLogs.length) {
      const finalStatus = resultData && resultData.success ? "success" : "error";
      const timer = setTimeout(() => {
        setStatus(finalStatus);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      const date = new Date();
      const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}.${(date.getMilliseconds() / 10).toFixed(0).padStart(2, "0")}`;
      const logText = apiLogs[logIndex];

      let type: VerificationLog["type"] = "info";
      if (logText.toLowerCase().includes("success") || logText.toLowerCase().includes("ready")) {
        type = "success";
      } else if (logText.toLowerCase().includes("error") || logText.toLowerCase().includes("failed")) {
        type = "warn";
      } else if (logText.toLowerCase().includes("found") || logText.toLowerCase().includes("active")) {
        type = "accent";
      }

      setLogs((prev) => [
        ...prev,
        {
          text: logText,
          type,
          timestamp: timeStr,
        },
      ]);
      setLogIndex((prev) => prev + 1);
    }, 200 + Math.random() * 200);

    return () => clearTimeout(timer);
  }, [status, logIndex, apiLogs, resultData]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!abnInput.trim() || !licenceInput.trim()) return;

    setLogs([]);
    setLogIndex(0);
    setApiLogs([]);
    setResultData(null);
    setErrorMessage("");
    setStatus("verifying");

    // Add initial log line before fetch completes
    const initialDate = new Date();
    const initialTimeStr = `${initialDate.getHours().toString().padStart(2, "0")}:${initialDate.getMinutes().toString().padStart(2, "0")}:${initialDate.getSeconds().toString().padStart(2, "0")}`;
    setLogs([
      {
        text: "Initiating secure connection to CoastHomeHub Verification Hub...",
        type: "info",
        timestamp: initialTimeStr
      }
    ]);

    try {
      const res = await fetch("/api/verify-licence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          abn: abnInput.trim(),
          licenceNumber: licenceInput.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to contact verification service.");
      }

      setResultData(data);
      setApiLogs(data.logs || ["Verification processed."]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Connection dropped. Try again.";
      setErrorMessage(msg);
      setApiLogs([
        "Connecting to ABN and QBCC registries failed...",
        `Error: ${msg}`,
        "Please check your input details and network connection."
      ]);
    }
  };

  const handleReset = () => {
    setAbnInput("");
    setLicenceInput("");
    setLogs([]);
    setApiLogs([]);
    setLogIndex(0);
    setResultData(null);
    setErrorMessage("");
    setStatus("idle");
  };

  return (
    <div
      style={{
        background: "#0a1918",
        border: "1px solid var(--sand-300)",
        borderRadius: 4,
        padding: 24,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
        color: "white",
        width: "100%",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: status === "verifying" ? "#eab308" : status === "success" ? "#22c55e" : status === "error" ? "#ef4444" : "#64748b"
          }} />
          <span style={{ fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--sand-200)", fontFamily: "Outfit, sans-serif" }}>
            QLD contractor evidence intake console
          </span>
        </div>
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", fontFamily: "Outfit, sans-serif" }}>real-time registry lookup</span>
      </div>

      {status === "idle" && (
        <form onSubmit={handleVerify} style={{ display: "grid", gap: 16 }}>
          <p style={{ fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.55, fontFamily: "Outfit, sans-serif", margin: 0 }}>
            Enter a Queensland QBCC licence number and ABN to perform a live status validation. Validates checksums, checks active registration, and reviews insurance checklists.
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="verifier-inputs">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontFamily: "Outfit, sans-serif" }}>
                ABN (Australian Business Number)
              </label>
              <input
                type="text"
                placeholder="e.g. 79 674 743 545"
                value={abnInput}
                onChange={(e) => setAbnInput(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 4,
                  padding: "10px 12px",
                  fontSize: "0.85rem",
                  color: "white",
                  outline: "none",
                  fontFamily: "Outfit, sans-serif"
                }}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontFamily: "Outfit, sans-serif" }}>
                QBCC Licence Number
              </label>
              <input
                type="text"
                placeholder="e.g. 1279144"
                value={licenceInput}
                onChange={(e) => setLicenceInput(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 4,
                  padding: "10px 12px",
                  fontSize: "0.85rem",
                  color: "white",
                  outline: "none",
                  fontFamily: "Outfit, sans-serif"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!abnInput.trim() || !licenceInput.trim()}
            style={{
              background: (abnInput.trim() && licenceInput.trim()) ? "var(--gold)" : "rgba(255,255,255,0.08)",
              border: "none",
              color: (abnInput.trim() && licenceInput.trim()) ? "white" : "rgba(255,255,255,0.3)",
              padding: "12px 24px",
              borderRadius: 4,
              fontWeight: 700,
              fontSize: "0.84rem",
              cursor: (abnInput.trim() && licenceInput.trim()) ? "pointer" : "default",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              transition: "all 0.2s ease",
              justifySelf: "end"
            }}
          >
            Run Registry Check
          </button>
          
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, fontFamily: "Outfit, sans-serif" }}>
            * Tip: Try using predefined contractor values from the directory, e.g. ABN <strong>79 674 743 545</strong> and QBCC <strong>1279144</strong>.
          </div>
        </form>
      )}

      {(status === "verifying" || status === "success" || status === "error") && (
        <div style={{ display: "grid", gap: 18 }}>
          {/* Monospace terminal console */}
          <div
            style={{
              background: "#071110",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              padding: 16,
              height: 240,
              overflowY: "auto",
              fontFamily: "Courier New, monospace",
              fontSize: "0.78rem",
              lineHeight: 1.6,
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}
          >
            {logs.map((log, index) => (
              <div key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>[{log.timestamp}]</span>
                <span style={{
                  color: log.type === "success" ? "#22c55e" : log.type === "warn" ? "#ef4444" : log.type === "accent" ? "var(--gold-light)" : "rgba(255,255,255,0.85)"
                }}>
                  {log.type === "success" ? "✔ " : log.type === "warn" ? "✘ " : log.type === "accent" ? "✦ " : "> "}
                  {log.text}
                </span>
              </div>
            ))}
            {status === "verifying" && (
              <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--gold-light)", marginTop: 4 }}>
                <span className="dot-pulse" style={{ animation: "pulse 1s infinite alternate" }}>█</span>
                <span>RETRIEVING REGISTRY DATA...</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Success summary output */}
          {status === "success" && resultData && (
            <div
              style={{
                background: "rgba(34, 197, 94, 0.05)",
                border: "1px solid #16a34a",
                borderRadius: 4,
                padding: "20px 24px",
                display: "grid",
                gap: 14,
                animation: "fade-in 0.4s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, borderBottom: "1px solid rgba(22, 163, 74, 0.15)", paddingBottom: 12 }}>
                <div>
                  <span style={{ display: "inline-block", background: "#16a34a", color: "white", padding: "2px 8px", borderRadius: 2, fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Outfit, sans-serif", marginBottom: 6 }}>
                    VERIFIED ACTIVE
                  </span>
                  <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.2rem", color: "white", margin: 0, fontWeight: 500 }}>
                    {resultData.entityName}
                  </h4>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", display: "block", fontFamily: "Outfit, sans-serif" }}>Entity Type</span>
                  <strong style={{ color: "var(--gold-light)", fontSize: "0.85rem", fontFamily: "Outfit, sans-serif" }}>{resultData.entityType}</strong>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: "0.78rem", fontFamily: "Outfit, sans-serif", color: "rgba(255,255,255,0.85)" }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)", display: "block" }}>ABN Registry Status</span>
                  <strong>{resultData.abnStatus} (Active Checksum Valid)</strong>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)", display: "block" }}>QBCC Licence Class</span>
                  <strong>{resultData.licenceClass} ({resultData.licenceStatus})</strong>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", display: "block" }}>Insurance Status</span>
                  <strong>{resultData.insuranceDetail}</strong>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 10, borderTop: "1px solid rgba(22, 163, 74, 0.15)", paddingTop: 14 }}>
                <button
                  onClick={handleReset}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.7)",
                    padding: "8px 16px",
                    borderRadius: 4,
                    fontSize: "0.76rem",
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif"
                  }}
                >
                  Verify Another
                </button>
                <div style={{ marginLeft: "auto", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 4, fontFamily: "Outfit, sans-serif" }}>
                  <span>Registry verification ref:</span>
                  <strong style={{ color: "#22c55e" }}>#CHH-VERIFIED-{abnInput.slice(-4)}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Failure summary output */}
          {status === "error" && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.05)",
                border: "1px solid #ef4444",
                borderRadius: 4,
                padding: "20px 24px",
                display: "grid",
                gap: 14,
                animation: "fade-in 0.4s ease"
              }}
            >
              <div style={{ borderBottom: "1px solid rgba(239, 68, 68, 0.15)", paddingBottom: 12 }}>
                <span style={{ display: "inline-block", background: "#ef4444", color: "white", padding: "2px 8px", borderRadius: 2, fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Outfit, sans-serif", marginBottom: 6 }}>
                  VERIFICATION FAILED
                </span>
                <h4 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.2rem", color: "white", margin: 0, fontWeight: 500 }}>
                  Could Not Verify Contractor
                </h4>
              </div>

              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5, margin: 0, fontFamily: "Outfit, sans-serif" }}>
                {errorMessage || "The details entered did not match any active Australian business or valid Queensland Building and Construction Commission licence."}
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 10, borderTop: "1px solid rgba(239, 68, 68, 0.15)", paddingTop: 14 }}>
                <button
                  onClick={handleReset}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.7)",
                    padding: "8px 16px",
                    borderRadius: 4,
                    fontSize: "0.76rem",
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif"
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
        @media (max-width: 560px) {
          .verifier-inputs {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}} />
    </div>
  );
}

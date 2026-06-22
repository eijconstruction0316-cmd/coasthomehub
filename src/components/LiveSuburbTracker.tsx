"use client";

import { useEffect, useState } from "react";

interface MatchEvent {
  suburb: string;
  type: string;
  budget: string;
  timeAgo: string;
  status: "Matched" | "Matching" | "Completed";
}

const RECENT_MATCHES: MatchEvent[] = [
  { suburb: "Burleigh Heads", type: "Bathroom Refit", budget: "$28,000", timeAgo: "12 mins ago", status: "Matched" },
  { suburb: "Noosa Heads", type: "Kitchen Wall Removal", budget: "$84,500", timeAgo: "1 hour ago", status: "Matched" },
  { suburb: "Southport", type: "Alfresco Louvre Deck", budget: "$34,000", timeAgo: "3 hours ago", status: "Matched" },
  { suburb: "Paddington", type: "Heritage Painting", budget: "$16,500", timeAgo: "5 hours ago", status: "Completed" },
  { suburb: "Robina", type: "Ensuite & Fluted Glass", budget: "$42,000", timeAgo: "8 hours ago", status: "Matched" },
  { suburb: "Sunshine Beach", type: "Composite Decking", budget: "$26,000", timeAgo: "1 day ago", status: "Completed" },
  { suburb: "Bulimba", type: "Kitchen Cabinet Refresh", budget: "$19,500", timeAgo: "1 day ago", status: "Matched" },
];

export default function LiveSuburbTracker() {
  const [activeCount, setActiveCount] = useState(142);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // Micro-animations for live stats simulation
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setActiveCount((prev) => {
        const delta = Math.random() > 0.55 ? 1 : -1;
        return Math.max(130, Math.min(prev + delta, 160));
      });
    }, 4000);

    const matchesInterval = setInterval(() => {
      setCurrentMatchIndex((prev) => (prev + 1) % RECENT_MATCHES.length);
    }, 5000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(matchesInterval);
    };
  }, []);

  const currentMatch = RECENT_MATCHES[currentMatchIndex];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #071615 0%, #0c2b28 100%)",
        border: "1px solid rgba(61, 153, 144, 0.25)",
        borderRadius: "24px",
        padding: "24px 32px",
        color: "white",
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "center" }} className="tracker-grid">
        
        {/* Left: Ticker Match Display */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", animation: "ping 1.5s infinite" }} className="ping-dot" />
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--ocean-300)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Live QLD Matching Feed
            </span>
          </div>

          <div
            style={{
              minHeight: "72px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "all 0.5s ease",
            }}
          >
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "white", lineHeight: 1.4 }}>
              📍 {currentMatch.suburb} &middot; <span style={{ color: "var(--gold-light)" }}>{currentMatch.type}</span>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                Budget: <strong>{currentMatch.budget}</strong>
              </span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                &bull; {currentMatch.timeAgo}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  background: currentMatch.status === "Completed" ? "rgba(16,185,129,0.2)" : "rgba(31,122,114,0.3)",
                  color: currentMatch.status === "Completed" ? "#10b981" : "var(--ocean-200)",
                  border: `1px solid ${currentMatch.status === "Completed" ? "rgba(16,185,129,0.3)" : "rgba(31,122,114,0.5)"}`,
                }}
              >
                {currentMatch.status}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Stats Counter Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "32px" }} className="tracker-stats-col">
          <div>
            <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "var(--gold-light)" }}>
              {activeCount}
            </div>
            <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", marginTop: "4px", lineHeight: 1.2 }}>
              Active local projects this month
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "white" }}>
              118
            </div>
            <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", marginTop: "4px", lineHeight: 1.2 }}>
              Verified QBCC-licensed trades
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          70%, 100% { transform: scale(2.5); opacity: 0; }
        }
        .ping-dot {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @media (max-width: 760px) {
          .tracker-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .tracker-stats-col { border-left: none !important; padding-left: 0 !important; border-top: 1px solid rgba(255,255,255,0.1) !important; paddingTop: 20px !important; }
        }
      `}</style>
    </div>
  );
}

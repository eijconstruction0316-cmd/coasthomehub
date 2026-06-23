"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FORUM_THREADS, ForumThread } from "@/lib/communityCms";

export default function CommunityPage() {
  const [threads, setThreads] = useState<ForumThread[]>(FORUM_THREADS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Question Submission Form State
  const [showDrawer, setShowDrawer] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<ForumThread["category"]>("DIY Projects & Styling");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThread: ForumThread = {
      id: `thread-${Date.now()}`,
      category: newCategory,
      title: newTitle,
      authorName: "Guest Homeowner",
      authorRole: "Homeowner",
      isVerifiedTrade: false,
      date: "Just now",
      content: newContent,
      upvotes: 1,
      tags: newTags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      replies: [],
    };

    setThreads((prev) => [newThread, ...prev]);
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setShowDrawer(false);
    alert("Your question has been posted to the CoastHomeHub community board! Licensed tradies will review and respond shortly.");
  };

  const filteredThreads = threads
    .filter((t) => {
      if (activeCategory === "All") return true;
      return t.category === activeCategory;
    })
    .filter((t) => {
      const query = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(query) ||
        t.content.toLowerCase().includes(query) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Editorial Header */}
      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", paddingTop: 130, paddingBottom: 64, color: "white", textAlign: "center" }}>
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.05)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>
            ✦ CoastHomeHub Forum & Q&A
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", marginBottom: 14, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Building Trust Through Expert Advice
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.08rem", maxWidth: 680, margin: "0 auto", fontFamily: "Outfit, sans-serif", lineHeight: 1.6 }}>
            Ask licensing rules, material choices, or quote discrepancies. Licensed QBCC contractors participate directly to resolve homeowners&apos; building asymmetry.
          </p>
        </div>
      </section>

      <div className="container-lg forum-grid" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        {/* Left Side: Forums Feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Controls Bar */}
          <div
            style={{
              background: "white",
              border: "1px solid var(--sand-300)",
              borderRadius: 4,
              padding: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Search Box */}
            <input
              type="text"
              placeholder="Search discussions by keywords or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                minWidth: 260,
                background: "var(--sand-50)",
                border: "1px solid var(--sand-300)",
                borderRadius: 4,
                padding: "10px 16px",
                color: "var(--slate-dark)",
                fontSize: "0.85rem",
                fontFamily: "Outfit, sans-serif",
              }}
            />

            {/* Ask Question Trigger */}
            <button
              onClick={() => setShowDrawer(true)}
              style={{
                background: "var(--gold)",
                border: "none",
                borderRadius: 4,
                padding: "11px 24px",
                color: "white",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "Outfit, sans-serif",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              ✦ Ask a Question
            </button>
          </div>

          {/* Category Tabs */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {["All", "DIY Projects & Styling", "Licences & QBCC Rules", "Renovation Pricing & Quotes"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 2,
                  border: activeCategory === cat ? "1px solid var(--ocean-700)" : "1px solid var(--sand-300)",
                  background: activeCategory === cat ? "var(--ocean-700)" : "white",
                  color: activeCategory === cat ? "white" : "var(--slate-mid)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "Outfit, sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredThreads.length === 0 ? (
              <div style={{ background: "white", border: "1px solid var(--sand-300)", padding: 48, borderRadius: 4, textAlign: "center", color: "var(--slate-light)" }}>
                No threads found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              filteredThreads.map((t) => {
                const hasTradeAnswer = t.replies.some((r) => r.isVerifiedTrade) || t.isVerifiedTrade;
                return (
                  <Link
                    key={t.id}
                    href={`/community/${t.id}`}
                    style={{
                      background: "white",
                      border: "1px solid var(--sand-300)",
                      borderRadius: 4,
                      padding: 24,
                      textDecoration: "none",
                      color: "inherit",
                      boxShadow: "var(--shadow-sm)",
                      transition: "transform 0.15s ease, border-color 0.15s ease",
                      display: "grid",
                      gridTemplateColumns: "64px 1fr",
                      gap: 20,
                    }}
                    className="thread-row-hover"
                  >
                    {/* Left: Upvotes column */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "1px solid var(--sand-200)", paddingRight: 16 }}>
                      <button
                        onClick={(e) => handleUpvote(t.id, e)}
                        style={{
                          background: "var(--sand-50)",
                          border: "1px solid var(--sand-300)",
                          borderRadius: 4,
                          padding: "6px 12px",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          color: "var(--slate-dark)",
                        }}
                      >
                        <span style={{ fontSize: "0.65rem", color: "var(--gold)" }}>▲</span>
                        {t.upvotes}
                      </button>
                    </div>

                    {/* Right: Content details */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--ocean-700)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          {t.category}
                        </span>
                        {hasTradeAnswer && (
                          <span style={{ background: "var(--gold)", color: "white", fontSize: "0.65rem", fontWeight: 800, padding: "2px 8px", borderRadius: 2, letterSpacing: "0.02em" }}>
                            ✦ Verified Trade Answer
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.18rem", fontWeight: 600, color: "var(--slate-dark)", margin: "0 0 8px", lineHeight: 1.35 }}>
                        {t.title}
                      </h3>

                      <p style={{ fontSize: "0.85rem", color: "var(--slate-mid)", lineHeight: 1.6, margin: "0 0 16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontFamily: "Outfit, sans-serif" }}>
                        {t.content}
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid var(--sand-150)", paddingTop: 12 }}>
                        {/* Tags */}
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {t.tags.map((tag) => (
                            <span key={tag} style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: "2px 8px", borderRadius: 2, fontSize: "0.7rem", color: "var(--slate-light)" }}>
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Thread Footer */}
                        <div style={{ fontSize: "0.78rem", color: "var(--slate-light)" }}>
                          Asked by <strong style={{ color: "var(--slate-mid)" }}>{t.authorName}</strong> ({t.authorRole}) &middot; {t.date} &middot;{" "}
                          <strong style={{ color: "var(--ocean-700)" }}>{t.replies.length} replies</strong>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Dispute Warning Notice */}
          <div style={{ background: "var(--ocean-700)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, color: "white" }}>
            <h3 style={{ color: "white", fontSize: "0.95rem", fontWeight: 800, marginBottom: 12, fontFamily: "Lora, Georgia, serif" }}>
              ✦ Dispute Prevention Guide
            </h3>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "0 0 16px", fontFamily: "Outfit, sans-serif" }}>
              In Queensland, construction defects cost homeowners millions annually. 80% of disputes involve waterproofing or pool safety.
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0, fontFamily: "Outfit, sans-serif" }}>
              Ask your compliance questions here and get advice from **verified builders holding active QBCC licenses**.
            </p>
          </div>

          {/* Active Tradies Online */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.95rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 10, marginBottom: 16, fontFamily: "Lora, Georgia, serif" }}>
              Vetted Trades Online
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { name: "EIJ Construction", qbcc: "QBCC-1279144 (Builder)", status: "Active" },
                { name: "Noosa Coastal Decks", qbcc: "QBCC-1530291 (Carpenter)", status: "Active" },
                { name: "Paddington Tiling", qbcc: "QBCC-1102941 (Tiling)", status: "Active" },
              ].map((trade) => (
                <div key={trade.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ fontSize: "0.85rem", color: "var(--slate-dark)", display: "block" }}>{trade.name}</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--slate-light)" }}>{trade.qbcc}</span>
                  </div>
                  <span style={{ background: "#e1f5fe", color: "#0288d1", fontSize: "0.62rem", fontWeight: 800, padding: "2px 8px", borderRadius: 2 }}>
                    {trade.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Question Drawer (Mock) */}
      {showDrawer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(12, 36, 34, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 99,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setShowDrawer(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              background: "white",
              height: "100%",
              padding: 40,
              boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.5rem", color: "var(--slate-dark)", marginBottom: 8 }}>
              Ask the Community
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--slate-light)", marginBottom: 28 }}>
              Post your building compliance, quoting, or materials questions. Vetted builders will answer.
            </p>

            <form onSubmit={handleAskQuestion} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--slate-dark)" }} htmlFor="newTitle">Question Title</label>
                <input
                  id="newTitle"
                  type="text"
                  placeholder="E.g. Can a builder demand a 30% deposit in QLD?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "10px 14px", color: "var(--slate-dark)", fontSize: "0.85rem", fontFamily: "Outfit, sans-serif" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--slate-dark)" }} htmlFor="newCategory">Category</label>
                <select
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ForumThread["category"])}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "10px 14px", color: "var(--slate-dark)", fontSize: "0.85rem", fontFamily: "Outfit, sans-serif" }}
                >
                  <option value="DIY Projects & Styling">DIY Projects & Styling</option>
                  <option value="Licences & QBCC Rules">Licences & QBCC Rules</option>
                  <option value="Renovation Pricing & Quotes">Renovation Pricing & Quotes</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--slate-dark)" }} htmlFor="newContent">Question Details</label>
                <textarea
                  id="newContent"
                  placeholder="Provide context, measurements, and current QLD licensing status if applicable..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                  rows={6}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "10px 14px", color: "var(--slate-dark)", fontSize: "0.85rem", fontFamily: "Outfit, sans-serif", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--slate-dark)" }} htmlFor="newTags">Tags (Comma-separated)</label>
                <input
                  id="newTags"
                  type="text"
                  placeholder="e.g. Deposit, QBCC, Contract"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  style={{ background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "10px 14px", color: "var(--slate-dark)", fontSize: "0.85rem", fontFamily: "Outfit, sans-serif" }}
                />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setShowDrawer(false)}
                  style={{
                    flex: 1,
                    background: "white",
                    border: "1px solid var(--sand-300)",
                    borderRadius: 4,
                    padding: "12px",
                    color: "var(--slate-mid)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: "var(--ocean-700)",
                    border: "none",
                    borderRadius: 4,
                    padding: "12px",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .thread-row-hover:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md) !important;
          border-color: var(--ocean-300) !important;
        }
        @media (max-width: 820px) {
          .forum-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}

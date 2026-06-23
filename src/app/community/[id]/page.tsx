"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { getThreadById, ForumThread, ForumReply } from "@/lib/communityCms";

type ThreadDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function ThreadDetailPage({ params }: ThreadDetailPageProps) {
  const { id } = use(params);
  const initialThread = getThreadById(id);

  const [thread, setThread] = useState<ForumThread | undefined>(initialThread);
  const [replyText, setReplyText] = useState("");
  const [upvotedReplies, setUpvotedReplies] = useState<Record<string, boolean>>({});
  const [hasUpvotedThread, setHasUpvotedThread] = useState(false);

  if (!thread) {
    return (
      <div style={{ background: "var(--off-white)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontFamily: "Lora, Georgia, serif", color: "var(--slate-dark)" }}>Thread Not Found</h2>
        <Link href="/community" style={{ color: "var(--ocean-700)", fontWeight: 700, textDecoration: "none" }}>Back to Community Hub</Link>
      </div>
    );
  }

  const handleThreadUpvote = () => {
    if (hasUpvotedThread) return;
    setThread((prev) => prev ? { ...prev, upvotes: prev.upvotes + 1 } : prev);
    setHasUpvotedThread(true);
  };

  const handleReplyUpvote = (replyId: string) => {
    if (upvotedReplies[replyId]) return;
    setThread((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        replies: prev.replies.map((r) =>
          r.id === replyId ? { ...r, upvotes: r.upvotes + 1 } : r
        ),
      };
    });
    setUpvotedReplies((prev) => ({ ...prev, [replyId]: true }));
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: ForumReply = {
      id: `rep-${Date.now()}`,
      authorName: "Guest Homeowner",
      authorRole: "Homeowner",
      isVerifiedTrade: false,
      date: "Just now",
      content: replyText,
      upvotes: 0,
    };

    setThread((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        replies: [...prev.replies, newReply],
      };
    });

    setReplyText("");
    alert("Your reply has been posted! Vetted builders will review it.");
  };

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Editorial Header */}
      <section style={{ background: "#0c2422", borderBottom: "3px double var(--sand-300)", paddingTop: 130, paddingBottom: 48, color: "white" }}>
        <div className="container-lg">
          {/* Breadcrumbs */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>&gt;</span>
            <Link href="/community" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>Community</Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>&gt;</span>
            <span style={{ color: "var(--gold-light)", fontSize: "0.8rem" }}>Thread details</span>
          </div>

          <h1 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", margin: 0, fontFamily: "Lora, Georgia, serif", fontWeight: 500, lineHeight: 1.3 }}>
            {thread.title}
          </h1>
        </div>
      </section>

      <div className="container-lg thread-detail-grid" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        {/* Left Side: Question Card & Responses */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Original Question Card */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 32, boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, borderBottom: "1px solid var(--sand-200)", paddingBottom: 16, marginBottom: 20 }}>
              <div>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--ocean-700)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {thread.category}
                </span>
                <div style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginTop: 4 }}>
                  Posted by <strong style={{ color: "var(--slate-mid)" }}>{thread.authorName}</strong> ({thread.authorRole}) &middot; {thread.date}
                </div>
              </div>

              {/* Upvote Thread Button */}
              <button
                onClick={handleThreadUpvote}
                disabled={hasUpvotedThread}
                style={{
                  background: hasUpvotedThread ? "var(--sand-100)" : "var(--sand-50)",
                  border: "1px solid var(--sand-300)",
                  borderRadius: 4,
                  padding: "8px 16px",
                  cursor: hasUpvotedThread ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "var(--slate-dark)",
                }}
              >
                <span style={{ color: hasUpvotedThread ? "var(--slate-light)" : "var(--gold)" }}>▲</span>
                <span>{thread.upvotes} {hasUpvotedThread ? "Upvoted" : "Upvote"}</span>
              </button>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--slate-mid)", lineHeight: 1.7, margin: "0 0 24px", whiteSpace: "pre-line", fontFamily: "Outfit, sans-serif" }}>
              {thread.content}
            </p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {thread.tags.map((tag) => (
                <span key={tag} style={{ background: "var(--sand-50)", border: "1px solid var(--sand-200)", padding: "4px 10px", borderRadius: 2, fontSize: "0.72rem", color: "var(--slate-light)" }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Responses Header */}
          <div>
            <h2 style={{ fontSize: "1.2rem", color: "var(--slate-dark)", fontWeight: 500, fontFamily: "Lora, Georgia, serif", borderBottom: "3px double var(--sand-300)", paddingBottom: 12, margin: 0 }}>
              ✦ {thread.replies.length} {thread.replies.length === 1 ? "Response" : "Responses"}
            </h2>
          </div>

          {/* Replies List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {thread.replies.map((reply) => (
              <div
                key={reply.id}
                style={{
                  background: "white",
                  border: "1px solid var(--sand-300)",
                  borderRadius: 4,
                  padding: 24,
                  boxShadow: "var(--shadow-sm)",
                  borderLeft: reply.isVerifiedTrade ? "4px solid var(--gold)" : "1px solid var(--sand-300)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <strong style={{ fontSize: "0.85rem", color: "var(--slate-dark)" }}>{reply.authorName}</strong>
                      <span style={{ background: reply.isVerifiedTrade ? "var(--gold-light)" : "var(--sand-100)", color: reply.isVerifiedTrade ? "#92650a" : "var(--slate-mid)", fontSize: "0.65rem", fontWeight: 800, padding: "2px 6px", borderRadius: 2 }}>
                        {reply.authorRole}
                      </span>
                      {reply.isVerifiedTrade && (
                        <span style={{ fontSize: "0.68rem", color: "var(--gold)", fontWeight: 800 }}>
                          ✦ Verified QBCC License
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--slate-light)" }}>{reply.date}</span>
                  </div>

                  {/* Upvote Reply Button */}
                  <button
                    onClick={() => handleReplyUpvote(reply.id)}
                    disabled={upvotedReplies[reply.id]}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: upvotedReplies[reply.id] ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      color: upvotedReplies[reply.id] ? "var(--slate-light)" : "var(--slate-mid)",
                    }}
                  >
                    <span style={{ color: upvotedReplies[reply.id] ? "var(--slate-light)" : "var(--gold)" }}>▲</span>
                    <span>{reply.upvotes}</span>
                  </button>
                </div>

                <p style={{ fontSize: "0.88rem", color: "var(--slate-mid)", lineHeight: 1.65, margin: 0, whiteSpace: "pre-line", fontFamily: "Outfit, sans-serif" }}>
                  {reply.content}
                </p>
              </div>
            ))}
          </div>

          {/* Post Reply Form */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 32, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--slate-dark)", marginBottom: 6, fontWeight: 500, fontFamily: "Lora, Georgia, serif" }}>
              Post a Response
            </h3>
            <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginBottom: 20 }}>
              Be constructive and respect safety standards. If you are a QBCC licensee, your dashboard verification status will display next to your response.
            </p>

            <form onSubmit={handlePostReply} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <textarea
                placeholder="Type your response here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
                rows={5}
                style={{
                  background: "var(--sand-50)",
                  border: "1px solid var(--sand-300)",
                  borderRadius: 4,
                  padding: "12px 16px",
                  color: "var(--slate-dark)",
                  fontSize: "0.88rem",
                  fontFamily: "Outfit, sans-serif",
                  resize: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  alignSelf: "flex-end",
                  background: "var(--ocean-700)",
                  border: "none",
                  borderRadius: 4,
                  padding: "12px 32px",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Submit Response
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Back Button */}
          <Link
            href="/community"
            style={{
              display: "block",
              background: "white",
              border: "1px solid var(--sand-300)",
              borderRadius: 4,
              padding: "14px",
              textAlign: "center",
              textDecoration: "none",
              color: "var(--slate-dark)",
              fontWeight: 700,
              fontSize: "0.85rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            ← Back to Discussions
          </Link>

          {/* QLD Compliance rules reminder */}
          <div style={{ background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "0.92rem", color: "var(--slate-dark)", fontWeight: 700, borderBottom: "3px double var(--sand-300)", paddingBottom: 8, marginBottom: 14, fontFamily: "Lora, Georgia, serif" }}>
              ✦ QBCC Form 16 Sign-off
            </h3>
            <p style={{ fontSize: "0.78rem", color: "var(--slate-mid)", lineHeight: 1.5, margin: "0 0 12px", fontFamily: "Outfit, sans-serif" }}>
              In Queensland, a Form 16 certifies that aspects of the build comply with the building development approval and Australian Standards (AS 3740 for waterproofing).
            </p>
            <p style={{ fontSize: "0.78rem", color: "var(--slate-mid)", lineHeight: 1.5, margin: 0, fontFamily: "Outfit, sans-serif" }}>
              Only licensed waterproofing specialists or builders with direct supervision rights can legally issue these documents.
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 820px) {
          .thread-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | EIJ Construction & CoastHomeHub",
  description:
    "Meet the team behind CoastHomeHub and EIJ Construction — Queensland's trusted waterproofing and home renovation specialists serving Gold Coast to Sunshine Coast.",
};

const team = [
  {
    name: "James Whitfield",
    role: "Founder & Director — EIJ Construction",
    emoji: "👷",
    color: "var(--ocean-400)",
    bio: "James founded EIJ Construction to raise the bar on trade craftsmanship, practical design, and clear client communication across South East Queensland. A QBCC-licensed builder with deep roots in the Gold Coast and Sunshine Coast, James focuses on connecting homeowners with vetted trades through transparent, quote-ready project briefs.",
    credentials: ["QBCC Licensed Builder", "Multi-Trade Registered", "Gold Coast · Sunshine Coast", "SEQ Specialist"],
  },
];

const values = [
  { icon: "✦", title: "Licensed & Verified", desc: "Every tradie on our platform holds a valid Queensland licence. No exceptions, ever." },
  { icon: "✦", title: "Honest & Transparent", desc: "We show transparent prices, verified pros and cons, and honest reviews — not just the glossy stuff." },
  { icon: "✦", title: "Local First", desc: "We're based in QLD, built for QLD, and we understand how Queensland's climate and lifestyle affects your home." },
  { icon: "✦", title: "Always Improving", desc: "Our platform grows every week. New design guides, new tradies, new features — based on verified homeowner feedback." },
];

const milestones = [
  { year: "2016", event: "EIJ Construction founded in Brisbane, QLD" },
  { year: "2018", event: "Expanded operations to Gold Coast corridor" },
  { year: "2021", event: "Reached 200+ completed projects milestone" },
  { year: "2023", event: "Expanded to Sunshine Coast and Noosa" },
  { year: "2025", event: "Launched CoastHomeHub — connecting QLD homeowners with licensed tradies" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "#0c2422",
          borderBottom: "3px double var(--sand-300)",
          paddingTop: 140,
          paddingBottom: 72,
        }}
      >
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 20, display: "inline-flex", background: "rgba(255,255,255,0.05)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>Our Story</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 20, maxWidth: 640, color: "white", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
            Built by a Queensland Tradie,
            <br />
            <span style={{ color: "var(--gold)" }}>for Queensland Homeowners.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 600, fontFamily: "Outfit, sans-serif" }}>
            CoastHomeHub started because we saw the same problem every week — homeowners getting ripped off by unlicensed operators, or spending hours searching for reliable tradies with no way to verify who was actually qualified.
            <br /><br />
            We built the platform we wished existed.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-lg">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="mission-grid">
            <div>
              <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(31,122,114,0.05)", borderColor: "var(--ocean-200)", color: "var(--ocean-600)", borderRadius: 2 }}>Our Mission</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", marginBottom: 20, fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>
                Making Home Improvement Simple, Safe & Affordable Across QLD
              </h2>
              <p style={{ color: "var(--slate-mid)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16, fontFamily: "Outfit, sans-serif" }}>
                Whether you&apos;re a homeowner trying to find a trustworthy plumber on the Sunshine Coast, or a licensed sparky in Gold Coast looking for more local work — CoastHomeHub connects the right people, faster.
              </p>
              <p style={{ color: "var(--slate-mid)", lineHeight: 1.75, fontSize: "0.95rem", fontFamily: "Outfit, sans-serif" }}>
                We do this by combining EIJ Construction&apos;s decade of hands-on trade experience with a modern platform designed to educate, connect, and protect Queensland homeowners.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { v: "QBCC", l: "Licensed Builder" },
                { v: "8+", l: "Years in QLD" },
                { v: "SEQ", l: "Gold–Sunshine Coast" },
                { v: "Vetted", l: "Multi-Trade Network" },
              ].map((s) => (
                <div key={s.l} className="card" style={{ padding: "24px", textAlign: "center", background: "var(--sand-50)", border: "1px solid var(--sand-300)", borderRadius: 4 }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--ocean-600)", lineHeight: 1, marginBottom: 6, fontFamily: "Lora, Georgia, serif" }}>{s.v}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--slate-light)", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.mission-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(31,122,114,0.05)", borderColor: "var(--ocean-200)", color: "var(--ocean-600)", borderRadius: 2 }}>The Team</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>Who We Are</h2>
          </div>
          {team.map((member) => (
            <div key={member.name} className="card" style={{ maxWidth: 800, margin: "0 auto", padding: "40px", display: "flex", gap: 40, alignItems: "flex-start", borderRadius: 4, border: "1px solid var(--sand-300)" }} id="team-card">
              <div style={{ width: 100, height: 100, background: "var(--ocean-700)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", flexShrink: 0, color: "white" }}>
                ✦
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.4rem", marginBottom: 4, fontFamily: "Lora, Georgia, serif", fontWeight: 600 }}>{member.name}</h3>
                <p style={{ color: "var(--ocean-600)", fontWeight: 700, fontSize: "0.9rem", marginBottom: 16, fontFamily: "Outfit, sans-serif" }}>{member.role}</p>
                <p style={{ color: "var(--slate-mid)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 20, fontFamily: "Outfit, sans-serif" }}>{member.bio}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {member.credentials.map((c) => (
                    <span key={c} style={{ background: "var(--sand-50)", color: "var(--slate-mid)", border: "1px solid var(--sand-300)", borderRadius: 2, padding: "4px 12px", fontSize: "0.78rem", fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>
                      ✦ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EIJ Builder's Corner: Philosophy & Story */}
      <section className="section" style={{ background: "#0c2422", color: "white", borderTop: "3px double var(--sand-300)", borderBottom: "3px double var(--sand-300)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(255,255,255,0.06)", borderColor: "var(--sand-300)", color: "#e8b84b", borderRadius: 2 }}>
              Company Philosophy
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontFamily: "Lora, Georgia, serif", fontWeight: 500, color: "white" }}>
              Our Story &amp; Philosophy
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", maxWidth: 520, margin: "10px auto 0", fontFamily: "Outfit, sans-serif" }}>
              A look at how we started and the principles that guide EIJ Construction and the CoastHomeHub platform.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "start" }} className="philosophy-grid">
            {/* Left: Our Story */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: 36 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 850, color: "var(--gold-light)", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, fontFamily: "Outfit, sans-serif" }}>
                ✦ How We Began
              </span>
              <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", color: "white", marginBottom: 20, fontWeight: 500 }}>
                Our Story
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontFamily: "Outfit, sans-serif" }}>
                <p style={{ fontWeight: 600, fontSize: "1rem", color: "white" }}>
                  CoastHomeHub began with a simple question: Why do so many problems occur between homeowners and trades when both ultimately want the same thing?
                </p>
                <p>
                  After more than a decade working across Australian construction sites, renovations, maintenance projects, and fit-outs, we repeatedly saw the same challenges.
                </p>
                <p>
                  Homeowners often struggled to understand quotes, costs, timelines, and technical requirements. Tradespeople struggled to communicate the value of their experience, workmanship, and professional standards.
                </p>
                <p>
                  In many cases, the problem was not bad intent. The problem was a lack of understanding.
                </p>
                <p>
                  Miscommunication created frustration. Lack of transparency created distrust. Good trades were overlooked, and good customers became disappointed.
                </p>
                <p style={{ fontStyle: "italic", borderLeft: "2px solid var(--gold-light)", paddingLeft: 12, color: "rgba(255,255,255,0.9)" }}>
                  Yet everyone was working toward the same goal: a better home and a successful project. CoastHomeHub was created to help bridge that gap.
                </p>
              </div>
            </div>

            {/* Right: Founder's Letter & Philosophy */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "2px double var(--sand-300)", borderRadius: 4, padding: 36, position: "relative" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 850, color: "var(--gold-light)", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, fontFamily: "Outfit, sans-serif" }}>
                ✦ Founder&apos;s Creed
              </span>
              <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "1.6rem", color: "white", marginBottom: 20, fontWeight: 500 }}>
                Our Philosophy
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: "0.88rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, fontFamily: "Outfit, sans-serif" }}>
                <p>We believe a home is more than a building. It is where families grow, memories are created, and futures are built.</p>
                <p>We believe good trades deserve recognition, honest customers deserve transparency, and knowledge should be shared, not hidden.</p>
                <p>We believe trust is built when homeowners, trades, suppliers, and communities grow together.</p>
                <p>Our goal is not simply to connect people. Our goal is to build a stronger home improvement industry through education, transparency, and collaboration.</p>
                <p>We hope that CoastHomeHub can help train future designers and tradespeople, support those facing hardship, and recognise professionals who consistently deliver outstanding work.</p>
                <p style={{ borderTop: "1px dashed rgba(255,255,255,0.15)", paddingTop: 16, marginTop: 10, fontWeight: 600, color: "var(--gold-light)" }}>
                  Success for us is not measured only by revenue. Success is measured by how many people we help, how much trust we build, and how many better homes we create together.
                </p>
                <div style={{ marginTop: 10 }}>
                  <cite style={{ display: "block", fontSize: "0.85rem", color: "white", fontWeight: 700, fontStyle: "normal", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    — James Whitfield
                  </cite>
                  <span style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.5)" }}>Founder of EIJ Construction &amp; CoastHomeHub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 820px) {
            .philosophy-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}} />
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-md">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(31,122,114,0.05)", borderColor: "var(--ocean-200)", color: "var(--ocean-600)", borderRadius: 2 }}>Our Journey</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>From One Van to a QLD Platform</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "var(--sand-200)", transform: "translateX(-50%)" }} className="timeline-line" />
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {milestones.map((m, i) => (
                <div key={m.year} style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" }} className="timeline-item">
                  <div style={{ maxWidth: 320, background: "white", border: "1px solid var(--sand-300)", borderRadius: 4, padding: "16px 20px", boxShadow: "var(--shadow-sm)", position: "relative" }}>
                    <div style={{ fontWeight: 800, color: "var(--ocean-600)", fontSize: "0.85rem", marginBottom: 4, fontFamily: "Outfit, sans-serif" }}>{m.year}</div>
                    <p style={{ color: "var(--slate-mid)", fontSize: "0.9rem", margin: 0, fontFamily: "Outfit, sans-serif" }}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:600px){.timeline-line{display:none!important;}.timeline-item{justify-content:flex-start!important;}}`}</style>
      </section>

      {/* Values */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container-lg">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex", background: "rgba(31,122,114,0.05)", borderColor: "var(--ocean-200)", color: "var(--ocean-600)", borderRadius: 2 }}>What We Stand For</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontFamily: "Lora, Georgia, serif", fontWeight: 500 }}>Our Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
            {values.map((v) => (
              <div key={v.title} className="card" style={{ padding: "28px", textAlign: "center", borderRadius: 4, border: "1px solid var(--sand-300)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 12, color: "var(--gold)" }}>{v.icon}</div>
                <h3 style={{ fontSize: "1.15rem", marginBottom: 10, fontFamily: "Lora, Georgia, serif", fontWeight: 600 }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--slate-mid)", lineHeight: 1.65, fontFamily: "Outfit, sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ocean-700)", borderTop: "3px double var(--sand-300)", padding: "80px 0", textAlign: "center" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12, fontFamily: "Lora, Georgia, serif", fontWeight: 550 }}>Ready to Work With Us?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 36, maxWidth: 440, margin: "0 auto 36px", fontFamily: "Outfit, sans-serif" }}>
            Whether you need a quote or want to list your trade business — we&apos;re here to help.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-gold" style={{ borderRadius: 4 }} id="about-get-quote">Get a Free Quote</Link>
            <Link href="/tradies" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: 4, fontWeight: 600, color: "white", border: "1px solid rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.95rem", fontFamily: "Outfit, sans-serif" }} id="about-list-business">
              List My Business →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

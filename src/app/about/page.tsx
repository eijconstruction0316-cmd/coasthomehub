import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | EIJ Construction & CoastHomeHub",
  description:
    "Meet the team behind CoastHomeHub and EIJ Construction — Queensland's trusted waterproofing and home renovation specialists serving Gold Coast to Sunshine Coast.",
};

const team = [
  {
    name: "Peter Kim",
    role: "Founder & Director — EIJ Construction",
    emoji: "👷",
    color: "var(--ocean-400)",
    bio: "With over 8 years of hands-on experience in waterproofing, silicone sealing, and bathroom renovation across Queensland, Peter founded EIJ Construction to deliver premium results with a personal touch. Originally from South Korea, Peter brings meticulous attention to detail and an international perspective on modern home design to every project.",
    credentials: ["QBCC Licensed Builder", "AS 3740 Waterproofing Certified", "8+ Years Experience", "500+ Projects Completed"],
  },
];

const values = [
  { icon: "✅", title: "Licensed & Verified", desc: "Every tradie on our platform holds a valid Queensland licence. No exceptions, ever." },
  { icon: "🤝", title: "Honest & Transparent", desc: "We show real prices, real pros and cons, and real reviews — not just the glossy stuff." },
  { icon: "📍", title: "Local First", desc: "We're based in QLD, built for QLD, and we understand how Queensland's climate and lifestyle affects your home." },
  { icon: "🌱", title: "Always Improving", desc: "Our platform grows every week. New design guides, new tradies, new features — based on real homeowner feedback." },
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
          background: "linear-gradient(160deg, var(--ocean-50) 0%, var(--sand-50) 100%)",
          paddingTop: 120,
          paddingBottom: 72,
        }}
      >
        <div className="container-lg">
          <div className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>Our Story</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 20, maxWidth: 640 }}>
            Built by a Queensland Tradie,
            <br />
            <span style={{ color: "var(--ocean-500)" }}>for Queensland Homeowners.</span>
          </h1>
          <p style={{ color: "var(--slate-light)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: 600 }}>
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
              <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Our Mission</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", marginBottom: 20 }}>
                Making Home Improvement Simple, Safe & Affordable Across QLD
              </h2>
              <p style={{ color: "var(--slate-light)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                Whether you&apos;re a homeowner trying to find a trustworthy plumber on the Sunshine Coast, or a licensed sparky in Gold Coast looking for more local work — CoastHomeHub connects the right people, faster.
              </p>
              <p style={{ color: "var(--slate-light)", lineHeight: 1.75, fontSize: "0.95rem" }}>
                We do this by combining EIJ Construction&apos;s decade of hands-on trade experience with a modern platform designed to educate, connect, and protect Queensland homeowners.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { v: "500+", l: "Projects Completed" },
                { v: "8+", l: "Years in QLD" },
                { v: "5.0 ★", l: "Average Rating" },
                { v: "Gold–Sunny", l: "Coast Coverage" },
              ].map((s) => (
                <div key={s.l} className="card" style={{ padding: "24px", textAlign: "center", background: "var(--ocean-50)", border: "1px solid var(--ocean-100)" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--ocean-500)", lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--slate-light)", fontWeight: 500 }}>{s.l}</div>
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
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>The Team</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}>Who We Are</h2>
          </div>
          {team.map((member) => (
            <div key={member.name} className="card" style={{ maxWidth: 800, margin: "0 auto", padding: "40px", display: "flex", gap: 40, alignItems: "flex-start" }} id="team-card">
              <div style={{ width: 100, height: 100, background: `linear-gradient(135deg, ${member.color}, var(--ocean-300))`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", flexShrink: 0 }}>
                {member.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.4rem", marginBottom: 4 }}>{member.name}</h3>
                <p style={{ color: "var(--ocean-500)", fontWeight: 600, fontSize: "0.9rem", marginBottom: 16 }}>{member.role}</p>
                <p style={{ color: "var(--slate-light)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 20 }}>{member.bio}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {member.credentials.map((c) => (
                    <span key={c} style={{ background: "var(--ocean-50)", color: "var(--ocean-700)", border: "1px solid var(--ocean-100)", borderRadius: "50px", padding: "4px 12px", fontSize: "0.78rem", fontWeight: 600 }}>
                      ✅ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: "white" }}>
        <div className="container-md">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>Our Journey</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>From One Van to a QLD Platform</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "var(--sand-200)", transform: "translateX(-50%)" }} className="timeline-line" />
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {milestones.map((m, i) => (
                <div key={m.year} style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" }} className="timeline-item">
                  <div style={{ maxWidth: 320, background: "white", border: "1px solid var(--sand-200)", borderRadius: "var(--radius-md)", padding: "16px 20px", boxShadow: "var(--shadow-sm)", position: "relative" }}>
                    <div style={{ fontWeight: 800, color: "var(--ocean-500)", fontSize: "0.85rem", marginBottom: 4 }}>{m.year}</div>
                    <p style={{ color: "var(--slate-mid)", fontSize: "0.9rem", margin: 0 }}>{m.event}</p>
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
            <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>What We Stand For</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>Our Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
            {values.map((v) => (
              <div key={v.title} className="card" style={{ padding: "28px", textAlign: "center" }}>
                <div style={{ fontSize: "2.4rem", marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--slate-light)", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--ocean-600), var(--ocean-400))", padding: "80px 0", textAlign: "center" }}>
        <div className="container-md">
          <h2 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12 }}>Ready to Work With Us?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" }}>
            Whether you need a quote or want to list your trade business — we&apos;re here to help.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-gold" id="about-get-quote">Get a Free Quote</Link>
            <Link href="/tradies" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: "50px", fontWeight: 600, color: "white", border: "2px solid rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.95rem" }} id="about-list-business">
              List My Business →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

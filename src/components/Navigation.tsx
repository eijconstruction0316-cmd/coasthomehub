"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryLinks = [
  { href: "/magazine", label: "Magazine" },
  { href: "/design", label: "AI Designer" },
  { href: "/tools", label: "2D Planners" },
  { href: "/cost-guides", label: "Cost Guides" },
  { href: "/directory", label: "Find Tradies" },
  { href: "/projects", label: "Projects" },
];

const drawerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services & Scope" },
  { href: "/about", label: "Company Corner" },
  { href: "/inspiration", label: "Inspiration Gallery" },
  { href: "/projects", label: "Completed Projects" },
  { href: "/directory", label: "Find Tradies Directory" },
  { href: "/cost-guides", label: "Renovation Cost Guides" },
  { href: "/design", label: "AI Designer Chat" },
  { href: "/tools", label: "Renovation Estimators (2D)" },
  { href: "/magazine", label: "Editorial Magazine" },
  { href: "/tradies", label: "For Contractors (B2B Portal)" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const transparentOverHero = pathname === "/" && !scrolled;
  const navLinkColor = transparentOverHero ? "rgba(255,255,255,0.78)" : "var(--slate-mid)";
  const navActiveColor = transparentOverHero ? "white" : "var(--ocean-700)";
  const navActiveBackground = transparentOverHero ? "rgba(255,255,255,0.10)" : "var(--ocean-50)";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    const timer = window.setTimeout(() => setDrawerOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          background: transparentOverHero
            ? "rgba(255,255,255,0.15)"
            : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: transparentOverHero
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(26,35,50,0.06)",
          boxShadow: transparentOverHero ? "none" : "0 4px 30px rgba(26,35,50,0.05)",
          padding: scrolled ? "10px 0" : "18px 0",
        }}
      >
        <div
          className="container-lg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/logo.svg"
              alt="CoastHomeHub"
              width={170}
              height={44}
              priority
              style={{ height: scrolled ? 36 : 42, width: "auto", transition: "all 0.3s ease" }}
            />
          </Link>

          {/* Desktop Nav Links (Simplified) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="desktop-nav"
          >
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "4px",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.92rem",
                    textDecoration: "none",
                    color: isActive ? navActiveColor : navLinkColor,
                    background: isActive ? navActiveBackground : "transparent",
                    transition: "var(--transition-fast)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Menu drawer button */}
            <button
              onClick={() => setDrawerOpen(true)}
              style={{
                padding: "8px 18px",
                marginLeft: 8,
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                background: "var(--ocean-700)",
                border: "none",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "var(--shadow-sm)",
                transition: "var(--transition-fast)",
                textTransform: "uppercase"
              }}
              className="menu-button-hover"
            >
              <span>Menu</span>
              <span style={{ fontSize: "0.78rem" }}>✦</span>
            </button>
          </div>

          {/* Hamburger (Mobile menu trigger) */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setDrawerOpen(true)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
            aria-label="Toggle menu"
            className="hamburger"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: transparentOverHero ? "white" : "var(--slate-dark)",
                  borderRadius: 0,
                  transition: "var(--transition-fast)",
                }}
              />
            ))}
          </button>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .desktop-nav { display: none !important; }
            .hamburger { display: flex !important; }
          }
          .menu-button-hover:hover {
            transform: translateY(-1px);
            background: var(--ocean-600) !important;
            box-shadow: var(--shadow-md) !important;
          }
        `}</style>
      </nav>

      {/* Slide-out Overlay Drawer */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(10, 31, 30, 0.42)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 1099,
              animation: "fadeIn 0.4s ease forwards"
            }}
          />

          {/* Sidebar Drawer container */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 480,
              background: "var(--sand-50)",
              zIndex: 1100,
              borderLeft: "1px solid var(--sand-200)",
              padding: "48px 40px",
              boxShadow: "var(--shadow-xl)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowY: "auto",
              animation: "slideIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards"
            }}
          >
            {/* Top Row: Close */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  ✦ CoastHomeHub Directory
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    color: "var(--slate-dark)",
                    padding: 8
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Drawer Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {drawerLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1.35rem",
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? "var(--ocean-600)" : "var(--slate-dark)",
                        textDecoration: "none",
                        transition: "var(--transition-fast)",
                        paddingLeft: isActive ? 12 : 0,
                        borderLeft: isActive ? "3px solid var(--gold)" : "none"
                      }}
                      className="drawer-link-hover"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row: B2B Club Promos & Quick Action */}
            <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--sand-200)" }}>
              <div style={{
                background: "var(--ocean-700)",
                border: "1px solid var(--sand-300)",
                borderRadius: 4,
                padding: 20,
                color: "white"
              }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--gold-light)", display: "block", marginBottom: 4, letterSpacing: "0.06em" }}>
                  ✦ EXCLUSIVE WHOLESALE BENEFIT
                </span>
                <h5 style={{ color: "white", fontSize: "0.9rem", fontWeight: 800, margin: "0 0 6px", fontFamily: "Lora, Georgia, serif" }}>
                  B2B Buyers Club Access
                </h5>
                <p style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.4, margin: "0 0 12px" }}>
                  Work with verified CoastHomeHub contractors to receive up to 10% off at Reece, Laminex & Beaumont.
                </p>
                <Link href="/directory" style={{
                  display: "inline-block",
                  background: "var(--gold)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "0.74rem",
                  padding: "8px 16px",
                  borderRadius: 4
                }}>
                  Find a Partner →
                </Link>
              </div>
              <p style={{ color: "var(--slate-light)", fontSize: "0.72rem", textAlign: "center", marginTop: 24, margin: "24px 0 0 0" }}>
                © 2026 CoastHomeHub. Licensed builder verified.
              </p>
            </div>
          </div>

          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            .drawer-link-hover:hover {
              color: var(--ocean-500) !important;
              transform: translateX(4px);
            }
          `}</style>
        </>
      )}
    </>
  );
}

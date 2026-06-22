"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/inspiration", label: "Inspiration" },
  { href: "/projects", label: "Projects" },
  { href: "/directory", label: "Find Tradies 🔍" },
  { href: "/design", label: "✨ AI Designer" },
  { href: "/magazine", label: "📖 Magazine" },
  { href: "/tradies", label: "For Tradies 🔧" },
  { href: "/quote", label: "Get a Quote" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(26,35,50,0.08)"
          : "1px solid rgba(255,255,255,0.2)",
        boxShadow: scrolled ? "0 4px 24px rgba(26,35,50,0.1)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
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
            width={180}
            height={50}
            priority
            style={{ height: 44, width: "auto" }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isQuote = link.href === "/quote";
            if (isQuote) {
              return (
                <Link key={link.href} href={link.href} className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
                  {link.label}
                </Link>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 16px",
                  borderRadius: "50px",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  color: isActive ? "var(--ocean-600)" : "var(--slate-mid)",
                  background: isActive ? "var(--ocean-50)" : "transparent",
                  transition: "var(--transition-fast)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Hamburger - Mobile */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
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
                background: "var(--slate-dark)",
                borderRadius: 2,
                transition: "var(--transition-fast)",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid var(--sand-200)",
            padding: "16px 24px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontWeight: 500,
                color: pathname === link.href ? "var(--ocean-500)" : "var(--slate-dark)",
                textDecoration: "none",
                borderBottom: "1px solid var(--sand-100)",
                fontSize: "1rem",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

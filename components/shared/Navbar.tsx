"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const NAV_LINKS = [
  { label: "Services", href: "/#goals" },
  { label: "Process", href: "/#how" },
  { label: "Why Us", href: "/#why" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const getStartedHref =
    pathname === "/followers-checkout"
      ? "#pricing"
      : "/followers-checkout#pricing";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close menu on route hash click */
  const closeMenu = () => setOpen(false);

  return (
    <nav
      className={scrolled ? "navbar-scrolled" : ""}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        height: "68px",
        background: "rgba(255,255,255,0.94)",
        borderBottom: "1px solid var(--line)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition: "box-shadow 0.3s ease, background 0.3s ease",
      }}
    >
      {/* ── Logo ── */}
      <Link
        href="/"
        className="navbar-logo"
        aria-label="TechInRent Home"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          cursor: "pointer",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <Image
          src="/techinrent-logo.png.png"
          alt="TechInRent"
          width={300}
          height={75}
          style={{ width: "auto", height: "58px" }}
          priority
        />
      </Link>

      {/* ── Desktop links ── */}
      <div
        className="nav-links"
        style={{ display: "flex", alignItems: "center", gap: "32px" }}
      >
        {NAV_LINKS.map((l) => (
          <Link key={l.label} href={l.href} className="nav-link">
            {l.label}
          </Link>
        ))}
        <Link href={getStartedHref} className="nav-cta">
          Get Started
        </Link>
      </div>

      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setOpen(!open)}
        className="nav-hamburger"
        aria-label="Toggle menu"
        aria-expanded={open}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--ink)",
          padding: "8px",
          borderRadius: "8px",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--off)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        {open ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      {/* ── Mobile menu ── */}
      {open && (
        <div
          className="animate-slide-down"
          style={{
            position: "absolute",
            top: "68px",
            left: 0,
            right: 0,
            background: "#fff",
            borderBottom: "1px solid var(--line)",
            boxShadow: "0 8px 24px rgba(13,31,30,0.1)",
            padding: "20px 5% 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={closeMenu}
              style={{
                textDecoration: "none",
                color: "var(--body)",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "15px",
                fontWeight: 500,
                padding: "10px 12px",
                borderRadius: "8px",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--off)";
                e.currentTarget.style.color = "var(--teal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--body)";
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={getStartedHref}
            onClick={closeMenu}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--teal)",
              color: "#fff",
              padding: "13px 22px",
              borderRadius: "9px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              marginTop: "8px",
              boxShadow: "0 4px 14px rgba(6,124,203,0.28)",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--teal-dark)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--teal)")
            }
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

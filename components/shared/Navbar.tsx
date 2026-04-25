"use client";
import { useState } from "react";
import Link from "next/link";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
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
        backdropFilter: "blur(18px)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "11px",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-syne, sans-serif)",
            fontWeight: 800,
            color: "#fff",
            fontSize: "14px",
            letterSpacing: "0.02em",
            boxShadow: "0 4px 14px rgba(14,122,110,0.3)",
            flexShrink: 0,
          }}
        >
          TR
        </div>
        <span
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontWeight: 700,
            fontSize: "17px",
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}
        >
          TechInRent
        </span>
      </Link>

      {/* Desktop links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "34px",
        }}
        className="nav-links"
      >
        {[
          { label: "Services", href: "/#goals" },
          { label: "Process", href: "/#how" },
          { label: "Why Us", href: "/#why" },
          { label: "Contact", href: "/#contact" },
        ].map((l) => (
          <Link
            key={l.label}
            href={l.href}
            style={{
              textDecoration: "none",
              color: "var(--muted)",
              fontFamily: "var(--font-outfit, sans-serif)",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            background: "var(--teal)",
            color: "#fff",
            padding: "9px 22px",
            borderRadius: "8px",
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "13.5px",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.01em",
            boxShadow: "0 4px 14px rgba(14,122,110,0.25)",
          }}
        >
          Get Started
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--ink)",
          padding: "4px",
        }}
        className="nav-hamburger"
        aria-label="Toggle menu"
      >
        {open ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "68px",
            left: 0,
            right: 0,
            background: "#fff",
            borderBottom: "1px solid var(--line)",
            padding: "16px 5%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[
            { label: "Services", href: "/#goals" },
            { label: "Process", href: "/#how" },
            { label: "Why Us", href: "/#why" },
            { label: "Contact", href: "/#contact" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: "none",
                color: "var(--body)",
                fontFamily: "var(--font-outfit, sans-serif)",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--teal)",
              color: "#fff",
              padding: "11px 22px",
              borderRadius: "8px",
              fontFamily: "var(--font-syne, sans-serif)",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Get Started
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

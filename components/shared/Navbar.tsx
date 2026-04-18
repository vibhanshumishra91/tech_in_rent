"use client";

import Link from "next/link";
import { useState } from "react";

const MenuIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const navLinks = [
  { label: "Services", href: "#goals" },
  { label: "Process", href: "#how" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-[5%] h-[68px]"
      style={{
        background: "rgba(255,255,255,0.94)",
        borderBottom: "1px solid var(--line)",
        backdropFilter: "blur(18px)",
      }}
    >
      {/* Logo */}
      <Link href="#home" className="flex items-center gap-[11px] no-underline cursor-none">
        <div
          className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-white text-[14px] font-extrabold"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
            boxShadow: "0 4px 14px rgba(14,122,110,0.3)",
            letterSpacing: "0.02em",
          }}
        >
          TR
        </div>
        <span
          className="text-[17px] font-bold"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}
        >
          TechInRent
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-[34px]" aria-label="Main navigation">
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="no-underline text-[14px] font-medium transition-colors duration-200 cursor-none"
            style={{ color: "var(--muted)", fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="flex items-center gap-[7px] text-white text-[13.5px] font-bold no-underline rounded-[8px] px-[22px] py-[9px] transition-all duration-200 cursor-none"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            background: "var(--teal)",
            boxShadow: "0 4px 14px rgba(14,122,110,0.25)",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--teal-dark)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--teal)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Get Started
        </a>
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border transition hover:bg-slate-50"
        style={{ borderColor: "var(--line)", color: "var(--ink)" }}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="absolute top-[68px] left-0 right-0 md:hidden border-t"
          style={{ background: "var(--white)", borderColor: "var(--line)" }}
        >
          <nav className="flex flex-col gap-1 px-[4%] py-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--muted)", fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full rounded-[8px] py-2.5 text-center text-sm font-bold text-white transition duration-200"
              style={{ background: "var(--teal)", fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

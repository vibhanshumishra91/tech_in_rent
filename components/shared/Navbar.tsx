"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineBars3 as Menu, HiOutlineXMark as X } from "react-icons/hi2";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#top" className="group inline-flex items-center gap-3" aria-label="Go to top">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-700 to-emerald-700 text-sm font-bold text-white shadow-sm">
            TR
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-900 sm:text-base">
            TechInRent
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Get Started
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-900 transition hover:bg-slate-50 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">Toggle navigation</span>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-menu" className="animate-fade-down border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-300 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full rounded-xl bg-slate-800 py-2.5 text-center text-sm font-medium text-white transition duration-300 hover:bg-slate-700"
            >
              Get Started
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

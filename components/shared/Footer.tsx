import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

const NAV_LINKS = [
  { label: "About Us",     href: "/about" },
  { label: "Services",     href: "/#goals" },
  { label: "How It Works", href: "/#how" },
  { label: "Blog",         href: "/blog" },
  { label: "FAQ",          href: "/faq" },
  { label: "Contact Us",   href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",    href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy",     href: "/refund-policy" },
  { label: "Service Agreement", href: "/service-agreement" },
];

const CONTACT_LINKS = [
  { label: "vibhanshu@techinrent.com", href: "mailto:vibhanshu@techinrent.com" },
  { label: "Telegram",             href: "https://t.me/techinrentadmin" },
  { label: "WhatsApp",             href: "https://wa.me/917898711748" },
  { label: "Twitter / X",          href: "https://twitter.com/techinrent" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "52px 5% 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ── Top grid ── */}
        <div
          className="footer-grid-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "40px",
            paddingBottom: "32px",
            borderBottom: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "18px", textDecoration: "none" }}>
              <Image
                src="/techinrent-logo.png.png"
                alt="TechInRent"
                width={240}
                height={60}
                style={{
                  width: "auto",
                  height: "52px",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.52)",
                lineHeight: 1.75,
                maxWidth: "320px",
                fontWeight: 400,
                margin: 0,
              }}
            >
              We help professionals and teams accelerate LinkedIn growth through
              secure outreach systems, transparent reporting, and measurable outcomes.
            </p>

            {/* Trust badge row */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "22px",
              }}
            >
              {["Policy-Safe", "Transparent", "Fast Setup"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "5px 11px",
                    borderRadius: "999px",
                    border: "1px solid rgba(6,124,203,0.25)",
                    background: "rgba(6,124,203,0.1)",
                    color: "var(--teal-light)",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  ◆ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "16px",
                margin: "0 0 16px",
              }}
            >
              Navigation
            </h4>
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 16px",
              }}
            >
              Legal
            </h4>
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 16px",
              }}
            >
              Contact
            </h4>
            {CONTACT_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="footer-link"
              >
                {l.label}
              </a>
            ))}

            {/* Direct contact details */}
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="mailto:vibhanshu@techinrent.com"
                className="footer-link"
                style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: 0 }}
              >
                <FaEnvelope size={13} style={{ flexShrink: 0, color: "var(--teal-light)" }} />
                vibhanshu@techinrent.com
              </a>
              <a
                href="tel:+917898711748"
                className="footer-link"
                style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: 0 }}
              >
                <FaPhone size={12} style={{ flexShrink: 0, color: "var(--teal-light)" }} />
                +91 78987 11748
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            paddingTop: "22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            © 2025 TechInRent. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            LinkedIn Growth — Done Right{" "}
            <span style={{ color: "var(--teal-light)" }}>◆</span>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .footer-grid-cols { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 640px) {
          .footer-grid-cols { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "24px 5% 16px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "32px",
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
        className="footer-grid-cols"
      >
        {/* Brand */}
        <div>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginBottom: "16px",
              textDecoration: "none",
            }}
          >
            <Image
              src="/techinrent-logo.png.png"
              alt="TechInRent"
              width={240}
              height={60}
              style={{
                width: "auto",
                height: "56px",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Link>
          <p
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              color: "rgba(6,124,203,0.62)",
              lineHeight: 1.7,
              maxWidth: "340px",
              fontWeight: 400,
              marginTop: "12px",
            }}
          >
            We help professionals and teams accelerate LinkedIn growth through secure outreach systems, transparent reporting, and measurable outcomes.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "12px",
            }}
          >
            Navigation
          </h4>
          {[
            { label: "Services", href: "/#goals" },
            { label: "How It Works", href: "/#how" },
            { label: "Why Us", href: "/#why" },
            { label: "Contact", href: "/#contact" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.78)",
                textDecoration: "none",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                marginBottom: "7px",
                lineHeight: 1.4,
              }}
            >
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
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "12px",
            }}
          >
            Contact
          </h4>
          {[
            { label: "hello@techinrent.com", href: "mailto:hello@techinrent.com" },
            { label: "Telegram", href: "https://t.me/techinrentadmin" },
            { label: "WhatsApp", href: "https://wa.me/917898711748" },
            { label: "Twitter / X", href: "https://twitter.com/techinrent" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.78)",
                textDecoration: "none",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                marginBottom: "7px",
                lineHeight: 1.4,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          paddingTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          © 2025 TechInRent. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          LinkedIn Growth — Done Right{" "}
          <span style={{ color: "var(--teal-light)" }}>◆</span>
        </span>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .footer-grid-cols { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </footer>
  );
}

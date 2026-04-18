export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", padding: "64px 5% 32px" }}>
      <div
        className="grid gap-[60px] pb-12"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Brand */}
        <div>
          <div
            className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-white text-[14px] font-extrabold mb-[14px]"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
            }}
          >
            TR
          </div>
          <span
            className="block text-[17px] font-bold text-white mb-[14px]"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            TechInRent
          </span>
          <p className="text-[13.5px] leading-[1.8] font-light max-w-[280px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            We help professionals and teams accelerate LinkedIn growth through secure outreach systems, transparent reporting, and measurable outcomes.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            className="text-[10px] font-bold uppercase tracking-[0.14em] mb-5"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Navigation
          </h4>
          {[
            { label: "Services", href: "#goals" },
            { label: "How It Works", href: "#how" },
            { label: "Why Us", href: "#why" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-[14px] mb-3 no-underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4
            className="text-[10px] font-bold uppercase tracking-[0.14em] mb-5"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-syne), Syne, sans-serif" }}
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
              key={l.href}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel={l.href.startsWith("mailto") ? undefined : "noreferrer"}
              className="block text-[14px] mb-3 no-underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="pt-7 flex justify-between items-center flex-wrap gap-3">
        <span className="text-[12.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2026 TechInRent. All rights reserved.
        </span>
        <span className="text-[12.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          LinkedIn Growth — Done Right{" "}
          <span style={{ color: "var(--teal-light)" }}>◆</span>
        </span>
      </div>
    </footer>
  );
}

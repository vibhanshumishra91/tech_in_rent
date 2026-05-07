"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";
import Chatbot from "@/components/shared/Chatbot";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
import {
  HiCalendarDays,
  HiChatBubbleLeftRight,
  HiCheckBadge,
  HiClipboardDocument,
  HiEnvelope,
  HiSparkles,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import {
  FaArrowTrendUp,
  FaArrowRightLong,
  FaHandshake,
  FaRocket,
  FaUsers,
  FaBullseye,
} from "react-icons/fa6";
import { RiInstagramLine, RiTelegramLine, RiTwitterXLine } from "react-icons/ri";

type PartnerLogo = {
  _id: string;
  name: string;
  logo: string;
  status: "active" | "inactive";
};

// Logo Marquee Component
function LogoMarquee() {
  const [partners, setPartners] = useState<Array<{ _id: string; name: string; logo: string }>>([]);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch("/api/admin/partners");
        const data = await response.json();

        if (response.ok && data.success) {
          const activePartners = ((data.data || []) as PartnerLogo[])
            .filter((p) => p.status === "active")
            .map(({ _id, name, logo }) => ({ _id, name, logo }));
          setPartners(activePartners);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Failed to fetch partners:", error);
        }
      }
    }

    fetchPartners();
  }, []);

  if (partners.length === 0) {
    return null;
  }

  // Need enough items to fill ~2x viewport width so the -50% loop is seamless.
  // Each item = 130px + 40px gap = 170px. For 1920px viewport: 1920/170 ≈ 12 items per half.
  // Use 16 per half to be safe on any screen, then duplicate once → 32 total, animate -50%.
  const perHalf = Math.max(16, Math.ceil(1920 / (partners.length * 170)) * partners.length);
  const half = Array(Math.ceil(perHalf / partners.length)).fill(partners).flat();
  const allItems = [...half, ...half]; // exactly two identical halves

  return (
    <section
      style={{
        padding: "24px 0 18px",
        background: "var(--off)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          marginBottom: "14px",
          padding: "0 16px",
        }}
      >
        <p
          style={{
            margin: "0",
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--teal-dark)",
          }}
        >
          Trusted By
        </p>
        <p
          style={{
            margin: "6px 0 0",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "13px",
            color: "var(--muted)",
          }}
        >
          Leading teams and organizations
        </p>
      </div>

      {/* Soft fade edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, var(--off) 0%, transparent 10%, transparent 90%, var(--off) 100%)",
          zIndex: 2,
        }}
      />

      {/* Single track: [half][half] — animates translateX(0→-50%).
          At -50% the visible content is identical to the start → seamless loop. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          width: "max-content",
          animation: "marqueeInfinite 30s linear infinite",
          willChange: "transform",
        }}
      >
        {allItems.map((partner, i) => (
          <div
            key={`${partner._id}-${i}`}
            style={{
              flex: "0 0 auto",
              width: "130px",
              height: "54px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              style={{ maxWidth: "110px", maxHeight: "44px", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeInfinite {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

const serviceCards = [
  {
    icon: <FaHandshake size={22} color="var(--teal)" aria-hidden />,
    title: "LinkedIn Account Management",
    description:
      "Managed outreach systems focused on qualified conversations and pipeline growth.",
    bullets: [
      "Done-for-you campaign setup",
      "ICP-targeted outreach strategy",
      "Weekly performance tracking",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/account-management",
  },
  {
    icon: <FaRocket size={22} color="var(--teal)" aria-hidden />,
    title: "LinkedIn Growth",
    description:
      "Scale visibility and follower growth with a safe, consistent growth framework.",
    bullets: [
      "Profile authority positioning",
      "Steady follower growth",
      "Designed for long-term brand trust",
    ],
    ctaLabel: "Buy Now",
    ctaHref: "/followers-checkout",
  },
  {
    icon: <FaArrowTrendUp size={22} color="var(--teal)" aria-hidden />,
    title: "Account Recovery Support",
    description:
      "Structured support to restore account health and reduce restriction risks.",
    bullets: [
      "Restriction diagnosis support",
      "Recovery action roadmap",
      "Preventive policy-safe best practices",
    ],
    ctaLabel: "Start Recovery",
    ctaHref: "/account-recovery",
  },
  {
    icon: <FaUsers size={22} color="var(--teal)" aria-hidden />,
    title: "Hiring Support",
    description:
      "Save time with LinkedIn-backed hiring. Find skilled candidates faster and smarter.",
    bullets: [
      "LinkedIn talent pool access",
      "Candidate shortlisting support",
      "Faster hiring pipeline",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/hiring-support",
  },
  {
    icon: <FaBullseye size={22} color="var(--teal)" aria-hidden />,
    title: "Lead Generation",
    description:
      "Get targeted B2B leads directly from LinkedIn. We connect you with decision-makers who matter.",
    bullets: [
      "ICP-targeted lead lists",
      "Decision-maker outreach",
      "Verified B2B contacts",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/lead-generation",
  },
];

const processSteps = [
  {
    title: "Audit & Positioning",
    text: "We review your profile, offer, and targeting to define a message-market fit that actually converts.",
  },
  {
    title: "Execution Setup",
    text: "Campaign structure, growth workflow, and reporting are set up around your goals and capacity.",
  },
  {
    title: "Weekly Optimization",
    text: "We refine what works, remove what does not, and keep the system healthy as results compound.",
  },
];

const whyUsCards = [
  {
    icon: <HiCheckBadge size={20} color="var(--teal)" />,
    title: "Policy-Safe Execution",
    text: "Every workflow is designed to prioritize account health, consistency, and long-term brand trust.",
  },
  {
    icon: <HiClipboardDocument size={20} color="var(--teal)" />,
    title: "Clear Reporting",
    text: "You get measurable updates on activity, conversations, and progress instead of vague promises.",
  },
  {
    icon: <HiChatBubbleLeftRight size={20} color="var(--teal)" />,
    title: "Human Strategy Support",
    text: "You are not left with a tool alone. We help translate execution into pipeline and client growth.",
  },
];

export default function Home() {
  useEffect(() => {
    // Scroll reveal
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

    // Count-up for stats
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = el.dataset.target || "";
            const suffix = target.replace(/[0-9.]/g, "");
            const num = parseFloat(target);
            if (!isNaN(num)) {
              let start = 0;
              const duration = 1400;
              const step = 16;
              const increment = num / (duration / step);
              const timer = setInterval(() => {
                start += increment;
                if (start >= num) { start = num; clearInterval(timer); }
                el.textContent = (Number.isInteger(num) ? Math.round(start) : start.toFixed(0)) + suffix;
              }, step);
            }
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".count-up").forEach((node) => countObserver.observe(node));

    return () => { revealObserver.disconnect(); countObserver.disconnect(); };
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <section
          id="home"
          style={{
            minHeight: "100vh",
            padding: "120px 5% 72px",
            background:
              "radial-gradient(ellipse at 80% 0%, rgba(6,124,203,0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 100%, rgba(8,148,240,0.06) 0%, transparent 50%), var(--white)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "980px",
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <span
              className="animate-fade-down"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "999px",
                background: "var(--off)",
                border: "1px solid var(--line)",
                color: "var(--teal-dark)",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <HiSparkles size={12} color="var(--teal)" />
              LinkedIn Growth Services
            </span>

            <h1
              className="animate-fade-down animate-delay-1"
              style={{
                marginTop: "18px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(38px, 5vw, 64px)",
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              Grow Consistently on LinkedIn
              <br />
              and Convert More Qualified Clients
            </h1>

            <p
              className="animate-fade-down animate-delay-2"
              style={{
                margin: "18px auto 0",
                maxWidth: "700px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "16px",
                lineHeight: 1.75,
                color: "var(--muted)",
                fontWeight: 400,
              }}
            >
              A simple, professional system for outreach, audience growth, and account health so
              your team gets steady opportunities every week.
            </p>

            <div
              className="animate-fade-down animate-delay-3 hero-btns"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              <Link
                href="/account-management"
                data-cursor="highlight"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  background: "var(--ink)",
                  color: "#fff",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                <FaHandshake size={14} />
                LinkedIn Account Management
              </Link>
              <Link
                href="/followers-checkout"
                data-cursor="highlight"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  background: "var(--teal)",
                  color: "#fff",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                <FaArrowTrendUp size={14} />
                LinkedIn Growth
              </Link>
              <Link
                href="/account-recovery"
                data-cursor="highlight"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  background: "var(--teal-dark)",
                  color: "#fff",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                <HiCheckBadge size={16} />
                Account Recovery Support
              </Link>
            </div>

            <div
              className="hero-stats-flex"
              style={{
                marginTop: "36px",
                display: "grid",
                gap: "14px",
              }}
            >
              {[
                { value: "500+", raw: "500", suffix: "+", label: "Clients Supported" },
                { value: "98%",  raw: "98",  suffix: "%", label: "Satisfaction Rate" },
                { value: "48h",  raw: "48",  suffix: "h", label: "Average Onboarding" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "20px 16px",
                    borderRadius: "14px",
                    border: "1px solid var(--line)",
                    background: "var(--off)",
                    boxShadow: "var(--shadow-xs)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                  }}
                >
                  <p
                    className="count-up"
                    data-target={item.raw + item.suffix}
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "30px",
                      fontWeight: 800,
                      color: "var(--teal)",
                      lineHeight: 1,
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "13px",
                      color: "var(--muted)",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logo Marquee */}
        <LogoMarquee />

        <section
          id="goals"
          className="reveal"
          style={{
            scrollMarginTop: "88px",
            padding: "96px 5% 104px",
            background: "linear-gradient(180deg, var(--off) 0%, #eef6f5 50%, var(--off) 100%)",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 48px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: "1px solid var(--teal-border)",
                  background: "var(--white)",
                  boxShadow: "0 4px 14px rgba(14,122,110,0.08)",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--teal-dark)",
                }}
              >
                <HiSparkles size={15} color="var(--teal)" aria-hidden />
                Premium Services
              </div>
              <h2
                style={{
                  margin: "22px 0 0",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "clamp(30px, 4vw, 44px)",
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                }}
              >
                LinkedIn Growth Services
              </h2>
              <p
                style={{
                  margin: "16px 0 0",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "17px",
                  lineHeight: 1.65,
                  color: "var(--muted)",
                }}
              >
                Empower your professional growth with tailored services designed for measurable outcomes.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {["Safe Execution", "Transparent Reporting", "Fast Launch"].map((item) => (
                  <span
                    key={item}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "8px 12px",
                      borderRadius: "999px",
                      border: "1px solid var(--teal-border)",
                      background: "var(--white)",
                      color: "var(--teal-dark)",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    <HiCheckBadge size={14} color="var(--teal)" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="goal-grid-3"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {serviceCards.map((service, index) => (
                <article
                  key={service.title}
                  className="card-hover svc-card-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "28px 24px",
                    borderRadius: "16px",
                    background: "#fff",
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-sm)",
                    flex: "0 1 calc(33.333% - 14px)",
                    minWidth: "280px",
                  }}
                >
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "var(--white)",
                    border: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                    color: "var(--teal)",
                  }}>
                    {service.icon}
                  </div>

                  <h3 style={{
                    margin: "0 0 8px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    color: "var(--ink)",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}>
                    {service.title}
                  </h3>

                  <p style={{
                    margin: "0 0 16px",
                    fontFamily: "var(--font-body, sans-serif)",
                    color: "var(--muted)",
                    lineHeight: 1.65,
                    fontSize: "14px",
                  }}>
                    {service.description}
                  </p>

                  <ul style={{
                    margin: "0 0 24px",
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    flex: 1,
                  }}>
                    {service.bullets.map((bullet) => (
                      <li key={bullet} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <HiCheckBadge size={15} color="var(--teal)" style={{ marginTop: "2px", flexShrink: 0 }} aria-hidden />
                        <span style={{
                          fontFamily: "var(--font-body, sans-serif)",
                          color: "var(--body)",
                          lineHeight: 1.5,
                          fontSize: "13px",
                        }}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.ctaHref}
                    className="service-cta-link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "11px 20px",
                      borderRadius: "8px",
                      background: "var(--ink)",
                      color: "#fff",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {service.ctaLabel}
                    <FaArrowRightLong size={12} aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="reveal" style={{ padding: "96px 5%", background: "var(--white)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p
              style={{
                margin: 0,
                color: "var(--teal)",
                fontFamily: "var(--font-body, sans-serif)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              Process
            </p>
            <h2
              style={{
                margin: "12px 0 0",
                maxWidth: "760px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(32px, 4vw, 52px)",
                lineHeight: 1.08,
                color: "var(--ink)",
              }}
            >
              A simple workflow designed to move from strategy to measurable execution fast.
            </h2>

            <div className="steps-grid" style={{ display: "grid", gap: "24px", marginTop: "40px" }}>
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="card-hover"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "32px",
                    borderRadius: "18px",
                    background: "#fff",
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "999px",
                      background: "var(--white)",
                      border: "1px solid var(--teal-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-heading, sans-serif)",
                      color: "var(--teal)",
                      fontWeight: 800,
                    }}
                  >
                    0{index + 1}
                  </div>
                  <h3
                    style={{
                      margin: "18px 0 0",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "22px",
                      color: "var(--ink)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      margin: "12px 0 0",
                      fontFamily: "var(--font-body, sans-serif)",
                      color: "var(--muted)",
                      lineHeight: 1.75,
                    }}
                  >
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="reveal" style={{ padding: "96px 5%", background: "var(--off)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="why-grid-2" style={{ display: "grid", gap: "28px", alignItems: "start" }}>
              <div>
                <p
                  style={{
                    margin: 0,
                    color: "var(--teal)",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "12px",
                  }}
                >
                  Why TechInRent
                </p>
                <h2
                  style={{
                    margin: "12px 0 0",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    lineHeight: 1.08,
                    color: "var(--ink)",
                  }}
                >
                  Reliable systems, cleaner communication, and execution that respects your account.
                </h2>
              </div>

              <div style={{ display: "grid", gap: "18px" }}>
                {whyUsCards.map((card) => (
                  <article
                    key={card.title}
                    className="card-hover"
                    style={{
                      padding: "24px",
                      borderRadius: "16px",
                      background: "var(--white)",
                      border: "1px solid var(--line)",
                      boxShadow: "var(--shadow-xs)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px",
                          background: "var(--teal-pale)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {card.icon}
                      </div>
                      <div>
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-heading, sans-serif)",
                            fontSize: "20px",
                            color: "var(--ink)",
                          }}
                        >
                          {card.title}
                        </h3>
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontFamily: "var(--font-body, sans-serif)",
                            color: "var(--muted)",
                            lineHeight: 1.75,
                          }}
                        >
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="reveal" style={{ padding: "72px 5%", background: "var(--white)" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ margin: 0, color: "var(--teal)", fontFamily: "var(--font-body, sans-serif)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "11px" }}>
              Contact
            </p>
            <h2 style={{ margin: "14px 0 10px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, lineHeight: 1.15, color: "var(--ink)" }}>
              Get in touch
            </h2>
            <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body, sans-serif)", fontSize: "15px", lineHeight: 1.7, color: "var(--muted)" }}>
              Reach out on any platform and we will help map the next step for your LinkedIn growth.
            </p>

            <div className="contact-links-row" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
              {[
                { href: "mailto:vibhanshu@techinrent.com", icon: <HiEnvelope size={18} />, label: "Email", sub: "vibhanshu@techinrent.com" },
                { href: "https://wa.me/917898711748", icon: <FaWhatsapp size={18} />, label: "WhatsApp", sub: "+91 78987 11748" },
                { href: "https://t.me/techinrentadmin", icon: <RiTelegramLine size={18} />, label: "Telegram", sub: "@techinrentadmin" },
                { href: "https://twitter.com/techinrent", icon: <RiTwitterXLine size={18} />, label: "Twitter", sub: "@techinrent" },
                { href: "https://instagram.com/techinrent", icon: <RiInstagramLine size={18} />, label: "Instagram", sub: "@techinrent" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    background: "var(--white)",
                    border: "1px solid var(--line)",
                    boxShadow: "0 2px 12px rgba(13,31,30,0.06)",
                    flex: "1 1 auto",
                    minWidth: "180px",
                    maxWidth: "210px",
                  }}
                >
                  <div style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "9px",
                    background: "var(--teal-pale)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--teal)",
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ textAlign: "left", overflow: "hidden" }}>
                    <div style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "11px", color: "var(--muted)", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.sub}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <Chatbot />
    </>
  );
}

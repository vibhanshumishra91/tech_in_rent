"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";
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
} from "react-icons/fa6";
import { RiInstagramLine, RiTelegramLine, RiTwitterXLine } from "react-icons/ri";

// Logo Marquee Component
function LogoMarquee() {
  const [partners, setPartners] = useState<Array<{ _id: string; name: string; logo: string }>>([]);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch("/api/admin/partners");
        const data = await response.json();

        if (response.ok && data.success) {
          const activePartners = (data.data || []).filter(
            (p: any) => p.status === "active"
          );
          setPartners(activePartners);
        }
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      }
    }

    fetchPartners();
  }, []);

  if (partners.length === 0) {
    return null;
  }

  // Multiple duplications to ensure continuous coverage
  // With only 2 logos, we need many copies to fill viewport and create seamless scroll
  const multipliedPartners = Array(10).fill(partners).flat();

  return (
    <section
      style={{
        padding: "18px 0",
        background: "var(--off)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Soft fade edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, var(--off) 0%, transparent 8%, transparent 92%, var(--off) 100%)",
          zIndex: 2,
        }}
      />

      <div
        className="marquee-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
          width: "max-content",
          animation: "marqueeScroll 40s linear infinite",
          willChange: "transform",
        }}
      >
        {multipliedPartners.map((partner, index) => (
          <div
            key={`${partner._id}-${index}`}
            className="marquee-item"
            style={{
              flex: "0 0 auto",
              width: "130px",
              height: "54px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              style={{
                maxWidth: "120px",
                maxHeight: "42px",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                filter: "grayscale(100%)",
                opacity: 0.55,
                transition: "all 0.35s ease",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-item:hover img {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.08);
        }

        .marquee-item:hover {
          background: rgba(255, 255, 255, 0.65);
        }

        @media (max-width: 768px) {
          .marquee-track {
            gap: 18px !important;
            animation-duration: 30s !important;
          }
          .marquee-item {
            width: 105px !important;
            height: 46px !important;
          }
          .marquee-item img {
            max-width: 92px !important;
            max-height: 34px !important;
          }
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
    ctaLabel: "Contact Us",
    ctaHref: "/#contact",
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

    return () => observer.disconnect();
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
              "radial-gradient(circle at 82% 8%, rgba(25,168,152,0.12), transparent 34%), var(--white)",
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
                href="/#contact"
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
              style={{
                marginTop: "34px",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
              }}
              className="hero-stats-flex"
            >
              {[
                { value: "500+", label: "Clients Supported" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "48h", label: "Average Onboarding" },
              ].map((item) => (
                <div
                  key={item.label}
                  data-cursor="highlight"
                  style={{
                    padding: "16px 14px",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    background: "var(--off)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "28px",
                      fontWeight: 800,
                      color: "var(--teal)",
                      lineHeight: 1,
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    style={{
                      margin: "7px 0 0",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "13px",
                      color: "var(--muted)",
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
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                alignItems: "stretch",
              }}
            >
              {serviceCards.map((service, index) => (
                <article
                  key={service.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "28px 24px",
                    borderRadius: "16px",
                    background: "var(--off)",
                    border: "1px solid var(--line)",
                    boxShadow: "0 4px 12px rgba(13,31,30,0.06)",
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

            <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "38px" }}>
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  data-cursor="highlight"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "28px",
                    borderRadius: "20px",
                    background: "var(--off)",
                    border: "1px solid var(--line)",
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
            <div className="why-grid-2" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "28px", alignItems: "start" }}>
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
                    className="why-card"
                    data-cursor="highlight"
                    style={{
                      padding: "24px",
                      borderRadius: "18px",
                      background: "var(--white)",
                      border: "1px solid var(--line)",
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

            <div className="contact-links-row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", maxWidth: "1100px", margin: "0 auto" }}>
              {[
                { href: "mailto:hello@techinrent.com", icon: <HiEnvelope size={18} />, label: "Email", sub: "hello@techinrent.com" },
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
    </>
  );
}

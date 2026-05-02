"use client";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { FaArrowRightLong, FaCircleCheck, FaRocket, FaShieldHalved, FaUsers, FaBullseye } from "react-icons/fa6";

const IconHandshake = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const services = [
  {
    icon: IconHandshake,
    title: "LinkedIn Account Management",
    description:
      "Managed outbound campaigns designed to generate qualified conversations and predictable pipeline.",
    points: ["ICP research and targeting", "Campaign execution and optimization", "Weekly reporting and insights"],
    ctaLabel: "Get Started",
    ctaHref: "/#contact",
  },
  {
    icon: FaShieldHalved,
    title: "Account Recovery Support",
    description:
      "Guided support for account issues, restrictions, and recovery planning with policy-safe best practices.",
    points: ["Issue diagnosis support", "Recovery action sequence", "Risk prevention guidance"],
    ctaLabel: "Contact Us",
    ctaHref: "/#contact",
  },
  {
    icon: FaRocket,
    title: "LinkedIn Growth",
    description:
      "Build profile authority with consistent growth systems focused on visibility and trust over time.",
    points: ["Profile positioning", "Growth roadmap", "Audience quality focus"],
    ctaLabel: "Buy Now",
    ctaHref: "/followers-checkout",
  },
  {
    icon: FaUsers,
    title: "Hiring Support",
    description:
      "Save time with LinkedIn-backed hiring. Find skilled candidates faster and smarter.",
    points: ["LinkedIn talent pool access", "Candidate shortlisting support", "Faster hiring pipeline"],
    ctaLabel: "Get Started",
    ctaHref: "/#contact",
  },
  {
    icon: FaBullseye,
    title: "Lead Generation",
    description:
      "Get targeted B2B leads directly from LinkedIn. We connect you with decision-makers who matter.",
    points: ["ICP-targeted lead lists", "Decision-maker outreach", "Verified B2B contacts"],
    ctaLabel: "Get Started",
    ctaHref: "/#contact",
  },
];

export default function LinkedInServicesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 12% 0%, rgba(6,124,203,0.07), transparent 34%), radial-gradient(ellipse at 88% 22%, rgba(8,148,240,0.06), transparent 35%), var(--off)",
        paddingTop: "68px",
      }}
    >
      <Navbar />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "56px 5% 80px",
        }}
      >
        {/* Hero banner */}
        <section
          style={{
            borderRadius: "20px",
            border: "1px solid var(--teal-border)",
            background: "linear-gradient(135deg, var(--teal-pale) 0%, #fff 100%)",
            padding: "56px 48px",
            textAlign: "center",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            LinkedIn Growth &amp; Management Solutions
          </h1>
          <p
            style={{
              margin: "18px auto 0",
              maxWidth: "680px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--muted)",
            }}
          >
            Choose the exact service you need and move into a focused execution plan with clear goals and measurable progress.
          </p>
        </section>

        {/* Service cards — responsive grid */}
        <section className="svc-cards-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                style={{
                  borderRadius: "18px",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  padding: "36px",
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  e.currentTarget.style.borderColor = "var(--teal-border)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  e.currentTarget.style.borderColor = "var(--line)";
                }}
              >
                {/* Icon */}
                <span
                  style={{
                    display: "inline-flex",
                    width: "48px",
                    height: "48px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    background: "var(--teal-pale)",
                    color: "var(--teal)",
                    border: "1px solid var(--teal-border)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </span>

                {/* Title */}
                <h2
                  style={{
                    margin: "16px 0 10px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 800,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p
                  style={{
                    margin: "0 0 20px",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--muted)",
                  }}
                >
                  {service.description}
                </p>

                {/* Bullet list */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: "20px",
                    margin: "0 0 24px",
                    borderRadius: "14px",
                    border: "1px solid var(--line)",
                    background: "var(--off)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    flexGrow: 1,
                  }}
                >
                  {service.points.map((point) => (
                    <li
                      key={point}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontFamily: "var(--font-body, sans-serif)",
                        fontSize: "14px",
                        color: "var(--body)",
                        lineHeight: 1.5,
                      }}
                    >
                      <FaCircleCheck
                        size={15}
                        color="var(--teal)"
                        style={{ marginTop: "2px", flexShrink: 0 }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* CTA — pinned to bottom */}
                <a
                  href={service.ctaHref}
                  className="btn-primary"
                  style={{ fontSize: "13px", marginTop: "auto" }}
                >
                  {service.ctaLabel}
                  <FaArrowRightLong size={13} />
                </a>
              </article>
            );
          })}
        </section>
      </main>

      <Footer />

      <style>{`
        .svc-cards-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) and (min-width: 768px) {
          .svc-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .svc-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

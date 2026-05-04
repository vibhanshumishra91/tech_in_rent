import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";
import { FaArrowRightLong, FaBriefcase, FaHandshake, FaRocket, FaUsers } from "react-icons/fa6";

const audiences = ["Agencies", "Startups", "Coaches", "Service Providers"];

const steps = [
  "You share target profile and offer details",
  "We run acquisition and qualify opportunities",
  "You close deals and pay only on results",
];

export default function SalesPartnershipPage() {
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
            background: "linear-gradient(135deg, var(--teal-pale) 0%, #fff 60%)",
            padding: "56px 48px",
            textAlign: "center",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid var(--teal-border)",
              background: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--teal-dark)",
              fontFamily: "var(--font-body, sans-serif)",
              marginBottom: "20px",
            }}
          >
            <FaHandshake size={12} />
            Performance-Based Client Acquisition
          </span>
          <h1
            style={{
              margin: "0 0 18px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            We Bring You Clients, You Pay on Results
          </h1>
          <p
            style={{
              margin: "0 auto 28px",
              maxWidth: "640px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--muted)",
            }}
          >
            No upfront retainers. We partner with your team to generate qualified demand and you pay commission on successful outcomes.
          </p>
          <Link href="/#contact" className="btn-primary">
            Apply Now
            <FaArrowRightLong size={14} />
          </Link>
        </section>

        {/* Info cards */}
        <section
          style={{
            display: "grid",
            gap: "20px",
            marginBottom: "20px",
          }}
          className="partner-grid"
        >
          {/* Who is this for */}
          <article
            style={{
              borderRadius: "18px",
              border: "1px solid var(--line)",
              background: "#fff",
              padding: "32px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h2
              style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              Who Is This For?
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {audiences.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px",
                    color: "var(--body)",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "var(--teal-pale)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "var(--teal)",
                    }}
                  >
                    <FaUsers size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* How it works */}
          <article
            style={{
              borderRadius: "18px",
              border: "1px solid var(--line)",
              background: "#fff",
              padding: "32px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h2
              style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              How Partnership Works
            </h2>
            <div
              style={{ display: "grid", gap: "14px" }}
              className="steps-sm-grid"
            >
              {steps.map((step, index) => (
                <div
                  key={step}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    background: "var(--off)",
                    padding: "18px 20px",
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      width: "28px",
                      height: "28px",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "var(--teal)",
                      color: "#fff",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "13px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      color: "var(--body)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Pricing model */}
        <section
          style={{
            borderRadius: "18px",
            border: "1px solid var(--line)",
            background: "#fff",
            padding: "36px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--ink)",
            }}
          >
            Pricing Model
          </h2>
          <p
            style={{
              margin: "0 0 24px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "15px",
              color: "var(--muted)",
              lineHeight: 1.65,
            }}
          >
            No upfront cost. Only performance-based commission on successful client conversions.
          </p>
          <div style={{ display: "grid", gap: "14px" }} className="pricing-2-grid">
            {[
              { icon: <FaBriefcase size={16} />, label: "Zero Upfront Retainer" },
              { icon: <FaRocket size={16} />,    label: "Commission On Results" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  borderRadius: "12px",
                  border: "1px solid var(--teal-border)",
                  background: "var(--teal-pale)",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "var(--teal-dark)",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
          <Link
            href="/#contact"
            className="btn-secondary"
            style={{ marginTop: "28px", display: "inline-flex" }}
          >
            Apply For Partnership
            <FaArrowRightLong size={14} />
          </Link>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (min-width: 900px) {
          .partner-grid    { grid-template-columns: 1fr 2fr !important; }
          .steps-sm-grid   { grid-template-columns: 1fr 1fr 1fr !important; }
          .pricing-2-grid  { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 899px) {
          .partner-grid    { grid-template-columns: 1fr !important; }
          .steps-sm-grid   { grid-template-columns: 1fr !important; }
          .pricing-2-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

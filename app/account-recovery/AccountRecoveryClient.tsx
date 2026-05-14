"use client";

import { useState, useSyncExternalStore } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { FaShieldHalved, FaMapLocationDot, FaCircleCheck, FaBan, FaTriangleExclamation, FaIdCard, FaUsers, FaFileCircleExclamation, FaKey, FaEnvelope, FaClock, FaChartLine, FaPhone, FaComments, FaMagnifyingGlass, FaArrowRight } from "react-icons/fa6";
import { PopupButton } from "react-calendly";

export default function AccountRecoveryClient() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/salil9tiwari2002/30min";
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedinUrl: "",
    issueType: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/recovery-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      setSuccessMessage("✅ Request submitted! We will contact you within 48 hours.");
      setFormData({
        name: "",
        email: "",
        linkedinUrl: "",
        issueType: "",
        description: "",
      });
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToProcess = () => {
    document.getElementById("recovery-process")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* SECTION 1 - HERO */}
      <section style={{ background: "linear-gradient(180deg, var(--teal-pale) 0%, #f8fafc 100%)", padding: "80px 5%", paddingTop: "calc(68px + 80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "#EBF5FF", color: "#067CCB", padding: "8px 20px", borderRadius: "24px", fontSize: "14px", fontWeight: 600, marginBottom: "24px", border: "1px solid #067CCB20" }}>
            LinkedIn Recovery Support
          </div>

          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "#0f172a", marginBottom: "16px", lineHeight: 1.2 }}>
            Restore Your LinkedIn<br />
            <span style={{ color: "#067CCB" }}>Account Today</span>
          </h1>

          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#64748b", marginBottom: "40px", maxWidth: "700px", margin: "0 auto 40px" }}>
            Expert diagnosis, personalized recovery roadmap, and prevention strategies to get your LinkedIn account back on track.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
            {mounted ? (
              <PopupButton
                url={calendlyUrl}
                rootElement={document.body}
                text="Book Free Consultation"
                styles={{
                  background: "#067CCB",
                  color: "#fff",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "transform 0.2s",
                  boxShadow: "0 4px 14px rgba(6,124,203,0.25)",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ) : (
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: "#067CCB", color: "#fff", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "inline-block", transition: "transform 0.2s", boxShadow: "0 4px 14px rgba(6,124,203,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Book Free Consultation
              </a>
            )}
            <button
              onClick={scrollToProcess}
              style={{ background: "transparent", color: "#067CCB", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: 600, border: "2px solid #067CCB", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#067CCB";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#067CCB";
              }}
            >
              View Recovery Process
            </button>
          </div>

          <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap", fontSize: "14px", color: "#64748b" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaCircleCheck size={16} color="#10b981" />
              <span>Free Initial Diagnosis</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaCircleCheck size={16} color="#10b981" />
              <span>48hr Response Time</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaCircleCheck size={16} color="#10b981" />
              <span>95% Recovery Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - STATS BAR */}
      <section style={{ background: "#fff", padding: "60px 16px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#067CCB", marginBottom: "8px" }}>500+</div>
            <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>Accounts Recovered</div>
          </div>
          <div>
            <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#067CCB", marginBottom: "8px" }}>95%</div>
            <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>Success Rate</div>
          </div>
          <div>
            <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#067CCB", marginBottom: "8px" }}>48h</div>
            <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>Avg Response Time</div>
          </div>
          <div>
            <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#067CCB", marginBottom: "8px" }}>24/7</div>
            <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>Support Available</div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - WHAT WE HELP WITH */}
      <section style={{ background: "#f8fafc", padding: "80px 16px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
              What We Help With
            </h2>
            <p style={{ fontSize: "18px", color: "#64748b" }}>
              Comprehensive recovery support for all LinkedIn account issues
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {[
              {
                icon: <FaShieldHalved size={32} color="#067CCB" />,
                title: "Restriction Diagnosis",
                description: "We perform a comprehensive analysis of your account to identify exactly why it was restricted and what actions triggered the limitation."
              },
              {
                icon: <FaMapLocationDot size={32} color="#067CCB" />,
                title: "Recovery Roadmap",
                description: "Receive a detailed step-by-step action plan specifically designed for your account situation to restore full LinkedIn functionality."
              },
              {
                icon: <FaCircleCheck size={32} color="#067CCB" />,
                title: "Prevention Strategy",
                description: "Learn policy-safe practices and implement safeguards to ensure your account remains healthy and restriction-free long-term."
              }
            ].map((item, index) => (
              <div
                key={index}
                style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "32px", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ width: "56px", height: "56px", background: "#EBF5FF", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - COMMON ISSUES */}
      <section style={{ background: "#0f172a", padding: "80px 16px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>
              Common Issues We Solve
            </h2>
            <p style={{ fontSize: "18px", color: "#94a3b8" }}>
              If you&apos;re facing any of these, we can help
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { icon: <FaBan size={24} />, title: "Account Restricted", description: "Your account has been limited or suspended" },
              { icon: <FaTriangleExclamation size={24} />, title: "Unusual Activity Warning", description: "LinkedIn detected suspicious behavior" },
              { icon: <FaIdCard size={24} />, title: "Identity Verification Required", description: "Need to verify your identity to regain access" },
              { icon: <FaUsers size={24} />, title: "Connection Limit Reached", description: "Hit weekly connection request limits" },
              { icon: <FaFileCircleExclamation size={24} />, title: "Content Policy Violation", description: "Posts or messages flagged for policy issues" },
              { icon: <FaKey size={24} />, title: "Login & Access Issues", description: "Unable to access your account" }
            ].map((issue, index) => (
              <div
                key={index}
                style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "24px", transition: "transform 0.2s, border-color 0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#067CCB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#334155";
                }}
              >
                <div style={{ color: "#067CCB", marginBottom: "16px" }}>
                  {issue.icon}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  {issue.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.5 }}>
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - RECOVERY PROCESS */}
      <section id="recovery-process" style={{ background: "#fff", padding: "80px 16px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
              Our Recovery Process
            </h2>
            <p style={{ fontSize: "18px", color: "#64748b" }}>
              Consultation-led 4-step process to restore your account
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
            {[
              { number: "1", title: "Demo Call", description: "Book a free consultation and discuss your account issue with a Techinrent professional" },
              { number: "2", title: "Submit Request", description: "After the call, share your account details and issue summary through our recovery form" },
              { number: "3", title: "Diagnosis & Action Plan", description: "Our specialists review your case and provide a personalized recovery roadmap" },
              { number: "4", title: "Recovery Execution", description: "Follow the recommended steps with our guidance to restore LinkedIn account access" }
            ].map((step, index) => (
              <div key={index} style={{ position: "relative", textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", background: "#067CCB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "24px", fontWeight: 700, color: "#fff" }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TECHINRENT HELPS */}
      <section style={{ background: "#fff", padding: "80px 5%" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(6,124,203,0.2)",
              background: "#E6F4FB",
              color: "#045A94",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}>
              Our Process
            </span>
            <h2 style={{
              margin: "0",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}>
              How We Get Your LinkedIn Account Back
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr",
            alignItems: "start",
            gap: "0",
          }} className="recovery-steps-grid">

            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #067CCB 0%, #0894F0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 6px 20px rgba(6,124,203,0.28)",
              }}>
                <FaComments size={26} color="#fff" />
              </div>
              <h3 style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "17px",
                fontWeight: 700,
                color: "#0f172a",
              }}>
                Demo With Expert
              </h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "#64748b",
                lineHeight: 1.6,
              }}>
                We run a consultation call first, understand your case, and guide you on request submission
              </p>
            </div>

            <div className="recovery-arrow" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              marginTop: "22px",
              color: "#067CCB",
              opacity: 0.5,
            }}>
              <FaArrowRight size={18} />
            </div>

            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #067CCB 0%, #0894F0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 6px 20px rgba(6,124,203,0.28)",
              }}>
                <FaMagnifyingGlass size={24} color="#fff" />
              </div>
              <h3 style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "17px",
                fontWeight: 700,
                color: "#0f172a",
              }}>
                We Analyze
              </h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "#64748b",
                lineHeight: 1.6,
              }}>
                Our experts review your account status and identify the recovery path
              </p>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              marginTop: "22px",
              color: "#067CCB",
              opacity: 0.5,
            }}>
              <FaArrowRight size={18} />
            </div>

            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #067CCB 0%, #0894F0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 6px 20px rgba(6,124,203,0.28)",
              }}>
                <FaCircleCheck size={26} color="#fff" />
              </div>
              <h3 style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "17px",
                fontWeight: 700,
                color: "#0f172a",
              }}>
                Account Restored
              </h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "#64748b",
                lineHeight: 1.6,
              }}>
                We guide you to full unrestricted access with preventive next steps
              </p>
            </div>
          </div>

          <style>{`
            @media (max-width: 640px) {
              .recovery-steps-grid {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
              .recovery-steps-grid > [style*="FaArrowRight"],
              .recovery-arrow { display: none !important; }
            }
          `}</style>
        </div>
      </section>

      {/* CONTACT INFO BAR */}
      <section style={{ background: "#f8fafc", padding: "32px 5%" }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <p style={{
            margin: 0,
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "15px",
            fontWeight: 700,
            color: "#0f172a",
            flexShrink: 0,
          }}>
            Reach us directly:
          </p>

          <a
            href="mailto:vibhanshu@techinrent.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "10px 20px",
              borderRadius: "999px",
              border: "1.5px solid rgba(6,124,203,0.25)",
              background: "#fff",
              color: "#067CCB",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(6,124,203,0.08)",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E6F4FB";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FaEnvelope size={14} />
            vibhanshu@techinrent.com
          </a>

          <a
            href="tel:+917898711748"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "10px 20px",
              borderRadius: "999px",
              border: "1.5px solid rgba(6,124,203,0.25)",
              background: "#fff",
              color: "#067CCB",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(6,124,203,0.08)",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E6F4FB";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FaPhone size={13} />
            +91 78987 11748
          </a>
        </div>
      </section>

      {/* SECTION 6 - CONTACT FORM */}
      <section style={{ background: "#f8fafc", padding: "80px 16px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px" }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
              Start Your Recovery Today
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", marginBottom: "32px", lineHeight: 1.6 }}>
              Fill out the form and our recovery specialists will contact you within 48 hours
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "start", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", background: "#EBF5FF", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FaEnvelope size={20} color="#067CCB" />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}>Email Support</div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>support@techinrent.com</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "start", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", background: "#EBF5FF", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FaClock size={20} color="#067CCB" />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}>Response Time</div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>Within 48 hours</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "start", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", background: "#EBF5FF", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FaChartLine size={20} color="#067CCB" />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}>Success Rate</div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>95% recovery rate</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginBottom: "24px" }}>
              Recovery Request Form
            </h3>

            {successMessage && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", color: "#166534", fontSize: "14px" }}>
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", color: "#dc2626", fontSize: "14px" }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "8px" }}>
                  Full Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", transition: "border-color 0.2s" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#067CCB"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "8px" }}>
                  Email Address <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", transition: "border-color 0.2s" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#067CCB"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "8px" }}>
                  LinkedIn Profile URL <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", transition: "border-color 0.2s" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#067CCB"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "8px" }}>
                  Issue Type <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <select
                  required
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", transition: "border-color 0.2s", background: "#fff" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#067CCB"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                >
                  <option value="">Select an issue type</option>
                  <option value="Account Restricted">Account Restricted</option>
                  <option value="Unusual Activity Warning">Unusual Activity Warning</option>
                  <option value="Identity Verification">Identity Verification</option>
                  <option value="Connection Limit">Connection Limit</option>
                  <option value="Content Policy Violation">Content Policy Violation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "8px" }}>
                  Describe Your Issue <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please provide details about your account issue..."
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", transition: "border-color 0.2s", resize: "vertical", fontFamily: "inherit" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#067CCB"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%", background: isSubmitting ? "#94a3b8" : "#067CCB", color: "#fff", padding: "14px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.currentTarget.style.background = "#0563a8";
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) e.currentTarget.style.background = "#067CCB";
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Recovery Request"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 7 - FAQ */}
      <section style={{ background: "#fff", padding: "80px 16px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                question: "How long does account recovery take?",
                answer: "Recovery time varies by issue severity. Most accounts are recovered within 3-7 days after implementing our action plan."
              },
              {
                question: "Is your recovery process safe for my account?",
                answer: "Yes, all our methods follow LinkedIn's official guidelines. We never use automation or prohibited techniques."
              },
              {
                question: "What if my account cannot be recovered?",
                answer: "In rare cases where recovery isn't possible, we provide a full diagnosis report and recommend alternative solutions."
              },
              {
                question: "Do you offer a money-back guarantee?",
                answer: "We offer a free initial consultation. Our paid services come with a satisfaction guarantee - if we can't help, you don't pay."
              },
              {
                question: "How do I get started?",
                answer: "Start by booking a free consultation demo. After the call, submit your recovery request and we continue with diagnosis and action planning."
              }
            ].map((faq, index) => (
              <div
                key={index}
                style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{ width: "100%", padding: "20px 24px", background: "transparent", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>
                    {faq.question}
                  </span>
                  <span style={{ fontSize: "20px", color: "#067CCB", transition: "transform 0.2s", transform: openFaq === index ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div style={{ padding: "0 24px 20px", fontSize: "15px", color: "#64748b", lineHeight: 1.6 }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

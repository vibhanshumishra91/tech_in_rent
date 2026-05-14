"use client";

import { useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { HiCheckCircle, HiUsers } from "react-icons/hi2";

export default function HiringSupportClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    jobTitle: "",
    skills: "",
    experienceLevel: "",
    numberOfPositions: "",
    budget: "",
    timeline: "",
    description: "",
    linkedinProfile: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/hiring-support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Your hiring request has been submitted successfully! Our team will contact you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          jobTitle: "",
          skills: "",
          experienceLevel: "",
          numberOfPositions: "",
          budget: "",
          timeline: "",
          description: "",
          linkedinProfile: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to submit request. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          paddingTop: "68px",
          background: "linear-gradient(135deg, #f8f9fb 0%, #eef2f7 100%)",
        }}
      >
        {/* HERO SECTION */}
        <section
          style={{
            padding: "80px 5% 60px",
            position: "relative",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "#fff",
                border: "1px solid #e5e7eb",
                marginBottom: "24px",
                fontSize: "13px",
                fontFamily: "var(--font-body, sans-serif)",
                fontWeight: 600,
                color: "#067CCB",
              }}
            >
              <HiUsers size={14} />
              LinkedIn Hiring Support
            </div>

            <h1
              style={{
                margin: "0 0 24px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                maxWidth: "900px",
              }}
            >
              Find Top Talent Faster with LinkedIn
            </h1>

            <p
              style={{
                margin: "0 auto 32px",
                maxWidth: "700px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "var(--muted)",
              }}
            >
              Save time with LinkedIn-backed hiring. We help you find skilled
              candidates faster and smarter through our extensive network.
            </p>
          </div>
        </section>

        {/* FORM SECTION */}
        <section
          style={{
            padding: "80px 5%",
            background: "#fff",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                margin: "0 0 16px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 800,
                lineHeight: 1.2,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              Submit Your Hiring Request
            </h2>

            <p
              style={{
                margin: "0 auto 48px",
                maxWidth: "600px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "var(--muted)",
                textAlign: "center",
              }}
            >
              Fill out the form below and our team will help you find the right
              candidates
            </p>

            {submitStatus.type && (
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  marginBottom: "32px",
                  background:
                    submitStatus.type === "success" ? "#dcfce7" : "#fee2e2",
                  border: `1px solid ${
                    submitStatus.type === "success" ? "#86efac" : "#fecaca"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {submitStatus.type === "success" && (
                  <HiCheckCircle size={24} style={{ color: "#16a34a" }} />
                )}
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px",
                    color:
                      submitStatus.type === "success" ? "#16a34a" : "#dc2626",
                    fontWeight: 500,
                  }}
                >
                  {submitStatus.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                }}
                className="form-grid"
              >
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="jobTitle"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Senior Software Engineer"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="experienceLevel"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Experience Level *
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#fff",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  >
                    <option value="">Select experience level</option>
                    <option value="Entry Level">Entry Level (0-2 years)</option>
                    <option value="Mid Level">Mid Level (3-5 years)</option>
                    <option value="Senior Level">Senior Level (6-10 years)</option>
                    <option value="Executive">Executive (10+ years)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="numberOfPositions"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Number of Positions *
                  </label>
                  <input
                    type="number"
                    id="numberOfPositions"
                    name="numberOfPositions"
                    value={formData.numberOfPositions}
                    onChange={handleChange}
                    required
                    min="1"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="timeline"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Hiring Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#fff",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  >
                    <option value="">Select timeline</option>
                    <option value="Immediate">Immediate (ASAP)</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    htmlFor="budget"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Budget Range *
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    placeholder="e.g., ₹50,000 - ₹1,00,000 per month"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    htmlFor="skills"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Required Skills *
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    placeholder="e.g., React, Node.js, MongoDB, AWS"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    htmlFor="description"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Job Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Describe the role, responsibilities, and any specific requirements..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                      resize: "vertical",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    htmlFor="linkedinProfile"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Your LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    id="linkedinProfile"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#067CCB")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: "32px",
                  width: "100%",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  border: "none",
                  background: isSubmitting ? "#94a3b8" : "#067CCB",
                  color: "#fff",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = "#0569B0";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = "#067CCB";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Hiring Request"}
              </button>
            </form>
          </div>
        </section>

        <style>{`
          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { HiCheckCircle } from "react-icons/hi2";
import { FaBullseye } from "react-icons/fa6";

export default function LeadGenerationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    targetRole: "",
    targetLocation: "",
    companySize: "",
    numberOfLeads: "",
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
      const response = await fetch("/api/lead-generation", {
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
            "Your lead generation request has been submitted successfully! Our team will contact you within 24 hours.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          industry: "",
          targetRole: "",
          targetLocation: "",
          companySize: "",
          numberOfLeads: "",
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
            {/* Top Badge */}
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
              <FaBullseye size={14} />
              B2B Lead Generation
            </div>

            {/* Main Heading */}
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
              Get Targeted B2B Leads from LinkedIn
            </h1>

            {/* Supporting Text */}
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
              Connect with decision-makers who matter. We deliver verified B2B
              contacts directly from LinkedIn's professional network.
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
              Submit Your Lead Generation Request
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
              Tell us about your ideal customer profile and we'll deliver
              qualified leads
            </p>

            {/* Status Messages */}
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

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                }}
                className="form-grid"
              >
                {/* Name */}
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

                {/* Email */}
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

                {/* Company */}
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

                {/* Phone */}
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

                {/* Industry */}
                <div>
                  <label
                    htmlFor="industry"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Target Industry *
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Technology, Healthcare, Finance"
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

                {/* Target Role */}
                <div>
                  <label
                    htmlFor="targetRole"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Target Role/Title *
                  </label>
                  <input
                    type="text"
                    id="targetRole"
                    name="targetRole"
                    value={formData.targetRole}
                    onChange={handleChange}
                    required
                    placeholder="e.g., CEO, CTO, Marketing Director"
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

                {/* Target Location */}
                <div>
                  <label
                    htmlFor="targetLocation"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Target Location *
                  </label>
                  <input
                    type="text"
                    id="targetLocation"
                    name="targetLocation"
                    value={formData.targetLocation}
                    onChange={handleChange}
                    required
                    placeholder="e.g., India, USA, Global"
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

                {/* Company Size */}
                <div>
                  <label
                    htmlFor="companySize"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Target Company Size *
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
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
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                {/* Number of Leads */}
                <div>
                  <label
                    htmlFor="numberOfLeads"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Number of Leads Required *
                  </label>
                  <input
                    type="number"
                    id="numberOfLeads"
                    name="numberOfLeads"
                    value={formData.numberOfLeads}
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

                {/* Timeline */}
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
                    Delivery Timeline *
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
                    <option value="Within 1 week">Within 1 week</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within 1 month">Within 1 month</option>
                  </select>
                </div>

                {/* Budget */}
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
                    placeholder="e.g., ₹10,000 - ₹50,000"
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

                {/* Description */}
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
                    Additional Requirements *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Describe your ideal customer profile, specific requirements, or any other details..."
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

                {/* LinkedIn Profile (Optional) */}
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

              {/* Submit Button */}
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
                {isSubmitting ? "Submitting..." : "Submit Lead Generation Request"}
              </button>
            </form>
          </div>
        </section>

        {/* Responsive Styles */}
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

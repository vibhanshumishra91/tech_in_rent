"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import type { LeadPayload } from "@/lib/validations/lead";
import { FormEvent, useState } from "react";
import { FaArrowRightLong, FaCalendarDays, FaCircleCheck, FaHandshake, FaShieldHalved } from "react-icons/fa6";

const benefits = [
  "Strategy aligned to your business model",
  "Service recommendation based on your goal",
  "Clear execution timeline and next steps",
  "Performance-focused and transparent workflow",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1.5px solid #e2e8f0",
  borderRadius: "9px",
  fontSize: "14px",
  fontFamily: "var(--font-body, sans-serif)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  color: "var(--ink)",
  background: "#fff",
  boxSizing: "border-box" as const,
};

type LeadFormKey = Exclude<keyof LeadPayload, "source" | "pagePath">;

export default function DemoPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [formData, setFormData] = useState<LeadPayload>({
    name: "",
    email: "",
    company: "",
    monthlyBudget: "",
    serviceInterested: "",
    whatsappNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  function validateLeadForm() {
    if (formData.name.trim().length < 2) {
      return "Please enter a valid name.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!formData.company.trim()) {
      return "Please enter your company name.";
    }
    if (!formData.monthlyBudget.trim()) {
      return "Please enter your monthly budget.";
    }
    if (!formData.serviceInterested.trim()) {
      return "Please choose a service.";
    }
    const phonePattern = /^[+()\-\s0-9]{8,20}$/;
    if (!phonePattern.test(formData.whatsappNumber.trim())) {
      return "Please enter a valid WhatsApp number.";
    }
    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clientError = validateLeadForm();
    if (clientError) {
      setSubmitError(clientError);
      setSubmitSuccess(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "demo-page",
          pagePath: "/demo",
        }),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string; errors?: string[] };

      if (!response.ok || !result.ok) {
        setSubmitError(result.errors?.[0] ?? "Submission failed. Please try again.");
        return;
      }

      setSubmitSuccess(result.message ?? "Thanks. Your request has been submitted.");
      setFormData({ name: "", email: "", company: "", monthlyBudget: "", serviceInterested: "", whatsappNumber: "" });
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--teal)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6,124,203,0.1)";
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#e2e8f0";
    e.currentTarget.style.boxShadow = "none";
  };

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
        <section
          style={{ display: "grid", gap: "24px" }}
          className="demo-top-grid"
        >
          {/* Left – info */}
          <article
            style={{
              borderRadius: "20px",
              border: "1px solid var(--line)",
              background: "#fff",
              padding: "40px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: "1px solid var(--line)",
                background: "var(--off)",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "20px",
              }}
            >
              <FaHandshake size={12} />
              Consultation
            </span>
            <h1
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              Book Your Strategy Consultation
            </h1>
            <p
              style={{
                margin: "0 0 28px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "var(--muted)",
              }}
            >
              Share your goals and budget. We will recommend the right service path.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {benefits.map((item) => (
                <li
                  key={item}
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
                  <FaCircleCheck size={16} color="var(--teal)" style={{ marginTop: "2px", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* Right – form */}
          <article
            style={{
              borderRadius: "20px",
              border: "1px solid var(--line)",
              background: "#fff",
              padding: "40px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h2
              style={{
                margin: "0 0 24px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              Qualification Form
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {([
                { placeholder: "Full Name", key: "name", type: "text" },
                { placeholder: "Email Address", key: "email", type: "email" },
                { placeholder: "Company", key: "company", type: "text" },
                { placeholder: "Monthly Budget", key: "monthlyBudget", type: "text" },
                { placeholder: "WhatsApp Number", key: "whatsappNumber", type: "text" },
              ] as Array<{ placeholder: string; key: LeadFormKey; type: string }>).map(({ placeholder, key, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  required
                  minLength={key === "name" ? 2 : undefined}
                  pattern={key === "whatsappNumber" ? "[+()\\-\\s0-9]{8,20}" : undefined}
                  value={formData[key]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              ))}

              <select
                required
                value={formData.serviceInterested}
                onChange={(e) => setFormData((prev) => ({ ...prev, serviceInterested: e.target.value }))}
                style={inputStyle}
                onFocus={focusInput}
                onBlur={blurInput}
              >
                <option value="" disabled>Service Interested</option>
                <option>LinkedIn Account Management</option>
                <option>Account Recovery Support</option>
                <option>LinkedIn Growth</option>
                <option>Sales Partnership</option>
              </select>

              {submitError && (
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#dc2626", fontFamily: "var(--font-body)" }}>
                  {submitError}
                </p>
              )}
              {submitSuccess && (
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "var(--teal-dark)", fontFamily: "var(--font-body)" }}>
                  {submitSuccess}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ marginTop: "6px", opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
              >
                {isSubmitting ? "Submitting…" : "Submit Request"}
                <FaArrowRightLong size={14} />
              </button>
            </form>
          </article>
        </section>

        {/* Calendly section */}
        <section
          style={{
            marginTop: "24px",
            borderRadius: "20px",
            border: "1px solid var(--line)",
            background: "#fff",
            padding: "40px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid var(--line)",
              background: "var(--off)",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "20px",
            }}
          >
            <FaCalendarDays size={12} />
            Calendly Integration
          </span>

          {calendlyUrl ? (
            <iframe
              title="Calendly Booking"
              src={calendlyUrl}
              style={{
                width: "100%",
                height: "420px",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                display: "block",
                marginTop: "4px",
              }}
            />
          ) : (
            <div
              style={{
                marginTop: "12px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                border: "1.5px dashed var(--line)",
                background: "var(--off)",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "var(--muted)",
              }}
            >
              Set NEXT_PUBLIC_CALENDLY_URL in .env.local to show Calendly embed
            </div>
          )}

          <p
            style={{
              margin: "14px 0 0",
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "12px",
              color: "var(--muted)",
            }}
          >
            <FaShieldHalved size={12} />
            Your details are used only for consultation and service planning.
          </p>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (min-width: 900px) {
          .demo-top-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 899px) {
          .demo-top-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

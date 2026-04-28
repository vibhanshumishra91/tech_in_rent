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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      setFormData({
        name: "",
        email: "",
        company: "",
        monthlyBudget: "",
        serviceInterested: "",
        whatsappNumber: "",
      });
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(148,163,184,0.2),transparent_34%),radial-gradient(circle_at_88%_22%,rgba(56,189,248,0.14),transparent_35%),#f1f5f9] text-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
              <FaHandshake size={12} />
              Consultation
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Book Your Strategy Consultation</h1>
            <p className="mt-3 text-slate-600">Share your goals and budget. We will recommend the right service path.</p>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {benefits.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <FaCircleCheck size={14} className="text-slate-700" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">Qualification Form</h2>
            <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
              <input
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
                placeholder="Name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
              <input
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
              <input
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
                placeholder="Company"
                value={formData.company}
                onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                required
              />
              <input
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
                placeholder="Monthly Budget"
                value={formData.monthlyBudget}
                onChange={(event) => setFormData((prev) => ({ ...prev, monthlyBudget: event.target.value }))}
                required
              />
              <select
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
                value={formData.serviceInterested}
                onChange={(event) => setFormData((prev) => ({ ...prev, serviceInterested: event.target.value }))}
                required
              >
                <option value="" disabled>
                  Service Interested
                </option>
                <option>LinkedIn Account Management</option>
                <option>Account Recovery Support</option>
                <option>LinkedIn Growth</option>
                <option>Sales Partnership</option>
              </select>
              <input
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
                placeholder="WhatsApp Number"
                value={formData.whatsappNumber}
                onChange={(event) => setFormData((prev) => ({ ...prev, whatsappNumber: event.target.value }))}
                required
              />

              {submitError ? <p className="text-xs font-semibold text-red-600">{submitError}</p> : null}
              {submitSuccess ? <p className="text-xs font-semibold text-blue-600">{submitSuccess}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
                <FaArrowRightLong size={14} />
              </button>
            </form>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
            <FaCalendarDays size={12} />
            Calendly Integration
          </p>
          {calendlyUrl ? (
            <iframe
              title="Calendly Booking"
              src={calendlyUrl}
              className="mt-4 h-96 w-full rounded-xl border border-slate-200"
            />
          ) : (
            <div className="mt-4 flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              Set NEXT_PUBLIC_CALENDLY_URL in .env.local to show Calendly embed
            </div>
          )}
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
            <FaShieldHalved size={12} />
            Your details are used only for consultation and service planning.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

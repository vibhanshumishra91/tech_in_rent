"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { HiChevronDown } from "react-icons/hi2";
import Link from "next/link";

const categories = [
  {
    label: "General",
    faqs: [
      {
        q: "What is TechInRent?",
        a: "TechInRent is a LinkedIn growth and B2B client acquisition agency. We help professionals and businesses grow their LinkedIn presence, generate qualified leads, recover restricted accounts, and hire talent — all through LinkedIn-focused strategies.",
      },
      {
        q: "Who is behind TechInRent?",
        a: "TechInRent was founded and is run by Vibhanshu, who oversees strategy and client success. You can reach him directly at vibhanshu@techinrent.com.",
      },
      {
        q: "How do I get started?",
        a: "The fastest way is to book a free 30-minute consultation call via our Calendly link. We will audit your situation and design a custom strategy. You can also contact us on WhatsApp at +91 78987 11748.",
      },
      {
        q: "How many clients has TechInRent worked with?",
        a: "We have supported 500+ clients with a 98% satisfaction rate and an average onboarding time of 48 hours.",
      },
    ],
  },
  {
    label: "Account Management",
    faqs: [
      {
        q: "What is LinkedIn Account Rental?",
        a: "Our Account Rental service gives you access to verified, established LinkedIn accounts to run outreach, recruiting, or lead generation campaigns — without risking your own personal profile.",
      },
      {
        q: "What plans are available?",
        a: "We offer three tiers:\n• Basic ($50–$100/mo): Profile setup, InMail credits, standard features\n• Professional ($100–$150/mo): 1+ year old account, SSI score 50–80, 50+ InMail credits — Most Popular\n• Enterprise ($150–$200/mo): Sales Navigator or Recruiter access, 3+ year old account, SSI score 85–100, priority support",
      },
      {
        q: "Is this safe? Can my LinkedIn account get restricted?",
        a: "We follow policy-safe execution methods that prioritise account health. All our workflows are designed to stay within LinkedIn's acceptable use guidelines. We monitor accounts actively and alert you to any unusual activity.",
      },
      {
        q: "Can I cancel at any time?",
        a: "Yes. You can cancel your subscription at any time with 7 days' notice. You retain access until the end of your current billing period. Please see our Refund Policy for details.",
      },
    ],
  },
  {
    label: "LinkedIn Connections",
    faqs: [
      {
        q: "Are the connections real people?",
        a: "Yes. We deliver real, targeted LinkedIn connections — not bots or fake profiles. All connections are sourced from genuine LinkedIn users relevant to your industry or target audience.",
      },
      {
        q: "How long does delivery take?",
        a: "Delivery times vary by package:\n• 50–100 connections: 24–48 hours\n• 500 connections: 1–2 days\n• 1,000 connections: 10–20 hour priority delivery\n• 2,500–5,000 connections: Same-day delivery",
      },
      {
        q: "What if fewer connections are delivered than I paid for?",
        a: "If we deliver fewer connections due to a technical issue on our end, we will either complete the remaining delivery or issue a proportional credit to your account.",
      },
    ],
  },
  {
    label: "Account Recovery",
    faqs: [
      {
        q: "What types of LinkedIn issues can you help with?",
        a: "We help with restricted accounts, banned accounts, identity verification failures, unusual activity flags, and account access issues. We diagnose the root cause and create a recovery roadmap.",
      },
      {
        q: "What is your success rate?",
        a: "We have a 95% account recovery success rate. We respond to all recovery requests within 48 hours.",
      },
      {
        q: "What if you can't recover my account?",
        a: "If we are unable to begin the recovery process entirely, we issue a full refund. If recovery was attempted but unsuccessful, we consider a 50% partial refund at our discretion. See our Refund Policy for full details.",
      },
    ],
  },
  {
    label: "Payments & Refunds",
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards, UPI, net banking, and other methods available through our payment gateway (Razorpay). All payments are processed securely.",
      },
      {
        q: "Can I get a refund?",
        a: "Refunds are available in specific circumstances — such as duplicate payments, service not delivered, or cancellation within 24 hours before work begins. Please refer to our Refund Policy page for the full breakdown.",
      },
      {
        q: "Are prices in USD or INR?",
        a: "Prices are listed in USD. INR equivalents are shown where applicable. Final billing currency depends on your payment method and location.",
      },
    ],
  },
];

export default function FaqClient() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("General");

  const current = categories.find(c => c.label === activeCategory)!;

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4fb 100%)", padding: "80px 24px 64px", textAlign: "center" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, color: "var(--ink)" }}>
              Frequently Asked Questions
            </h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "17px", color: "var(--muted)", lineHeight: 1.7 }}>
              Everything you need to know about TechInRent and our services.
            </p>
          </div>
        </section>

        <section style={{ padding: "64px 24px", maxWidth: "860px", margin: "0 auto" }}>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "36px" }}>
            {categories.map(c => (
              <button
                key={c.label}
                onClick={() => { setActiveCategory(c.label); setOpenKey(null); }}
                style={{
                  padding: "8px 18px", borderRadius: "999px", border: "1px solid",
                  borderColor: activeCategory === c.label ? "var(--teal)" : "var(--line)",
                  background: activeCategory === c.label ? "var(--teal)" : "#fff",
                  color: activeCategory === c.label ? "#fff" : "var(--ink)",
                  fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {current.faqs.map((faq, i) => {
              const key = `${activeCategory}-${i}`;
              const isOpen = openKey === key;
              return (
                <div
                  key={key}
                  style={{ borderRadius: "12px", border: "1px solid", borderColor: isOpen ? "var(--teal-border)" : "var(--line)", background: isOpen ? "var(--teal-pale)" : "#fff", overflow: "hidden", transition: "all 0.2s" }}
                >
                  <button
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "18px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                  >
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.4 }}>{faq.q}</span>
                    <HiChevronDown size={18} style={{ color: "var(--teal)", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 20px 20px" }}>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--body)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{faq.a}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions */}
          <div style={{ marginTop: "48px", padding: "32px", borderRadius: "16px", background: "var(--teal)", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 800, color: "#fff" }}>Still have questions?</h2>
            <p style={{ margin: "0 0 20px", fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>Our team is happy to help — reach out any time.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "11px 24px", borderRadius: "8px", background: "#fff", color: "var(--teal)", fontFamily: "var(--font-heading)", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                Contact Us
              </Link>
              <a href="https://wa.me/917898711748" target="_blank" rel="noopener noreferrer"
                style={{ padding: "11px 24px", borderRadius: "8px", background: "rgba(255,255,255,0.15)", color: "#fff", fontFamily: "var(--font-heading)", fontSize: "14px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { HiCheckCircle, HiXCircle, HiInformationCircle } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "TechInRent Refund Policy — understand our refund conditions, eligibility criteria, and process for LinkedIn growth and account recovery services.",
  alternates: { canonical: "https://techinrent.com/refund-policy" },
  robots: { index: true, follow: false },
};

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4fb 100%)", padding: "80px 24px 64px", textAlign: "center" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, color: "var(--ink)" }}>Refund Policy</h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--muted)" }}>Last updated: May 2026</p>
          </div>
        </section>

        <section style={{ padding: "64px 24px", maxWidth: "780px", margin: "0 auto" }}>

          {/* Intro */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--body)", lineHeight: 1.8, marginBottom: "40px" }}>
            At TechInRent, we stand behind the quality of our services. This policy outlines the conditions under which refunds are granted. We encourage you to read this policy carefully before making a purchase.
          </p>

          {/* Eligible / Not Eligible */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "48px" }}>
            <div style={{ padding: "24px", borderRadius: "14px", background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <HiCheckCircle size={22} style={{ color: "#16a34a" }} />
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "15px", fontWeight: 700, color: "#15803d" }}>Eligible for Refund</h3>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", fontFamily: "var(--font-body)", fontSize: "14px", color: "#166534", lineHeight: 2 }}>
                <li>Service not delivered within the agreed timeframe due to our fault</li>
                <li>Technical failure that prevents service delivery entirely</li>
                <li>Duplicate payment charged for the same order</li>
                <li>Account recovery service where no recovery attempt was made</li>
                <li>Cancellation within 24 hours of purchase (before work begins)</li>
              </ul>
            </div>
            <div style={{ padding: "24px", borderRadius: "14px", background: "#fef2f2", border: "1px solid #fecaca" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <HiXCircle size={22} style={{ color: "#dc2626" }} />
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "15px", fontWeight: 700, color: "#b91c1c" }}>Not Eligible for Refund</h3>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", fontFamily: "var(--font-body)", fontSize: "14px", color: "#991b1b", lineHeight: 2 }}>
                <li>Change of mind after work has begun</li>
                <li>Dissatisfaction with results that were within expected service scope</li>
                <li>LinkedIn connection packages once delivery has started</li>
                <li>Account management services for months already rendered</li>
                <li>Services suspended due to violation of our Terms & Conditions</li>
                <li>Delays caused by client's failure to provide required information</li>
              </ul>
            </div>
          </div>

          {/* Per-service */}
          {[
            {
              title: "LinkedIn Account Rental (Account Management)",
              content: "Monthly subscription fees are non-refundable once the billing cycle has started. If you cancel before the next billing date, you retain access for the remainder of the paid period. No partial refunds are issued for unused days.",
            },
            {
              title: "LinkedIn Connection Packages",
              content: "Refunds are only available if delivery has not yet commenced. Once the connection delivery process has started, the order cannot be cancelled or refunded. If fewer connections are delivered than purchased due to a technical issue on our end, we will either complete the order or issue a proportional credit.",
            },
            {
              title: "Account Recovery Support",
              content: "If we are unable to begin the recovery process (e.g. due to extreme restrictions on the account), a full refund will be issued. If recovery is attempted but unsuccessful, a partial refund of 50% will be considered at our discretion. No refund is issued once a recovery has been completed.",
            },
            {
              title: "Hiring Support & Lead Generation",
              content: "These are custom services. Refunds are assessed on a case-by-case basis based on work completed. We will credit unused portions of prepaid custom packages if cancelled before work begins.",
            },
          ].map((item) => (
            <div key={item.title} style={{ marginBottom: "32px" }}>
              <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-heading)", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>{item.title}</h2>
              <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--body)", lineHeight: 1.8 }}>{item.content}</p>
              <div style={{ marginTop: "24px", height: "1px", background: "var(--line)" }} />
            </div>
          ))}

          {/* Process */}
          <div style={{ padding: "24px", borderRadius: "14px", background: "#eff6ff", border: "1px solid #bfdbfe", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <HiInformationCircle size={22} style={{ color: "#2563eb", flexShrink: 0, marginTop: 2 }} />
              <div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-heading)", fontSize: "15px", fontWeight: 700, color: "#1e40af" }}>How to Request a Refund</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "14px", color: "#1e3a8a", lineHeight: 1.8 }}>
                  Email us at <a href="mailto:vibhanshu@techinrent.com" style={{ color: "#2563eb" }}>vibhanshu@techinrent.com</a> with your order details and reason for the refund request. We will respond within 48 hours. Approved refunds are processed within 5–7 business days back to your original payment method.
                </p>
              </div>
            </div>
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--muted)", lineHeight: 1.7 }}>
            TechInRent reserves the right to amend this Refund Policy at any time. Changes will be effective immediately upon posting to this page.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

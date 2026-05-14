import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "TechInRent Terms & Conditions — the rules and agreements that govern use of our LinkedIn growth, account management, and lead generation services.",
  alternates: { canonical: "https://techinrent.com/terms" },
  robots: { index: true, follow: false },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using TechInRent's website, services, or purchasing any product, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.`,
  },
  {
    title: "2. Services Provided",
    body: `TechInRent provides LinkedIn growth and B2B client acquisition services including, but not limited to:
• LinkedIn Account Rental / Account Management
• LinkedIn Connection Packages
• Account Recovery Support
• Hiring Support
• Lead Generation

The specific scope, deliverables, and duration of each service are defined at the point of purchase or in the applicable Service Agreement.`,
  },
  {
    title: "3. Eligibility",
    body: `You must be at least 18 years of age and capable of entering into a legally binding agreement to use our services. By using TechInRent services, you represent and warrant that you meet this requirement.`,
  },
  {
    title: "4. Account & Access",
    body: `For Account Management services, you will be provided access to a LinkedIn account managed by TechInRent. You agree not to:
• Change account credentials without notifying us
• Engage in activities that violate LinkedIn's Terms of Service
• Use the rented account for spam, harassment, or illegal activities
• Share account access with unauthorised third parties

Any breach of these terms may result in immediate termination of the service without refund.`,
  },
  {
    title: "5. Payment & Billing",
    body: `All prices are listed in USD unless otherwise stated. Payment is due at the time of purchase or as agreed in a service agreement. We accept payments via the methods listed on our website. All fees are non-refundable except as explicitly stated in our Refund Policy.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All content on the TechInRent website — including text, graphics, logos, and software — is the property of TechInRent and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
  },
  {
    title: "7. Limitation of Liability",
    body: `TechInRent provides services on a best-efforts basis. We do not guarantee specific outcomes such as a fixed number of leads, connections, or revenue generated. To the maximum extent permitted by law, TechInRent's total liability for any claim arising out of or relating to our services shall not exceed the amount paid by you for the specific service in the 30 days preceding the claim.`,
  },
  {
    title: "8. Third-Party Platforms",
    body: `Our services operate on or interact with LinkedIn and other third-party platforms. TechInRent is not affiliated with LinkedIn Corporation. We are not responsible for changes to LinkedIn's policies, features, or terms that may affect service delivery. LinkedIn's own terms of service apply to all platform usage.`,
  },
  {
    title: "9. Termination",
    body: `Either party may terminate a service engagement with written notice (email constitutes written notice). Upon termination, you will be charged only for services rendered up to the termination date. We reserve the right to suspend or terminate access to our services immediately if you breach these Terms.`,
  },
  {
    title: "10. Governing Law",
    body: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.`,
  },
  {
    title: "11. Changes to Terms",
    body: `We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes take effect constitutes your acceptance of the revised Terms.`,
  },
  {
    title: "12. Contact",
    body: `For questions regarding these Terms, contact us at:
Email: vibhanshu@techinrent.com
Phone / WhatsApp: +91 78987 11748`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4fb 100%)", padding: "80px 24px 64px", textAlign: "center" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, color: "var(--ink)" }}>Terms & Conditions</h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--muted)" }}>Effective date: January 1, 2025 &nbsp;·&nbsp; Last updated: May 2026</p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "64px 24px", maxWidth: "780px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--body)", lineHeight: 1.8, marginBottom: "40px" }}>
            Please read these Terms & Conditions carefully before using TechInRent's website or services. These terms constitute a legally binding agreement between you and TechInRent.
          </p>
          {sections.map((s) => (
            <div key={s.title} style={{ marginBottom: "36px" }}>
              <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>{s.title}</h2>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--body)", lineHeight: 1.9, whiteSpace: "pre-line" }}>{s.body}</div>
              <div style={{ marginTop: "24px", height: "1px", background: "var(--line)" }} />
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

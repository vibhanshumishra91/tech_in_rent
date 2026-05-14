import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "TechInRent's Privacy Policy — how we collect, use, and protect your personal data when you use our LinkedIn growth and lead generation services.",
  alternates: { canonical: "https://techinrent.com/privacy-policy" },
  robots: { index: true, follow: false },
};

const sections = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly when you use our services, including:
• Name and email address when you book a consultation or submit a form
• LinkedIn profile URL when requesting account recovery or hiring support
• Payment information processed securely through our payment partners (we do not store card details)
• Messages and communications you send us via email, WhatsApp, or our website forms`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use the information collected to:
• Deliver and manage the services you have purchased
• Respond to your enquiries and provide customer support
• Send service updates, billing information, and operational notifications
• Improve our website, services, and user experience
• Comply with legal obligations

We do not sell, rent, or share your personal data with third parties for marketing purposes.`,
  },
  {
    title: "3. LinkedIn Account Data",
    body: `When you rent a LinkedIn account through our Account Management service, we operate that account on behalf of our clients. We handle all LinkedIn credentials with strict confidentiality. Account credentials are never shared beyond the operational team responsible for your campaign. You retain full ownership of any account that belongs to you.`,
  },
  {
    title: "4. Cookies & Tracking",
    body: `Our website may use cookies and similar tracking technologies to:
• Remember your preferences and session data
• Analyse site traffic and usage patterns (via anonymised analytics)
• Improve website performance

You can control cookie settings through your browser. Disabling cookies may affect some website functionality.`,
  },
  {
    title: "5. Data Retention",
    body: `We retain your personal data only as long as necessary to provide our services or as required by law. When you request deletion of your data, we will remove it from our active systems within 30 days, subject to any legal retention obligations.`,
  },
  {
    title: "6. Data Security",
    body: `We implement industry-standard security measures including encrypted communications (HTTPS), restricted access controls, and secure credential storage. However, no method of internet transmission is 100% secure. We encourage you to contact us immediately if you suspect any unauthorised access.`,
  },
  {
    title: "7. Third-Party Services",
    body: `We use select third-party tools to operate our business, including:
• Calendly – for appointment scheduling
• Razorpay / payment gateways – for payment processing
• Cloudinary – for media storage
• MongoDB Atlas – for database hosting

Each third party operates under its own privacy policy. We only share the minimum data required for these services to function.`,
  },
  {
    title: "8. Your Rights",
    body: `You have the right to:
• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data
• Withdraw consent for marketing communications at any time
• Lodge a complaint with the relevant data protection authority

To exercise any of these rights, contact us at vibhanshu@techinrent.com.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated effective date. Continued use of our services after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: "10. Contact",
    body: `For any privacy-related questions or requests, contact:
Email: vibhanshu@techinrent.com
Phone / WhatsApp: +91 78987 11748`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4fb 100%)", padding: "80px 24px 64px", textAlign: "center" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, color: "var(--ink)" }}>Privacy Policy</h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--muted)" }}>Effective date: January 1, 2025 &nbsp;·&nbsp; Last updated: May 2026</p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "64px 24px", maxWidth: "780px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--body)", lineHeight: 1.8, marginBottom: "40px" }}>
            TechInRent ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
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

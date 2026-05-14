import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Service Agreement",
  description:
    "TechInRent Service Agreement — terms of engagement for our LinkedIn account management, lead generation, and account recovery services.",
  alternates: { canonical: "https://techinrent.com/service-agreement" },
  robots: { index: true, follow: false },
};

const sections = [
  {
    title: "1. Parties",
    body: `This Service Agreement ("Agreement") is entered into between TechInRent ("Service Provider"), operated by Vibhanshu, and the client ("Client") who has engaged TechInRent's services. By purchasing or using any TechInRent service, the Client agrees to the terms set forth in this Agreement.`,
  },
  {
    title: "2. Scope of Services",
    body: `TechInRent will provide the services as described in the applicable service package selected by the Client. The specific deliverables, timelines, and access details will be confirmed upon purchase or via email within 24 hours of payment. Any service changes or additions must be agreed upon in writing.`,
  },
  {
    title: "3. Client Responsibilities",
    body: `The Client agrees to:
• Provide accurate and complete information required for service delivery
• Respond to communications from TechInRent within 48 hours to avoid delays
• Not use any TechInRent-managed account or service for spam, harassment, or activities that violate LinkedIn's Terms of Service or applicable laws
• Keep confidential any account credentials or proprietary strategies shared by TechInRent
• Notify TechInRent immediately of any issues, unusual activity, or suspected security breaches`,
  },
  {
    title: "4. TechInRent Responsibilities",
    body: `TechInRent agrees to:
• Deliver services as described in the selected package with reasonable skill and care
• Maintain strict confidentiality of all Client data and credentials
• Notify the Client promptly of any issues that may affect service delivery
• Provide support via email or WhatsApp during business hours (Mon–Sat, 10 AM – 7 PM IST)
• Use only compliant methods aligned with LinkedIn's acceptable use policies`,
  },
  {
    title: "5. Payment Terms",
    body: `All payments are due at the time of purchase unless a custom agreement specifies otherwise. For monthly subscription services, payments are due on the same date each month. Late payment of more than 7 days may result in service suspension. Prices are subject to change with 30 days' notice for ongoing subscriptions.`,
  },
  {
    title: "6. Confidentiality",
    body: `Both parties agree to keep confidential any proprietary information, strategies, credentials, or business data shared during the course of this Agreement. This obligation of confidentiality survives the termination of this Agreement by 2 years. TechInRent will not disclose Client information to any third party except as required to deliver the contracted services or by law.`,
  },
  {
    title: "7. Intellectual Property",
    body: `Any strategies, templates, or materials created by TechInRent specifically for the Client's campaign remain the property of TechInRent unless otherwise agreed in writing. The Client is granted a non-exclusive licence to use such materials solely for the purpose of the contracted services.`,
  },
  {
    title: "8. No Guarantee of Results",
    body: `TechInRent does not guarantee specific outcomes such as revenue, number of leads, or account growth. LinkedIn platform changes, industry conditions, and Client responsiveness may all affect results. TechInRent commits to delivering the agreed service activities with diligence and best-practice execution.`,
  },
  {
    title: "9. Termination",
    body: `Either party may terminate this Agreement with 7 days' written notice (email constitutes written notice). TechInRent may terminate immediately without notice in cases of:
• Breach of Terms & Conditions or this Agreement
• Non-payment beyond 14 days
• Fraudulent, abusive, or illegal use of services

Upon termination, all access to TechInRent-managed accounts and materials will be revoked.`,
  },
  {
    title: "10. Limitation of Liability",
    body: `To the fullest extent permitted by applicable law, TechInRent's aggregate liability under this Agreement shall not exceed the total fees paid by the Client in the 30 days preceding the event giving rise to the claim. TechInRent is not liable for indirect, incidental, or consequential damages, including loss of revenue or business opportunities.`,
  },
  {
    title: "11. Dispute Resolution",
    body: `In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation within 14 days of written notice. If unresolved, the dispute shall be submitted to binding arbitration under the laws of India. The language of arbitration shall be English.`,
  },
  {
    title: "12. Entire Agreement",
    body: `This Agreement, together with the Terms & Conditions and Refund Policy available on the TechInRent website, constitutes the entire agreement between the parties and supersedes all prior discussions, representations, or agreements.`,
  },
  {
    title: "13. Contact",
    body: `For questions or to formalise a custom agreement, contact:
Vibhanshu — TechInRent
Email: vibhanshu@techinrent.com
WhatsApp: +91 78987 11748`,
  },
];

export default function ServiceAgreementPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4fb 100%)", padding: "80px 24px 64px", textAlign: "center" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, color: "var(--ink)" }}>Service Agreement</h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--muted)" }}>Effective date: January 1, 2025 &nbsp;·&nbsp; Last updated: May 2026</p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "64px 24px", maxWidth: "780px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--body)", lineHeight: 1.8, marginBottom: "40px" }}>
            This Service Agreement governs the relationship between TechInRent and its clients. It defines the rights, obligations, and expectations of both parties to ensure a clear and professional engagement.
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

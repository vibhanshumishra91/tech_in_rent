import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import BookCallButton from "@/components/shared/BookCallButton";

export const metadata: Metadata = {
  title: "About Us — Our Mission, Team & Values",
  description:
    "Learn how TechInRent helps professionals and businesses grow on LinkedIn. Our mission, founding story, core values, and the team behind 500+ client success stories.",
  alternates: { canonical: "https://techinrent.com/about" },
  openGraph: {
    title: "About TechInRent | LinkedIn Growth Agency",
    description:
      "Learn how TechInRent helps professionals and businesses grow on LinkedIn through policy-safe outreach, lead generation, and account recovery.",
    url: "https://techinrent.com/about",
  },
};
import Link from "next/link";
import { HiSparkles, HiShieldCheck, HiChartBar, HiUserGroup } from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa6";

const values = [
  {
    icon: <HiShieldCheck size={24} style={{ color: "#067CCB" }} />,
    title: "Trust & Transparency",
    body: "We operate with full transparency — you always know what we're doing, why, and what results to expect. No hidden fees, no vague promises.",
    bg: "#E6F4FB",
  },
  {
    icon: <HiChartBar size={24} style={{ color: "#16a34a" }} />,
    title: "Results-Driven",
    body: "Every strategy we deploy is tied to measurable outcomes — connection growth, lead pipeline, or account recovery. If it doesn't move the needle, we don't do it.",
    bg: "#f0fdf4",
  },
  {
    icon: <HiSparkles size={24} style={{ color: "#7c3aed" }} />,
    title: "Policy-Safe Execution",
    body: "We operate strictly within LinkedIn's terms of service. Our methods are designed to protect your professional reputation and your account.",
    bg: "#faf5ff",
  },
  {
    icon: <HiUserGroup size={24} style={{ color: "#ea580c" }} />,
    title: "People-First",
    body: "Behind every LinkedIn profile is a real professional. We treat your network — and ours — with the respect they deserve.",
    bg: "#fff7ed",
  },
];

const team = [
  {
    name: "Vibhanshu",
    role: "Founder & LinkedIn Growth Strategist",
    bio: "With years of experience growing LinkedIn networks for founders, recruiters, and sales teams, Vibhanshu built TechInRent to make professional growth accessible and systematic.",
    linkedin: "https://linkedin.com/in/vibhanshu",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4fb 100%)", padding: "80px 24px 64px", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "999px", background: "rgba(6,124,203,0.1)", marginBottom: "20px" }}>
              <HiSparkles size={14} style={{ color: "var(--teal)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "var(--teal)" }}>Our Story</span>
            </div>
            <h1 style={{ margin: "0 0 20px", fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.15 }}>
              We Help Professionals<br />Win on LinkedIn
            </h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "17px", color: "var(--muted)", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
              TechInRent was founded with one goal: to give professionals, founders, and teams the LinkedIn presence they need to grow — without the guesswork or wasted time.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section style={{ padding: "72px 24px", maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ padding: "40px", borderRadius: "16px", background: "var(--off)", border: "1px solid var(--line)" }}>
            <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 800, color: "var(--ink)" }}>Our Mission</h2>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--body)", lineHeight: 1.85 }}>
              LinkedIn is the most powerful professional network on the planet — but most people barely scratch the surface of what's possible. We bridge that gap by providing managed growth services, account recovery, hiring support, and sales partnership that are strategic, transparent, and policy-compliant.
            </p>
            <p style={{ margin: "20px 0 0", fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--body)", lineHeight: 1.85 }}>
              We believe that your professional reputation is your most valuable asset. That's why everything we do is designed to protect it while accelerating your growth.
            </p>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: "0 24px 72px", maxWidth: "780px", margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 32px", fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 800, color: "var(--ink)" }}>What We Stand For</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
            {values.map((v) => (
              <div key={v.title} style={{ padding: "28px", borderRadius: "14px", border: "1px solid var(--line)", background: "#fff", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ width: 48, height: 48, borderRadius: "12px", background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  {v.icon}
                </div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>{v.title}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--muted)", lineHeight: 1.75 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: "0 24px 72px", maxWidth: "780px", margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 32px", fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 800, color: "var(--ink)" }}>The Team</h2>
          {team.map((t) => (
            <div key={t.name} style={{ padding: "32px", borderRadius: "16px", border: "1px solid var(--line)", background: "#fff", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #067CCB, #1a56db)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 800, color: "#fff" }}>{t.name[0]}</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 800, color: "var(--ink)" }}>{t.name}</p>
                  <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--teal)", fontWeight: 600 }}>{t.role}</p>
                </div>
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--line)", color: "#0077B5", fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, textDecoration: "none", background: "#fff" }}>
                  <FaLinkedin size={16} /> LinkedIn
                </a>
              </div>
              <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--body)", lineHeight: 1.8 }}>{t.bio}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section style={{ padding: "0 24px 80px", maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ padding: "48px 40px", borderRadius: "16px", background: "var(--teal)", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: 800, color: "#fff" }}>Ready to grow your LinkedIn presence?</h2>
            <p style={{ margin: "0 0 28px", fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              Book a free 30-minute consultation and let's map out a strategy for your goals.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <BookCallButton
                label="Book a Free Call"
                style={{ display: "inline-block", padding: "13px 30px", borderRadius: "10px", background: "#fff", color: "var(--teal)", fontFamily: "var(--font-heading)", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer" }}
              />
              <Link href="/contact"
                style={{ display: "inline-block", padding: "13px 30px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", fontFamily: "var(--font-heading)", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

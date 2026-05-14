"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";
import BookCallButton from "@/components/shared/BookCallButton";
import Chatbot from "@/components/shared/Chatbot";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
import {
  HiCalendarDays,
  HiChatBubbleLeftRight,
  HiCheckBadge,
  HiClipboardDocument,
  HiEnvelope,
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiStar,
  HiShieldCheck,
  HiChartBar,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import {
  FaArrowTrendUp,
  FaArrowRightLong,
  FaHandshake,
  FaRocket,
  FaUsers,
  FaBullseye,
  FaBuilding,
  FaUserTie,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa6";
import { RiInstagramLine, RiTelegramLine, RiTwitterXLine } from "react-icons/ri";

type PartnerLogo = {
  _id: string;
  name: string;
  logo: string;
  status: "active" | "inactive";
};

// ─── Logo Marquee ────────────────────────────────────────────────────────────
function LogoMarquee() {
  const [partners, setPartners] = useState<Array<{ _id: string; name: string; logo: string }>>([]);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch("/api/admin/partners");
        const data = await response.json();
        if (response.ok && data.success) {
          const activePartners = ((data.data || []) as PartnerLogo[])
            .filter((p) => p.status === "active")
            .map(({ _id, name, logo }) => ({ _id, name, logo }));
          setPartners(activePartners);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.error("Failed to fetch partners:", error);
      }
    }
    fetchPartners();
  }, []);

  if (partners.length === 0) return null;

  const perHalf = Math.max(16, Math.ceil(1920 / (partners.length * 170)) * partners.length);
  const half = Array(Math.ceil(perHalf / partners.length)).fill(partners).flat();
  const allItems = [...half, ...half];

  return (
    <section style={{ padding: "24px 0 18px", background: "var(--off)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", marginBottom: "14px", padding: "0 16px" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal-dark)" }}>Trusted By</p>
        <p style={{ margin: "6px 0 0", fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--muted)" }}>Leading teams and organizations</p>
      </div>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to right, var(--off) 0%, transparent 10%, transparent 90%, var(--off) 100%)", zIndex: 2 }} />
      <div style={{ display: "flex", alignItems: "center", gap: "40px", width: "max-content", animation: "marqueeInfinite 30s linear infinite", willChange: "transform" }}>
        {allItems.map((partner, i) => (
          <div key={`${partner._id}-${i}`} style={{ flex: "0 0 auto", width: "130px", height: "54px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
            <img src={partner.logo} alt={partner.name} style={{ maxWidth: "110px", maxHeight: "44px", objectFit: "contain" }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes marqueeInfinite { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const audiences = [
  { icon: <FaBuilding size={20} color="var(--teal)" />, title: "B2B Startups", desc: "Build a qualified pipeline without a large sales team." },
  { icon: <FaUserTie size={20} color="var(--teal)" />, title: "Founders & Consultants", desc: "Position yourself as the go-to expert and attract inbound clients." },
  { icon: <FaBriefcase size={20} color="var(--teal)" />, title: "Digital Agencies", desc: "Add LinkedIn as a consistent client acquisition channel." },
  { icon: <FaUsers size={20} color="var(--teal)" />, title: "Recruiters & HR Teams", desc: "Source top talent faster using LinkedIn's full potential." },
  { icon: <FaChartLine size={20} color="var(--teal)" />, title: "SaaS Companies", desc: "Reach decision-makers with targeted outreach that converts." },
  { icon: <FaBullseye size={20} color="var(--teal)" />, title: "SDR & Sales Teams", desc: "Scale outreach volume without risking your own account." },
];

const services = [
  { icon: <FaHandshake size={20} color="var(--teal)" />, title: "Account Management", desc: "Done-for-you LinkedIn outreach. We manage campaigns, targeting, and reporting so you focus on closing deals.", href: "/account-management", price: "From $50/mo" },
  { icon: <FaRocket size={20} color="var(--teal)" />, title: "LinkedIn Connections", desc: "Real, targeted connections delivered safely. Grow your network with the right people in your industry.", href: "/followers-checkout", price: "From $2" },
  { icon: <FaArrowTrendUp size={20} color="var(--teal)" />, title: "Account Recovery", desc: "95% success rate restoring restricted or banned LinkedIn accounts. Diagnosis + roadmap + prevention.", href: "/account-recovery", price: "Get a diagnosis" },
  { icon: <FaUsers size={20} color="var(--teal)" />, title: "Hiring Support", desc: "Find qualified candidates faster using LinkedIn's talent pool with our shortlisting support.", href: "/hiring-support", price: "Custom" },
  { icon: <FaBullseye size={20} color="var(--teal)" />, title: "Lead Generation", desc: "ICP-matched B2B lead lists and decision-maker outreach — delivered and verified.", href: "/lead-generation", price: "Custom" },
];

const stats = [
  { value: "500", suffix: "+", label: "Clients Supported", icon: <FaUsers size={18} color="var(--teal)" /> },
  { value: "98", suffix: "%", label: "Satisfaction Rate", icon: <HiStar size={18} color="var(--teal)" /> },
  { value: "48", suffix: "h", label: "Avg. Onboarding", icon: <HiCalendarDays size={18} color="var(--teal)" /> },
  { value: "95", suffix: "%", label: "Account Recovery Rate", icon: <HiShieldCheck size={18} color="var(--teal)" /> },
];

const testimonials = [
  {
    quote: "We went from 0 to 8 qualified discovery calls per month in just 6 weeks. The outreach strategy TechInRent built is now our #1 acquisition channel.",
    name: "Rahul M.",
    role: "Founder, B2B SaaS Startup",
    rating: 5,
  },
  {
    quote: "My LinkedIn account was restricted for 3 months. TechInRent had it fully recovered and back to normal in 4 days. I didn't think it was possible.",
    name: "Priya S.",
    role: "Senior HR Manager",
    rating: 5,
  },
  {
    quote: "The lead quality from their outreach is significantly better than cold email. We're booking more calls with less effort and the reporting is crystal clear.",
    name: "Arjun T.",
    role: "Owner, Digital Agency",
    rating: 5,
  },
];

const processSteps = [
  { num: "01", title: "Audit & Positioning", text: "We review your profile, offer, and target audience to define a message-market fit that converts." },
  { num: "02", title: "Execution Setup", text: "Campaign structure, outreach workflow, and reporting configured around your goals — live in 48 hours." },
  { num: "03", title: "Weekly Optimisation", text: "We refine what works, cut what doesn't, and keep results compounding week over week." },
];

const trustPoints = [
  { icon: <HiShieldCheck size={20} color="var(--teal)" />, title: "Policy-Safe Execution", text: "Every workflow prioritises account health and long-term brand trust. No shortcuts that get you restricted." },
  { icon: <HiClipboardDocument size={20} color="var(--teal)" />, title: "Clear Reporting", text: "Measurable updates on activity, conversations, and results — no vague promises or mystery metrics." },
  { icon: <HiChatBubbleLeftRight size={20} color="var(--teal)" />, title: "Human Strategy Support", text: "You work with people, not just tools. We help translate execution into real pipeline and client growth." },
  { icon: <HiChartBar size={20} color="var(--teal)" />, title: "Fast Launch", text: "Average 48-hour onboarding. From sign-up to live outreach campaign in two days." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomeClient() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); } }); },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((n) => revealObserver.observe(n));

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = el.dataset.target || "";
            const suffix = target.replace(/[0-9]/g, "");
            const num = parseInt(target);
            if (!isNaN(num)) {
              let start = 0;
              const step = 16;
              const increment = num / (1400 / step);
              const timer = setInterval(() => {
                start += increment;
                if (start >= num) { start = num; clearInterval(timer); }
                el.textContent = Math.round(start) + suffix;
              }, step);
            }
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".count-up").forEach((n) => countObserver.observe(n));
    return () => { revealObserver.disconnect(); countObserver.disconnect(); };
  }, []);

  return (
    <>
      <Navbar />
      <main>

        {/* ── 1. HERO — What do you do? ── */}
        <section style={{ padding: "130px 5% 80px", background: "radial-gradient(ellipse at 80% 0%, rgba(6,124,203,0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 100%, rgba(8,148,240,0.06) 0%, transparent 50%), var(--white)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ maxWidth: "900px", width: "100%", margin: "0 auto", textAlign: "center" }}>

            {/* Badge */}
            <span className="animate-fade-down" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 16px", borderRadius: "999px", background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal-dark)", fontFamily: "var(--font-body, sans-serif)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <HiSparkles size={12} color="var(--teal)" /> LinkedIn Growth & B2B Lead Generation
            </span>

            {/* Headline */}
            <h1 className="animate-fade-down animate-delay-1" style={{ marginTop: "20px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(36px, 5.5vw, 66px)", lineHeight: 1.07, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" }}>
              We Help Businesses Generate<br />
              <span style={{ color: "var(--teal)" }}>Qualified B2B Leads</span> on LinkedIn
            </h1>

            {/* Sub-headline */}
            <p className="animate-fade-down animate-delay-2" style={{ margin: "22px auto 0", maxWidth: "680px", fontFamily: "var(--font-body, sans-serif)", fontSize: "18px", lineHeight: 1.75, color: "var(--muted)" }}>
              Done-for-you LinkedIn outreach, connection growth, account recovery, and lead generation — so your team gets steady, qualified opportunities every week.
            </p>

            {/* CTAs */}
            <div className="animate-fade-down animate-delay-3" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginTop: "36px" }}>
              <BookCallButton
                label="Book a Free Consultation"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px", borderRadius: "10px", background: "var(--teal)", color: "#fff", fontFamily: "var(--font-heading, sans-serif)", fontWeight: 700, fontSize: "15px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(6,124,203,0.25)" }}
              />
              <Link href="/account-management" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "10px", background: "var(--white)", color: "var(--ink)", fontFamily: "var(--font-heading, sans-serif)", fontWeight: 700, fontSize: "15px", textDecoration: "none", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
                See Services <HiArrowRight size={16} />
              </Link>
            </div>

            {/* Quick trust signals */}
            <div className="animate-fade-down animate-delay-3" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginTop: "40px" }}>
              {["500+ clients served", "98% satisfaction rate", "48h onboarding", "No contracts"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--muted)", fontWeight: 500 }}>
                  <HiCheckCircle size={15} color="var(--teal)" /> {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Partner Logos ── */}
        <LogoMarquee />

        {/* ── 2. WHO IS IT FOR ── */}
        <section className="reveal" style={{ padding: "96px 5%", background: "var(--off)", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <p style={{ margin: 0, color: "var(--teal)", fontFamily: "var(--font-body, sans-serif)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "12px" }}>Who It's For</p>
              <h2 style={{ margin: "14px 0 0", fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.12, color: "var(--ink)" }}>
                Built for professionals who need results from LinkedIn
              </h2>
              <p style={{ margin: "16px auto 0", maxWidth: "580px", fontFamily: "var(--font-body, sans-serif)", fontSize: "16px", color: "var(--muted)", lineHeight: 1.7 }}>
                Whether you&apos;re scaling outreach, sourcing talent, or recovering a restricted account — we have a service built around your situation.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
              {audiences.map((a) => (
                <div key={a.title} className="card-hover" style={{ padding: "24px", borderRadius: "14px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-xs)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "12px", background: "var(--teal-pale)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                    {a.icon}
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>{a.title}</h3>
                  <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", fontSize: "14px", color: "var(--muted)", lineHeight: 1.65 }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="reveal" id="goals" style={{ padding: "96px 5%", background: "var(--white)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <p style={{ margin: 0, color: "var(--teal)", fontFamily: "var(--font-body, sans-serif)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "12px" }}>Services</p>
              <h2 style={{ margin: "14px 0 0", fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.12, color: "var(--ink)" }}>
                Everything you need to grow on LinkedIn
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {services.map((s) => (
                <article key={s.title} className="card-hover" style={{ display: "flex", flexDirection: "column", padding: "28px", borderRadius: "16px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "12px", background: "var(--teal-pale)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {s.icon}
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>{s.title}</h3>
                  <p style={{ margin: "0 0 20px", fontFamily: "var(--font-body, sans-serif)", fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", fontWeight: 700, color: "var(--teal)" }}>{s.price}</span>
                    <Link href={s.href} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", background: "var(--ink)", color: "#fff", fontFamily: "var(--font-heading, sans-serif)", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                      Get Started <FaArrowRightLong size={11} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY TRUST US ── */}
        <section className="reveal" id="why" style={{ padding: "96px 5%", background: "linear-gradient(180deg, var(--off) 0%, #eef6f5 100%)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <p style={{ margin: 0, color: "var(--teal)", fontFamily: "var(--font-body, sans-serif)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "12px" }}>Why Trust Us</p>
              <h2 style={{ margin: "14px 0 0", fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.12, color: "var(--ink)" }}>
                Results that speak for themselves
              </h2>
              <p style={{ margin: "14px auto 0", maxWidth: "560px", fontFamily: "var(--font-body, sans-serif)", fontSize: "16px", color: "var(--muted)", lineHeight: 1.7 }}>
                Over 500 clients trust TechInRent to manage their LinkedIn growth, recover their accounts, and fill their pipeline.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "64px" }}>
              {stats.map((s) => (
                <div key={s.label} className="card-hover" style={{ padding: "28px 20px", borderRadius: "16px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "12px", background: "var(--teal-pale)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {s.icon}
                    </div>
                  </div>
                  <p className="count-up" data-target={s.value + s.suffix} style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "38px", fontWeight: 800, color: "var(--teal)", lineHeight: 1 }}>{s.value + s.suffix}</p>
                  <p style={{ margin: "8px 0 0", fontFamily: "var(--font-body, sans-serif)", fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "64px" }}>
              {testimonials.map((t) => (
                <div key={t.name} className="card-hover" style={{ padding: "28px", borderRadius: "16px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {Array(t.rating).fill(0).map((_, i) => <HiStar key={i} size={16} color="#f59e0b" />)}
                  </div>
                  <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", fontSize: "15px", color: "var(--body)", lineHeight: 1.75, fontStyle: "italic", flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>{t.name}</p>
                    <p style={{ margin: "3px 0 0", fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--muted)" }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {trustPoints.map((p) => (
                <div key={p.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", borderRadius: "14px", background: "#fff", border: "1px solid var(--line)" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "10px", background: "var(--teal-pale)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 style={{ margin: "0 0 6px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>{p.title}</h4>
                    <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--muted)", lineHeight: 1.65 }}>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="reveal" id="how" style={{ padding: "96px 5%", background: "var(--off)", borderTop: "1px solid var(--line)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <p style={{ margin: 0, color: "var(--teal)", fontFamily: "var(--font-body, sans-serif)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "12px" }}>Process</p>
              <h2 style={{ margin: "14px 0 0", fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.12, color: "var(--ink)" }}>
                From sign-up to results in 3 steps
              </h2>
            </div>

            <div className="steps-grid" style={{ display: "grid", gap: "20px" }}>
              {processSteps.map((step) => (
                <article key={step.num} className="card-hover" style={{ display: "flex", gap: "24px", alignItems: "flex-start", padding: "32px", borderRadius: "18px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "14px", background: "var(--teal-pale)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-heading, sans-serif)", fontWeight: 800, fontSize: "20px", color: "var(--teal)" }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "20px", fontWeight: 700, color: "var(--ink)" }}>{step.title}</h3>
                    <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", color: "var(--muted)", lineHeight: 1.75, fontSize: "15px" }}>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="reveal" style={{ padding: "96px 5%", background: "var(--white)", borderTop: "1px solid var(--line)" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ margin: "0 0 16px", fontFamily: "var(--font-body, sans-serif)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)" }}>Get Started Today</p>
            <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.12, color: "var(--ink)" }}>
              Book a Free LinkedIn Strategy Call
            </h2>
            <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body, sans-serif)", fontSize: "17px", color: "var(--muted)", lineHeight: 1.7, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
              In 30 minutes we will audit your LinkedIn presence, identify the biggest growth opportunity, and give you a clear action plan — completely free, no commitment.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
              <BookCallButton
                label="Book Free Consultation"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px", borderRadius: "10px", background: "var(--teal)", color: "#fff", fontFamily: "var(--font-heading, sans-serif)", fontWeight: 700, fontSize: "15px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(6,124,203,0.25)" }}
              />
              <a href="https://wa.me/917898711748" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "10px", background: "transparent", color: "var(--ink)", fontFamily: "var(--font-heading, sans-serif)", fontWeight: 700, fontSize: "15px", textDecoration: "none", border: "1px solid var(--line)" }}>
                <FaWhatsapp size={18} /> WhatsApp Us
              </a>
            </div>
            <p style={{ marginTop: "24px", fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--muted)" }}>
              Or email us at{" "}
              <a href="mailto:vibhanshu@techinrent.com" style={{ color: "var(--teal)", textDecoration: "underline" }}>vibhanshu@techinrent.com</a>
            </p>
          </div>
        </section>

        {/* ── Contact links ── */}
        <section id="contact" className="reveal" style={{ padding: "72px 5%", background: "var(--white)" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ margin: "0 0 28px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>Reach us on any platform</p>
            <div className="contact-links-row" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
              {[
                { href: "mailto:vibhanshu@techinrent.com", icon: <HiEnvelope size={18} />, label: "Email", sub: "vibhanshu@techinrent.com" },
                { href: "https://wa.me/917898711748", icon: <FaWhatsapp size={18} />, label: "WhatsApp", sub: "+91 78987 11748" },
                { href: "https://t.me/techinrentadmin", icon: <RiTelegramLine size={18} />, label: "Telegram", sub: "@techinrentadmin" },
                { href: "https://twitter.com/techinrent", icon: <RiTwitterXLine size={18} />, label: "Twitter", sub: "@techinrent" },
                { href: "https://instagram.com/techinrent", icon: <RiInstagramLine size={18} />, label: "Instagram", sub: "@techinrent" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "14px 18px", borderRadius: "12px", textDecoration: "none", background: "var(--white)", border: "1px solid var(--line)", boxShadow: "0 2px 12px rgba(13,31,30,0.06)", flex: "1 1 auto", minWidth: "180px", maxWidth: "210px" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "9px", background: "var(--teal-pale)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal)", flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ textAlign: "left", overflow: "hidden" }}>
                    <div style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>{item.label}</div>
                    <div style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "11px", color: "var(--muted)", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppFloat />
      <Chatbot />
    </>
  );
}

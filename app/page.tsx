"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

/* ─── SVG Icons ─── */
const IconCalendar = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const IconOutreach = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const IconShield = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconTrend = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const IconClipboard = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);
const IconBolt = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const IconChat = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
const IconBadge = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const IconTelegram = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);
const IconTwitter = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);
const IconInstagram = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.8} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2} />
  </svg>
);

/* ─── Data ─── */
const tickerItems = [
  "LinkedIn Outreach", "Account Recovery", "Follower Growth",
  "Pipeline Generation", "ICP Targeting", "Performance-Based",
  "B2B Sales Partner", "Policy-Safe Methods",
];

const goals = [
  {
    icon: <IconOutreach />,
    num: "01 — Outreach",
    title: "Scale Your Outreach",
    desc: "Managed outbound systems built for high-intent meetings. Done-for-you setup, ICP-targeted strategy, and weekly performance tracking from day one.",
    cta: "Book Demo",
    href: "#contact",
  },
  {
    icon: <IconShield />,
    num: "02 — Recovery",
    title: "Recover Your Account",
    desc: "Structured diagnosis and a clear roadmap to restore account health — safely and permanently, without risking further restrictions.",
    cta: "Schedule Call",
    href: "#contact",
  },
  {
    icon: <IconTrend />,
    num: "03 — Growth",
    title: "Grow Your Audience",
    desc: "Build lasting brand trust with consistent follower growth, profile positioning, and a presence that converts visitors into buyers over time.",
    cta: "Buy Now",
    href: "#contact",
  },
];

const services = [
  {
    icon: <IconOutreach />,
    tag: "Service 01",
    title: "LinkedIn Outreach & Management",
    desc: "Fully managed outbound systems for B2B professionals. We handle strategy, execution, and optimization — you receive qualified conversations ready to convert.",
    pills: ["Done-for-you setup", "ICP-targeted strategy", "Weekly tracking", "A/B optimization"],
    cta: "Book Demo →",
    href: "#contact",
  },
  {
    icon: <IconTrend />,
    tag: "Service 02",
    title: "LinkedIn Follower Growth",
    desc: "Scale your visibility and profile authority with a consistent, safe growth framework. Build the audience that converts to clients and establishes long-term brand trust.",
    pills: ["Profile positioning", "Targeted connections", "Engagement boost", "Authority building"],
    cta: "Buy Now →",
    href: "#contact",
  },
  {
    icon: <IconShield />,
    tag: "Service 03",
    title: "Account Recovery Support",
    desc: "Facing restrictions or at risk of a ban? We diagnose your account health, build a clear recovery roadmap, and walk you through every step safely and permanently.",
    pills: ["Full diagnosis", "Recovery roadmap", "Safe practices", "1-on-1 support"],
    cta: "Schedule Call →",
    href: "#contact",
  },
];

const steps = [
  { icon: <IconClipboard />, n: "01", title: "Share Requirement", desc: "Tell us your goal, ICP, and timeline. We understand your business context before executing anything." },
  { icon: <IconBolt />, n: "02", title: "We Execute", desc: "Our team runs outreach, growth, or recovery using proven, policy-safe systems at full scale." },
  { icon: <IconChat />, n: "03", title: "Leads Delivered", desc: "Qualified prospects land in your inbox, ready to have a real conversation about your offer." },
  { icon: <IconBadge />, n: "04", title: "You Close & Scale", desc: "You convert the pipeline we deliver. We maintain consistent weekly flow so growth never plateaus." },
];

const whyCards = [
  { emoji: "🛡️", title: "Policy-Safe Methods", desc: "Every system complies with LinkedIn's terms. Zero risk of permanent bans or account termination from our work." },
  { emoji: "💰", title: "Performance-Based Pricing", desc: "For client acquisition, you pay only on successful conversions. Our success is tied directly to yours." },
  { emoji: "📊", title: "Transparent Reporting", desc: "Weekly performance dashboards so you always know exactly what's working and what results are incoming." },
  { emoji: "⚡", title: "48-Hour Campaign Launch", desc: "Campaigns go live within 48 hours of onboarding. No lengthy delays, no endless meetings before action." },
];

const contacts = [
  { icon: <IconMail />, name: "Email", val: "hello@techinrent.com", cta: "Send →", href: "mailto:hello@techinrent.com" },
  { icon: <IconChat />, name: "WhatsApp", val: "+91 78987 11748", cta: "Chat →", href: "https://wa.me/917898711748" },
  { icon: <IconTelegram />, name: "Telegram", val: "@techinrentadmin", cta: "Open →", href: "https://t.me/techinrentadmin" },
  { icon: <IconTwitter />, name: "Twitter / X", val: "@techinrent", cta: "Follow →", href: "https://twitter.com/techinrent" },
  { icon: <IconInstagram />, name: "Instagram", val: "@techinrent", cta: "Follow →", href: "https://instagram.com/techinrent" },
];

/* ─── Page Component ─── */
export default function HomePage() {
  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const animRing = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top = ry.current + "px";
      }
      raf = requestAnimationFrame(animRing);
    };
    raf = requestAnimationFrame(animRing);

    const hoverEls = document.querySelectorAll<HTMLElement>("a,button,[class*='card'],[class*='step'],[class*='why-card']");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        curRef.current?.classList.add("big");
        ringRef.current?.classList.add("big");
      });
      el.addEventListener("mouseleave", () => {
        curRef.current?.classList.remove("big");
        ringRef.current?.classList.remove("big");
      });
    });

    // Scroll reveal
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll(".reveal").forEach((r) => obs.observe(r));

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div className="cur" ref={curRef} />
      <div className="cur-ring" ref={ringRef} />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "var(--off)", paddingTop: "100px", paddingBottom: "60px", padding: "100px 5% 60px" }}
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute"
            style={{
              right: "-120px", top: "-80px", width: "600px", height: "600px", borderRadius: "50%",
              background: "radial-gradient(circle,rgba(14,122,110,.07),transparent 65%)",
            }}
          />
          <div
            className="absolute"
            style={{
              left: "-80px", bottom: "-100px", width: "400px", height: "400px", borderRadius: "50%",
              background: "radial-gradient(circle,rgba(14,122,110,.05),transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(14,122,110,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,122,110,.04) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="shape absolute rounded-full animate-float1" style={{ width: 18, height: 18, top: "18%", left: "8%", background: "linear-gradient(135deg,var(--teal-pale),var(--teal-pale2))", opacity: 0.6 }} />
          <div className="shape absolute rounded-full animate-float2" style={{ width: 10, height: 10, top: "35%", right: "12%", background: "linear-gradient(135deg,var(--teal-pale),var(--teal-pale2))", opacity: 0.6 }} />
          <div className="shape absolute rounded-full animate-float3" style={{ width: 14, height: 14, bottom: "25%", left: "15%", background: "linear-gradient(135deg,var(--teal-pale),var(--teal-pale2))", opacity: 0.6 }} />
          <div className="shape absolute rounded-full animate-float4" style={{ width: 8, height: 8, top: "55%", right: "8%", background: "linear-gradient(135deg,var(--teal-pale),var(--teal-pale2))", opacity: 0.6 }} />
        </div>

        <div className="relative z-[2] text-center max-w-[860px] w-full mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full text-[12px] font-semibold uppercase tracking-[0.08em] mb-8 animate-fade-down"
            style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal-dark)", padding: "7px 18px" }}
          >
            <span className="w-[7px] h-[7px] rounded-full animate-pulse-dot" style={{ background: "var(--teal)" }} />
            LinkedIn Growth Specialists
          </div>

          {/* H1 */}
          <h1
            className="font-extrabold leading-[1.05] animate-fade-down animate-delay-1"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(42px,6vw,80px)",
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            Scale Your LinkedIn.<br />
            Land{" "}
            <span className="relative inline-block" style={{ color: "var(--teal)" }}>
              High-Intent
              <span
                className="absolute left-0 right-0 animate-line-grow"
                style={{ bottom: "-4px", height: "3px", background: "linear-gradient(90deg,var(--teal),var(--teal-light))", borderRadius: "2px" }}
              />
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,var(--teal-deep),var(--teal-mid))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Clients.
            </span>
          </h1>

          <p
            className="text-[17px] leading-[1.75] max-w-[580px] mx-auto mt-6 font-normal animate-fade-down animate-delay-2"
            style={{ color: "var(--muted)" }}
          >
            Struggling to scale outreach or facing account restrictions? We grow your LinkedIn safely — managed systems, recovery support, and conversion-focused execution.
          </p>

          {/* CTAs */}
          <div className="flex gap-[14px] flex-wrap justify-center mt-11 animate-fade-down animate-delay-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-[9px] text-white rounded-[10px] font-bold no-underline transition-all duration-200 cursor-none"
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontSize: "15px",
                padding: "14px 30px",
                background: "var(--teal)",
                boxShadow: "0 6px 24px rgba(14,122,110,.3)",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal-dark)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <IconCalendar /> Book Demo
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-[9px] text-white rounded-[10px] font-bold no-underline transition-all duration-200 cursor-none"
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontSize: "15px",
                padding: "13px 28px",
                background: "var(--amber)",
                boxShadow: "0 6px 20px rgba(232,149,42,.25)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <IconUsers /> Get Clients
            </a>
            <a
              href="#goals"
              className="inline-flex items-center gap-[9px] rounded-[10px] font-semibold no-underline transition-all duration-200 cursor-none"
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontSize: "15px",
                padding: "13px 28px",
                background: "var(--white)",
                color: "var(--ink)",
                border: "1.5px solid var(--line)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal-border)"; (e.currentTarget as HTMLElement).style.color = "var(--teal)"; (e.currentTarget as HTMLElement).style.background = "var(--teal-pale)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; (e.currentTarget as HTMLElement).style.background = "var(--white)"; }}
            >
              View Services →
            </a>
          </div>

          {/* Stats bar */}
          <div
            className="flex items-center justify-center mt-[60px] overflow-hidden rounded-[16px] animate-fade-down animate-delay-4 mx-auto"
            style={{
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "0 4px 24px rgba(14,122,110,.08)",
              maxWidth: "680px",
            }}
          >
            {[
              { num: "500+", label: "Clients Served" },
              { num: "98%", label: "Success Rate" },
              { num: "3×", label: "Avg. Growth" },
              { num: "48h", label: "Launch Time" },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                className="flex-1 text-center py-6 px-5"
                style={{ borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}
              >
                <div
                  className="text-[28px] font-extrabold leading-none mb-[5px]"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--teal)" }}
                >
                  {s.num}
                </div>
                <div className="text-[12px] font-medium tracking-[0.02em]" style={{ color: "var(--muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div style={{ background: "var(--teal-deep)", padding: "14px 0", overflow: "hidden" }}>
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-[18px] px-8 whitespace-nowrap"
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontSize: "11.5px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.55)",
              }}
            >
              {item} <span style={{ color: "var(--teal-light)", fontSize: "9px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ GOALS ═══ */}
      <section id="goals" className="reveal" style={{ background: "var(--off)", padding: "100px 5%" }}>
        <div className="grid gap-[60px] mb-14" style={{ gridTemplateColumns: "1fr 1fr", alignItems: "end" }}>
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] mb-[18px]"
              style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal-dark)", padding: "6px 16px" }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: "var(--teal)" }} />
              Choose Your Path
            </div>
            <h2 style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.025em" }}>
              What&apos;s Your<br /><em style={{ fontStyle: "normal", color: "var(--teal)" }}>Goal?</em>
            </h2>
            <p className="text-[16px] leading-[1.75] font-normal mt-[14px] max-w-[500px]" style={{ color: "var(--muted)" }}>
              Pick the outcome you&apos;re working toward — we map the right execution plan from there.
            </p>
          </div>
          <div
            className="text-right pl-5"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(16px,2vw,22px)",
              fontWeight: 600,
              color: "var(--muted2)",
              lineHeight: 1.5,
              borderLeft: "3px solid var(--teal-border)",
            }}
          >
            &ldquo;The right strategy,<br />executed precisely,<br />every single time.&rdquo;
          </div>
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {goals.map((g) => (
            <div
              key={g.num}
              className="goal-card relative overflow-hidden rounded-[16px] cursor-none transition-all duration-[280ms]"
              style={{ background: "var(--white)", border: "1.5px solid var(--line)", padding: "36px 28px" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--teal-border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(14,122,110,.1)";
                const bar = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".goal-top-bar");
                if (bar) bar.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                const bar = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".goal-top-bar");
                if (bar) bar.style.transform = "scaleX(0)";
              }}
            >
              <div
                className="goal-top-bar absolute top-0 left-0 right-0"
                style={{ height: "3px", background: "linear-gradient(90deg,var(--teal),var(--teal-light))", transform: "scaleX(0)", transformOrigin: "left", transition: "transform .32s ease" }}
              />
              <div
                className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center mb-6 transition-colors duration-[250ms]"
                style={{ background: "var(--teal-pale)" }}
              >
                <span style={{ color: "var(--teal)" }}>{g.icon}</span>
              </div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.12em] mb-[10px]"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--muted2)" }}
              >
                {g.num}
              </div>
              <div
                className="text-[20px] font-bold mb-3"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.01em" }}
              >
                {g.title}
              </div>
              <p className="text-[14px] leading-[1.72] mb-7" style={{ color: "var(--muted)" }}>{g.desc}</p>
              <a
                href={g.href}
                className="inline-flex items-center gap-[7px] text-[13px] font-bold no-underline transition-all duration-200 cursor-none"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--teal)", letterSpacing: "0.02em" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "12px"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "7px"; }}
              >
                {g.cta} <IconArrow />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="reveal" style={{ background: "var(--white)", padding: "100px 5%" }}>
        <div className="grid gap-[80px] mt-[60px]" style={{ gridTemplateColumns: "360px 1fr", alignItems: "start" }}>
          {/* Sidebar */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div
              className="inline-flex items-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] mb-[18px]"
              style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal-dark)", padding: "6px 16px" }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: "var(--teal)" }} />
              Premium Services
            </div>
            <h2 style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.025em" }}>
              LinkedIn Growth<br /><em style={{ fontStyle: "normal", color: "var(--teal)" }}>Services</em>
            </h2>
            <p className="text-[16px] leading-[1.75] font-normal mt-4 mb-8 max-w-[500px]" style={{ color: "var(--muted)" }}>
              Tailored services designed for measurable, real-world outcomes. Every system is policy-safe and built to scale.
            </p>
            <div
              className="rounded-[14px] p-7"
              style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)" }}
            >
              <p className="text-[14px] leading-[1.7] mb-[18px]" style={{ color: "var(--body)" }}>
                <strong style={{ color: "var(--teal-dark)", fontWeight: 600 }}>Not sure which service is right for you?</strong> Book a free 15-min strategy call and we&apos;ll map the perfect plan for your goals.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-white rounded-[8px] font-bold no-underline transition-all duration-200 cursor-none"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif", fontSize: "13.5px", padding: "11px 22px", background: "var(--teal)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal-dark)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal)"; }}
              >
                Free Strategy Call →
              </a>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {services.map((s) => (
              <div
                key={s.tag}
                className="svc-card relative overflow-hidden rounded-[16px] cursor-none transition-all duration-[280ms]"
                style={{ background: "var(--off)", border: "1.5px solid var(--line)", padding: "32px" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--teal-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(14,122,110,.09)";
                  (e.currentTarget as HTMLElement).style.background = "var(--white)";
                  const bar = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".svc-left-bar");
                  if (bar) bar.style.transform = "scaleY(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.background = "var(--off)";
                  const bar = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".svc-left-bar");
                  if (bar) bar.style.transform = "scaleY(0)";
                }}
              >
                <div
                  className="svc-left-bar absolute left-0 top-0 bottom-0"
                  style={{ width: "3px", background: "linear-gradient(180deg,var(--teal),var(--teal-light))", transform: "scaleY(0)", transformOrigin: "top", transition: "transform .32s ease" }}
                />
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-[46px] h-[46px] rounded-[12px] flex items-center justify-center"
                    style={{ background: "var(--teal-pale)" }}
                  >
                    <span style={{ color: "var(--teal)" }}>{s.icon}</span>
                  </div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: "var(--muted2)" }}
                  >
                    {s.tag}
                  </span>
                </div>
                <div
                  className="text-[20px] font-bold mb-[10px]"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </div>
                <p className="text-[14.5px] leading-[1.72] mb-[22px]" style={{ color: "var(--muted)" }}>{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-[26px]">
                  {s.pills.map((p) => (
                    <span
                      key={p}
                      className="text-[12px] font-medium rounded-full px-[13px] py-[5px]"
                      style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal-dark)" }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <a
                  href={s.href}
                  className="inline-flex items-center gap-2 text-white rounded-[8px] font-bold no-underline transition-all duration-200 cursor-none"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif", fontSize: "13px", padding: "10px 22px", background: "var(--teal)", letterSpacing: "0.01em" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal-dark)"; (e.currentTarget as HTMLElement).style.transform = "translateX(3px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal)"; (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; }}
                >
                  {s.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PERFORMANCE CTA ═══ */}
      <div
        className="reveal relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,var(--teal-deep) 0%,var(--ink2) 100%)", padding: "90px 5%" }}
      >
        <div className="absolute" style={{ right: "-80px", top: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(14,122,110,.2),transparent 65%)" }} />
        <div className="absolute" style={{ left: "-60px", bottom: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(25,168,152,.12),transparent 65%)" }} />
        <div
          className="relative z-[2] grid items-center gap-[60px] max-w-[1100px] mx-auto"
          style={{ gridTemplateColumns: "1fr auto" }}
        >
          <div>
            <div
              className="inline-flex items-center gap-[7px] rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] mb-5"
              style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.8)", padding: "6px 16px" }}
            >
              ✦ Zero Risk Offer
            </div>
            <h2
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontSize: "clamp(28px,3.5vw,48px)",
                color: "#fff",
                letterSpacing: "-0.025em",
              }}
            >
              Get Clients Without<br />
              Paying <em style={{ fontStyle: "normal", color: "var(--teal-light)" }}>Upfront</em>
            </h2>
            <p className="text-[15.5px] leading-[1.75] mt-[14px] max-w-[480px]" style={{ color: "rgba(255,255,255,.6)" }}>
              We partner with you as a performance-based sales team. You pay only when we deliver a successfully converted client — complete accountability, zero upfront financial risk.
            </p>
          </div>
          <div className="flex flex-col items-end gap-[14px] flex-shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-[10px] text-white rounded-[10px] font-bold no-underline transition-all duration-200 cursor-none whitespace-nowrap"
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontSize: "15px",
                padding: "15px 32px",
                background: "var(--teal-light)",
                boxShadow: "0 8px 28px rgba(14,122,110,.35)",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal-light)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <IconUsers /> Partner With Us
            </a>
            <span className="text-[12px] text-right tracking-[0.02em]" style={{ color: "rgba(255,255,255,.4)" }}>
              No upfront cost · Pay on successful results only
            </span>
          </div>
        </div>
      </div>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="reveal" style={{ background: "var(--off)", padding: "100px 5%" }}>
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] mb-[18px]"
            style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal-dark)", padding: "6px 16px" }}
          >
            <span className="w-[5px] h-[5px] rounded-full" style={{ background: "var(--teal)" }} />
            The Process
          </div>
          <h2 style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.025em" }}>
            How It <em style={{ fontStyle: "normal", color: "var(--teal)" }}>Works</em>
          </h2>
          <p className="text-[16px] leading-[1.75] font-normal mt-[14px] mx-auto max-w-[500px]" style={{ color: "var(--muted)" }}>
            Simple, transparent — from requirement to results in 4 clear steps.
          </p>
        </div>

        <div className="steps-grid grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          {steps.map((s) => (
            <div key={s.n} className="step px-5 text-center relative z-[1]">
              <div
                className="step-circle w-[76px] h-[76px] rounded-full flex items-center justify-center mx-auto mb-7 relative transition-all duration-[250ms] cursor-none"
                style={{ background: "var(--white)", border: "2px solid var(--teal-border)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--teal)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(14,122,110,.25)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                  const svg = (e.currentTarget as HTMLElement).querySelector<HTMLElement>("svg");
                  if (svg) svg.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--white)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--teal-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  const svg = (e.currentTarget as HTMLElement).querySelector<HTMLElement>("svg");
                  if (svg) svg.style.color = "var(--teal)";
                }}
              >
                <span style={{ color: "var(--teal)" }}>{s.icon}</span>
                <span
                  className="absolute flex items-center justify-center rounded-full text-white font-extrabold"
                  style={{
                    top: "-4px", right: "-4px", width: "22px", height: "22px",
                    background: "var(--teal)",
                    fontFamily: "var(--font-syne), Syne, sans-serif",
                    fontSize: "10px",
                  }}
                >
                  {s.n}
                </span>
              </div>
              <div
                className="text-[16px] font-bold mb-[10px]"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.01em" }}
              >
                {s.title}
              </div>
              <p className="text-[13.5px] leading-[1.7]" style={{ color: "var(--muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section id="why" className="reveal" style={{ background: "var(--white)", padding: "100px 5%" }}>
        <div className="text-center mb-4">
          <div
            className="inline-flex items-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] mb-[18px]"
            style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal-dark)", padding: "6px 16px" }}
          >
            <span className="w-[5px] h-[5px] rounded-full" style={{ background: "var(--teal)" }} />
            Why TechInRent
          </div>
        </div>
        <h2 className="text-center" style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.025em" }}>
          Why Choose <em style={{ fontStyle: "normal", color: "var(--teal)" }}>Us</em>
        </h2>
        <p className="text-[16px] leading-[1.75] font-normal mt-[14px] mx-auto text-center max-w-[500px]" style={{ color: "var(--muted)" }}>
          We&apos;re not just another agency — we&apos;re your strategic partner with real accountability and zero-risk execution.
        </p>

        <div className="grid gap-6 mt-[60px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {whyCards.map((w) => (
            <div
              key={w.title}
              className="why-card flex gap-5 items-start rounded-[16px] cursor-none transition-all duration-[260ms]"
              style={{ background: "var(--off)", border: "1.5px solid var(--line)", padding: "32px" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--teal-border)";
                (e.currentTarget as HTMLElement).style.background = "var(--teal-pale)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 32px rgba(14,122,110,.08)";
                const icon = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".why-icon-box");
                if (icon) icon.style.background = "var(--white)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.background = "var(--off)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                const icon = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".why-icon-box");
                if (icon) icon.style.background = "var(--teal-pale)";
              }}
            >
              <div
                className="why-icon-box w-[52px] h-[52px] rounded-[12px] flex-shrink-0 flex items-center justify-center text-[22px] transition-colors duration-[250ms]"
                style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)" }}
              >
                {w.emoji}
              </div>
              <div>
                <div
                  className="text-[17px] font-bold mb-2"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.01em" }}
                >
                  {w.title}
                </div>
                <p className="text-[14px] leading-[1.72]" style={{ color: "var(--muted)" }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="reveal" style={{ background: "var(--off)", padding: "100px 5%" }}>
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] mb-[18px]"
            style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal-dark)", padding: "6px 16px" }}
          >
            <span className="w-[5px] h-[5px] rounded-full" style={{ background: "var(--teal)" }} />
            Get In Touch
          </div>
          <h2 style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)", letterSpacing: "-0.025em" }}>
            Contact <em style={{ fontStyle: "normal", color: "var(--teal)" }}>Us</em>
          </h2>
          <p className="text-[16px] leading-[1.75] font-normal mt-[14px] mx-auto max-w-[500px]" style={{ color: "var(--muted)" }}>
            Ready to grow? Reach out on any channel — we typically respond within 2 hours during business hours.
          </p>
        </div>

        <div className="grid gap-[14px] max-w-[1000px] mx-auto" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
          {contacts.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel={c.href.startsWith("mailto") ? undefined : "noreferrer"}
              className="c-card relative overflow-hidden rounded-[14px] text-center no-underline block cursor-none transition-all duration-[260ms]"
              style={{ background: "var(--white)", border: "1.5px solid var(--line)", padding: "28px 16px", color: "var(--body)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--teal-border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(14,122,110,.1)";
                const bar = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".c-bottom-bar");
                if (bar) bar.style.transform = "scaleX(1)";
                const iconWrap = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".c-icon-wrap");
                if (iconWrap) { iconWrap.style.background = "var(--teal)"; iconWrap.style.borderColor = "var(--teal)"; }
                const iconSvg = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".c-icon-wrap svg");
                if (iconSvg) iconSvg.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                const bar = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".c-bottom-bar");
                if (bar) bar.style.transform = "scaleX(0)";
                const iconWrap = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".c-icon-wrap");
                if (iconWrap) { iconWrap.style.background = "var(--teal-pale)"; iconWrap.style.borderColor = "var(--teal-border)"; }
                const iconSvg = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".c-icon-wrap svg");
                if (iconSvg) iconSvg.style.color = "var(--teal)";
              }}
            >
              <div
                className="c-bottom-bar absolute bottom-0 left-0 right-0"
                style={{ height: "2px", background: "linear-gradient(90deg,var(--teal),var(--teal-light))", transform: "scaleX(0)", transformOrigin: "left", transition: "transform .3s" }}
              />
              <div
                className="c-icon-wrap w-[48px] h-[48px] rounded-[12px] flex items-center justify-center mx-auto mb-[14px] transition-all duration-[250ms]"
                style={{ background: "var(--teal-pale)", border: "1px solid var(--teal-border)" }}
              >
                <span style={{ color: "var(--teal)" }}>{c.icon}</span>
              </div>
              <div
                className="text-[14px] font-bold mb-[5px]"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--ink)" }}
              >
                {c.name}
              </div>
              <div className="text-[11.5px] mb-[14px] leading-[1.4]" style={{ color: "var(--muted)" }}>{c.val}</div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.08em]"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif", color: "var(--teal)" }}
              >
                {c.cta}
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

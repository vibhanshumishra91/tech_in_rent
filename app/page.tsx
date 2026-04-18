import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {
  FaArrowRightLong as ArrowRight,
  FaArrowTrendUp as TrendingUp,
  FaBriefcase as BriefcaseBusiness,
  FaCircleCheck as BadgeCheck,
  FaHandshake as Handshake,
  FaInstagram,
  FaRocket as Rocket,
  FaShieldHalved as ShieldCheck,
  FaTelegram,
  FaUsers as Users,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import {
  HiOutlineChatBubbleLeftRight as MessagesSquare,
  HiOutlineEnvelope as Mail,
  HiSparkles as Sparkles,
} from "react-icons/hi2";

const serviceCards = [
  {
    icon: Handshake,
    title: "LinkedIn Outreach & Management",
    description: "Managed outreach systems focused on qualified conversations and pipeline growth.",
    points: ["Done-for-you campaign setup", "ICP-targeted outreach strategy", "Weekly performance tracking"],
    ctaLabel: "Book Demo",
    ctaHref: "/demo",
  },
  {
    icon: Rocket,
    title: "LinkedIn Growth",
    description: "Scale visibility and follower growth with a safe, consistent growth framework.",
    points: ["Profile authority positioning", "Steady follower growth", "Designed for long-term brand trust"],
    ctaLabel: "Buy Now",
    ctaHref: "/followers-checkout",
  },
  {
    icon: TrendingUp,
    title: "Account Recovery Support",
    description: "Structured support to restore account health and reduce restriction risks.",
    points: ["Restriction diagnosis support", "Recovery action roadmap", "Preventive policy-safe best practices"],
    ctaLabel: "Schedule Call",
    ctaHref: "/demo",
  },
];

const whyUsCards = [
  { icon: ShieldCheck, title: "No Passwords", description: "Share only your profile URL and goals." },
  { icon: BadgeCheck, title: "Secure & Compliant", description: "Privacy-first workflows built for trust." },
  { icon: MessagesSquare, title: "24/7 Support", description: "Fast responses whenever you need help." },
  { icon: Sparkles, title: "Real Growth", description: "Authentic professional connections, not bots." },
];

const contactCards = [
  { icon: Mail, title: "Email", value: "hello@techinrent.com", href: "mailto:hello@techinrent.com" },
  { icon: FaWhatsapp, title: "WhatsApp", value: "+91 78987 11748", href: "https://wa.me/917898711748" },
  { icon: FaTelegram, title: "Telegram", value: "t.me/techinrentadmin", href: "https://t.me/techinrentadmin" },
  { icon: FaXTwitter, title: "Twitter/X", value: "@techinrent", href: "https://x.com/techinrent" },
  { icon: FaInstagram, title: "Instagram", value: "@techinrent", href: "https://instagram.com/techinrent" },
];

const metrics = [
  { icon: Users, label: "Clients Served", value: "50+" },
  { icon: TrendingUp, label: "Leads Generated", value: "1200+" },
  { icon: BadgeCheck, label: "Avg. Response Rate", value: "92%" },
];

const segmentationCards = [
  {
    icon: Handshake,
    title: "Scale Outreach",
    description: "Managed outbound systems for high-intent meetings and qualified pipeline.",
    ctaLabel: "Book Demo",
    ctaHref: "/demo",
  },
  {
    icon: TrendingUp,
    title: "Recover Account",
    description: "Get structured support to restore account health and continue growth safely.",
    ctaLabel: "Schedule Call",
    ctaHref: "/demo",
  },
  {
    icon: Users,
    title: "Grow Followers",
    description: "Build profile authority with consistent follower growth and positioning support.",
    ctaLabel: "Buy Now",
    ctaHref: "/followers-checkout",
  },
];

const processSteps = [
  { icon: BriefcaseBusiness, title: "Share Requirement", description: "Tell us your goal, ICP, and timeline." },
  { icon: Rocket, title: "We Execute", description: "Our team runs outreach, growth, or recovery workflow." },
  { icon: MessagesSquare, title: "Leads Delivered", description: "Qualified responses and opportunities are delivered." },
  { icon: BadgeCheck, title: "You Close", description: "You convert opportunities and scale with confidence." },
];

const proofCards = [
  { title: "Outreach Performance Snapshot", subtitle: "Meeting bookings and reply flow view" },
  { title: "Growth Dashboard Snapshot", subtitle: "Follower and profile visibility trend" },
  { title: "Recovery Progress Snapshot", subtitle: "Account health and action completion" },
];

export default function Home() {
  const primaryButtonClass =
    "flex h-12 w-full max-w-[26rem] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 text-base font-semibold text-white shadow-lg shadow-slate-300/45 ring-1 ring-slate-700/20 transition duration-300 hover:-translate-y-0.5 hover:from-slate-800 hover:to-slate-700";
  const blueButtonClass =
    "flex h-12 w-full max-w-[26rem] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-sky-900 to-sky-700 px-6 text-base font-semibold text-white shadow-lg shadow-sky-300/35 ring-1 ring-sky-700/20 transition duration-300 hover:-translate-y-0.5 hover:from-sky-800 hover:to-sky-600";
  const greenButtonClass =
    "flex h-12 w-full max-w-[26rem] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-700 px-6 text-base font-semibold text-white shadow-lg shadow-emerald-300/35 ring-1 ring-emerald-700/20 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-600";

  return (
    <div
      id="top"
      className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(148,163,184,0.2),transparent_34%),radial-gradient(circle_at_88%_22%,rgba(56,189,248,0.14),transparent_35%),#f1f5f9] font-bold text-slate-900"
    >
      <Navbar />

      <main>
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 md:pt-20 lg:px-8">
          <div className="animate-fade-up text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
              <BriefcaseBusiness size={14} />
              Growth Services
            </div>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Scale Your LinkedIn Growth & Get High-Intent Clients
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Struggling to scale outreach or facing account restrictions? We help you grow safely with managed
              systems, recovery support, and conversion-focused execution.
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
              <a href="/demo" className={`${primaryButtonClass} max-w-none sm:text-sm`}>
                <ArrowRight size={16} />
                Book Demo
              </a>
              <a href="/sales-partnership" className={`${blueButtonClass} max-w-none sm:text-sm`}>
                <Handshake size={16} />
                Get Clients
              </a>
              <a href="/followers-checkout" className={`${greenButtonClass} max-w-none sm:text-sm`}>
                <Users size={16} />
                Buy Followers
              </a>
            </div>
          </div>

          <div className="animate-fade-up animate-delay-1 mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-300/35 sm:p-8">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Choose Your Goal</h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Pick the path that matches your current objective. We route you to the right conversion flow.
              </p>
            </div>

            <div className="mt-6 grid gap-4 text-left text-sm text-slate-700 md:grid-cols-3">
              {segmentationCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200">
                      <Icon size={15} />
                    </span>
                    <h3 className="mt-3 text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-600">{item.description}</p>
                    <a
                      href={item.ctaHref}
                      className="mt-4 inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-white"
                    >
                      {item.ctaLabel}
                      <ArrowRight size={11} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="animate-fade-up rounded-2xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-6 shadow-md shadow-slate-300/30 sm:p-8">
            <div className="text-center">
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                <Sparkles size={13} />
                Premium Services
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">LinkedIn Growth Services</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Empower your professional growth with tailored services designed for measurable outcomes.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {serviceCards.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className={`rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${index === 1 ? "animate-fade-up animate-delay-1" : index === 2 ? "animate-fade-up animate-delay-2" : "animate-fade-up"}`}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                      <Icon size={18} />
                    </span>
                    <h3 className="mt-3 text-lg font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{service.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <BadgeCheck size={15} className="text-slate-700" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={service.ctaHref}
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                    >
                      {service.ctaLabel}
                      <ArrowRight size={12} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="sales-partner" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="rounded-2xl border border-sky-200 bg-linear-to-r from-sky-50 to-blue-50 p-6 shadow-md shadow-sky-200/30 sm:p-8">
            <div className="text-center">
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                <Handshake size={13} />
                Performance-Based Client Acquisition
              </p>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">Get Clients Without Paying Upfront</h2>
              <p className="mx-auto mt-3 max-w-3xl text-slate-700">
                We work as your sales partner and bring you interested clients. You only pay on successful conversions.
              </p>
              <a href="/sales-partnership" className="mx-auto mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sky-600">
                Partner With Us
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <section id="why-us" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
              <Rocket size={13} />
              Conversion Process
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`rounded-2xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${index % 2 === 0 ? "animate-fade-up animate-delay-1" : "animate-fade-up animate-delay-2"}`}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 sm:pb-10 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-6 shadow-md shadow-slate-300/25 sm:p-8">
            <div className="text-center">
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                <ShieldCheck size={13} />
                Trust & Proof
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Real Results, Real Execution</h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {metrics.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                      <Icon size={18} />
                    </span>
                    <p className="mt-3 text-3xl font-bold text-slate-900">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {proofCards.map((item) => (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-100/70 p-4">
                  <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-xs text-slate-500">
                    Screenshot Placeholder
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-800">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-600">{item.subtitle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-linear-to-r from-slate-900 to-slate-800 p-6 text-center shadow-lg shadow-slate-400/30 sm:p-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Scale Your Business?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
              Start with the right path today and move from traffic to conversion with a clear system.
            </p>
            <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
              <a href="/demo" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                <ArrowRight size={14} />
                Book Demo
              </a>
              <a href="/linkedin-services" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20">
                Start Now
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8">
          <div className="animate-fade-up rounded-2xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-6 shadow-md shadow-slate-300/30 sm:p-8">
            <div className="text-center">
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                <Mail size={13} />
                Let&apos;s Connect
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">Contact Us</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Ready to grow your LinkedIn presence? Reach out and get started today.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {contactCards.map((contact) => {
                const Icon = contact.icon;
                return (
                <a
                  key={contact.title}
                  href={contact.href}
                  target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={contact.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                    <Icon size={16} />
                  </span>
                  <p className="mt-2 text-sm font-semibold">{contact.title}</p>
                  <p className="mt-2 text-xs text-slate-600">{contact.value}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500">
                    Open link
                    <ArrowRight size={12} />
                  </span>
                </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

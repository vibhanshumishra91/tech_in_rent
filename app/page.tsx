import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Handshake,
  Mail,
  MessagesSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

const serviceCards = [
  {
    icon: Handshake,
    title: "Connection Boost",
    description: "Increase visibility with real, targeted connections.",
    points: ["No login required", "100% safe process", "Industry-targeted outreach"],
  },
  {
    icon: Rocket,
    title: "Auto-Growth",
    description: "Organic momentum with managed daily actions.",
    points: ["Reach decision-makers", "Managed by experts", "Enhance profile authority"],
  },
  {
    icon: TrendingUp,
    title: "Followers",
    description: "Build authority through consistent profile growth.",
    points: ["Rapid but steady boost", "Secure and discreet", "Ideal for thought leaders"],
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
  { icon: MessagesSquare, title: "WhatsApp", value: "+91 78987 11748", href: "https://wa.me/917898711748" },
  { icon: Rocket, title: "Telegram", value: "t.me/techinrentadmin", href: "https://t.me/techinrentadmin" },
  { icon: TrendingUp, title: "Twitter/X", value: "@techinrent", href: "https://x.com/techinrent" },
  { icon: Sparkles, title: "Instagram", value: "@techinrent", href: "https://instagram.com/techinrent" },
];

const metrics = [
  { icon: BadgeCheck, label: "Verified Accounts", value: "1000+" },
  { icon: Users, label: "Active Providers", value: "500+" },
  { icon: MessagesSquare, label: "Support Available", value: "24/7" },
];

export default function Home() {
  const primaryButtonClass =
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-5 text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-700";
  const blueButtonClass =
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sky-600";
  const greenButtonClass =
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-600";

  return (
    <div
      id="top"
      className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(148,163,184,0.16),transparent_34%),radial-gradient(circle_at_88%_22%,rgba(56,189,248,0.10),transparent_35%),#f8fafc] text-slate-900"
    >
      <Navbar />

      <main>
        <section className="mx-auto w-full max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pb-14 md:pt-16 lg:px-8">
          <div className="animate-fade-up text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
              <BriefcaseBusiness size={14} />
              Growth Services
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Grow Your LinkedIn Presence
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              No login required, fast delivery, and a fully secure process designed for professionals and teams.
            </p>
          </div>

          <div className="animate-fade-up animate-delay-1 mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <a
              href="#contact"
              className={`${primaryButtonClass} mx-auto max-w-md sm:text-lg`}
            >
              <ArrowRight size={18} />
              Rent LinkedIn Account
            </a>

            <div className="mt-6 grid gap-3 text-left text-sm text-slate-700 sm:grid-cols-2">
              <p className="rounded-lg bg-slate-50 px-3 py-2">Basically for Company</p>
              <p className="rounded-lg bg-slate-50 px-3 py-2">Grow your Business Network</p>
              <p className="rounded-lg bg-slate-50 px-3 py-2">Boost Lead Generation</p>
              <p className="rounded-lg bg-slate-50 px-3 py-2">Expand Client Outreach</p>
              <p className="rounded-lg bg-slate-50 px-3 py-2">Effective Marketing</p>
              <p className="rounded-lg bg-slate-50 px-3 py-2">Smart Recruitment</p>
            </div>
          </div>

          <div className="animate-fade-up animate-delay-2 mt-8 grid items-stretch gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <a
                href="#contact"
                className={`${blueButtonClass} mx-auto md:max-w-sm`}
              >
                <Users size={16} />
                Get LinkedIn Connections Now
              </a>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Expand your professional network</li>
                <li>Get instant visibility</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <a
                href="#contact"
                className={`${greenButtonClass} mx-auto md:max-w-sm`}
              >
                <TrendingUp size={16} />
                Earn Money as a LinkedIn Provider
              </a>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Enjoy passive income</li>
                <li>Monetize your LinkedIn account</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {metrics.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-0.5">
                  <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <Icon size={18} />
                  </span>
                  <p className="mt-3 text-3xl font-bold text-slate-800">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold sm:text-4xl">LinkedIn Growth Services</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Empower your professional growth with tailored services designed for measurable outcomes.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {serviceCards.map((service) => {
                const Icon = service.icon;
                return (
                <article key={service.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{service.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {service.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why-us" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Why Choose TechInRent?</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyUsCards.map((item) => {
              const Icon = item.icon;
              return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                  <Icon size={18} />
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pb-12 sm:pt-14 lg:px-8">
          <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold sm:text-4xl">Contact Us</h2>
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
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700">
                    <Icon size={16} />
                  </span>
                  <p className="mt-2 text-sm font-semibold">{contact.title}</p>
                  <p className="mt-2 text-xs text-slate-600">{contact.value}</p>
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

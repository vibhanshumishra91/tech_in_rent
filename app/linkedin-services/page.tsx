import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { FaArrowRightLong, FaCircleCheck, FaRocket, FaShieldHalved } from "react-icons/fa6";

const IconHandshake = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const services = [
  {
    icon: IconHandshake,
    title: "LinkedIn Outreach & Management",
    description:
      "Managed outbound campaigns designed to generate qualified conversations and predictable pipeline.",
    points: ["ICP research and targeting", "Campaign execution and optimization", "Weekly reporting and insights"],
    ctaLabel: "Book Demo",
    ctaHref: "/demo",
  },
  {
    icon: FaShieldHalved,
    title: "Account Recovery Support",
    description:
      "Guided support for account issues, restrictions, and recovery planning with policy-safe best practices.",
    points: ["Issue diagnosis support", "Recovery action sequence", "Risk prevention guidance"],
    ctaLabel: "Schedule Call",
    ctaHref: "/demo",
  },
  {
    icon: FaRocket,
    title: "LinkedIn Growth",
    description:
      "Build profile authority with consistent growth systems focused on visibility and trust over time.",
    points: ["Profile positioning", "Growth roadmap", "Audience quality focus"],
    ctaLabel: "Buy Now",
    ctaHref: "/followers-checkout",
  },
];

export default function LinkedInServicesPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(148,163,184,0.2),transparent_34%),radial-gradient(circle_at_88%_22%,rgba(56,189,248,0.14),transparent_35%),#f1f5f9] text-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-md shadow-slate-300/30 sm:p-8">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">LinkedIn Growth & Management Solutions</h1>
          <p className="mx-auto mt-4 max-w-3xl text-slate-600">
            Choose the exact service you need and move into a focused execution plan with clear goals and measurable progress.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="grid gap-6 md:grid-cols-2 md:items-center">
                  <div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                      <Icon size={18} />
                    </span>
                    <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{service.title}</h2>
                    <p className="mt-3 text-slate-600">{service.description}</p>
                    <a
                      href={service.ctaHref}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                    >
                      {service.ctaLabel}
                      <FaArrowRightLong size={14} />
                    </a>
                  </div>

                  <ul className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <FaCircleCheck size={14} className="mt-0.5 text-slate-700" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}

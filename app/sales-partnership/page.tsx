import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { FaArrowRightLong, FaBriefcase, FaHandshake, FaRocket, FaUsers } from "react-icons/fa6";

const audiences = ["Agencies", "Startups", "Coaches", "Service Providers"];

const steps = [
  "You share target profile and offer details",
  "We run acquisition and qualify opportunities",
  "You close deals and pay only on results",
];

export default function SalesPartnershipPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(148,163,184,0.2),transparent_34%),radial-gradient(circle_at_88%_22%,rgba(56,189,248,0.14),transparent_35%),#f1f5f9] text-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <section className="rounded-2xl border border-sky-200 bg-linear-to-r from-sky-50 to-blue-50 p-6 text-center shadow-md shadow-sky-200/30 sm:p-8">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
            <FaHandshake size={12} />
            Performance-Based Client Acquisition
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">We Bring You Clients, You Pay on Results</h1>
          <p className="mx-auto mt-4 max-w-3xl text-slate-700">
            No upfront retainers. We partner with your team to generate qualified demand and you pay commission on successful outcomes.
          </p>
          <a
            href="/demo"
            className="mx-auto mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-600"
          >
            Apply Now
            <FaArrowRightLong size={14} />
          </a>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="text-xl font-bold">Who Is This For?</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {audiences.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <FaUsers size={13} className="text-slate-700" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold">How Partnership Works</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold ring-1 ring-slate-200">{index + 1}</p>
                  <p className="mt-3">{step}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Pricing Model</h2>
          <p className="mt-3 text-slate-700">No upfront cost. Only performance-based commission on successful client conversions.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                <FaBriefcase size={14} />
                Zero Upfront Retainer
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                <FaRocket size={14} />
                Commission On Results
              </p>
            </div>
          </div>
          <a
            href="/demo"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Apply For Partnership
            <FaArrowRightLong size={14} />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import LeadGenerationClient from "./LeadGenerationClient";

export const metadata: Metadata = {
  title: "B2B Lead Generation — Targeted LinkedIn Leads",
  description:
    "Get verified B2B leads from LinkedIn. TechInRent delivers targeted contacts matching your ideal customer profile — industry, role, location, and company size. Submit your request today.",
  alternates: { canonical: "https://techinrent.com/lead-generation" },
  openGraph: {
    title: "B2B Lead Generation from LinkedIn | TechInRent",
    description:
      "Verified B2B contacts from LinkedIn matching your ICP. Specify industry, role, location — we deliver qualified leads.",
    url: "https://techinrent.com/lead-generation",
  },
};

export default function Page() {
  return <LeadGenerationClient />;
}

import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "LinkedIn Growth & B2B Lead Generation Services",
  description:
    "TechInRent delivers done-for-you LinkedIn outreach, B2B lead generation, account recovery, and hiring support. 500+ clients. Policy-safe. Live in 48 hours.",
  alternates: { canonical: "https://techinrent.com" },
  openGraph: {
    title: "TechInRent | LinkedIn Growth & B2B Lead Generation",
    description:
      "Done-for-you LinkedIn outreach, B2B lead generation, account recovery, and hiring support. 500+ clients served. Policy-safe. 48h onboarding.",
    url: "https://techinrent.com",
  },
};

export default function Page() {
  return <HomeClient />;
}

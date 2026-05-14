import type { Metadata } from "next";
import HiringSupportClient from "./HiringSupportClient";

export const metadata: Metadata = {
  title: "LinkedIn Hiring Support — Find Top Talent Faster",
  description:
    "Hire skilled professionals faster with LinkedIn-backed recruitment. TechInRent sources candidates by role, skills, and experience level. Submit your hiring request and get results in days.",
  alternates: { canonical: "https://techinrent.com/hiring-support" },
  openGraph: {
    title: "LinkedIn Hiring Support | TechInRent",
    description:
      "Find skilled candidates faster using LinkedIn. TechInRent sources by role, skills, and experience — submit your hiring request today.",
    url: "https://techinrent.com/hiring-support",
  },
};

export default function Page() {
  return <HiringSupportClient />;
}

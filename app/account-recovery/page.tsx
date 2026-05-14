import type { Metadata } from "next";
import AccountRecoveryClient from "./AccountRecoveryClient";

export const metadata: Metadata = {
  title: "LinkedIn Account Recovery — 95% Success Rate",
  description:
    "Restore your restricted or banned LinkedIn account. TechInRent's expert recovery service offers free diagnosis, personalized roadmap, and prevention strategies. 95% success rate.",
  alternates: { canonical: "https://techinrent.com/account-recovery" },
  openGraph: {
    title: "LinkedIn Account Recovery | TechInRent",
    description:
      "Expert LinkedIn account recovery with 95% success rate. Free initial diagnosis, 48hr response, personalized recovery roadmap.",
    url: "https://techinrent.com/account-recovery",
  },
};

export default function Page() {
  return <AccountRecoveryClient />;
}

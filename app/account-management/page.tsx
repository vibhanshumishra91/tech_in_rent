import type { Metadata } from "next";
import AccountManagementClient from "./AccountManagementClient";

export const metadata: Metadata = {
  title: "LinkedIn Account Management — Done-For-You Outreach",
  description:
    "Rent a managed LinkedIn account and let TechInRent run your outreach campaigns end-to-end. Targeting, messaging, follow-ups, and weekly reports — from $50/mo.",
  alternates: { canonical: "https://techinrent.com/account-management" },
  openGraph: {
    title: "LinkedIn Account Management | TechInRent",
    description:
      "Done-for-you LinkedIn outreach. TechInRent manages campaigns, targeting, and reporting so you focus on closing deals. From $50/mo.",
    url: "https://techinrent.com/account-management",
  },
};

export default function Page() {
  return <AccountManagementClient />;
}

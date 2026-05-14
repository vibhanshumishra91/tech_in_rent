import type { Metadata } from "next";
import LinkedinServicesClient from "./LinkedinServicesClient";

export const metadata: Metadata = {
  title: "LinkedIn Services — Growth, Management & Lead Generation",
  description:
    "All TechInRent LinkedIn services in one place: account management, account recovery, LinkedIn growth, B2B lead generation, and hiring support. Choose the right plan and start growing.",
  alternates: { canonical: "https://techinrent.com/linkedin-services" },
  openGraph: {
    title: "LinkedIn Services | TechInRent",
    description:
      "LinkedIn account management, recovery, growth, B2B leads, and hiring support — all under one roof.",
    url: "https://techinrent.com/linkedin-services",
  },
};

export default function Page() {
  return <LinkedinServicesClient />;
}

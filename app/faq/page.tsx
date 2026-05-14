import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ — LinkedIn Services Questions Answered",
  description:
    "Answers to common questions about TechInRent's LinkedIn services — account management, connections, recovery, B2B lead generation, hiring support, pricing, and refunds.",
  alternates: { canonical: "https://techinrent.com/faq" },
  openGraph: {
    title: "FAQ | TechInRent",
    description:
      "Common questions about TechInRent's LinkedIn account management, connections, recovery, and lead generation services.",
    url: "https://techinrent.com/faq",
  },
};

export default function Page() {
  return <FaqClient />;
}

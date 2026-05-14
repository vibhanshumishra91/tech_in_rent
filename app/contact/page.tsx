import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Get In Touch with TechInRent",
  description:
    "Reach TechInRent via email, WhatsApp, phone, or Telegram. Book a free 30-minute strategy consultation or contact our support team for account recovery and service enquiries.",
  alternates: { canonical: "https://techinrent.com/contact" },
  openGraph: {
    title: "Contact TechInRent | LinkedIn Growth Agency",
    description:
      "Reach us via email, WhatsApp, or phone. Book a free strategy call — no commitment required.",
    url: "https://techinrent.com/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}

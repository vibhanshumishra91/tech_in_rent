import type { Metadata } from "next";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "Book a Free Strategy Consultation",
  description:
    "Book a free 30-minute LinkedIn strategy consultation with TechInRent. Share your goals and budget — we'll recommend the right service path for your business.",
  alternates: { canonical: "https://techinrent.com/demo" },
  openGraph: {
    title: "Free Strategy Consultation | TechInRent",
    description:
      "Book a free 30-minute consultation. Share your LinkedIn goals and budget — we'll build a custom strategy.",
    url: "https://techinrent.com/demo",
  },
};

export default function Page() {
  return <DemoClient />;
}

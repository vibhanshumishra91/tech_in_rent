import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — LinkedIn Growth Insights & B2B Strategy",
  description:
    "Read TechInRent's expert articles on LinkedIn outreach, B2B lead generation, account recovery, and professional growth. Actionable insights for sales and marketing teams.",
  alternates: { canonical: "https://techinrent.com/blog" },
  openGraph: {
    title: "TechInRent Blog | LinkedIn Growth & B2B Strategy",
    description:
      "Expert articles on LinkedIn outreach, B2B lead generation, account recovery, and professional growth.",
    url: "https://techinrent.com/blog",
  },
};

export default function Page() {
  return <BlogClient />;
}

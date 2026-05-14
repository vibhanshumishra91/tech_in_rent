import type { Metadata } from "next";
import FollowersCheckoutClient from "./FollowersCheckoutClient";

export const metadata: Metadata = {
  title: "Buy LinkedIn Connections — Real & Targeted",
  description:
    "Buy premium LinkedIn connections from TechInRent. Real, verified profiles. Safe delivery. Choose from flexible packages — 50 to 5,000 connections with 24-48hr delivery.",
  alternates: { canonical: "https://techinrent.com/followers-checkout" },
  openGraph: {
    title: "Buy LinkedIn Connections | TechInRent",
    description:
      "Real, verified LinkedIn connections. Safe delivery. 50 to 5,000 connections — choose your package.",
    url: "https://techinrent.com/followers-checkout",
  },
};

export default function Page() {
  return <FollowersCheckoutClient />;
}

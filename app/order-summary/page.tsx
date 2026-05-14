import type { Metadata } from "next";
import OrderSummaryClient from "./OrderSummaryClient";

export const metadata: Metadata = {
  title: "Order Summary",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OrderSummaryClient />;
}

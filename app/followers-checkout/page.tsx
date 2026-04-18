"use client";

import Footer from "@/components/shared/Footer";
import { followerPackages } from "@/lib/payments/followerPackages";
import Navbar from "@/components/shared/Navbar";
import { useState } from "react";
import { FaArrowRightLong, FaCircleCheck, FaRocket, FaUsers } from "react-icons/fa6";

type CheckoutStartResponse = {
  ok?: boolean;
  message?: string;
  checkout?: {
    packageId: string;
    packageName: string;
    amountInr: number;
    razorpayKeyId: string;
    orderId: string;
    currency: string;
    amount: number;
  };
};

type RazorpayPaymentSuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentSuccessResponse) => void | Promise<void>;
  theme?: { color?: string };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

async function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.Razorpay) {
    return true;
  }

  return await new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function FollowersCheckoutPage() {
  const [isLoadingPackageId, setIsLoadingPackageId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  async function startCheckout(packageId: string) {
    setIsLoadingPackageId(packageId);
    setCheckoutError(null);
    setCheckoutSuccess(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });

      const result = (await response.json()) as CheckoutStartResponse;

      if (!response.ok || !result.ok || !result.checkout) {
        setCheckoutError(result.message ?? "Unable to start checkout right now.");
        return;
      }

      const scriptReady = await loadRazorpayScript();

      if (!scriptReady || !window.Razorpay) {
        setCheckoutError("Unable to load Razorpay checkout. Please try again.");
        return;
      }

      const selectedPackage = followerPackages.find((item) => item.id === packageId);

      const razorpay = new window.Razorpay({
        key: result.checkout.razorpayKeyId,
        amount: result.checkout.amount,
        currency: result.checkout.currency,
        name: "TechInRent",
        description: selectedPackage?.name ?? "Followers Package",
        order_id: result.checkout.orderId,
        handler: async (paymentResponse) => {
          const verifyResponse = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              packageId,
              ...paymentResponse,
            }),
          });

          const verifyResult = (await verifyResponse.json()) as { ok?: boolean; message?: string };

          if (!verifyResponse.ok || !verifyResult.ok) {
            setCheckoutError(verifyResult.message ?? "Payment verification failed.");
            return;
          }

          setCheckoutSuccess(verifyResult.message ?? "Payment completed successfully.");
        },
        theme: { color: "#0f172a" },
      });

      razorpay.open();
    } catch {
      setCheckoutError("Network error while starting checkout.");
    } finally {
      setIsLoadingPackageId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(148,163,184,0.2),transparent_34%),radial-gradient(circle_at_88%_22%,rgba(56,189,248,0.14),transparent_35%),#f1f5f9] text-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-md shadow-slate-300/30 sm:p-8">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
            <FaUsers size={12} />
            Followers Checkout
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Choose Your Growth Package</h1>
          <p className="mx-auto mt-3 max-w-3xl text-slate-600">
            Simple package selection, clear delivery timelines, and direct checkout flow for faster execution.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {followerPackages.map((item) => (
            <article
              key={item.name}
              className={`rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                item.popular ? "border-slate-900 ring-2 ring-slate-900/10" : "border-slate-200"
              }`}
            >
              {item.popular ? (
                <p className="mx-auto mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Most Popular
                </p>
              ) : null}
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">{item.displayPrice}</p>
              <p className="mt-2 text-sm text-slate-600">Delivery: {item.delivery}</p>

              <ul className="mt-4 space-y-2 text-left text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <FaCircleCheck size={13} className="text-slate-700" />
                  Organic growth workflow
                </li>
                <li className="flex items-center gap-2">
                  <FaCircleCheck size={13} className="text-slate-700" />
                  Support during delivery window
                </li>
                <li className="flex items-center gap-2">
                  <FaCircleCheck size={13} className="text-slate-700" />
                  Quality-first process
                </li>
              </ul>

              <button
                type="button"
                onClick={() => startCheckout(item.id)}
                disabled={isLoadingPackageId === item.id}
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoadingPackageId === item.id ? "Starting..." : "Buy Now"}
                <FaArrowRightLong size={14} />
              </button>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          {checkoutError ? <p className="mb-2 text-sm font-semibold text-red-600">{checkoutError}</p> : null}
          {checkoutSuccess ? <p className="mb-2 text-sm font-semibold text-emerald-700">{checkoutSuccess}</p> : null}
          <p className="inline-flex items-center gap-2 text-sm text-slate-700">
            <FaRocket size={14} />
            Razorpay API starter is connected. Add keys in .env.local to enable live checkout.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

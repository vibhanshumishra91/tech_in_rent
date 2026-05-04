"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { followerPackages } from "@/lib/payments/followerPackages";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

type CheckoutStep = 1 | 2 | 3;

type CheckoutCustomerForm = {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  linkedinUrl: string;
  notes: string;
  paymentMethod: string;
  paymentOption: string;
};

type FieldErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
};

type UploadResponse = {
  success?: boolean;
  message?: string;
  url?: string;
  publicId?: string;
};

type OrderSubmitResponse = {
  success?: boolean;
  message?: string;
  data?: {
    id?: string;
    status?: string;
    createdAt?: string;
  };
};

type PaymentOptionItem = {
  value: string;
  label: string;
  paymentAddressLabel: string;
  paymentAddressValue: string;
  qrImageUrl?: string;
  instructions: string[];
};

type PublicPaymentMethod = {
  title?: string;
  options?: PaymentOptionItem[];
};

const PAYMENT_METHOD_OPTIONS: Record<
  string,
  { title: string; options: PaymentOptionItem[] }
> = {
  Crypto: {
    title: "Crypto",
    options: [
      {
        value: "USDT-TRC20",
        label: "USDT (TRC20)",
        paymentAddressLabel: "Wallet Address",
        paymentAddressValue: "TQ2f3AqYQ9aNQ1kT3f6u1Vj9z2A8sH7bQ1",
        instructions: [
          "Send exact amount to this wallet address.",
          "Use only TRC20 network for this option.",
          "Take screenshot after payment for verification.",
        ],
      },
      {
        value: "USDT-BEP20",
        label: "USDT (BEP20)",
        paymentAddressLabel: "Wallet Address",
        paymentAddressValue: "0x97fA84d45d0D6C2C5Db4A7E95b0b4D93a6D4F0Dd",
        instructions: [
          "Send exact amount to this wallet address.",
          "Use only BEP20 network for this option.",
          "Take screenshot after payment for verification.",
        ],
      },
    ],
  },
  "Binance Pay": {
    title: "Binance Pay",
    options: [
      {
        value: "BINANCE-ID",
        label: "Binance ID",
        paymentAddressLabel: "Binance ID",
        paymentAddressValue: "88841638",
        instructions: [
          "Transfer via Binance Pay using this Binance ID.",
          "Match the order amount exactly before sending.",
          "Take screenshot and upload in step 3.",
        ],
      },
      {
        value: "BINANCE-UID",
        label: "Binance UID",
        paymentAddressLabel: "Binance UID",
        paymentAddressValue: "741552901",
        instructions: [
          "Use Binance internal transfer on UID.",
          "Add order note if possible for fast verification.",
          "Take screenshot and upload in step 3.",
        ],
      },
    ],
  },
  "UPI Payment": {
    title: "UPI Payment",
    options: [
      {
        value: "UPI-ID",
        label: "UPI ID",
        paymentAddressLabel: "UPI ID",
        paymentAddressValue: "techinrent@axl",
        instructions: [
          "Pay exact amount to the UPI ID.",
          "In remarks add your name or package.",
          "Take screenshot and upload in step 3.",
        ],
      },
      {
        value: "UPI-QR",
        label: "UPI QR",
        paymentAddressLabel: "UPI Reference",
        paymentAddressValue: "Scan support QR and pay exact amount.",
        instructions: [
          "Scan QR and complete payment.",
          "Take screenshot of successful transaction.",
          "Upload screenshot in step 3 for verification.",
        ],
      },
    ],
  },
};

export default function OrderSummaryPage() {
  return (
    <Suspense fallback={<OrderSummaryLoading />}>
      <OrderSummaryPageContent />
    </Suspense>
  );
}

function OrderSummaryLoading() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: "calc(68px + 56px)", paddingInline: "5%", background: "var(--off)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "36px" }}>
          <h1 style={{ margin: "0 0 10px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "34px", color: "var(--ink)" }}>
            Loading Order Summary
          </h1>
          <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", color: "var(--muted)" }}>
            Preparing your checkout details...
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function OrderSummaryPageContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package") ?? "";

  const selectedPackage = useMemo(
    () => followerPackages.find((item) => item.id === packageId) ?? null,
    [packageId],
  );

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(1);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [uploadingProof, setUploadingProof] = useState(false);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [paymentProofUrl, setPaymentProofUrl] = useState<string | null>(null);
  const [submittedOrderId, setSubmittedOrderId] = useState("");
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [copiedValue, setCopiedValue] = useState("");
  const [paymentMethodOptions, setPaymentMethodOptions] = useState(
    PAYMENT_METHOD_OPTIONS,
  );
  const [customerForm, setCustomerForm] = useState<CheckoutCustomerForm>({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    linkedinUrl: "",
    notes: "",
    paymentMethod: "",
    paymentOption: "",
  });

  const selectedMethodConfig = customerForm.paymentMethod
    ? paymentMethodOptions[customerForm.paymentMethod]
    : undefined;
  const selectedPaymentOption = selectedMethodConfig?.options.find(
    (item) => item.value === customerForm.paymentOption,
  );

  function validatePhoneNumber(countryCode: string, phone: string) {
    const digitsOnly = phone.replace(/\D/g, "");
    if (!digitsOnly) return "Phone number is required.";
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return "Phone number must be between 7 and 15 digits.";
    }
    if (countryCode === "+91" && digitsOnly.length !== 10) {
      return "Indian phone number must be exactly 10 digits.";
    }
    return "";
  }

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        const response = await fetch("/api/payment-methods");
        const result = (await response.json()) as {
          success?: boolean;
          data?: PublicPaymentMethod[];
        };

        if (!response.ok || !result.success || !Array.isArray(result.data)) {
          return;
        }

        const nextConfig: Record<string, { title: string; options: PaymentOptionItem[] }> = {};
        result.data.forEach((method) => {
          const methodName = String(method.title ?? "").trim();
          if (!methodName || !Array.isArray(method.options)) return;
          nextConfig[methodName] = {
            title: methodName,
            options: method.options
              .map((option) => ({
                value: String(option.value ?? "").trim(),
                label: String(option.label ?? "").trim(),
                paymentAddressLabel: String(option.paymentAddressLabel ?? "").trim(),
                paymentAddressValue: String(option.paymentAddressValue ?? "").trim(),
                qrImageUrl: String(option.qrImageUrl ?? "").trim(),
                instructions: Array.isArray(option.instructions)
                  ? option.instructions.map((item) => String(item).trim()).filter(Boolean)
                  : [],
              }))
              .filter(
                (option) =>
                  option.value &&
                  option.label &&
                  option.paymentAddressLabel &&
                  option.paymentAddressValue,
              ),
          };
        });

        if (Object.keys(nextConfig).length > 0) {
          setPaymentMethodOptions(nextConfig);
        }
      } catch {
        // Keep fallback defaults
      }
    }

    fetchPaymentMethods();
  }, []);

  function validateLinkedIn(value: string) {
    const input = value.trim();
    if (!input) return "LinkedIn URL is required.";

    const normalizedInput = /^https?:\/\//i.test(input)
      ? input
      : `https://${input}`;

    try {
      const url = new URL(normalizedInput);
      const host = url.hostname.toLowerCase();

      // Accept linkedin.com and subdomains like www.linkedin.com, m.linkedin.com, in.linkedin.com
      const isLinkedInHost =
        host === "linkedin.com" || host.endsWith(".linkedin.com");

      if (isLinkedInHost) {
        const path = url.pathname.toLowerCase();
        const pathSegments = path.split("/").filter(Boolean);
        const firstSegment = pathSegments[0] ?? "";

        // Common valid LinkedIn profile/org paths
        if (
          ["in", "company", "school", "pub"].includes(firstSegment) &&
          pathSegments.length >= 2
        ) {
          return "";
        }

        // Legacy LinkedIn profile URL format
        if (path === "/profile/view" && url.searchParams.has("id")) {
          return "";
        }

        // Fallback: accept other LinkedIn URLs on the same domain
        // (for example authwall/tracking links shared by browser/session)
        if (pathSegments.length >= 1) {
          return "";
        }
      }
    } catch {}

    return "Enter a valid LinkedIn URL (https://linkedin.com/...)";
  }

  function getLinkedInDisplay(value: string) {
    const input = value.trim();
    if (!input) return "linkedin.com/...";
    const clean = input
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "");
    return clean.length > 24 ? `${clean.slice(0, 24)}...` : clean;
  }

  if (!selectedPackage) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "100vh", paddingTop: "calc(68px + 56px)", paddingInline: "5%", background: "var(--off)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "36px" }}>
            <h1 style={{ margin: "0 0 10px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "34px", color: "var(--ink)" }}>
              Select A Package First
            </h1>
            <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body, sans-serif)", color: "var(--muted)" }}>
              We could not find a selected plan. Please choose a package first.
            </p>
            <Link
              href="/followers-checkout#pricing"
              style={{
                display: "inline-block",
                padding: "12px 20px",
                borderRadius: "10px",
                background: "var(--teal)",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "var(--font-heading, sans-serif)",
                fontWeight: 700,
              }}
            >
              Go To Pricing
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  function continueFromStepOne() {
    const { fullName, email, phone, linkedinUrl } = customerForm;

    const nextErrors: FieldErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    const phoneError = validatePhoneNumber(customerForm.countryCode, phone);
    if (phoneError) {
      nextErrors.phone = phoneError;
    }

    const linkedinError = validateLinkedIn(linkedinUrl);
    if (linkedinError) {
      nextErrors.linkedinUrl = linkedinError;
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setCheckoutError("Please fix the highlighted fields before continuing.");
      return;
    }
    setCheckoutError(null);
    setFieldErrors({});
    setCheckoutStep(2);
  }

  function continueFromStepTwo() {
    if (!customerForm.paymentMethod.trim()) {
      setCheckoutError("Please select a payment method.");
      return;
    }
    if (!customerForm.paymentOption.trim()) {
      setCheckoutError("Please select a payment option.");
      return;
    }
    setCheckoutError(null);
    setCheckoutStep(3);
  }

  function onPaymentProofSelect(file: File | null) {
    if (!file) {
      setPaymentProofFile(null);
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setCheckoutError("Please upload PNG, JPG, JPEG, or WEBP image only.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setCheckoutError("Payment proof image must be under 5MB.");
      return;
    }

    setCheckoutError(null);
    setPaymentProofFile(file);
  }

  async function copyPaymentValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(""), 1500);
    } catch {
      setCheckoutError("Unable to copy. Please copy manually.");
    }
  }

  async function submitPaymentProof() {
    if (!paymentProofFile) {
      setCheckoutError("Please upload payment proof before submitting.");
      return;
    }
    if (!selectedPackage) {
      setCheckoutError("Please select a package before submitting.");
      return;
    }

    setUploadingProof(true);
    setCheckoutError(null);
    setCheckoutSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", paymentProofFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = (await uploadRes.json()) as UploadResponse;

      if (!uploadRes.ok || !uploadData.success || !uploadData.url) {
        setCheckoutError(uploadData.message ?? "Unable to upload payment proof.");
        return;
      }

      const orderRes = await fetch("/api/order-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: customerForm.fullName,
          email: customerForm.email,
          countryCode: customerForm.countryCode,
          phone: customerForm.phone,
          linkedinUrl: customerForm.linkedinUrl,
          notes: customerForm.notes,
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          amountInr: selectedPackage.amountInr,
          displayPrice: selectedPackage.displayPrice,
          delivery: selectedPackage.delivery,
          paymentMethod: customerForm.paymentMethod,
          paymentOption: customerForm.paymentOption,
          paymentProofUrl: uploadData.url,
          paymentProofPublicId: uploadData.publicId ?? "",
        }),
      });

      const orderData = (await orderRes.json()) as OrderSubmitResponse;

      if (!orderRes.ok || !orderData.success) {
        setCheckoutError(orderData.message ?? "Payment proof uploaded, but order save failed.");
        return;
      }

      setPaymentProofUrl(uploadData.url);
      setSubmittedOrderId(String(orderData.data?.id ?? ""));
      setCheckoutSuccess("Payment proof and order submitted successfully.");
      setShowSuccessScreen(true);
    } catch {
      setCheckoutError("Network error while uploading payment proof.");
    } finally {
      setUploadingProof(false);
    }
  }

  if (showSuccessScreen) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "100vh", paddingTop: "calc(68px + 56px)", paddingInline: "5%", background: "var(--off)" }}>
          <section style={{ maxWidth: "900px", margin: "0 auto", background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "40px", textAlign: "center" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "999px", background: "var(--teal-pale)", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaCircleCheck size={34} color="#10b981" />
            </div>
            <h1 style={{ margin: "0 0 10px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(30px,4vw,44px)", color: "var(--ink)" }}>
              Order Submitted Successfully
            </h1>
            <p style={{ margin: "0 auto 20px", maxWidth: "680px", color: "var(--muted)", fontSize: "16px", lineHeight: 1.7 }}>
              Thank you. We received your payment proof and order details. Our team will verify payment and contact you within 24 hours.
            </p>

            <div style={{ maxWidth: "560px", margin: "0 auto 22px", border: "1px solid var(--line)", borderRadius: "12px", background: "var(--off)", padding: "14px 16px", textAlign: "left" }}>
              <p style={{ margin: "0 0 8px", fontSize: "14px", color: "var(--muted)" }}>
                <strong style={{ color: "var(--ink)" }}>Order ID:</strong> {submittedOrderId || "Generated"}
              </p>
              <p style={{ margin: "0 0 8px", fontSize: "14px", color: "var(--muted)" }}>
                <strong style={{ color: "var(--ink)" }}>Package:</strong> {selectedPackage.name}
              </p>
              <p style={{ margin: "0 0 8px", fontSize: "14px", color: "var(--muted)" }}>
                <strong style={{ color: "var(--ink)" }}>Price:</strong> {selectedPackage.displayPrice}
              </p>
              {paymentProofUrl && (
                <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)" }}>
                  <strong style={{ color: "var(--ink)" }}>Proof URL:</strong>{" "}
                  <a href={paymentProofUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal-deep)" }}>
                    View uploaded proof
                  </a>
                </p>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/" style={{ display: "inline-block", padding: "12px 20px", borderRadius: "10px", border: "1px solid var(--line)", color: "var(--ink)", textDecoration: "none", fontWeight: 700 }}>
                Go To Home
              </Link>
              <Link href="/followers-checkout#pricing" style={{ display: "inline-block", padding: "12px 20px", borderRadius: "10px", background: "var(--teal)", color: "#fff", textDecoration: "none", fontWeight: 700 }}>
                Book Another Package
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: "calc(68px + 40px)", background: "var(--off)" }}>
        <section style={{ padding: "0 5% 70px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h1 style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(30px,4vw,46px)", color: "var(--ink)" }}>
                {checkoutStep === 1 && "Enter Your Information"}
                {checkoutStep === 2 && "Select Payment Method"}
                {checkoutStep === 3 && "Upload Payment Proof"}
              </h1>

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {[1, 2, 3].map((step) => (
                  <div key={step} style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "999px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "24px",
                        color: "#fff",
                        background: checkoutStep >= step ? "var(--teal)" : "#cbd5e1",
                      }}
                    >
                      {step}
                    </div>
                    {step < 3 && <div style={{ width: "110px", height: "4px", background: checkoutStep > step ? "var(--teal)" : "#cbd5e1" }} />}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "24px" }} className="order-flow-grid">
              <article style={{ borderRadius: "16px", background: "#fff", border: "1px solid var(--line)", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
                {checkoutStep === 1 && (
                  <>
                    <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "30px", color: "var(--teal)" }}>
                      Your Information
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={customerForm.fullName}
                          onChange={(e) => setCustomerForm((p) => ({ ...p, fullName: e.target.value }))}
                          style={{ width: "100%", padding: "12px", borderRadius: "9px", border: fieldErrors.fullName ? "1px solid #ef4444" : "1px solid var(--line)" }}
                        />
                        {fieldErrors.fullName && <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#dc2626" }}>{fieldErrors.fullName}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={customerForm.email}
                          onChange={(e) => setCustomerForm((p) => ({ ...p, email: e.target.value }))}
                          style={{ width: "100%", padding: "12px", borderRadius: "9px", border: fieldErrors.email ? "1px solid #ef4444" : "1px solid var(--line)" }}
                        />
                        {fieldErrors.email && <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#dc2626" }}>{fieldErrors.email}</p>}
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "10px", marginTop: "12px" }}>
                      <select value={customerForm.countryCode} onChange={(e) => setCustomerForm((p) => ({ ...p, countryCode: e.target.value }))} style={{ width: "100%", padding: "12px", borderRadius: "9px", border: "1px solid var(--line)", background: "#fff" }}>
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={customerForm.phone}
                        onChange={(e) =>
                          setCustomerForm((p) => ({
                            ...p,
                            phone: e.target.value.replace(/\D/g, "").slice(0, 15),
                          }))
                        }
                        style={{ width: "100%", padding: "12px", borderRadius: "9px", border: fieldErrors.phone ? "1px solid #ef4444" : "1px solid var(--line)" }}
                      />
                    </div>
                    {fieldErrors.phone && <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#dc2626" }}>{fieldErrors.phone}</p>}
                    <input
                      type="text"
                      placeholder="LinkedIn Profile URL or LinkedIn ID"
                      value={customerForm.linkedinUrl}
                      onChange={(e) => setCustomerForm((p) => ({ ...p, linkedinUrl: e.target.value }))}
                      style={{ width: "100%", marginTop: "12px", padding: "12px", borderRadius: "9px", border: fieldErrors.linkedinUrl ? "1px solid #ef4444" : "1px solid var(--line)" }}
                    />
                    {fieldErrors.linkedinUrl && <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#dc2626" }}>{fieldErrors.linkedinUrl}</p>}
                    <textarea rows={4} placeholder="Additional notes (optional)" value={customerForm.notes} onChange={(e) => setCustomerForm((p) => ({ ...p, notes: e.target.value }))} style={{ width: "100%", marginTop: "12px", padding: "12px", borderRadius: "9px", border: "1px solid var(--line)", resize: "vertical" }} />
                    <button type="button" onClick={continueFromStepOne} style={{ width: "100%", marginTop: "14px", padding: "13px", borderRadius: "9px", border: "none", background: "var(--teal)", color: "#fff", fontFamily: "var(--font-heading, sans-serif)", fontWeight: 700 }}>
                      Continue To Payment
                    </button>
                  </>
                )}

                {checkoutStep === 2 && (
                  <>
                    <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "30px", color: "var(--teal)" }}>
                      Select Payment Method
                    </h2>
                    <p style={{ margin: "0 0 14px", color: "var(--muted)" }}>Choose your preferred payment method</p>
                    <select
                      value={customerForm.paymentMethod}
                      onChange={(e) => setCustomerForm((p) => ({ ...p, paymentMethod: e.target.value, paymentOption: "" }))}
                      style={{ width: "100%", padding: "12px", borderRadius: "9px", border: "1px solid var(--line)", background: "#fff", marginBottom: "12px" }}
                    >
                      <option value="">Select a payment method</option>
                      {Object.keys(paymentMethodOptions).map((methodName) => (
                        <option key={methodName} value={methodName}>
                          {methodName}
                        </option>
                      ))}
                    </select>
                    <select
                      value={customerForm.paymentOption}
                      onChange={(e) => setCustomerForm((p) => ({ ...p, paymentOption: e.target.value }))}
                      style={{ width: "100%", padding: "12px", borderRadius: "9px", border: "1px solid var(--line)", background: "#fff", marginBottom: "12px" }}
                      disabled={!selectedMethodConfig}
                    >
                      <option value="">{selectedMethodConfig ? "Select a payment option" : "Choose payment method first"}</option>
                      {(selectedMethodConfig?.options ?? []).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {selectedPaymentOption && (
                      <div style={{ border: "1px solid var(--line)", borderRadius: "12px", background: "var(--off)", padding: "16px", marginBottom: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <h3 style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "24px", color: "var(--ink)" }}>
                            {selectedMethodConfig?.title} - {selectedPaymentOption.label}
                          </h3>
                          <button type="button" onClick={() => copyPaymentValue(selectedPaymentOption.paymentAddressValue)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff", cursor: "pointer" }}>
                            {copiedValue === selectedPaymentOption.paymentAddressValue ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="payment-details-grid">
                          <div>
                            <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 700, color: "var(--muted)" }}>{selectedPaymentOption.paymentAddressLabel}</p>
                            <p style={{ margin: 0, padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff", wordBreak: "break-all" }}>
                              {selectedPaymentOption.paymentAddressValue}
                            </p>
                          </div>
                          <div>
                            <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 700, color: "var(--muted)" }}>QR Code</p>
                            {selectedPaymentOption.qrImageUrl ? (
                              <Image
                                src={selectedPaymentOption.qrImageUrl}
                                alt={`${selectedMethodConfig?.title} QR`}
                                width={180}
                                height={180}
                                unoptimized
                                style={{
                                  width: "100%",
                                  maxWidth: "180px",
                                  height: "auto",
                                  border: "1px solid var(--line)",
                                  borderRadius: "8px",
                                  background: "#fff",
                                }}
                              />
                            ) : (
                              <div style={{ border: "1px dashed var(--teal-border)", borderRadius: "8px", minHeight: "74px", background: "var(--teal-pale)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal-deep)", fontSize: "13px", textAlign: "center", padding: "10px" }}>
                                QR visible after support confirmation
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ marginTop: "12px", border: "1px solid var(--teal-border)", borderRadius: "10px", background: "var(--teal-pale)", padding: "12px" }}>
                          <p style={{ margin: "0 0 8px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "20px", color: "var(--teal-deep)" }}>Payment Instructions</p>
                          {selectedPaymentOption.instructions.map((item) => (
                            <p key={item} style={{ margin: "0 0 6px", color: "var(--teal-deep)", fontSize: "14px" }}>
                              • {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="button" onClick={() => setCheckoutStep(1)} style={{ flex: 1, padding: "12px", borderRadius: "9px", border: "1px solid var(--line)", background: "#fff", color: "var(--ink)", fontWeight: 700 }}>
                        Back
                      </button>
                      <button type="button" onClick={continueFromStepTwo} style={{ flex: 1, padding: "12px", borderRadius: "9px", border: "none", background: "var(--teal)", color: "#fff", fontWeight: 700 }}>
                        Continue To Step 3
                      </button>
                    </div>
                  </>
                )}

                {checkoutStep === 3 && (
                  <>
                    <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "30px", color: "var(--teal)" }}>
                      Upload Payment Proof
                    </h2>
                    <p style={{ margin: "0 0 14px", color: "var(--muted)" }}>
                      Upload a payment screenshot for verification.
                    </p>
                    <label htmlFor="payment-proof" style={{ display: "block", border: "2px dashed var(--teal-border)", borderRadius: "10px", background: "#fff", padding: "24px 14px", textAlign: "center", cursor: "pointer", marginBottom: "12px" }}>
                      <input id="payment-proof" type="file" accept=".png,.jpg,.jpeg,.webp" onChange={(e) => onPaymentProofSelect(e.target.files?.[0] ?? null)} style={{ display: "none" }} />
                      <p style={{ margin: 0, color: "var(--ink)", fontSize: "19px", fontWeight: 600 }}>Click to upload payment screenshot</p>
                      <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: "14px" }}>PNG, JPG, WEBP (Max 5MB)</p>
                      {paymentProofFile && <p style={{ margin: "8px 0 0", color: "var(--ink)", fontSize: "14px" }}>Selected: {paymentProofFile.name}</p>}
                    </label>
                    <div style={{ border: "1px solid var(--teal-border)", borderRadius: "10px", background: "var(--teal-pale)", padding: "12px", marginBottom: "12px" }}>
                      <p style={{ margin: "0 0 8px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "20px", color: "var(--teal-deep)" }}>Important Note</p>
                      <p style={{ margin: 0, color: "var(--teal-deep)", fontSize: "14px", lineHeight: 1.6 }}>
                        Our team verifies uploaded proof and confirms your order within 24 hours.
                      </p>
                    </div>
                    {paymentProofUrl && <p style={{ margin: "0 0 10px", color: "#166534", fontWeight: 600, fontSize: "14px" }}>Proof uploaded successfully.</p>}
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="button" onClick={() => setCheckoutStep(2)} style={{ flex: 1, padding: "12px", borderRadius: "9px", border: "1px solid var(--line)", background: "#fff", color: "var(--ink)", fontWeight: 700 }}>
                        Back
                      </button>
                      <button type="button" onClick={submitPaymentProof} disabled={uploadingProof} style={{ flex: 1, padding: "12px", borderRadius: "9px", border: "none", background: "var(--teal)", color: "#fff", fontWeight: 700, opacity: uploadingProof ? 0.7 : 1 }}>
                        {uploadingProof ? "Uploading..." : "Submit Payment Proof"}
                      </button>
                    </div>
                  </>
                )}
              </article>

              <article
                style={{
                  borderRadius: "16px",
                  padding: "24px",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  boxShadow: "var(--shadow-sm)",
                  color: "var(--ink)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 14px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "34px",
                    color: "var(--ink)",
                  }}
                >
                  Order Summary
                </h2>

                {checkoutStep === 1 && (
                  <>
                    <div style={{ display: "grid", gap: "10px", fontSize: "18px", color: "var(--ink)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <span>Package</span>
                        <strong>{selectedPackage.name}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <span style={{ fontSize: "28px", fontWeight: 700 }}>Price</span>
                        <strong style={{ color: "var(--teal-deep)", fontSize: "46px", lineHeight: 1 }}>
                          {selectedPackage.displayPrice}
                        </strong>
                      </div>
                    </div>

                    <div style={{ marginTop: "14px", borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
                      {[
                        "Real connections from verified profiles",
                        "Delivered within 24-48 hours",
                        "100% safe and secure process",
                        "Money-back guarantee",
                      ].map((item) => (
                        <p key={item} style={{ margin: "0 0 8px", display: "flex", alignItems: "center", gap: "8px", color: "var(--body)", fontSize: "15px" }}>
                          <FaCircleCheck size={14} color="#34d399" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </>
                )}

                {checkoutStep === 2 && (
                  <>
                    <div style={{ display: "grid", gap: "10px", fontSize: "17px", color: "var(--ink)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Customer</span><strong>{customerForm.fullName || "-"}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Email</span><strong>{customerForm.email || "-"}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Phone</span><strong>{customerForm.phone ? `${customerForm.countryCode}${customerForm.phone}` : "-"}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>LinkedIn Profile</span><strong style={{ color: "var(--teal-deep)" }}>{getLinkedInDisplay(customerForm.linkedinUrl)}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Package</span><strong>{selectedPackage.name}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span style={{ fontSize: "30px", fontWeight: 700 }}>Price</span><strong style={{ color: "var(--teal-deep)", fontSize: "46px", lineHeight: 1 }}>{selectedPackage.displayPrice}</strong></div>
                    </div>
                  </>
                )}

                {checkoutStep === 3 && (
                  <>
                    <div style={{ display: "grid", gap: "10px", fontSize: "17px", color: "var(--ink)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Customer</span><strong>{customerForm.fullName || "-"}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Email</span><strong>{customerForm.email || "-"}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Phone</span><strong>{customerForm.phone ? `${customerForm.countryCode}${customerForm.phone}` : "-"}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>LinkedIn Profile</span><strong style={{ color: "var(--teal-deep)" }}>{getLinkedInDisplay(customerForm.linkedinUrl)}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Package</span><strong>{selectedPackage.name}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Payment Method</span><strong>{customerForm.paymentMethod || "-"}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span>Payment Option</span><strong>{customerForm.paymentOption || "-"}</strong></div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}><span style={{ fontSize: "30px", fontWeight: 700 }}>Price</span><strong style={{ color: "var(--teal-deep)", fontSize: "46px", lineHeight: 1 }}>{selectedPackage.displayPrice}</strong></div>
                    </div>
                  </>
                )}
              </article>
            </div>

            {checkoutError && (
              <div style={{ marginTop: "16px", borderRadius: "10px", padding: "12px 14px", background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", fontWeight: 600 }}>
                {checkoutError}
              </div>
            )}
            {checkoutSuccess && (
              <div style={{ marginTop: "16px", borderRadius: "10px", padding: "12px 14px", background: "#dcfce7", border: "1px solid #86efac", color: "#166534", fontWeight: 600 }}>
                {checkoutSuccess}
              </div>
            )}
          </div>
        </section>

        <style>{`
          @media (max-width: 980px) {
            .order-flow-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 680px) {
            .payment-details-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Footer from "@/components/shared/Footer";
import { followerPackages } from "@/lib/payments/followerPackages";
import Navbar from "@/components/shared/Navbar";
import { useState } from "react";
import { 
  FaArrowRightLong, 
  FaCircleCheck, 
  FaRocket, 
  FaUsers, 
  FaShieldHalved,
  FaBolt,
  FaHeadset,
  FaStar
} from "react-icons/fa6";

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
    <>
      <Navbar />
      
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8f9fb 0%, #eef2f7 100%)" }}>
        {/* HERO SECTION - Premium Card Container */}
        <section style={{
          padding: "80px 5% 100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {/* Main Premium Card */}
          <div style={{
            maxWidth: "900px",
            width: "100%",
            background: "#fff",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(13,31,30,0.08), 0 8px 24px rgba(13,31,30,0.04)",
            overflow: "hidden",
            position: "relative"
          }}>
            {/* Top Gradient Strip */}
            <div style={{
              height: "5px",
              background: "linear-gradient(90deg, #067CCB 0%, #0e7a9f 100%)",
              width: "100%"
            }} />

            {/* Card Content */}
            <div style={{
              padding: "56px 48px 64px",
              textAlign: "center"
            }}>
              {/* Main Heading */}
              <h1 style={{
                margin: "0 0 16px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.2,
                color: "var(--ink)",
                letterSpacing: "-0.02em"
              }}>
                Premium LinkedIn Connections
              </h1>

              {/* Supporting Text */}
              <p style={{
                margin: "0 auto 48px",
                maxWidth: "680px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "16px",
                lineHeight: 1.65,
                color: "var(--muted)"
              }}>
                Purchase LinkedIn connections with <strong style={{ color: "var(--teal)", fontWeight: 600 }}>TechInRent</strong>'s trusted service. Real, targeted, and secure – boost your presence with confidence.
              </p>

              {/* 4 Mini Feature Cards Row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "16px",
                marginBottom: "40px"
              }}>
                {[
                  { icon: <FaBolt size={24} />, label: "Instant Processing", color: "#067CCB" },
                  { icon: <FaShieldHalved size={24} />, label: "Secure Service", color: "#0e7a9f" },
                  { icon: <FaCircleCheck size={24} />, label: "Targeted Growth", color: "#067CCB" },
                  { icon: <FaUsers size={24} />, label: "Global Network", color: "#0e7a9f" }
                ].map((feature) => (
                  <div key={feature.label} style={{
                    padding: "28px 20px",
                    borderRadius: "16px",
                    background: "var(--off)",
                    border: "1px solid var(--line)",
                    transition: "all 0.2s ease"
                  }}>
                    <div style={{
                      color: feature.color,
                      marginBottom: "14px",
                      display: "flex",
                      justifyContent: "center"
                    }}>
                      {feature.icon}
                    </div>
                    <p style={{
                      margin: 0,
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.4
                    }}>
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Colored Trust Badges Row */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "40px"
              }}>
                {[
                  { icon: <FaCircleCheck size={14} />, text: "Verified Service" },
                  { icon: <FaShieldHalved size={14} />, text: "100% Secure" },
                  { icon: <FaBolt size={14} />, text: "Instant Processing" },
                  { icon: <FaHeadset size={14} />, text: "Active Support" }
                ].map((badge) => (
                  <div key={badge.text} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "9px 18px",
                    borderRadius: "999px",
                    background: "var(--teal-pale)",
                    border: "1px solid var(--teal-border)",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--teal-dark)"
                  }}>
                    <span style={{ display: "flex", color: "var(--teal)" }}>{badge.icon}</span>
                    {badge.text}
                  </div>
                ))}
              </div>

              {/* Large Centered CTA Button */}
              <a
                href="#pricing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "18px 48px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  background: "var(--ink)",
                  color: "#fff",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  boxShadow: "0 8px 24px rgba(13,31,30,0.15), 0 2px 8px rgba(13,31,30,0.08)",
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                  border: "none",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,31,30,0.2), 0 4px 12px rgba(13,31,30,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(13,31,30,0.15), 0 2px 8px rgba(13,31,30,0.08)";
                }}
              >
                Get Started Now
                <FaArrowRightLong size={15} />
              </a>
            </div>
          </div>

          {/* Mobile Responsive Styles */}
          <style>{`
            @media (max-width: 768px) {
              section > div {
                border-radius: 16px !important;
              }
              section > div > div:last-child {
                padding: 40px 24px 48px !important;
              }
            }
          `}</style>
        </section>

        {/* WHY PROFESSIONALS CHOOSE TECHINRENT */}
        <section style={{
          padding: "80px 5%",
          background: "#fff"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Section Header */}
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--ink)"
              }}>
                Why Professionals Choose TechInRent
              </h2>
              <p style={{
                margin: "18px auto 0",
                maxWidth: "640px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "17px",
                lineHeight: 1.65,
                color: "var(--muted)"
              }}>
                Our premium service delivers real results for your LinkedIn growth
              </p>
            </div>

            {/* 6-Card Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px"
            }}
            className="benefits-grid">
              {/* Card 1 */}
              <article style={{
                padding: "32px 28px",
                borderRadius: "16px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(13,31,30,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,31,30,0.04)";
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--teal-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <FaBolt size={22} color="var(--teal)" />
                </div>
                <h3 style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: "var(--ink)"
                }}>
                  Get LinkedIn Connections Fast
                </h3>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "var(--muted)"
                }}>
                  Real-time LinkedIn connections delivered within 24-48 hours automatically with our fast delivery service.
                </p>
              </article>

              {/* Card 2 */}
              <article style={{
                padding: "32px 28px",
                borderRadius: "16px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(13,31,30,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,31,30,0.04)";
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--teal-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <FaShieldHalved size={22} color="var(--teal)" />
                </div>
                <h3 style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: "var(--ink)"
                }}>
                  Safe LinkedIn Connection Service
                </h3>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "var(--muted)"
                }}>
                  All connections come from real, verified LinkedIn profiles with zero risk.
                </p>
              </article>

              {/* Card 3 */}
              <article style={{
                padding: "32px 28px",
                borderRadius: "16px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(13,31,30,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,31,30,0.04)";
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--teal-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <FaCircleCheck size={22} color="var(--teal)" />
                </div>
                <h3 style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: "var(--ink)"
                }}>
                  Boost LinkedIn Profile Connections
                </h3>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "var(--muted)"
                }}>
                  Increase profile popularity with quality connections to expand your professional reach.
                </p>
              </article>

              {/* Card 4 */}
              <article style={{
                padding: "32px 28px",
                borderRadius: "16px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(13,31,30,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,31,30,0.04)";
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--teal-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <FaUsers size={22} color="var(--teal)" />
                </div>
                <h3 style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: "var(--ink)"
                }}>
                  Real LinkedIn Connections
                </h3>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "var(--muted)"
                }}>
                  Buy targeted LinkedIn connections from verified professionals in your industry.
                </p>
              </article>

              {/* Card 5 */}
              <article style={{
                padding: "32px 28px",
                borderRadius: "16px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(13,31,30,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,31,30,0.04)";
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--teal-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <FaRocket size={22} color="var(--teal)" />
                </div>
                <h3 style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: "var(--ink)"
                }}>
                  Auto LinkedIn Connection
                </h3>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "var(--muted)"
                }}>
                  Processed instantly with real-time LinkedIn growth technology.
                </p>
              </article>

              {/* Card 6 */}
              <article style={{
                padding: "32px 28px",
                borderRadius: "16px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(13,31,30,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,31,30,0.04)";
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--teal-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <FaStar size={22} color="var(--teal)" />
                </div>
                <h3 style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: "var(--ink)"
                }}>
                  TechInRent LinkedIn Boost
                </h3>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "var(--muted)"
                }}>
                  Premium connection growth with high satisfaction and trusted delivery.
                </p>
              </article>
            </div>

            {/* Responsive Styles */}
            <style>{`
              @media (max-width: 968px) {
                .benefits-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              @media (max-width: 640px) {
                .benefits-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="pricing" style={{
          padding: "80px 5%",
          background: "#fff"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--ink)"
              }}>
                Transparent Pricing Plans
              </h2>
              <p style={{
                margin: "18px auto 0",
                maxWidth: "640px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "17px",
                lineHeight: 1.65,
                color: "var(--muted)"
              }}>
                Choose the perfect plan for your professional growth needs
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
              alignItems: "stretch"
            }}
            className="pricing-grid">
              {followerPackages.map((pkg) => (
                <article
                  key={pkg.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: "40px 32px 36px",
                    borderRadius: "16px",
                    background: "#fff",
                    border: pkg.popular ? "2px solid #067CCB" : "1px solid #e5e7eb",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.3s ease",
                    cursor: "default"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  }}
                >
                  {pkg.popular && (
                    <div style={{
                      position: "absolute",
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "6px 24px",
                      borderRadius: "999px",
                      background: "#067CCB",
                      color: "#fff",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase"
                    }}>
                      Most Popular
                    </div>
                  )}

                  <h3 style={{
                    margin: "0 0 24px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#0f172a",
                    textAlign: "center"
                  }}>
                    {pkg.name}
                  </h3>

                  <div style={{ marginBottom: "8px", textAlign: "center" }}>
                    <span style={{
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "48px",
                      fontWeight: 800,
                      color: "#067CCB",
                      lineHeight: 1
                    }}>
                      {pkg.displayPrice}
                    </span>
                  </div>

                  <p style={{
                    margin: "0 0 32px",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "14px",
                    color: "#64748b",
                    textAlign: "center"
                  }}>
                    {pkg.delivery} delivery
                  </p>

                  <ul style={{
                    margin: "0 0 32px",
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    flex: 1
                  }}>
                    {[
                      "Real verified profiles",
                      "Safe delivery methods",
                      "24/7 support included",
                      "Money-back guarantee"
                    ].map((feature) => (
                      <li key={feature} style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start"
                      }}>
                        <FaCircleCheck 
                          size={18} 
                          color="#10b981" 
                          style={{ marginTop: "2px", flexShrink: 0 }}
                        />
                        <span style={{
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "15px",
                          lineHeight: 1.6,
                          color: "#475569"
                        }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => startCheckout(pkg.id)}
                    disabled={isLoadingPackageId === pkg.id}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "16px 32px",
                      borderRadius: "10px",
                      border: "none",
                      background: "#0f172a",
                      color: "#fff",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "15px",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      cursor: isLoadingPackageId === pkg.id ? "not-allowed" : "pointer",
                      opacity: isLoadingPackageId === pkg.id ? 0.7 : 1,
                      transition: "all 0.2s ease",
                      width: "100%"
                    }}
                    onMouseEnter={(e) => {
                      if (isLoadingPackageId !== pkg.id) {
                        e.currentTarget.style.background = "#1e293b";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#0f172a";
                    }}
                  >
                    {isLoadingPackageId === pkg.id ? "Processing..." : "Get Started"}
                  </button>
                </article>
              ))}
            </div>

            {checkoutError && (
              <div style={{
                marginTop: "40px",
                padding: "16px 24px",
                borderRadius: "12px",
                background: "#fee2e2",
                border: "1px solid #fca5a5",
                textAlign: "center"
              }}>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#991b1b"
                }}>
                  {checkoutError}
                </p>
              </div>
            )}

            {checkoutSuccess && (
              <div style={{
                marginTop: "40px",
                padding: "16px 24px",
                borderRadius: "12px",
                background: "#dbeafe",
                border: "1px solid #93c5fd",
                textAlign: "center"
              }}>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1e40af"
                }}>
                  {checkoutSuccess}
                </p>
              </div>
            )}

            <style>{`
              @media (max-width: 968px) {
                .pricing-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                  gap: 24px !important;
                }
              }
              @media (max-width: 640px) {
                .pricing-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{
          padding: "80px 5%",
          background: "#fff"
        }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--ink)"
              }}>
                How It Works
              </h2>
              <p style={{
                margin: "18px auto 0",
                maxWidth: "600px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "17px",
                lineHeight: 1.65,
                color: "var(--muted)"
              }}>
                Get started in three simple steps
              </p>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px"
            }}>
              {[
                {
                  step: "1",
                  title: "Select Your Plan",
                  desc: "Choose the package that matches your networking goals and budget"
                },
                {
                  step: "2",
                  title: "Submit Details",
                  desc: "Provide your LinkedIn profile information securely through our checkout"
                },
                {
                  step: "3",
                  title: "Start Growing",
                  desc: "Watch your network expand as we deliver real connections safely"
                }
              ].map((item) => (
                <div key={item.step} style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  padding: "28px",
                  borderRadius: "16px",
                  background: "var(--off)",
                  border: "1px solid var(--line)"
                }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "999px",
                    background: "var(--teal)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "24px",
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {item.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: 0,
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: "8px"
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--muted)"
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={{
          padding: "80px 5%",
          background: "var(--off)"
        }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--ink)"
              }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}>
              {[
                {
                  q: "Are the connections real people?",
                  a: "Yes, all connections come from real, verified LinkedIn profiles with complete information and active accounts."
                },
                {
                  q: "Is this service safe for my LinkedIn account?",
                  a: "Absolutely. We use policy-compliant methods that protect your account and maintain your professional reputation."
                },
                {
                  q: "How long does delivery take?",
                  a: "Most packages are delivered within 24-48 hours. Larger packages may take 7-15 days for safe, gradual delivery."
                },
                {
                  q: "What if I'm not satisfied?",
                  a: "We offer a money-back guarantee. If you're not satisfied with the service, contact our support team within 7 days."
                },
                {
                  q: "Can I choose who connects with me?",
                  a: "You can specify your target industry and preferences, and we'll match you with relevant professionals."
                }
              ].map((faq, index) => (
                <details key={index} style={{
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  overflow: "hidden"
                }}>
                  <summary style={{
                    padding: "20px 24px",
                    cursor: "pointer",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    {faq.q}
                    <span style={{ color: "var(--teal)", fontSize: "20px" }}>+</span>
                  </summary>
                  <div style={{
                    padding: "0 24px 20px",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--muted)"
                  }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{
          padding: "60px 5%",
          background: "var(--ink)"
        }}>
          <div style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#fff"
            }}>
              Ready to Grow on LinkedIn?
            </h2>
            <p style={{
              margin: "16px auto 0",
              maxWidth: "500px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.9)"
            }}>
              Join thousands of professionals who have accelerated their LinkedIn growth with TechInRent
            </p>
            <a
              href="#pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "32px",
                padding: "18px 36px",
                borderRadius: "12px",
                textDecoration: "none",
                background: "var(--teal)",
                color: "#fff",
                fontFamily: "var(--font-heading, sans-serif)",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.03em",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "all 0.2s ease"
              }}
            >
              Get Started Now
              <FaArrowRightLong size={15} />
            </a>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

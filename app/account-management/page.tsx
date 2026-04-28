"use client";

import { useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import BookDemoButton from "./BookDemoButton";
import { 
  FaUsers, 
  FaChartLine, 
  FaBullhorn, 
  FaBuilding,
  FaCircleCheck,
  FaLinkedin
} from "react-icons/fa6";

export default function AccountManagementPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <Navbar />
      
      <main style={{
        minHeight: "100vh",
        paddingTop: "68px",
        background: "linear-gradient(135deg, #f8f9fb 0%, #eef2f7 100%)"
      }}>
        {/* HERO SECTION */}
        <section style={{
          padding: "80px 5% 60px",
          position: "relative"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}>
            {/* Top Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "999px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              marginBottom: "24px",
              fontSize: "13px",
              fontFamily: "var(--font-body, sans-serif)",
              fontWeight: 600,
              color: "#067CCB"
            }}>
              <FaLinkedin size={14} />
              LinkedIn Account Rental Service
            </div>

            {/* Main Heading */}
            <h1 style={{
              margin: "0 0 24px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
              maxWidth: "900px"
            }}>
              Buy LinkedIn on Rent
            </h1>

            {/* Supporting Text */}
            <p style={{
              margin: "0 auto 32px",
              maxWidth: "700px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "var(--muted)"
            }}>
              Rent verified LinkedIn accounts with established networks and credibility for your business needs.
            </p>

            {/* CTA Button */}
            <BookDemoButton />
          </div>
        </section>

        {/* MAIN FEATURE SECTION */}
        <section style={{
          padding: "80px 5%",
          background: "#fff"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center"
          }}
          className="feature-grid">
            {/* LEFT SIDE - Content */}
            <div>
              <h2 style={{
                margin: "0 0 24px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.2,
                color: "var(--ink)",
                letterSpacing: "-0.02em"
              }}>
                Rent Premium LinkedIn Accounts for Your Business
              </h2>

              <p style={{
                margin: "0 0 32px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "var(--muted)"
              }}>
                Unlock high-quality LinkedIn profiles to accelerate your lead generation, sales, or recruitment efforts without putting your own account at risk.
              </p>

              {/* Ideal For Label */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px"
              }}>
                <FaCircleCheck size={18} color="#10b981" />
                <span style={{
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase"
                }}>
                  Ideal For
                </span>
              </div>

              {/* Benefit Cards Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px"
              }}
              className="benefit-cards">
                {[
                  {
                    icon: <FaUsers size={20} color="#067CCB" />,
                    text: "B2B Lead Generation & SDR Teams"
                  },
                  {
                    icon: <FaChartLine size={20} color="#067CCB" />,
                    text: "Recruiting Agencies"
                  },
                  {
                    icon: <FaBullhorn size={20} color="#067CCB" />,
                    text: "Digital Marketing & Growth Agencies"
                  },
                  {
                    icon: <FaBuilding size={20} color="#067CCB" />,
                    text: "Corporate Teams Looking to Scale Outreach"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "20px 18px",
                      borderRadius: "12px",
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      transition: "all 0.3s ease",
                      cursor: "default"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                      e.currentTarget.style.borderColor = "#067CCB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "#e5e7eb";
                    }}
                  >
                    <div style={{
                      flexShrink: 0,
                      marginTop: "2px"
                    }}>
                      {item.icon}
                    </div>
                    <span style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px",
                      lineHeight: 1.5,
                      color: "#475569",
                      fontWeight: 500
                    }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - Visual Area */}
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "500px"
            }}>
              {/* Premium Visual Card Stack */}
              <div style={{
                position: "relative",
                width: "100%",
                maxWidth: "480px"
              }}>
                {/* Background Decorative Card */}
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "-20px",
                  width: "90%",
                  height: "400px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #067CCB 0%, #0e7a9f 100%)",
                  opacity: 0.1,
                  transform: "rotate(3deg)"
                }} />

                {/* Main Card */}
                <div style={{
                  position: "relative",
                  padding: "48px 40px",
                  borderRadius: "20px",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08)"
                }}>
                  {/* LinkedIn Icon */}
                  <div style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #067CCB 0%, #0e7a9f 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px"
                  }}>
                    <FaLinkedin size={32} color="#fff" />
                  </div>

                  {/* Stats */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                  }}>
                    {[
                      { label: "Verified Accounts", value: "500+" },
                      { label: "Active Networks", value: "50K+" },
                      { label: "Success Rate", value: "98%" }
                    ].map((stat, index) => (
                      <div key={index} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 20px",
                        borderRadius: "12px",
                        background: "var(--off)",
                        border: "1px solid var(--line)"
                      }}>
                        <span style={{
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--muted)",
                          fontWeight: 500
                        }}>
                          {stat.label}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-heading, sans-serif)",
                          fontSize: "24px",
                          fontWeight: 800,
                          color: "#067CCB"
                        }}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badge */}
                  <div style={{
                    marginTop: "28px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(6,124,203,0.05) 0%, rgba(14,122,159,0.05) 100%)",
                    border: "1px solid rgba(6,124,203,0.2)",
                    textAlign: "center"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      marginBottom: "6px"
                    }}>
                      <FaCircleCheck size={16} color="#10b981" />
                      <span style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--ink)",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase"
                      }}>
                        Trusted Service
                      </span>
                    </div>
                    <p style={{
                      margin: 0,
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "13px",
                      color: "var(--muted)",
                      lineHeight: 1.5
                    }}>
                      Secure, compliant, and reliable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Styles */}
          <style>{`
            @media (max-width: 968px) {
              .feature-grid {
                grid-template-columns: 1fr !important;
                gap: 60px !important;
              }
              .benefit-cards {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

        {/* WHY BUY LINKEDIN ACCOUNTS ON RENT SECTION */}
        <section style={{
          padding: "80px 5%",
          background: "#f8fafc"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            <h2 style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#0f172a",
              letterSpacing: "-0.02em"
            }}>
              Why Buy LinkedIn Accounts on Rent?
            </h2>

            <p style={{
              margin: "0 auto 60px",
              maxWidth: "600px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--muted)"
            }}>
              Skip the years of building credibility and networks
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px"
            }}>
              {[
                {
                  title: "Instant Access",
                  description: "Get immediate access to verified LinkedIn accounts"
                },
                {
                  title: "100% Safe & Secure", 
                  description: "All accounts are verified and secure"
                },
                {
                  title: "Established Networks",
                  description: "Accounts with thousands of industry-specific connections"
                },
                {
                  title: "Industry-Specific",
                  description: "Target the right audience with specialized accounts"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "24px",
                    borderRadius: "12px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    textAlign: "center",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#067CCB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <h3 style={{
                    margin: "0 0 12px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#0f172a"
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px",
                    color: "var(--muted)",
                    lineHeight: 1.5
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE TECHINRENT SECTION */}
        <section style={{
          padding: "80px 5%",
          background: "#fff"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            <h2 style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#0f172a",
              letterSpacing: "-0.02em"
            }}>
              Why Choose TechInRent
            </h2>

            <p style={{
              margin: "0 auto 60px",
              maxWidth: "600px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--muted)"
            }}>
              Trusted by professionals worldwide
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px"
            }}>
              {[
                {
                  title: "Premium Quality",
                  description: "High-quality, verified LinkedIn accounts with established credibility"
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock customer support to help you succeed"
                },
                {
                  title: "Proven Results",
                  description: "Thousands of satisfied customers with measurable results"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "24px",
                    borderRadius: "12px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    textAlign: "center",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#067CCB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <h3 style={{
                    margin: "0 0 16px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0f172a"
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px",
                    color: "var(--muted)",
                    lineHeight: 1.6
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES SECTION */}
        <section style={{
          padding: "80px 5%",
          background: "#f8fafc"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            <h2 style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#0f172a",
              letterSpacing: "-0.02em"
            }}>
              Use Cases
            </h2>

            <p style={{
              margin: "0 auto 60px",
              maxWidth: "600px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--muted)"
            }}>
              Perfect for various business needs
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px"
            }}>
              {[
                {
                  title: "Lead Generation",
                  description: "Generate high-quality B2B leads for your sales team"
                },
                {
                  title: "Recruitment",
                  description: "Find and connect with top talent in your industry"
                },
                {
                  title: "Business Development",
                  description: "Build partnerships and expand your professional network"
                },
                {
                  title: "Market Research",
                  description: "Gather insights and connect with industry professionals"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "24px",
                    borderRadius: "12px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    textAlign: "center",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#067CCB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <h3 style={{
                    margin: "0 0 12px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#0f172a"
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px",
                    color: "var(--muted)",
                    lineHeight: 1.5
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSPARENT PRICING SECTION */}
        <section style={{
          padding: "80px 5%",
          background: "#fff"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            <h2 style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#0f172a",
              letterSpacing: "-0.02em"
            }}>
              Transparent Pricing
            </h2>

            <p style={{
              margin: "0 auto 60px",
              maxWidth: "600px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--muted)"
            }}>
              Choose from our range of account types to match your business requirements
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              maxWidth: "1000px",
              margin: "0 auto"
            }}>
              {[
                {
                  title: "Basic",
                  description: "Perfect for small businesses and startups",
                  price: "₹50-100",
                  period: "/month",
                  features: [
                    "Basic profile setup",
                    "InMail credits included",
                    "WhatsApp credits included",
                    "LinkedIn features"
                  ],
                  buttonText: "Get Started",
                  popular: false
                },
                {
                  title: "Professional",
                  description: "Ideal for growing businesses and sales teams",
                  price: "₹100-150",
                  period: "/month",
                  features: [
                    "1+ years account age",
                    "Industry-specific networks",
                    "High SSI scores (50-80)",
                    "50+ InMail credits capacity",
                    "Quality recommendations"
                  ],
                  buttonText: "Most Popular",
                  popular: true
                },
                {
                  title: "Enterprise",
                  description: "For large organizations and enterprise sales",
                  price: "₹150-200",
                  period: "/month",
                  features: [
                    "Sales Navigator or Recruiter",
                    "Advanced targeting",
                    "CRM integration",
                    "3+ years account age",
                    "Executive-level positioning",
                    "High SSI scores (85-100)",
                    "Priority support included"
                  ],
                  buttonText: "Contact Sales",
                  popular: false
                }
              ].map((plan, index) => (
                <div
                  key={index}
                  style={{
                    padding: "24px",
                    borderRadius: "12px",
                    background: "#fff",
                    border: plan.popular ? "2px solid #067CCB" : "1px solid #e2e8f0",
                    position: "relative",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                      e.currentTarget.style.borderColor = "#067CCB";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "6px 20px",
                      borderRadius: "999px",
                      background: "#067CCB",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: "var(--font-heading, sans-serif)"
                    }}>
                      Most Popular
                    </div>
                  )}

                  <h3 style={{
                    margin: "0 0 8px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#0f172a"
                  }}>
                    {plan.title}
                  </h3>

                  <p style={{
                    margin: "0 0 24px",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "14px",
                    color: "var(--muted)"
                  }}>
                    {plan.description}
                  </p>

                  <div style={{ marginBottom: "32px" }}>
                    <span style={{
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "36px",
                      fontWeight: 800,
                      color: "#067CCB"
                    }}>
                      {plan.price}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "16px",
                      color: "var(--muted)"
                    }}>
                      {plan.period}
                    </span>
                  </div>

                  <ul style={{
                    margin: "0 0 32px",
                    padding: 0,
                    listStyle: "none"
                  }}>
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          marginBottom: "12px"
                        }}
                      >
                        <FaCircleCheck size={16} color="#10b981" style={{ marginTop: "2px", flexShrink: 0 }} />
                        <span style={{
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "#475569"
                        }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      borderRadius: "8px",
                      border: plan.popular ? "none" : "1px solid #067CCB",
                      background: plan.popular ? "#067CCB" : "transparent",
                      color: plan.popular ? "#fff" : "#067CCB",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "15px",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section style={{
          padding: "80px 5%",
          background: "#f8fafc"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            {/* Section Header */}
            <h2 style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#0f172a",
              letterSpacing: "-0.02em"
            }}>
              What Our Clients Say
            </h2>

            <p style={{
              margin: "0 auto 60px",
              maxWidth: "600px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--muted)"
            }}>
              Real results from real businesses
            </p>

            {/* Testimonials Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px"
            }}>
              {[
                {
                  name: "Rahul Sharma",
                  company: "TechStartup India",
                  text: "Booked a demo and got onboarded within 48 hours. The LinkedIn account helped us generate 3 qualified leads in the first week.",
                  rating: "⭐⭐⭐⭐⭐"
                },
                {
                  name: "Priya Mehta",
                  company: "Growth Agency",
                  text: "The account rental service is exactly what we needed. Verified accounts with real networks made all the difference.",
                  rating: "⭐⭐⭐⭐⭐"
                },
                {
                  name: "Arjun Patel",
                  company: "B2B Solutions",
                  text: "Skeptical at first but the results speak for themselves. Our outreach response rate doubled.",
                  rating: "⭐⭐⭐⭐⭐"
                },
                {
                  name: "Sneha Gupta",
                  company: "Marketing Pro",
                  text: "Professional service, quick setup, and excellent support. Highly recommend for any B2B business.",
                  rating: "⭐⭐⭐⭐⭐"
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  style={{
                    padding: "24px",
                    borderRadius: "12px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    cursor: "default"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#067CCB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  {/* Rating */}
                  <div style={{
                    marginBottom: "16px",
                    fontSize: "16px"
                  }}>
                    {testimonial.rating}
                  </div>

                  {/* Testimonial Text */}
                  <p style={{
                    margin: "0 0 20px",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "#475569",
                    fontStyle: "italic"
                  }}>
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div>
                    <div style={{
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "4px"
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      color: "var(--muted)",
                      fontWeight: 500
                    }}>
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={{
          padding: "80px 5%",
          background: "#fff"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            {/* Section Header */}
            <h2 style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#0f172a",
              letterSpacing: "-0.02em"
            }}>
              Frequently Asked Questions
            </h2>

            <p style={{
              margin: "0 auto 60px",
              maxWidth: "600px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--muted)"
            }}>
              Find answers to common questions about our LinkedIn account rental service
            </p>

            {/* FAQ Items */}
            <div style={{
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "left"
            }}>
              {[
                {
                  question: "How does the LinkedIn account rental process work?",
                  answer: "We provide you with access to verified LinkedIn accounts. After booking a demo, our team onboards you within 48 hours and sets up the account according to your business needs."
                },
                {
                  question: "Is it safe to use rented LinkedIn accounts?",
                  answer: "Yes, all our accounts are verified and follow LinkedIn's guidelines. We have a 100% safe track record with less than 5% restriction rate across all managed accounts."
                },
                {
                  question: "What security measures do you have in place?",
                  answer: "We use industry-standard security protocols, monitor account health daily, and provide immediate support if any issues arise. All accounts come with backup access and recovery support."
                },
                {
                  question: "Can I modify the LinkedIn profile during rental?",
                  answer: "Yes, within agreed guidelines. You can update the profile picture, headline, and posts. Major changes require approval from our team to maintain account safety."
                },
                {
                  question: "What happens if there's an issue with my rented account?",
                  answer: "Our support team is available 5 days a week. We provide immediate account recovery support and if needed, replace the account within 24-48 hours at no extra cost."
                }
              ].map((faq, index) => {
                const isOpen = openFAQ === index;
                
                return (
                  <div
                    key={index}
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      marginBottom: "16px",
                      overflow: "hidden"
                    }}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      style={{
                        width: "100%",
                        padding: "24px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#0f172a"
                      }}
                    >
                      <span>{faq.question}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                          flexShrink: 0,
                          marginLeft: "16px"
                        }}
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#067CCB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    
                    {isOpen && (
                      <div style={{
                        padding: "0 24px 24px",
                        borderTop: "1px solid #e2e8f0"
                      }}>
                        <p style={{
                          margin: "16px 0 0",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "15px",
                          lineHeight: 1.6,
                          color: "#475569"
                        }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import BookCallButton from "@/components/shared/BookCallButton";
import { HiEnvelope, HiPhone, HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaWhatsapp, FaTelegram } from "react-icons/fa6";
import { RiTwitterXLine, RiInstagramLine } from "react-icons/ri";

export default function ContactClient() {
  const contacts = [
    {
      icon: <HiEnvelope size={22} style={{ color: "#067CCB" }} />,
      label: "General Enquiries",
      value: "vibhanshu@techinrent.com",
      href: "mailto:vibhanshu@techinrent.com",
      bg: "#E6F4FB",
    },
    {
      icon: <HiEnvelope size={22} style={{ color: "#16a34a" }} />,
      label: "Account Recovery Support",
      value: "support@techinrent.com",
      href: "mailto:support@techinrent.com",
      bg: "#f0fdf4",
    },
    {
      icon: <FaWhatsapp size={22} style={{ color: "#25D366" }} />,
      label: "WhatsApp",
      value: "+91 78987 11748",
      href: "https://wa.me/917898711748",
      bg: "#f0fdf4",
    },
    {
      icon: <HiPhone size={22} style={{ color: "#067CCB" }} />,
      label: "Phone",
      value: "+91 78987 11748",
      href: "tel:+917898711748",
      bg: "#E6F4FB",
    },
    {
      icon: <FaTelegram size={22} style={{ color: "#2AABEE" }} />,
      label: "Telegram",
      value: "@techinrentadmin",
      href: "https://t.me/techinrentadmin",
      bg: "#eff6ff",
    },
  ];

  const social = [
    { icon: <RiTwitterXLine size={20} />, label: "Twitter / X", href: "https://twitter.com/techinrent" },
    { icon: <RiInstagramLine size={20} />, label: "Instagram", href: "https://instagram.com/techinrent" },
    { icon: <FaTelegram size={20} />, label: "Telegram", href: "https://t.me/techinrentadmin" },
  ];

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4fb 100%)", padding: "80px 24px 64px", textAlign: "center" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "999px", background: "rgba(6,124,203,0.1)", marginBottom: "20px" }}>
              <HiChatBubbleLeftRight size={14} style={{ color: "var(--teal)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "var(--teal)" }}>Get In Touch</span>
            </div>
            <h1 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.15 }}>
              Contact Us
            </h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "17px", color: "var(--muted)", lineHeight: 1.7 }}>
              Have a question or want to get started? We typically respond within a few hours.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section style={{ padding: "64px 24px", maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ display: "grid", gap: "16px" }}>
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "18px", padding: "20px 24px", borderRadius: "14px", border: "1px solid var(--line)", background: "#fff", textDecoration: "none", boxShadow: "var(--shadow-sm)", transition: "box-shadow 0.2s" }}
              >
                <div style={{ width: 48, height: 48, borderRadius: "12px", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.label}</p>
                  <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social */}
          <div style={{ marginTop: "48px", padding: "32px", borderRadius: "14px", background: "var(--off)", border: "1px solid var(--line)", textAlign: "center" }}>
            <p style={{ margin: "0 0 20px", fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>Follow us on social</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              {social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff", color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "32px", padding: "32px", borderRadius: "14px", background: "var(--teal)", textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 800, color: "#fff" }}>Prefer a live call?</p>
            <p style={{ margin: "0 0 20px", fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>Book a free 30-minute strategy consultation — no commitment required.</p>
            <BookCallButton
              label="Book a Free Call"
              style={{ display: "inline-block", padding: "12px 28px", borderRadius: "10px", background: "#fff", color: "var(--teal)", fontFamily: "var(--font-heading)", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer" }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

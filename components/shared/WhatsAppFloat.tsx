"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/917898711748"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "94px",
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        background: "#25d366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.38), 0 2px 8px rgba(37,211,102,0.2)",
        zIndex: 9999,
        textDecoration: "none",
        transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
        animation: "whatsappFloat 3s ease-in-out infinite",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,0.5)";
        e.currentTarget.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.38), 0 2px 8px rgba(37,211,102,0.2)";
        e.currentTarget.style.animationPlayState = "running";
      }}
    >
      <FaWhatsapp size={26} color="#fff" />
    </a>
  );
}

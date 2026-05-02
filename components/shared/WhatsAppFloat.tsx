"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/917898711748"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="wa-float-btn"
    >
      {/* Tooltip */}
      <span className="wa-tooltip">Chat with us</span>
      <FaWhatsapp size={26} color="#fff" />
    </a>
  );
}

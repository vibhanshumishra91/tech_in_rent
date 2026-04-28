'use client';

import { useEffect, useState } from 'react';
import { PopupButton } from 'react-calendly';

export default function BookDemoButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "16px 32px",
          borderRadius: "10px",
          textDecoration: "none",
          background: "var(--ink)",
          color: "#fff",
          fontFamily: "var(--font-heading, sans-serif)",
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.02em",
          boxShadow: "0 4px 14px rgba(15,23,42,0.15)",
          transition: "all 0.3s ease",
          border: "none",
          cursor: "pointer"
        }}
      >
        Book A Demo
      </button>
    );
  }

  return (
    <PopupButton
      url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/salil9tiwari2002/30min"}
      rootElement={document.body}
      text="Book A Demo"
      styles={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "16px 32px",
        borderRadius: "10px",
        textDecoration: "none",
        background: "var(--ink)",
        color: "#fff",
        fontFamily: "var(--font-heading, sans-serif)",
        fontSize: "15px",
        fontWeight: 700,
        letterSpacing: "0.02em",
        boxShadow: "0 4px 14px rgba(15,23,42,0.15)",
        transition: "all 0.3s ease",
        border: "none",
        cursor: "pointer"
      }}
    />
  );
}

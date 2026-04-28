"use client";

import { HiCog6Tooth, HiClock } from "react-icons/hi2";

export default function SettingsPage() {
  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}
        >
          Settings
        </h1>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          Configure system settings and preferences
        </p>
      </div>

      {/* Coming Soon Card */}
      <div
        style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          padding: "64px 32px",
          boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "var(--teal-pale)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <HiCog6Tooth size={40} style={{ color: "var(--teal)" }} />
        </div>
        <h2
          style={{
            margin: "0 0 12px",
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--ink)",
          }}
        >
          Settings & Configuration
        </h2>
        <p
          style={{
            margin: "0 0 24px",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "16px",
            color: "var(--muted)",
            lineHeight: 1.6,
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          This feature is currently under development. Soon you'll be able to configure
          system settings, manage preferences, and customize your admin experience.
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "var(--teal-pale)",
            border: "1px solid var(--teal-border)",
            borderRadius: "10px",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--teal)",
          }}
        >
          <HiClock size={18} />
          Coming Soon
        </div>
      </div>
    </div>
  );
}

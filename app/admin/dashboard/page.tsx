"use client";

import {
  HiChartBar,
  HiDocumentText,
  HiShoppingCart,
  HiUsers,
} from "react-icons/hi2";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Leads", value: "248", icon: <HiUsers size={24} />, color: "var(--teal)" },
    { label: "Total Orders", value: "89", icon: <HiShoppingCart size={24} />, color: "var(--teal-dark)" },
    { label: "Active Sessions", value: "12", icon: <HiChartBar size={24} />, color: "var(--teal-mid)" },
    { label: "Last Login", value: "Today", icon: <HiDocumentText size={24} />, color: "var(--teal-deep)" },
  ];

  const recentActivity = [
    { action: "Admin logged in", time: "2 minutes ago", type: "auth" },
    { action: "New lead submitted", time: "15 minutes ago", type: "lead" },
    { action: "Order #1234 created", time: "1 hour ago", type: "order" },
    { action: "Admin logged in", time: "3 hours ago", type: "auth" },
    { action: "New lead submitted", time: "5 hours ago", type: "lead" },
  ];

  return (
    <div style={{ padding: "32px", maxWidth: "1400px" }}>
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
          Dashboard
        </h1>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          Welcome back, Admin
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "var(--white)",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--teal-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "32px",
                fontWeight: 800,
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "var(--muted)",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
        }}
      >
        <h2
          style={{
            margin: "0 0 20px",
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--ink)",
          }}
        >
          Recent Activity
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                background: "var(--off)",
                borderRadius: "10px",
                border: "1px solid var(--line)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background:
                      activity.type === "auth"
                        ? "var(--teal)"
                        : activity.type === "lead"
                          ? "var(--teal-mid)"
                          : "var(--teal-dark)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "14px",
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  {activity.action}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "13px",
                  color: "var(--muted)",
                }}
              >
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

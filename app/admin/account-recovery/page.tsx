"use client";

import { HiPlus } from "react-icons/hi2";

export default function RecruiterPage() {
  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ 
        marginBottom: "32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }}>
        <div>
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
            Account Recovery
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              color: "var(--muted)",
            }}
          >
            Manage LinkedIn account recovery requests
          </p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "#067CCB",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          <HiPlus size={16} />
          New Request
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        marginBottom: "32px"
      }}>
        {[
          { title: "Total Requests", value: "0", color: "#067CCB" },
          { title: "In Progress", value: "0", color: "#f59e0b" },
          { title: "Resolved", value: "0", color: "#16a34a" }
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(13,31,30,0.04)"
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}>
              <h3 style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--muted)"
              }}>
                {stat.title}
              </h3>
            </div>
            <p style={{
              margin: 0,
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "32px",
              fontWeight: 800,
              color: stat.color
            }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recovery Requests Table */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
          overflow: "hidden"
        }}
      >
        {/* Table Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e2e8f0",
          background: "#f8fafc"
        }}>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--ink)"
          }}>
            Recovery Requests
          </h2>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Name", "Email", "LinkedIn URL", "Issue", "Status", "Date"].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "16px 24px",
                      textAlign: "left",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderBottom: "1px solid #e2e8f0"
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Empty State */}
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: "64px 24px",
                    textAlign: "center",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "16px",
                    color: "var(--muted)"
                  }}
                >
                  No recovery requests yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
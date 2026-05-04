"use client";

import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";

interface RecoveryRequest {
  _id: string;
  name: string;
  email: string;
  linkedinUrl: string;
  issueType: string;
  description: string;
  status: "pending" | "in_progress" | "resolved";
  createdAt: string;
}

export default function RecruiterPage() {
  const [requests, setRequests] = useState<RecoveryRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/recovery-requests");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch requests");
      }

      setRequests(data.data || []);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to load recovery requests"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
      in_progress: { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
      resolved: { bg: "#d1fae5", color: "#065f46", border: "#a7f3d0" },
    };

    const style = styles[status as keyof typeof styles] || styles.pending;

    return (
      <span
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 600,
          background: style.bg,
          color: style.color,
          border: `1px solid ${style.border}`,
          textTransform: "capitalize",
        }}
      >
        {status.replace("_", " ")}
      </span>
    );
  };

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const inProgressRequests = requests.filter((r) => r.status === "in_progress").length;
  const resolvedRequests = requests.filter((r) => r.status === "resolved").length;

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
            Manage LinkedIn account recovery requests ({totalRequests} total)
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: "16px",
            marginBottom: "24px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            color: "#dc2626",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "24px",
        marginBottom: "32px"
      }}>
        {[
          { title: "Total Requests", value: totalRequests, color: "#067CCB" },
          { title: "Pending", value: pendingRequests, color: "#f59e0b" },
          { title: "In Progress", value: inProgressRequests, color: "#3b82f6" },
          { title: "Resolved", value: resolvedRequests, color: "#16a34a" }
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

        {/* Loading State */}
        {loading && (
          <div style={{ padding: "64px 24px", textAlign: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid #f3f4f6",
                borderTop: "4px solid #067CCB",
                borderRadius: "50%",
                margin: "0 auto 16px",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ margin: 0, fontSize: "16px", color: "#64748b" }}>
              Loading requests...
            </p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Table */}
        {!loading && (
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
                {requests.length === 0 ? (
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
                ) : (
                  requests.map((request) => (
                    <tr
                      key={request._id}
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td
                        style={{
                          padding: "16px 24px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        {request.name}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--body)",
                        }}
                      >
                        {request.email}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "13px",
                          color: "var(--body)",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <a
                          href={request.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#067CCB", textDecoration: "none" }}
                        >
                          {request.linkedinUrl}
                        </a>
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--body)",
                        }}
                      >
                        {request.issueType}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        {getStatusBadge(request.status)}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--body)",
                        }}
                      >
                        {formatDate(request.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

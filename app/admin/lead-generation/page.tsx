"use client";

import { useState, useEffect } from "react";
import {
  HiMapPin,
  HiCalendarDays,
  HiCheckCircle,
  HiClock,
  HiXCircle,
} from "react-icons/hi2";

interface LeadRequest {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  targetRole: string;
  targetLocation: string;
  companySize: string;
  numberOfLeads: number;
  budget: string;
  timeline: string;
  description: string;
  linkedinProfile?: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
}

export default function LeadGenerationPage() {
  const [requests, setRequests] = useState<LeadRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "completed">("all");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/admin/lead-generation");
      const data = await response.json();
      setRequests(data.data || []);
    } catch (error) {
      console.error("Failed to fetch lead generation requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((req) => req.status === filter);

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const inProgressRequests = requests.filter(
    (r) => r.status === "in_progress"
  ).length;
  const completedRequests = requests.filter(
    (r) => r.status === "completed"
  ).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return { bg: "#fef3c7", color: "#f59e0b", border: "#fde68a" };
      case "in_progress":
        return { bg: "#dbeafe", color: "#3b82f6", border: "#bfdbfe" };
      case "completed":
        return { bg: "#dcfce7", color: "#16a34a", border: "#bbf7d0" };
      default:
        return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <HiClock size={14} />;
      case "in_progress":
        return <HiCalendarDays size={14} />;
      case "completed":
        return <HiCheckCircle size={14} />;
      default:
        return <HiXCircle size={14} />;
    }
  };

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
          Lead Generation
        </h1>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          Manage B2B lead generation requests
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
        className="stats-grid"
      >
        {/* Total Requests */}
        <div
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
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#fce7f3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HiMapPin size={24} style={{ color: "#ec4899" }} />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#ec4899",
                }}
              >
                {totalRequests}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  color: "var(--muted)",
                }}
              >
                Total Requests
              </p>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div
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
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HiClock size={24} style={{ color: "#f59e0b" }} />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#f59e0b",
                }}
              >
                {pendingRequests}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  color: "var(--muted)",
                }}
              >
                Pending
              </p>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div
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
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HiCalendarDays size={24} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#3b82f6",
                }}
              >
                {inProgressRequests}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  color: "var(--muted)",
                }}
              >
                In Progress
              </p>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div
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
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#dcfce7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HiCheckCircle size={24} style={{ color: "#16a34a" }} />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#16a34a",
                }}
              >
                {completedRequests}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  color: "var(--muted)",
                }}
              >
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "24px 32px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--ink)",
            }}
          >
            Lead Requests
          </h2>

          {/* Filter Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { label: "All", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "In Progress", value: "in_progress" },
              { label: "Completed", value: "completed" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background:
                    filter === tab.value ? "var(--teal)" : "transparent",
                  color: filter === tab.value ? "#fff" : "var(--body)",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (filter !== tab.value) {
                    e.currentTarget.style.background = "var(--off)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== tab.value) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div
            style={{
              padding: "64px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid var(--line)",
                borderTop: "3px solid var(--teal)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "var(--muted)",
              }}
            >
              Loading requests...
            </p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div
            style={{
              padding: "64px",
              textAlign: "center",
            }}
          >
            <HiMapPin
              size={48}
              style={{ color: "var(--muted)", marginBottom: "16px" }}
            />
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "16px",
                color: "var(--muted)",
              }}
            >
              No lead generation requests yet
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "var(--off)" }}>
                  <th
                    style={{
                      padding: "16px 32px",
                      textAlign: "left",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    Company
                  </th>
                  <th
                    style={{
                      padding: "16px 32px",
                      textAlign: "left",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    Contact
                  </th>
                  <th
                    style={{
                      padding: "16px 32px",
                      textAlign: "left",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    Target
                  </th>
                  <th
                    style={{
                      padding: "16px 32px",
                      textAlign: "left",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    Leads
                  </th>
                  <th
                    style={{
                      padding: "16px 32px",
                      textAlign: "left",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    Timeline
                  </th>
                  <th
                    style={{
                      padding: "16px 32px",
                      textAlign: "left",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      padding: "16px 32px",
                      textAlign: "left",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => {
                  const statusStyle = getStatusColor(request.status);
                  return (
                    <tr key={request._id}>
                      <td
                        style={{
                          padding: "16px 32px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--ink)",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{request.company}</div>
                        <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                          {request.industry}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px 32px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--muted)",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        <div>{request.name}</div>
                        <div style={{ fontSize: "13px" }}>{request.email}</div>
                        <div style={{ fontSize: "13px" }}>{request.phone}</div>
                      </td>
                      <td
                        style={{
                          padding: "16px 32px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--ink)",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{request.targetRole}</div>
                        <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                          {request.targetLocation}
                        </div>
                        <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                          {request.companySize} employees
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px 32px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--ink)",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        {request.numberOfLeads}
                      </td>
                      <td
                        style={{
                          padding: "16px 32px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--muted)",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        {request.timeline}
                      </td>
                      <td
                        style={{
                          padding: "16px 32px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "14px",
                          color: "var(--muted)",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        {formatDate(request.createdAt)}
                      </td>
                      <td
                        style={{
                          padding: "16px 32px",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "4px 12px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: 600,
                            fontFamily: "var(--font-body, sans-serif)",
                            background: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`,
                          }}
                        >
                          {getStatusIcon(request.status)}
                          {request.status === "in_progress"
                            ? "In Progress"
                            : request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

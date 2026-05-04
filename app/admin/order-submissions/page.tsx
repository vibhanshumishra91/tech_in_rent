"use client";

import { useEffect, useState } from "react";
import { HiCheckCircle, HiClock, HiXCircle } from "react-icons/hi2";

type SubmissionStatus = "pending_verification" | "verified" | "rejected";

interface OrderSubmissionItem {
  _id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  linkedinUrl: string;
  notes?: string;
  packageId: string;
  packageName: string;
  amountInr: number;
  displayPrice: string;
  delivery: string;
  paymentMethod: string;
  paymentOption: string;
  paymentProofUrl: string;
  status: SubmissionStatus;
  createdAt: string;
}

export default function OrderSubmissionsPage() {
  const [items, setItems] = useState<OrderSubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | SubmissionStatus>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    try {
      const response = await fetch("/api/admin/order-submissions");
      const result = (await response.json()) as {
        data?: OrderSubmissionItem[];
      };
      setItems(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Failed to fetch order submissions:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateSubmissionStatus(
    id: string,
    status: SubmissionStatus,
  ) {
    try {
      setActionError(null);
      setUpdatingId(id);

      const response = await fetch(`/api/admin/order-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setActionError(result.message ?? "Failed to update status.");
        return;
      }

      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item)),
      );
    } catch {
      setActionError("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.status === filter);

  const pendingCount = items.filter(
    (item) => item.status === "pending_verification",
  ).length;
  const verifiedCount = items.filter((item) => item.status === "verified").length;
  const rejectedCount = items.filter((item) => item.status === "rejected").length;

  function formatDate(value: string) {
    const date = new Date(value);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusStyles(status: SubmissionStatus) {
    switch (status) {
      case "pending_verification":
        return { bg: "#fef3c7", color: "#b45309", border: "#fde68a" };
      case "verified":
        return { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" };
      case "rejected":
        return { bg: "#fee2e2", color: "#b91c1c", border: "#fecaca" };
      default:
        return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
    }
  }

  function getStatusIcon(status: SubmissionStatus) {
    switch (status) {
      case "pending_verification":
        return <HiClock size={14} />;
      case "verified":
        return <HiCheckCircle size={14} />;
      case "rejected":
        return <HiXCircle size={14} />;
      default:
        return <HiClock size={14} />;
    }
  }

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
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
          Order Submissions
        </h1>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          View checkout submissions and payment proof uploads
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "24px",
        }}
        className="stats-grid"
      >
        <StatCard label="Total" value={items.length} color="#0ea5e9" bg="#e0f2fe" />
        <StatCard label="Pending" value={pendingCount} color="#b45309" bg="#fef3c7" />
        <StatCard label="Verified" value={verifiedCount} color="#166534" bg="#dcfce7" />
        <StatCard label="Rejected" value={rejectedCount} color="#b91c1c" bg="#fee2e2" />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "All", value: "all" as const },
          { label: "Pending", value: "pending_verification" as const },
          { label: "Verified", value: "verified" as const },
          { label: "Rejected", value: "rejected" as const },
        ].map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              style={{
                border: active ? "1px solid var(--teal-border)" : "1px solid var(--line)",
                background: active ? "var(--teal-pale)" : "#fff",
                color: active ? "var(--teal-deep)" : "var(--body)",
                borderRadius: "999px",
                padding: "8px 14px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div style={{ color: "var(--muted)" }}>Loading order submissions...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ color: "var(--muted)" }}>No order submissions found.</div>
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          {filteredItems.map((item) => {
            const statusStyles = getStatusStyles(item.status);
            return (
              <article
                key={item._id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: "0 0 4px",
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "20px",
                        color: "var(--ink)",
                      }}
                    >
                      {item.fullName}
                    </h3>
                    <p style={{ margin: 0, color: "var(--muted)", fontSize: "14px" }}>
                      {item.email} • {item.countryCode} {item.phone}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      borderRadius: "999px",
                      padding: "6px 10px",
                      border: `1px solid ${statusStyles.border}`,
                      background: statusStyles.bg,
                      color: statusStyles.color,
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {getStatusIcon(item.status)}
                    {item.status.replace(/_/g, " ")}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "10px 18px",
                    marginTop: "14px",
                  }}
                  className="order-grid"
                >
                  <p style={{ margin: 0, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>Package:</strong> {item.packageName}
                  </p>
                  <p style={{ margin: 0, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>Price:</strong> {item.displayPrice}
                  </p>
                  <p style={{ margin: 0, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>Delivery:</strong> {item.delivery}
                  </p>
                  <p style={{ margin: 0, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>Payment:</strong> {item.paymentMethod} ({item.paymentOption})
                  </p>
                  <p style={{ margin: 0, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>LinkedIn:</strong>{" "}
                    <a href={item.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: "var(--teal-deep)" }}>
                      Open profile
                    </a>
                  </p>
                  <p style={{ margin: 0, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>Submitted:</strong> {formatDate(item.createdAt)}
                  </p>
                </div>

                {item.notes ? (
                  <p style={{ margin: "12px 0 0", color: "var(--muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>Notes:</strong> {item.notes}
                  </p>
                ) : null}

                <div style={{ marginTop: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => updateSubmissionStatus(item._id, "verified")}
                      disabled={updatingId === item._id || item.status === "verified"}
                      style={{
                        border: "none",
                        background: item.status === "verified" ? "#bbf7d0" : "#16a34a",
                        color: item.status === "verified" ? "#166534" : "#fff",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontWeight: 700,
                        cursor:
                          updatingId === item._id || item.status === "verified"
                            ? "not-allowed"
                            : "pointer",
                        opacity: updatingId === item._id ? 0.7 : 1,
                      }}
                    >
                      {updatingId === item._id ? "Updating..." : "Accept"}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSubmissionStatus(item._id, "rejected")}
                      disabled={updatingId === item._id || item.status === "rejected"}
                      style={{
                        border: "1px solid #fecaca",
                        background: item.status === "rejected" ? "#fee2e2" : "#fff",
                        color: "#b91c1c",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontWeight: 700,
                        cursor:
                          updatingId === item._id || item.status === "rejected"
                            ? "not-allowed"
                            : "pointer",
                        opacity: updatingId === item._id ? 0.7 : 1,
                      }}
                    >
                      {updatingId === item._id ? "Updating..." : "Reject"}
                    </button>
                  </div>
                  <a
                    href={item.paymentProofUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      textDecoration: "none",
                      background: "var(--teal)",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    View payment proof
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {actionError ? (
        <p style={{ marginTop: "14px", color: "#b91c1c", fontWeight: 600 }}>
          {actionError}
        </p>
      ) : null}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: number;
  color: string;
  bg: string;
}) {
  return (
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
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: bg,
          marginBottom: "12px",
        }}
      />
      <h3
        style={{
          margin: "0 0 4px",
          fontFamily: "var(--font-heading, sans-serif)",
          fontSize: "30px",
          color,
        }}
      >
        {value}
      </h3>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: "14px" }}>{label}</p>
    </div>
  );
}

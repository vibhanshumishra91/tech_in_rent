"use client";

import { useEffect, useMemo, useState } from "react";
import {
  HiArrowPath,
  HiArrowTopRightOnSquare,
  HiCheckCircle,
  HiClock,
  HiUsers,
  HiXCircle,
} from "react-icons/hi2";

type SubmissionStatus = "pending_verification" | "verified" | "rejected";

interface LinkedInConnectionOrder {
  _id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  linkedinUrl: string;
  notes?: string;
  packageId: string;
  packageName: string;
  displayPrice: string;
  paymentMethod: string;
  paymentOption: string;
  paymentProofUrl: string;
  status: SubmissionStatus;
  createdAt: string;
}

const CONNECTION_PACKAGE_PREFIX = "connections-";

export default function LinkedInConnectionPage() {
  const [items, setItems] = useState<LinkedInConnectionOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | SubmissionStatus>("all");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    void fetchLinkedInConnections();
  }, []);

  async function fetchLinkedInConnections() {
    try {
      setLoading(true);
      setActionError(null);

      const response = await fetch("/api/admin/order-submissions");
      const result = (await response.json()) as { data?: LinkedInConnectionOrder[] };

      const submissions = Array.isArray(result.data) ? result.data : [];
      setItems(
        submissions.filter((item) =>
          String(item.packageId).toLowerCase().startsWith(CONNECTION_PACKAGE_PREFIX),
        ),
      );
    } catch {
      setActionError("Failed to load LinkedIn connection orders.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    try {
      setRefreshing(true);
      await fetchLinkedInConnections();
    } finally {
      setRefreshing(false);
    }
  }

  async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
    try {
      setUpdatingId(id);
      setActionError(null);

      const response = await fetch(`/api/admin/order-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setActionError(result.message ?? "Failed to update status.");
        return;
      }

      setItems((prev) => prev.map((item) => (item._id === id ? { ...item, status } : item)));
    } catch {
      setActionError("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredItems = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.status === filter)),
    [filter, items],
  );

  const pendingCount = items.filter((item) => item.status === "pending_verification").length;
  const verifiedCount = items.filter((item) => item.status === "verified").length;
  const rejectedCount = items.filter((item) => item.status === "rejected").length;

  function formatDate(value: string) {
    return new Date(value).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function statusStyles(status: SubmissionStatus) {
    if (status === "verified") {
      return { bg: "#dcfce7", border: "#bbf7d0", color: "#166534" };
    }
    if (status === "rejected") {
      return { bg: "#fee2e2", border: "#fecaca", color: "#b91c1c" };
    }
    return { bg: "#fef3c7", border: "#fde68a", color: "#b45309" };
  }

  function statusIcon(status: SubmissionStatus) {
    if (status === "verified") return <HiCheckCircle size={14} />;
    if (status === "rejected") return <HiXCircle size={14} />;
    return <HiClock size={14} />;
  }

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div
        style={{
          marginBottom: "28px",
          borderRadius: "18px",
          border: "1px solid var(--teal-border)",
          background:
            "linear-gradient(140deg, rgba(6,124,203,0.11) 0%, rgba(6,124,203,0.03) 40%, #fff 100%)",
          boxShadow: "0 16px 30px rgba(6,124,203,0.08)",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                background: "rgba(6,124,203,0.12)",
                border: "1px solid rgba(6,124,203,0.18)",
                color: "#075985",
                fontWeight: 700,
                fontSize: "12px",
                padding: "6px 10px",
                marginBottom: "10px",
              }}
            >
              <HiUsers size={14} />
              LinkedIn Fulfillment Desk
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "30px",
                fontWeight: 800,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              LinkedIn Connection
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "var(--muted)",
                maxWidth: "680px",
              }}
            >
              Review connection orders, verify payment proof, and keep delivery queue clean.{" "}
              <strong style={{ color: "var(--ink)" }}>{items.length}</strong> total requests.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              background: "#fff",
              color: "var(--ink)",
              padding: "10px 14px",
              fontWeight: 700,
              cursor: refreshing ? "not-allowed" : "pointer",
              opacity: refreshing ? 0.75 : 1,
              boxShadow: "0 4px 10px rgba(13,31,30,0.06)",
            }}
          >
            <HiArrowPath
              size={16}
              style={{
                animation: refreshing ? "spin 0.8s linear infinite" : "none",
              }}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
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
        <StatCard
          label="Total"
          value={items.length}
          color="#0ea5e9"
          bg="#e0f2fe"
          icon={<HiUsers size={22} color="#0ea5e9" />}
        />
        <StatCard
          label="Pending"
          value={pendingCount}
          color="#b45309"
          bg="#fef3c7"
          icon={<HiClock size={22} color="#b45309" />}
        />
        <StatCard
          label="Verified"
          value={verifiedCount}
          color="#166534"
          bg="#dcfce7"
          icon={<HiCheckCircle size={22} color="#166534" />}
        />
        <StatCard
          label="Rejected"
          value={rejectedCount}
          color="#b91c1c"
          bg="#fee2e2"
          icon={<HiXCircle size={22} color="#b91c1c" />}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid var(--line)",
          borderRadius: "14px",
          padding: "10px",
        }}
      >
        {[
          { label: "All", value: "all" as const, count: items.length },
          { label: "Pending", value: "pending_verification" as const, count: pendingCount },
          { label: "Verified", value: "verified" as const, count: verifiedCount },
          { label: "Rejected", value: "rejected" as const, count: rejectedCount },
        ].map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              style={{
                border: active ? "1px solid var(--teal-border)" : "1px solid var(--line)",
                background: active ? "var(--teal-pale)" : "#fff",
                color: active ? "var(--teal-deep)" : "var(--body)",
                borderRadius: "999px",
                padding: "8px 14px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              {option.label}
              <span
                style={{
                  borderRadius: "999px",
                  padding: "2px 8px",
                  fontSize: "12px",
                  background: active ? "rgba(6,124,203,0.18)" : "var(--off)",
                  color: active ? "var(--teal-deep)" : "var(--muted)",
                }}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div
          style={{
            background: "var(--white)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            color: "var(--muted)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              border: "3px solid #dbeafe",
              borderTop: "3px solid var(--teal)",
              animation: "spin 0.8s linear infinite",
            }}
          />
          Loading LinkedIn connection orders...
        </div>
      ) : filteredItems.length === 0 ? (
        <div
          style={{
            background: "var(--white)",
            border: "1px solid var(--line)",
            borderRadius: "14px",
            padding: "40px 28px",
            color: "var(--muted)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--teal-pale)",
              border: "1px solid var(--teal-border)",
              color: "var(--teal)",
            }}
          >
            <HiUsers size={24} />
          </div>
          No LinkedIn connection orders found for this filter.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredItems.map((item) => {
            const styles = statusStyles(item.status);
            const initials = item.fullName
              .split(" ")
              .map((part) => part[0] ?? "")
              .join("")
              .slice(0, 2)
              .toUpperCase();
            return (
              <article
                key={item._id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  padding: "18px",
                  boxShadow: "0 6px 14px rgba(13,31,30,0.04)",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                }}
                className="connection-card"
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
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "999px",
                          background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          fontWeight: 800,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {initials}
                      </div>
                      <div>
                        <h3
                          style={{
                            margin: "0 0 3px",
                            fontFamily: "var(--font-heading, sans-serif)",
                            fontSize: "20px",
                            color: "var(--ink)",
                          }}
                        >
                          {item.fullName}
                        </h3>
                        <p style={{ margin: 0, color: "var(--muted)", fontSize: "14px" }}>
                          {item.email} | {item.countryCode} {item.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      borderRadius: "999px",
                      padding: "6px 10px",
                      border: `1px solid ${styles.border}`,
                      background: styles.bg,
                      color: styles.color,
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {statusIcon(item.status)}
                    {item.status.replace(/_/g, " ")}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "10px 12px",
                    marginTop: "14px",
                  }}
                  className="connection-grid"
                >
                  <InfoTile label="Package" value={item.packageName} />
                  <InfoTile label="Price" value={item.displayPrice} />
                  <InfoTile label="Payment" value={`${item.paymentMethod} (${item.paymentOption})`} />
                  <InfoTile label="Submitted" value={formatDate(item.createdAt)} />
                  <InfoTile
                    label="LinkedIn"
                    value={
                      <a
                        href={item.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "var(--teal-deep)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontWeight: 700,
                        }}
                      >
                        Open profile
                        <HiArrowTopRightOnSquare size={14} />
                      </a>
                    }
                    fullWidth
                  />
                </div>

                {item.notes ? (
                  <div
                    style={{
                      marginTop: "12px",
                      background: "var(--off)",
                      border: "1px solid var(--line)",
                      borderRadius: "10px",
                      padding: "10px 12px",
                      color: "var(--muted)",
                      fontSize: "14px",
                    }}
                  >
                    <strong style={{ color: "var(--ink)" }}>Notes:</strong> {item.notes}
                  </div>
                ) : null}

                <div
                  style={{
                    marginTop: "14px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => updateSubmissionStatus(item._id, "verified")}
                    disabled={updatingId === item._id || item.status === "verified"}
                    style={{
                      border: "none",
                      background: item.status === "verified" ? "#bbf7d0" : "#15803d",
                      color: item.status === "verified" ? "#166534" : "#fff",
                      borderRadius: "10px",
                      padding: "9px 14px",
                      fontWeight: 700,
                      cursor:
                        updatingId === item._id || item.status === "verified" ? "not-allowed" : "pointer",
                      opacity: updatingId === item._id ? 0.7 : 1,
                      boxShadow: "0 6px 12px rgba(21,128,61,0.24)",
                    }}
                  >
                    {updatingId === item._id
                      ? "Updating..."
                      : item.status === "verified"
                        ? "Accepted"
                        : "Accept"}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSubmissionStatus(item._id, "rejected")}
                    disabled={updatingId === item._id || item.status === "rejected"}
                    style={{
                      border: "1px solid #fecaca",
                      background: item.status === "rejected" ? "#fee2e2" : "#fff",
                      color: "#b91c1c",
                      borderRadius: "10px",
                      padding: "9px 14px",
                      fontWeight: 700,
                      cursor:
                        updatingId === item._id || item.status === "rejected" ? "not-allowed" : "pointer",
                      opacity: updatingId === item._id ? 0.7 : 1,
                    }}
                  >
                    {updatingId === item._id
                      ? "Updating..."
                      : item.status === "rejected"
                        ? "Rejected"
                        : "Reject"}
                  </button>
                  <a
                    href={item.paymentProofUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none",
                      background: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
                      color: "#fff",
                      padding: "9px 14px",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "13px",
                      boxShadow: "0 6px 14px rgba(14,116,144,0.3)",
                    }}
                  >
                    <HiArrowTopRightOnSquare size={14} />
                    View payment proof
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {actionError ? (
        <p style={{ marginTop: "14px", color: "#b91c1c", fontWeight: 600 }}>{actionError}</p>
      ) : null}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .connection-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(13,31,30,0.08);
        }
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 700px) {
          .hero-actions {
            width: 100%;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .connection-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  bg,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  bg: string;
  icon: React.ReactNode;
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
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

function InfoTile({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      style={{
        margin: 0,
        color: "var(--muted)",
        background: "var(--off)",
        border: "1px solid var(--line)",
        borderRadius: "10px",
        padding: "10px 12px",
        minHeight: "58px",
        gridColumn: fullWidth ? "1 / -1" : "auto",
      }}
    >
      <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", fontWeight: 700 }}>{label}</p>
      <div style={{ marginTop: "2px", color: "var(--ink)", fontSize: "14px", lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

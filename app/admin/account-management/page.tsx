"use client";

import { useState, useEffect } from "react";
import { HiUserGroup, HiClock, HiCalendarDays, HiCheckCircle, HiXCircle } from "react-icons/hi2";

interface Booking {
  _id: string;
  name: string;
  email: string;
  event_type: string;
  start_time: string;
  end_time: string;
  status: string;
  invitee_uuid: string;
  created_at: string;
}

export default function AccountManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          Account Management
        </h1>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          Calendly bookings dashboard and analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        marginBottom: "32px"
      }}>
        {/* Total Bookings */}
        <div style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(13,31,30,0.04)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <HiCalendarDays size={24} style={{ color: "#2563eb" }} />
            </div>
            <div>
              <h3 style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "32px",
                fontWeight: 800,
                color: "#2563eb"
              }}>
                {totalBookings}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "var(--muted)"
              }}>
                Total Bookings
              </p>
            </div>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(13,31,30,0.04)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#dcfce7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <HiCheckCircle size={24} style={{ color: "#16a34a" }} />
            </div>
            <div>
              <h3 style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "32px",
                fontWeight: 800,
                color: "#16a34a"
              }}>
                {confirmedBookings}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "var(--muted)"
              }}>
                Confirmed
              </p>
            </div>
          </div>
        </div>

        {/* Cancelled Bookings */}
        <div style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(13,31,30,0.04)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <HiXCircle size={24} style={{ color: "#dc2626" }} />
            </div>
            <div>
              <h3 style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "32px",
                fontWeight: 800,
                color: "#dc2626"
              }}>
                {cancelledBookings}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                color: "var(--muted)"
              }}>
                Cancelled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div style={{
        background: "var(--white)",
        border: "1px solid var(--line)",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "24px 32px",
          borderBottom: "1px solid var(--line)"
        }}>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--ink)"
          }}>
            Recent Bookings
          </h2>
        </div>

        {loading ? (
          <div style={{
            padding: "64px",
            textAlign: "center"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--line)",
              borderTop: "3px solid var(--teal)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px"
            }} />
            <p style={{
              margin: 0,
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              color: "var(--muted)"
            }}>
              Loading bookings...
            </p>
          </div>
        ) : bookings.length === 0 ? (
          <div style={{
            padding: "64px",
            textAlign: "center"
          }}>
            <HiCalendarDays size={48} style={{ color: "var(--muted)", marginBottom: "16px" }} />
            <p style={{
              margin: 0,
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "16px",
              color: "var(--muted)"
            }}>
              No bookings yet
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse"
            }}>
              <thead>
                <tr style={{ background: "var(--off)" }}>
                  <th style={{
                    padding: "16px 32px",
                    textAlign: "left",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderBottom: "1px solid var(--line)"
                  }}>
                    Name
                  </th>
                  <th style={{
                    padding: "16px 32px",
                    textAlign: "left",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderBottom: "1px solid var(--line)"
                  }}>
                    Email
                  </th>
                  <th style={{
                    padding: "16px 32px",
                    textAlign: "left",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderBottom: "1px solid var(--line)"
                  }}>
                    Event
                  </th>
                  <th style={{
                    padding: "16px 32px",
                    textAlign: "left",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderBottom: "1px solid var(--line)"
                  }}>
                    Date & Time
                  </th>
                  <th style={{
                    padding: "16px 32px",
                    textAlign: "left",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderBottom: "1px solid var(--line)"
                  }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td style={{
                      padding: "16px 32px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)"
                    }}>
                      {booking.name}
                    </td>
                    <td style={{
                      padding: "16px 32px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      color: "var(--muted)",
                      borderBottom: "1px solid var(--line)"
                    }}>
                      {booking.email}
                    </td>
                    <td style={{
                      padding: "16px 32px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--line)"
                    }}>
                      {booking.event_type}
                    </td>
                    <td style={{
                      padding: "16px 32px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      color: "var(--muted)",
                      borderBottom: "1px solid var(--line)"
                    }}>
                      {formatDateTime(booking.start_time)}
                    </td>
                    <td style={{
                      padding: "16px 32px",
                      borderBottom: "1px solid var(--line)"
                    }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 600,
                        fontFamily: "var(--font-body, sans-serif)",
                        background: booking.status === 'confirmed' ? "#dcfce7" : "#fee2e2",
                        color: booking.status === 'confirmed' ? "#16a34a" : "#dc2626"
                      }}>
                        {booking.status === 'confirmed' ? (
                          <HiCheckCircle size={14} />
                        ) : (
                          <HiXCircle size={14} />
                        )}
                        {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                      </span>
                    </td>
                  </tr>
                ))}
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
      `}</style>
    </div>
  );
}

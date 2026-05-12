"use client";

import { useState, useEffect } from "react";
import { PopupModal } from "react-calendly";
import { HiUserGroup, HiClock, HiCalendarDays, HiCheckCircle, HiXCircle, HiUser, HiEnvelope, HiGlobeAlt, HiArrowPath, HiVideoCamera, HiXMark, HiChatBubbleLeftRight } from "react-icons/hi2";

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
  timezone: string;
  questions_and_answers: { question: string; answer: string }[];
  cancel_url: string;
  reschedule_url: string;
  meeting_link: string;
  rescheduled: boolean;
}

export default function AccountManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [rescheduleUrl, setRescheduleUrl] = useState<string | null>(null);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.event === 'calendly.event_scheduled') {
        setTimeout(fetchBookings, 2000);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);


  const handleCancel = async (booking: Booking) => {
    if (!confirm(`Cancel booking for ${booking.name}? This cannot be undone.`)) return;
    const eventUuid = booking._id.split('/').pop();
    setCancellingId(booking._id);
    try {
      const res = await fetch(`/api/admin/bookings/${eventUuid}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Cancelled by admin' }),
      });
      const data = await res.json();
      if (data.error) {
        alert(`Failed to cancel: ${data.error}${data.calendly_status ? ` (Calendly ${data.calendly_status})` : ''}`);
      } else {
        setBookings(prev =>
          prev.map(b => b._id === booking._id ? { ...b, status: 'cancelled' } : b)
        );
        setExpandedId(null);
      }
    } catch {
      alert('Network error — could not cancel booking.');
    } finally {
      setCancellingId(null);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      const data = await response.json();
      if (data.error) setError(data.error);
      setBookings(data.bookings || []);
    } catch (error) {
      setError('Failed to connect to Calendly. Check your API token.');
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

      {/* Calendly token error banner */}
      {error && (
        <div style={{
          marginBottom: "24px",
          padding: "16px 20px",
          borderRadius: "12px",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}>
          <HiXCircle size={20} style={{ color: "#dc2626", flexShrink: 0, marginTop: "2px" }} />
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "14px", fontWeight: 700, color: "#dc2626" }}>
              Calendly Connection Error
            </p>
            <p style={{ margin: "4px 0 0", fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "#b91c1c" }}>
              {error}
            </p>
          </div>
        </div>
      )}

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

      {/* Bookings List */}
      <div style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "0 2px 8px rgba(13,31,30,0.04)", overflow: "hidden" }}>
        <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "20px", fontWeight: 700, color: "var(--ink)" }}>All Bookings</h2>
          <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--muted)" }}>Click a row to expand details</span>
        </div>

        {loading ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid var(--line)", borderTop: "3px solid var(--teal)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", fontSize: "14px", color: "var(--muted)" }}>Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <HiCalendarDays size={48} style={{ color: "var(--muted)", marginBottom: "16px" }} />
            <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", fontSize: "16px", color: "var(--muted)" }}>No bookings yet</p>
          </div>
        ) : (
          <div>
            {bookings.map((booking, i) => {
              const isOpen = expandedId === booking._id;
              const isConfirmed = booking.status === 'confirmed';
              return (
                <div key={booking._id} style={{ borderBottom: i < bookings.length - 1 ? "1px solid var(--line)" : "none" }}>
                  {/* Row — always visible */}
                  <div onClick={() => setExpandedId(isOpen ? null : booking._id)} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 24px", cursor: "pointer", background: isOpen ? "var(--off)" : "#fff", transition: "background 0.15s" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: isConfirmed ? "#dcfce7" : "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "var(--font-heading, sans-serif)", fontWeight: 700, fontSize: "15px", color: isConfirmed ? "#16a34a" : "#dc2626" }}>{booking.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>{booking.name}</p>
                      <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body, sans-serif)", fontSize: "12px", color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{booking.email}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--ink)", fontWeight: 600 }}>{formatDateTime(booking.start_time)}</p>
                      <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body, sans-serif)", fontSize: "11px", color: "var(--muted)" }}>{booking.event_type}</p>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, flexShrink: 0, background: isConfirmed ? "#dcfce7" : "#fee2e2", color: isConfirmed ? "#16a34a" : "#dc2626" }}>
                      {isConfirmed ? <HiCheckCircle size={13} /> : <HiXCircle size={13} />}
                      {isConfirmed ? "Confirmed" : "Cancelled"}
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: "18px", flexShrink: 0, display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
                  </div>

                  {/* Expanded detail panel */}
                  {isOpen && (
                    <div style={{ padding: "0 24px 24px", background: "var(--off)", borderTop: "1px solid var(--line)" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", paddingTop: "20px" }}>

                        {/* Contact */}
                        <div style={{ background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid var(--line)" }}>
                          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Contact</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: 32, height: 32, borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <HiUser size={16} style={{ color: "#2563eb" }} />
                              </div>
                              <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>{booking.name}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: 32, height: 32, borderRadius: "8px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <HiEnvelope size={16} style={{ color: "#16a34a" }} />
                              </div>
                              <a href={`mailto:${booking.email}`} style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--teal)", textDecoration: "none", wordBreak: "break-all" }}>{booking.email}</a>
                            </div>
                            {booking.timezone && (
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: 32, height: 32, borderRadius: "8px", background: "#faf5ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <HiGlobeAlt size={16} style={{ color: "#7c3aed" }} />
                                </div>
                                <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--muted)" }}>{booking.timezone}</span>
                              </div>
                            )}
                            {booking.rescheduled && (
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", borderRadius: "6px", background: "#fffbeb", border: "1px solid #fde68a" }}>
                                <HiArrowPath size={14} style={{ color: "#d97706", flexShrink: 0 }} />
                                <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "12px", fontWeight: 600, color: "#d97706" }}>Rescheduled</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Meeting */}
                        <div style={{ background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid var(--line)" }}>
                          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Meeting</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: 32, height: 32, borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <HiCalendarDays size={16} style={{ color: "#2563eb" }} />
                              </div>
                              <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--ink)", fontWeight: 500 }}>{formatDateTime(booking.start_time)}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: 32, height: 32, borderRadius: "8px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <HiClock size={16} style={{ color: "#64748b" }} />
                              </div>
                              <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", color: "var(--muted)" }}>Until {formatDateTime(booking.end_time)}</span>
                            </div>
                            {booking.status === 'cancelled' ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", borderRadius: "6px", background: "#fef2f2", border: "1px solid #fecaca" }}>
                                <HiXCircle size={14} style={{ color: "#dc2626", flexShrink: 0 }} />
                                <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "12px", fontWeight: 600, color: "#dc2626" }}>Meeting cancelled</span>
                              </div>
                            ) : booking.meeting_link ? (
                              <a href={booking.meeting_link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "4px", padding: "8px 14px", borderRadius: "8px", background: "#2563eb", color: "#fff", fontFamily: "var(--font-body, sans-serif)", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                                <HiVideoCamera size={15} /> Join Google Meet
                              </a>
                            ) : null}
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid var(--line)" }}>
                          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-heading, sans-serif)", fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Actions</p>
                          {booking.status === 'cancelled' ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca" }}>
                              <HiXCircle size={16} style={{ color: "#dc2626", flexShrink: 0 }} />
                              <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", fontWeight: 600, color: "#dc2626" }}>Booking cancelled</span>
                            </div>
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              {booking.reschedule_url && (
                                <button
                                  onClick={e => { e.stopPropagation(); setRescheduleUrl(booking.reschedule_url); }}
                                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "9px 14px", borderRadius: "8px", border: "1px solid var(--line)", background: "#fff", color: "var(--ink)", fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                                >
                                  <HiArrowPath size={15} /> Reschedule
                                </button>
                              )}
                              <button
                                onClick={e => { e.stopPropagation(); handleCancel(booking); }}
                                disabled={cancellingId === booking._id}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "9px 14px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fff", color: "#dc2626", fontFamily: "var(--font-body, sans-serif)", fontSize: "13px", fontWeight: 600, cursor: cancellingId === booking._id ? "not-allowed" : "pointer", opacity: cancellingId === booking._id ? 0.6 : 1 }}
                              >
                                <HiXMark size={15} /> {cancellingId === booking._id ? "Cancelling..." : "Cancel Booking"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Q&A */}
                      {booking.questions_and_answers?.length > 0 && (
                        <div style={{ marginTop: "16px", background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid var(--line)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                            <HiChatBubbleLeftRight size={15} style={{ color: "var(--muted)" }} />
                            <p style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Questions & Answers</p>
                          </div>
                          {booking.questions_and_answers.map((qa, idx) => (
                            <div key={idx} style={{ marginBottom: idx < booking.questions_and_answers.length - 1 ? "12px" : 0 }}>
                              <p style={{ margin: "0 0 2px", fontFamily: "var(--font-body, sans-serif)", fontSize: "12px", fontWeight: 600, color: "var(--muted)" }}>{qa.question}</p>
                              <p style={{ margin: 0, fontFamily: "var(--font-body, sans-serif)", fontSize: "14px", color: "var(--ink)" }}>{qa.answer || "—"}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {rootElement && rescheduleUrl && (
        <PopupModal
          url={rescheduleUrl}
          open={!!rescheduleUrl}
          onModalClose={() => {
            setRescheduleUrl(null);
            setTimeout(fetchBookings, 2000);
          }}
          rootElement={rootElement}
        />
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  HiChartBar,
  HiCog6Tooth,
  HiDocumentText,
  HiBars3,
  HiUserGroup,
  HiUsers,
  HiXMark,
  HiArrowRightOnRectangle,
  HiBriefcase,
} from "react-icons/hi2";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <HiChartBar size={20} /> },
    { label: "Blog", href: "/admin/blog", icon: <HiDocumentText size={20} /> },
    { label: "Partner", href: "/admin/partner", icon: <HiBriefcase size={20} /> },
    { label: "Account Management", href: "/admin/account-management", icon: <HiUserGroup size={20} /> },
    { label: "LinkedIn Connection", href: "/admin/linkedin-connection", icon: <HiUsers size={20} /> },
    { label: "Account Recovery", href: "/admin/account-recovery", icon: <HiUsers size={20} /> },
    { label: "Settings", href: "/admin/settings", icon: <HiCog6Tooth size={20} /> },
  ];

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  }

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--off)" }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
            display: "none",
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: "280px",
          background: "var(--white)",
          borderRight: "1px solid var(--line)",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflowY: "auto",
          zIndex: 50,
          transform: sidebarOpen ? "translateX(0)" : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
        className="admin-sidebar"
      >
        {/* Logo */}
        <div
          style={{
            padding: "28px 24px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", width: "100%" }}>
            <Image
              src="/techinrent-logo.png.png"
              alt="TechInRent"
              width={240}
              height={60}
              style={{
                width: "auto",
                height: "64px",
              }}
              priority
            />
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "12px",
                color: "var(--muted)",
                textAlign: "center",
              }}
            >
              Admin Panel
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted)",
              padding: "4px",
              position: "absolute",
              right: "20px",
              top: "28px",
            }}
            className="mobile-close"
          >
            <HiXMark size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav style={{ padding: "16px" }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                  setSidebarOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  marginBottom: "4px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isActive ? "var(--teal)" : "var(--body)",
                  background: isActive ? "var(--teal-pale)" : "transparent",
                  border: isActive ? "1px solid var(--teal-border)" : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "var(--off)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <div style={{ color: isActive ? "var(--teal)" : "var(--muted)" }}>{item.icon}</div>
                {item.label}
              </a>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              marginTop: "8px",
              borderRadius: "10px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              fontWeight: 600,
              color: "#dc2626",
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fef2f2";
              e.currentTarget.style.borderColor = "#fecaca";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <HiArrowRightOnRectangle size={20} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.2s ease",
          }}
          onClick={() => !isLoggingOut && setShowLogoutModal(false)}
        >
          <div
            style={{
              background: "var(--white)",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              animation: "slideUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                margin: "0 0 12px",
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "24px",
                fontWeight: 800,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              Confirm Logout
            </h2>
            <p
              style={{
                margin: "0 0 28px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "15px",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              Are you sure you want to logout? You'll need to sign in again to access the admin panel.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                style={{
                  flex: 1,
                  padding: "12px 24px",
                  background: "var(--off)",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--body)",
                  cursor: isLoggingOut ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isLoggingOut) {
                    e.currentTarget.style.background = "var(--line)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoggingOut) {
                    e.currentTarget.style.background = "var(--off)";
                  }
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{
                  flex: 1,
                  padding: "12px 24px",
                  background: isLoggingOut ? "var(--muted)" : "#dc2626",
                  border: "none",
                  borderRadius: "10px",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fff",
                  cursor: isLoggingOut ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  if (!isLoggingOut) {
                    e.currentTarget.style.background = "#b91c1c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoggingOut) {
                    e.currentTarget.style.background = "#dc2626";
                  }
                }}
              >
                {isLoggingOut ? (
                  <>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTop: "2px solid #fff",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "280px",
          minHeight: "100vh",
        }}
        className="admin-content"
      >
        {/* Mobile Header */}
        <div
          style={{
            display: "none",
            padding: "16px 20px",
            background: "var(--white)",
            borderBottom: "1px solid var(--line)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="mobile-header"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image
              src="/techinrent-logo.png.png"
              alt="TechInRent"
              width={200}
              height={50}
              style={{
                width: "auto",
                height: "50px",
              }}
            />
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink)",
              padding: "4px",
            }}
          >
            <HiBars3 size={24} />
          </button>
        </div>

        {children}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: ${sidebarOpen ? "translateX(0)" : "translateX(-100%)"} !important;
          }
          .admin-content {
            margin-left: 0 !important;
          }
          .mobile-header {
            display: flex !important;
          }
          .mobile-overlay {
            display: block !important;
          }
          .mobile-close {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

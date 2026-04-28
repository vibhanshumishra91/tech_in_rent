"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(result.message || "Login failed. Please try again.");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8f0f5 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "var(--white)",
          borderRadius: "20px",
          border: "1px solid var(--line)",
          padding: "56px 48px 48px",
          boxShadow: "0 10px 40px rgba(13,31,30,0.12)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
          className="login-logo-wrapper"
        >
          <Image
            src="/techinrent-logo.png.png"
            alt="TechInRent"
            width={340}
            height={85}
            style={{
              width: "auto",
              height: "90px",
            }}
            priority
          />
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "34px",
            fontWeight: 800,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            margin: "0 0 40px",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "15px",
            color: "var(--muted)",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          Sign in to access your admin dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "22px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: "10px",
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="admin@techinrent.com"
              style={{
                width: "100%",
                height: "52px",
                padding: "0 18px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "15px",
                color: "var(--ink)",
                background: "var(--white)",
                border: "1px solid var(--line)",
                borderRadius: "10px",
                outline: "none",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--teal)";
                e.target.style.boxShadow = "0 0 0 3px rgba(6,124,203,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--line)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: "10px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  height: "52px",
                  padding: "0 50px 0 18px",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "15px",
                  color: "var(--ink)",
                  background: "var(--white)",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  outline: "none",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--teal)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(6,124,203,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--line)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--teal)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  color: "#dc2626",
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              height: "54px",
              background: isLoading ? "var(--muted)" : "var(--teal)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "16px",
              fontWeight: 700,
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: isLoading
                ? "none"
                : "0 4px 14px rgba(6,124,203,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "var(--teal-dark)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(6,124,203,0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "var(--teal)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(6,124,203,0.3)";
              }
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #fff",
                    borderRadius: "50%",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 640px) {
            .login-logo-wrapper img {
              height: 68px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

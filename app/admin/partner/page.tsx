"use client";

import { useEffect, useState, useRef } from "react";
import {
  HiPlus,
  HiTrash,
  HiPhoto,
  HiCloudArrowUp,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi2";

interface Partner {
  _id: string;
  name: string;
  logo: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export default function PartnerPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/partners");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch partners");
      }

      setPartners(data.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setFormData((prev) => ({ ...prev, logo: data.url }));
      setUploadError("");
    } catch (err: unknown) {
      setUploadError(
        err instanceof Error ? err.message : "Failed to upload image"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create partner");
      }

      setSuccess("Partner added successfully!");
      setFormData({
        name: "",
        logo: "",
        status: "active",
      });
      setShowForm(false);

      fetchPartners();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      setError("");
      setSuccess("");

      const response = await fetch(`/api/admin/partners/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete partner");
      }

      setSuccess("Partner deleted successfully!");
      setPartners(partners.filter((p) => p._id !== id));

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete partner");
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleStatus = async (partner: Partner) => {
    try {
      const newStatus = partner.status === "active" ? "inactive" : "active";

      const response = await fetch(`/api/admin/partners/${partner._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: partner.name,
          logo: partner.logo,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update partner");
      }

      setPartners(
        partners.map((p) =>
          p._id === partner._id ? { ...p, status: newStatus } : p
        )
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to update partner status"
      );
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "32px",
        }}
      >
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
            Partner Management
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              color: "var(--muted)",
            }}
          >
            Manage partner logos and information ({partners.length} total)
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          <HiPlus size={18} />
          {showForm ? "Close Form" : "Add New Partner"}
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div
          style={{
            padding: "16px",
            marginBottom: "24px",
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "8px",
            color: "#166534",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
          }}
        >
          {success}
        </div>
      )}

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

      {/* Add Partner Form */}
      {showForm && (
        <div
          style={{
            background: "var(--white)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
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
          Add New Partner
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Top Row: Partner Name + Status Toggle */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "24px",
              marginBottom: "24px",
              alignItems: "end",
            }}
          >
            {/* Partner Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: "8px",
                }}
              >
                Partner Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                disabled={saving}
                placeholder="Enter partner name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  color: "var(--ink)",
                  outline: "none",
                  transition: "border 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--teal)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                }}
              />
            </div>

            {/* Status Toggle */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: "8px",
                }}
              >
                Status
              </label>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    status: formData.status === "active" ? "inactive" : "active",
                  })
                }
                disabled={saving}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 16px",
                  background: "transparent",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  cursor: saving ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = "var(--off)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "48px",
                    height: "26px",
                    background:
                      formData.status === "active" ? "var(--teal)" : "#e5e7eb",
                    borderRadius: "13px",
                    transition: "background 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: formData.status === "active" ? "25px" : "3px",
                      width: "20px",
                      height: "20px",
                      background: "#fff",
                      borderRadius: "50%",
                      transition: "left 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color:
                      formData.status === "active" ? "var(--teal)" : "var(--muted)",
                  }}
                >
                  {formData.status === "active" ? "Active" : "Inactive"}
                </span>
              </button>
            </div>
          </div>

          {/* Logo Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: "8px",
              }}
            >
              Partner Logo *
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || saving}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  background: uploading ? "var(--muted)" : "var(--teal-pale)",
                  color: uploading ? "var(--white)" : "var(--teal)",
                  border: uploading ? "none" : "1px solid var(--teal-border)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: uploading || saving ? "not-allowed" : "pointer",
                }}
              >
                {uploading ? (
                  <>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid var(--white)",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    <HiCloudArrowUp size={18} />
                    Upload Logo
                  </>
                )}
              </button>

              {formData.logo && (
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    overflow: "hidden",
                    background: "var(--off)",
                  }}
                >
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>

            {uploadError && (
              <p
                style={{
                  margin: "8px 0 0",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "13px",
                  color: "#dc2626",
                }}
              >
                {uploadError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving || !formData.name || !formData.logo}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background:
                saving || !formData.name || !formData.logo
                  ? "var(--muted)"
                  : "var(--teal)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "14px",
              fontWeight: 600,
              cursor:
                saving || !formData.name || !formData.logo
                  ? "not-allowed"
                  : "pointer",
              boxShadow: "0 4px 14px rgba(6,124,203,0.25)",
            }}
          >
            <HiPlus size={18} />
            {saving ? "Adding..." : "Add Partner"}
          </button>
        </form>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        </div>
      )}

      {/* Partners List */}
      {loading ? (
        <div
          style={{
            background: "var(--white)",
            borderRadius: "12px",
            border: "1px solid var(--line)",
            padding: "64px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid var(--off)",
              borderTop: "4px solid var(--teal)",
              borderRadius: "50%",
              margin: "0 auto 16px",
              animation: "spin 1s linear infinite",
            }}
          />
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "16px",
              color: "var(--muted)",
            }}
          >
            Loading partners...
          </p>
        </div>
      ) : partners.length === 0 ? (
        <div
          style={{
            background: "var(--white)",
            borderRadius: "12px",
            border: "1px solid var(--line)",
            padding: "64px 32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "16px",
              color: "var(--muted)",
            }}
          >
            No partners yet. Add your first partner above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 mt-6">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center gap-3 border border-gray-100"
              style={{
                opacity: deleteLoading === partner._id ? 0.5 : 1,
                pointerEvents: deleteLoading === partner._id ? "none" : "auto",
              }}
            >
              {/* Logo */}
              <div
                style={{
                  width: "100%",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-20 object-contain"
                />
              </div>

              {/* Partner Name */}
              <h3 className="text-sm font-bold text-gray-800 text-center">
                {partner.name}
              </h3>

              {/* Status Badge */}
              <button
                onClick={() => toggleStatus(partner)}
                disabled={deleteLoading === partner._id}
                className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                  partner.status === "active"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {partner.status === "active" ? "Active" : "Inactive"}
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(partner._id, partner.name)}
                disabled={deleteLoading === partner._id}
                className="w-full flex items-center justify-center gap-1 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 text-xs font-medium transition mt-1"
              >
                {deleteLoading === partner._id ? (
                  <>
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        border: "2px solid #fecaca",
                        borderTop: "2px solid #dc2626",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <HiTrash size={14} />
                    Delete
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

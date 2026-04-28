"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { HiArrowLeft, HiPhoto, HiCheckCircle, HiXCircle, HiCloudArrowUp } from "react-icons/hi2";

export default function CreateBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData({
      ...formData,
      title: newTitle,
      slug: generateSlug(newTitle),
    });
  };

  const handleSubmit = async (e: React.FormEvent, publishStatus: string) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: publishStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create blog");
      }

      setSuccess(
        publishStatus === "published"
          ? "Blog published successfully!"
          : "Blog saved as draft!"
      );

      // Redirect after 1.5 seconds
      setTimeout(() => {
        router.push("/admin/blog");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload image");
      }

      // Auto-fill coverImage URL
      setFormData((prev) => ({
        ...prev,
        coverImage: data.url,
      }));
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <button
          onClick={() => router.push("/admin/blog")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "transparent",
            border: "none",
            color: "var(--teal)",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "16px",
            padding: "4px 0",
          }}
        >
          <HiArrowLeft size={18} />
          Back to Blog List
        </button>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "28px",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: "8px",
          }}
        >
          Create Blog Post
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          Add a new article
        </p>
      </div>

      {/* Form Card */}
      <div
        style={{
          background: "var(--white)",
          borderRadius: "12px",
          border: "1px solid var(--line)",
          padding: "32px",
        }}
      >
        {/* Success Message */}
        {success && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
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
            <HiCheckCircle size={20} />
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
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
            <HiXCircle size={20} />
            {error}
          </div>
        )}

        <form>
          {/* Title */}
          <div style={{ marginBottom: "24px" }}>
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
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter blog post title"
              value={formData.title}
              onChange={handleTitleChange}
              disabled={loading}
              required
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
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (!loading) e.currentTarget.style.borderColor = "var(--teal)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            />
          </div>

          {/* Slug */}
          <div style={{ marginBottom: "24px" }}>
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
              Slug *
            </label>
            <input
              type="text"
              placeholder="blog-post-url-slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              disabled={loading}
              required
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
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (!loading) e.currentTarget.style.borderColor = "var(--teal)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            />
            <p
              style={{
                margin: "6px 0 0 0",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              Auto-generated from title (editable)
            </p>
          </div>

          {/* Excerpt */}
          <div style={{ marginBottom: "24px" }}>
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
              Excerpt *
            </label>
            <textarea
              placeholder="Brief summary of the blog post"
              rows={3}
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              disabled={loading}
              required
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
                resize: "vertical",
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (!loading) e.currentTarget.style.borderColor = "var(--teal)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            />
          </div>

          {/* Content */}
          <div style={{ marginBottom: "24px" }}>
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
              Content *
            </label>
            <textarea
              placeholder="Write your blog post content here..."
              rows={12}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              disabled={loading}
              required
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
                resize: "vertical",
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (!loading) e.currentTarget.style.borderColor = "var(--teal)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            />
          </div>

          {/* Cover Image Upload */}
          <div style={{ marginBottom: "24px" }}>
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
              Cover Image
            </label>

            {/* Upload Error */}
            {uploadError && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px",
                  marginBottom: "12px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  color: "#dc2626",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "13px",
                }}
              >
                <HiXCircle size={16} />
                {uploadError}
              </div>
            )}

            {/* Image Preview */}
            {formData.coverImage && (
              <div
                style={{
                  marginBottom: "12px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid var(--line)",
                }}
              >
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={uploading || loading}
              style={{ display: "none" }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                background: uploading ? "#e5e7eb" : "var(--teal-pale)",
                color: uploading ? "var(--muted)" : "var(--teal)",
                border: uploading ? "1px solid #e5e7eb" : "1px solid var(--teal-border)",
                borderRadius: "8px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: uploading || loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!uploading && !loading) {
                  e.currentTarget.style.background = "var(--teal)";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!uploading && !loading) {
                  e.currentTarget.style.background = "var(--teal-pale)";
                  e.currentTarget.style.color = "var(--teal)";
                }
              }}
            >
              <HiCloudArrowUp size={18} />
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
            <p
              style={{
                margin: "8px 0 0 0",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              Upload to Cloudinary (JPEG, PNG, WEBP, max 5MB)
            </p>
          </div>

          {/* Cover Image URL */}
          <div style={{ marginBottom: "24px" }}>
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
              Cover Image URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.value })
              }
              disabled={loading}
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
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (!loading) e.currentTarget.style.borderColor = "var(--teal)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            />
            <p
              style={{
                margin: "6px 0 0 0",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              Auto-filled after upload or enter manually
            </p>
          </div>

          {/* SEO Title */}
          <div style={{ marginBottom: "24px" }}>
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
              SEO Title
            </label>
            <input
              type="text"
              placeholder="SEO optimized title (max 70 characters)"
              value={formData.seoTitle}
              onChange={(e) =>
                setFormData({ ...formData, seoTitle: e.target.value })
              }
              disabled={loading}
              maxLength={70}
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
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (!loading) e.currentTarget.style.borderColor = "var(--teal)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            />
          </div>

          {/* SEO Description */}
          <div style={{ marginBottom: "32px" }}>
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
              SEO Description
            </label>
            <textarea
              placeholder="SEO meta description (max 160 characters)"
              rows={2}
              value={formData.seoDescription}
              onChange={(e) =>
                setFormData({ ...formData, seoDescription: e.target.value })
              }
              disabled={loading}
              maxLength={160}
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
                resize: "vertical",
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (!loading) e.currentTarget.style.borderColor = "var(--teal)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
              }}
            />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
              paddingTop: "24px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <button
              type="button"
              onClick={() => router.push("/admin/blog")}
              disabled={loading}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                background: "var(--white)",
                color: "var(--body)",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "var(--off)";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "var(--white)";
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={loading}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: "#f3f4f6",
                color: "var(--body)",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "#f3f4f6";
              }}
            >
              {loading ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "published")}
              disabled={loading}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: loading ? "#94a3b8" : "var(--teal)",
                color: "#fff",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading
                  ? "none"
                  : "0 4px 14px rgba(6,124,203,0.25)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(6,124,203,0.35)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(6,124,203,0.25)";
                }
              }}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash, HiMagnifyingGlass } from "react-icons/hi2";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: "draft" | "published";
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogManagementPage() {
  const router = useRouter();
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/blogs");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.data || []);
      setFilteredBlogs(data.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      setError("");
      setSuccess("");

      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete blog");
      }

      setSuccess("Blog deleted successfully!");
      
      // Remove from local state
      setBlogs(blogs.filter((blog) => blog._id !== id));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete blog");
    } finally {
      setDeleteLoading(null);
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

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
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
            Blog Management
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              color: "var(--muted)",
            }}
          >
            Manage all blog posts ({blogs.length} total)
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/blog/create")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--teal)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(6,124,203,0.25)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(6,124,203,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(6,124,203,0.25)";
          }}
        >
          <HiPlus size={18} />
          Create New Blog
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

      {/* Search Bar */}
      {!loading && blogs.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              position: "relative",
              maxWidth: "400px",
            }}
          >
            <HiMagnifyingGlass
              size={20}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search blogs by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 48px",
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
        </div>
      )}

      {/* Loading State */}
      {loading && (
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
            Loading blogs...
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Blog List Card */}
      {!loading && filteredBlogs.length > 0 && (
        <div
          style={{
            background: "var(--white)",
            borderRadius: "12px",
            border: "1px solid var(--line)",
            overflow: "auto",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(380px, 2.5fr) minmax(200px, 1.2fr) 140px 140px 130px",
              padding: "18px 28px",
              background: "var(--off)",
              borderBottom: "1px solid var(--line)",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              gap: "16px",
              minWidth: "1000px",
            }}
          >
            <div>Title & Description</div>
            <div>Slug</div>
            <div>Status</div>
            <div>Created</div>
            <div style={{ textAlign: "center" }}>Actions</div>
          </div>

          {/* Table Rows */}
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(380px, 2.5fr) minmax(200px, 1.2fr) 140px 140px 130px",
                padding: "22px 28px",
                borderBottom: "1px solid var(--line)",
                alignItems: "center",
                gap: "16px",
                transition: "background 0.15s ease",
                opacity: deleteLoading === blog._id ? 0.5 : 1,
                minWidth: "1000px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--off)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Title & Description */}
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: "6px",
                    lineHeight: 1.3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {blog.title}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "13px",
                    color: "var(--muted)",
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {blog.excerpt}
                </p>
              </div>

              {/* Slug */}
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "13px",
                  color: "var(--body)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  background: "var(--off)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--line)",
                }}
                title={blog.slug}
              >
                {blog.slug}
              </div>

              {/* Status */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "12px",
                    fontWeight: 700,
                    background:
                      blog.status === "published"
                        ? "var(--teal-pale)"
                        : "#f3f4f6",
                    color:
                      blog.status === "published"
                        ? "var(--teal)"
                        : "var(--muted)",
                    border:
                      blog.status === "published"
                        ? "1px solid var(--teal-border)"
                        : "1px solid #e5e7eb",
                    textTransform: "capitalize",
                  }}
                >
                  {blog.status}
                </span>
              </div>

              {/* Date */}
              <div
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "13px",
                  color: "var(--body)",
                  fontWeight: 500,
                }}
              >
                {formatDate(blog.createdAt)}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  onClick={() => router.push(`/admin/blog/edit/${blog._id}`)}
                  disabled={deleteLoading === blog._id}
                  title="Edit blog"
                  style={{
                    padding: "10px",
                    background: "var(--teal-pale)",
                    border: "1px solid var(--teal-border)",
                    borderRadius: "8px",
                    cursor:
                      deleteLoading === blog._id ? "not-allowed" : "pointer",
                    color: "var(--teal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (deleteLoading !== blog._id) {
                      e.currentTarget.style.background = "var(--teal)";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (deleteLoading !== blog._id) {
                      e.currentTarget.style.background = "var(--teal-pale)";
                      e.currentTarget.style.color = "var(--teal)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  <HiPencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(blog._id, blog.title)}
                  disabled={deleteLoading === blog._id}
                  title="Delete blog"
                  style={{
                    padding: "10px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    cursor:
                      deleteLoading === blog._id ? "not-allowed" : "pointer",
                    color: "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (deleteLoading !== blog._id) {
                      e.currentTarget.style.background = "#dc2626";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (deleteLoading !== blog._id) {
                      e.currentTarget.style.background = "#fef2f2";
                      e.currentTarget.style.color = "#dc2626";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {deleteLoading === blog._id ? (
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid #fecaca",
                        borderTop: "2px solid #dc2626",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                  ) : (
                    <HiTrash size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
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
              marginBottom: "16px",
            }}
          >
            No blog posts yet
          </p>
          <button
            onClick={() => router.push("/admin/blog/create")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--teal)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <HiPlus size={16} />
            Create Your First Blog
          </button>
        </div>
      )}

      {/* No Search Results */}
      {!loading && blogs.length > 0 && filteredBlogs.length === 0 && (
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
              marginBottom: "8px",
            }}
          >
            No blogs found matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery("")}
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              background: "var(--teal-pale)",
              color: "var(--teal)",
              border: "1px solid var(--teal-border)",
              borderRadius: "6px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

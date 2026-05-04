"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash, HiMagnifyingGlass, HiPhoto } from "react-icons/hi2";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete blog");
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

      {/* Blog Cards Grid */}
      {!loading && filteredBlogs.length > 0 && (
        <div className="grid grid-cols-3 gap-5 mt-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-3 border border-gray-100"
              style={{
                opacity: deleteLoading === blog._id ? 0.5 : 1,
                pointerEvents: deleteLoading === blog._id ? "none" : "auto",
              }}
            >
              {/* Blog Cover Image */}
              {blog.coverImage ? (
                <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-40 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                  <HiPhoto className="w-10 h-10 text-gray-300" />
                </div>
              )}

              {/* Status Badge */}
              <span
                className={`self-end px-3 py-1 rounded-full text-xs font-semibold ${
                  blog.status === "published"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
              </span>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-800 leading-snug">
                {blog.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 line-clamp-2">
                {blog.excerpt}
              </p>

              {/* Slug */}
              <div className="text-xs text-gray-400 bg-gray-100 rounded-lg px-2 py-1 truncate">
                {blog.slug}
              </div>

              {/* Created Date */}
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(blog.createdAt)}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => router.push(`/admin/blog/edit/${blog._id}`)}
                  disabled={deleteLoading === blog._id}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition"
                >
                  <HiPencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id, blog.title)}
                  disabled={deleteLoading === blog._id}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 text-sm font-medium transition"
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
                    <>
                      <HiTrash size={16} />
                      Delete
                    </>
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
            No blogs found matching &quot;{searchQuery}&quot;
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

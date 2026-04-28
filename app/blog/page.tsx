"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { HiCalendarDays, HiUser, HiArrowRight } from "react-icons/hi2";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  status: "draft" | "published";
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogListingPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/blogs");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      // Filter only published blogs
      const publishedBlogs = (data.data || []).filter(
        (blog: Blog) => blog.status === "published"
      );

      setBlogs(publishedBlogs);
    } catch (err: any) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          style={{
            padding: "120px 5% 64px",
            background:
              "radial-gradient(circle at 82% 8%, rgba(25,168,152,0.12), transparent 34%), var(--white)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              Blog
            </h1>
            <p
              style={{
                margin: "18px auto 0",
                maxWidth: "600px",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "var(--muted)",
              }}
            >
              Insights, updates, and resources on LinkedIn growth, outreach strategies, and professional development.
            </p>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section style={{ padding: "96px 5%", background: "var(--white)" }}>
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
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
          </section>
        )}

        {/* Error State */}
        {!loading && error && (
          <section style={{ padding: "96px 5%", background: "var(--white)" }}>
            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                textAlign: "center",
                padding: "48px 32px",
                background: "var(--off)",
                borderRadius: "16px",
                border: "1px solid var(--line)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "16px",
                  color: "#dc2626",
                }}
              >
                {error}
              </p>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!loading && !error && blogs.length === 0 && (
          <section style={{ padding: "96px 5%", background: "var(--white)" }}>
            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                textAlign: "center",
                padding: "64px 32px",
                background: "var(--off)",
                borderRadius: "16px",
                border: "1px solid var(--line)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "12px",
                }}
              >
                No blogs published yet
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "16px",
                  color: "var(--muted)",
                }}
              >
                Check back soon for new content and insights.
              </p>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        {!loading && !error && blogs.length > 0 && (
          <section style={{ padding: "96px 5%", background: "var(--white)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "32px",
                }}
                className="blog-grid"
              >
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    onClick={() => router.push(`/blog/${blog.slug}`)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "var(--off)",
                      borderRadius: "16px",
                      border: "1px solid var(--line)",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(13,31,30,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 24px rgba(13,31,30,0.12)";
                      e.currentTarget.style.borderColor = "var(--teal-border)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(13,31,30,0.04)";
                      e.currentTarget.style.borderColor = "var(--line)";
                    }}
                  >
                    {/* Cover Image */}
                    {blog.coverImage ? (
                      <div
                        style={{
                          width: "100%",
                          height: "220px",
                          background: `url(${blog.coverImage}) center/cover`,
                          backgroundColor: "var(--teal-pale)",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "220px",
                          background:
                            "linear-gradient(135deg, var(--teal-pale) 0%, var(--teal-border) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-heading, sans-serif)",
                            fontSize: "48px",
                            fontWeight: 800,
                            color: "var(--teal)",
                            opacity: 0.3,
                          }}
                        >
                          {blog.title.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Meta */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          marginBottom: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "var(--font-body, sans-serif)",
                            fontSize: "13px",
                            color: "var(--muted)",
                          }}
                        >
                          <HiCalendarDays size={16} />
                          {formatDate(blog.createdAt)}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "var(--font-body, sans-serif)",
                            fontSize: "13px",
                            color: "var(--muted)",
                          }}
                        >
                          <HiUser size={16} />
                          {blog.author}
                        </div>
                      </div>

                      {/* Title */}
                      <h2
                        style={{
                          margin: "0 0 12px",
                          fontFamily: "var(--font-heading, sans-serif)",
                          fontSize: "22px",
                          fontWeight: 700,
                          lineHeight: 1.3,
                          color: "var(--ink)",
                        }}
                      >
                        {blog.title}
                      </h2>

                      {/* Excerpt */}
                      <p
                        style={{
                          margin: "0 0 20px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "15px",
                          lineHeight: 1.65,
                          color: "var(--muted)",
                          flex: 1,
                        }}
                      >
                        {blog.excerpt}
                      </p>

                      {/* Read More */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontFamily: "var(--font-heading, sans-serif)",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--teal)",
                          transition: "gap 0.2s",
                        }}
                        className="read-more-link"
                      >
                        Read More
                        <HiArrowRight size={16} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        article:hover .read-more-link {
          gap: 12px !important;
        }
      `}</style>
    </>
  );
}

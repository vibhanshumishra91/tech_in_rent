"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import {
  HiCalendarDays,
  HiUser,
  HiArrowLeft,
  HiShare,
} from "react-icons/hi2";
import { RiTwitterXLine, RiLinkedinFill, RiFacebookFill } from "react-icons/ri";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  status: "draft" | "published";
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export default function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const response = await fetch("/api/admin/blogs");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      // Find blog by slug and check if published
      const foundBlog = (data.data || []).find(
        (b: Blog) => b.slug === slug && b.status === "published"
      );

      if (!foundBlog) {
        setNotFound(true);
        return;
      }

      setBlog(foundBlog);

      // Get related blogs (other published blogs, max 3)
      const related = (data.data || [])
        .filter(
          (b: Blog) =>
            b.status === "published" &&
            b._id !== foundBlog._id
        )
        .slice(0, 3);

      setRelatedBlogs(related);
    } catch (err: any) {
      setNotFound(true);
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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Navbar />

      <main>
        {/* Loading State */}
        {loading && (
          <section
            style={{
              padding: "120px 5% 96px",
              background: "var(--white)",
              minHeight: "60vh",
            }}
          >
            <div
              style={{
                maxWidth: "800px",
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
                Loading blog...
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

        {/* 404 Not Found */}
        {!loading && notFound && (
          <section
            style={{
              padding: "120px 5% 96px",
              background: "var(--white)",
              minHeight: "60vh",
            }}
          >
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
              <h1
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "72px",
                  fontWeight: 800,
                  color: "var(--teal)",
                  marginBottom: "16px",
                }}
              >
                404
              </h1>
              <p
                style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                Blog Not Found
              </p>
              <p
                style={{
                  margin: "0 0 32px",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "16px",
                  color: "var(--muted)",
                }}
              >
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => router.push("/blog")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: "var(--teal)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(6,124,203,0.25)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(6,124,203,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(6,124,203,0.25)";
                }}
              >
                <HiArrowLeft size={16} />
                Back to Blog
              </button>
            </div>
          </section>
        )}

        {/* Blog Content */}
        {!loading && !notFound && blog && (
          <>
            {/* Back Button */}
            <section
              style={{
                padding: "100px 5% 24px",
                background: "var(--white)",
              }}
            >
              <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <button
                  onClick={() => router.push("/blog")}
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
                    padding: "8px 0",
                    transition: "gap 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = "12px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = "8px";
                  }}
                >
                  <HiArrowLeft size={18} />
                  Back to Blog
                </button>
              </div>
            </section>

            {/* Cover Image */}
            {blog.coverImage && (
              <section
                style={{
                  padding: "0 5% 48px",
                  background: "var(--white)",
                }}
              >
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "16px",
                      background: `url(${blog.coverImage}) center/cover`,
                      backgroundColor: "var(--teal-pale)",
                      border: "1px solid var(--line)",
                    }}
                  />
                </div>
              </section>
            )}

            {/* Article Header */}
            <article
              style={{
                padding: blog.coverImage ? "0 5% 48px" : "24px 5% 48px",
                background: "var(--white)",
              }}
            >
              <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      color: "var(--muted)",
                    }}
                  >
                    <HiCalendarDays size={18} />
                    {formatDate(blog.createdAt)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "14px",
                      color: "var(--muted)",
                    }}
                  >
                    <HiUser size={18} />
                    {blog.author}
                  </div>
                </div>

                {/* Title */}
                <h1
                  style={{
                    margin: "0 0 24px",
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "clamp(32px, 5vw, 48px)",
                    lineHeight: 1.15,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                  }}
                >
                  {blog.title}
                </h1>

                {/* Excerpt */}
                <p
                  style={{
                    margin: "0 0 32px",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "18px",
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    fontWeight: 500,
                  }}
                >
                  {blog.excerpt}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "var(--line)",
                    margin: "32px 0",
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "17px",
                    lineHeight: 1.8,
                    color: "var(--body)",
                  }}
                  className="blog-content"
                >
                  {blog.content.split("\n").map((paragraph, index) => (
                    <p
                      key={index}
                      style={{
                        margin: "0 0 20px",
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "var(--line)",
                    margin: "48px 0 32px",
                  }}
                />

                {/* Share Section */}
                <div>
                  <p
                    style={{
                      margin: "0 0 16px",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <HiShare size={18} />
                    Share this article
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                      )}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        background: "#000",
                        color: "#fff",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontFamily: "var(--font-body, sans-serif)",
                        fontSize: "14px",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <RiTwitterXLine size={16} />
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        background: "#0077b5",
                        color: "#fff",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontFamily: "var(--font-body, sans-serif)",
                        fontSize: "14px",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <RiLinkedinFill size={16} />
                      LinkedIn
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        background: "#1877f2",
                        color: "#fff",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontFamily: "var(--font-body, sans-serif)",
                        fontSize: "14px",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <RiFacebookFill size={16} />
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <section
                style={{
                  padding: "64px 5% 96px",
                  background: "var(--off)",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                  <h2
                    style={{
                      margin: "0 0 32px",
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    Related Articles
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "24px",
                    }}
                  >
                    {relatedBlogs.map((relatedBlog) => (
                      <article
                        key={relatedBlog._id}
                        onClick={() => router.push(`/blog/${relatedBlog.slug}`)}
                        style={{
                          background: "var(--white)",
                          borderRadius: "12px",
                          border: "1px solid var(--line)",
                          padding: "24px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 20px rgba(13,31,30,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <h3
                          style={{
                            margin: "0 0 8px",
                            fontFamily: "var(--font-heading, sans-serif)",
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "var(--ink)",
                            lineHeight: 1.3,
                          }}
                        >
                          {relatedBlog.title}
                        </h3>
                        <p
                          style={{
                            margin: "0 0 12px",
                            fontFamily: "var(--font-body, sans-serif)",
                            fontSize: "14px",
                            lineHeight: 1.6,
                            color: "var(--muted)",
                          }}
                        >
                          {relatedBlog.excerpt.substring(0, 100)}...
                        </p>
                        <div
                          style={{
                            fontFamily: "var(--font-body, sans-serif)",
                            fontSize: "13px",
                            color: "var(--teal)",
                            fontWeight: 600,
                          }}
                        >
                          Read More →
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

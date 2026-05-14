import type { Metadata } from "next";
import { connectDB } from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const BASE = "https://techinrent.com";

  try {
    await connectDB();
    const post = await Blog.findOne({ slug, status: "published" })
      .select("title excerpt seoTitle seoDescription coverImage")
      .lean();

    if (!post) {
      return {
        title: "Blog Post Not Found",
        robots: { index: false, follow: false },
      };
    }

    const title = (post as { seoTitle?: string; title: string }).seoTitle || (post as { title: string }).title;
    const description =
      (post as { seoDescription?: string }).seoDescription ||
      (post as { excerpt: string }).excerpt ||
      "Read this article on TechInRent — LinkedIn growth and B2B strategy insights.";
    const coverImage = (post as { coverImage?: string }).coverImage;

    return {
      title,
      description,
      alternates: { canonical: `${BASE}/blog/${slug}` },
      openGraph: {
        title,
        description,
        url: `${BASE}/blog/${slug}`,
        type: "article",
        ...(coverImage ? { images: [{ url: coverImage }] } : {}),
      },
    };
  } catch {
    return {
      title: "Blog | TechInRent",
      description: "Read expert articles on LinkedIn growth and B2B lead generation.",
    };
  }
}

export default function Page() {
  return <BlogPostClient />;
}

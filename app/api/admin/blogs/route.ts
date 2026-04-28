import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";

// GET /api/admin/blogs - Fetch all blogs
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(
      {
        success: true,
        count: blogs.length,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/blogs - Create new blog
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Extract and trim fields
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      status,
      seoTitle,
      seoDescription,
    } = body;

    // Validate required fields
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, slug, excerpt, and content are required",
        },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existingBlog = await Blog.findOne({ slug: slug.trim().toLowerCase() });
    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists",
        },
        { status: 409 }
      );
    }

    // Create new blog
    const blog = await Blog.create({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      coverImage: coverImage?.trim() || "",
      status: status || "draft",
      seoTitle: seoTitle?.trim() || "",
      seoDescription: seoDescription?.trim() || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: blog,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating blog:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        {
          success: false,
          message: messages.join(", "),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
      },
      { status: 500 }
    );
  }
}

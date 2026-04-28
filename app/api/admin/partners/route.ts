import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Partner from "@/lib/db/models/Partner";

// GET /api/admin/partners - Fetch all partners
export async function GET() {
  try {
    await connectDB();

    const partners = await Partner.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(
      {
        success: true,
        data: partners,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partners",
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/partners - Create new partner
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, logo, status } = body;

    // Validate required fields
    if (!name || !logo) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and logo are required",
        },
        { status: 400 }
      );
    }

    // Create partner
    const partner = await Partner.create({
      name: name.trim(),
      logo: logo.trim(),
      status: status || "active",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Partner created successfully",
        data: partner,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating partner:", error);

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
        message: "Failed to create partner",
      },
      { status: 500 }
    );
  }
}

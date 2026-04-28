import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Partner from "@/lib/db/models/Partner";
import mongoose from "mongoose";

// GET /api/admin/partners/[id] - Fetch single partner by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid partner ID",
        },
        { status: 400 }
      );
    }

    const partner = await Partner.findById(id).select("-__v");

    if (!partner) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: partner,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching partner:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partner",
      },
      { status: 500 }
    );
  }
}

// PUT /api/admin/partners/[id] - Update partner by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid partner ID",
        },
        { status: 400 }
      );
    }

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

    // Check if partner exists
    const existingPartner = await Partner.findById(id);
    if (!existingPartner) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 }
      );
    }

    // Update partner
    const updatedPartner = await Partner.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        logo: logo.trim(),
        status: status || "active",
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).select("-__v");

    return NextResponse.json(
      {
        success: true,
        message: "Partner updated successfully",
        data: updatedPartner,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating partner:", error);

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
        message: "Failed to update partner",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/partners/[id] - Delete partner by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid partner ID",
        },
        { status: 400 }
      );
    }

    const partner = await Partner.findByIdAndDelete(id);

    if (!partner) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partner deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting partner:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete partner",
      },
      { status: 500 }
    );
  }
}

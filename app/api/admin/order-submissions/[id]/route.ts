import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connection";
import OrderSubmission from "@/lib/db/models/OrderSubmission";

type SubmissionStatus = "pending_verification" | "verified" | "rejected";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid submission ID" },
        { status: 400 },
      );
    }

    const body = (await request.json()) as { status?: string };
    const status = String(body.status ?? "").trim() as SubmissionStatus;

    if (!["pending_verification", "verified", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 },
      );
    }

    const updated = await OrderSubmission.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after", runValidators: true },
    ).select("-__v");

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Order submission not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Submission status updated",
        data: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Order submission status update failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update submission status" },
      { status: 500 },
    );
  }
}

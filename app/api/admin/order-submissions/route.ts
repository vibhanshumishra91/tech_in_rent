import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import OrderSubmission from "@/lib/db/models/OrderSubmission";

export async function GET() {
  try {
    await connectDB();

    const submissions = await OrderSubmission.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(
      {
        success: true,
        count: submissions.length,
        data: submissions,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching order submissions:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order submissions",
      },
      { status: 500 },
    );
  }
}

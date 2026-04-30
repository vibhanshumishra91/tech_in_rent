import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import RecoveryRequest from "@/lib/db/models/RecoveryRequest";

export async function GET() {
  try {
    await connectDB();

    const recoveryRequests = await RecoveryRequest.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(
      {
        success: true,
        count: recoveryRequests.length,
        data: recoveryRequests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching recovery requests:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch recovery requests",
      },
      { status: 500 }
    );
  }
}

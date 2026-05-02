import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import LeadGeneration from "@/lib/db/models/LeadGeneration";

export async function GET() {
  try {
    await connectDB();

    const leadRequests = await LeadGeneration.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(
      {
        success: true,
        count: leadRequests.length,
        data: leadRequests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching lead generation requests:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lead generation requests",
      },
      { status: 500 }
    );
  }
}

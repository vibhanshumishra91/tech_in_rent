import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import HiringSupport from "@/lib/db/models/HiringSupport";

export async function GET() {
  try {
    await connectDB();

    const hiringRequests = await HiringSupport.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(
      {
        success: true,
        count: hiringRequests.length,
        data: hiringRequests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching hiring requests:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch hiring requests",
      },
      { status: 500 }
    );
  }
}

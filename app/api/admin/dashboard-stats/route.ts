import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";
import Booking from "@/lib/db/models/Booking";
import Partner from "@/lib/db/models/Partner";
import RecoveryRequest from "@/lib/db/models/RecoveryRequest";
import HiringSupport from "@/lib/db/models/HiringSupport";
import LeadGeneration from "@/lib/db/models/LeadGeneration";

export async function GET() {
  try {
    await connectDB();

    // Fetch counts from all collections
    const [blogsCount, bookingsCount, partnersCount, recoveryRequestsCount, hiringSupportCount, leadGenerationCount] = await Promise.all([
      Blog.countDocuments(),
      Booking.countDocuments(),
      Partner.countDocuments(),
      RecoveryRequest.countDocuments(),
      HiringSupport.countDocuments(),
      LeadGeneration.countDocuments(),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          totalBlogs: blogsCount,
          totalAccountManagement: bookingsCount,
          totalLinkedInConnection: partnersCount,
          totalAccountRecovery: recoveryRequestsCount,
          totalHiringSupport: hiringSupportCount,
          totalLeadGeneration: leadGenerationCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats",
        data: {
          totalBlogs: 0,
          totalAccountManagement: 0,
          totalLinkedInConnection: 0,
          totalAccountRecovery: 0,
          totalHiringSupport: 0,
          totalLeadGeneration: 0,
        },
      },
      { status: 500 }
    );
  }
}

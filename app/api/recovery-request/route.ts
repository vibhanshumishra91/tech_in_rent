import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import RecoveryRequest from "@/lib/db/models/RecoveryRequest";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, linkedinUrl, issueType, description } = body;

    // Validate required fields
    if (!name || !email || !linkedinUrl || !issueType || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Create recovery request
    const recoveryRequest = await RecoveryRequest.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      linkedinUrl: linkedinUrl.trim(),
      issueType,
      description: description.trim(),
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Recovery request submitted successfully",
        data: recoveryRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating recovery request:", error);

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
        message: "Failed to submit recovery request",
      },
      { status: 500 }
    );
  }
}

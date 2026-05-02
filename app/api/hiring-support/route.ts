import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import HiringSupport from "@/lib/db/models/HiringSupport";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      name,
      email,
      company,
      phone,
      jobTitle,
      skills,
      experienceLevel,
      numberOfPositions,
      budget,
      timeline,
      description,
      linkedinProfile,
    } = body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !company ||
      !phone ||
      !jobTitle ||
      !skills ||
      !experienceLevel ||
      !numberOfPositions ||
      !budget ||
      !timeline ||
      !description
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be filled",
        },
        { status: 400 }
      );
    }

    // Create hiring support request
    const hiringRequest = await HiringSupport.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      phone: phone.trim(),
      jobTitle: jobTitle.trim(),
      skills: skills.trim(),
      experienceLevel,
      numberOfPositions: parseInt(numberOfPositions),
      budget: budget.trim(),
      timeline,
      description: description.trim(),
      linkedinProfile: linkedinProfile?.trim() || "",
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Hiring request submitted successfully",
        data: hiringRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating hiring request:", error);

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
        message: "Failed to submit hiring request",
      },
      { status: 500 }
    );
  }
}

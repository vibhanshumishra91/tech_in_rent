import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import LeadGeneration from "@/lib/db/models/LeadGeneration";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      name,
      email,
      company,
      phone,
      industry,
      targetRole,
      targetLocation,
      companySize,
      numberOfLeads,
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
      !industry ||
      !targetRole ||
      !targetLocation ||
      !companySize ||
      !numberOfLeads ||
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

    // Create lead generation request
    const leadRequest = await LeadGeneration.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      phone: phone.trim(),
      industry: industry.trim(),
      targetRole: targetRole.trim(),
      targetLocation: targetLocation.trim(),
      companySize,
      numberOfLeads: parseInt(numberOfLeads),
      budget: budget.trim(),
      timeline,
      description: description.trim(),
      linkedinProfile: linkedinProfile?.trim() || "",
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead generation request submitted successfully",
        data: leadRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating lead generation request:", error);

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
        message: "Failed to submit lead generation request",
      },
      { status: 500 }
    );
  }
}

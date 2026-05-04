import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import OrderSubmission from "@/lib/db/models/OrderSubmission";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      fullName,
      email,
      countryCode,
      phone,
      linkedinUrl,
      notes,
      packageId,
      packageName,
      amountInr,
      displayPrice,
      delivery,
      paymentMethod,
      paymentOption,
      paymentProofUrl,
      paymentProofPublicId,
    } = body as Record<string, unknown>;

    if (
      !fullName ||
      !email ||
      !countryCode ||
      !phone ||
      !linkedinUrl ||
      !packageId ||
      !packageName ||
      amountInr === undefined ||
      !displayPrice ||
      !delivery ||
      !paymentMethod ||
      !paymentOption ||
      !paymentProofUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required order fields.",
        },
        { status: 400 },
      );
    }

    const order = await OrderSubmission.create({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      countryCode: String(countryCode).trim(),
      phone: String(phone).trim(),
      linkedinUrl: String(linkedinUrl).trim(),
      notes: String(notes ?? "").trim(),
      packageId: String(packageId).trim(),
      packageName: String(packageName).trim(),
      amountInr: Number(amountInr),
      displayPrice: String(displayPrice).trim(),
      delivery: String(delivery).trim(),
      paymentMethod: String(paymentMethod).trim(),
      paymentOption: String(paymentOption).trim(),
      paymentProofUrl: String(paymentProofUrl).trim(),
      paymentProofPublicId: String(paymentProofPublicId ?? "").trim(),
      status: "pending_verification",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order submitted successfully.",
        data: {
          id: order._id,
          status: order.status,
          createdAt: order.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit order.",
      },
      { status: 500 },
    );
  }
}


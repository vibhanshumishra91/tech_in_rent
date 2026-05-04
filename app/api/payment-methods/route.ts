import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import PaymentMethod from "@/lib/db/models/PaymentMethod";

export async function GET() {
  try {
    await connectDB();
    const methods = await PaymentMethod.find({ isActive: true }).sort({ createdAt: 1 });

    const data = methods
      .map((method) => ({
        title: method.name,
        options: method.options
          .filter((option) => option.isActive)
          .map((option) => ({
            value: option.optionId,
            label: option.label,
            paymentAddressLabel: option.paymentAddressLabel,
            paymentAddressValue: option.paymentAddressValue,
            qrImageUrl: option.qrImageUrl || "",
            instructions: option.instructions || [],
          })),
      }))
      .filter((method) => method.options.length > 0);

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Public payment methods fetch failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch payment methods" },
      { status: 500 },
    );
  }
}


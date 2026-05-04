import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connection";
import PaymentMethod from "@/lib/db/models/PaymentMethod";

type PaymentOptionInput = {
  label?: string;
  paymentAddressLabel?: string;
  paymentAddressValue?: string;
  qrImageUrl?: string;
  instructions?: string[];
  isActive?: boolean;
  optionId?: string;
};

function normalize(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeOptions(
  methodName: string,
  options: unknown,
): Array<{
  optionId: string;
  label: string;
  paymentAddressLabel: string;
  paymentAddressValue: string;
  qrImageUrl: string;
  instructions: string[];
  isActive: boolean;
}> {
  if (!Array.isArray(options)) return [];

  return options.map((item, index) => {
    const obj = (typeof item === "object" && item ? item : {}) as PaymentOptionInput;
    const label = normalize(obj.label);
    const paymentAddressLabel = normalize(obj.paymentAddressLabel);
    const paymentAddressValue = normalize(obj.paymentAddressValue);
    if (!label || !paymentAddressLabel || !paymentAddressValue) {
      throw new Error("Each option needs label, address label, and address value.");
    }
    const generatedId = `${methodName}-${label}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return {
      optionId: normalize(obj.optionId) || `${generatedId || "option"}-${index + 1}`,
      label,
      paymentAddressLabel,
      paymentAddressValue,
      qrImageUrl: normalize(obj.qrImageUrl),
      instructions: Array.isArray(obj.instructions)
        ? obj.instructions.map((line) => normalize(line)).filter(Boolean)
        : [],
      isActive: obj.isActive !== false,
    };
  });
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid method ID" },
        { status: 400 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      isActive?: boolean;
      options?: unknown;
    };

    const name = normalize(body.name);
    const options = normalizeOptions(name, body.options);

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Method name is required" },
        { status: 400 },
      );
    }
    if (options.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one payment option is required" },
        { status: 400 },
      );
    }

    const updated = await PaymentMethod.findByIdAndUpdate(
      id,
      {
        name,
        isActive: body.isActive !== false,
        options,
      },
      { returnDocument: "after", runValidators: true },
    ).select("-__v");

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Payment method not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Payment method updated", data: updated },
      { status: 200 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update payment method";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid method ID" },
        { status: 400 },
      );
    }

    const deleted = await PaymentMethod.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Payment method not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Payment method deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Payment method delete failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete payment method" },
      { status: 500 },
    );
  }
}


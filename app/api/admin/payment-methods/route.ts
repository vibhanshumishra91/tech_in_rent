import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import PaymentMethod from "@/lib/db/models/PaymentMethod";

type PaymentOptionInput = {
  label?: string;
  paymentAddressLabel?: string;
  paymentAddressValue?: string;
  qrImageUrl?: string;
  instructions?: string[];
  isActive?: boolean;
};

function normalizeName(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeOptions(options: unknown): PaymentOptionInput[] {
  if (!Array.isArray(options)) return [];
  return options
    .map((item) => (typeof item === "object" && item ? item : {}))
    .map((item) => item as PaymentOptionInput);
}

function toOptionId(methodName: string, optionLabel: string, index: number) {
  const base = `${methodName}-${optionLabel}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "option"}-${index + 1}`;
}

export async function GET() {
  try {
    await connectDB();
    const methods = await PaymentMethod.find().sort({ createdAt: -1 }).select("-__v");
    return NextResponse.json({ success: true, data: methods }, { status: 200 });
  } catch (error) {
    console.error("Payment methods fetch failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch payment methods" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = (await request.json()) as {
      name?: string;
      isActive?: boolean;
      options?: unknown;
    };

    const name = normalizeName(body.name);
    const optionsInput = normalizeOptions(body.options);

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Method name is required" },
        { status: 400 },
      );
    }

    if (optionsInput.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one payment option is required" },
        { status: 400 },
      );
    }

    const options = optionsInput.map((item, index) => {
      const label = normalizeName(item.label);
      const paymentAddressLabel = normalizeName(item.paymentAddressLabel);
      const paymentAddressValue = normalizeName(item.paymentAddressValue);
      const instructions = Array.isArray(item.instructions)
        ? item.instructions.map((line) => String(line).trim()).filter(Boolean)
        : [];

      if (!label || !paymentAddressLabel || !paymentAddressValue) {
        throw new Error("Each option needs label, address label, and address value.");
      }

      return {
        optionId: toOptionId(name, label, index),
        label,
        paymentAddressLabel,
        paymentAddressValue,
        qrImageUrl: normalizeName(item.qrImageUrl),
        instructions,
        isActive: item.isActive !== false,
      };
    });

    const exists = await PaymentMethod.findOne({ name });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Method already exists. Use update." },
        { status: 409 },
      );
    }

    const created = await PaymentMethod.create({
      name,
      isActive: body.isActive !== false,
      options,
    });

    return NextResponse.json(
      { success: true, message: "Payment method created", data: created },
      { status: 201 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create payment method";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}


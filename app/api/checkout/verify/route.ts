import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

type VerifyRequest = {
  packageId?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(request: Request) {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { ok: false, message: "Payment verification is not configured yet." },
        { status: 501 },
      );
    }

    const body = (await request.json()) as VerifyRequest;
    const orderId = body.razorpay_order_id?.trim();
    const paymentId = body.razorpay_payment_id?.trim();
    const signature = body.razorpay_signature?.trim();

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ ok: false, message: "Missing payment verification fields." }, { status: 400 });
    }

    const expectedSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const isValid =
      expectedSignature.length === signature.length &&
      timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));

    if (!isValid) {
      return NextResponse.json({ ok: false, message: "Invalid payment signature." }, { status: 400 });
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Payment verified successfully.",
        data: {
          packageId: body.packageId || "",
          orderId,
          paymentId,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to verify payment." }, { status: 500 });
  }
}

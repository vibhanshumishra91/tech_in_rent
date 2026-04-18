import { getFollowerPackageById } from "@/lib/payments/followerPackages";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

type CheckoutRequest = {
  packageId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;
    const selectedPackage = body.packageId ? getFollowerPackageById(body.packageId) : undefined;

    if (!selectedPackage) {
      return NextResponse.json({ ok: false, message: "Invalid package selected." }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Payment gateway is not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to enable checkout.",
        },
        { status: 501 },
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: selectedPackage.amountInr * 100,
      currency: "INR",
      receipt: `tir_${selectedPackage.id}_${Date.now()}`,
      notes: {
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Checkout initialized.",
        checkout: {
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          amountInr: selectedPackage.amountInr,
          razorpayKeyId: process.env.RAZORPAY_KEY_ID,
          orderId: order.id,
          currency: order.currency,
          amount: order.amount,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to initialize checkout." }, { status: 500 });
  }
}

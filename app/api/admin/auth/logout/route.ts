import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { ok: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear admin_token cookie securely
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { ok: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}

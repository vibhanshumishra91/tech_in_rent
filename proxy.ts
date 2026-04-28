import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  const isLoginPage = pathname === "/admin/login";

  // If user is on login page
  if (isLoginPage) {
    // If already logged in, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    // Allow access to login page
    return NextResponse.next();
  }

  // For all other /admin routes, check authentication
  if (!token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Allow access to protected admin routes
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/auth/login" || path === "/auth/signup";

  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    "";

  // Redirect authenticated users away from auth pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Allow access to public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow authenticated users to access protected routes
  return NextResponse.next();
}

// Configure protected routes - customize for your project
export const config = {
  matcher: [
    "/admin",
    "/auth/login",
    "/auth/signup",
    "/settings/:path*",
    "/profile/:path*",
  ],
};

// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Middleware function
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Get the current request path

  // Allow requests to login and signup pages without token
  if (pathname === "/login" || pathname === "/sign-up") {
    return NextResponse.next(); // Continue to login or signup
  }

  // Get the token from cookies
  const token = req.cookies.get("token")?.value;

  // If no token is found, redirect to the login page
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, allow the request to proceed
  return NextResponse.next();
}

// Specify the routes where the middleware should run
export const config = {
  // matcher: ['/:path*'], // Apply middleware to all routes
  matcher: ["/user-payment", ], // Apply middleware to particular routes
};

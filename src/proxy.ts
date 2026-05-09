import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const protectedRoutes = ["/dashboard", "/study"];
const adminRoutes = ["/admin"];
const authRoutes = ["/login", "/register"];

async function getSession(request: NextRequest) {
  try {
    const response = await fetch(`${API_URL}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) return null;
    const session = await response.json();

    return session?.user ? session : null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAdminRoute = adminRoutes.some((r) => pathname.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

  // Skip session fetch for purely public routes
  if (!isProtectedRoute && !isAdminRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // Quick cookie check first
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie && (isProtectedRoute || isAdminRoute)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!sessionCookie) {
    return NextResponse.next();
  }

  const session = await getSession(request);
  const isAuthenticated = !!session;
  const userRole: string = session?.user?.role ?? "";

  // Unauthenticated user hitting a protected or admin route (cookie was invalid)
  if ((isProtectedRoute || isAdminRoute) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user hitting /admin without the right role
  if (isAdminRoute && isAuthenticated) {
    const isAdmin = userRole.toLowerCase() === "admin";
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/explore", request.url));
    }
  }

  // Authenticated admin hitting /dashboard or other user protected routes
  if (isProtectedRoute && isAuthenticated) {
    const isAdmin = userRole.toLowerCase() === "admin";
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Authenticated user trying to access login/register
  if (isAuthRoute && isAuthenticated) {
    const destination =
      userRole.toLowerCase() === "admin" ? "/admin" : "/explore";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/study/:path*",
    "/login",
    "/register",
  ],
};

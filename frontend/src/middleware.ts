import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/lookup") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  const isAdminRoute = pathname.startsWith("/admin");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (!token && isAdminRoute) {
    return NextResponse.redirect(new URL("/lookup", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path", "/lookup", "/login", "/signup", "/store/:path"],
};

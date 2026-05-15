import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // 1. Tenant Detection from Hostname (Subdomain)
  const hostname = req.headers.get("host");
  // Assuming dev is localhost:3000 and prod is injaazh.com
  // Subdomains like tenant1.injaazh.com
  const subdomain = hostname?.split(".")[0];
  const isMainDomain = hostname === "localhost:3000" || hostname === "localhost:3001" || hostname === "localhost:3005" || hostname === "injaazh.com";

  // 2. Route Protection
  const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");
  const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/api/public") || nextUrl.pathname.startsWith("/api/health");
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 3. Role-Based Access Control (RBAC)
  if (isLoggedIn && req.auth?.user) {
    const userRole = (req.auth.user as any).role;
    const path = nextUrl.pathname;

    // Define Restricted Routes for standard USERS
    const adminRoutes = ["/hrm", "/crm", "/inventory", "/finance", "/ai-hub", "/ai-pulse", "/super-admin"];
    const isTryingToAccessAdminRoute = adminRoutes.some(route => path.startsWith(route));

    if (userRole === "USER" && isTryingToAccessAdminRoute) {
      // Forbidden: Redirect standard user back to dashboard
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  // 4. Multi-tenant Check

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

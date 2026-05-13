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
  const isMainDomain = hostname === "localhost:3000" || hostname === "localhost:3001" || hostname === "injaazh.com";

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

  // 3. Multi-tenant Check
  // If logged in, ensure user belongs to the current subdomain/tenant
  if (isLoggedIn && !isMainDomain && req.auth?.user && subdomain !== (req.auth.user as any).tenantSlug) {
    // Unauthorized access to another tenant's subdomain
    return NextResponse.rewrite(new URL("/403", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

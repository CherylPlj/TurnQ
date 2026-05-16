import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/src/lib/auth/constants";
import { withNoStoreHeaders } from "@/src/lib/auth/no-cache";
import { verifySessionToken } from "@/src/lib/auth/session";

const CLIENT_PATH_PREFIX = "/client";
const ADMIN_PATH_PREFIX = "/admin";
const AUTH_PAGES = ["/sign-in", "/sign-up"];

function isAdminRole(role: Role) {
  return role === Role.ADMIN || role === Role.STAFF;
}

function redirect(url: URL) {
  return withNoStoreHeaders(NextResponse.redirect(url));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const isClientUser = session?.role === Role.USER;
  const isAdminUser = session ? isAdminRole(session.role) : false;

  if (pathname.startsWith(ADMIN_PATH_PREFIX)) {
    if (isAdminUser) {
      return withNoStoreHeaders(NextResponse.next());
    }

    if (isClientUser) {
      const clientUrl = request.nextUrl.clone();
      clientUrl.pathname = "/client";
      clientUrl.search = "";
      return redirect(clientUrl);
    }

    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/sign-in";
    signInUrl.searchParams.set("next", pathname);
    return redirect(signInUrl);
  }

  if (pathname.startsWith(CLIENT_PATH_PREFIX)) {
    if (isClientUser) {
      return withNoStoreHeaders(NextResponse.next());
    }

    if (isAdminUser) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      adminUrl.search = "";
      return redirect(adminUrl);
    }

    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/sign-in";
    signInUrl.searchParams.set("next", pathname);
    return redirect(signInUrl);
  }

  if (AUTH_PAGES.includes(pathname)) {
    if (isAdminUser) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      adminUrl.search = "";
      return redirect(adminUrl);
    }

    if (isClientUser) {
      const clientUrl = request.nextUrl.clone();
      clientUrl.pathname = "/client";
      clientUrl.search = "";
      return redirect(clientUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/client", "/client/:path*", "/sign-in", "/sign-up"],
};

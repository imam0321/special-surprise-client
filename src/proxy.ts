import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth.utils";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";
import { getNewAccessToken } from "./services/auth/auth.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasTokenRefreshedParam =
    request.nextUrl.searchParams.has("tokenRefreshed");

  if (hasTokenRefreshedParam) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("tokenRefreshed");
    return NextResponse.redirect(url);
  }

  const tokenRefreshResult = await getNewAccessToken();

  if (tokenRefreshResult?.tokenRefreshed) {
    const url = request.nextUrl.clone();
    url.searchParams.set("tokenRefreshed", "true");
    return NextResponse.redirect(url);
  }

  const accessToken = (await getCookie("accessToken")) || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken.role;
  }

  const routerOwner = getRouteOwner(pathname);

  const isAuth = isAuthRoute(pathname);

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  if (pathname === "/reset-password") {
    const id = request.nextUrl.searchParams.get("id");
    const token = request.nextUrl.searchParams.get("token");

    if (!id || !token) {
      return NextResponse.redirect(
        new URL("/forgot-password?error=invalid-link", request.url)
      );
    }
  }

  if (routerOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  if (
    routerOwner === "ADMIN" ||
    routerOwner === "MODERATOR" ||
    routerOwner === "USER"
  ) {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};

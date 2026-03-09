export type UserRole = "ADMIN" | "MODERATOR" | "USER"

export type RouteConfig = {
  exact: string[],
  patterns: RegExp[]
}

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/dashboard/profile", "/dashboard/change-password", "/settings", "/check-out", "/payment"],
  patterns: [/^\/surprises\/[^/]+\/check-out$/],
}

export const moderatorProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/moderator/],
  exact: []
}

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/admin/],
  exact: []
}

export const staffProtectedRoutes: RouteConfig = {
  patterns: [
    /^\/dashboard\/categories-management/,
    /^\/dashboard\/orders-management/,
    /^\/dashboard\/surprises-management/,
    /^\/dashboard\/users-management/,
  ],
  exact: []
}

export const userProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: ["/dashboard"]
}

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
}

export const isRouterMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true
  }

  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "ADMIN" | "MODERATOR" | "USER" | "COMMON" | "STAFF" | null => {
  if (isRouterMatches(pathname, commonProtectedRoutes)) return "COMMON";
  if (isRouterMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouterMatches(pathname, moderatorProtectedRoutes)) return "MODERATOR";
  if (isRouterMatches(pathname, staffProtectedRoutes)) return "STAFF";
  if (isRouterMatches(pathname, userProtectedRoutes)) return "USER";
  return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";
    case "MODERATOR":
      return "/dashboard/moderator";
    case "USER":
      return "/dashboard";
    default:
      return "/";
  }
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true
  }

  if (routeOwner === role) {
    return true
  }

  if (routeOwner === "STAFF" && (role === "ADMIN" || role === "MODERATOR")) {
    return true
  }

  return false
}
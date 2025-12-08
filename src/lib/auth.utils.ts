export type UserRole = "ADMIN" | "MODERATOR" | "USER"

export type RouteConfig = {
  exact: string[],
  patterns: RegExp[]
}

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
}

export const doctorProtectedRoutes: RouteConfig = {
  patterns: [/^\/moderator/],
  exact: []
}

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: []
}

export const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: []
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

export const getRouteOwner = (pathname: string): "ADMIN" | "MODERATOR" | "USER" | "COMMON" | null => {
  if (isRouterMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouterMatches(pathname, doctorProtectedRoutes)) return "MODERATOR";
  if (isRouterMatches(pathname, patientProtectedRoutes)) return "USER";
  if (isRouterMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "MODERATOR":
      return "/doctor/dashboard";
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

  return false
}
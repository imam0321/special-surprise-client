import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./auth.utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["ADMIN", "MODERATOR", "USER"],
        },
        {
          title: "My Profile",
          href: "/dashboard/profile",
          icon: "User",
          roles: ["ADMIN", "MODERATOR", "USER"],
        },
        {
          title: "Change Password",
          href: "/dashboard/change-password",
          icon: "Lock",
          roles: ["ADMIN", "MODERATOR", "USER"],
        },
      ],
    },
  ];
};

export const moderatorNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [

      {
        title: "Users",
        href: "/dashboard/users-management",
        icon: "Users",
        roles: ["MODERATOR"],
      },
    ],
  },
  {
    title: "Gift Management",
    items: [
      {
        title: "Surprises",
        href: "/dashboard/surprises-management",
        icon: "Gift",
        roles: ["MODERATOR"],
      },
      {
        title: "Categories",
        href: "/dashboard/categories-management",
        icon: "category",
        roles: ["MODERATOR"],
      },
      {
        title: "Orders",
        href: "/dashboard/orders-management",
        icon: "Box",
        roles: ["MODERATOR"],
      },
    ],
  },
];

export const userNavItems: NavSection[] = [
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Moderators",
        href: "/dashboard/admin/moderators-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Users",
        href: "/dashboard/users-management",
        icon: "Users",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Gift Management",
    items: [
      {
        title: "Surprises",
        href: "/dashboard/surprises-management",
        icon: "Gift",
        roles: ["ADMIN"],
      },
      {
        title: "Categories",
        href: "/dashboard/categories-management",
        icon: "category",
        roles: ["ADMIN"],
      },
      {
        title: "Orders",
        href: "/dashboard/orders-management",
        icon: "Box",
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "MODERATOR":
      return [...commonNavItems, ...moderatorNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};

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
          href: "/my-profile",
          icon: "User",
          roles: ["ADMIN", "MODERATOR", "USER"],
        },
        {
          title: "Change Password",
          href: "/change-password",
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
        href: "/moderator/dashboard/users-management",
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
        href: "/moderator/dashboard/surprises-management",
        icon: "Gift",
        roles: ["MODERATOR"], 
      },
      {
        title: "Categories",
        href: "/moderator/dashboard/categories-management",
        icon: "category",
        roles: ["MODERATOR"], 
      },
      {
        title: "Orders",
        href: "/moderator/dashboard/orders-management",
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
        href: "/admin/dashboard/moderators-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Users",
        href: "/admin/dashboard/users-management",
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
        href: "/admin/dashboard/surprises-management",
        icon: "Gift",
        roles: ["ADMIN"],
      },
      {
        title: "Categories",
        href: "/admin/dashboard/categories-management",
        icon: "category",
        roles: ["ADMIN"],
      },
      {
        title: "Orders",
        href: "/admin/dashboard/orders-management",
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

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
      ],
    },
  ];
};

export const moderatorNavItems: NavSection[] = [
  {
    title: "Moderator Management",
    items: [
      {
        title: "Appointments",
        href: "/doctor/dashboard/appointments",
        icon: "Calender",
        badge: "3",
        roles: ["MODERATOR"],
      },
      {
        title: "My Schedules",
        href: "/doctor/dashboard/schedules",
        icon: "Clock",
        roles: ["MODERATOR"],
      },
      {
        title: "Prescriptions",
        href: "/doctor/dashboard/prescriptions",
        icon: "FileText",
        roles: ["MODERATOR"],
      },
    ],
  },
];

export const UserNavItems: NavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/my-appointments",
        icon: "Calender",
        roles: ["USER"],
      },
      {
        title: "Book Appointment",
        href: "/consultation",
        icon: "ClipboardList",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText",
        roles: ["USER"],
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Activity",
        roles: ["USER"],
      },
    ],
  },
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
      return [...commonNavItems, ...UserNavItems];
    default:
      return [];
  }
};

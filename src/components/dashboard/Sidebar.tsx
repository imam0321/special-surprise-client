"use client";

import * as React from "react";
import { NavDocuments } from "./NavItems";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavSection } from "@/types/dashboard.types";
import { Gift } from "lucide-react";

export function AppSidebar({
  navbarItems,
  ...props
}: {
  navbarItems: NavSection[];
} & React.ComponentProps<typeof Sidebar>) {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => isMobile && setOpenMobile(false)}
        >
          <Gift className="h-8 w-8 text-surprise-pink" />
          <span className="font-display text-2xl gradient-text">
            Special Surprise
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavDocuments items={navbarItems} />
      </SidebarContent>
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import { NavDocuments } from "@/components/nav-documents";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
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
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2">
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

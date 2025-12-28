"use client";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";

export default function ModeratorHeader() {
  return (
    <>
      <ManagementPageHeader
        title="Moderator Management"
        description="This is a Moderator Management"
        action={{
          type: "link",
          label: "Create Moderator",
          icon: Plus,
          href: "/admin/dashboard/moderators-management/moderator-register",
        }}
      />
    </>
  );
}

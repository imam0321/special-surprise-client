"use client";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
// import { Plus } from "lucide-react";

export default function UserHeader() {
  return (
    <>
      <ManagementPageHeader
        title="User Management"
        description="This is a User Management"
        // action={{
        //   type: "link",
        //   label: "Create Moderator",
        //   icon: Plus,
        //   href: "/admin/dashboard/moderators-management/moderator-register",
        // }}
      />
    </>
  );
}

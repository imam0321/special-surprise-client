"use client";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";


export default function SurpriseHeader() {
  return (
    <ManagementPageHeader
      title="Surprises Management"
      description="This is a Surprises Management"
      action={{
        type: "link",
        label: "Add Surprises",
        icon: Plus,
        href: "/admin/dashboard/surprises-management/add-surprise",
      }}
    />
  );
}

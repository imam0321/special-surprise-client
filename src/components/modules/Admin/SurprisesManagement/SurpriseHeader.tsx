"use client";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import SurpriseFormDialog from "./SurpriseFormDialog";
import { Category } from "@/types/product.interface";

export default function SurpriseHeader({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ManagementPageHeader
        title="Surprises Management"
        description="This is a Surprises Management"
        action={{
          type: "button",
          label: "Add Surprises",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
      <SurpriseFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        categories={categories}
      />
    </>
  );
}

"use client";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ModeratorRegisterFormDialog from "./ModeratorRegisterFormDialog";

export default function ModeratorHeader() {
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
        title="Moderator Management"
        description="This is a Moderator Management"
        action={{
          type: "button",
          label: "Create Moderator",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
      <ModeratorRegisterFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />
    </>
  );
}

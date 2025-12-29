"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { moderatorsColumns } from "./moderatorsColumns";
import { softDeleteModerator } from "@/services/admin/moderatorsManagement";
import ModeratorViewDetailDialog from "./ModeratorViewDetailDialog";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

export default function ModeratorTable({
  moderators,
}: {
  moderators: UserInfo[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingModerator, setDeletingModerator] = useState<UserInfo | null>(
    null
  );
  const [viewingModerator, setViewingModerator] = useState<UserInfo | null>(
    null
  );
  const [editingModerator, setEditingModerator] = useState<UserInfo | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (moderator: UserInfo) => {
    setViewingModerator(moderator);
  };

  const handleEdit = (moderator: UserInfo) => {
    setEditingModerator(moderator);
  };

  const handleDelete = (moderator: UserInfo) => {
    setDeletingModerator(moderator);
  };

  const confirmDelete = async (id: string) => {
    if (!id) return;

    setIsDeleting(true);
    const result = await softDeleteModerator(id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Moderator deleted successfully");
      setDeletingModerator(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete moderator");
    }
  };

  return (
    <>
      <ManagementTable
        data={moderators}
        columns={moderatorsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(moderator) => moderator.id!}
        emptyMessage="No moderators found"
      />

      {/* View Moderator Detail Dialog */}
      <ModeratorViewDetailDialog
        open={!!viewingModerator}
        onClose={() => setViewingModerator(null)}
        moderator={viewingModerator}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingModerator}
        setOpen={(val) => {
          if (!val) setDeletingModerator(null);
        }}
        title="Delete Moderator"
        description={`Are you sure you want to delete ${deletingModerator?.name}? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {
          if (deletingModerator?.id) confirmDelete(deletingModerator.id);
        }}
      />
    </>
  );
}

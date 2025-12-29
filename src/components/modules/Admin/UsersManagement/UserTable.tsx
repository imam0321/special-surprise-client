"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { softDeleteModerator } from "@/services/admin/moderatorsManagement";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { customersColumns } from "./customersColumns";
import ModeratorViewDetailDialog from "../ModeratorsManagement/ModeratorViewDetailDialog";


export default function UserTable({
  customers,
}: {
  customers: UserInfo[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingCustomer, setDeletingCustomer] = useState<UserInfo | null>(
    null
  );
  const [viewingCustomer, setViewingCustomer] = useState<UserInfo | null>(
    null
  );
  const [, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (customer: UserInfo) => {
    setViewingCustomer(customer);
  };

  const handleDelete = (customer: UserInfo) => {
    setDeletingCustomer(customer);
  };

  const confirmDelete = async (id: string) => {
    if (!id) return;

    setIsDeleting(true);
    const result = await softDeleteModerator(id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Moderator deleted successfully");
      setDeletingCustomer(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete moderator");
    }
  };

  return (
    <>
      <ManagementTable
        data={customers}
        columns={customersColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(customer) => customer.id!}
        emptyMessage="No customers found"
      />

      {/* View Customer Detail Dialog */}
      <ModeratorViewDetailDialog
        open={!!viewingCustomer}
        onClose={() => setViewingCustomer(null)}
        moderator={viewingCustomer}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingCustomer}
        setOpen={(val) => {
          if (!val) setDeletingCustomer(null);
        }}
        title="Delete Moderator"
        description={`Are you sure you want to delete ${deletingCustomer?.name}? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {
          if (deletingCustomer?.id) confirmDelete(deletingCustomer.id);
        }}
      />
    </>
  );
}

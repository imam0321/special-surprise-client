"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { Product } from "@/types/product.interface";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { surprisesColumns } from "./SurpriseColumns";
import { deleteProduct } from "@/services/product/product";

export default function SurpriseTable({ surprises }: { surprises: Product[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingSurprise, setDeletingSurprise] = useState<Product | null>(
    null
  );
  const [, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (surprise: Product) => {
    redirect(`/surprises/${surprise.productCode}`);
  };

  const handleEdit = (surprise: Product) => {
    redirect(`/admin/dashboard/surprises-management/edit-surprise/${surprise.productCode}`);
  };

  const handleDelete = (surprise: Product) => {
    setDeletingSurprise(surprise);
  };

  const confirmDelete = async (productCode: string) => {
    if (!productCode) return;

    setIsDeleting(true);
    const result = await deleteProduct(productCode);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Surprise deleted successfully");
      setDeletingSurprise(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete Surprise");
    }
  };

  return (
    <>
      <ManagementTable
        data={surprises}
        columns={surprisesColumns}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(surprise) => surprise.id!}
        emptyMessage="No surprises found"
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingSurprise}
        setOpen={(val) => {
          if (!val) setDeletingSurprise(null);
        }}
        title="Delete Surprise"
        description={`Are you sure you want to delete ${deletingSurprise?.title}? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {
          if (deletingSurprise?.productCode)
            confirmDelete(deletingSurprise.productCode);
        }}
      />
    </>
  );
}

"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { Category, Product } from "@/types/product.interface";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { surprisesColumns } from "./SurpriseColumns";
import { deleteProduct } from "@/services/product/product";
import SurpriseFormDialog from "./SurpriseFormDialog";

export default function SurpriseTable({ surprises, categories }: { surprises: Product[]; categories: Category[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editingSurprise, setEditingSurprise] = useState<Product | null>(null);
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
    setEditingSurprise(surprise);
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

      <SurpriseFormDialog
        open={!!editingSurprise}
        onClose={() => setEditingSurprise(null)}
        surprise={editingSurprise!}
        onSuccess={() => {
          setEditingSurprise(null);
          handleRefresh();
        }}
        categories={categories}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingSurprise}
        setOpen={() => setDeletingSurprise(null)}
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

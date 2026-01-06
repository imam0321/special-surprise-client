"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { Category } from "@/types/product.interface";
import { categoriesColumns } from "./categoriesColumns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import CategoryFormDialog from "./CategoryFormDialog";
import { deleteCategory } from "@/services/product/categories";

export default function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
  };

  const confirmDelete = async (id: string) => {
    if (!id) return;

    setIsDeleting(true);
    const result = await deleteCategory(id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Category deleted successfully");
      setDeletingCategory(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete category");
    }
  };

  return (
    <>
      <ManagementTable
        data={categories}
        columns={categoriesColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(category) => category.id!}
        emptyMessage="No categories found"
      />

      {/* Edit Category Dialog */}
      <CategoryFormDialog
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        onSuccess={() => {
          setEditingCategory(null);
          handleRefresh();
        }}
        category={editingCategory!}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingCategory}
        setOpen={(val) => {
          if (!val) setDeletingCategory(null);
        }}
        title="Delete Category"
        description={`Are you sure you want to delete ${deletingCategory?.name}? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {
          if (deletingCategory?.id) confirmDelete(deletingCategory.id);
        }}
        disabled={isDeleting}
      />
    </>
  );
}

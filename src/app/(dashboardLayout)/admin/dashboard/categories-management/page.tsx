import CategoriesHeader from "@/components/modules/Admin/CategoriesManagement/CategoriesHeader";
import CategoriesTable from "@/components/modules/Admin/CategoriesManagement/CategoriesTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllCategories } from "@/services/product/categories";
import { Suspense } from "react";

export default async function CategoriesManagementPage() {
  const categories = await getAllCategories("");

  return (
    <div className="space-y-6">
      <CategoriesHeader />
      <Suspense fallback={<TableSkeleton columns={3} rows={6} />}>
        <CategoriesTable categories={categories?.data} />
      </Suspense>
    </div>
  );
}

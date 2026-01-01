import SurpriseHeader from "@/components/modules/Admin/SurprisesManagement/SurpriseHeader";
import SurpriseTable from "@/components/modules/Admin/SurprisesManagement/SurpriseTable";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllCategories } from "@/services/product/categories";
import { getAllProduct } from "@/services/product/product";
import { Category } from "@/types/product.interface";
import { Suspense } from "react";

export default async function SurprisesManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const surprises = await getAllProduct(queryString);
  const categoriesResult = await getAllCategories("");

  return (
    <div className="space-y-6">
      <SurpriseHeader />
      <div className="flex items-center gap-2">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search title or Code..."
        />
        <SelectFilter
             paramName="category"
             options={categoriesResult.data.map((category: Category) => ({
               label: category.name,
               value: category.name,
             }))}
             placeholder="Filter by category"
           />
      </div>
      <Suspense fallback={<TableSkeleton columns={8} rows={6} />}>
        <SurpriseTable surprises={surprises?.data || []} />
        <TablePagination currentPage={surprises?.meta?.page || 1} totalPages={surprises?.meta?.totalPages} />
      </Suspense>
    </div>
  );
}

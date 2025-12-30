import CategoriesHeader from "@/components/modules/Admin/CategoriesManagement/CategoriesHeader";
import SearchFilter from "@/components/shared/SearchFilter";
import { getAllCategories } from "@/services/product/categories";

export default async function CategoriesManagementPage() {
  const categories = await getAllCategories();
  return (
    <div className="space-y-6">
      <CategoriesHeader />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search gift..." />
        {/* <SelectFilter
                 paramName="specialty"
                 options={specialtiesResult.data.map((specialty: ISpecialty) => ({
                   label: specialty.title,
                   value: specialty.title,
                 }))}
                 placeholder="Filter by specialty"
               /> */}
      </div>
      {/* <Suspense fallback={<TableSkeleton columns={5} rows={6} />}>
            <ModeratorTable moderators={moderators?.data} />
          </Suspense> */}
    </div>
  );
}

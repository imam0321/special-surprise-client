import SurpriseHeader from "@/components/modules/Admin/SurprisesManagement/SurpriseHeader";
import SearchFilter from "@/components/shared/SearchFilter";
import { getAllProduct } from "@/services/product/product";

export default async function SurprisesManagementPage() {
  const surprises = await getAllProduct();
  console.log(surprises)
  return (
    <div className="space-y-6">
      <SurpriseHeader />
      <div className="flex items-center gap-2">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search gift..."
        />
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

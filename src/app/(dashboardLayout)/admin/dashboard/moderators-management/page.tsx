import ModeratorHeader from "@/components/modules/Admin/ModeratorsManagement/ModeratorHeader";
import ModeratorTable from "@/components/modules/Admin/ModeratorsManagement/ModeratorTable";
import SearchFilter from "@/components/shared/SearchFilter";
// import SelectFilter from "@/components/shared/SelectFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getModerators } from "@/services/admin/moderatorsManagement";
import { Suspense } from "react";

export default async function ModeratorsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const moderators = await getModerators(queryString);

  return (
    <div className="space-y-6">
      <ModeratorHeader />
      <div className="flex items-center gap-2">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search moderators..."
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
      <Suspense fallback={<TableSkeleton columns={5} rows={6} />}>
        <ModeratorTable moderators={moderators?.data} />
      </Suspense>
    </div>
  );
}

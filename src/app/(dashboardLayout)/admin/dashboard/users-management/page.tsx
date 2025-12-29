import UserHeader from "@/components/modules/Admin/UsersManagement/UserHeader";
import UserTable from "@/components/modules/Admin/UsersManagement/UserTable";
import SearchFilter from "@/components/shared/SearchFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getCustomers } from "@/services/admin/usersManagement";
import { Suspense } from "react";


export default async function UsersManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const customers = await getCustomers(queryString);

  return (
    <div className="space-y-6">
      <UserHeader />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search users..." />
        {/* <SelectFilter
              paramName="specialty"
              options={specialtiesResult.data.map((specialty: ISpecialty) => ({
                label: specialty.title,
                value: specialty.title,
              }))}
              placeholder="Filter by specialty"
            /> */}
      </div>
      <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
        <UserTable customers={customers?.data} />
      </Suspense>
    </div>
  );
}

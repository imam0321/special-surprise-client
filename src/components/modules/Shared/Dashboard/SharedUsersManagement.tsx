import UserTable from "@/components/modules/Admin/UsersManagement/UserTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import PaginationHelper from "@/components/shared/PaginationHelper";
import SearchFilter from "@/components/shared/SearchFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getCustomers } from "@/services/admin/usersManagement";
import { Suspense } from "react";

export default async function SharedUsersManagement({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const customers = await getCustomers(queryString);

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="User Management"
        description="This is a User Management"
      />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search users..." />
      </div>
      <Suspense fallback={<TableSkeleton columns={5} rows={6} />}>
        <UserTable customers={customers?.data} />
        <PaginationHelper currentPage={customers?.meta?.page} totalPages={customers?.meta?.totalPages} />
      </Suspense>
    </div>
  );
}

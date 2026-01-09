import OrdersTable from "@/components/modules/Admin/OrdersManagement/OrdersTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import PaginationHelper from "@/components/shared/PaginationHelper";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllOrders } from "@/services/order/order";
import { Suspense } from "react";

export default async function OrdersManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const orders = await getAllOrders(queryString);
  
  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Orders Management"
        description="This is a Orders Management"
      />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search users..." />
        <span className="text-sm font-medium">Status:</span>
        <SelectFilter
          paramName="status"
          options={["PENDING", "PREPARING", "CANCEL", "COMPLETE"].map(
            (status) => ({
              label: status,
              value: status,
            })
          )}
          placeholder="Filter by Order Status"
        />
      </div>
      <Suspense fallback={<TableSkeleton columns={7} rows={6} />}>
        <OrdersTable orders={orders?.data} />
        <PaginationHelper
          currentPage={orders?.meta?.page}
          totalPages={orders?.meta?.totalPages}
        />
      </Suspense>
    </div>
  );
}

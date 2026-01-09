import OrdersTable from "@/components/modules/Admin/OrdersManagement/OrdersTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import SearchFilter from "@/components/shared/SearchFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllOrders } from "@/services/order/order";
import { Suspense } from "react";

export default async function OrdersManagementPage() {
  const orders = await getAllOrders();
  console.log(orders)
  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Orders Management"
        description="This is a Orders Management"
      />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search users..." />
      </div>
      <Suspense fallback={<TableSkeleton columns={5} rows={6} />}>
        <OrdersTable orders={orders?.data} />
      </Suspense>
    </div>
  );
}

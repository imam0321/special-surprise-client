import OrdersTable from "@/components/modules/Admin/OrdersManagement/OrdersTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import PaginationHelper from "@/components/shared/PaginationHelper";
import SearchFilter from "@/components/shared/SearchFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyOrders } from "@/services/order/order";
import { Order } from "@/types/order.type";
import { CheckCircle, DollarSign, Package } from "lucide-react";
import { Suspense } from "react";

export default async function UserDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const myOrders = await getMyOrders(queryString);

  const totalOrders = myOrders?.data?.length ?? 0;
  const totalAmount = myOrders?.data?.reduce(
    (sum: number, order: Order) => sum + (order.payment?.amount || 0),
    0
  );

  const deliveredOrders = myOrders?.data?.filter(
    (order: Order) => order.status === "COMPLETE"
  ).length;
  
  return (
    <div className="space-y-6">
      <ManagementPageHeader title="Dashboard Status" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-surprise-pink/20 p-4 rounded-full mr-4">
              <Package size={24} className="text-surprise-pink" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold">{totalOrders}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-surprise-teal/20 p-4 rounded-full mr-4">
              <DollarSign size={24} className="text-surprise-teal" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Amount</p>
              <h3 className="text-2xl font-bold">৳{totalAmount}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-surprise-purple/20 p-4 rounded-full mr-4">
              <CheckCircle size={24} className="text-surprise-purple" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Delivered Orders</p>
              <h3 className="text-2xl font-bold">{deliveredOrders}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      <ManagementPageHeader title="My Orders" />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search users..." />
      </div>

      <Suspense fallback={<TableSkeleton columns={7} rows={6} />}>
        <OrdersTable orders={myOrders?.data} />
        <PaginationHelper
          currentPage={myOrders?.meta?.page}
          totalPages={myOrders?.meta?.totalPages}
        />
      </Suspense>
    </div>
  );
}

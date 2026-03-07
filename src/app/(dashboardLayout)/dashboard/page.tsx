import OrdersTable from "@/components/modules/Admin/OrdersManagement/OrdersTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import PaginationHelper from "@/components/shared/PaginationHelper";
import SearchFilter from "@/components/shared/SearchFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyOrders } from "@/services/order/order";
import { CheckCircle, DollarSign, Package } from "lucide-react";
import { Suspense } from "react";
import StatsGrid from "@/components/shared/Dashboard/StatsGrid";
import { calculateTotalRevenue, countOrdersByStatus, formatCurrency } from "@/lib/dashboard.utils";

export default async function UserDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const myOrders = await getMyOrders(queryString);

  const stats = [
    {
      title: "Total Orders",
      value: myOrders?.data?.length ?? 0,
      icon: Package,
      bgColorClass: "bg-surprise-pink/20",
      iconColorClass: "text-surprise-pink",
    },
    {
      title: "Total Spending",
      value: formatCurrency(calculateTotalRevenue(myOrders?.data, false)),
      icon: DollarSign,
      bgColorClass: "bg-surprise-teal/20",
      iconColorClass: "text-surprise-teal",
    },
    {
      title: "Delivered Orders",
      value: countOrdersByStatus(myOrders?.data, "COMPLETE"),
      icon: CheckCircle,
      bgColorClass: "bg-surprise-purple/20",
      iconColorClass: "text-surprise-purple",
    },
  ];

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening today."
      />

      <StatsGrid stats={stats} gridCols="grid-cols-1 md:grid-cols-3" />

      <ManagementPageHeader title="My Orders" />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search orders..." />
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

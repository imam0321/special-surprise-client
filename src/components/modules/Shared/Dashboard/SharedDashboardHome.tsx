

import AreaChartPaidOrdersLast30Days from "@/components/shared/AreaChartPaidOrdersLast30Days";
import BarChartOrdersByStatus from "@/components/shared/BarChartOrdersByStatus";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/types/order.type";
import StatsGrid, { DashboardStat } from "@/components/shared/Dashboard/StatsGrid";

interface SharedDashboardHomeProps {
	stats: DashboardStat[];
	orders: Order[];
	isLoading?: boolean;
}

export default function SharedDashboardHome({
	stats,
	orders,
	isLoading = false,
}: SharedDashboardHomeProps) {
	return (
		<div className="space-y-6">
			<ManagementPageHeader
				title="Dashboard Overview"
				description="Welcome back! Here's what's happening today."
			/>

			<StatsGrid stats={stats} />

			{/* Charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{isLoading || !orders ? (
					<Skeleton className="h-80 w-full" />
				) : (
					<>
						<BarChartOrdersByStatus orders={orders} />
						<AreaChartPaidOrdersLast30Days orders={orders} />
					</>
				)}
			</div>
		</div>
	);
}

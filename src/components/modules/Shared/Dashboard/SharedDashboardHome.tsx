

import AreaChartPaidOrdersLast30Days from "@/components/shared/AreaChartPaidOrdersLast30Days";
import BarChartOrdersByStatus from "@/components/shared/BarChartOrdersByStatus";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/types/order.type";
import { LucideIcon } from "lucide-react";

interface DashboardStat {
	title: string;
	value: string;
	icon: LucideIcon;
	color: string;
	trend?: string;
}

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
		<div className="space-y-2">
			<ManagementPageHeader
				title="Dashboard Overview"
				description="Welcome back! Here's what's happening today."
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
				{stats.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<div
							key={index}
							className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
						>
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 mb-1">{stat.title}</p>
									<h3 className="text-2xl font-bold text-gray-900">
										{stat.value}
									</h3>
								</div>
								<div className={`${stat.color} p-3 rounded-lg`}>
									<Icon className="w-6 h-6 text-white" />
								</div>
							</div>
						</div>
					);
				})}
			</div>

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

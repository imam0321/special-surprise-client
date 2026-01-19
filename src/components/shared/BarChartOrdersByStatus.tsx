"use client";
import BarChartCard from "@/components/shared/BarChartCard";
import { Order } from "@/types/order.type";

interface Props {
  orders: Order[];
}

const chartConfig = { main: { label: "Value", color: "var(--chart-1)" } };

export default function BarChartOrdersByStatus({ orders }: Props) {
  // Orders count by status
  const orderStatusCount = orders?.reduce(
    (acc: Record<string, number>, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const barChartData =
    Object.entries(orderStatusCount || {}).map(([status, count]) => ({
      status,
      count: Number(count),
    })) || [];

  return (
    <BarChartCard
      title="Orders by Status"
      data={barChartData}
      dataKey="status"
      chartConfig={chartConfig}
    />
  );
}

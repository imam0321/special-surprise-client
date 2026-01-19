"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import AreaChartCard from "@/components/shared/AreaChartCard";
import { Order } from "@/types/order.type";

interface Props {
  orders: Order[];
}

export default function AreaChartPaidOrdersLast30Days({ orders }: Props) {
  // Paid orders last 30 days
  const paidOrdersLast30DaysMap =
    orders?.reduce((acc: any, order) => {
      if (order.payment?.status !== "PAID") return acc;

      const orderDate = new Date(order.createdAt);
      const today = new Date();

      const diffInDays =
        (today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diffInDays <= 30) {
        const dayKey = orderDate.toISOString().split("T")[0];
        acc[dayKey] = (acc[dayKey] || 0) + 1;
      }

      return acc;
    }, {}) || {};

  const last30DaysAreaData = Array.from({ length: 30 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));

    const key = date.toISOString().split("T")[0];

    return {
      date: date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }),
      count: paidOrdersLast30DaysMap[key] || 0,
    };
  });

  return (
    <AreaChartCard
      title="Orders (Last 30 Days)"
      data={last30DaysAreaData}
      chartConfig={{
        main: {
          label: "Paid Orders",
          color: "chart-2",
        },
      }}
    />
  );
}

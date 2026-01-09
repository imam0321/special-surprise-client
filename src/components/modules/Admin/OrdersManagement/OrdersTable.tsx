"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { OrdersColumns } from "./OrdersColumns";
import { Order } from "@/types/order.type";
import { useState } from "react";
import OrderDetailsDialog from "./OrderDetailsDialog";

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const handleView = (order: Order) => {
    setViewingOrder(order);
  };

  return (
    <>
      <ManagementTable
        data={orders}
        columns={OrdersColumns}
        onView={handleView}
        getRowKey={(order) => order.id!}
        emptyMessage="No orders found"
      />

      <OrderDetailsDialog
        order={viewingOrder}
        onClose={() => setViewingOrder(null)}
      />
    </>
  );
}

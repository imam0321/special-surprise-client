"use client";
import OrderStatusCell from "@/components/shared/Cell/OrderStatusCell";
import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order.type";

export const OrdersColumns: Column<Order>[] = [
  {
    header: "Order Code",
    accessor: "orderCode",
  },
  {
    header: "Product",
    accessor: (row) => (
      <div>
        <p className="text-xs text-muted-foreground">
          {row?.product?.productCode}
        </p>
      </div>
    ),
  },
  {
    header: "Delivery Schedule",
    accessor: (row) => {
      const date = new Date(row?.deliveryDate).toLocaleDateString("en-GB");

      const time = new Date(row?.deliveryTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return (
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">{time}</span>
          <span className="font-medium">{date}</span>
        </div>
      );
    },
  },

  {
    header: "Amount",
    accessor: (row) => `৳${row?.payment?.amount}`,
  },
  {
    header: "Order Status",
    accessor: (row) => (
      <OrderStatusCell
        row={{
          status: row?.status,
          id: row?.id,
          paymentStatus: row?.payment?.status,
        }}
      />
    ),
  },

  {
    header: "Payment",
    accessor: (row) => {
      const status = row?.payment?.status;
      const badgeClass =
        status === "PAID"
          ? "bg-green-100 text-green-800"
          : status === "FAILED"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800";

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
];

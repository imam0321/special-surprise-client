"use client";

import { Order } from "@/types/order.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderDetailsDialogProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailsDialog({
  order,
  onClose,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800";
      case "PREPARING":
        return "bg-blue-100 text-blue-800";
      case "CANCEL":
        return "bg-red-100 text-red-800";
      case "COMPLETE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (status: string) =>
    status === "PAID"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-lg w-full p-4 sm:p-6 rounded-xl shadow-xl bg-[hsl(var(--card))]">
        {/* Header */}
        <DialogHeader className="pb-2 border-b border-border relative">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground">
            Order Details
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Full details of order <Badge>{order.orderCode}</Badge>
          </DialogDescription>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>

        {/* Card with order info */}
        <Card className="mt-4 rounded-lg shadow-md">
          <CardHeader className="pb-1">
            <CardTitle className="text-md sm:text-lg font-medium text-foreground">
              Receiver & Product Info
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Delivery, payment, and status
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 text-sm sm:text-base">
            <p>
              <strong>Order Code:</strong>{" "}
              <span className="text-primary">{order.orderCode}</span>
            </p>
            <p>
              <strong>Receiver:</strong> {order.receiverName} (
              {order.receiverPhone})
            </p>
            <p>
              <strong>Delivery:</strong>{" "}
              {new Date(order.deliveryDate).toLocaleDateString("en-GB")}{" "}
              {new Date(order.deliveryTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p>
              <strong>Product Code:</strong> {order.product.productCode}
            </p>
            <p>
              <strong>Address:</strong> {order.orderAddress.address_detail},{" "}
              {order.orderAddress.city}, {order.orderAddress.country}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1">
                <strong>Payment:</strong>
                <Badge className={`${getPaymentColor(order.payment.status)}`}>
                  {order.payment.status}
                </Badge>
              </span>
              <span className="text-muted-foreground">
                - ৳{order.payment.amount}
              </span>
              <span className="text-muted-foreground">
                (Txn: {order.payment.transactionId})
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1">
                <strong>Status:</strong>
                <Badge className={`${getStatusColor(order.status)}`}>
                  {order.status}
                </Badge>
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

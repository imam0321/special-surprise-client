/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { updateOrderStatus } from "@/services/order/order";
import { OrderStatus, PaymentStatus } from "@/types/order.type";
import { Pencil, Check, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner"; // Sonner toast

interface OrderStatusCellProps {
  row: {
    status: OrderStatus;
    id: string;
    paymentStatus: PaymentStatus;
  },
}

export default function OrderStatusCell({ row }: OrderStatusCellProps) {
  const { status, id, paymentStatus } = row;
  const [editing, setEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [tempStatus, setTempStatus] = useState(status);
  const [loading, setLoading] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const statusColor = {
    PENDING: "bg-amber-100",
    PREPARING: "bg-blue-100",
    CANCEL: "bg-red-100",
    COMPLETE: "bg-green-100",
  } as const;

  const statusTextColor = {
    PENDING: "text-amber-800",
    PREPARING: "text-blue-800",
    CANCEL: "text-red-800",
    COMPLETE: "text-green-800",
  } as const;

  const handleUpdate = async () => {
    if (tempStatus === currentStatus) {
      setEditing(false);
      return;
    }

    setLoading(true);
    try {
      const result = await updateOrderStatus(id, tempStatus);

      if (result.success) {
        setCurrentStatus(tempStatus);
        toast.success(`Order status updated to ${tempStatus}`);
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      setEditing(false);
    }
  };

  return (
    <div className="relative flex items-center space-x-2">
      {!editing ? (
        <>
          <Badge
            className={`${statusColor[currentStatus]} ${statusTextColor[currentStatus]} flex items-center`}
          >
            {currentStatus}
          </Badge>
          {paymentStatus === "PAID" ? (
            <Pencil
              size={16}
              className={`text-gray-600 cursor-pointer ${loading ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => {
                setTempStatus(currentStatus);
                setEditing(true);
                setTimeout(() => selectRef.current?.focus(), 0);
              }}
            />
          ) : (
            <X size={16} className="text-red-600" />
          )}
        </>
      ) : (
        <div className="flex items-center space-x-2">
          <select
            ref={selectRef}
            value={tempStatus}
            onChange={(e) => setTempStatus(e.target.value as OrderStatus)}
            className={`appearance-none px-2 py-1 text-xs font-medium rounded-full cursor-pointer 
              ${statusColor[tempStatus]} ${statusTextColor[tempStatus]} border border-gray-400`}
            style={{
              outline: "none",
              minWidth: "80px",
              textAlign: "center",
            }}
          >
            {(
              ["PENDING", "PREPARING", "CANCEL", "COMPLETE"] as OrderStatus[]
            ).map((s) => (
              <option
                key={s}
                value={s}
                className={`${statusColor[s]} ${statusTextColor[s]}`}
              >
                {s}
              </option>
            ))}
          </select>
          <Check
            size={16}
            className={`text-green-600 cursor-pointer ${loading ? "opacity-50 pointer-events-none" : ""}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}

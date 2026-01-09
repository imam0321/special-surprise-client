"use client";

import ShippingInfo from "./ShippingInfo";
import OrderSummary from "./OrderSummary";
import { Product } from "@/types/product.interface";
import { createOrder } from "@/services/order/order";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function CheckoutForm({ surprise }: { surprise: Product }) {
  const [state, formAction, isPending] = useActionState(createOrder, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      const message =
        state.message === "You are not permitted to view this route"
          ? "You are not allowed to place an order"
          : state.message;

      toast.error(message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ShippingInfo state={state} />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary surprise={surprise} isPending={isPending} />
        </div>
      </div>
    </form>
  );
}

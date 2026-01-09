/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { OrderValidationZodSchema } from "@/zod/order.validation";
import { redirect } from "next/navigation";
import { format, parse, parseISO } from "date-fns";
import { OrderStatus } from "@/types/order.type";
import { revalidateTag } from "next/cache";

export const createOrder = async (_prevState: any, formData: FormData) => {
  let paymentUrl = "";

  const rawDate = formData.get("deliveryDate") as string;
  const rawTime = formData.get("deliveryTime") as string;

  let formattedDate = rawDate;
  let formattedTime = rawTime;

  try {
    if (rawDate) {
      formattedDate = format(parseISO(rawDate), "dd-MM-yyyy");
    }
    if (rawTime) {
      formattedTime = format(parse(rawTime, "HH:mm", new Date()), "h.mm a");
    }
  } catch (err) {
    console.error("Date formatting error", err);
  }

  const payload = {
    receiverName: formData.get("receiverName"),
    receiverPhone: formData.get("receiverPhone"),
    deliveryDate: formattedDate,
    deliveryTime: formattedTime,
    productId: formData.get("productId"),
    amount: Number(formData.get("amount")),
    orderAddress: {
      country: formData.get("country"),
      city: formData.get("city"),
      address_detail: formData.get("address_detail"),
    },
  };

  try {
    const validatedPayload = zodValidator(payload, OrderValidationZodSchema);

    if (!validatedPayload.success) {
      return {
        success: false,
        errors: validatedPayload.errors,
        formData: payload,
      };
    }

    const res = await serverFetch.post("/order/create-order", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedPayload.data),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message, formData: payload };
    }

    if (result.success && result.data?.paymentUrl) {
      revalidateTag("order-list", { expire: 0 });
      paymentUrl = result.data.paymentUrl;
    }
  } catch (error: any) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) throw error;
    return {
      success: false,
      message: "Something went wrong!",
      formData: payload,
    };
  }

  if (paymentUrl) {
    redirect(paymentUrl);
  }
};

export const getAllOrders = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/order${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: ["order-list"],
          revalidate: 1800,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  try {
    const res = await serverFetch.patch(`/order/${id}/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update order status",
      };
    }

    revalidateTag("order-list", { expire: 0 });

    return {
      success: true,
      order: result.order,
    };
  } catch (error: any) {
    console.error("updateOrderStatus error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

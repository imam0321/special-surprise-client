/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { OrderValidationZodSchema } from "@/zod/order.validation";
import { redirect } from "next/navigation";
import { format, parse, parseISO } from "date-fns"; // ইমপোর্ট করুন

export const createOrder = async (_prevState: any, formData: FormData) => {
  let paymentUrl = "";

  // ১. ইনপুট থেকে ডাটা নিন (এগুলো HTML ডিফল্ট ফরম্যাটে আছে: YYYY-MM-DD এবং HH:mm)
  const rawDate = formData.get("deliveryDate") as string; // "2026-01-20"
  const rawTime = formData.get("deliveryTime") as string; // "17:28"

  // ২. ব্যাকএন্ডের রিকোয়ারমেন্ট অনুযায়ী ফরম্যাট পরিবর্তন করুন
  // ব্যাকএন্ড চাচ্ছে: "dd-MM-yyyy" এবং "h.mm a"
  let formattedDate = rawDate;
  let formattedTime = rawTime;

  try {
    if (rawDate) {
      formattedDate = format(parseISO(rawDate), "dd-MM-yyyy");
    }
    if (rawTime) {
      // "17:28" কে "5.28 PM" এ কনভার্ট করা (ব্যাকএন্ডের h.mm a ফরম্যাট অনুযায়ী)
      formattedTime = format(parse(rawTime, "HH:mm", new Date()), "h.mm a");
    }
  } catch (err) {
    console.error("Date formatting error", err);
  }

  const payload = {
    receiverName: formData.get("receiverName"),
    receiverPhone: formData.get("receiverPhone"),
    deliveryDate: formattedDate, // এখন যাবে "20-01-2026"
    deliveryTime: formattedTime, // এখন যাবে "5.28 PM"
    productId: formData.get("productId"),
    amount: Number(formData.get("amount")),
    orderAddress: {
      country: formData.get("country"),
      city: formData.get("city"),
      address_detail: formData.get("address_detail"),
    },
  };

  try {
    // Zod Validation (আপনার স্কিমাতে Regex গুলো শিথিল করতে হতে পারে অথবা ফরম্যাটেড ডাটা চেক করতে হবে)
    const validatedPayload = zodValidator(payload, OrderValidationZodSchema);

    if (!validatedPayload.success) {
      return { success: false, errors: validatedPayload.errors, formData: payload };
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
      paymentUrl = result.data.paymentUrl;
    }
  } catch (error: any) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) throw error;
    return { success: false, message: "Something went wrong!", formData: payload };
  }

  if (paymentUrl) {
    redirect(paymentUrl);
  }
};
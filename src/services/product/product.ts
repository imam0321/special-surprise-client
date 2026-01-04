/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { ProductValidationZodSchema } from "@/zod/product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProduct = async (_currentState: any, formData: FormData) => {
  try {
    const payload = {
      title: formData.get("title"),
      categoryId: formData.get("categoryId"),
      price: Number(formData.get("price")),
      discountedPrice: formData.get("discountedPrice") ? Number(formData.get("discountedPrice")) : 0,
      deliveryCharge: formData.get("deliveryCharge") ? Number(formData.get("deliveryCharge")) : 0,
      description: formData.get("description"),
      items: (formData.get("items") as string)?.split("||").map(i => i.trim()) || [],
    };

    // Validate using Zod
    const validatedPayload = zodValidator(payload, ProductValidationZodSchema);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedPayload.errors,
        formData: payload,
      };
    }

    if (!validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        formData: payload,
      };
    }

    const file = formData.get("thumbnail") as File | null;
    if (!file || file.size === 0) {
      return {
        success: false,
        message: "Thumbnail image is required",
        errors: { thumbnail: ["Thumbnail image is required"] },
      };
    }

    // Prepare FormData for server
    const fd = new FormData();
    fd.append("data", JSON.stringify(validatedPayload.data));
    fd.append("file", file);

    // Send request to server
    const res = await serverFetch.post("/product", { body: fd });
    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message };
    }

    // Redirect on success
    redirect("/admin/dashboard/surprises-management");

  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const updateProduct = async (
  productCode: string,
  _prevState: any,
  formData: FormData
) => {
  try {
    const payload = {
      title: formData.get("title"),
      categoryId: formData.get("categoryId"),
      price: formData.get("price"),
      discountedPrice: formData.get("discountedPrice"),
      deliveryCharge: formData.get("deliveryCharge"),
      description: formData.get("description"),
      items: formData.get("items"),
    };

    const validated = zodValidator(payload, ProductValidationZodSchema);
    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validated.errors,
      };
    }

    const fd = new FormData();
    fd.append("data", JSON.stringify(validated.data));

    const file = formData.get("thumbnail") as File | null;
    if (file && file.size > 0) {
      fd.append("file", file);
    }

    const res = await serverFetch.patch(`/product/${productCode}`, {
      body: fd,
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message };
    }

    revalidatePath("/admin/dashboard/surprises-management");

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getAllProduct = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/product${queryString ? `?${queryString}` : ""}`
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

export const getProductByCode = async (productCode: string) => {
  try {
    const res = await serverFetch.get(`/product/${productCode}`);
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

export const deleteProduct = async (productCode: string) => {
  try {
    const res = await serverFetch.delete(`/product/${productCode}`);
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

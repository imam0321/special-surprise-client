/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { ProductValidationZodSchema } from "@/zod/product";
import { revalidatePath } from "next/cache";

export const createProduct = async (_prevState: any, formData: FormData) => {
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

    const validatedPayload = zodValidator(payload, ProductValidationZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
      return {
        success: validatedPayload.success,
        message: "Validation failed",
        formData: payload,
        errors: validatedPayload.errors,
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
        errors: { file: ["Thumbnail image is required"] },
      };
    }

    const backendPayload = {
      title: validatedPayload.data.title,
      categoryId: validatedPayload.data.categoryId,
      price: validatedPayload.data.price,
      discountedPrice: validatedPayload.data.discountedPrice || 0,
      deliveryCharge: validatedPayload.data.deliveryCharge || 0,
      description: validatedPayload.data.description,
      items: validatedPayload.data.items,
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(backendPayload));
    newFormData.append("file", file);

    const res = await serverFetch.post("/product", {
      body: newFormData,
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Product creation failed",
      };
    }

    revalidatePath("/admin/dashboard/surprises-management");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Product creation error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
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

export const updateProduct = async (
  _prevState: any,
  formData: FormData,
  productCode: string
) => {
  try {
    const file = formData.get("file") as File | null;

    if (file && file.size > 0 && !file.type.startsWith("image/")) {
      return {
        success: false,
        message: "File must be an image",
        errors: { file: ["File must be an image"] },
      };
    }

    const payload = {
      title: formData.get("title"),
      categoryId: formData.get("categoryId"),
      price: formData.get("price"),
      discountedPrice: formData.get("discountedPrice"),
      deliveryCharge: formData.get("deliveryCharge"),
      description: formData.get("description"),
      items: formData.get("items"),
    };

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

    const backendPayload = {
      title: validatedPayload.data.title,
      categoryId: validatedPayload.data.categoryId,
      price: validatedPayload.data.price,
      discountedPrice: validatedPayload.data.discountedPrice || 0,
      deliveryCharge: validatedPayload.data.deliveryCharge || 0,
      description: validatedPayload.data.description,
      items: validatedPayload.data.items,
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(backendPayload));
    if (file && file.size > 0) {
      newFormData.append("file", file);
    }

    const res = await serverFetch.patch(`/product/${productCode}`, {
      body: newFormData,
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Product update failed",
      };
    }

    revalidatePath("/admin/dashboard/surprises-management");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Product update error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

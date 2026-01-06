/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { ProductValidationZodSchema } from "@/zod/product";
import z from "zod";

export const createProduct = async (_currentState: any, formData: FormData) => {
  try {
    // Get items array correctly
    const itemsArray = formData.getAll("items[]").filter((item) => item !== "");

    const payload = {
      title: formData.get("title"),
      categoryId: formData.get("categoryId"),
      price: Number(formData.get("price")),
      discountedPrice: Number(formData.get("discountedPrice")) || 0,
      deliveryCharge: Number(formData.get("deliveryCharge")) || 0,
      description: formData.get("description") || "",
      items: itemsArray,
      thumbnail: formData.get("thumbnail"),
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

    // Prepare FormData for server
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload.data));
    newFormData.append("file", validatedPayload.data.thumbnail);

    // Send request to server
    const res = await serverFetch.post("/product", { body: newFormData });
    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const updateProduct = async (
  productCode: string,
  _prevState: any,
  formData: FormData
) => {
  try {
    // Get items array correctly
    const itemsArray = formData.getAll("items[]").filter((item) => item !== "");

    const payload = {
      title: formData.get("title"),
      categoryId: formData.get("categoryId"),
      price: Number(formData.get("price")),
      discountedPrice: Number(formData.get("discountedPrice")) || 0,
      deliveryCharge: Number(formData.get("deliveryCharge")) || 0,
      description: formData.get("description") || "",
      items: itemsArray,
      thumbnail: formData.get("thumbnail") || undefined,
    };

    // For update, make thumbnail optional
    const UpdateProductSchema = ProductValidationZodSchema.extend({
      thumbnail: z.instanceof(File).optional().or(z.undefined()),
    });

    const validated = zodValidator(payload, UpdateProductSchema);
    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validated.errors,
        formData: payload,
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

    return { success: true, message: "Product updated successfully" };
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { CategoryValidationZodSchema } from "@/zod/product";
import { revalidateTag } from "next/cache";

export const createCategory = async (_prevState: any, formData: FormData) => {
  try {
    const payload = {
      name: formData.get("name"),
    };
    const validatedPayload = zodValidator(payload, CategoryValidationZodSchema);

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

    const res = await serverFetch.post("/category", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: validatedPayload?.data?.name }),
    });
    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    revalidateTag("categories-list", { expire: 0 });

    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const updateCategory = async (
  id: string,
  _prevState: any,
  formData: FormData
) => {
  try {
    const payload = {
      name: formData.get("name"),
    };
    const validatedPayload = zodValidator(payload, CategoryValidationZodSchema);

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

    const res = await serverFetch.patch(`/category/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: validatedPayload?.data?.name }),
    });
    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    revalidateTag("categories-list", { expire: 0 });

    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const getAllCategories = async (queryString: string) => {
  try {
    const res = await serverFetch.get(
      `/category${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: ["categories-list"],
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

export const deleteCategory = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/category/${id}`);
    const result = await res.json();
    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }
    revalidateTag("categories-list", { expire: 0 });
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

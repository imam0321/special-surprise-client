/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const createProduct = async (formData: FormData) => {
  try {
    const res = await serverFetch.post("/product", {
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
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

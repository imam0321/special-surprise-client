/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch"

export const getAllCategories = async (query?: Record<string, any>) => {
  try {
    let queryString = "";

    if (query) {
      queryString = new URLSearchParams(query as any).toString();
    }

    const res = await serverFetch.get(`/category${queryString ? `?${queryString}` : ""}`);
    const result = await res.json();
    return result;

  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message
    };
  }
};
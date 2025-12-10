/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch"

export const getAllProduct = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(`/product${queryString ? `?${queryString}` : ""}`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message
    };
  }
}
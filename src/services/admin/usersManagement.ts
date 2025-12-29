"use server";
import { serverFetch } from "@/lib/server-fetch";

export const getCustomers = async (queryString: string) => {
  try {
    const res = await serverFetch.get(
      `/user/customers${queryString ? `?${queryString}` : ""}`
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

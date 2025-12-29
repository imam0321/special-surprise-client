"use server";
import { serverFetch } from "@/lib/server-fetch";

export const getModerators = async (queryString: string) => {
  try {
    const res = await serverFetch.get(
      `/user/moderators${queryString ? `?${queryString}` : ""}`
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const softDeleteModerator = async (moderatorId: string) => {
  try {
    const res = await serverFetch.patch(`/user/soft-delete/${moderatorId}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

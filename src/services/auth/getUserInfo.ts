/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { SendResponse, UserInfo } from "@/types/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/lib/auth.utils";
import { zodValidator } from "@/lib/zodValidator";
import { updateProfileValidationZodSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";

export const getUserInfo = async (): Promise<UserInfo | any> => {
  let userInfo: UserInfo | any;
  try {
    const response = await serverFetch.get("/auth/me", {
      next: { tags: ["user-info"] },
    });

    const result: SendResponse<UserInfo> = await response.json();

    if (result.success) {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      userInfo = {
        email: verifiedToken.email as string,
        role: verifiedToken.role as UserRole,
      };
    }

    userInfo = {
      ...result.data,
    };

    return userInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProfile = async (_prevState: any, formData: FormData) => {
  try {
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: {
        country: formData.get("country"),
        city: formData.get("city"),
        address_detail: formData.get("address_detail"),
      },
      profile: formData.get("profile") || undefined,
    };

    const validatedPayload = zodValidator(
      payload,
      updateProfileValidationZodSchema
    );
    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedPayload.errors,
        formData: payload,
      };
    }

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload.data));

    const file = formData.get("profile") as File | null;
    if (file && file.size > 0) {
      newFormData.append("file", file);
    }

    const res = await serverFetch.patch("/user/update-my-profile", {
      body: newFormData,
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Profile update failed");
    }

    revalidateTag("user-info", { expire: 0 });

    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

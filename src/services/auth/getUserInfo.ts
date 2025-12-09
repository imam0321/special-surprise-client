/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { SendResponse, UserInfo } from "@/types/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken"
import { UserRole } from "@/lib/auth.utils";

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

      const verifiedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

      userInfo = {
        email: verifiedToken.email as string,
        role: verifiedToken.role as UserRole,
      }
    }

    userInfo = {
      ...result.data
    }

    return userInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

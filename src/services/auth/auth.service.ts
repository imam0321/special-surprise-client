/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { forgotPasswordSchema, resetPasswordSchema } from "@/zod/auth.validation";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import { parse } from "cookie";
import { verifyAccessToken, verifyResetPasswordToken } from "@/lib/jwt";


export const forgotPassword = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    const payload = {
      email: formData.get("email"),
    };

    const validatedPayload = zodValidator(payload, forgotPasswordSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
      return {
        success: validatedPayload.success,
        message: "Validation failed",
        formData: payload,
        errors: validatedPayload.errors,
      }
    }

    const backendPayload = {
      email: validatedPayload?.data?.email,
    };

    const res = await serverFetch.post("/auth/forgot-password", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload),
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Something went wrong!",
        formData: payload,
      };
    }

    return {
      success: true,
      message: "Reset link sent to your email!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to send reset link",
    };
  }
};

export const resetPassword = async (_prevState: any, formData: FormData): Promise<any> => {
  const id = formData.get("id") as string;
  const token = formData.get("token") as string;

  const validationPayload = {
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validatedPayload = zodValidator(validationPayload, resetPasswordSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!id || !token) {
    return { success: false, message: "Invalid reset link" };
  }

  const tokenVerification = await verifyResetPasswordToken(token);

  if (!tokenVerification.success) {
    return {
      success: false,
      message: tokenVerification.message || "Invalid or expired reset token",
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.post("/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        newPassword: validationPayload.newPassword,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Password reset failed",
        formData: validationPayload,
      };
    }

    return {
      success: true,
      message: "Password reset successfully! Redirecting to login...",
      redirectToLogin: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      formData: validationPayload,
    };
  }
};

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    //Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      }
    }

    // Case 2 : Access Token exist- and need to verify
    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        }
      }
    }

    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      }
    }

    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const response = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json();


    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie['accessToken']) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie['refreshToken']) {
          refreshTokenObject = parsedCookie;
        }
      })
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await deleteCookie("accessToken");
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject['SameSite'] || "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject['SameSite'] || "none",
    });

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }


    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully"
    };


  } catch (error: any) {
    return {
      tokenRefreshed: false,
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
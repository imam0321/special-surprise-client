/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { loginUser } from "./loginUser";
import { zodValidator } from "@/lib/zodValidator";
import { registerCustomerValidationZodSchema } from "@/zod/auth.validation";

export const registerCustomer = async (_currentState: any, formData: FormData): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
      phone: formData.get("phone"),
      address: {
        country: formData.get("country"),
        city: formData.get("city"),
        address_detail: formData.get("address_detail"),
      },
    };

    const validatedPayload = zodValidator(payload, registerCustomerValidationZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
      return {
        success: validatedPayload.success,
        message: "Validation failed",
        formData: payload,
        errors: validatedPayload.errors,
      }
    }

    if (!validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        formData: payload,
      }
    }

    const backendPayload = {
      name: validatedPayload.data.name,
      email: validatedPayload.data.email,
      password: validatedPayload.data.password,
      phone: validatedPayload.data.phone,
      address: {
        country: validatedPayload.data.address.country,
        city: validatedPayload.data.address.city,
        address_detail: validatedPayload.data.address.address_detail,
      }
    }

    const res = await serverFetch.post("/user/register-customer", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload)
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Registration failed. Please try again.",
      };
    }

    await loginUser(_currentState, formData);

    return {
      success: true,
      message: "Registration successful!",
    };

  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    return {
      success: false,
      message: error.message || "Registration failed. Please try again."
    }
  }
};
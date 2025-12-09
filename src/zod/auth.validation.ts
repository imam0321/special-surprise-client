import { z } from "zod";

export const loginValidationZodSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, { message: "Password is required" })
});


export const registerCustomerValidationZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be 8 characters"),

  confirm_password: z
    .string()
    .min(8, "Confirm password must be 8 characters"),

  phone: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits"),

  address: z.object({
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    address_detail: z.string().min(2, "Address detail is required"),
  }),
})
  .refine(
    (data) => data.password === data.confirm_password,
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

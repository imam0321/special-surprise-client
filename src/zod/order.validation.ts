import z from "zod";

export const OrderValidationZodSchema = z.object({
  receiverName: z.string().min(2, "Receiver name is required"),
  receiverPhone: z
    .string()
    .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  productId: z.string().uuid("Invalid product ID"),
  deliveryDate: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Date is required"),
  deliveryTime: z
    .string()
    .regex(/^(1[0-2]|0?[1-9])\.\d{2}\s(AM|PM)$/i, "Time is required"),
  orderAddress: z.object({
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    address_detail: z.string().min(5, "Address must be at least 5 characters"),
  }),
  amount: z.number().positive("Amount must be greater than 0"),
});
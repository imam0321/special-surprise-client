import z from "zod";

export const CategoryValidationZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters long" }),
});

export const ProductValidationZodSchema = z.object({
  title: z.string().min(2, { message: "Product title required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  price: z
    .string()
    .min(1, { message: "Price is required" }),
  discountedPrice: z
    .string()
    .optional(),
  deliveryCharge: z
    .string()
    .optional(),
  description: z.string().optional(),
  items: z
    .string()
    .min(1, { message: "At least one item is required" })
    .transform((val) => val.split("||").filter((item) => item.trim() !== ""))
    .refine((items) => items.length > 0, {
      message: "At least one item is required",
    }),
});

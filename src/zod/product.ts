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
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid number greater than or equal to 0",
    })
    .transform((val) => Number(val)),
  discountedPrice: z
    .string()
    .optional()
    .transform((val) => (val && val.trim() !== "" ? Number(val) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message:
        "Discounted price must be a valid number greater than or equal to 0",
    }),
  deliveryCharge: z
    .string()
    .optional()
    .transform((val) => (val && val.trim() !== "" ? Number(val) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message:
        "Delivery charge must be a valid number greater than or equal to 0",
    }),
  description: z.string().optional(),
  items: z
    .string()
    .min(1, { message: "At least one item is required" })
    .transform((val) => val.split("||").filter((item) => item.trim() !== ""))
    .refine((items) => items.length > 0, {
      message: "At least one item is required",
    }),
});

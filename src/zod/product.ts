import z from "zod";

export const CategoryValidationZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters long" }),
});

export const ProductValidationZodSchema = z.object({
  title: z.string().min(2, { message: "Product title required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(1, "Price is required"),
  discountedPrice: z.number().min(0).optional(),
  deliveryCharge: z.number().min(0).optional(),
  description: z.string().optional(),
  items: z.array(z.string()).min(1, "At least one item is required"),
  thumbnail: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Product thumbnail is required",
  }),
});

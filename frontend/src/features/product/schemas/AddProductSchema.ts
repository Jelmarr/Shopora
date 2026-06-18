import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const createProductSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required.")
      .max(255, "Product name cannot exceed 255 characters."),

    categoryId: z.string().min(1, "Category is required."),

    description: z
      .string()
      .min(1, "Description is required.")
      .max(2000, "Description cannot exceed 2000 characters."),

    price: z.coerce.number().gt(0, "Price must be greater than 0."),

    compareAtPrice: z.preprocess(
      (val) => (val === "" ? null : val),
      z.coerce
        .number()
        .gt(0, "Compare at price must be greater than 0.")
        .nullable()
        .optional(),
    ),

    costPrice: z.coerce
      .number()
      .gte(0, "Cost price cannot be negative.")
      .optional()
      .nullable(),

    sku: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().max(100, "SKU cannot exceed 100 characters.").optional(),
    ),

    stock: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.coerce
        .number()
        .int("Stock must be an integer.")
        .gte(0, "Stock cannot be negative.")
        .optional(),
    ),

    lowStockThreshold: z.coerce
      .number()
      .int("Threshold must be an integer.")
      .gte(0, "Low stock threshold cannot be negative."),

    isFeatured: z.boolean().default(false),
    hasVariants: z.boolean().default(false),

    status: z.string().min(1, "Invalid product status."),

    images:
      typeof window === "undefined"
        ? z.array(z.any())
        : z
            .custom<FileList>(
              (val) => val instanceof FileList || Array.isArray(val),
              "Invalid image input",
            )
            .transform((val) =>
              val instanceof FileList ? Array.from(val) : val,
            )
            .refine(
              (files) => files.length > 0,
              "At least one product image is required.",
            )
            .refine(
              (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
              "One or more images exceed the 5MB size limit.",
            )
            .refine(
              (files) =>
                files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
              "Images must be a JPG, PNG, or WEBP format.",
            ),
  })
  .superRefine((data, ctx) => {
    if (data.hasVariants === false) {
      // Enforce SKU requirement
      if (!data.sku || data.sku.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "SKU is required.",
          path: ["sku"],
        });
      }

      // Enforce Stock requirement
      if (data.stock === undefined || data.stock === null) {
        ctx.addIssue({
          code: "custom",
          message: "Stock quantity is required.",
          path: ["stock"],
        });
      }
    }
  })
  // Cross-property validation (.When check mapping)
  .refine(
    (data) => {
      // If compareAtPrice doesn't exist, pass validation
      if (data.compareAtPrice === undefined || data.compareAtPrice === null)
        return true;
      // Enforce: compareAtPrice > price
      return data.compareAtPrice > data.price;
    },
    {
      message: "Compare at price must be greater than the selling price.",
      path: ["compareAtPrice"],
    },
  );

export type CreateProductFormInput = z.input<typeof createProductSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;

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
      .gte(0, "Low stock threshold cannot be negative.")
      .optional(),

    isFeatured: z.boolean().default(false),
    isTrackInventory: z.boolean().default(false),

    variantOptions: z
      .array(
        z.object({
          name: z.string().trim().min(1, "Option name is required"),
          values: z.array(
            z.object({
              value: z.string().trim().min(1, "Value cannot be empty"),
            }),
          ),
        }),
      )
      .default([{ name: "", values: [] }]),

    variants: z
      .array(
        z.object({
          combination: z.record(z.string(), z.string()), // e.g. {"Color": "Red", "Size": "Medium"}
          sku: z.string().optional().default(""),
          price: z.number().min(0, "Price must be positive").default(0),
          available: z
            .number()
            .int()
            .min(0, "Stock must be positive")
            .default(0),
        }),
      )
      .default([]),

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
              (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
              "One or more images exceed the 5MB size limit.",
            )
            .refine(
              (files) =>
                files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
              "Images must be a JPG, PNG, or WEBP format.",
            ),

    existingImages: z.array(z.string()).default([]),
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
  )
  .refine(
    (data) => {
      const hasExisting = data.existingImages && data.existingImages.length > 0;
      const hasNew = Array.isArray(data.images) && data.images.length > 0;
      return hasExisting || hasNew;
    },
    {
      message: "At least one product image is required.",
      path: ["images"],
    },
  );

export type CreateProductFormInput = z.input<typeof createProductSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;

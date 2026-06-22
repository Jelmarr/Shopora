import z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required.")
    .max(255, "Category name cannot exceed 255 characters."),

  parentCategoryId: z.uuid().nullable().optional(),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

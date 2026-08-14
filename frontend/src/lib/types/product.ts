export type TProduct = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  status: ProductStatus;
  isTrackInventory: boolean;
  isFeatured: boolean;
  price: number;
  comparePrice?: number;
  sku?: string;
  stock?: number;
  images: string[];
  primaryImageUrl: string;
  variantOptions: VariantOption[];
  variants: TProductVariant[];
  createdAt: string;
};

export type ProductStatus = "Active" | "Archived" | "Draft";

export type TProductVariant = {
  id: string;
  combination: { name: string; value: string }[];
  sku: string;
  price: number;
  available: number;
};

export type VariantForm = Omit<TProductVariant, "combination"> & {
  combination: Record<string, string>;
};

export type VariantOption = {
  name: string;
  values: string[];
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  status: ProductStatus;
  isTrackInventory: boolean;
  price: number;
  sku?: string;
  stock?: number;
  image: string;
};

export type ProductStatus = "Active" | "Archived" | "Draft";

import { TCategory } from "./category";
import { TProduct } from "./product";

export interface StoreSlugResponse {
  id: string;
  slug: string;
  name: string;
}

export type LatestProductResponse = Pick<
  TProduct,
  | "id"
  | "name"
  | "primaryImageUrl"
  | "description"
  | "price"
  | "comparePrice"
  | "stock"
>;

export interface WhatsNewProps {
  newProducts: Omit<LatestProductResponse, "description">[];
}

export interface HeroSliderProps {
  products: Omit<LatestProductResponse, "price" | "comparePrice" | "stock">[];
  autoPlayMs?: number;
}

export interface CategorySliderProps {
  categories: Pick<TCategory, "id" | "name">[];
  activeCategoryId?: string;
  onSelect?: (categoryId: string) => void;
}

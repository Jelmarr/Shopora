import { TCategory } from "./category";
import { TProduct } from "./product";

export interface StoreSlugResponse {
  id: string;
  slug: string;
  name: string;
}

export type HeroProps = Pick<
  TProduct,
  | "id"
  | "name"
  | "primaryImageUrl"
  | "description"
  | "price"
  | "comparePrice"
  | "stock"
>;

export interface HeroSliderProps {
  storeId: string;
  autoPlayMs?: number;
}

export interface CategorySliderProps {
  storeId: string;
  activeCategoryId?: string;
  onSelect?: (categoryId: string) => void;
}

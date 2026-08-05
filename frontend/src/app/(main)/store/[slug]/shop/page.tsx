import Shop from "@/src/features/store/components/shop-page/Shop";
import { storeApiFetch } from "@/src/lib/store-api";
import { StoreSlugResponse } from "@/src/lib/types/store-front";

export type TSortBy =
  | "featured"
  | "best-selling"
  | "a-z"
  | "z-a"
  | "low-high"
  | "high-low"
  | "old-new"
  | "new-old";

export type TSearchAndFilter = {
  sortBy: TSortBy;
  categories: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  page: string;
  store: StoreSlugResponse;
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Omit<TSearchAndFilter, "store" | "slug">>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params;

  const {
    search = "",
    categories = "",
    sortBy = "featured",
    minPrice = "",
    maxPrice = "",
    page = 1,
  } = await searchParams;

  const store = await storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`);

  return (
    <Shop
      store={store}
      slug={slug}
      search={search}
      categories={categories}
      minPrice={minPrice}
      maxPrice={maxPrice}
      sortBy={sortBy}
      page={Number(page)}
    />
  );
};

export default page;

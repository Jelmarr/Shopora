"use client";

import TablePagination from "@/src/components/Pagination";
import ProductGrid, {
  ProductCardProps,
} from "@/src/features/store/components/shop-page/ProductGrid";
import SearchAndFilter from "@/src/features/store/components/shop-page/SearchAndFilter";
import ShopBanner from "@/src/features/store/components/shop-page/ShopBanner";
import { useUpdateParam } from "@/src/hooks/useUpdateParam";
import { storeApiFetch } from "@/src/lib/store-api";
import { TPagination } from "@/src/lib/types/pagination";
import { StoreSlugResponse } from "@/src/lib/types/store-front";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface ShopProps {
  store: StoreSlugResponse;
  slug: string;
}

export type TSortBy =
  | "featured"
  | "best-selling"
  | "a-z"
  | "z-a"
  | "low-high"
  | "high-low"
  | "old-new"
  | "new-old";

type ShopResponse = TPagination & {
  products: ProductCardProps[];
};

const Shop = ({ store, slug }: ShopProps) => {
  const { handlePageChange } = useUpdateParam();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const categories = searchParams.get("categories") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sortBy = (searchParams.get("sortBy") as TSortBy) || "featured";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isFetching, isError } = useQuery<ShopResponse>({
    queryKey: [
      "products",
      store.id,
      search,
      categories,
      minPrice,
      maxPrice,
      sortBy,
      page,
    ],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (sortBy) params.append("sortBy", sortBy);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (page) params.append("page", page.toString());

      if (categories) {
        categories
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
          .forEach((cat) => params.append("categories", cat));
      }

      return storeApiFetch<ShopResponse>(
        `/api/store/products/${store.id}?${params.toString()}`,
        { signal },
      );
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const products = isError ? [] : (data?.products ?? []);
  const currentPage = data?.currentPage ?? 1;
  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;

  return (
    <main>
      <ShopBanner slug={slug} />
      <div className="py-10 mx max-w-360 mx-auto px-8 2xl:px-0">
        <SearchAndFilter store={store} />
        <div
          className={`transition-opacity duration-200 ${
            isFetching && !isLoading
              ? "opacity-50 pointer-events-none"
              : "opacity-100"
          }`}
        >
          {products.length === 0 && !isLoading ? (
            <div className="py-20 text-center text-neutral-500">
              No products found matching your filter.
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>

        <div className="flex items-center justify-between mt-12">
          <TablePagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalCount={totalCount}
            itemLabel="products"
            totalPages={totalPages}
          />
        </div>
      </div>
    </main>
  );
};

export default Shop;

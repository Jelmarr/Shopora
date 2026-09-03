"use client";

import TablePagination from "@/components/Pagination";
import ProductGrid, {
  ProductCardProps,
} from "@/features/store/components/shop-page/ProductGrid";
import SearchAndFilter from "@/features/store/components/shop-page/SearchAndFilter";
import ShopBanner from "@/features/store/components/shop-page/ShopBanner";
import { useUpdateParam } from "@/hooks/useUpdateParam";
import { storeApiFetch } from "@/lib/store-api";
import { TPagination } from "@/lib/types/pagination";
import { StoreSlugResponse } from "@/lib/types/store-front";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface ShopProps {
  store: StoreSlugResponse;
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

const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="aspect-square w-full rounded-md bg-gray-200" />
        <div className="h-3 w-1/3 rounded bg-gray-200 mt-3" />
        <div className="h-4 w-2/3 rounded bg-gray-200 mt-2" />
        <div className="h-4 w-1/4 rounded bg-gray-200 mt-2" />
      </div>
    ))}
  </div>
);

const Shop = ({ store }: ShopProps) => {
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
      "shopProducts",
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

      return await storeApiFetch<ShopResponse>(
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
      <ShopBanner />
      <div className="py-10 mx max-w-360 mx-auto px-8 2xl:px-0">
        <SearchAndFilter store={store} />

        {isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <div
            className={`transition-opacity duration-200 ${
              isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
            }`}
          >
            {products.length === 0 ? (
              <div className="py-20 text-center text-neutral-500">
                {isError
                  ? "Something went wrong loading products."
                  : "No products found matching your filter."}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        )}

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

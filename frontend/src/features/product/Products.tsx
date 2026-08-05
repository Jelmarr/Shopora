"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import SearchBar from "@/src/components/SearchBar";
import { Separator } from "@/src/components/ui/separator";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api-client";
import { TPagination } from "@/src/lib/types/pagination";
import { TProduct } from "@/src/lib/types/product";
import SelectCategory from "./components/products/SelectCategory";
import ProductsTable from "./components/products/ProductsTable";
import SelectStatus from "./components/products/SelectStatus";
import { Tag } from "lucide-react";
import { useUpdateParam } from "@/src/hooks/useUpdateParam";
import TablePagination from "@/src/components/Pagination";
import TableSkeleton from "@/src/components/skeletons/TableSkeleton";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export type ProductResponse = TPagination & {
  products: TProduct[];
};

const Products = ({
  search,
  category,
  status,
  sortBy,
  sortOrder,
  page,
}: {
  search: string;
  category: string;
  status: string;
  sortBy: string;
  sortOrder: "desc" | "asc";
  page: number;
}) => {
  const { handlePageChange } = useUpdateParam();

  const { data, isLoading, isError } = useQuery<ProductResponse>({
    queryKey: ["products", search, category, status, sortBy, sortOrder, page],
    queryFn: () => {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(search && { search }),
        ...(category && { category }),
        ...(status && { status }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
      });

      return apiFetch<ProductResponse>(`/api/products?${params.toString()}`);
    },

    placeholderData: keepPreviousData,
  });

  const {
    products = [],
    currentPage = 1,
    totalPages = 1,
    totalCount = 0,
  } = data || {};

  if (isError) return <div>Error loading products.</div>;

  return (
    <div className="px-6 py-8">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Tag size={15} /> Products
          </h3>
        </div>
        <Link href="/store/add-product">
          <Button>Add product</Button>
        </Link>
      </header>
      <main>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Card>
            <CardHeader className="pb-4">
              <div className="flex gap-2">
                <SearchBar placeholder="Search products..." />
                <SelectStatus />
                <SelectCategory />
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="px-6">
              <ProductsTable products={products} />
            </CardContent>
            <CardFooter className="bg-white flex flex-col items-center justify-between gap-3 h-24 sm:flex-row">
              <TablePagination
                itemLabel="products"
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                onPageChange={handlePageChange}
              />
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Products;

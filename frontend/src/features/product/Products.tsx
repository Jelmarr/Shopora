"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import SearchBar from "@/src/components/SearchBar";
import { Separator } from "@/src/components/ui/separator";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api-client";
import { TPagination } from "@/src/lib/types/pagination";
import { TProduct } from "@/src/lib/types/product";

import SelectCategory from "./components/products/SelectCategory";
import ProductsTable from "./components/products/ProductsTable";

type ProductResponse = TPagination & {
  products: TProduct[];
};

const Products = ({
  search,
  category,
}: {
  search: string;
  category: string;
}) => {
  const { data, isLoading, isError } = useQuery<ProductResponse>({
    queryKey: ["products", search, category],
    queryFn: () => {
      const params = new URLSearchParams({
        ...(search && { search }),
        ...(category && { category }),
      });

      return apiFetch<ProductResponse>(`/api/products?${params.toString()}`);
    },

    placeholderData: keepPreviousData,
  });

  const { products = [] } = data || {};

  if (isError) return <div>Error loading products.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">Products</CardTitle>
            <CardDescription>{products.length} products total</CardDescription>
          </div>
          <SearchBar placeholder="Search products..." />
          <SelectCategory />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="px-6">
        <ProductsTable products={products} />
      </CardContent>
    </Card>
  );
};

export default Products;

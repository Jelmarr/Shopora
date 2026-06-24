"use client";

import { FolderTree, Package, CircleCheck } from "lucide-react";
import AddCategoryModal from "@/src/features/category/components/AddCategoryModal";
import DataCards from "@/src/features/category/components/DataCards";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api-client";
import { SortByCategory, TCategory } from "@/src/lib/types/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TPagination } from "@/src/lib/types/pagination";
import CategorySkeleton from "./components/CategorySkeleton";
import { Card, CardFooter } from "@/src/components/ui/card";
import TablePagination from "@/src/app/components/Pagination";
import TableCard from "./components/TableCard";

export type ParentLookup = { name: string; id: string };

type CategoryResponse = TPagination & {
  categories: TCategory[];
  activeCategories: number;
  productsCategorized: number;
  parentLookups: ParentLookup[];
};

const Category = ({
  page,
  search,
  sortBy,
  sortOrder,
}: {
  page: number;
  search?: string;
  sortBy?: SortByCategory | "";
  sortOrder?: "desc" | "asc" | "";
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isError, error, isLoading } = useQuery<CategoryResponse>({
    queryKey: ["categories", page, search, sortBy, sortOrder],
    queryFn: () => {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(search && { search }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
      });

      return apiFetch<CategoryResponse>(`/api/categories?${params.toString()}`);
    },

    placeholderData: keepPreviousData,
  });

  if (isError) return <div>Error loading data: {error.message}</div>;

  if (isLoading || !data) return <CategorySkeleton />;

  const {
    categories,
    totalPages,
    totalCount,
    activeCategories,
    currentPage,
    productsCategorized,
    parentLookups,
  } = data || {};

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="px-6 py-8">
      {/* ── Header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Organize your products into categories and subcategories.
          </p>
        </div>

        {/* ── Add Category Dialog ── */}
        <AddCategoryModal parentLookups={parentLookups ?? []} />
      </div>

      {/* ── Stats strip ── */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DataCards
          value={totalCount}
          title="Total categories"
          Icon={FolderTree}
        />
        <DataCards
          value={productsCategorized}
          title="Products categorized"
          Icon={Package}
        />
        <DataCards
          value={activeCategories}
          title="Active categories"
          Icon={CircleCheck}
        />
      </div>

      {/* ── Table card ── */}
      <Card>
        <TableCard
          categories={categories}
          parentLookups={parentLookups}
          totalCount={totalCount}
        />
        <CardFooter className="bg-white flex flex-col items-center justify-between gap-3 h-24 sm:flex-row">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Category;

"use client";

import { FolderTree, Package, CircleCheck } from "lucide-react";
import AddCategoryModal from "@/src/features/category/components/AddCategoryModal";
import DataCards from "@/src/features/category/components/DataCards";
import TableCard from "@/src/features/category/components/TableCard";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api-client";
import { TCategory } from "@/src/lib/types/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TPagination } from "@/src/lib/types/pagination";

type CategoryResponse = TPagination & {
  categories: TCategory[];
  activeCategories: number;
  productsCategorized: number;
};

const Category = ({ page, search }: { page: number; search?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading, isError, error } = useQuery<CategoryResponse>({
    queryKey: ["categories", page, search],
    queryFn: () => {
      const searchArg = search ? `&search=${encodeURIComponent(search)}` : "";

      return apiFetch<CategoryResponse>(
        `/api/categories?page=${page}${searchArg}`,
      );
    },
  });

  if (isLoading) return <div>Loading layout categories...</div>;
  if (isError) return <div>Error loading data: {error.message}</div>;

  const {
    categories,
    totalPages,
    totalCount,
    activeCategories,
    currentPage,
    productsCategorized,
  } = data || {};

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (keyword) {
      params.set("search", keyword);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
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
        <AddCategoryModal categories={categories ?? []} />
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
      <TableCard
        categories={categories ?? []}
        currentPage={currentPage ?? 0}
        totalPages={totalPages ?? 0}
        totalCount={totalCount ?? 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Category;

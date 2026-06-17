"use client";

import { FolderTree, Package, CircleCheck } from "lucide-react";
import AddCategoryModal from "@/src/features/category/components/AddCategoryModal";
import DataCards from "@/src/features/category/components/DataCards";
import TableCard from "@/src/features/category/components/TableCard";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api-client";

type CategoryStatus = "Active" | "Inactive";

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentCategoryName: null | string;
  parentCategoryId: null | string;
  status: CategoryStatus;
  productCount: number;
}

const Category = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => apiFetch<Category[]>("/api/categories"),
  });

  if (isLoading) return <div>Loading layout categories...</div>;
  if (isError) return <div>Error loading data: {error.message}</div>;

  const activeCategories = categories?.map((cat) => cat.status === "Active");
  const productCategorized = categories?.reduce(
    (total, cat) => total + (cat.productCount ?? 0),
    0,
  );

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
          value={categories?.length ?? 0}
          title="Total categories"
          Icon={FolderTree}
        />
        <DataCards
          value={productCategorized}
          title="Products categorized"
          Icon={Package}
        />
        <DataCards
          value={activeCategories?.length ?? 0}
          title="Active categories"
          Icon={CircleCheck}
        />
      </div>

      {/* ── Table card ── */}
      <TableCard categories={categories ?? []} />
    </div>
  );
};

export default Category;

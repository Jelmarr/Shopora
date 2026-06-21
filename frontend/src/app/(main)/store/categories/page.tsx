import Category from "@/src/features/category/Category";
import CategorySkeleton from "@/src/features/category/components/CategorySkeleton";
import { SortByCategory } from "@/src/lib/types/category";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: SortByCategory;
    sortOrder?: "desc" | "asc";
  }>;
}) => {
  const params = await searchParams;

  const pageNumber = Number(params.page) || 1;
  const searchString = params.search || "";
  const sortByString = params.sortBy || "";
  const sortOrderString = params.sortOrder || "";

  return (
    <Suspense fallback={<CategorySkeleton />}>
      <Category
        page={pageNumber}
        search={searchString}
        sortBy={sortByString}
        sortOrder={sortOrderString}
      />
    </Suspense>
  );
};

export default page;

import Products from "@/src/features/product/Products";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    search: string;
    category: string;
    status: string;
    sortBy: "name" | "stock";
    sortOrder: "desc" | "asc";
  }>;
}) => {
  const params = await searchParams;

  const pageNumber = Number(params.page) || 1;
  const searchString = params.search || "";
  const categoryString = params.category || "";
  const statusString = params.status || "";
  const sortByString = params.sortBy || "";
  const sortOrderString = params.sortOrder || "";

  return (
    <Products
      search={searchString}
      category={categoryString}
      status={statusString}
      sortBy={sortByString}
      page={pageNumber}
      sortOrder={sortOrderString}
    />
  );
};

export default page;

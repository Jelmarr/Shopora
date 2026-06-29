import Products from "@/src/features/product/Products";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    category: string;
    sortBy: "name" | "stock";
    sortOrder: "desc" | "asc";
  }>;
}) => {
  const params = await searchParams;

  const searchString = params.search || "";
  const categoryString = params.category || "";

  return <Products search={searchString} category={categoryString} />;
};

export default page;

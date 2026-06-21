import Category from "@/src/features/category/Category";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}) => {
  const params = await searchParams;

  const pageNumber = Number(params.page) || 1;
  const searchString = params.search || "";

  return <Category page={pageNumber} search={searchString} />;
};

export default page;

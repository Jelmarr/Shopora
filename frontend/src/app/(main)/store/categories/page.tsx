import Category from "@/src/features/category/Category";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
  }>;
}) => {
  const params = await searchParams;

  const pageNumber = Number(params.page);

  return <Category page={pageNumber} />;
};

export default page;

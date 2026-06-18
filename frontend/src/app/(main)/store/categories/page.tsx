import Category from "@/src/features/category/Category";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    pageSize: string;
  }>;
}) => {
  const params = await searchParams;

  const page = Number(params.page);
  const pageSize = Number(params.pageSize);

  return <Category />;
};

export default page;

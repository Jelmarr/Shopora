import Shop from "@/features/store/components/shop-page/Shop";
import { storeApiFetch } from "@/lib/store-api";
import { StoreSlugResponse } from "@/lib/types/store-front";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const store = await storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`);

  return <Shop store={store} />;
};

export default page;

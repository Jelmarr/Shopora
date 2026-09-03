import ProductDetails from "@/features/store/components/product-details/ProductDetails";
import { storeApiFetch } from "@/lib/store-api";
import { StoreSlugResponse } from "@/lib/types/store-front";

const page = async ({
  params,
}: {
  params: Promise<{ productId: string; slug: string }>;
}) => {
  const { productId, slug } = await params;

  const store = await storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`);

  return (
    <main className="py-10 mx max-w-360 mx-auto px-8 2xl:px-0">
      <ProductDetails productId={productId} storeId={store.id} />
    </main>
  );
};

export default page;

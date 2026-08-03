import TablePagination from "@/src/components/Pagination";
import ProductGrid from "@/src/features/store/components/shop-page/ProductGrid";
import SearchAndFilter from "@/src/features/store/components/shop-page/SearchAndFilter";
import ShopBanner from "@/src/features/store/components/shop-page/ShopBanner";
import { storeApiFetch } from "@/src/lib/store-api";
import { StoreSlugResponse } from "@/src/lib/types/store-front";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const store = await storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`);

  return (
    <main>
      <ShopBanner slug={slug} />
      <div className="py-10 mx max-w-360 mx-auto px-8 2xl:px-0">
        <SearchAndFilter />

        <ProductGrid storeId={store.id} />
        <div className="flex items-center justify-between mt-12">
          <TablePagination
            currentPage={1}
            totalCount={50}
            itemLabel="products"
            totalPages={5}
          />
        </div>
      </div>
    </main>
  );
};

export default page;

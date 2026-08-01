import TablePagination from "@/src/components/Pagination";
import ProductGrid from "@/src/features/store/components/shop-page/ProductGrid";
import SearchAndFilter from "@/src/features/store/components/shop-page/SearchAndFilter";
import ShopBanner from "@/src/features/store/components/shop-page/ShopBanner";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <main>
      <ShopBanner slug={slug} />
      <div className="py-10 mx max-w-360 mx-auto">
        <SearchAndFilter />

        <ProductGrid />
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

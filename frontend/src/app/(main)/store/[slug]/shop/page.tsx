import SearchAndFilter from "@/src/features/store/components/shop-page/SearchAndFilter";
import ShopBanner from "@/src/features/store/components/shop-page/ShopBanner";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <main>
      <ShopBanner slug={slug} />
      <div className="py-10 mx max-w-360 mx-auto">
        <SearchAndFilter />
      </div>
    </main>
  );
};

export default page;

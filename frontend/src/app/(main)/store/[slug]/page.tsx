import CategorySlider from "@/src/features/store/components/CategorySlider";
import Hero from "@/src/features/store/components/Hero";
import NavHeader from "@/src/features/store/components/NavHeader";
import PromoBanner from "@/src/features/store/components/PromoBanner";
import WhatsNew from "@/src/features/store/components/WhatsNew";
import { storeApiFetch } from "@/src/lib/store-api";
import { TCategory } from "@/src/lib/types/category";
import {
  LatestProductResponse,
  StoreSlugResponse,
} from "@/src/lib/types/store-front";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const store = await storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`);
  const latestProducts = await storeApiFetch<LatestProductResponse[]>(
    `/api/store/latestProducts/${store.id}`,
  );
  const categories = await storeApiFetch<TCategory[]>(
    `/api/store/categories/${store.id}`,
  );

  return (
    <main>
      <NavHeader logo={store.name} />
      <Hero
        products={latestProducts.map((p) => ({
          id: p.id,
          primaryImageUrl: p.primaryImageUrl,
          name: p.name,
          description: p.description,
        }))}
      />
      <div className="p-4 max-w-360 mx-auto my-0">
        <CategorySlider
          categories={categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
          }))}
        />
        <WhatsNew newProducts={latestProducts} />
      </div>
      <PromoBanner />
    </main>
  );
};

export default page;

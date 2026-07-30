import FeaturedProducts from "@/src/features/store/components/home-page/FeaturedProducts";
import Hero from "@/src/features/store/components/home-page/Hero";
import PromoBanner from "@/src/features/store/components/home-page/PromoBanner";
import Testimonials from "@/src/features/store/components/home-page/Testimonials";
import WhatsNew from "@/src/features/store/components/home-page/WhatsNew";
import { storeApiFetch } from "@/src/lib/store-api";
import { TCategory } from "@/src/lib/types/category";
import {
  LatestProductResponse,
  StoreSlugResponse,
} from "@/src/lib/types/store-front";
import CategorySlider from "@/src/features/store/components/home-page/CategorySlider";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const store = await storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`);

  const [latestProducts, categories, featuredProducts] = await Promise.all([
    storeApiFetch<LatestProductResponse[]>(
      `/api/store/latestProducts/${store.id}`,
    ),
    storeApiFetch<TCategory[]>(`/api/store/categories/${store.id}`),
    storeApiFetch<LatestProductResponse[]>(
      `/api/store/featuredProducts/${store.id}`,
    ),
  ]);

  return (
    <main>
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
      <FeaturedProducts featuredProducts={featuredProducts} />
      <Testimonials />
    </main>
  );
};

export default page;

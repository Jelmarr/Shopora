import FeaturedProducts from "@/src/features/store/components/home-page/FeaturedProducts";
import Hero from "@/src/features/store/components/home-page/Hero";
import PromoBanner from "@/src/features/store/components/home-page/PromoBanner";
import Testimonials from "@/src/features/store/components/home-page/Testimonials";
import WhatsNew from "@/src/features/store/components/home-page/WhatsNew";
import { storeApiFetch } from "@/src/lib/store-api";
import { StoreSlugResponse } from "@/src/lib/types/store-front";
import CategorySlider from "@/src/features/store/components/home-page/CategorySlider";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const store = await storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`);

  return (
    <main>
      <Hero storeId={store.id} />
      <div className="p-4 max-w-360 mx-auto my-0">
        <CategorySlider storeId={store.id} />
        <WhatsNew storeId={store.id} />
      </div>
      <PromoBanner />
      <FeaturedProducts storeId={store.id} />
      <Testimonials />
    </main>
  );
};

export default page;

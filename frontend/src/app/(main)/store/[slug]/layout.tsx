import CartDrawer from "@/features/store/components/CartDrawer";
import Footer from "@/features/store/components/Footer";
import NavHeader from "@/features/store/components/NavHeader";
import { storeApiFetch } from "@/lib/store-api";
import { StoreSlugResponse } from "@/lib/types/store-front";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const store = await storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`);

  return (
    <div>
      <NavHeader storeName={store.name} slug={slug} />
      {children}
      <Footer storeName={store.name} />

      <CartDrawer />
    </div>
  );
}

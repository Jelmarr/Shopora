import Footer from "@/src/features/store/components/Footer";
import NavHeader from "@/src/features/store/components/NavHeader";
import { storeApiFetch } from "@/src/lib/store-api";
import { StoreSlugResponse } from "@/src/lib/types/store-front";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavHeader storeName={store.name} />
        {children}
        <Footer storeName={store.name} />
      </body>
    </html>
  );
}

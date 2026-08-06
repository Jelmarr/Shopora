"use client";

import { useQuery } from "@tanstack/react-query";
import ProductGrid, { ProductCardProps } from "../shop-page/ProductGrid";
import { storeApiFetch } from "@/src/lib/store-api";

type TRelatedProduct = ProductCardProps & {
  categoryId: string;
};

interface RelatedProductsProps {
  currentProductId: string;
  categoryId: string;
  storeId: string;
}

const RelatedProducts = ({
  currentProductId,
  categoryId,
  storeId,
}: RelatedProductsProps) => {
  const { data: products = [], isLoading } = useQuery<TRelatedProduct[]>({
    queryKey: ["related-products", storeId, currentProductId, categoryId],
    queryFn: () =>
      storeApiFetch<TRelatedProduct[]>(
        `/api/store/products/related/${storeId}?productId=${currentProductId}&categoryId=${categoryId}`,
      ),
    enabled: Boolean(storeId && currentProductId && categoryId),
  });

  if (!isLoading && products.length === 0) return null;

  const isSameCategory = products.some((p) => p.categoryId === categoryId);

  return (
    <section className="mt-20 border-t border-stone-200 pt-12">
      <h2 className="text-2xl font-bold text-neutral-900 mb-8">
        {isSameCategory ? "Related Products" : "More From This Store"}
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-stone-200 rounded-lg" />
          ))}
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
};

export default RelatedProducts;

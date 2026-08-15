import { useQuery } from "@tanstack/react-query";
import { storeApiFetch } from "../lib/store-api";
import { useParams } from "next/navigation";
import { StoreSlugResponse } from "../lib/types/store-front";

interface CheckoutLineItem {
  productId: string;
  productVariantId?: string | undefined;
  name: string;
  quantity: number;
  price: number;
}

export const useCheckout = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: store } = useQuery({
    queryKey: ["store", slug],
    queryFn: () => storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`),
    enabled: Boolean(slug),
  });

  const startCheckout = async (items: CheckoutLineItem[]) => {
    if (items.length === 0) {
      throw new Error("No item to check out.");
    }

    if (!store?.id) {
      throw new Error("Store not loaded yet.");
    }

    const { url } = await storeApiFetch<{ url: string }>(
      "/api/checkout/session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeId: store.id,
          items,
          storeUrl: `${window.location.origin}/store/${slug}`,
        }),
      },
    );

    window.location.href = url;
  };

  return { startCheckout, isStoreReady: Boolean(store?.id) };
};

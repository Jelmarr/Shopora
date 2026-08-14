"use client";

import { useCartStore } from "@/src/lib/store/cart-store";
import { storeApiFetch } from "@/src/lib/store-api";
import { LockKeyhole } from "lucide-react";
import { StoreSlugResponse } from "@/src/lib/types/store-front";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const CheckoutButton = () => {
  const { items } = useCartStore();

  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data } = useQuery({
    queryKey: ["store"],
    queryFn: () => storeApiFetch<StoreSlugResponse>(`/api/store/${slug}`),
  });

  const handleCheckout = async () => {
    if (!data?.id) {
      console.error("Store not loaded yet");
      return;
    }

    const { url } = await storeApiFetch<{ url: string }>(
      "/api/checkout/session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeId: data.id,
          items: items.map((item) => ({
            productId: item.productId,
            productVariantId: item.productVariantId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          storeUrl: `${window.location.origin}/store/${slug}`,
        }),
      },
    );

    window.location.href = url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="flex items-center justify-center gap-3 shrink-0 px-8 py-3.5 text-base font-medium border-2 border-black rounded-full transition-colors duration-300 overflow-hidden bg-neutral-800 text-white hover:text-neutral-800 cursor-pointer relative z-10 before:content-[''] before:absolute before:inset-0 before:w-0 before:bg-white before:-z-10 before:transition-all before:duration-300 hover:before:w-full"
    >
      <LockKeyhole size={18} />
      <span>Check out</span>
    </button>
  );
};

export default CheckoutButton;

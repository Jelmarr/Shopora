"use client";

import { useCartStore } from "@/src/lib/store/cart-store";
import { LockKeyhole } from "lucide-react";
import { useCheckout } from "@/src/hooks/useCheckout";

const CheckoutButton = () => {
  const { items } = useCartStore();
  const { isStoreReady, startCheckout } = useCheckout();

  const handleCheckout = async () => {
    await startCheckout(
      items.map((item) => ({
        productId: item.productId,
        productVariantId: item.productVariantId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    );
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={!isStoreReady || items.length == 0}
      className="flex items-center justify-center gap-3 shrink-0 px-8 py-3.5 text-base font-medium border-2 border-black rounded-full transition-colors 
      duration-300 overflow-hidden bg-neutral-800 text-white hover:text-neutral-800 cursor-pointer relative z-10 before:content-[''] 
      before:absolute before:inset-0 before:w-0 before:bg-white before:-z-10 before:transition-all before:duration-300 hover:before:w-full"
    >
      <LockKeyhole size={18} />
      <span>Check out</span>
    </button>
  );
};

export default CheckoutButton;

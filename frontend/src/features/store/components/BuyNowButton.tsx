"use client";

import { Zap } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";

interface BuyNowButtonProps {
  productId: string;
  productVariantId?: string;
  name: string;
  price: number;
  disabled?: boolean;
}

const BuyNowButton = ({
  productId,
  productVariantId,
  name,
  price,
  disabled,
}: BuyNowButtonProps) => {
  const { startCheckout, isStoreReady } = useCheckout();

  const handleBuyNow = async () => {
    await startCheckout([
      {
        productId,
        productVariantId,
        name,
        price,
        quantity: 1,
      },
    ]);
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={disabled || !isStoreReady}
      className="relative z-10 w-full shrink-0 px-6 py-3.5 text-base font-medium border-2 border-neutral-900 rounded-full transition-colors duration-300 overflow-hidden bg-white text-neutral-900 hover:text-white cursor-pointer flex items-center justify-center gap-2 before:content-[''] before:absolute before:inset-0 before:w-0 before:bg-neutral-900 before:-z-10 before:transition-all before:duration-300 hover:before:w-full disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Zap size={18} />
      Buy now
    </button>
  );
};

export default BuyNowButton;

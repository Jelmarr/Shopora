import { formatPrice } from "@/src/lib/utils/price-formatter";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="w-full rounded-lg bg-stone-100">
      <div className="relative w-full overflow-hidden aspect-square rounded-t-lg">
        <Image
          src="/images/promo-banner.png"
          alt="product-card-image"
          fill
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div className="px-6 pt-6 pb-8">
        <span className="tracking-widest text-xs text-gray-500">AUREL</span>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Speaker remote</p>
          <p>{formatPrice(5000)}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="cursor-pointer">
            <Image
              src="/images/promo-banner.png"
              alt="product-card-image"
              width={30}
              height={30}
              className="rounded-sm"
            />
          </button>
          <button className="cursor-pointer">
            <Image
              src="/images/promo-banner.png"
              alt="product-card-image"
              width={30}
              height={30}
              className="rounded-sm"
            />
          </button>
          <button className="cursor-pointer">
            <Image
              src="/images/promo-banner.png"
              alt="product-card-image"
              width={30}
              height={30}
              className="rounded-sm"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

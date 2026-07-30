import { Button } from "@/src/components/ui/button";
import { WhatsNewProps } from "@/src/lib/types/store-front";
import { formatPrice } from "@/src/lib/utils/price-formatter";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WhatsNew = ({ newProducts }: WhatsNewProps) => {
  return (
    <section className="py-24">
      <h3 className="uppercase tracking-widest font-semibold text-center text-lg">
        What&apos;s New
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-24">
        {newProducts.map((p) => {
          const quantity = p.stock ?? 0;

          return (
            <div key={p.id} className="flex flex-col gap-2">
              <Link
                href=""
                className="relative aspect-square w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={p.primaryImageUrl}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
                {quantity <= 5 && quantity >= 1 && (
                  <div className="bg-white rounded-md absolute top-5 left-5 uppercase text-[10px] font-semibold tracking-widest p-2">
                    last few
                  </div>
                )}
              </Link>

              <div className="flex flex-col gap-4 mt-4">
                <p className="font-semibold text-gray-900">{p.name}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <p className="text-gray-700">{formatPrice(p.price)}</p>
                    {p.comparePrice && (
                      <p className="line-through text-gray-500">
                        {formatPrice(p.comparePrice)}
                      </p>
                    )}
                  </div>
                  <Button>
                    Add to <ShoppingCartIcon />
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">Available: {quantity}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href=""
        className="mx-auto my-0 justify-center flex mt-14 w-fit group"
      >
        <div>
          <h3 className="tracking-widest uppercase text-xs group-hover:font-semibold">
            view all
          </h3>
          <div className="w-full h-px bg-gray-500 mt-1 group-hover:bg-black" />
        </div>
      </Link>
    </section>
  );
};

export default WhatsNew;

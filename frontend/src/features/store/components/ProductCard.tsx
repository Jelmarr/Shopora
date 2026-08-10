"use client";

import { formatPrice } from "@/src/lib/utils/price-formatter";
import Image from "next/image";
import { ProductCardProps } from "./shop-page/ProductGrid";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProductCard = ({
  id,
  name,
  categoryName,
  price,
  comparePrice,
  images,
}: ProductCardProps) => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  return (
    <div className="w-full rounded-lg bg-stone-100">
      <div className="relative w-full overflow-hidden aspect-square rounded-t-lg group">
        <Image
          src={images[0]}
          alt="product-card-image"
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-3 flex items-start justify-end opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <Link
            href={`/store/${slug}/shop/${id}`}
            className={`relative z-10 shrink-0 p-3 text-base font-medium text-neutral-800 bg-white rounded-full cursor-pointer flex items-center gap-3 border
            overflow-hidden transition-all duration-300 hover:text-neutral-100 before:content-[''] before:absolute before:top-0 
            before:left-0 before:h-full before:w-0 before:rounded-2xl before:bg-neutral-800 before:-z-10 before:shadow-lg before:transition-all before:duration-300 hover:before:w-full`}
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      <div className="px-6 pt-6 pb-8">
        <span className="tracking-widest text-xs text-gray-500">
          {categoryName}
        </span>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium line-clamp-1">{name}</p>
          {comparePrice ? (
            <div>
              <p className="text-rose-600">{formatPrice(price)}</p>
              <p className="text-sm text-right text-gray-500 line-through">
                {formatPrice(comparePrice)}
              </p>
            </div>
          ) : (
            <p>{formatPrice(price)}</p>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          {images.map((image, index) => (
            <Link
              href={`/store/${slug}/shop/${id}`}
              key={index + 1}
              className="cursor-pointer border rounded-md"
            >
              <Image
                src={image}
                alt="product-card-image"
                width={30}
                height={30}
                className="rounded-sm"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

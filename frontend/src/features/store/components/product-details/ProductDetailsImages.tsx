"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductDetailsImagesProps {
  images: string[];
}

const ProductDetailsImages = ({ images }: ProductDetailsImagesProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 items-start w-full max-w-4xl">
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto w-full md:w-auto max-h-none md:max-h-175 pb-2 md:pb-0 md:pr-1 shrink-0 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent">
        {images.map((image, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-neutral-900 ring-1 ring-neutral-900 opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`product-thumbnail-${index + 1}`}
                width={120}
                height={120}
                className="object-cover rounded-sm aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </button>
          );
        })}
      </div>

      {/* Main Image View Container */}
      <div className="relative w-full aspect-square overflow-hidden border rounded-lg bg-stone-100">
        <Image
          src={images[selectedIndex] || images[0]}
          alt="product-main-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
          priority
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ProductDetailsImages;

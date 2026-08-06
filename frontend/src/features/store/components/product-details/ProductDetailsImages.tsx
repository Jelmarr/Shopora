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
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-3 overflow-y-auto max-h-175 pr-1 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent">
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
                className="object-cover rounded-sm aspect-square"
              />
            </button>
          );
        })}
      </div>

      {/* Main Image View */}
      <div className="relative shrink-0 overflow-hidden border rounded-lg bg-stone-100">
        <Image
          src={images[selectedIndex] || images[0]}
          alt="product-main-image"
          width={700}
          height={700}
          priority
          className="object-cover rounded-lg aspect-square"
        />
      </div>
    </div>
  );
};

export default ProductDetailsImages;

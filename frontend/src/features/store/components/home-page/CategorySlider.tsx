"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategorySliderProps } from "@/src/lib/types/store-front";
import { useQuery } from "@tanstack/react-query";
import { TCategory } from "@/src/lib/types/category";
import { storeApiFetch } from "@/src/lib/store-api";

const CategorySlider = ({
  storeId,
  activeCategoryId,
  onSelect,
}: CategorySliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery<TCategory[]>({
    queryKey: ["categories", storeId],
    queryFn: () => storeApiFetch(`/api/store/categories/${storeId}`),
    enabled: Boolean(storeId),
  });

  const categories = data ?? [];

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (categories.length === 0) return null;

  return (
    <section className="relative w-full mt-20">
      <button
        onClick={() => scrollBy(-200)}
        aria-label="Scroll categories left"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center rounded-full bg-white shadow-md border h-8 w-8 hover:bg-gray-50 transition"
      >
        <ChevronLeft size={16} />
      </button>

      <div
        ref={scrollRef}
        className="flex justify-center gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <button
              key={category.id}
              onClick={() => onSelect?.(category.id)}
              className={`shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scrollBy(200)}
        aria-label="Scroll categories right"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center rounded-full bg-white shadow-md border h-8 w-8 hover:bg-gray-50 transition"
      >
        <ChevronRight size={16} />
      </button>
    </section>
  );
};

export default CategorySlider;

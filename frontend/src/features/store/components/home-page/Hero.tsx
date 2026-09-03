"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroProps, HeroSliderProps } from "@/lib/types/store-front";
import StoreButton from "../StoreButton";
import { useQuery } from "@tanstack/react-query";
import { storeApiFetch } from "@/lib/store-api";
import { useParams, useRouter } from "next/navigation";

const Hero = ({ storeId, autoPlayMs = 5000 }: HeroSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data, isLoading, isError } = useQuery<HeroProps[]>({
    queryKey: ["products", storeId],
    queryFn: () => storeApiFetch(`/api/store/heroProducts/${storeId}`),

    enabled: Boolean(storeId),
  });

  const products = data ?? [];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + products.length) % products.length);
    },
    [products.length],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || products.length <= 1) return;

    const timer = setInterval(goNext, autoPlayMs);
    return () => clearInterval(timer);
  }, [goNext, isPaused, autoPlayMs, products.length]);

  const router = useRouter();

  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  if (isLoading) {
    return (
      <section className="relative w-full h-105 md:h-130 overflow-hidden rounded-lg bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-6 md:p-12 max-w-xl">
          <div className="h-8 md:h-12 w-3/4 rounded-md bg-gray-300" />
          <div className="h-4 w-full rounded-md bg-gray-300" />
          <div className="h-4 w-2/3 rounded-md bg-gray-300" />
          <div className="h-10 w-32 rounded-md bg-gray-300 mt-2" />
        </div>
      </section>
    );
  }

  if (isError || products.length === 0) {
    return (
      <section className="relative w-full h-105 md:h-130 overflow-hidden rounded-lg bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p className="text-sm md:text-base">
          {isError
            ? "Couldn't load featured products"
            : "No featured products available"}
        </p>
      </section>
    );
  }
  return (
    <section
      className="relative w-full h-105 md:h-130 overflow-hidden rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={product.primaryImageUrl}
            alt={product.name}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex h-full flex-col items-start justify-end gap-3 p-6 md:p-12 text-white max-w-xl">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight line-clamp-2 md:line-clamp-3">
              {product.name}
            </h1>

            <p className="text-sm md:text-base text-white/85 line-clamp-2 md:line-clamp-3">
              {product.description}
            </p>

            <StoreButton
              buttonText="Shop now"
              whiteBorder
              onClick={() => router.push(`/store/${slug}/shop`)}
            />
          </div>
        </div>
      ))}

      {products.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 hover:bg-white/30 p-2 text-white backdrop-blur-sm transition"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 hover:bg-white/30 p-2 text-white backdrop-blur-sm transition"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;

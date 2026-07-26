"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSliderProps } from "@/src/lib/types/store-front";

const Hero = ({ products, autoPlayMs = 5000 }: HeroSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  if (products.length === 0) return null;

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

            <Button asChild size="lg" className="mt-2">
              <a href={"/products"}>Shop now</a>
            </Button>
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

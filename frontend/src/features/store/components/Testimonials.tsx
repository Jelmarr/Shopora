"use client";

import { useState, useEffect, useRef } from "react";

interface Testimonial {
  id: string;
  customerName: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    customerName: "Amara Chen",
    quote: "The whole experience felt effortless, from browsing to checkout.",
  },
  {
    id: "2",
    customerName: "Devon Marsh",
    quote: "Support answered my question in minutes and actually solved it.",
  },
  {
    id: "3",
    customerName: "Priya Nair",
    quote:
      "Packaging was thoughtful and the product matched the photos perfectly.",
  },
  {
    id: "4",
    customerName: "Marcus Webb",
    quote: "Consistent quality every time, which is why I keep coming back.",
  },
  {
    id: "5",
    customerName: "Lena Ortiz",
    quote: "Fast shipping and the sizing guide was actually accurate.",
  },
];

const VISIBLE_COUNT = 3;
const SLIDE_DURATION_MS = 4000;

const extendedTestimonials = [
  ...testimonials,
  ...testimonials.slice(0, VISIBLE_COUNT),
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEnableTransition(true);
      setActiveIndex((prev) => prev + 1);
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const handleTransitionEnd = () => {
    if (activeIndex >= testimonials.length) {
      setEnableTransition(false);
      setActiveIndex(0);
    }
  };

  const cardWidthPct = 100 / VISIBLE_COUNT;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <h3 className="uppercase tracking-widest font-semibold text-center text-lg mb-16">
        What customers are saying
      </h3>

      <div className="mx-auto px-6">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 min-w-300"
            style={{
              transform: `translateX(-${activeIndex * cardWidthPct}%)`,
              transition: enableTransition
                ? "transform 700ms ease-in-out"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedTestimonials.map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="flex flex-col gap-3 shrink-0"
                style={{ width: `calc(${cardWidthPct}% - 1.33rem)` }}
              >
                <p className="text-gray-900 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm text-gray-500">{t.customerName}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-1 w-25 rounded-full bg-gray-200 overflow-hidden mt-12 mx-auto my-0">
          <div
            key={activeIndex}
            className="h-full bg-black rounded-full"
            style={{
              animation: `fillbar ${SLIDE_DURATION_MS}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fillbar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

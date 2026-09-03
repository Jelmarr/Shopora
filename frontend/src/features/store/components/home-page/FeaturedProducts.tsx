"use client";

import Link from "next/link";
import ProductCard from "../ProductCard";
import { ProductCardProps } from "../shop-page/ProductGrid";
import { storeApiFetch } from "@/src/lib/store-api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const FeaturedProducts = ({ storeId }: { storeId: string }) => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data, isLoading, isError } = useQuery<ProductCardProps[]>({
    queryKey: ["featuredProducts", storeId],
    queryFn: () => storeApiFetch(`/api/store/featuredProducts/${storeId}`),
    enabled: Boolean(storeId),
  });

  const products = data ?? [];

  return (
    <section className="py-24 px-4 max-w-360 mx-auto my-0">
      <h3 className="uppercase tracking-widest font-semibold text-center text-lg">
        Featured Products
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-24">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            categoryName={product.categoryName}
            price={product.price}
            comparePrice={product.comparePrice}
            images={product.images}
            primaryImage={product.primaryImage}
          />
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-24">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square w-full rounded-md bg-gray-200" />
              <div className="h-3 w-1/3 rounded bg-gray-200 mt-3" />
              <div className="h-4 w-2/3 rounded bg-gray-200 mt-2" />
              <div className="h-4 w-1/4 rounded bg-gray-200 mt-2" />
            </div>
          ))}
        </div>
      ) : isError || products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 text-gray-400 mt-24 py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <p className="text-sm">
            {isError ? "Couldn't load new products" : "No new products yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-24">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              categoryName={product.categoryName}
              price={product.price}
              comparePrice={product.comparePrice}
              images={product.images}
              primaryImage={product.primaryImage}
            />
          ))}
        </div>
      )}

      <Link
        href={`/store/${slug}/shop`}
        className="mx-auto my-0 justify-center flex mt-14 w-fit group"
      >
        <div>
          <p className="tracking-widest uppercase text-xs group-hover:font-semibold">
            view all
          </p>
          <div className="w-full h-px bg-gray-500 mt-1 group-hover:bg-black" />
        </div>
      </Link>
    </section>
  );
};

export default FeaturedProducts;

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

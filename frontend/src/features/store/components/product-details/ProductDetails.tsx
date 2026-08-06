"use client";

import { useState } from "react";
import { storeApiFetch } from "@/src/lib/store-api";
import { TProduct } from "@/src/lib/types/product";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsImages from "./ProductDetailsImages";
import { formatPrice } from "@/src/lib/utils/price-formatter";
import StoreButton from "../StoreButton";
import RelatedProducts from "./RelatedProducts";

interface ProductDetailsProps {
  productId: string;
  storeId: string;
}

const ProductDetails = ({ productId, storeId }: ProductDetailsProps) => {
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<TProduct>({
    queryKey: ["product", storeId, productId],
    queryFn: () =>
      storeApiFetch<TProduct>(`/api/store/products/${productId}/${storeId}`),
    enabled: Boolean(productId && storeId),
  });

  const handleSelectOption = (variantName: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 animate-pulse py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="w-full lg:w-1/2 aspect-square bg-stone-200 rounded-lg" />
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="h-8 bg-stone-200 rounded w-1/3" />
          <div className="h-12 bg-stone-200 rounded w-3/4" />
          <div className="h-6 bg-stone-200 rounded w-1/4" />
          <div className="h-24 bg-stone-200 rounded w-full" />
          <div className="h-12 bg-stone-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="py-20 text-center text-rose-600 font-medium">
        Failed to load product details. Please try again.
      </div>
    );
  }

  const variantOptions = product.variantOptions ?? [];

  const stock = product.stock ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Images Column */}
        <div className="w-full lg:w-1/2">
          <ProductDetailsImages images={product.images ?? []} />
        </div>

        {/* Product Info & Purchase Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                  {product.categoryName}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                  {product.name}
                </h1>
                <p
                  className={`text-sm font-medium ${stock <= 0 ? "text-red-500" : "text-gray-600"}`}
                >
                  {stock > 0 ? `${stock} stock left!` : "Out of stock"}
                </p>
              </div>
              <p className="text-xl text-neutral-900 shrink-0">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Variant Selectors */}
            {variantOptions.length > 0 && (
              <div className="flex flex-col gap-6 mt-8">
                {variantOptions.map((variant) => (
                  <div key={variant.name}>
                    <p className="text-sm font-semibold text-neutral-800 uppercase tracking-wide">
                      {variant.name}:
                    </p>
                    <div className="flex gap-2 sm:gap-3 mt-2 flex-wrap">
                      {variant.values.map((val) => {
                        const isSelected =
                          selectedVariants[variant.name] === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() =>
                              handleSelectOption(variant.name, val)
                            }
                            className={`border rounded-md min-w-17.5 sm:min-w-22.5 px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                                : "border-stone-300 bg-white text-stone-700 hover:border-neutral-800"
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col gap-3 mt-8 sm:mt-10">
            <button
              className={`relative z-10 w-full shrink-0 px-6 py-3.5 text-base font-medium text-white bg-neutral-800 rounded-full cursor-pointer flex justify-center items-center gap-3 border-2 border-black
              overflow-hidden transition-colors duration-300 hover:text-neutral-800 before:content-[''] before:absolute before:inset-0 
              before:w-0 before:bg-white before:-z-10 before:transition-all before:duration-300 hover:before:w-full`}
            >
              Add to cart
            </button>
            <StoreButton
              buttonText="Buy it now"
              onClick={() => {}}
              whiteBorder={false}
            />
          </div>
        </div>
      </section>

      {/* Product Description */}
      {product.description && (
        <article className="mt-12 sm:mt-16 border-t border-stone-200 pt-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            About the product
          </h2>
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>
        </article>
      )}

      {/* Related Products Section */}
      <RelatedProducts
        currentProductId={productId}
        categoryId={product.categoryId}
        storeId={storeId}
      />
    </div>
  );
};

export default ProductDetails;

"use client";

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

  if (isLoading) {
    return (
      <div className="flex gap-4 animate-pulse py-10">
        <div className="w-30 h-175 bg-stone-200 rounded-md" />
        <div className="w-175 h-175 bg-stone-200 rounded-lg" />
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

  return (
    <>
      <section className="flex gap-8 py-10">
        <ProductDetailsImages images={product.images ?? []} />

        <div className="flex-1">
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-stone-600">{product.categoryName}</span>
              <p className="text-5xl font-bold line-clamp-1">{product.name}</p>
              <p className="text-stone-500">{product.stock} stock left!</p>
            </div>
            <p className="text-xl">{formatPrice(product.price)}</p>
          </div>

          <div className="flex flex-col gap-4 mt-10">
            {product.variantOptions.map((variant, index) => (
              <div key={index + 1}>
                <p className="text-lg font-semibold">{variant.name}:</p>
                <div className="flex gap-4 mt-2 flex-wrap">
                  {variant.values.map((val, index) => (
                    <p
                      key={index + 1}
                      className="border rounded-md min-w-30 text-center py-2"
                    >
                      {val}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <button
              className={`relative z-10 shrink-0 px-6 py-3.5 text-base font-medium text-white bg-neutral-800 rounded-full cursor-pointer flex justify-center items-center gap-3 border-2 border-black
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
      <article>
        <p className="font-semibold mb-4 mt-10">About the product</p>
        <p className="text-justify text-gray-700">{product.description}</p>
      </article>

      <RelatedProducts
        currentProductId={productId}
        categoryId={product.categoryId}
        storeId={storeId}
      />
    </>
  );
};

export default ProductDetails;

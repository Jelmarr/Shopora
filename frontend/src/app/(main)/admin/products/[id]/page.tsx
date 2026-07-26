"use client";

import ProductForm from "@/src/features/product/ProductForm";
import { apiFetch } from "@/src/lib/api-client";
import { TProduct } from "@/src/lib/types/product";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => apiFetch<TProduct>(`/api/products/${id}`),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load product.</div>;
  if (!products) return null;

  console.log(products);

  return <ProductForm mode="edit" product={products} />;
};

export default ProductDetailPage;

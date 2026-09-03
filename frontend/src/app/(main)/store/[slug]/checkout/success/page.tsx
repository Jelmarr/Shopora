"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart-store";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="py-24 flex flex-col items-center text-center gap-4">
      <CheckCircle size={40} className="text-green-600" />
      <h1 className="text-2xl font-semibold">Order confirmed</h1>
      <p className="text-gray-500 max-w-sm">
        Thanks for your purchase. A confirmation has been sent to your email.
      </p>
      <Link
        href={`/store/${slug}/shop`}
        className="mt-4 px-6 py-3 rounded-full bg-neutral-800 text-white text-sm"
      >
        Continue shopping
      </Link>
    </main>
  );
};

export default SuccessPage;

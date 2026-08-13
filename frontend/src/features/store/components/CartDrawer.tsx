"use client";

import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";
import { useCartStore } from "@/src/lib/store/cart-store";
import Image from "next/image";
import { formatPrice } from "@/src/lib/utils/price-formatter";
import { ChevronDown, ChevronUp, LockKeyhole, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CheckoutButton from "./CheckoutButton";

const CartDrawer = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleIncrement = (
    variantKey: string,
    currentQty: number,
    maxStock: number = 99,
  ) => {
    if (currentQty < maxStock) {
      updateQuantity(variantKey, currentQty + 1);
    }
  };

  const handleDecrement = (variantKey: string, currentQty: number) => {
    if (currentQty > 1) {
      updateQuantity(variantKey, currentQty - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-140 max-w-full bg-white h-full shadow-2xl rounded-l-4xl flex flex-col justify-between overflow-hidden"
          >
            {/* Fixed Header */}
            <div className="flex items-center justify-between py-6 px-12 border-b shrink-0 bg-white z-10">
              <h2 className="text-3xl font-bold flex items-start gap-1">
                Cart
                {totalItems > 0 && (
                  <sup className="text-xs font-medium leading-none top-1">
                    {totalItems}
                  </sup>
                )}
              </h2>
              <CloseButton onClose={closeCart} />
            </div>

            {/* Scrollable Item List Container */}
            <div className="px-12 py-6 overflow-y-auto flex-1 min-h-0 space-y-6">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center px-8 text-center mt-20">
                  <div>
                    <p className="text-3xl font-bold">Your cart is</p>
                    <p className="text-3xl font-bold">currently empty.</p>
                    <Link
                      href={`/store/${slug}/shop`}
                      className="inline-flex gap-2 items-center hover:underline justify-center mt-10 text-gray-800 font-medium"
                      onClick={closeCart}
                    >
                      <MoveUpRight size={15} /> Shop now
                    </Link>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.variantKey}
                    className="grid grid-cols-[100px_1fr_auto] gap-4 w-full"
                  >
                    <div className="relative w-25 h-25 overflow-hidden rounded-md bg-stone-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 justify-center">
                      <p className="font-semibold text-neutral-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-stone-500">
                        {item.categoryName}
                      </p>
                      <p className="text-sm font-medium">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between items-end py-1">
                      <div className="bg-stone-100 flex items-center px-2 py-1 rounded-md">
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          max={item.maxStock}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val)) {
                              updateQuantity(item.variantKey, val);
                            }
                          }}
                          className="w-8 text-center bg-transparent text-sm font-medium focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <div className="flex flex-col gap-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              handleIncrement(
                                item.variantKey,
                                item.quantity,
                                item.maxStock,
                              )
                            }
                            disabled={item.quantity >= (item.maxStock ?? 99)}
                            className="text-stone-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer p-0.5"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDecrement(item.variantKey, item.quantity)
                            }
                            disabled={item.quantity <= 1}
                            className="text-stone-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer p-0.5"
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantKey)}
                        className="hover:underline text-xs text-stone-500 hover:text-rose-600 cursor-pointer transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Fixed Footer */}
            {items.length > 0 && (
              <div className="px-12 py-8 border-t bg-white shrink-0 z-10">
                <div className="flex items-center justify-between gap-6">
                  <div className="shrink-0">
                    <p className="text-sm text-stone-500">Subtotal</p>
                    <p className="font-semibold text-2xl text-neutral-900">
                      {formatPrice(totalPrice)}
                    </p>
                  </div>
                  <CheckoutButton />
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TProduct } from "../types/product";

export type CartItem = {
  productId: string;
  variantKey: string;
  name: string;
  categoryName: string;
  price: number;
  image: string;
  selectedVariants?: Record<string, string>;
  quantity: number;
  maxStock: number;
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    product: TProduct,
    selectedVariants?: Record<string, string>,
    selectedPrice?: number,
    selectedStock?: number,
  ) => void;
  removeItem: (variantKey: string) => void;
  updateQuantity: (variantKey: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Helper to create a unique identifier for product + variant combinations
const generateVariantKey = (
  productId: string,
  variants?: Record<string, string>,
) => {
  if (!variants || Object.keys(variants).length === 0) return productId;
  const sortedVariantString = Object.entries(variants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => `${key}:${val}`)
    .join("-");
  return `${productId}-${sortedVariantString}`;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (
        product,
        selectedVariants = {},
        selectedPrice,
        selectedStock,
      ) => {
        const variantKey = generateVariantKey(product.id, selectedVariants);
        const price = selectedPrice ?? product.price;
        const maxStock = selectedStock ?? product.stock ?? 99;
        const image = product.images?.[0] || product.primaryImageUrl || "";

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.variantKey === variantKey,
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingIndex];
            const newQuantity = Math.min(existingItem.quantity + 1, maxStock);

            updatedItems[existingIndex] = {
              ...existingItem,
              quantity: newQuantity,
            };

            return { items: updatedItems };
          }

          const newItem: CartItem = {
            productId: product.id,
            variantKey,
            name: product.name,
            categoryName: product.categoryName,
            price,
            image,
            selectedVariants,
            quantity: 1,
            maxStock,
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (variantKey) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantKey !== variantKey),
        }));
      },

      updateQuantity: (variantKey, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.variantKey === variantKey) {
                const validQuantity = Math.max(
                  1,
                  Math.min(quantity, item.maxStock),
                );
                return { ...item, quantity: validQuantity };
              }
              return item;
            })
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "shopping-cart-storage", // Key name in localStorage
      storage: createJSONStorage(() => localStorage), // Defaults to localStorage
    },
  ),
);

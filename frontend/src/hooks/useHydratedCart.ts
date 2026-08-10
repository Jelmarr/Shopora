import { useSyncExternalStore } from "react";
import { useCartStore } from "../lib/store/cart-store";

const subscribe = (callback: () => void) => {
  return useCartStore.persist.onFinishHydration(callback);
};

export const useHydratedCart = () => {
  const cart = useCartStore();

  const isHydrated = useSyncExternalStore(
    subscribe,
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );

  return {
    ...cart,
    isHydrated,
  };
};

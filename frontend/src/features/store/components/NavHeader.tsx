"use client";

import { useCartStore } from "@/src/lib/store/cart-store";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const NavHeader = ({
  storeName,
  slug,
}: {
  storeName: string;
  slug: string;
}) => {
  const { openCart, getTotalItems, items } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="flex justify-between p-4 max-w-360 mx-auto my-0 sticky top-0 bg-white z-50 rounded-b-lg">
      <div>{storeName}</div>
      <nav className="flex gap-6">
        <Link href={`/store/${slug}`}>Home</Link>
        <Link href={`/store/${slug}/shop`}>Shop</Link>
        <Link href={`/${slug}/contact`}>Contact</Link>
      </nav>
      <div className="flex gap-4">
        <Search size={18} />
        <div className="relative">
          <ShoppingCart
            size={18}
            onClick={openCart}
            className="cursor-pointer"
          />
          {items.length > 0 && (
            <div className="absolute -right-3 -top-2">
              <p className="text-xs">{totalItems}</p>
            </div>
          )}
        </div>
        <User size={18} />
      </div>
    </header>
  );
};

export default NavHeader;

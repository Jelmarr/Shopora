"use client";

import { useState } from "react";
import { useCartStore } from "@/src/lib/store/cart-store";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: `/store/${slug}` },
    { label: "Shop", href: `/store/${slug}/shop` },
    { label: "Contact", href: `/store/${slug}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-360 mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-1 -ml-1"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <Link
          href={`/store/${slug}`}
          className="text-sm font-medium tracking-wide"
        >
          {storeName}
        </Link>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-700 hover:text-black transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button aria-label="Search" className="p-1">
            <Search size={18} />
          </button>

          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-1"
          >
            <ShoppingCart size={18} />
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button aria-label="Account" className="hidden sm:block p-1">
            <User size={18} />
          </button>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col">
            <div className="h-16 flex items-center justify-between px-4">
              <span className="text-sm font-medium">{storeName}</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="h-px bg-gray-100" />

            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 text-base text-neutral-800 hover:text-black transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-4 border-t border-gray-100">
              <button className="flex items-center gap-2 py-2 text-sm text-neutral-700">
                <User size={16} />
                Account
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default NavHeader;

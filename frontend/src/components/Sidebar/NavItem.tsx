"use client";

import { NavItemProps } from "@/lib/types/sidebar.types";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import SubItem from "./SubItem";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NavItem = ({ item }: { item: NavItemProps["item"] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reconstruct full current URL (e.g. "/admin/products?category=shoes")
  const currentQuery = searchParams.toString();
  const currentFullUrl = currentQuery
    ? `${pathname}?${currentQuery}`
    : pathname;

  const hasMenu = Boolean(item.subMenu?.length);

  // Helper function to evaluate matching links (exact or pathname match)
  const isUrlActive = (targetHref?: string) => {
    if (!targetHref) return false;

    // Exact match (includes search params if present in targetHref)
    if (targetHref.includes("?")) {
      return currentFullUrl === targetHref;
    }

    // Pathname-only match (ignores active query params)
    return pathname === targetHref;
  };

  const isChildActive =
    hasMenu && item.subMenu!.some((s) => isUrlActive(s.href));
  const isSelfActive = !hasMenu && isUrlActive(item.href);

  const [open, setOpen] = useState(isChildActive);

  const handleClick = (e: React.MouseEvent) => {
    if (hasMenu) {
      e.preventDefault();
      setOpen((v) => !v);
    }
    // Allow standard Next.js navigation for normal items
  };

  const IconComp = item.icon;

  return (
    <li>
      <Link
        href={item.href ?? "#"}
        onClick={handleClick}
        className={[
          "flex items-center gap-x-3 px-2.5 py-2 rounded-lg text-sm transition-colors select-none",
          isSelfActive || isChildActive
            ? "bg-gray-100 text-gray-800 font-medium"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
        ].join(" ")}
      >
        <IconComp size={16} className="shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
        {hasMenu && (
          <ChevronDown
            size={14}
            className="text-gray-400 transition-transform duration-200 shrink-0"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </Link>

      {/* Dropdown submenu */}
      {hasMenu && (
        <div
          className="overflow-hidden transition-[max-height] duration-250 ease-in-out"
          style={{ maxHeight: open ? "500px" : "0px" }}
        >
          <ul className="mt-0.5 space-y-0.5 pb-1">
            {item.subMenu!.map((sub) => (
              <li key={sub.href}>
                <SubItem
                  label={sub.label}
                  href={sub.href}
                  active={isUrlActive(sub.href)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default NavItem;

"use client";

import { useState } from "react";
import { Menu, Store } from "lucide-react";
import { SIDEBAR_W, sidebarNavigation } from "@/lib/constants/sidebar";
import NavItem from "./NavItem";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";

interface StoreResponse {
  id: string;
  slug: string;
}

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarPx = SIDEBAR_W;

  const { data: store } = useQuery<StoreResponse>({
    queryKey: ["slug"],
    queryFn: async () => apiFetch(`/api/stores/slug`),
  });

  return (
    <>
      <style>{`:root { --sidebar-w: ${sidebarPx}px; }`}</style>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{ width: sidebarPx, transition: "width 300ms ease", zIndex: 50 }}
        className={[
          "fixed top-0 left-0 bottom-0 bg-white border-r border-gray-200",
          "flex flex-col overflow-x-hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex items-center px-3 h-14 shrink-0 border-b border-gray-100">
          <a
            href="#"
            className="font-semibold text-base text-gray-800 truncate"
          >
            Shopora
          </a>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
          <div className="py-3 px-2 space-y-4">
            {sidebarNavigation.map((group) => (
              <div key={group.groupName}>
                {/* Group label */}
                <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  {group.groupName}
                </p>

                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavItem key={item.label} item={item} />
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Store
              </p>

              <Link
                href={`/store/${store?.slug}`}
                target="_blank"
                className={[
                  "flex items-center gap-x-3 px-2.5 py-2 rounded-lg text-sm transition-colors select-none text-gray-600 hover:bg-gray-100 hover:text-gray-800",
                ].join(" ")}
              >
                <Store size={16} className="shrink-0" />
                <span className="flex-1 truncate">Store</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* User footer */}
        <div className={`border-t border-gray-100 p-3 shrink-0`}>
          <a
            href="#"
            title={undefined}
            className={`flex items-center gap-x-3 px-2.5 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100`}
          >
            <div className="size-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold shrink-0">
              JD
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-gray-800 truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-400 truncate">john@example.com</p>
            </div>
          </a>
        </div>
      </aside>

      {/* Mobile content */}
      <div className="lg:hidden flex-1 overflow-auto p-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-x-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
          aria-label="Open sidebar"
        >
          <Menu size={16} />
          Open Menu
        </button>
      </div>
    </>
  );
};

export default Sidebar;

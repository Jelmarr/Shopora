"use client";

import { useState } from "react";
import { ChevronsLeft, ChevronsRight, X, Menu } from "lucide-react";
import {
  MINI_W,
  SIDEBAR_W,
  sidebarNavigation,
} from "@/src/lib/constants/sidebar";
import NavItem from "./NavItem";

const Sidebar = () => {
  const [minified, setMinified] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/store/dashboard");

  const sidebarPx = minified ? MINI_W : SIDEBAR_W;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
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
          {minified ? (
            <div className="w-full flex justify-center">
              <div className="size-7 rounded-lg bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
            </div>
          ) : (
            <a
              href="#"
              className="font-semibold text-base text-gray-800 truncate"
            >
              Shopora
            </a>
          )}
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
          <div className="py-3 px-2 space-y-4">
            {sidebarNavigation.map((group) => (
              <div key={group.groupName}>
                {/* Group label */}
                {!minified ? (
                  <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {group.groupName}
                  </p>
                ) : (
                  <div className="mb-1 mx-auto w-4 border-t border-gray-200" />
                )}

                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavItem
                      key={item.label}
                      item={item}
                      minified={minified}
                      activeHref={activeHref}
                      setActiveHref={setActiveHref}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* User footer */}
        <div
          className={`border-t border-gray-100 p-3 shrink-0 ${minified ? "flex justify-center" : ""}`}
        >
          <a
            href="#"
            title={minified ? "Profile" : undefined}
            className={`flex items-center gap-x-3 px-2.5 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 ${minified ? "justify-center" : ""}`}
          >
            <div className="size-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold shrink-0">
              JD
            </div>
            {!minified && (
              <div className="truncate">
                <p className="text-sm font-medium text-gray-800 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-400 truncate">
                  john@example.com
                </p>
              </div>
            )}
          </a>
        </div>
      </aside>

      {/* ── Floating edge toggle ── */}

      {/* Desktop: collapse / expand */}
      <button
        onClick={() => setMinified((v) => !v)}
        style={{
          position: "fixed",
          top: "14px",
          left: sidebarPx - 10,
          transition: "left 300ms ease",
          zIndex: 60,
        }}
        className="hidden lg:flex items-center justify-center size-7 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-500"
        aria-label={minified ? "Expand sidebar" : "Collapse sidebar"}
      >
        {minified ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
      </button>

      {/* Mobile: close (only visible when open) */}
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            top: "14px",
            left: SIDEBAR_W - 10,
            zIndex: 60,
          }}
          className="lg:hidden flex items-center justify-center size-7 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-500"
          aria-label="Close sidebar"
        >
          <X size={14} />
        </button>
      )}

      {/* ── Main content ── */}
      <main
        style={{ marginLeft: sidebarPx, transition: "margin-left 300ms ease" }}
        className="flex-1 overflow-auto hidden lg:block"
      >
        {/* Page content goes here */}
      </main>

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
    </div>
  );
};

export default Sidebar;

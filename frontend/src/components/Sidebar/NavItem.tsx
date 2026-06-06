import { NavItemProps } from "@/src/lib/types/sidebar.types";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import SubItem from "./SubItem";

const NavItem = ({
  item,
  minified,
  activeHref,
  setActiveHref,
}: NavItemProps) => {
  const hasMenu = Boolean(item.subMenu?.length);
  const isChildActive =
    hasMenu && item.subMenu!.some((s) => s.href === activeHref);
  const [open, setOpen] = useState(isChildActive);
  const isSelfActive = !hasMenu && item.href === activeHref;

  // Collapse submenus when sidebar minifies
  useEffect(() => {
    if (minified) setOpen(false);
  }, [minified]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasMenu) {
      if (!minified) setOpen((v) => !v);
    } else {
      setActiveHref(item.href!);
    }
  };

  const IconComp = item.icon;

  return (
    <li>
      <a
        href={item.href ?? "#"}
        onClick={handleClick}
        title={minified ? item.label : undefined}
        className={[
          "flex items-center gap-x-3 px-2.5 py-2 rounded-lg text-sm transition-colors select-none",
          isSelfActive || isChildActive
            ? "bg-gray-100 text-gray-800 font-medium"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
          minified ? "justify-center" : "",
        ].join(" ")}
      >
        <IconComp size={16} className="shrink-0" />
        {!minified && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {hasMenu && (
              <ChevronDown
                size={14}
                className="text-gray-400 transition-transform duration-200 shrink-0"
                style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            )}
          </>
        )}
      </a>

      {/* Dropdown submenu */}
      {hasMenu && !minified && (
        <div
          className="overflow-hidden transition-[max-height] duration-250 ease-in-out"
          style={{ maxHeight: open ? "500px" : "0px" }}
        >
          <ul className="mt-0.5 space-y-0.5 pb-1">
            {item.subMenu!.map((sub) => (
              <li key={sub.href} onClick={() => setActiveHref(sub.href)}>
                <SubItem
                  label={sub.label}
                  href={sub.href}
                  active={activeHref === sub.href}
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

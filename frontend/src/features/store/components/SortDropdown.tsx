"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useUpdateParam } from "@/hooks/useUpdateParam";

export interface SortOption {
  id: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { id: "featured", label: "Featured" },
  { id: "a-z", label: "Alphabetically, A-Z" },
  { id: "z-a", label: "Alphabetically, Z-A" },
  { id: "low-high", label: "Price, low to high" },
  { id: "high-low", label: "Price, high to low" },
  { id: "old-new", label: "Date, old to new" },
  { id: "new-old", label: "Date, new to old" },
];

interface SortDropdownProps {
  onSelect?: (option: SortOption) => void;
}

const SortDropdown = ({ onSelect }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    SORT_OPTIONS[0],
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { updateParam } = useUpdateParam();

  const handleSelect = (option: SortOption) => {
    updateParam("sortBy", option.id);
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div ref={dropdownRef} className="relative w-full text-sm font-sans">
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-neutral-100 rounded-t-md border-b border-neutral-300 hover:bg-neutral-200/80 transition-colors text-left focus:outline-none"
      >
        <div className="flex flex-col">
          <span className="text-[11px] text-neutral-500 font-normal leading-tight">
            Sort by
          </span>
          <span className="text-neutral-900 leading-snug text-[16px]">
            {selectedOption.label}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-neutral-700 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-30 bg-white border border-neutral-400 shadow-md overflow-hidden">
          <ul className="py-0 max-h-72 overflow-y-auto">
            {SORT_OPTIONS.map((option) => {
              const isSelected = selectedOption.id === option.id;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#1d63ed] text-white font-medium"
                        : "text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;

"use client";

import { useUpdateParam } from "@/src/hooks/useUpdateParam";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const StoreSearch = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();

  const [text, setText] = useState(searchParams.get("search") || "");

  const { updateParam } = useUpdateParam();

  const debouncedPushUrl = useDebouncedCallback((keyword: string) => {
    updateParam("search", keyword);
  }, 300);

  const handleChange = (value: string) => {
    setText(value);
    debouncedPushUrl(value);
  };

  return (
    <div className="relative flex items-center w-full leading-7">
      <Search
        className="absolute left-4 w-4 h-4  pointer-events-none"
        color="gray"
      />

      <input
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 pl-10 pr-4 leading-7 text-neutral-900 border-2 border-gray-300 rounded-full outline-none transition-all 
                  duration-300 ease-in-out placeholder:text-neutral-400
                hover:bg-white hover:border-black/40 hover:ring-4 hover:ring-black/10 focus:bg-white focus:border-black/40 focus:ring-4 focus:ring-black/10"
      />
    </div>
  );
};

export default StoreSearch;

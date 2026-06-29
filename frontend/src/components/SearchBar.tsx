"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import { useUpdateParam } from "../hooks/useUpdateParam";

export default function SearchBar({ placeholder }: { placeholder: string }) {
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
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-9"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

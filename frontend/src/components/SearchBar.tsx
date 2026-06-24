"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [text, setText] = useState(searchParams.get("search") || "");

  const debouncedPushUrl = useDebouncedCallback((keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (keyword) {
      params.set("search", keyword);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (value: string) => {
    setText(value);
    debouncedPushUrl(value);
  };

  return (
    <div className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search categories..."
        className="pl-9"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

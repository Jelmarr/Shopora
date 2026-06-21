"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useTableSort<T extends string>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") as T | null;
  const currentSortOrder = searchParams.get("sortOrder") as
    | "asc"
    | "desc"
    | null;

  const handleSort = (columnName: T) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentSortBy === columnName) {
      if (currentSortOrder === "asc") {
        params.set("sortOrder", "desc");
      } else {
        params.delete("sortBy");
        params.delete("sortOrder");
      }
    } else {
      params.set("sortBy", columnName);
      params.set("sortOrder", "asc");
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    sortBy: currentSortBy,
    sortOrder: currentSortOrder,
    handleSort,
  };
}

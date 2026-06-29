import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useUpdateParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value?.toString()) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return { updateParam, handlePageChange };
};

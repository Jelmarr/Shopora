import { Button } from "@/src/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/src/components/ui/combobox";
import { apiFetch } from "@/src/lib/api-client";
import { LookupCategory } from "@/src/lib/types/category";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: categories = [] } = useQuery<LookupCategory[]>({
    queryKey: ["categories", "lookup"],
    queryFn: () => apiFetch<LookupCategory[]>("/api/categories/lookup"),
  });

  const uniqueCategories = [{ id: "", name: "Select Category" }, ...categories];

  const categoryParams = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChange = (categoryId: string | null) => {
    const safeId = categoryId ?? "";

    const selectedCategoryObj = uniqueCategories.find(
      (cat) => cat.id === safeId,
    );

    const categoryName =
      selectedCategoryObj?.id === ""
        ? ""
        : (selectedCategoryObj?.name.toLowerCase() ?? "");

    categoryParams(categoryName);
    setSelectedCategory(safeId);
  };

  return (
    <Combobox
      items={uniqueCategories}
      onValueChange={(val) => handleChange(val)}
      value={selectedCategory}
    >
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="w-64 justify-between font-normal"
          >
            {uniqueCategories.find((cat) => cat.id === selectedCategory)
              ?.name ?? "Select Category"}
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item.id}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default SelectCategory;

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
import { useUpdateParam } from "@/src/hooks/useUpdateParam";
import { apiFetch } from "@/src/lib/api-client";
import { LookupCategory } from "@/src/lib/types/category";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");

  const { data: categories = [] } = useQuery<LookupCategory[]>({
    queryKey: ["categories", "lookup"],
    queryFn: () => apiFetch<LookupCategory[]>("/api/categories/lookup"),
  });

  const uniqueCategories = [{ id: "", name: "Select category" }, ...categories];

  const { updateParam } = useUpdateParam();

  const handleChange = (categoryId: string | null) => {
    const safeId = categoryId ?? "";

    const selectedCategoryObj = uniqueCategories.find(
      (cat) => cat.id === safeId,
    );

    const categoryName =
      selectedCategoryObj?.id === ""
        ? ""
        : (selectedCategoryObj?.name.toLowerCase() ?? "");

    updateParam("category", categoryName);
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
            className="w-48 font-normal justify-between"
            data-icon="inline-start"
          >
            {uniqueCategories.find((cat) => cat.id === selectedCategory)
              ?.name ?? "Select category"}
            <ChevronDown color="gray" />
          </Button>
        }
      />
      <ComboboxContent className="w-auto">
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

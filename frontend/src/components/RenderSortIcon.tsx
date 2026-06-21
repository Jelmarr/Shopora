import { ArrowDown, ArrowUp, ArrowUpNarrowWide } from "lucide-react";
import { useTableSort } from "../hooks/useTableSort";
import { SortByCategory } from "../lib/types/category";

const RenderSortIcon = (columnName: SortByCategory) => {
  const { sortBy, sortOrder } = useTableSort();

  if (sortBy !== columnName) {
    return <ArrowUpNarrowWide size={15} color="gray" />;
  }

  return sortOrder === "asc" ? (
    <ArrowUp size={15} color="gray" />
  ) : (
    <ArrowDown size={15} color="gray" />
  );
};

export default RenderSortIcon;

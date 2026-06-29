import { ArrowDown, ArrowUp, ArrowUpNarrowWide } from "lucide-react";
import { useTableSort } from "../hooks/useTableSort";

const RenderSortIcon = (columnName: string) => {
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

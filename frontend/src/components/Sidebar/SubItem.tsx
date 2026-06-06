import { SubItemProps } from "@/src/lib/types/sidebar.types";
import Link from "next/link";

const SubItem = ({ label, href, active }: SubItemProps) => {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-x-2 pl-9 pr-2.5 py-1.5 rounded-lg text-sm transition-colors",
        active
          ? "text-gray-800 font-medium bg-gray-100"
          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
      ].join(" ")}
    >
      <span className="size-1 rounded-full bg-current opacity-60 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
};

export default SubItem;

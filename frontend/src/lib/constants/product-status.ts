import { Archive, CheckCircle2, FilePen } from "lucide-react";
import { ProductStatus } from "../types/product";

export const PRODUCT_STATUS = [
  { label: "Select a status", value: null },
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
];

export const STATUS_OPTIONS: {
  status: ProductStatus;
  label: string;
  icon: typeof Archive;
}[] = [
  { status: "Active", label: "Set as Active", icon: CheckCircle2 },
  { status: "Draft", label: "Set as Draft", icon: FilePen },
  { status: "Archived", label: "Archive", icon: Archive },
];

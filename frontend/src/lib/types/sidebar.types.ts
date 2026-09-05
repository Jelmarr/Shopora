import { LucideIcon } from "lucide-react";

export interface SubItemProps {
  label: string;
  href: string;
  active: boolean;
}

export interface NavItemProps {
  item: SidebarGroup["items"][number];
}

export interface SidebarItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  subMenu?: { label: string; href: string }[];
}

export interface SidebarGroup {
  groupName: string;
  items: SidebarItem[];
}

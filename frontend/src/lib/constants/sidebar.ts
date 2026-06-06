import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { SidebarGroup } from "../types/sidebar.types";

export const sidebarNavigation: SidebarGroup[] = [
  {
    groupName: "Overview",
    items: [
      { label: "Dashboard", href: "/store/dashboard", icon: LayoutDashboard },
      {
        label: "Analytics",
        icon: BarChart3,
        subMenu: [
          { label: "Sales Performance", href: "/store/analytics/sales" },
          { label: "Inventory Reports", href: "/store/analytics/inventory" },
          { label: "Financial Summaries", href: "/store/analytics/finance" },
        ],
      },
    ],
  },
  {
    groupName: "Management",
    items: [
      {
        label: "Stock & Catalog",
        icon: Package,
        subMenu: [
          { label: "Products", href: "/store/products" },
          { label: "Categories", href: "/store/categories" },
          { label: "Inventory & Lots", href: "/store/inventory" },
          { label: "Suppliers", href: "/store/suppliers" },
        ],
      },
      {
        label: "Sales Flow",
        icon: ShoppingCart,
        subMenu: [
          { label: "Orders", href: "/store/orders" },
          { label: "Transactions", href: "/store/transactions" },
        ],
      },
    ],
  },
  {
    groupName: "System Controls",
    items: [
      { label: "Customers", href: "/store/customers", icon: Users },
      { label: "Notifications", href: "/store/notifications", icon: Bell },
      {
        label: "Settings",
        icon: Settings,
        subMenu: [
          { label: "Staff & Users", href: "/store/settings/users" },
          { label: "Global Configurations", href: "/store/settings/general" },
        ],
      },
    ],
  },
];

export const SIDEBAR_W = 256; // w-64 in px
export const MINI_W = 56; // w-14 in px

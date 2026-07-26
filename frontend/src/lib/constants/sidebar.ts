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
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      {
        label: "Analytics",
        icon: BarChart3,
        subMenu: [
          { label: "Sales Performance", href: "/admin/analytics/sales" },
          { label: "Inventory Reports", href: "/admin/analytics/inventory" },
          { label: "Financial Summaries", href: "/admin/analytics/finance" },
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
          { label: "Products", href: "/admin/products" },
          { label: "Add Product", href: "/admin/add-product" },
          { label: "Categories", href: "/admin/categories" },
        ],
      },
      {
        label: "Sales Flow",
        icon: ShoppingCart,
        subMenu: [
          { label: "Orders", href: "/admin/orders" },
          { label: "Transactions", href: "/admin/transactions" },
        ],
      },
    ],
  },
  {
    groupName: "System Controls",
    items: [
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      {
        label: "Settings",
        icon: Settings,
        subMenu: [
          { label: "Staff & Users", href: "/admin/settings/users" },
          { label: "Global Configurations", href: "/admin/settings/general" },
        ],
      },
    ],
  },
];

export const SIDEBAR_W = 256; // w-64 in px
export const MINI_W = 56; // w-14 in px

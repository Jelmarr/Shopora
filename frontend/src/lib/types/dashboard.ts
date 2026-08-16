export type DashboardRange = "7d" | "30d" | "90d" | "year";

export type RevenuePoint = {
  date: string;
  revenue: number;
  orderCount: number;
};

export type DashboardSummary = {
  totalRevenue: number;
  revenueChangePercent: number;
  totalOrders: number;
  ordersChangePercent: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueOverTime: RevenuePoint[];
};

"use client";

import { useQuery } from "@tanstack/react-query";
import MetricCard from "./components/MetricCard";
import { RevenueChart } from "./components/RevenueChart";
import { apiFetch } from "@/src/lib/api-client";
import { DashboardRange, DashboardSummary } from "@/src/lib/types/dashboard";
import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { formatPrice } from "@/src/lib/utils/price-formatter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RecentOrders from "./components/RecentOrders";

const rangeOptions: { value: DashboardRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "360d", label: "Last year" },
];

const DashboardPage = () => {
  const [range, setRange] = useState<DashboardRange>("30d");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value?.toString()) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const rangeQuery = searchParams.get("range");

  const { data, isLoading } = useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary", rangeQuery],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (rangeQuery) params.append("range", rangeQuery);

      return await apiFetch(`/api/dashboard/summary?${params.toString()}`);
    },
  });

  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Dashboard</h3>

        <Select
          value={range}
          onValueChange={(v) => {
            setRange(v as DashboardRange);
            updateParam("range", v);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {rangeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>
      {isLoading || !data ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-stone-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <MetricCard
              label="Total revenue"
              value={formatPrice(data.totalRevenue)}
              changePercent={data.revenueChangePercent}
            />
            <MetricCard
              label="Orders"
              value={data.totalOrders.toString()}
              changePercent={data.ordersChangePercent}
            />
            <MetricCard
              label="Avg order value"
              value={formatPrice(data.averageOrderValue)}
              changePercent={0}
            />
            <MetricCard
              label="Customers"
              value={data.totalCustomers.toString()}
              changePercent={0}
            />
          </div>
          <div className="mb-6">
            <RevenueChart
              data={data.revenueOverTime}
              range={range}
              revenueChangePercent={data.revenueChangePercent}
            />
          </div>
          <div>
            <RecentOrders orders={data.recentOrders} />
          </div>
        </>
      )}
    </>
  );
};

export default DashboardPage;

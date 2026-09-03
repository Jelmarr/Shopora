"use client";

import { TrendingUp, LineChart } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { RevenuePoint } from "@/src/lib/types/dashboard";

export const description = "A linear area chart";

interface RevenuChartProps {
  data: RevenuePoint[];
  range: string;
  revenueChangePercent: number;
}

export function RevenueChart({
  data,
  range,
  revenueChangePercent,
}: RevenuChartProps) {
  const hasData = data.length > 0 && data.some((point) => point.revenue > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(dateStr: string) =>
                    new Date(dateStr).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />

                <YAxis tickLine={false} axisLine={false} tickMargin={8} />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm text-xs">
                          <p className="font-medium text-foreground">{label}</p>
                          <p className="text-muted-foreground">
                            Revenue:{" "}
                            <span className="font-semibold text-foreground">
                              {payload[0].value}
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Area
                  type="linear"
                  dataKey="revenue"
                  stroke="#18181b"
                  strokeWidth={2}
                  fill="url(#fillValue)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div
            style={{ height: "300px" }}
            className="flex flex-col items-center justify-center gap-2 text-center"
          >
            <LineChart className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">
              No revenue yet
            </p>
            <p className="text-xs text-muted-foreground">
              Revenue will show up here once you start making sales
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasData ? (
          <>
            <div className="flex gap-2 leading-none font-medium">
              Trending up by {revenueChangePercent}% this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total revenue for the last {range}
            </div>
          </>
        ) : (
          <div className="leading-none text-muted-foreground">
            No data for the last {range}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SearchBar from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import { Box } from "lucide-react";
import TablePagination from "@/components/Pagination";
import SelectStatus from "./components/SelectStatus";
import { useSearchParams } from "next/navigation";
import { useUpdateParam } from "@/hooks/useUpdateParam";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { TPagination } from "@/lib/types/pagination";
import OrdersTable from "./components/OrdersTable";

export type OrderSortBy = "date" | "amount";
export type OrderStatus =
  | "paid"
  | "shipped"
  | "received"
  | "refunded"
  | "cancelled";

export type TOrder = {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  total: number;
  status: OrderStatus;
  paidAt: string;
};

export type OrdersResponse = TPagination & { orders: TOrder[] };

const Orders = () => {
  const searchParams = useSearchParams();
  const { handlePageChange } = useUpdateParam();

  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const sortBy = searchParams.get("sortBy" as OrderSortBy) || "newest";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isError } = useQuery<OrdersResponse>({
    queryKey: ["orders", search, status, sortBy, sortOrder, page],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (sortBy) params.append("sortBy", sortBy);
      if (sortOrder) params.append("sortOrder", sortOrder);
      if (page) params.append("page", page.toString());

      return await apiFetch(`/api/orders?${params.toString()}`, {
        signal,
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const orders = isError ? [] : (data?.orders ?? []);
  const currentPage = data?.currentPage ?? 1;
  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className="px-6 py-8">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Box size={15} /> Orders
          </h3>
        </div>
      </header>
      <main>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex gap-2">
              <SearchBar placeholder="Search customer name or email..." />
              <SelectStatus />
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="px-6">
            <OrdersTable orders={orders} />
          </CardContent>
          <CardFooter className="bg-white flex flex-col items-center justify-between gap-3 h-24 sm:flex-row">
            <TablePagination
              itemLabel="orders"
              onPageChange={handlePageChange}
              currentPage={currentPage}
              totalCount={totalCount}
              totalPages={totalPages}
            />
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Orders;

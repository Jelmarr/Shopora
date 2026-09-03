import RenderSortIcon from "@/components/RenderSortIcon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TOrder } from "../Orders";
import { formatDate } from "@/lib/utils/date";
import { formatPrice } from "@/lib/utils/price-formatter";
import { Badge } from "@/components/ui/badge";
import { useTableSort } from "@/hooks/useTableSort";

const OrdersTable = ({ orders }: { orders: TOrder[] }) => {
  const { handleSort } = useTableSort();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("amount")}>
              <div className="flex items-center gap-1 cursor-pointer select-none">
                Amount {RenderSortIcon("amount")}
              </div>
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead onClick={() => handleSort("date")}>
              <div className="flex items-center gap-1 cursor-pointer select-none">
                Date {RenderSortIcon("date")}
              </div>
            </TableHead>
            <TableHead className="w-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <p className="font-medium text-sm">No orders found</p>
                  <p className="text-xs">Customer order will appear here.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium max-w-50">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {order.customerEmail}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.shippingAddress}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <Badge variant="secondary" className="gap-1.5 font-normal">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          order.status === "paid"
                            ? "bg-green-500"
                            : order.status === "refunded"
                              ? "bg-orange-500"
                              : "bg-muted-foreground"
                        }`}
                      />
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate.dateTime(order.paidAt)}
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default OrdersTable;

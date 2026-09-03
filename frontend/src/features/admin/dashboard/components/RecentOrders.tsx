import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TOrder } from "../../orders/Orders";
import { formatPrice } from "@/lib/utils/price-formatter";
import { formatDate } from "@/lib/utils/date";
import { Badge } from "@/components/ui/badge";
import { Ellipsis } from "lucide-react";

const RecentOrders = ({
  orders,
}: {
  orders: Omit<TOrder, "shippingAddress">[];
}) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center border-b">
        <CardTitle>Recent Orders</CardTitle>
        <p className="text-xs text-muted-foreground hover:underline hover:text-foreground cursor-pointer transition-colors duration-300">
          View all
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
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
                      <Badge
                        variant="secondary"
                        className="gap-1.5 font-normal"
                      >
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
                    <TableCell className="text-right">
                      <Ellipsis size={15} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;

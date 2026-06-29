import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { TProduct } from "@/src/lib/types/product";

const ProductsTable = ({ products }: { products: TProduct[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex items-center gap-1 cursor-pointer select-none">
              Product
            </div>
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-32 text-center text-muted-foreground"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="font-medium text-sm">No products found</p>
                <p className="text-xs">
                  Get started by creating your first product.
                </p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">{product.name}</div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <Badge variant="secondary" className="gap-1.5 font-normal">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        product.status === "Active"
                          ? "bg-green-500"
                          : product.status === "Archived"
                            ? "bg-orange-500"
                            : "bg-muted-foreground"
                      }`}
                    />
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.isTrackInventory
                    ? product.stock || 0
                    : "Inventory not tracked"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.categoryName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  ₱{product.price}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;

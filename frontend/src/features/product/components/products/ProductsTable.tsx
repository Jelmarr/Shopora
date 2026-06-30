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
import { ExternalLink, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { ProductStatus, TProduct } from "@/src/lib/types/product";
import RenderSortIcon from "@/src/components/RenderSortIcon";
import { useTableSort } from "@/src/hooks/useTableSort";
import { formatDate } from "@/src/lib/utils/date";
import { Separator } from "@/src/components/ui/separator";
import { useState } from "react";
import { AlertDialog } from "@/src/components/ui/alert-dialog";
import { DeleteDialogContent } from "./DeleteDialogContent";
import StatusUpdateDialogContent from "./StatusUpdateDialogContent";
import { STATUS_OPTIONS } from "@/src/lib/constants/product-status";

export type TProductToDelete = Pick<TProduct, "id" | "name">;
export type TProductStatusUpdate = Pick<TProduct, "id" | "status" | "name">;

const ProductsTable = ({ products }: { products: TProduct[] }) => {
  const [productToDelete, setProductToDelete] =
    useState<TProductToDelete | null>(null);
  const [productStatusToUpdate, setProductStatusToUpdate] =
    useState<TProductStatusUpdate | null>(null);
  const [status, setStatus] = useState<ProductStatus | null>(null);

  const { handleSort } = useTableSort();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("name")}>
              <div className="flex items-center gap-1 cursor-pointer select-none">
                Product {RenderSortIcon("name")}
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead onClick={() => handleSort("stock")}>
              <div className="flex items-center gap-1 cursor-pointer select-none">
                Inventory {RenderSortIcon("stock")}
              </div>
            </TableHead>

            <TableHead>Category</TableHead>
            <TableHead onClick={() => handleSort("createdAt")}>
              <div className="flex items-center gap-1 cursor-pointer select-none">
                Created At {RenderSortIcon("createdAt")}
              </div>
            </TableHead>
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
                    <div className="flex items-center gap-2">
                      {product.name}
                    </div>
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
                    {formatDate.short(product.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="gap-2 flex flex-col"
                      >
                        {STATUS_OPTIONS.filter(
                          (option) => option.status !== product.status,
                        ).map((option) => (
                          <DropdownMenuItem
                            key={option.status}
                            className="gap-2"
                            onClick={() => {
                              setProductStatusToUpdate(product);
                              setStatus(option.status);
                            }}
                          >
                            <option.icon className="h-3.5 w-3.5" />
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          onClick={() => setProductToDelete(product)}
                        >
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

      <AlertDialog
        open={productToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setProductToDelete(null);
        }}
      >
        <DeleteDialogContent
          products={products}
          setProductToDelete={setProductToDelete}
          productToDelete={productToDelete}
        />
      </AlertDialog>

      <AlertDialog
        open={productStatusToUpdate !== null}
        onOpenChange={(open) => {
          if (!open) setProductStatusToUpdate(null);
        }}
      >
        <StatusUpdateDialogContent
          status={status}
          productStatusToUpdate={productStatusToUpdate}
          setProductStatusToUpdate={setProductStatusToUpdate}
          products={products}
        />
      </AlertDialog>
    </>
  );
};

export default ProductsTable;

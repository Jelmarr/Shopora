"use client";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { TCategory } from "@/src/lib/types/category";
import SearchBar from "@/src/components/SearchBar";
import { useTableSort } from "@/src/hooks/useTableSort";
import RenderSortIcon from "@/src/components/RenderSortIcon";
import { useState } from "react";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { ParentLookup } from "../Category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api-client";
import { notify } from "@/src/lib/toast";

type TableCardProps = {
  categories: TCategory[];
  parentLookups: ParentLookup[];
  totalCount: number;
};

const TableCard = ({
  categories,
  totalCount,
  parentLookups,
}: TableCardProps) => {
  const queryClient = useQueryClient();
  const { handleSort } = useTableSort();

  const [activeEditCategory, setActiveEditCategory] =
    useState<TCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<TCategory | null>(
    null,
  );

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiFetch(`/api/category/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      const name = categories.find((c) => c.id === id)?.name ?? "Category";
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notify.success(`${name} has been soft-deleted.`);
      setCategoryToDelete(null);
    },
    onError: (err: Error) => {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove this category.";

      notify.error(errorMessage);
    },
  });

  const handleDeleteConfirmation = () => {
    if (categoryToDelete) {
      deleteMutation.mutate(categoryToDelete.id);
    }
  };

  return (
    <>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">All Categories</CardTitle>
            <CardDescription>{totalCount} categories total</CardDescription>
          </div>
          <SearchBar placeholder="Search categories..." />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")}>
                <div className="flex items-center gap-1 cursor-pointer select-none">
                  Name {RenderSortIcon("name")}
                </div>
              </TableHead>
              <TableHead>Parent</TableHead>
              <TableHead onClick={() => handleSort("productcount")}>
                <div className="flex items-center gap-1 cursor-pointer select-none">
                  Products {RenderSortIcon("productcount")}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("isactive")}>
                <div className="flex items-center gap-1 cursor-pointer select-none">
                  Status {RenderSortIcon("isactive")}
                </div>
              </TableHead>
              <TableHead className="w-12 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="font-medium text-sm">No categories found</p>
                    <p className="text-xs">
                      Get started by creating your first product category.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => {
                const hasSubcategories = categories.some(
                  (cat) => cat.parentCategoryId === category.id,
                );

                return (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="text-xs italic">
                        {category.parentCategoryId
                          ? category.parentCategoryName
                          : "Top-level"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {category.productCount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="gap-1.5 font-normal"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            category.status === "Active"
                              ? "bg-green-500"
                              : "bg-muted-foreground"
                          }`}
                        />
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => setActiveEditCategory(category)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 text-destructive focus:text-destructive"
                            disabled={hasSubcategories}
                            onClick={() => setCategoryToDelete(category)}
                            title={
                              hasSubcategories
                                ? "Cannot delete category containing active subcategories"
                                : undefined
                            }
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete{" "}
                            {hasSubcategories && (
                              <span className="text-[10px] opacity-60">
                                (Locked)
                              </span>
                            )}
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
      </CardContent>

      {activeEditCategory && (
        <UpdateCategoryModal
          category={activeEditCategory}
          isOpen={activeEditCategory !== null}
          onOpenChange={(open) => {
            if (!open) setActiveEditCategory(null);
          }}
          parentLookups={parentLookups}
        />
      )}

      <AlertDialog
        open={categoryToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will safely soft-delete{" "}
              <strong>{categoryToDelete?.name}</strong> from your active store
              organizational registry trees. This decision can be updated again
              inside management menus later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteConfirmation();
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Removing..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TableCard;

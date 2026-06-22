"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { TCategory } from "@/src/lib/types/category";
import SearchBar from "@/src/components/SearchBar";
import { useTableSort } from "@/src/hooks/useTableSort";
import RenderSortIcon from "@/src/components/RenderSortIcon";
import { useState } from "react";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { ParentLookup } from "../Category";

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
  const [activeEditCategory, setActiveEditCategory] =
    useState<TCategory | null>(null);

  const { handleSort } = useTableSort();

  return (
    <>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">All Categories</CardTitle>
            <CardDescription>{totalCount} categories total</CardDescription>
          </div>

          <SearchBar />
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
              categories.map((category) => (
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
                    <Badge variant="secondary" className="gap-1.5 font-normal">
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
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
    </>
  );
};

export default TableCard;

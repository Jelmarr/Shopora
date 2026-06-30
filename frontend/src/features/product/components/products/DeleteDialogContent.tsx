import { Trash2Icon } from "lucide-react";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api-client";
import { Dispatch } from "react";
import { notify } from "@/src/lib/toast";
import { TProductToDelete } from "./ProductsTable";

export function DeleteDialogContent({
  products,
  setProductToDelete,
  productToDelete,
}: {
  products: TProductToDelete[];
  setProductToDelete: Dispatch<TProductToDelete | null>;
  productToDelete: TProductToDelete | null;
}) {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/products/${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: (_, id) => {
      const productName =
        products.find((product) => product.id === id)?.name ?? "product";

      queryClient.invalidateQueries({ queryKey: ["products"] });
      notify.success(`${productName} has been deleted.`);
      setProductToDelete(null);
    },

    onError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete product";

      notify.error(errorMessage);
    },
  });

  const handleDeleteProduct = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete.id);
    }
  };

  return (
    <AlertDialogContent size="sm">
      <AlertDialogHeader>
        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
          <Trash2Icon />
        </AlertDialogMedia>
        <AlertDialogTitle>Delete product?</AlertDialogTitle>
        <AlertDialogDescription>
          This will delete <strong>{productToDelete?.name}</strong> from your
          active store organizational registry trees. This decision cannot be
          undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          variant="outline"
          onClick={() => setProductToDelete(null)}
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            handleDeleteProduct();
          }}
          disabled={deleteProductMutation.isPending}
        >
          {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

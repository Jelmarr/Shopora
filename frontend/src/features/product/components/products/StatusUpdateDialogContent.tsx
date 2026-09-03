import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiFetch } from "@/lib/api-client";
import { notify } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TProductStatusUpdate } from "./ProductsTable";
import { Dispatch, SetStateAction } from "react";
import { ProductStatus } from "@/lib/types/product";
import Spinner from "@/components/Spinner";

const StatusUpdateDialogContent = ({
  products,
  setProductStatusToUpdate,
  productStatusToUpdate,
  status,
}: {
  products: TProductStatusUpdate[];
  productStatusToUpdate: TProductStatusUpdate | null;
  setProductStatusToUpdate: Dispatch<
    SetStateAction<TProductStatusUpdate | null>
  >;
  status: ProductStatus | null;
}) => {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/products/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: status }),
      });
    },

    onSuccess: (_, id) => {
      const productName = products.find((p) => p.id === id)?.name ?? "product";

      queryClient.invalidateQueries({ queryKey: ["products"] });
      notify.success(`${productName} status has been set to ${status}`);
      setProductStatusToUpdate(null);
    },

    onError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update product";
      notify.error(errorMessage);
    },
  });

  const handleStatusUpdate = () => {
    if (productStatusToUpdate) {
      updateStatusMutation.mutate(productStatusToUpdate.id);
    }
  };

  return (
    <AlertDialogContent size="sm">
      <AlertDialogHeader>
        <AlertDialogTitle>
          Set product as {status?.toLowerCase()}
        </AlertDialogTitle>
        <AlertDialogDescription>
          Setting product as <strong>{status?.toLowerCase()}</strong> will{" "}
          {status === "Active"
            ? "make them available to your store."
            : status === "Archived"
              ? "hide them from your store and Shopora admin. You’ll find them using the status filter in your product list."
              : "hide them from your store."}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            handleStatusUpdate();
          }}
          disabled={updateStatusMutation.isPending}
        >
          {updateStatusMutation.isPending ? (
            <Spinner label="Updating..." />
          ) : (
            `Set as ${status}`
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default StatusUpdateDialogContent;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api-client";
import { notify } from "@/src/lib/toast";

import { TCategory } from "@/src/lib/types/category";
import { ParentLookup } from "../Category";
import { CategoryInput } from "../schemas/CategorySchema";
import CategoryForm from "./CategoryForm";
import { handleFormError } from "@/src/lib/form-errors";
import { UseFormSetError } from "react-hook-form";

interface UpdateCategoryModalProps {
  category: TCategory;
  parentLookups: ParentLookup[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateCategoryModal = ({
  category,
  parentLookups,
  isOpen,
  onOpenChange,
}: UpdateCategoryModalProps) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (data: CategoryInput) => {
      const payload = {
        id: category.id,
        ...data,
        parentCategoryId:
          data.parentCategoryId === "" ? null : data.parentCategoryId,
      };

      return await apiFetch(`/api/category/${category.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
  });

  const handleFormSubmit = async (
    data: CategoryInput,
    formSetError: UseFormSetError<CategoryInput>,
  ) => {
    try {
      await updateMutation.mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onOpenChange(false);
      notify.success("Category successfully updated!");
    } catch (err) {
      handleFormError(err, formSetError);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-110">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Modify the properties of this product organization node.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          parentLookups={parentLookups}
          initialValues={{
            name: category.name,
            parentCategoryId: category.parentCategoryId ?? "",
            description: category.description ?? "",
          }}
          submitButtonText="Save Changes"
          onSubmit={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;

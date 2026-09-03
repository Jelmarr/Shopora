import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import { notify } from "@/lib/toast";
import { handleFormError } from "@/lib/form-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CategoryInput } from "../schemas/CategorySchema";
import CategoryForm from "./CategoryForm";
import { ParentLookup } from "../Category";
import { UseFormSetError } from "react-hook-form";

const AddCategoryModal = ({
  parentLookups,
}: {
  parentLookups: ParentLookup[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: async (data: CategoryInput) => {
      const payload = {
        ...data,
        parentCategoryId:
          data.parentCategoryId === "" ? null : data.parentCategoryId,
      };

      return await apiFetch(`/api/category/`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
  });

  const handleFormSubmit = async (
    data: CategoryInput,
    formSetError: UseFormSetError<CategoryInput>,
  ) => {
    try {
      await createCategoryMutation.mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsOpen(false);
      notify.success("Category successfully created!");
    } catch (err) {
      handleFormError(err, formSetError);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-110">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category to organize your products.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          onSubmit={handleFormSubmit}
          parentLookups={parentLookups}
          submitButtonText="Add Category"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;

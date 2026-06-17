import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { apiFetch } from "@/src/lib/api-client";
import { notify } from "@/src/lib/toast";
import { handleFormError } from "@/src/lib/form-errors";
import { Category } from "../Category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type AddCategoryType = Omit<Category, "id">;

const AddCategoryModal = ({ categories }: { categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    setError,
    reset,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<AddCategoryType>();

  const createCategoryMutation = useMutation({
    mutationFn: async (data: AddCategoryType) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      setIsOpen(false);
      reset();
      notify.success("Category successfully created!");
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const onSubmit = (data: AddCategoryType) => {
    createCategoryMutation.mutate(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-2">
            {/* Name */}
            <div className="grid gap-1.5">
              <Label htmlFor="category-name">
                Category Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category-name"
                placeholder="e.g. Footwear"
                {...register("name")}
              />
            </div>

            {/* Parent Category */}
            <div className="grid gap-1.5">
              <Label htmlFor="parent-category">Parent Category</Label>
              <Controller
                name="parentCategoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger id="parent-category">
                      <SelectValue placeholder="None (top-level category)" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length <= 0 ? (
                        <p>No parent categories yet.</p>
                      ) : (
                        categories
                          .filter((c) => !c.parentCategoryId)
                          .map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-[11px] text-muted-foreground">
                Leave empty to create a top-level category.
              </p>
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <Label htmlFor="category-description">Description</Label>
              <Input
                id="category-description"
                placeholder="Optional short description"
                {...register("description")}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => reset()}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button size="sm" type="submit">
              Create Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { apiFetch } from "@/src/lib/api-client";
import { notify } from "@/src/lib/toast";
import { handleFormError } from "@/src/lib/form-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ParentLookup } from "../Category";
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
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  CreateCategoryInput,
  createCategorySchema,
} from "../schemas/AddCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";

const AddCategoryModal = ({
  parentLookups,
}: {
  parentLookups: ParentLookup[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    setError,
    reset,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      parentCategoryId: "",
      description: "",
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: CreateCategoryInput) => {
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

  const onSubmit = (data: CreateCategoryInput) => {
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
                className={
                  errors.name
                    ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
                    : "border-input focus-within:ring-1 focus-within:ring-ring"
                }
              />
              {errors.name && (
                <p className="text-xs font-medium text-destructive">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            {/* Parent Category */}
            <div className="grid gap-1.5">
              <Label htmlFor="parent-category">Parent Category</Label>
              <Controller
                name="parentCategoryId"
                control={control}
                render={({ field }) => (
                  <Combobox
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    items={parentLookups}
                  >
                    <ComboboxInput placeholder="Select parent category" />
                    <ComboboxContent
                      alignOffset={-28}
                      className="w-60 pointer-events-auto"
                    >
                      <ComboboxEmpty>No parent categories found.</ComboboxEmpty>
                      <ComboboxList>
                        {(cat) => (
                          <ComboboxItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
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

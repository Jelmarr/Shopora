import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/src/components/ui/combobox";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Controller, useForm, UseFormSetError } from "react-hook-form";
import { CategoryInput, categorySchema } from "../schemas/CategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParentLookup } from "../Category";
import { DialogFooter, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/Spinner";

interface CategoryFormProps {
  parentLookups: ParentLookup[];
  initialValues?: CategoryInput;
  onSubmit: (
    data: CategoryInput,
    setError: UseFormSetError<CategoryInput>,
  ) => Promise<void>;
  submitButtonText: string;
}

const CategoryForm = ({
  parentLookups,
  initialValues,
  onSubmit,
  submitButtonText,
}: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    control,
    reset,
    setError,
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      parentCategoryId: "",
    },
  });

  const handleLocalSubmit = (data: CategoryInput) => {
    onSubmit(data, setError);
  };

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
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
                value={
                  parentLookups.find((cat) => cat.id === field.value)?.name ??
                  field.value ??
                  ""
                }
                items={parentLookups}
                modal={false}
              >
                <ComboboxInput placeholder="Select parent category" />
                <ComboboxContent
                  alignOffset={-28}
                  className="w-60 pointer-events-auto"
                >
                  <ComboboxEmpty>No parent categories found.</ComboboxEmpty>
                  <ComboboxList>
                    {(cat) => (
                      <ComboboxItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            )}
          />

          {errors.parentCategoryId ? (
            <p className="text-xs font-medium text-destructive">
              {errors.parentCategoryId.message}
            </p>
          ) : (
            <p className="text-[11px] text-muted-foreground">
              Leave empty to create a top-level category.
            </p>
          )}
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
        <Button size="sm" type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? <Spinner label="Submitting..." /> : submitButtonText}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CategoryForm;

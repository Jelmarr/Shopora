import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api-client";
import { LookupCategory } from "@/lib/types/category";
import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";

const BasicInformation = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { data: categoriesList = [] } = useQuery<LookupCategory[]>({
    queryKey: ["categories", "lookup"],
    queryFn: () => apiFetch<LookupCategory[]>(`/api/categories/lookup`),
  });

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Basic Information</CardTitle>
        <CardDescription>Core details shown to customers.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Name */}
        <div className="grid gap-1.5">
          <Label
            htmlFor="name"
            className={errors.name ? "text-destructive" : ""}
          >
            Product Name <span className="text-destructive">*</span>
          </Label>

          <Input
            id="name"
            className={
              errors.name
                ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
                : "border-input focus-within:ring-1 focus-within:ring-ring"
            }
            placeholder="e.g. Classic White Sneakers"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs font-medium text-destructive">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="grid w-full gap-1.5">
          <Label
            htmlFor="categoryId"
            className={errors.categoryId ? "text-destructive" : ""}
          >
            Category <span className="text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Combobox
                onValueChange={field.onChange}
                value={
                  categoriesList.find((cat) => cat.id === field.value)?.name ??
                  field.value ??
                  ""
                }
                items={categoriesList}
                modal={false}
              >
                <ComboboxInput placeholder="Select categories" />
                <ComboboxContent
                  alignOffset={-28}
                  className="w-60 pointer-events-auto"
                >
                  <ComboboxEmpty>No categories found.</ComboboxEmpty>
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
          {errors.categoryId && (
            <p className="text-xs font-medium text-destructive">
              {errors.categoryId.message as string}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformation;

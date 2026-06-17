import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiFetch } from "@/src/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";
import { Category } from "../../category/Category";

const BasicInformation = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => apiFetch<Category[]>(`/api/categories`),
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
          <Label htmlFor="name">
            Product Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            className={
              errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  id="categoryId"
                  className={`w-full ${errors.categoryId ? "border-destructive focus:ring-destructive" : ""}`}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.length === 0 ? (
                    <p>No categories yet.</p>
                  ) : (
                    categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
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

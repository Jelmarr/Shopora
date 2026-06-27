import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Label } from "@/src/components/ui/label";
import { Layers, Star } from "lucide-react";
import { Switch } from "@/src/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/src/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";

type ProductStatus = "Draft" | "Active" | "Archived";

const STATUS_OPTIONS: { value: ProductStatus; color: string }[] = [
  { value: "Draft", color: "bg-yellow-400" },
  { value: "Active", color: "bg-green-500" },
  { value: "Archived", color: "bg-muted-foreground" },
];

const StatusAndVisibility = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Status & Visibility</CardTitle>
        <CardDescription>
          Control where and how this product appears in the store.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        {/* 1. Status Dropdown */}
        <div className="grid gap-1.5">
          <Label
            htmlFor="status"
            className={errors.status ? "text-destructive" : ""}
          >
            Status
          </Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || "Draft"}
              >
                <SelectTrigger
                  id="status"
                  className={`w-full ${errors.status ? "border-destructive focus:ring-destructive" : ""}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(({ value, color }) => (
                    <SelectItem key={value} value={value}>
                      <span className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${color}`} />
                        {value}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-xs font-medium text-destructive">
              {errors.status.message as string}
            </p>
          )}
        </div>

        {/* 3. Is Featured Switch */}
        <FieldGroup className="w-full">
          <Controller
            control={control}
            name="isFeatured"
            render={({ field }) => (
              <FieldLabel htmlFor="is-featured">
                <Field orientation="horizontal">
                  <FieldContent className="ml-2">
                    <div className="flex items-center gap-4">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <FieldTitle>Featured Product</FieldTitle>
                        <FieldDescription className="text-[12px]">
                          Highlight this product on the storefront homepage.
                        </FieldDescription>
                      </div>
                    </div>
                  </FieldContent>
                  <Switch
                    id="is-featured"
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              </FieldLabel>
            )}
          />
          {errors.isFeatured && (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.isFeatured.message as string}
            </p>
          )}
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default StatusAndVisibility;

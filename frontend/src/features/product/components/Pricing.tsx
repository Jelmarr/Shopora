import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/src/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";
import { PhilippinePeso } from "lucide-react";
import { useFormContext } from "react-hook-form";

const Pricing = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const hasVariants = watch("hasVariants");

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Pricing</CardTitle>
        <CardDescription>
          {hasVariants
            ? "Default pricing used unless a variant overrides it."
            : "Set the selling price, an optional compare-at price, and your cost."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          {/* 1. Cost Price */}
          <Field>
            <FieldLabel
              htmlFor="costPrice"
              className={errors.costPrice ? "text-destructive" : ""}
            >
              Cost Price
            </FieldLabel>
            <InputGroup
              className={`flex items-center border rounded-md ${
                errors.costPrice
                  ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
                  : "border-input focus-within:ring-1 focus-within:ring-ring"
              }`}
            >
              <InputGroupInput
                id="costPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`pl-7 ${errors.costPrice ? "border-destructive focus-visible:ring-destructive" : ""}`}
                {...register("costPrice")}
              />
              <InputGroupAddon align="inline-start">
                <PhilippinePeso
                  className={
                    errors.costPrice
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                />
              </InputGroupAddon>
            </InputGroup>
            {errors.costPrice ? (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.costPrice.message as string}
              </p>
            ) : (
              <FieldDescription className="text-[11px] mt-1">
                Not shown to customers. Used for margin calculations.
              </FieldDescription>
            )}
          </Field>

          {/* 2. CompareAtPrice */}
          <Field>
            <FieldLabel
              htmlFor="compareAtPrice"
              className={errors.compareAtPrice ? "text-destructive" : ""}
            >
              Compare-at Price
            </FieldLabel>
            <InputGroup
              className={`flex items-center border rounded-md ${
                errors.compareAtPrice
                  ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
                  : "border-input focus-within:ring-1 focus-within:ring-ring"
              }`}
            >
              <InputGroupInput
                id="compareAtPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`pl-7`}
                {...register("compareAtPrice")}
              />
              <InputGroupAddon align="inline-start">
                <PhilippinePeso
                  className={
                    errors.compareAtPrice
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                />
              </InputGroupAddon>
            </InputGroup>

            {errors.compareAtPrice ? (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.compareAtPrice.message as string}
              </p>
            ) : (
              <FieldDescription className="text-[11px] mt-1">
                Shows a strikethrough &quot;was&quot; price when set.
              </FieldDescription>
            )}
          </Field>
        </div>

        {/* 3. Price */}
        <Field>
          <FieldLabel
            htmlFor="price"
            className={errors.price ? "text-destructive" : ""}
          >
            Price <span className="text-destructive">*</span>
          </FieldLabel>
          <InputGroup
            className={`flex items-center border rounded-md ${
              errors.price
                ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
                : "border-input focus-within:ring-1 focus-within:ring-ring"
            }`}
          >
            <InputGroupInput
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              className={`pl-7 ${errors.price ? "border-destructive focus-visible:ring-destructive" : ""}`}
              {...register("price")}
            />
            <InputGroupAddon align="inline-start">
              <PhilippinePeso
                className={
                  errors.price ? "text-destructive" : "text-muted-foreground"
                }
              />
            </InputGroupAddon>
          </InputGroup>
          {errors.price && (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.price.message as string}
            </p>
          )}
        </Field>
      </CardContent>
    </Card>
  );
};

export default Pricing;

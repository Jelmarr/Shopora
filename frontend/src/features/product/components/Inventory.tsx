import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormContext } from "react-hook-form";

const Inventory = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const hasVariants = watch("hasVariants");

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Inventory</CardTitle>
        <CardDescription>
          Stock levels and inventory tracking behaviour.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        {!hasVariants && (
          <div className="grid grid-cols-2 gap-4">
            {/* SKU */}
            <div className="grid gap-1.5">
              <Label
                htmlFor="sku"
                className={errors.sku ? "text-destructive" : ""}
              >
                SKU <span className="text-destructive">*</span>
              </Label>
              <Input
                id="sku"
                placeholder="e.g. SHP-0042-WHT"
                className={
                  errors.sku
                    ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
                    : "border-input focus-within:ring-1 focus-within:ring-ring"
                }
                {...register("sku")}
              />
              {errors.sku && (
                <p className="text-xs font-medium text-destructive">
                  {errors.sku.message as string}
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="grid gap-1.5">
              <Label
                htmlFor="stock"
                className={errors.stock ? "text-destructive" : ""}
              >
                Stock Quantity <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                step="0.01"
                className={
                  errors.stock
                    ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
                    : "border-input focus-within:ring-1 focus-within:ring-ring"
                }
                {...register("stock")}
              />
              {errors.stock && (
                <p className="text-xs font-medium text-destructive">
                  {errors.stock.message as string}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Low Stock Threshold */}
        <div className="grid gap-1.5">
          <Label
            htmlFor="lowStockThreshold"
            className={errors.lowStockThreshold ? "text-destructive" : ""}
          >
            Low Stock Threshold
          </Label>
          <Input
            id="lowStockThreshold"
            type="number"
            placeholder="5"
            className={`w-full ${
              errors.lowStockThreshold
                ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
                : "border-input focus-within:ring-1 focus-within:ring-ring"
            }`}
            {...register("lowStockThreshold")}
          />
          {errors.lowStockThreshold ? (
            <p className="text-xs font-medium text-destructive">
              {errors.lowStockThreshold.message as string}
            </p>
          ) : (
            <p className="text-[11px] text-muted-foreground">
              Triggers a low-stock alert when stock drops to this level.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Inventory;

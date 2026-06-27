import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";

import { Controller, useFormContext } from "react-hook-form";

const Inventory = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const isTrackInventory = watch("isTrackInventory");

  return (
    <Card>
      <CardHeader className="pb-4 flex items-center justify-between">
        <CardTitle className="text-base">Inventory</CardTitle>
        <div className="flex items-center space-x-2">
          <Label
            htmlFor="track-inventory"
            className="text-[11px] text-muted-foreground"
          >
            Inventory {isTrackInventory ? "" : "not"} tracked
          </Label>
          <Controller
            control={control}
            name="isTrackInventory"
            render={({ field }) => (
              <Switch
                size="sm"
                id="isTrackInventory"
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-5">
        {/* SKU */}
        <div className="grid gap-1.5">
          <Label htmlFor="sku">SKU</Label>
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
        {isTrackInventory && (
          <div className="grid grid-cols-2 gap-4">
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

            {/* Stock */}
            <div className="grid gap-1.5 mb-9.5">
              <Label htmlFor="stock">Stock Quantity</Label>
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
      </CardContent>
    </Card>
  );
};

export default Inventory;

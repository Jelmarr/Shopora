"use client";

import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ChevronDown, ChevronRight } from "lucide-react";
import { VariantForm, VariantOption } from "@/src/lib/types/product";

function buildCombinations(options: VariantOption[]): Record<string, string>[] {
  const usable = options.filter(
    (opt) => opt.name.trim() && opt.values.length > 0,
  );
  if (usable.length === 0) return [];

  return usable.reduce<Record<string, string>[]>((acc, option) => {
    const values = option.values
      .map((v: string | { value: string }) =>
        typeof v === "string" ? v : v.value,
      )
      .filter(Boolean);

    if (values.length === 0) return acc;

    if (acc.length === 0) {
      return values.map((v) => ({ [option.name]: v }));
    }
    return acc.flatMap((combo) =>
      values.map((v) => ({ ...combo, [option.name]: v })),
    );
  }, []);
}

function combinationKey(combo: Record<string, string>) {
  return Object.entries(combo)
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
}

const EMPTY_OPTIONS: VariantOption[] = [];

const VariantTable = () => {
  const { control, register, watch, setValue } = useFormContext();

  const watchedOptions = useWatch({ control, name: "variantOptions" });
  const variantOptions: VariantOption[] = watchedOptions ?? EMPTY_OPTIONS;

  const watchedVariants = useWatch({ control, name: "variants" }) as
    | VariantForm[]
    | undefined;

  const totalInventory = useMemo(() => {
    if (!watchedVariants) return 0;
    return watchedVariants.reduce(
      (sum, v) => sum + (Number(v?.available) || 0),
      0,
    );
  }, [watchedVariants]);

  const defaultPriceValue = watch("price");
  const defaultStockQuantity = watch("stock");

  const optionNames = useMemo(() => {
    return variantOptions.filter(
      (o) => o?.name?.trim() && o?.values?.length > 0,
    );
  }, [variantOptions]);

  const { fields, replace } = useFieldArray({
    control,
    name: "variants",
  });

  const [groupByOverride, setGroupByOverride] = useState<string | null>(null);

  const groupBy = useMemo(() => {
    if (
      groupByOverride &&
      optionNames.some((o) => o.name === groupByOverride)
    ) {
      return groupByOverride;
    }
    return optionNames[0]?.name ?? "";
  }, [groupByOverride, optionNames]);

  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set(),
  );

  // Regenerate variant rows whenever options/values change — preserving
  // existing sku/price/available for combinations that still exist.
  useEffect(() => {
    const combinations = buildCombinations(optionNames);

    const existingByKey = new Map(
      (fields as unknown as (VariantForm & { id: string })[]).map((f) => [
        combinationKey(f.combination),
        f,
      ]),
    );

    const nextRows: VariantForm[] = combinations.map((combo) => {
      const existing = existingByKey.get(combinationKey(combo));

      return existing
        ? {
            combination: combo,
            sku: existing.sku ?? "",
            price: (existing.price ?? Number(defaultPriceValue)) || 0,
            available: existing.available ?? 0,
          }
        : {
            combination: combo,
            sku: "",
            price: Number(defaultPriceValue) || 0,
            available: 0,
          };
    });

    const sameLength = nextRows.length === fields.length;
    const sameContent =
      sameLength &&
      nextRows.every(
        (row, i) =>
          combinationKey(row.combination) ===
          combinationKey((fields[i] as unknown as VariantForm).combination),
      );

    if (!sameContent) {
      replace(nextRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionNames, defaultPriceValue]); // Added defaultPriceValue here so new prices sync down if structure updates

  useEffect(() => {
    if (fields.length > 0) {
      const currentFirstValue = watch(`variants.0.available`);
      const targetValue = Number(defaultStockQuantity) || 0;

      // Only update if it actually changed to prevent endless re-render loops
      if (currentFirstValue !== targetValue) {
        setValue(`variants.0.available`, targetValue, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }
  }, [defaultStockQuantity, fields.length, setValue, watch]);

  const variants = fields as unknown as (VariantForm & { id: string })[];

  const groups = useMemo(() => {
    const map = new Map<
      string,
      (VariantForm & { id: string; absoluteIndex: number })[]
    >();
    variants.forEach((variant, absoluteIndex) => {
      const key = variant.combination[groupBy] ?? "—";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ ...variant, absoluteIndex });
    });
    return map;
  }, [variants, groupBy]);

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const groupAggregate = (rows: VariantForm[]) => {
    const totalAvailable = rows.reduce((sum, r) => sum + r.available, 0);
    const allSamePrice = rows.every((r) => r.price === rows[0].price);
    const allSameSku = rows.every((r) => r.sku === rows[0].sku);
    return {
      totalAvailable,
      price: allSamePrice ? rows[0].price : null,
      sku: allSameSku ? rows[0].sku : "",
    };
  };

  if (optionNames.length === 0) return null;

  return (
    <div className="rounded-lg border bg-background">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Group by</span>
          <Select value={groupBy} onValueChange={setGroupByOverride}>
            <SelectTrigger className="h-8 w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {optionNames.map((opt) => (
                <SelectItem key={opt.name} value={opt.name}>
                  {opt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_140px_120px_80px] items-center gap-3 border-b bg-muted/30 px-4 py-2.5 text-xs font-medium text-muted-foreground">
        <span>Variant</span>
        <span>SKU</span>
        <span>Price</span>
        <span>Available</span>
      </div>

      <div>
        {Array.from(groups.entries()).map(([groupValue, rows]) => {
          const isCollapsed = collapsedGroups.has(groupValue);
          const agg = groupAggregate(rows);

          return (
            <div key={groupValue} className="border-b last:border-b-0">
              <div className="grid grid-cols-[1fr_140px_120px_80px] items-center gap-3 px-4 py-2.5">
                <button
                  type="button"
                  className="flex items-center gap-2 text-left"
                  onClick={() => toggleGroup(groupValue)}
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {groupValue}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {rows.length} variants
                    </p>
                  </div>
                </button>

                <Input
                  value={agg.sku}
                  readOnly
                  placeholder={agg.sku === "" ? "Mixed" : undefined}
                  className="h-8 bg-muted/30 text-sm text-muted-foreground"
                />

                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-muted-foreground">
                    ₱
                  </span>
                  <Input
                    disabled
                    value={agg.price === null ? "" : agg.price}
                    placeholder={agg.price === null ? "Mixed" : "0.00"}
                    className="h-8 pl-6 text-sm bg-muted/30"
                  />
                </div>

                <Input
                  value={agg.totalAvailable}
                  readOnly
                  className="h-8 bg-muted/30 text-sm text-muted-foreground"
                />
              </div>

              {!isCollapsed &&
                rows.map((variant) => {
                  const otherLabel = Object.entries(variant.combination)
                    .filter(([k]) => k !== groupBy)
                    .map(([, v]) => v)
                    .join(" / ");

                  return (
                    <div
                      key={variant.id}
                      className="grid grid-cols-[1fr_140px_120px_80px] items-center gap-3 border-t px-4 py-2 pl-10"
                    >
                      <span className="text-sm">{otherLabel || "—"}</span>

                      <Input
                        {...register(`variants.${variant.absoluteIndex}.sku`)}
                        placeholder="SKU"
                        className="h-8 text-sm"
                      />

                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs text-muted-foreground">
                          ₱
                        </span>
                        <Input
                          type="number"
                          placeholder={defaultPriceValue || "0.00"}
                          {...register(
                            `variants.${variant.absoluteIndex}.price`,
                            { valueAsNumber: true },
                          )}
                          className="h-8 pl-6 text-sm"
                        />
                      </div>

                      <Input
                        type="number"
                        {...register(
                          `variants.${variant.absoluteIndex}.available`,
                          { valueAsNumber: true },
                        )}
                        className="h-8 text-sm"
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>

      <div className="border-t bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground">
        Total inventory at Shop location: {totalInventory} available
      </div>
    </div>
  );
};

export default VariantTable;

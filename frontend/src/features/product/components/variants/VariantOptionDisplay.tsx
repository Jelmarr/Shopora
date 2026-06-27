import { Button } from "@/src/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateProductInput } from "../../schemas/AddProductSchema";

const VariantOptionDisplay = ({
  index,
  onEdit,
  onRemove,
}: {
  index: number;
  onEdit: () => void;
  onRemove: () => void;
}) => {
  const { control } = useFormContext<CreateProductInput>();

  const name = useWatch({ control, name: `variantOptions.${index}.name` });
  const values =
    useWatch({ control, name: `variantOptions.${index}.values` }) ?? [];

  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <div>
        <p className="text-sm font-medium">{name || "(unnamed option)"}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {values.length === 0 ? (
            <span className="text-xs text-muted-foreground">
              No values added
            </span>
          ) : (
            values.map((v: { value: string }, i: number) => (
              <span
                key={i}
                className="rounded-full bg-muted px-2 py-0.5 text-xs"
              >
                {v.value}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="flex gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onEdit}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default VariantOptionDisplay;

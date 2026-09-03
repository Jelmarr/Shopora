import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ValueChip from "./ValueChip";
import { CreateProductInput } from "../../schemas/AddProductSchema";

const VariantOptionEditor = ({
  index,
  onSave,
  onRemove,
}: {
  index: number;
  onSave: () => void;
  onRemove: () => void;
}) => {
  const [valueInput, setValueInput] = useState("");

  const {
    control,
    formState: { errors },
    clearErrors,
    register,
  } = useFormContext<CreateProductInput>();

  // Nested field array — scoped to variantOptions.{index}.values
  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: `variantOptions.${index}.values`,
  });

  const handleAddValue = () => {
    const trimmed = valueInput.trim();
    if (!trimmed) return;
    appendValue({ value: trimmed });
    setValueInput("");
    clearErrors(`variantOptions.${index}.values`);
  };

  const optionErrors = errors?.variantOptions?.[index];

  return (
    <div className="space-y-4 border p-4 rounded-md">
      {/* Option Name */}
      <div className="grid gap-1.5">
        <Label htmlFor={`variantOptions.${index}.name`}>Option Name</Label>
        <Input
          id={`variantOptions.${index}.name`}
          placeholder="e.g. Size, Color"
          {...register(`variantOptions.${index}.name`)}
          className={
            optionErrors?.name
              ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
              : "border-input focus-within:ring-1 focus-within:ring-ring"
          }
        />
        {optionErrors?.name && (
          <p className="text-xs font-medium text-destructive">
            {optionErrors.name.message as string}
          </p>
        )}
      </div>

      {/* Values — tag-style input backed by a nested fieldArray */}
      <div className="grid gap-1.5">
        <Label>Values</Label>

        {valueFields.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {valueFields.map((valueField, valueIndex) => (
              <ValueChip
                key={valueField.id}
                name={`variantOptions.${index}.values.${valueIndex}.value`}
                onRemove={() => removeValue(valueIndex)}
              />
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Input
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddValue();
              }
            }}
            placeholder="Type a value and press Enter"
            className={
              optionErrors?.values && valueFields.length === 0
                ? "border-destructive! ring-1! ring-destructive!"
                : "border-input focus-within:ring-1 focus-within:ring-ring"
            }
          />
          <Button type="button" variant="outline" onClick={handleAddValue}>
            Add
          </Button>
        </div>

        {optionErrors?.values && (
          <p className="text-xs font-medium text-destructive">
            {optionErrors.values.message as string}
          </p>
        )}
      </div>

      {/* Row actions */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onRemove}
          className="hover:text-destructive"
        >
          Delete
        </Button>

        <Button type="button" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default VariantOptionEditor;

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import VariantOptionDisplay from "./VariantOptionDisplay";
import VariantOptionEditor from "./VariantOptionEditor";
import VariantTable from "./VariantTable";

const Variants = () => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { control, trigger } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variantOptions",
  });

  const handleAddOption = () => {
    append({ name: "", values: [] });
    setEditingIndex(fields.length); // the row that was just appended
  };

  const handleSaveVariant = async (index: number) => {
    // Validate just this row before "saving" it (collapsing it to display mode)
    const isValid = await trigger(`variantOptions.${index}`);
    if (!isValid) return;
    setEditingIndex(null);
  };

  const handleRemoveOption = (index: number) => {
    remove(index);
    if (editingIndex === index) setEditingIndex(null);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Variants</CardTitle>
        <CardDescription>
          Define product options like size, color, and attributes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {fields.map((field, index) =>
          editingIndex === index ? (
            <VariantOptionEditor
              key={field.id}
              index={index}
              onSave={() => handleSaveVariant(index)}
              onRemove={() => handleRemoveOption(index)}
            />
          ) : (
            <VariantOptionDisplay
              key={field.id}
              index={index}
              onEdit={() => setEditingIndex(index)}
              onRemove={() => handleRemoveOption(index)}
            />
          ),
        )}

        {editingIndex === null && (
          <Button
            type="button"
            variant="ghost"
            className="h-auto p-1 text-sm font-normal flex items-center gap-2"
            onClick={handleAddOption}
          >
            <PlusCircle className="h-4 w-4 stroke-[1.5]" />
            Add option
          </Button>
        )}

        <VariantTable />
      </CardContent>
    </Card>
  );
};

export default Variants;

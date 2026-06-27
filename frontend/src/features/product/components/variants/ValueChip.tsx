import { X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

const ValueChip = ({
  name,
  onRemove,
}: {
  name: string;
  onRemove: () => void;
}) => {
  const { control } = useFormContext();

  const value = useWatch({ control, name });

  return (
    <span className="inline-flex items-center gap-1 rounded-full border bg-muted px-2.5 py-1 text-xs">
      {value}
      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground hover:text-foreground"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
};

export default ValueChip;

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useFormContext } from "react-hook-form";

const BottomBar = ({ mode }: { mode: "edit" | "create" }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div
      className={`mt-6 flex items-center ${mode === "create" ? "justify-between" : "justify-end"} rounded-lg border bg-background px-6 py-4`}
    >
      {mode === "create" && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          Discard
        </Button>
      )}

      <div className="flex gap-2">
        {mode === "create" && (
          <Button variant="outline" size="sm" type="button">
            Save as Draft
          </Button>
        )}

        <Button
          size="sm"
          className="gap-1.5"
          type="submit"
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? (
            mode === "create" ? (
              <Spinner label="Publishing..." />
            ) : (
              <Spinner label="Saving..." />
            )
          ) : mode === "create" ? (
            "Publish Product"
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;

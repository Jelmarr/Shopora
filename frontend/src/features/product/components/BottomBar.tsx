import Spinner from "@/src/components/Spinner";
import { Button } from "@/src/components/ui/button";
import { Save } from "lucide-react";
import { useFormContext } from "react-hook-form";

const BottomBar = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="mt-6 flex items-center justify-between rounded-lg border bg-background px-6 py-4">
      <Button
        variant="ghost"
        size="sm"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        Discard
      </Button>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Save as Draft
        </Button>

        <Button size="sm" className="gap-1.5" type="submit">
          <Save className="h-4 w-4" />
          {isSubmitting ? <Spinner label="Publishing..." /> : "Publish Product"}
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;

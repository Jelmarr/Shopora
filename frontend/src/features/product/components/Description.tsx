import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
const Description = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Description</CardTitle>
        <CardDescription>
          Write a product description visible to customers.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1.5">
        <Textarea
          {...register("description")}
          id="description"
          placeholder="Describe the product — materials, fit, sizing notes, use case..."
          className={`${
            errors.description
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          } min-h-50 resize-none text-sm leading-relaxed`}
        />
        <p className="text-right text-[11px] text-muted-foreground">0 / 2000</p>
        {errors.description && (
          <p className="text-xs font-medium text-destructive">
            {errors.description.message as string}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Description;

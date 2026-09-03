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
        <CardTitle className="text-base">
          Description <span className="text-destructive">*</span>
        </CardTitle>
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
              ? "border-destructive! ring-1! ring-destructive! has-focus:ring-destructive!"
              : "border-input focus-within:ring-1 focus-within:ring-ring"
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

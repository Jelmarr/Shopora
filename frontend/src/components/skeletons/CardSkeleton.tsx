import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <Skeleton className="flex h-10 w-9 items-center justify-center rounded-lg bg-muted" />

        <div>
          <Skeleton className="h-6 w-4" />
          <Skeleton className="h-4 w-14 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;

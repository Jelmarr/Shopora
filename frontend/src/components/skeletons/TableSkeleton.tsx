import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center border-b">
        <Skeleton className="h-9 w-full rounded-md" />
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
      <CardFooter className="bg-white p-9 flex justify-between">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-64" />
      </CardFooter>
    </Card>
  );
};

export default TableSkeleton;

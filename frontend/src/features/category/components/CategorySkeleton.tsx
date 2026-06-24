import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import CardSkeleton from "@/src/app/components/CardSkeleton";

export default function CategorySkeleton() {
  return (
    <div className="px-6 py-8 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Table Structure Skeleton */}
      <Card>
        <CardHeader className="flex justify-between items-center border-b">
          <div className="space-y-2">
            <Skeleton className="h-7 w-34" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="h-9 w-64 rounded-md" />
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
    </div>
  );
}

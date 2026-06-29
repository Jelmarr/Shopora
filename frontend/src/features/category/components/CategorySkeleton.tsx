import CardSkeleton from "@/src/components/skeletons/CardSkeleton";
import TableSkeleton from "@/src/components/skeletons/TableSkeleton";

import { Skeleton } from "@/src/components/ui/skeleton";

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

      <TableSkeleton />
    </div>
  );
}

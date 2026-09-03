import TableSkeleton from "@/components/skeletons/TableSkeleton";
import Orders from "@/features/admin/orders/Orders";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Orders />
    </Suspense>
  );
};

export default page;

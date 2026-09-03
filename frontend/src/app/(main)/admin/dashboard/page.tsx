import { Suspense } from "react";
import DashboardPage from "@/features/admin/dashboard/DashboardPage";

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 bg-stone-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

const page = () => {
  return (
    <main className="py-12 px-12">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardPage />
      </Suspense>
    </main>
  );
};

export default page;

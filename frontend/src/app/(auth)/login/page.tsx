import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import Login from "@/features/auth/components/Login";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="bg-background relative flex h-80 w-full flex-col items-center justify-center rounded-lg ">
      <InteractiveGridPattern
        className={cn(
          "mask-[radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-black"
      />

      <main className="flex absolute -bottom-44 justify-center mx-auto mt-20 mb-0">
        <Suspense
          fallback={<div className="animate-pulse">Loading form...</div>}
        >
          <Login />
        </Suspense>
      </main>
    </div>
  );
};

export default page;

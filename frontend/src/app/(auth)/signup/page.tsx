import Signup from "@/src/features/auth/components/Signup";
import { Suspense } from "react";

const page = () => {
  return (
    <main className="flex justify-center mx-auto mt-20 mb-0">
      <Suspense fallback={<div className="animate-pulse">Loading form...</div>}>
        <Signup />
      </Suspense>
    </main>
  );
};

export default page;

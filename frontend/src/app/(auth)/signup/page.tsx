import Signup from "@/src/features/auth/components/Signup";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading form...</div>}>
      <Signup />
    </Suspense>
  );
};

export default page;

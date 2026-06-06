import Login from "@/src/features/auth/components/Login";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading form...</div>}>
      <Login />
    </Suspense>
  );
};

export default page;

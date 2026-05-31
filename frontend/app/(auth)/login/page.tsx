import EmailLookup from "@/app/components/auth/EmailLookup";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex justify-center mx-auto my-0">
      <div className="bg-white rounded-xl p-6 w-md text-black">
        <div className="flex flex-col gap-4">
          <EmailLookup />

          <p className="text-gray-900 text-center text-sm flex items-center gap-2 justify-center">
            New to Shopora?{" "}
            <Link
              href="/lookup"
              className="font-bold text-blue-500 flex items-center gap-2 group hover:text-blue-600"
            >
              Get started{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-all duration-200"
              />
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;

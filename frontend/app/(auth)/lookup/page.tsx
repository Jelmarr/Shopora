import Link from "next/link";
import EmailLookup from "@/app/components/auth/EmailLookup";

export default function LookUpPage() {
  return (
    <main className="flex justify-center mx-auto my-0">
      <div className="bg-white rounded-xl p-6 w-md text-black">
        <div className="flex flex-col gap-4">
          <EmailLookup />

          <p className="text-gray-900 text-center text-sm">
            Already have a Shopora account?{" "}
            <Link href="/login" className="font-semibold underline ">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

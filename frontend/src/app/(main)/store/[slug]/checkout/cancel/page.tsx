import Link from "next/link";
import { XCircle } from "lucide-react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <main className="py-24 flex flex-col items-center text-center gap-4">
      <XCircle size={40} className="text-neutral-400" />
      <h1 className="text-2xl font-semibold">Checkout cancelled</h1>
      <p className="text-gray-500 max-w-sm">
        Your order wasn&apos;t completed. Your cart is still saved if you&apos;d
        like to try again.
      </p>
      <Link
        href={`/store/${slug}/shop`}
        className="mt-4 px-6 py-3 rounded-full bg-neutral-800 text-white text-sm"
      >
        Back to shop
      </Link>
    </main>
  );
};

export default page;

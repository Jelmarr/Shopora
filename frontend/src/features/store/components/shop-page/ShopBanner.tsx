import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ShopBanner = ({ slug }: { slug: string }) => {
  return (
    <section className="relative min-h-120 rounded-t-xl overflow-hidden bg-[#0a0a0a]">
      <Image
        src="/images/shop-banner.jpg"
        alt="shop-banner"
        fill
        className="object-cover opacity-50"
        sizes="100vw"
      />

      <div className="relative z-10 flex min-h-120  flex-col items-start justify-end gap-3 py-10 mx max-w-360 mx-auto px-8 2xl:px-0">
        <div className="flex items-center gap-4">
          <Link
            href={`/store/${slug}`}
            className="text-xs text-white/80 hover:text-white"
          >
            <Home />
          </Link>
          <span className="text-white/80">/</span>
          <p className="text-lg font-semibold text-white">All products</p>
        </div>
        <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold text-white tracking-tight">
          All products
        </h1>
      </div>
    </section>
  );
};

export default ShopBanner;

import Image from "next/image";
import StoreButton from "../StoreButton";

const PromoBanner = () => {
  return (
    <section className="relative min-h-70 rounded-xl overflow-hidden bg-[#0a0a0a]">
      <Image
        src="/images/promo-banner.png"
        alt="Featured collection"
        fill
        className="object-cover opacity-70"
        sizes="100vw"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4))",
        }}
      />

      <div className="relative z-10 flex h-70 flex-col items-start justify-center gap-3 py-10 mx max-w-360 mx-auto">
        <span className="text-xs text-white/60">Featured</span>

        <h2 className="text-white text-3xl md:text-4xl font-semibold m-0">
          Crafted for every collection
        </h2>

        <p className="text-sm text-white/70 max-w-[320px] leading-relaxed m-0">
          A backdrop that lets any product take center stage.
        </p>

        <StoreButton buttonText="Shop the collection" whiteBorder />
      </div>
    </section>
  );
};

export default PromoBanner;

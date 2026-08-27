import WavyRippleBackground from "@/src/components/lightswind/wavy-ripple-background";
import { Button } from "@/src/components/ui/moving-border";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full mt-20">
      {/* Wave + text */}
      <div className="relative w-full h-105 sm:h-115 md:h-125 overflow-hidden">
        <WavyRippleBackground waveColor="#b3b3b3" />

        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-4 text-center -translate-y-8 sm:-translate-y-12 md:-translate-y-16">
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-muted-foreground dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Launch your store in minutes
          </Button>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Your Store, Reimagined.
          </h1>
          <div className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground flex justify-center flex-col items-center">
            <p>From first sale to scale — everything you need to run</p>
            <p>a modern online business, in one place.</p>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-md mt-6 hover:bg-slate-800 cursor-pointer">
            Start for free
          </button>
        </div>
      </div>

      {/* Dashboard image, pulled up to eliminate any seam */}
      <div className="relative w-full h-75 sm:h-105 md:h-180 -mt-16 sm:-mt-20 md:-mt-24 overflow-hidden">
        <Image
          alt="dashboard-image"
          src="/images/dashboard.png"
          fill
          className="object-contain w-full h-full"
        />
      </div>
    </section>
  );
};

export default Hero;

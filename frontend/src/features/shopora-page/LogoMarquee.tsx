"use client";

import SlidingLogoMarquee from "@/src/components/lightswind/sliding-logo-marquee";

const logos = [
  {
    id: "1",
    content: (
      <div className="text-xl font-bold tracking-tight text-muted-foreground">
        Nordly
      </div>
    ),
  },
  {
    id: "2",
    content: (
      <div className="text-xl font-bold tracking-tight text-muted-foreground">
        Cartify
      </div>
    ),
  },
  {
    id: "3",
    content: (
      <div className="text-xl font-semibold tracking-tight text-muted-foreground">
        Payflow
      </div>
    ),
  },
  {
    id: "4",
    content: (
      <div className="text-xl font-bold italic tracking-tight text-muted-foreground">
        Loopstack
      </div>
    ),
  },
  {
    id: "5",
    content: (
      <div className="text-xl font-bold tracking-tight text-muted-foreground">
        Vertexo
      </div>
    ),
  },
  {
    id: "6",
    content: (
      <div className="text-xl font-medium tracking-wide text-muted-foreground">
        BrightCart
      </div>
    ),
  },
  {
    id: "7",
    content: (
      <div className="text-xl font-bold tracking-tight text-muted-foreground">
        Shipwell
      </div>
    ),
  },
  {
    id: "8",
    content: (
      <div className="text-xl font-bold tracking-tighter text-muted-foreground">
        Ledgerly
      </div>
    ),
  },
];

const LogoMarquee = () => {
  return (
    <section className="py-30">
      <p className="text-center font-medium mb-2">
        Trusted by modern teams building with Shopora
      </p>
      <p className="text-center text-sm font-medium text-muted-foreground/70 mb-12 max-w-xl mx-auto">
        Powering storefronts for founders and growing brands alike.
      </p>

      <SlidingLogoMarquee
        items={logos}
        speed={10}
        height="120px"
        enableBlur={true}
        blurIntensity={1}
        pauseOnHover={true}
        showGridBackground={true}
      />
    </section>
  );
};

export default LogoMarquee;

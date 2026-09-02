import { ThreeDMarquee } from "@/src/components/ui/3d-marquee";
import PrimaryButton from "./components/ui/PrimaryButton";

const images = [
  "/images/store/image1.png",
  "/images/store/image2.png",
  "/images/store/image3.png",
  "/images/store/image4.png",
  "/images/store/image5.png",
  "/images/store/image1.png",
  "/images/store/image2.png",
  "/images/store/image3.png",
  "/images/store/image4.png",
  "/images/store/image5.png",
  "/images/store/image1.png",
  "/images/store/image2.png",
  "/images/store/image3.png",
  "/images/store/image4.png",
  "/images/store/image5.png",
  "/images/store/image1.png",
  "/images/store/image2.png",
  "/images/store/image3.png",
  "/images/store/image4.png",
  "/images/store/image5.png",
  "/images/store/image1.png",
  "/images/store/image2.png",
  "/images/store/image3.png",
  "/images/store/image4.png",
  "/images/store/image5.png",
  "/images/store/image1.png",
  "/images/store/image2.png",
  "/images/store/image3.png",
  "/images/store/image4.png",
  "/images/store/image5.png",
];

const ClosingCTA = () => {
  return (
    <section className="mb-40 flex w-full flex-col gap-8 px-6 md:flex-row">
      <div className="w-full md:w-[35%] md:shrink-0">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Start building your dream store today.
        </h2>
        <p className="mt-6 max-w-lg text-base text-neutral-600 dark:text-neutral-400 lg:text-lg mb-8">
          Launch high-converting storefronts, personalize shopping experiences
          in real time, and automate inventory, customer support, and order
          fulfillment.
        </p>
        <PrimaryButton />
      </div>

      <div className="w-full md:w-[calc(65%-2rem)] md:shrink-0">
        {/* Fading Mask Container */}
        <div className="w-full overflow-hidden mask-[linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <div className="w-full opacity-75 dark:bg-neutral-800">
            <ThreeDMarquee images={images} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;

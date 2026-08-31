import { BentoFeatures } from "../features/shopora-page/BentoFeatures";
import FAQ from "../features/shopora-page/FAQ";
import { FeaturesCards } from "../features/shopora-page/FeatureCards";
import Hero from "../features/shopora-page/Hero";
import LogoMarquee from "../features/shopora-page/LogoMarquee";
import Pricing from "../features/shopora-page/Pricing";
import { ReviewsMarquee } from "../features/shopora-page/ReviewsMarquee";

const page = () => {
  return (
    <div>
      <main>
        <div className="max-w-6xl mx-auto my-0">
          <Hero />
          <LogoMarquee />
          <BentoFeatures />
          <FeaturesCards />
          <ReviewsMarquee />
          <Pricing />
          <FAQ />
        </div>
      </main>
    </div>
  );
};

export default page;

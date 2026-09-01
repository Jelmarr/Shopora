import { BentoFeatures } from "../features/shopora-page/BentoFeatures";
import ClosingCTA from "../features/shopora-page/ClosingCTA";
import FAQ from "../features/shopora-page/FAQ";
import { FeaturesCards } from "../features/shopora-page/FeatureCards";
import Footer from "../features/shopora-page/Footer";
import Hero from "../features/shopora-page/Hero";
import LogoMarquee from "../features/shopora-page/LogoMarquee";
import { NavBar } from "../features/shopora-page/NavBar";
import Pricing from "../features/shopora-page/Pricing";
import { ReviewsMarquee } from "../features/shopora-page/ReviewsMarquee";

const page = () => {
  return (
    <div>
      <NavBar />
      <main>
        <div className="max-w-6xl mx-auto my-0">
          <Hero />
          <LogoMarquee />
          <BentoFeatures />
          <FeaturesCards />
          <ReviewsMarquee />
          <Pricing />
          <FAQ />
          <ClosingCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;

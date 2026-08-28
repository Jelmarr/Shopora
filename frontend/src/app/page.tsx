import Hero from "../features/shopora-page/Hero";
import LogoMarquee from "../features/shopora-page/LogoMarquee";

const page = () => {
  return (
    <div>
      <main>
        <div className="max-w-6xl mx-auto my-0">
          <Hero />
          <LogoMarquee />
        </div>
      </main>
    </div>
  );
};

export default page;

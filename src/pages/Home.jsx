import React, { useState } from "react";
import Preloader from "../components/ui/Preloader";
import Hero from "../components/sections/Hero";
import Marquee from "../components/sections/Marquee";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import Process from "../components/sections/Process";
import Testimonials from "../components/sections/Testimonials";
import CTABanner from "../components/sections/CTABanner";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <div
        className={`${isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-500`}
      >
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <Process />
        <Testimonials />
        <CTABanner />
      </div>
    </>
  );
}

export default Home;

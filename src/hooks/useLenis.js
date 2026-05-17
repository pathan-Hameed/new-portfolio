import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenis = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register Lenis as the official scroll handler for ScrollTrigger
    ScrollTrigger.normalizeScroll(true);

    lenis.current = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    window.__lenis = lenis.current;

    lenis.current.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.current?.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
  gsap.ticker.remove(tick);
  lenis.current?.destroy();
  lenis.current = null;
  window.__lenis = null;
};
  }, []);

  return lenis;
}

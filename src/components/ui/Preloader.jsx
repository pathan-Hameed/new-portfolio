import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      onComplete?.();
      return;
    }

    const banner = wrapperRef.current;
    const letters = banner.querySelectorAll(".preloader-char");
    const bar = banner.querySelector(".preloader-bar");
    const top = banner.querySelector(".preloader-split-top");
    const bottom = banner.querySelector(".preloader-split-bottom");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => onComplete?.(),
    });

    tl.from(letters, {
      opacity: 0,
      y: 40,
      stagger: 0.08,
      duration: 0.45,
    })
      .to(
        bar,
        {
          width: "100%",
          duration: 1.1,
          ease: "power1.inOut",
        },
        "-=0.4",
      )
      .to(
        [top, bottom],
        {
          yPercent: (i) => (i === 0 ? -100 : 100),
          duration: 0.6,
          ease: "power2.inOut",
        },
        ">-0.1",
      );
  }, [onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary text-white"
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="text-[6rem] font-display tracking-[0.25em] uppercase text-white">
          {"AHK".split("").map((char, index) => (
            <span
              key={char + index}
              className="preloader-char inline-block opacity-0"
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-24 left-0 right-0 mx-auto h-1 w-11/12 overflow-hidden rounded-full bg-white/10">
        <div className="preloader-bar h-full w-0 rounded-full bg-accent-red" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <div className="preloader-split-top h-1/2 bg-bg-primary" />
        <div className="preloader-split-bottom h-1/2 bg-bg-primary" />
      </div>
    </div>
  );
}

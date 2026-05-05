import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Cube3D from "../ui/Cube3D";
import MagneticButton from "../ui/MagneticButton";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { opacity: 0, y: 30, duration: 0.7 })
        .from(
          [".hero-line-1", ".hero-line-2", ".hero-line-3"],
          {
            clipPath: "inset(0 100% 0 0)",
            duration: 1,
            stagger: 0.15,
          },
          "-=0.3",
        )
        .from(".hero-copy", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".hero-ctas", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
        .from(".hero-scroll", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5");

      gsap.from(".hero-scroll-line", {
        strokeDasharray: 120,
        strokeDashoffset: 120,
        duration: 1.1,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-hidden px-6 pb-24 pt-28 lg:pb-32 lg:pt-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-red/10 blur-3xl" />
        <div className="absolute inset-x-0 top-24 h-72 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.14),_transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-12 lg:flex-row lg:items-center">
        <div className="z-10 flex-1">
          <div className="hero-eyebrow mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#111111]/90 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-accent-red animate-pulse" />
            Available for Freelance Work
          </div>

          <div className="mb-6 overflow-hidden">
            <h1 className="hero-line-1 mb-2 overflow-hidden text-[clamp(80px,12vw,150px)] font-display uppercase leading-[0.9] tracking-[0.08em] text-white">
              <span className="block translate-y-[0.05em]">BUILDING</span>
            </h1>
            <h1
              className="hero-line-2 mb-2 overflow-hidden text-[clamp(80px,12vw,150px)] font-display uppercase leading-[0.9] tracking-[0.08em] text-transparent"
              style={{ WebkitTextStroke: "1px white" }}
            >
              <span className="block">DIGITAL</span>
            </h1>
            <h1 className="hero-line-3 overflow-hidden text-[clamp(80px,12vw,150px)] font-display uppercase leading-[0.9] tracking-[0.08em] text-white">
              <span className="block">SOLUTIONS</span>
            </h1>
          </div>

          <p className="hero-copy max-w-xl text-sm leading-8 text-white/70 lg:text-base">
            Full-stack developer from Mahabubnagar crafting WhatsApp systems,
            web apps, and automation tools that solve real problems for real
            businesses.
          </p>

          <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton className="bg-accent-red px-8 py-4 text-sm text-white shadow-[0_22px_60px_rgba(232,23,46,0.22)]">
              <a href="#work">View My Work</a>
            </MagneticButton>
            <a
              href="/PATHAN_ABDUL_HAMEED_KHAN_CV.pdf"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-4 text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-accent-red"
            >
              Download CV
              <span className="block translate-x-0 transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>

          <div className="hero-scroll mt-16 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-white/70">
            <svg
              className="hero-scroll-line h-16 w-3 overflow-visible"
              viewBox="0 0 2 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0V120"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="rotate-90 origin-left">SCROLL</span>
          </div>
        </div>

        <div className="relative z-10 flex-1">
          <div className="relative mx-auto flex h-[480px] w-full max-w-[520px] items-center justify-center rounded-[40px] border border-white/10 bg-[#111111]/80 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <Cube3D />
            <div className="pointer-events-none absolute top-7 right-7 max-w-[180px] rounded-3xl border border-white/10 bg-[#111111]/95 p-4 text-left shadow-xl">
              <p className="text-3xl font-display uppercase text-white">15+</p>
              <p className="mt-2 text-sm text-white/70">Projects Delivered</p>
            </div>
            <div className="pointer-events-none absolute bottom-8 left-8 max-w-[180px] rounded-3xl border border-white/10 bg-[#111111]/95 p-4 text-left shadow-xl">
              <p className="text-3xl font-display uppercase text-white">100%</p>
              <p className="mt-2 text-sm text-white/70">Client Satisfaction</p>
            </div>
            <div className="pointer-events-none absolute top-8 left-8 max-w-[180px] rounded-3xl border border-white/10 bg-[#111111]/95 p-4 text-left shadow-xl">
              <p className="text-3xl font-display uppercase text-white">3+</p>
              <p className="mt-2 text-sm text-white/70">Years Building</p>
            </div>
          </div>
          <div className="mt-12 text-center text-9xl font-display uppercase tracking-[0.2em] text-white/5 lg:text-[12rem]">
            DEVELOPER
          </div>
        </div>
      </div>
    </section>
  );
}

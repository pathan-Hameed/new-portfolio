import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "../ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discovery",
    description:
      "Understand the client’s real problem before writing any code.",
  },
  {
    title: "Planning",
    description: "Scope, contracts, and timeline defined clearly from day one.",
  },
  {
    title: "Building",
    description: "Clean code, regular updates, and quality delivery.",
  },
  {
    title: "Handover",
    description: "Full delivery, training, and support for every launch.",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".process-step", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 lg:px-10"
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionLabel>Process</SectionLabel>
        <h2 className="mb-14 text-4xl font-display uppercase tracking-[0.14em] text-white lg:text-5xl">
          How I move from brief to delivery.
        </h2>

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#111111]/90 p-8">
          <svg
            className="absolute left-0 top-8 h-[calc(100%-4rem)] w-full"
            viewBox="0 0 1200 600"
            fill="none"
          >
            <path
              ref={lineRef}
              d="M80 80L1120 80"
              stroke="rgba(232,23,46,0.35)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative grid gap-6 pt-10 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="process-step rounded-[30px] border border-white/10 bg-bg-card p-8 text-white"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-accent-red/10 text-2xl font-display text-accent-red">
                  {index + 1}
                </div>
                <h3 className="mb-4 text-xl font-display uppercase tracking-[0.16em]">
                  {step.title}
                </h3>
                <p className="text-sm leading-7 text-white/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

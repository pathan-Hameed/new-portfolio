import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = ref.current.querySelectorAll(".cta-char");
    gsap.from(heading, {
      opacity: 0,
      y: 40,
      stagger: 0.05,
      duration: 0.55,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden px-6 py-24 lg:px-10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-red via-[#8B0014] to-[#44000b]" />
      <div className="absolute inset-0 opacity-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_45%)]" />
      </div>
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-10 text-center text-white">
        <div className="text-9xl font-display uppercase tracking-[0.2em] text-white/5 lg:text-[12rem]">
          LET&apos;S WORK
        </div>
        <div className="space-y-6">
          <div
            className="flex flex-wrap justify-center gap-2 font-display uppercase tracking-[0.18em] text-white"
            style={{
              fontSize: "clamp(32px, 5.5vw, 88px)",
              wordBreak: "keep-all",
              hyphens: "none",
            }}
          >
            {["READY", "TO", "BUILD", "SOMETHING", "REAL?"].map(
              (word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={{ whiteSpace: "nowrap" }}
                  className="inline-block"
                >
                  {word.split("").map((char, charIndex) => (
                    <span
                      key={`${wordIndex}-${charIndex}`}
                      className="cta-char inline-block"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ),
            )}
          </div>
          <p className="max-w-2xl text-sm leading-8 text-white/80 lg:text-base">
            I am currently available for freelance projects in Mahabubnagar and
            remote work anywhere in India.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-red transition hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
          >
            Start a Project
          </a>
          <a
            href="https://wa.me/918333856442"
            className="rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:border-accent-red"
          >
            WhatsApp Me
          </a>
        </div>
      </div>
    </section>
  );
}

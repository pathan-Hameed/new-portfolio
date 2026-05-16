import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const ref = useRef(null);
  const primaryBtnRef = useRef(null);

 useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const heading = ref.current.querySelectorAll(".cta-char");
      const primaryBtn = primaryBtnRef.current;
      const fillLayer = primaryBtn?.querySelector(".button-fill");

      // Animate Heading Characters
      gsap.from(heading, {
        opacity: 0,
        y: 40,
        stagger: 0.05,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%", // Slightly lower to be safe
          once: true,
        },
      });

      // Animate Primary Button
      gsap.from(primaryBtn, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%", // Trigger slightly earlier than heading
          once: true,
        },
      });

      // --- MOUSE MOVE LOGIC ---
      const handleMove = (event) => {
        if (!primaryBtn) return;
        const rect = primaryBtn.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(primaryBtn, {
          x: x * 0.06,
          y: y * 0.04,
          duration: 0.35,
          ease: "power3.out",
        });

        if (fillLayer) {
          gsap.to(fillLayer, {
            x: x * 0.1,
            y: y * 0.08,
            duration: 0.35,
            ease: "power3.out",
          });
        }
      };

      const resetMotion = () => {
        if (!primaryBtn) return;
        gsap.to([primaryBtn, fillLayer], {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        });
      };

      primaryBtn?.addEventListener("mousemove", handleMove);
      primaryBtn?.addEventListener("mouseleave", resetMotion);

      // CRITICAL FIX: Refresh ScrollTrigger after everything is set up
      ScrollTrigger.refresh();

    }, ref);

    // Also refresh when the window fully loads all assets
    window.addEventListener("load", () => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      window.removeEventListener("load", () => ScrollTrigger.refresh());
    };
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
          <div className="flex justify-center">
            <p className="max-w-2xl text-sm leading-8 text-white/80 lg:text-base text-center">
              I am currently available for freelance projects in Mahabubnagar
              and remote work anywhere in India.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center">
          <a
            ref={primaryBtnRef}
            href="/contact"
            className="group relative inline-flex w-full max-w-[360px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-white/30 hover:text-white hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-accent-red/30"
          >
            <span className="button-fill absolute inset-0 pointer-events-none bg-white/10 hover:bg-black/20 opacity-70 transition-transform duration-500 ease-out" />
            <span className="relative z-10">Start a Project</span>
          </a>

          <a
            href="https://wa.me/918333856442"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-[360px] items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition duration-300 hover:border-white/40 hover:bg-white/10 focus:outline-none"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 10.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.5.1-.1.2-.4.7-.5.8-.1.1-.3.2-.5.1-.2 0-.9-.3-1.7-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.4.1-.5.1-.1.2-.3.3-.5.1-.1.1-.3 0-.4-.1-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.5 0-.8.4-.3.4-1 1-1 2.4 0 1.4 1 2.8 1.1 3 .1.1 1.8 2.8 4.3 3.9 2.5 1.1 2.5.7 2.9.7.4 0 1.3-.4 1.5-1.1.2-.7.2-1.4.1-1.5-.1-.1-.4-.2-.8-.3z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>WhatsApp Me</span>
          </a>
        </div>
      </div>
    </section>
  );
}

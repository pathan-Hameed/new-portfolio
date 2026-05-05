import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ravi Kumar",
    title: "Gym Owner, Hyderabad",
    quote:
      "Abdul built our WhatsApp reminder system and the automation has already reduced manual follow-up by 80%.",
  },
  {
    name: "Sneha Reddy",
    title: "Founder, Mahabubnagar",
    quote:
      "The API platform was clean, well-documented and delivered on time. Communication was excellent.",
  },
  {
    name: "Anjali Patel",
    title: "Marketing Head, Telangana",
    quote:
      "AHK understood my business needs quickly and delivered a backend that simply works.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setActive((prev) => (prev + 1) % testimonials.length),
      4500,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden px-6 py-24 lg:px-10"
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
      <div className="relative mx-auto max-w-[1200px] text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-accent-red">
          Testimonials
        </p>
        <h2 className="mt-4 text-4xl font-display uppercase tracking-[0.12em] text-white lg:text-5xl">
          What clients say about working together.
        </h2>

        <div className="mt-12 flex flex-col items-center gap-8 lg:flex-row lg:justify-center">
          <button
            type="button"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.25em] text-white/80 transition hover:border-accent-red hover:text-white"
            onClick={() =>
              setActive(
                (prev) =>
                  (prev - 1 + testimonials.length) % testimonials.length,
              )
            }
          >
            Prev
          </button>

          <div className="relative w-full max-w-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="rounded-[40px] border border-white/10 bg-[#111111]/95 px-10 py-12 text-left shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
              >
                <div className="mb-6 flex gap-2 text-accent-gold">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
                <p className="mb-8 text-2xl leading-9 text-white">
                  “{testimonials[active].quote}”
                </p>
                <div>
                  <p className="font-display text-xl uppercase tracking-[0.12em] text-white">
                    {testimonials[active].name}
                  </p>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                    {testimonials[active].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.25em] text-white/80 transition hover:border-accent-red hover:text-white"
            onClick={() =>
              setActive((prev) => (prev + 1) % testimonials.length)
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

import React from "react";

const techItems = [
  "Node.js",
  "Express.js",
  "MongoDB",
  "React",
  "REST APIs",
  "WhatsApp API",
  "JavaScript",
  "Tailwind CSS",
  "Automation Systems",
  "Freelance Dev",
];

export default function Marquee() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#1a0208] py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,23,46,0.12),_transparent_45%)]" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-4 px-6">
        {[0, 1].map((row) => (
          <div key={row} className="overflow-hidden">
            <div
              className={`marquee-row flex min-w-full items-center gap-10 whitespace-nowrap text-sm uppercase tracking-[0.4em] text-white ${row === 1 ? "marquee-reverse" : ""}`}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              {Array.from({ length: 3 })
                .flatMap(() => techItems)
                .map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="inline-flex items-center gap-2"
                  >
                    <span>{item}</span>
                    <span className="text-accent-red">✦</span>
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

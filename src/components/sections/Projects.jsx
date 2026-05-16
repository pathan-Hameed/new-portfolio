import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal from "../ProjectModal";
import { projects } from "../../data/projectData";

gsap.registerPlugin(ScrollTrigger);

const filters = [
  "All",
  "Frontend Development",
  "Backend / Automation",
  "Full-Stack",
];

export default function Projects() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  // 1. State Variables
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 2. Memoized filtered list
  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  // 3. Derived constant (Must be after 'filtered')
  const totalCards = filtered.length;

  // 4. GSAP Horizontal Scroll Logic (Desktop)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container || !sectionRef.current) return;

      mm.add("(min-width: 768px)", () => {
        const calculateScrollDistance = () => {
          const totalWidth = container.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(totalWidth - viewportWidth, 0);
        };

        const tween = gsap.to(container, {
          x: () => -calculateScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${calculateScrollDistance()}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });
        resizeObserver.observe(container);

        return () => {
          resizeObserver.disconnect();
          tween.kill();
        };
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [filtered]);

  // 5. Navigation & Scroll Helpers
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / totalCards;
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  const scrollToCard = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / totalCards;
    container.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="relative md:h-screen md:overflow-hidden px-4 lg:px-10"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
        
        <div className="relative mx-auto max-w-[1400px] flex flex-col md:h-full">
          {/* Header & Filters */}
          <div className="mb-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-accent-red">Selected Work</p>
              <h2 className="mt-4 text-3xl font-display uppercase tracking-[0.12em] text-white lg:text-5xl">
                Projects that move businesses forward.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter);
                    setActiveIndex(0);
                    if (containerRef.current) {
                      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    }
                  }}
                  className={`rounded-full border px-5 py-3 text-sm uppercase tracking-[0.25em] transition-all ${
                    activeFilter === filter
                      ? "border-accent-red bg-accent-red/10 text-white"
                      : "border-white/10 text-white/70 hover:border-accent-red hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* New Outer Wrapper */}
          <div className="flex flex-col gap-4 md:flex-1 md:overflow-hidden">
            <div className="relative md:overflow-hidden">
              <div className="project-scroll w-full md:h-full md:overflow-visible">
                <div
                  ref={containerRef}
                  onScroll={handleScroll}
                  className="flex pb-8 touch-pan-x pr-6 overflow-x-auto md:overflow-visible md:h-full md:pr-0"
                >
                  <AnimatePresence mode="popLayout">
                    {filtered.map((project) => (
                      <motion.div
                        key={project.id}
                        className="project-card relative flex-shrink-0 w-[85vw] md:w-[480px] flex flex-col rounded-[40px] border border-white/30 bg-[#111111]/95 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.35)] cursor-pointer hover:border-accent-red transition mr-8 last:mr-0 h-auto md:h-full"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.6 }}
                        onClick={() => setSelectedProjectId(project.id)}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(232,23,46,0.12),_transparent_35%)]" />
                        <div className="relative z-10 flex flex-col flex-1 justify-between gap-8">
                          <div className="flex items-start justify-between gap-4">
                            <div className="text-7xl font-display uppercase text-white/10">{project.number}</div>
                            <span className="rounded-full bg-accent-red/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-accent-red">
                              {project.status}
                            </span>
                          </div>

                          <div className="space-y-6">
                            <h3 className="text-4xl font-display uppercase tracking-[0.06em] text-white">{project.title}</h3>
                            <p className="max-w-xl text-sm leading-7 text-white/70">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tag) => (
                                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 mt-auto">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProjectId(project.id);
                              }}
                              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.25em] text-white transition hover:border-accent-red"
                            >
                              View Details
                            </button>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="rounded-full border border-accent-red bg-accent-red/10 px-6 py-3 text-sm uppercase tracking-[0.25em] text-accent-red transition hover:bg-accent-red/20"
                            >
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="md:hidden flex items-center justify-between px-2 pb-6">
              <button
                onClick={() => scrollToCard(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-white/10 bg-[#111111] flex items-center justify-center text-white transition hover:border-accent-red disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalCards }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    className={`rounded-full transition-all duration-300 ${
                      activeIndex === i ? "w-6 h-2 bg-accent-red" : "w-2 h-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollToCard(activeIndex + 1)}
                disabled={activeIndex === totalCards - 1}
                className="w-10 h-10 rounded-full border border-white/10 bg-[#111111] flex items-center justify-center text-white transition hover:border-accent-red disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProjectId && (
          <ProjectModal
            projectId={selectedProjectId}
            onClose={() => setSelectedProjectId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
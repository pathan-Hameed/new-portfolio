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
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const calculateScrollDistance = () => {
        const totalWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        return totalWidth - viewportWidth;
      };

      let scrollDistance = calculateScrollDistance();

      gsap.to(container, {
        x: () => (scrollDistance > 0 ? -scrollDistance : 0),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => {
            scrollDistance = calculateScrollDistance();
            return `+=${container.scrollWidth}`;
          },
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            ScrollTrigger.refresh();
          },
        },
      });

      // ResizeObserver to recalculate on window resize
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [filtered]);

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="relative h-screen overflow-hidden px-6 lg:px-10"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
        <div className="relative mx-auto h-full max-w-[1400px] flex flex-col">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-accent-red">
                Selected Work
              </p>
              <h2 className="mt-4 text-4xl font-display uppercase tracking-[0.12em] text-white lg:text-5xl">
                Projects that move businesses forward.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
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

          <div className="relative flex-1 overflow-hidden">
            <div className="project-scroll h-full w-full overflow-hidden">
              <div ref={containerRef} className="flex h-full gap-8 pb-8">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project) => (
                    <motion.div
                      key={project.id}
                      className="project-card relative min-w-[520px] h-full flex flex-col rounded-[40px] border border-white/10 bg-[#111111]/95 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.35)] cursor-pointer hover:border-accent-red transition"
                      data-cursor="view"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.6 }}
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(232,23,46,0.12),_transparent_35%)]" />
                      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                        <div className="flex items-start justify-between gap-4">
                          <div className="text-7xl font-display uppercase text-white/10">
                            {project.number}
                          </div>
                          <span className="rounded-full bg-accent-red/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-accent-red">
                            {project.status}
                          </span>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-5xl font-display uppercase tracking-[0.06em] text-white">
                            {project.title}
                          </h3>
                          <p className="max-w-xl text-sm leading-7 text-white/70">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70"
                              >
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

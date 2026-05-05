import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { getProjectById } from "../data/projectData";

export default function ProjectModal({ projectId, onClose }) {
  const project = getProjectById(projectId);
  const modalRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  useEffect(() => {
    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 backdrop-blur-sm p-4"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-h-[90vh] overflow-y-auto bg-[#111111] rounded-[40px] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent-red/20"
          >
            ✕
          </button>

          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="mb-12">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-6xl font-display text-white/10">
                  {project.number}
                </span>
                <span className="inline-flex rounded-full bg-accent-red/10 px-4 py-2 text-sm uppercase tracking-[0.2em] text-accent-red">
                  {project.status}
                </span>
              </div>
              <h1
                className="mb-4 text-5xl lg:text-6xl font-display uppercase tracking-[0.08em] text-white"
                style={{ wordBreak: "keep-all" }}
              >
                {project.title}
              </h1>
              <p className="text-lg text-white/80">{project.description}</p>
            </div>

            {/* Media Gallery */}
            <div className="mb-12">
              <div className="mb-6 rounded-[32px] overflow-hidden border border-white/10">
                <motion.img
                  key={selectedImageIndex}
                  src={project.images[selectedImageIndex]}
                  alt={`${project.title} - ${selectedImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`min-w-[100px] h-[100px] rounded-[16px] overflow-hidden border-2 transition ${
                      selectedImageIndex === index
                        ? "border-accent-red"
                        : "border-white/10 hover:border-accent-red/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* View Live Button */}
              <a
                href={project.liveUrl}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-red/10 border border-accent-red px-6 py-3 text-sm uppercase tracking-[0.2em] text-accent-red transition hover:bg-accent-red/20"
              >
                View Live →
              </a>
            </div>

            {/* Details Grid */}
            <div className="mb-12 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-6 text-lg font-display uppercase tracking-[0.1em] text-white">
                  Project Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                      Timeline
                    </p>
                    <p className="text-white">{project.timeline}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                      Type
                    </p>
                    <p className="text-white">{project.type}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                      Client
                    </p>
                    <p className="text-white">{project.client}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-display uppercase tracking-[0.1em] text-white">
                  The Story
                </h3>
                <div className="space-y-6 text-sm leading-7 text-white/80">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-accent-red mb-2">
                      Challenge
                    </p>
                    <p>{project.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-accent-red mb-2">
                      Solution
                    </p>
                    <p>{project.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-accent-red mb-2">
                      Result
                    </p>
                    <p>{project.result}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Cards */}
            <div className="mb-12 grid gap-6 lg:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-[#1a1a1a] p-8">
                <div className="mb-4 text-4xl">🎯</div>
                <h4 className="mb-3 font-display font-bold text-white">
                  The Problem
                </h4>
                <p className="text-sm text-white/70">{project.challenge}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-[#1a1a1a] p-8">
                <div className="mb-4 text-4xl">⚙️</div>
                <h4 className="mb-3 font-display font-bold text-white">
                  The Approach
                </h4>
                <p className="text-sm text-white/70">{project.solution}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-[#1a1a1a] p-8">
                <div className="mb-4 text-4xl">✨</div>
                <h4 className="mb-3 font-display font-bold text-white">
                  The Result
                </h4>
                <p className="text-sm text-white/70">{project.result}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-[24px] border border-accent-red/30 bg-accent-red/5 p-8 text-center">
              <h3 className="mb-3 text-2xl font-display uppercase text-white">
                Interested in a similar project?
              </h3>
              <p className="mb-6 text-white/70">
                Let's discuss how we can build something amazing for your
                business.
              </p>
              <a
                href="/contact"
                className="inline-flex rounded-full bg-accent-red px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-accent-red/90"
              >
                Start a Project
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

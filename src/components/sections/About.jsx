import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "../ui/SectionLabel";
import profile from "../../assets/profile-no-bg.png";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "WhatsApp bot flows",
  "REST API design",
  "Node.js backend",
  "React frontends",
  "Automation pipelines",
  "Performance tuning",
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      tl.from(".about-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
      })
        .from(".about-copy", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(
          ".about-skill",
          { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        );

      gsap.to(imageRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const numbers = statsRef.current.querySelectorAll(".stat-value");
      numbers.forEach((stat) => {
        const targetValue = Number(stat.dataset.target || 0);
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 1.5,
            ease: "power1.out",
            snap: { innerText: 1 },
            onUpdate() {
              stat.textContent = Math.ceil(this.targets()[0].innerText);
            },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 lg:px-10"
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_45%)]" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative">
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-[48px] border border-white/10 bg-[#111111]/90 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          >
            <div className="aspect-[3/4] rounded-[36px] bg-gradient-to-br from-[#0f0f0f] via-[#111111] to-[#140000] p-8">
              <div className="flex h-full items-center justify-center rounded-[28px] border border-white/10 bg-[#080808] tracking-[0.18em]">
                <img  src={profile} alt="Profile" />
              </div>
            </div>
            <div className="absolute bottom-0 left-12 rounded-3xl border border-white/10 bg-[#111111]/95 px-4 py-3 text-sm text-white/80 shadow-xl">
              Based in Mahabubnagar, Telangana 📍
            </div>
          </div>
          <div className="absolute -bottom-12 right-10 h-24 w-24 rounded-3xl bg-accent-red/15 blur-3xl" />
        </div>

        <div className="space-y-8">
          <SectionLabel>About Me</SectionLabel>
          <div className="overflow-hidden text-4xl font-display uppercase tracking-[0.15em] text-white lg:text-5xl">
            <p className="about-heading">I TURN IDEAS INTO WORKING SYSTEMS</p>
          </div>
          <div className="space-y-6 text-sm leading-8 text-white/75 lg:text-base">
            <p className="about-copy">
              I build reliable Node.js backends, REST APIs, and automation
              systems for businesses that need work that just works. My focus is
              on practical solutions that deliver measurable results.
            </p>
            <p className="about-copy">
              Working from Mahabubnagar, I bring local insight and remote
              execution together to support brands, gyms, startups, and service
              businesses across Telangana and India.
            </p>
            <p className="about-copy">
              Every project is planned with clear milestones, clean code, and a
              smooth handover so clients can use their systems confidently from
              day one.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {skills.map((skill) => (
              <motion.div
                key={skill}
                className="about-skill rounded-3xl border border-white/10 bg-[#111111]/90 p-4 text-sm text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block text-accent-red">✓</span>
                {skill}
              </motion.div>
            ))}
          </div>

          <div
            ref={statsRef}
            className="grid gap-4 rounded-[30px] border border-white/10 bg-[#111111]/90 p-6 sm:grid-cols-3"
          >
            <div className="text-center">
              <p
                data-target="15"
                className="stat-value text-4xl font-display text-white"
              >
                0
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                Projects
              </p>
            </div>
            <div className="text-center">
              <p
                data-target="3"
                className="stat-value text-4xl font-display text-white"
              >
                0
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                Years
              </p>
            </div>
            <div className="text-center">
              <p
                data-target="5"
                className="stat-value text-4xl font-display text-white"
              >
                0
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                Cities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "../ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "WhatsApp Automation Systems",
    slug: "whatsapp-automation",
    description:
      "Automated messaging, reminders, and workflows for customer engagement.",
    tag: "Automation",
  },
  {
    title: "REST API Development",
    slug: "rest-api-development",
    description:
      "Scalable backend services built with Node.js, Express and MongoDB.",
    tag: "Backend",
  },
  {
    title: "Admin Panel & Dashboards",
    slug: "admin-panel-dashboards",
    description: "Elegant dashboards for business control and analytics.",
    tag: "Frontend",
  },
  {
    title: "Full-Stack Web Applications",
    slug: "full-stack-web-applications",
    description: "Responsive web apps combining API, UI, and deployment.",
    tag: "Full-stack",
  },
  {
    title: "Gym Management Systems",
    slug: "gym-management-systems",
    description:
      "Member tracking, payment reminders, and report automation for gyms.",
    tag: "Health",
  },
  {
    title: "Freelance Consulting",
    slug: "freelance-consulting",
    description:
      "Strategy, planning, and delivery support for digital projects.",
    tag: "Consulting",
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".service-card");

      gsap.from(".service-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        onComplete: () => {
          // Fallback: ensure all cards are visible
          cards.forEach((card) => {
            gsap.to(card, { opacity: 1, duration: 0.1 });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 lg:px-10"
    >
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionLabel>Services</SectionLabel>
        <h2 className="mb-12 text-4xl font-display uppercase tracking-[0.14em] text-white lg:text-5xl">
          What I build for growth-focused brands.
        </h2>

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#111111]/90 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(232,23,46,0.08),_transparent_45%)]" />
          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="service-card relative z-10 overflow-hidden rounded-[30px] border border-white/10 bg-bg-card p-8 opacity-100 transition-all duration-300 hover:border-accent-red"
              >
                <div className="absolute top-6 right-6 text-7xl font-display text-white/5">
                  {index + 1}
                </div>
                <div className="mb-6 inline-flex h-14 w-20 items-center justify-center rounded-3xl bg-accent-red/10 text-accent-red">
                  {service.tag}
                </div>
                <h3 className="mb-4 text-xl font-display uppercase tracking-[0.16em] text-white">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-7 text-white/70">
                  {service.description}
                </p>
                <a
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/80 transition-all duration-300 hover:text-accent-red"
                >
                  View More
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getServiceBySlug } from "../../data/serviceData";
import SectionLabel from "../ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail() {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(serviceSlug);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".service-detail-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".process-step", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-accent-red hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 lg:px-10 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
        <div className="relative mx-auto max-w-[1400px]">
          {/* Breadcrumb */}
          <div className="mb-12 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/60">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <span>/</span>
            <a href="/services" className="hover:text-white transition">
              Services
            </a>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>

          {/* Category Tag */}
          <div className="mb-8 inline-flex items-center gap-2">
            <span className="inline-flex h-12 w-32 items-center justify-center rounded-3xl bg-accent-red/10 text-sm font-semibold text-accent-red uppercase tracking-[0.2em]">
              {service.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-6 text-5xl lg:text-7xl font-display uppercase tracking-[0.08em] text-white"
            style={{ wordBreak: "keep-all" }}
          >
            {service.title}
          </h1>

          {/* Description */}
          <p className="max-w-3xl text-lg leading-8 text-white/80">
            {service.description}
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden px-6 py-24 lg:px-10"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-20">
            <h2 className="mb-12 text-4xl font-display uppercase tracking-[0.12em] text-white lg:text-5xl">
              What You Get
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {service.deliverables.map((item, index) => (
                <div
                  key={index}
                  className="service-detail-item rounded-[24px] border border-white/10 bg-[#111111]/90 p-6 hover:border-accent-red/50 transition"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-red/10">
                    <span className="text-sm font-bold text-accent-red">✓</span>
                  </div>
                  <p className="text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section relative overflow-hidden px-6 py-24 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-20 text-4xl font-display uppercase tracking-[0.12em] text-white lg:text-5xl">
            How We Build It
          </h2>
          <div className="grid gap-8 lg:grid-cols-4">
            {service.processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-red/10">
                  <span className="text-2xl font-display font-bold text-accent-red">
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-display uppercase tracking-[0.1em] text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-white/70">
                  {step.description}
                </p>
                {index < service.processSteps.length - 1 && (
                  <div className="mt-8 h-0.5 w-12 bg-gradient-to-r from-accent-red to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="rounded-[40px] border border-accent-red/30 bg-gradient-to-br from-accent-red/10 to-accent-red/5 p-12 text-center">
            <h3 className="mb-4 text-3xl font-display uppercase tracking-[0.1em] text-white">
              Pricing
            </h3>
            <p className="mb-6 text-5xl font-display text-accent-red">
              {service.startingPrice}
            </p>
            <p className="text-white/70">
              Starting from — final price depends on project scope. Let's
              discuss your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-10">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-red via-[#8B0014] to-[#44000b]" />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center text-center text-white">
          <h2 className="mb-6 text-4xl font-display uppercase tracking-[0.1em] lg:text-5xl">
            Interested in this service?
          </h2>
          <p className="mb-10 max-w-2xl text-lg text-white/90">
            Let's discuss how we can build this for your business.
          </p>
          <a
            href="/contact"
            className="rounded-full bg-white px-12 py-4 text-lg font-semibold uppercase tracking-[0.2em] text-accent-red transition hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}

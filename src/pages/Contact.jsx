import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
  }, []);

  // Scroll animation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-card", {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".contact-form", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Back button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Valid phone number required";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email required";
    }
    if (!formData.service) newErrors.service = "Service selection required";
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: "hameed.learner@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        phone: "+91" + formData.phone,
        service: formData.service,
        budget: formData.budget || "Not specified",
        message: formData.message,
      });

      setSubmitStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        budget: "",
        message: "",
      });

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Back Button */}
      {scrolled && (
        <a
          href="/"
          className="fixed top-8 left-8 z-40 rounded-full bg-white/10 backdrop-blur px-4 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-accent-red/20"
        >
          ← Back
        </a>
      )}

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-20 lg:px-10 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
          <div className="relative mx-auto max-w-[1400px]">
            {/* Breadcrumb */}
            <div className="mb-12 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/60">
              <a href="/" className="hover:text-white transition">
                Home
              </a>
              <span>/</span>
              <span className="text-white">Contact</span>
            </div>

            {/* Content */}
            <h1 className="mb-6 text-5xl lg:text-7xl font-display uppercase tracking-[0.08em] text-white">
              LET&apos;S BUILD SOMETHING
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              Available for freelance projects in Mahabubnagar and remote work
              across India. <br />
              <span className="mt-2 inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                Currently Available
              </span>
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section
          ref={sectionRef}
          className="relative overflow-hidden px-6 py-24 lg:px-10"
        >
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(232,23,46,0.08),_transparent_40%)]" />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
              {/* Left Column - Contact Info */}
              <div>
                <h2 className="mb-12 text-3xl font-display uppercase tracking-[0.1em] text-white">
                  Get In Touch
                </h2>

                {/* WhatsApp Card */}
                <div className="contact-card mb-6 rounded-[24px] border-l-4 border-l-green-500 border border-white/10 bg-[#111111]/90 p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                    WhatsApp — Fastest Response
                  </p>
                  <p className="mb-4 text-2xl font-bold text-white">
                    +91 83338 56442
                  </p>
                  <a
                    href="https://wa.me/918333856442?text=Hi%20Hameed,%20I%20found%20your%20portfolio%20and%20I'd%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full bg-green-500/20 border border-green-500 px-4 py-2 text-sm uppercase tracking-[0.2em] text-green-400 transition hover:bg-green-500/30"
                  >
                    Open WhatsApp
                  </a>
                </div>

                {/* Email Card */}
                <div className="contact-card mb-6 rounded-[24px] border-l-4 border-l-accent-red border border-white/10 bg-[#111111]/90 p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                    Email
                  </p>
                  <p className="mb-4 text-xl text-white">
                    hameed.learner@gmail.com
                  </p>
                  <a
                    href="mailto:hameed.learner@gmail.com"
                    className="inline-flex rounded-full bg-accent-red/20 border border-accent-red px-4 py-2 text-sm uppercase tracking-[0.2em] text-accent-red transition hover:bg-accent-red/30"
                  >
                    Send Email
                  </a>
                </div>

                {/* Location Card */}
                <div className="contact-card rounded-[24px] border-l-4 border-l-accent-red border border-white/10 bg-[#111111]/90 p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                    Based In
                  </p>
                  <p className="mb-2 text-xl text-white">
                    Mahabubnagar, Telangana, India
                  </p>
                  <p className="text-sm text-white/70">
                    Available for remote work anywhere in India
                  </p>
                </div>

                {/* Availability */}
                <div className="mt-12 rounded-[24px] border border-white/10 bg-[#111111]/90 p-8">
                  <p className="mb-4 text-sm text-white/70">
                    <span className="block font-semibold text-white">
                      Response Time:
                    </span>
                    Within 2–4 hours on WhatsApp
                  </p>
                  <p className="mb-4 text-sm text-white/70">
                    <span className="block font-semibold text-white">
                      Working Hours:
                    </span>
                    9 AM – 10 PM IST
                  </p>
                  <p className="text-sm text-white/70">
                    <span className="block font-semibold text-white">
                      Available For:
                    </span>
                    Freelance projects, consulting, full-time remote roles
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-12 flex gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-accent-red hover:bg-accent-red/10"
                  >
                    GH
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-accent-red hover:bg-accent-red/10"
                  >
                    LI
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-accent-red hover:bg-accent-red/10"
                  >
                    IG
                  </a>
                </div>
              </div>

              {/* Right Column - Form */}
              <form onSubmit={handleSubmit} className="contact-form space-y-6">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/80">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Hameed Khan"
                    className="w-full rounded-[16px] border border-white/10 bg-[#111111] px-6 py-3 text-white placeholder-white/40 transition focus:border-accent-red/50 focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-accent-red">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/80">
                    Phone / WhatsApp *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-[16px] border border-r-0 border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white/60">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="8333856442"
                      className="w-full rounded-r-[16px] border border-white/10 bg-[#111111] px-6 py-3 text-white placeholder-white/40 transition focus:border-accent-red/50 focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-xs text-accent-red">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/80">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full rounded-[16px] border border-white/10 bg-[#111111] px-6 py-3 text-white placeholder-white/40 transition focus:border-accent-red/50 focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-accent-red">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/80">
                    Service You Need *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-[16px] border border-white/10 bg-[#111111] px-6 py-3 text-white transition focus:border-accent-red/50 focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                  >
                    <option value="">Select a service...</option>
                    <option value="WhatsApp Automation System">
                      WhatsApp Automation System
                    </option>
                    <option value="Website Development">
                      Website Development
                    </option>
                    <option value="REST API / Backend">
                      REST API / Backend
                    </option>
                    <option value="Admin Dashboard">Admin Dashboard</option>
                    <option value="Gym Management System">
                      Gym Management System
                    </option>
                    <option value="Other / Not Sure Yet">
                      Other / Not Sure Yet
                    </option>
                  </select>
                  {errors.service && (
                    <p className="mt-2 text-xs text-accent-red">
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/80">
                    Project Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-[16px] border border-white/10 bg-[#111111] px-6 py-3 text-white transition focus:border-accent-red/50 focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                  >
                    <option value="">Select budget range...</option>
                    <option value="Under ₹5,000">Under ₹5,000</option>
                    <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                    <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                    <option value="₹30,000+">₹30,000+</option>
                    <option value="Let's Discuss">Let's Discuss</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/80">
                    Tell Me About Your Project *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe what you need, what problem you're solving..."
                    rows={5}
                    className="w-full rounded-[16px] border border-white/10 bg-[#111111] px-6 py-3 text-white placeholder-white/40 transition focus:border-accent-red/50 focus:outline-none focus:ring-2 focus:ring-accent-red/20 resize-none"
                  ></textarea>
                  <div className="mt-2 flex justify-between">
                    {errors.message && (
                      <p className="text-xs text-accent-red">
                        {errors.message}
                      </p>
                    )}
                    <p className="text-xs text-white/50 ml-auto">
                      {formData.message.length} / 500
                    </p>
                  </div>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="rounded-[16px] border border-green-500/50 bg-green-500/10 p-4">
                    <p className="text-sm text-green-400">
                      ✓ Message sent! I'll reply within 4 hours on WhatsApp.
                    </p>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="rounded-[16px] border border-accent-red/50 bg-accent-red/10 p-4">
                    <p className="text-sm text-accent-red">
                      ✕ Error sending message. Please try again or email me
                      directly.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-accent-red py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-accent-red/90 disabled:opacity-60"
                >
                  {isLoading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

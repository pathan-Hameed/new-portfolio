import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
];

const services = [
  "WhatsApp Automation",
  "REST APIs",
  "Web Applications",
  "Admin Dashboards",
];

export default function Footer() {
  const nameRef = useRef(null);

  useEffect(() => {
    const element = nameRef.current;
    if (!element) return;

    const chars = Array.from(element.querySelectorAll("span"));
    const handler = () => {
      gsap.fromTo(
        chars,
        { y: 0 },
        {
          y: -8,
          duration: 0.35,
          stagger: 0.03,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
        },
      );
    };

    element.addEventListener("mouseenter", handler);
    return () => element.removeEventListener("mouseenter", handler);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-6 py-20 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06),_transparent_40%)]" />
      </div>
      <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-4">
        <div className="space-y-6">
          <div className="text-7xl font-display uppercase tracking-[0.3em] text-white/5">
            AHK
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/70">
            Freelance developer focused on Node.js backends, REST APIs, WhatsApp
            automation, and full-stack web systems.
          </p>
          <div className="flex gap-3 text-white">
            <a
              href="https://github.com"
              className="rounded-2xl bg-white/5 p-3 transition hover:bg-accent-red/20"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              className="rounded-2xl bg-white/5 p-3 transition hover:bg-accent-red/20"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              className="rounded-2xl bg-white/5 p-3 transition hover:bg-accent-red/20"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/919000000000"
              className="rounded-2xl bg-white/5 p-3 transition hover:bg-accent-red/20"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-sm uppercase tracking-[0.35em] text-white/60">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            {links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="transition hover:text-accent-red"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-sm uppercase tracking-[0.35em] text-white/60">
            Services
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            {services.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-sm uppercase tracking-[0.35em] text-white/60">
            Contact
          </h3>
          <div className="space-y-4 text-sm text-white/70">
            <p>Email: hello@ahkdev.in</p>
            <p>Phone: +91 90000 00000</p>
            <p>Mahabubnagar, Telangana</p>
          </div>
        </div>
      </div>
      <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-white/60">
        <span>© {new Date().getFullYear()} Designed & Built by </span>
        <span ref={nameRef} className="inline-flex cursor-pointer text-white">
          {"Abdul Hameed Khan".split("").map((char, index) => (
            <span key={`${char}-${index}`} className="inline-block">
              {char}
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}

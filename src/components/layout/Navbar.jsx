import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          const isScrolled = self.scroll() > 80;
          gsap.to(nav, {
            background: isScrolled ? "rgba(8, 8, 8, 0.92)" : "rgba(8, 8, 8, 0)",
            borderBottomColor: isScrolled
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0)",
            duration: 0.35,
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          });
        },
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-transparent transition-all duration-300"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="/"
          className="font-display text-2xl uppercase tracking-[0.4em] text-white"
        >
          AHK<span className="text-accent-red">.</span>
        </a>

        <nav className="hidden items-center justify-center gap-10 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm uppercase tracking-[0.35em] text-white transition-all hover:text-accent-red"
            >
              <span>{link.label}</span>
              <span className="absolute left-0 bottom-[-6px] h-[1px] w-0 bg-accent-red transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <MagneticButton className="bg-accent-red text-white shadow-[0_20px_60px_rgba(232,23,46,0.18)] hover:bg-[#e1172ece]">
            <a href="/contact" className="block px-4 py-3">
              Hire Me
            </a>
          </MagneticButton>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] lg:hidden"
            onClick={() => setMenuOpen((state) => !state)}
            aria-label="Toggle mobile menu"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white mt-1.5" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-30 bg-bg-primary/95 backdrop-blur-2xl transition-transform duration-500 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex h-full flex-col items-end px-6 py-8">
          <button
            type="button"
            className="mb-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            ✕
          </button>

          <div className="mt-10 flex flex-1 flex-col items-end justify-center gap-8 text-right font-display text-5xl uppercase tracking-[0.35em] text-white">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

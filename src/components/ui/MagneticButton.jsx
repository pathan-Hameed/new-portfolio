import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({ children, className = "", ...props }) {
  const btnRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    const btn = btnRef.current;
    if (!el || !btn) return;

    const moveFn = (event) => {
      const bounds = el.getBoundingClientRect();
      const relX = event.clientX - bounds.left - bounds.width / 2;
      const relY = event.clientY - bounds.top - bounds.height / 2;
      gsap.to(btn, {
        x: relX * 0.18,
        y: relY * 0.12,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const reset = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
    };

    el.addEventListener("mousemove", moveFn);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", moveFn);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="magnetic-button inline-block">
      <button
        ref={btnRef}
        className={`relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

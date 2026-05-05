import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const cursorTextRef = useRef(null);
  const rafRef = useRef(null);
  const position = useRef({
    x: window?.innerWidth / 2 || 0,
    y: window?.innerHeight / 2 || 0,
  });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    const cursorText = cursorTextRef.current;
    const outerSetter = gsap.quickSetter(outer, "css");
    const innerSetter = gsap.quickSetter(inner, "css");

    const update = () => {
      position.current.x += (target.current.x - position.current.x) * 0.12;
      position.current.y += (target.current.y - position.current.y) * 0.12;
      outerSetter({ x: position.current.x, y: position.current.y });
      innerSetter({ x: target.current.x, y: target.current.y });
      rafRef.current = requestAnimationFrame(update);
    };

    const handleMouseMove = (event) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const handleInteractiveEnter = (event) => {
      const targetEl = event.currentTarget;
      outer.classList.add("cursor-hover");
      if (targetEl.dataset.cursor === "view") {
        cursorText.textContent = "VIEW";
        outer.classList.add("cursor-view");
      }
    };

    const handleInteractiveLeave = () => {
      outer.classList.remove("cursor-hover", "cursor-view");
      cursorText.textContent = "";
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor], .project-card, .magnetic-button",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleInteractiveEnter);
      el.addEventListener("mouseleave", handleInteractiveLeave);
    });

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleInteractiveEnter);
        el.removeEventListener("mouseleave", handleInteractiveLeave);
      });
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-red/60 bg-transparent transition-none"
        style={{ mixBlendMode: "normal" }}
      >
        <span
          ref={cursorTextRef}
          className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white tracking-[0.25em] opacity-0"
        />
      </div>
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-red transition-none"
      />
    </>
  );
}

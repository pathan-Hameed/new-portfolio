import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const faces = [
  { label: "Node.js", className: "face-front" },
  { label: "MongoDB", className: "face-back" },
  { label: "React", className: "face-right" },
  { label: "JavaScript", className: "face-left" },
  { label: "Express.js", className: "face-top" },
  { label: "WhatsApp API", className: "face-bottom" },
];

export default function Cube3D() {
  const cubeRef = useRef(null);
  const rootRef = useRef(null);
  const rotation = useRef({ x: 35, y: -35 });
  const pointer = useRef({ x: 0, y: 0, down: false });

  useEffect(() => {
    const cube = cubeRef.current;
    const root = rootRef.current;
    if (!cube || !root) return;

    const animation = gsap.to(cube, {
      rotateX: "+=45",
      rotateY: "+=50",
      duration: 24,
      repeat: -1,
      ease: "none",
      modifiers: {
        rotateX: gsap.utils.unitize((value) => parseFloat(value) % 360),
      },
    });

    const onPointerDown = (event) => {
      pointer.current.down = true;
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      animation.pause();
    };

    const onPointerMove = (event) => {
      if (!pointer.current.down) return;
      const deltaX = event.clientX - pointer.current.x;
      const deltaY = event.clientY - pointer.current.y;
      rotation.current.y += deltaX * 0.2;
      rotation.current.x -= deltaY * 0.2;
      gsap.to(cube, {
        rotateX: rotation.current.x,
        rotateY: rotation.current.y,
        duration: 0.2,
        ease: "power3.out",
      });
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
    };

    const onPointerUp = () => {
      pointer.current.down = false;
      animation.resume();
    };

    root.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      animation.kill();
      root.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto flex h-[420px] w-[420px] items-center justify-center"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-red/10 to-transparent blur-3xl" />
      <div
        ref={cubeRef}
        className="relative z-10 h-[220px] w-[220px] transform-style-preserve-3d will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {faces.map((face) => (
          <div
            key={face.label}
            className={`absolute inset-0 flex items-center justify-center rounded-2xl border border-accent-red/30 bg-[#111111]/90 p-4 text-center text-sm font-semibold uppercase tracking-[0.24em] ${face.className}`}
          >
            <span>{face.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

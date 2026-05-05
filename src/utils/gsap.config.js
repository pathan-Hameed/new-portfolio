export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const safeGsap = (gsap) => {
  if (prefersReducedMotion()) {
    return null;
  }
  return gsap;
};

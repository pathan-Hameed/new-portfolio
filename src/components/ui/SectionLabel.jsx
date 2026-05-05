import React from "react";

export default function SectionLabel({ children }) {
  return (
    <div className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent-red">
      <span className="h-0.5 w-10 bg-accent-red" />
      <span>{children}</span>
    </div>
  );
}

"use client";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      className={`relative z-10 min-h-screen w-full px-6 py-24 md:px-16 md:py-32 ${
        className ?? ""
      }`}
    >
      {children}
    </section>
  );
}

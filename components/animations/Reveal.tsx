"use client";
import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}

export function Reveal({ children, className, y, delay }: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ y, delay });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

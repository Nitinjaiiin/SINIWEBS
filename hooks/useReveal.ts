"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

export function useReveal<T extends HTMLElement>(options?: {
  y?: number;
  delay?: number;
}) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const y = options?.y ?? 40;
  const delay = options?.delay ?? 0;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reduced) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }
    const context = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 85%", once: true },
      });
    }, element);
    return () => context.revert();
  }, [reduced, y, delay]);

  return ref;
}

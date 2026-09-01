"use client";
import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PageEntrance() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: reduced });

      tl.from("main", { opacity: 0, duration: 0.8, ease: "power2.out" })
        .from("[data-entrance='label']", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from("[data-entrance='headline-line']", {
          opacity: 0,
          y: 50,
          filter: "blur(12px)",
          duration: 1.1,
          stagger: 0.14,
        }, "-=0.5")
        .from("[data-entrance='paragraph']", { opacity: 0, y: 24, duration: 0.9 }, "-=0.35")
        .from("[data-entrance='cta']", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
        .from("[data-entrance='footer-label']", { opacity: 0, y: 15, duration: 0.7 }, "-=0.3");

      if (reduced) tl.progress(1);
    });
    return () => ctx.revert();
  }, [reduced]);

  return null;
}

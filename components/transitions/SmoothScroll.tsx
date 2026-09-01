"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    scrollStore.lenis = lenis;

    let ticking = false;
    const onScroll = (event: Lenis) => {
      scrollStore.setProgress(event.progress ?? 0);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ScrollTrigger.update();
          ticking = false;
        });
      }
    };
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement;
      const link = target.closest("a[href^='#']");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const section = document.querySelector(href);
      if (section instanceof HTMLElement) {
        event.preventDefault();
        lenis.scrollTo(section, { offset: -80, duration: 1.2 });
      }
    };

    window.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      scrollStore.lenis = null;
      window.removeEventListener("click", handleAnchorClick);
    };
  }, [reduced]);

  return null;
}

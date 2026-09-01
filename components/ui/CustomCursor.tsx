"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.body.classList.add("cursor-none");
    gsap.set(dot, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });

    let revealed = false;
    let ticking = false;
    const mouseTarget = { x: 0, y: 0 };

    const updateCursor = () => {
      xToDot(mouseTarget.x);
      yToDot(mouseTarget.y);
      ticking = false;
    };

    const move = (event: MouseEvent) => {
      if (!revealed) {
        revealed = true;
        gsap.to(dot, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      }
      mouseTarget.x = event.clientX;
      mouseTarget.y = event.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateCursor);
      }
    };

    const over = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const label = target.getAttribute("data-cursor") ?? "";
        dot.setAttribute("data-label", label);
        gsap.to(dot, { scale: 0, duration: 0.2, ease: "power2.in" });
      } else {
        dot.removeAttribute("data-label");
        gsap.to(dot, { scale: 1, duration: 0.25, ease: "power2.out", delay: 0.05 });
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("cursor-none");
      gsap.set(dot, { autoAlpha: 0 });
    };
  }, []);

  return (
    <div
      ref={dotRef}
      data-cursor-root
      data-cursor="dot"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex h-2 w-2 items-center justify-center rounded-full bg-off-white"
      style={{
        willChange: "transform",
      }}
    />
  );
}

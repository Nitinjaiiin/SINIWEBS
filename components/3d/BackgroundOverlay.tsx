"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackgroundOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const crimsonRef = useRef<HTMLDivElement>(null);
  const indigoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (reduced) return;

    let ticking = false;
    const handleMouseMove = (event: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        setMouse({ x, y });

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            x: (x - 0.5) * 80,
            y: (y - 0.5) * 60,
            duration: 1.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        ticking = false;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const updateAtmosphere = () => {
      if (!containerRef.current) return;
      const p = scrollStore.progress;

      if (p < 0.25) {
        containerRef.current.style.setProperty("--atmosphere-hue", "220");
        containerRef.current.style.setProperty("--atmosphere-saturation", "55%");
      } else if (p < 0.5) {
        containerRef.current.style.setProperty("--atmosphere-hue", "260");
        containerRef.current.style.setProperty("--atmosphere-saturation", "45%");
      } else if (p < 0.75) {
        containerRef.current.style.setProperty("--atmosphere-hue", "350");
        containerRef.current.style.setProperty("--atmosphere-saturation", "40%");
      } else {
        containerRef.current.style.setProperty("--atmosphere-hue", "15");
        containerRef.current.style.setProperty("--atmosphere-saturation", "45%");
      }

      if (crimsonRef.current) {
        gsap.to(crimsonRef.current, {
          y: p * -30,
          opacity: 0.12 - p * 0.04,
          duration: 0.8,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
      if (indigoRef.current) {
        gsap.to(indigoRef.current, {
          y: p * -20,
          opacity: 0.1 - p * 0.03,
          duration: 0.8,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    };

    const unsubscribe = scrollStore.subscribe(updateAtmosphere);
    updateAtmosphere();

    return unsubscribe;
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={
        {
          "--mouse-x": `${mouse.x * 100}%`,
          "--mouse-y": `${mouse.y * 100}%`,
        } as React.CSSProperties
      }
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Cinematic edge darkening */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(6,7,10,0.85) 100%)",
        }}
      />

      {/* Deep crimson accent glow - top right */}
      <div
        ref={crimsonRef}
        className="absolute -right-20 -top-10 h-[40vh] w-[30vw] rounded-full opacity-[0.06] blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(159,18,57,0.35) 0%, rgba(127,29,29,0.15) 35%, transparent 70%)",
        }}
      />

      {/* Indigo accent glow - bottom left */}
      <div
        ref={indigoRef}
        className="absolute -left-16 -bottom-10 h-[35vh] w-[28vw] rounded-full opacity-[0.05] blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,27,75,0.35) 0%, rgba(49,46,129,0.15) 35%, transparent 70%)",
        }}
      />

      {/* Cursor-reactive warm glow */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 h-[28vh] w-[28vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(220,38,38,0.25) 0%, rgba(127,29,29,0.1) 40%, transparent 70%)",
        }}
      />

      {/* Atmospheric hue shift on scroll */}
      <div
        className="absolute inset-0 opacity-[0.04] transition-opacity duration-[1200ms]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(var(--atmosphere-hue, 220) 50% 35%) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

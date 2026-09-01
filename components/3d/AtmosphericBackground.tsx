"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AtmosphericBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
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
            x: (x - 0.5) * 60,
            y: (y - 0.5) * 40,
            duration: 1.6,
            ease: "power2.out",
          });
        }
        ticking = false;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={
        {
          "--mouse-x": `${mouse.x * 100}%`,
          "--mouse-y": `${mouse.y * 100}%`,
        } as React.CSSProperties
      }
    >
      {/* Cinematic edge darkening */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(5,6,8,0.88) 100%)",
        }}
      />

      {/* Deep crimson accent glow */}
      <div
        className="absolute -right-20 -top-10 h-[35vh] w-[28vw] rounded-full opacity-[0.05] blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(159,18,57,0.3) 0%, rgba(127,29,29,0.12) 40%, transparent 70%)",
        }}
      />

      {/* Indigo accent glow */}
      <div
        className="absolute -left-16 -bottom-10 h-[30vh] w-[24vw] rounded-full opacity-[0.04] blur-[60px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,27,75,0.3) 0%, rgba(49,46,129,0.12) 40%, transparent 70%)",
        }}
      />

      {/* Cursor-reactive warm glow */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 h-[22vh] w-[22vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] blur-[60px]"
        style={{
          background:
            "radial-gradient(circle, rgba(220,38,38,0.25) 0%, rgba(127,29,29,0.1) 40%, transparent 70%)",
        }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

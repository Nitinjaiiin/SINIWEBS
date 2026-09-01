"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SELECTOR = "a, button, [data-magnetic]";

export function MagneticCursor() {
  const rafRef = useRef<number>(0);
  const targetsRef = useRef<Map<string, { el: HTMLElement; x: number; y: number; rect: DOMRect }>>(
    new Map()
  );
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);

  useEffect(() => {
    reducedRef.current = reduced;
  });

  function getKey(el: HTMLElement): string {
    return el.tagName + (el.getAttribute("href") ?? "") + (el.textContent ?? "").slice(0, 24);
  }

  useEffect(() => {
    if (reducedRef.current) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const targets = targetsRef.current;

    function scan() {
      const nodes = document.querySelectorAll(SELECTOR);
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i] as HTMLElement;
        const key = getKey(el);
        if (!targets.has(key)) {
          targets.set(key, { el, x: 0, y: 0, rect: el.getBoundingClientRect() });
        }
      }
    }

    scan();

    const refreshTargets = () => {
      const current = new Set<string>();
      const nodes = document.querySelectorAll(SELECTOR);
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i] as HTMLElement;
        const key = getKey(el);
        current.add(key);
        if (!targets.has(key)) {
          targets.set(key, { el, x: 0, y: 0, rect: el.getBoundingClientRect() });
        } else {
          const data = targets.get(key)!;
          data.rect = el.getBoundingClientRect();
        }
      }
      for (const key of targets.keys()) {
        if (!current.has(key)) targets.delete(key);
      }
    };

    let rafId = 0;
    const scheduleRefresh = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(refreshTargets);
    };

    const observer = new MutationObserver(scheduleRefresh);
    observer.observe(document.body, { childList: true, subtree: true });

    const refreshOnLayout = () => scheduleRefresh();
    window.addEventListener("scroll", refreshOnLayout, { passive: true });
    window.addEventListener("resize", refreshOnLayout, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        for (const data of targets.values()) {
          const rect = data.rect;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = Math.max(rect.width, rect.height) * 0.75;

          if (dist < radius) {
            const strength = 1 - dist / radius;
            const pull = strength * strength * 0.35;
            data.x += (dx * pull - data.x) * 0.15;
            data.y += (dy * pull - data.y) * 0.15;
            gsap.to(data.el, {
              x: data.x,
              y: data.y,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else if (data.x !== 0 || data.y !== 0) {
            data.x *= 0.8;
            data.y *= 0.8;
            if (Math.abs(data.x) < 0.01 && Math.abs(data.y) < 0.01) {
              data.x = 0;
              data.y = 0;
              gsap.to(data.el, { x: 0, y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            } else {
              gsap.to(data.el, {
                x: data.x,
                y: data.y,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", refreshOnLayout);
      window.removeEventListener("resize", refreshOnLayout);
      observer.disconnect();
      for (const data of targets.values()) {
        gsap.set(data.el, { x: 0, y: 0, overwrite: true });
      }
      targets.clear();
    };
  }, []);

  return null;
}

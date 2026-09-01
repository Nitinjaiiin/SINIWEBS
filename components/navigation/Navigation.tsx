"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { scrollStore } from "@/lib/scroll-store";
import { useNavigation } from "./NavigationContext";
import { useConsultation } from "@/components/consultation/ConsultationContext";

const items = [
  { index: "01", label: "Work", href: "#work" },
  { index: "02", label: "Packages", href: "#packages" },
  { index: "03", label: "Process", href: "#process" },
  { index: "04", label: "Contact", href: "#contact" },
];

export function Navigation() {
  const { open, setOpen } = useNavigation();
  const { setOpen: setConsultationOpen, setInitialPackage } = useConsultation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const closeMenu = () => setOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      event.preventDefault();
      closeMenu();
      const target = document.querySelector(href);
      if (target instanceof HTMLElement) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        if (scrollStore.lenis) {
          scrollStore.lenis.scrollTo(top, { duration: 1.2 });
        } else {
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  const handleStartProject = () => {
    closeMenu();
    setInitialPackage("custom");
    setConsultationOpen(true);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const listItems = itemsRef.current.filter(Boolean);

    if (!overlay) return;

    const ctx = gsap.context(() => {
      if (open) {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onStart: () => {
            overlay.style.pointerEvents = "auto";
          },
        });
        gsap.to(listItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        });
      } else {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            overlay.style.pointerEvents = "none";
          },
        });
        gsap.to(listItems, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.in",
        });
      }
    });

    return () => ctx.revert();
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="fixed right-6 top-6 z-[60] flex h-12 w-12 items-center justify-center text-xs uppercase tracking-[0.2em] text-off-white mix-blend-difference"
      >
        {open ? "Close" : "Menu"}
      </button>

      <nav
        ref={overlayRef}
        aria-hidden={!open}
        className="fixed inset-0 z-50 flex flex-col justify-center bg-charcoal/95 backdrop-blur-sm opacity-0 pointer-events-none"
      >
        <ul className="flex flex-col gap-6 px-8 md:px-16">
          {items.map((item, i) => (
            <li
              key={item.href}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="opacity-0 translate-y-5"
            >
              <a
                href={item.href}
                onClick={handleClick}
                className="group relative flex items-baseline gap-4 text-off-white"
              >
                <span className="text-sm text-mist transition-colors duration-300 group-hover:text-muted-red">{item.index}</span>
                <span className="text-4xl font-medium tracking-tight transition-all duration-300 group-hover:text-muted-red group-hover:translate-x-2 md:text-6xl">
                  {item.label}
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-muted-red transition-all duration-300 group-hover:w-12" />
              </a>
            </li>
          ))}
          <li className="opacity-0 translate-y-5">
            <button
              type="button"
              onClick={handleStartProject}
              className="group relative flex items-baseline gap-4 text-off-white"
            >
              <span className="text-sm text-mist transition-colors duration-300 group-hover:text-muted-red">05</span>
              <span className="text-4xl font-medium tracking-tight transition-all duration-300 group-hover:text-muted-red group-hover:translate-x-2 md:text-6xl">
                Start a Project
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-muted-red transition-all duration-300 group-hover:w-12" />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

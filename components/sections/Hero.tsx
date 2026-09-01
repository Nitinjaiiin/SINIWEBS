"use client";

import { useRef } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-transparent to-black/30" />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,6,8,0.9) 100%)",
        }}
      />

      <div ref={contentRef} className="relative z-10 max-w-5xl px-6 md:px-16">
        <p
          className="text-base md:text-lg font-medium uppercase tracking-[0.5em] md:tracking-[0.6em] text-off-white/80 mb-10 transition-all duration-500 hover:text-off-white hover:tracking-[0.65em]"
          data-entrance="label"
          style={{ textShadow: "0 0 30px rgba(159,18,57,0.18)" }}
        >
          SINIWEBS
        </p>

        <h1
          ref={headlineRef}
          data-entrance="headline"
          className="text-[clamp(3rem,8vw,7.5rem)] font-extrabold tracking-tighter leading-[0.85] mb-8"
        >
          <span data-entrance="headline-line" className="block overflow-hidden">
            <span data-entrance="headline-word" className="inline-block">
              WE BUILD
            </span>
          </span>
          <span data-entrance="headline-line" className="block overflow-hidden">
            <span
              data-entrance="headline-word"
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-off-white via-off-white to-off-white/70"
            >
              DIGITAL
            </span>
          </span>
          <span data-entrance="headline-line" className="block overflow-hidden">
            <span
              data-entrance="headline-word"
              className="inline-block text-muted-red"
              style={{
                textShadow:
                  "0 0 40px rgba(159,18,57,0.35), 0 0 80px rgba(159,18,57,0.15)",
              }}
            >
              EXPERIENCES.
            </span>
          </span>
        </h1>

        <p
          data-entrance="paragraph"
          className="text-base text-off-white/35 max-w-lg mb-12 md:text-lg leading-relaxed font-light"
        >
          AI systems, websites and digital experiences for ambitious businesses.
        </p>

        <div data-entrance="cta" className="flex flex-wrap gap-4 mb-20">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-off-white text-black text-xs uppercase tracking-[0.18em] font-bold transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(159,18,57,0.2)] active:translate-y-0 active:scale-[0.97]"
          >
            <span>View Our Work</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#packages"
            className="group inline-flex items-center gap-3 px-7 py-4 border border-off-white/30 text-off-white text-xs uppercase tracking-[0.18em] font-bold transition-all duration-500 ease-out hover:border-muted-red hover:bg-off-white/10 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(159,18,57,0.25)] active:translate-y-0 active:scale-[0.97]"
          >
            <span>Start A Project</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div
          data-entrance="footer-label"
          className="flex items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-off-white/30">
            Web · AI · Digital
          </span>
          <span className="inline-block h-px w-8 bg-off-white/15" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-off-white/25">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

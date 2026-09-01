"use client";
import { Reveal } from "@/components/animations/Reveal";
import { AtmosphericBackground } from "@/components/3d/AtmosphericBackground";

export function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-24 md:px-16 md:py-32">
      <AtmosphericBackground />
      <div className="relative z-10 grid gap-16 md:grid-cols-2">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mist mb-4">
              About
            </p>
            <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
              SINIWEBS
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p className="text-lg text-light-gray leading-relaxed mb-12 md:text-xl">
              SINIWEBS is an independent digital studio founded by Nitin
              Sipani, focused on building modern websites, AI systems and
              digital experiences for businesses that want to move faster.
            </p>
            <div className="border-t border-off-white/10 pt-8">
              <p className="text-sm uppercase tracking-[0.2em] text-off-white">
                Nitin Sipani
              </p>
              <p className="text-sm text-mist mt-1">
                Founder · Developer · AI Entrepreneur
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

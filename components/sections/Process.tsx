"use client";
import { Reveal } from "@/components/animations/Reveal";
import { AtmosphericBackground } from "@/components/3d/AtmosphericBackground";

const steps = [
  { id: "01", name: "Discover", description: "Understand the business, audience and goals." },
  { id: "02", name: "Strategize", description: "Define the structure, experience and technical direction." },
  { id: "03", name: "Build", description: "Design and develop the system." },
  { id: "04", name: "Refine", description: "Test, optimize and polish every important detail." },
  { id: "05", name: "Launch", description: "Deploy and deliver the finished experience." },
];

export function Process() {
  return (
    <section id="process" className="relative z-10 px-6 py-24 md:px-16 md:py-32">
      <AtmosphericBackground />
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-mist mb-4">
          How We Work
        </p>
        <h2 className="text-3xl font-medium tracking-tight mb-16 md:mb-24 md:text-5xl">
          Process
        </h2>
      </Reveal>

      <div className="relative z-10 flex flex-col">
        {steps.map((step, i) => (
          <Reveal key={step.id} delay={i * 0.05}>
            <div className="group border-b border-off-white/10 py-8 md:py-12 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 transition-colors duration-300 hover:bg-off-white/[0.02] px-4 -mx-4">
              <span className="text-xs text-mist uppercase tracking-[0.2em] w-12 shrink-0">
                {step.id}
              </span>
              <div className="flex-1">
                <h3 className="text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-muted-red md:text-4xl">
                  {step.name}
                </h3>
                <p className="text-sm text-light-gray mt-2 max-w-lg">
                  {step.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

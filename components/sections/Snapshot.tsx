"use client";
import { Reveal } from "@/components/animations/Reveal";
import { AtmosphericBackground } from "@/components/3d/AtmosphericBackground";

const stats = [
  { value: "10+", label: "Projects" },
  { value: "$6K+", label: "Project Value" },
  { value: "AI + Web", label: "Core Services" },
];

export function Snapshot() {
  return (
    <section className="relative z-10 border-y border-off-white/10 px-6 py-16 md:px-16 md:py-24">
      <AtmosphericBackground />
      <div className="relative z-10">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
            <p className="text-xs uppercase tracking-[0.3em] text-mist">
              Projects & Experience
            </p>
            <div className="flex flex-col gap-8 md:flex-row md:gap-16">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-medium tracking-tight text-off-white md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-mist mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

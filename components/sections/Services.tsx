"use client";
import { Reveal } from "@/components/animations/Reveal";
import { AtmosphericBackground } from "@/components/3d/AtmosphericBackground";

const services = [
  {
    id: "01",
    name: "Website Development",
    description:
      "High-performance websites designed around conversion, brand and usability.",
  },
  {
    id: "02",
    name: "AI Systems",
    description:
      "AI assistants, automations and intelligent workflows for businesses.",
  },
  {
    id: "03",
    name: "Digital Experiences",
    description:
      "Interactive interfaces and premium digital products.",
  },
  {
    id: "04",
    name: "Business Automation",
    description:
      "Systems that reduce repetitive work and improve operational efficiency.",
  },
  {
    id: "05",
    name: "UI / UX",
    description:
      "Clean interfaces focused on usability and conversion.",
  },
  {
    id: "06",
    name: "Website Redesign",
    description:
      "Modernize outdated websites into premium digital experiences.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative z-10 px-6 py-24 md:px-16 md:py-32">
      <AtmosphericBackground />
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-mist mb-4">
          What We Build
        </p>
        <h2 className="text-3xl font-medium tracking-tight mb-16 md:mb-24 md:text-5xl">
          Services
        </h2>
      </Reveal>

      <div className="relative z-10 grid gap-0 md:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.05}>
            <div className="group border-b border-off-white/10 py-8 md:py-12 md:even:border-r md:even:pr-12 transition-colors duration-300 hover:bg-off-white/[0.02]">
              <div className="flex items-start gap-6">
                <span className="text-xs text-mist uppercase tracking-[0.2em] pt-1">
                  {service.id}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-muted-red md:text-2xl">
                    {service.name}
                  </h3>
                  <p className="text-sm text-light-gray mt-2 max-w-md">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

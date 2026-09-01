"use client";
import { Reveal } from "@/components/animations/Reveal";
import { useConsultation } from "@/components/consultation/ConsultationContext";
import { AtmosphericBackground } from "@/components/3d/AtmosphericBackground";

export function Contact() {
  const { setOpen, setInitialPackage } = useConsultation();

  const handleStartProject = () => {
    setInitialPackage("custom");
    setOpen(true);
  };

  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:px-16 md:py-32">
      <AtmosphericBackground />
      <Reveal>
        <div className="relative z-10 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-mist mb-4">
            Contact
          </p>
          <h2 className="text-4xl font-medium tracking-tight mb-8 md:text-6xl lg:text-7xl">
            Let&apos;s Build
            <br />
            Something.
          </h2>
          <p className="text-lg text-light-gray max-w-xl mb-12 md:text-xl leading-relaxed">
            Have a business, product or idea that needs a better digital
            experience?
          </p>
          <button
            type="button"
            onClick={handleStartProject}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-off-white text-black text-sm uppercase tracking-[0.18em] font-medium transition-all duration-500 hover:bg-muted-red hover:text-off-white hover:-translate-y-1 hover:shadow-2xl hover:shadow-muted-red/20 active:translate-y-0"
          >
            <span>Start A Project</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

          <div className="mt-24 pt-8 border-t border-off-white/10 flex flex-col gap-4 md:flex-row md:items-baseline md:gap-12">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-off-white">
                Nitin Sipani
              </p>
              <p className="text-xs text-mist mt-1">SINIWEBS</p>
            </div>
            <a
              href="mailto:hello@siniwebs.com"
              className="text-sm text-mist transition-colors duration-300 hover:text-off-white"
            >
              hello@siniwebs.com
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

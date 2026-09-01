"use client";
import { Reveal } from "@/components/animations/Reveal";
import { useConsultation } from "@/components/consultation/ConsultationContext";
import { AtmosphericBackground } from "@/components/3d/AtmosphericBackground";

const packages = [
  {
    id: "essential",
    number: "01",
    name: "ESSENTIAL",
    price: "₹20,000+",
    description:
      "For businesses that need a sharp, professional web presence.",
    features: [
      "Premium responsive website",
      "Up to 5 core pages",
      "Mobile optimization",
      "Modern UI/UX",
      "Basic animations & interactions",
      "Contact / lead capture",
      "SEO foundations",
      "Deployment",
    ],
  },
  {
    id: "signature",
    number: "02",
    name: "SIGNATURE",
    price: "₹35,000+",
    description:
      "For businesses that want a distinctive, conversion-focused digital presence.",
    features: [
      "Everything in Essential",
      "Custom page architecture",
      "Advanced animations & transitions",
      "Premium interactions",
      "CMS / content sections",
      "Advanced SEO foundations",
      "Conversion-focused structure",
      "Performance optimization",
      "Deployment + polish",
    ],
  },
  {
    id: "immersive",
    number: "03",
    name: "IMMERSIVE",
    price: "₹50,000+",
    description:
      "For brands that want a high-end digital experience rather than a conventional website.",
    features: [
      "Everything in Signature",
      "Highly custom visual direction",
      "Advanced motion design",
      "3D / interactive experiences",
      "Advanced scroll interactions",
      "Custom components",
      "Premium performance optimization",
      "Full launch polish",
    ],
  },
];

export function Packages() {
  const { setOpen, setInitialPackage } = useConsultation();

  const handleDiscuss = (pkg: string) => {
    setInitialPackage(pkg);
    setOpen(true);
  };

  return (
    <section id="packages" className="relative z-10 px-6 py-24 md:px-16 md:py-32">
      <AtmosphericBackground />
      <Reveal>
        <div className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-mist mb-4">
            Packages
          </p>
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
            Build Your Website
          </h2>
          <p className="text-base text-light-gray max-w-xl mt-6 md:text-lg leading-relaxed">
            Starting prices for self-initiated projects. Every engagement begins
            with a brief consultation to define scope, timeline, and investment.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-6 md:gap-8">
        {packages.map((pkg, index) => (
          <Reveal key={pkg.id} delay={index * 0.08}>
            <article className="group relative border border-off-white/[0.08] p-6 md:p-10 transition-all duration-500 hover:border-off-white/20 hover:bg-off-white/[0.015]">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-12">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-xs text-mist uppercase tracking-[0.2em]">
                      {pkg.number}
                    </span>
                    <span className="block h-px w-8 bg-off-white/15" />
                  </div>
                  <h3 className="text-3xl font-medium tracking-tight mb-3 md:text-4xl transition-colors duration-500 group-hover:text-off-white">
                    {pkg.name}
                  </h3>
                  <p className="text-2xl text-light-gray font-light mb-4 md:text-3xl">
                    {pkg.price}
                  </p>
                  <p className="text-sm text-light-gray leading-relaxed max-w-lg">
                    {pkg.description}
                  </p>
                </div>

                <div className="lg:w-72 flex-shrink-0">
                  <ul className="flex flex-col gap-2.5 mb-8">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-xs text-light-gray/80 leading-relaxed flex items-start gap-3"
                      >
                        <span className="mt-1.5 block h-px w-4 bg-off-white/15 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleDiscuss(pkg.id)}
                    className="w-full px-6 py-3.5 border border-off-white/15 text-xs uppercase tracking-[0.18em] text-off-white transition-all duration-500 hover:border-off-white hover:bg-off-white hover:text-black"
                  >
                    Discuss This Package
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-16 md:mt-24 border border-off-white/[0.08] p-6 md:p-10 transition-all duration-500 hover:border-off-white/15">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs text-mist uppercase tracking-[0.2em] mb-2">
                Need something else?
              </p>
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                Talk About a Custom Project
              </h3>
              <p className="text-sm text-light-gray leading-relaxed max-w-xl mt-3">
                AI systems, automation, custom applications, 3D experiences,
                landing pages, redesigns, and other digital work outside
                standard packages.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setInitialPackage("custom");
                setOpen(true);
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-off-white text-black text-sm uppercase tracking-[0.18em] font-medium transition-all duration-500 hover:bg-muted-red hover:text-off-white hover:-translate-y-1 hover:shadow-2xl hover:shadow-muted-red/15 flex-shrink-0"
            >
              <span>Talk About a Custom Project</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useConsultation } from "./ConsultationContext";

const steps = [
  {
    id: "greeting",
    question: "Tell us what you're building.",
    placeholder: "Describe your project in your own words...",
    type: "text",
    key: "greeting",
  },
  {
    id: "type",
    question: "What type of project do you need?",
    placeholder: "e.g. Website, AI automation, custom web app...",
    type: "text",
    key: "projectType",
  },
  {
    id: "business",
    question: "What does your business do?",
    placeholder: "Brief description of your business...",
    type: "text",
    key: "business",
  },
  {
    id: "package",
    question: "Which package seems closest to what you need?",
    placeholder: "",
    type: "choice",
    key: "package",
    options: [
      "Essential — ₹20,000+",
      "Signature — ₹35,000+",
      "Immersive — ₹50,000+",
      "Custom Project",
    ],
  },
  {
    id: "pages",
    question: "What pages or features do you need?",
    placeholder: "e.g. Home, About, Contact, CMS, dashboard...",
    type: "text",
    key: "pages",
  },
  {
    id: "existing",
    question: "Do you have an existing website?",
    placeholder: "URL if yes, otherwise say 'No'",
    type: "text",
    key: "existing",
  },
  {
    id: "references",
    question: "Do you have any references or inspiration?",
    placeholder: "Links or descriptions of styles you like...",
    type: "text",
    key: "references",
  },
  {
    id: "timeline",
    question: "What is your approximate timeline?",
    placeholder: "",
    type: "choice",
    key: "timeline",
    options: ["3 days", "7 days", "10 days", "Flexible"],
  },
  {
    id: "goals",
    question: "What should this project accomplish?",
    placeholder: "Key goals, conversions, or outcomes...",
    type: "text",
    key: "goals",
  },
  {
    id: "contact",
    question: "How can we reach you?",
    placeholder: "Name, email, and phone number",
    type: "text",
    key: "contact",
  },
];

const packageLabels: Record<string, string> = {
  essential: "Essential — ₹20,000+",
  signature: "Signature — ₹35,000+",
  immersive: "Immersive — ₹50,000+",
  custom: "Custom Project",
};

const PACKAGE_BASE_PRICE: Record<string, number> = {
  essential: 20000,
  signature: 35000,
  immersive: 50000,
};

const RUSH_TIMELINES = new Set(["3 days"]);

// Rush delivery surcharge configuration.
// Assign a numeric value when rush pricing is finalized for each eligible tier.
// Leave undefined to indicate rush is available but fee is pending confirmation.
const RUSH_DELIVERY_SURCHARGE: Record<string, number | undefined> = {
  signature: undefined,
  immersive: undefined,
};

function isRushTimeline(timeline: string | undefined): boolean {
  return timeline !== undefined && RUSH_TIMELINES.has(timeline);
}

function getRushDeliveryNote(
  packageId: string | undefined
): string | undefined {
  if (!packageId || packageId === "essential" || packageId === "custom") {
    return undefined;
  }
  const surcharge = RUSH_DELIVERY_SURCHARGE[packageId];
  if (surcharge !== undefined) {
    return `Rush Delivery Fee: ₹${surcharge.toLocaleString()}`;
  }
  return "Rush Delivery: Fee to be confirmed";
}

function getPackageIdFromLabel(
  label: string | undefined
): string | undefined {
  if (!label) return undefined;
  return (
    Object.keys(packageLabels).find((k) => packageLabels[k] === label) ??
    undefined
  );
}

export function ConsultationModal() {
  const { open, setOpen, initialPackage } = useConsultation();
  const reduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(0);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentStep = steps[stepIndex];

  const effectiveAnswers = useMemo(() => {
    if (currentStep.key === "package" && initialPackage && !answers.package) {
      return { ...answers, package: packageLabels[initialPackage] ?? "Custom Project" };
    }
    return answers;
  }, [answers, currentStep.key, initialPackage]);

  const resetState = useCallback(() => {
    setStepIndex(0);
    setAnswers({});
    setInput("");
    setSubmitted(false);
  }, []);

  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (!open && prevOpenRef.current) {
      resetState();
    }
    prevOpenRef.current = open;
  }, [open, resetState]);

  useEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(overlayRef.current, { autoAlpha: 1 });
        gsap.set(panelRef.current, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, [open, reduced]);

  useEffect(() => {
    if (!open || !contentRef.current || reduced) return;
    const el = contentRef.current;
    const dir = stepIndex > prevStepRef.current ? 1 : -1;
    prevStepRef.current = stepIndex;
    gsap.fromTo(
      el,
      { opacity: 0, x: dir * 24 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [stepIndex, open, reduced]);

  const handleNext = useCallback(() => {
    if (!input.trim()) return;
    const step = currentStep;
    setAnswers((prev) => ({ ...prev, [step.key]: input.trim() }));
    setInput("");
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setSubmitted(true);
    }
  }, [input, currentStep, stepIndex]);

  const handleBack = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      setInput(answers[steps[stepIndex - 1].key] ?? "");
    }
  }, [stepIndex, answers]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const displayAnswers = submitted ? answers : effectiveAnswers;

  const generateBrief = useCallback(() => {
    const pkgId = getPackageIdFromLabel(displayAnswers.package);
    const basePrice = pkgId ? PACKAGE_BASE_PRICE[pkgId] : undefined;
    const isRush = isRushTimeline(displayAnswers.timeline);
    const rushNote =
      isRush && pkgId ? getRushDeliveryNote(pkgId) : undefined;
    const rushFee =
      isRush && pkgId && RUSH_DELIVERY_SURCHARGE[pkgId] !== undefined
        ? RUSH_DELIVERY_SURCHARGE[pkgId]
        : undefined;
    const total =
      basePrice !== undefined ? basePrice + (rushFee ?? 0) : undefined;

    const parts: string[] = [];
    parts.push("Hello SINIWEBS! I'd like to start a project.");
    parts.push("");

    if (displayAnswers.contact) {
      parts.push(`Name: ${displayAnswers.contact}`);
    }
    if (displayAnswers.business) {
      parts.push(`Business / Brand: ${displayAnswers.business}`);
    }
    if (displayAnswers.projectType) {
      parts.push(`Project Type: ${displayAnswers.projectType}`);
    }
    if (displayAnswers.package) {
      parts.push(`Package: ${displayAnswers.package}`);
    }
    if (displayAnswers.timeline) {
      parts.push(`Timeline: ${displayAnswers.timeline}`);
    }
    parts.push(`Rush Delivery: ${isRush ? "Yes" : "No"}`);
    if (rushNote) {
      parts.push(rushNote);
    }
    if (displayAnswers.goals) {
      parts.push(`Budget: ${displayAnswers.goals}`);
    }
    if (displayAnswers.pages) {
      parts.push(`Project Details: ${displayAnswers.pages}`);
    }
    if (displayAnswers.existing) {
      parts.push(`Reference / Website: ${displayAnswers.existing}`);
    }
    if (displayAnswers.references) {
      parts.push(`References / Inspiration: ${displayAnswers.references}`);
    }

    parts.push("");
    if (total !== undefined) {
      parts.push(`Estimated Total: ₹${total.toLocaleString()}`);
    }
    parts.push("");
    parts.push("I'd like to discuss the project further.");

    return parts.join("\n");
  }, [displayAnswers]);

  const progress = submitted ? 100 : ((stepIndex + 1) / steps.length) * 100;

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-off-white/10 bg-charcoal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        {!submitted && (
          <div className="absolute top-0 left-0 right-0 h-px bg-off-white/10">
            <div
              className="h-full bg-muted-red transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 text-xs uppercase tracking-[0.2em] text-mist transition-colors duration-300 hover:text-off-white"
        >
          Close
        </button>

        {!submitted ? (
          <div ref={contentRef} className="p-6 md:p-10">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist mb-3">
                Consultation
              </p>
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                {currentStep.question}
              </h3>
            </div>

            <div className="mb-8">
              {currentStep.type === "choice" ? (
                <div className="flex flex-col gap-3">
                  {currentStep.options?.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setAnswers((prev) => ({ ...prev, [currentStep.key]: opt }));
                        setInput("");
                        if (stepIndex < steps.length - 1) {
                          setStepIndex((i) => i + 1);
                        } else {
                          setSubmitted(true);
                        }
                      }}
                      className="text-left border border-off-white/10 px-5 py-4 text-sm text-off-white transition-all duration-300 hover:border-off-white/40 hover:bg-off-white/5"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={currentStep.placeholder}
                  className="w-full bg-transparent border border-off-white/10 p-4 text-sm text-off-white placeholder:text-mist/50 focus:border-off-white/30 focus:outline-none transition-colors duration-300"
                  rows={3}
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-mist uppercase tracking-[0.2em]">
                {stepIndex + 1} / {steps.length}
              </span>
              <div className="flex gap-3">
                {stepIndex > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 border border-off-white/20 text-xs uppercase tracking-[0.15em] text-off-white transition-all duration-300 hover:border-off-white"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!input.trim()}
                  className="px-6 py-3 bg-off-white text-black text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:bg-muted-red hover:text-off-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {stepIndex === steps.length - 1 ? "Generate Brief" : "Next"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div ref={contentRef} className="p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-mist mb-4">
              Project Brief Ready
            </p>
            <h3 className="text-2xl font-medium tracking-tight mb-6 md:text-3xl">
              Your project brief is ready.
            </h3>
            <pre className="whitespace-pre-wrap border border-off-white/10 p-5 text-xs text-light-gray leading-relaxed mb-8">
              {generateBrief()}
            </pre>
            <a
              href={buildWhatsAppLink(generateBrief())}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-off-white text-black text-sm uppercase tracking-[0.18em] font-medium transition-all duration-500 hover:bg-muted-red hover:text-off-white hover:-translate-y-1"
            >
              <span>Continue on WhatsApp</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

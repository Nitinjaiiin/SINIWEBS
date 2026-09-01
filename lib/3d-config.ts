export type QualityTier = "high" | "medium" | "low";

export interface QualitySettings {
  dpr: number | [number, number];
  particleCount: number;
  shadows: boolean;
  postprocessing: boolean;
}

export function detectQuality(): QualityTier {
  if (typeof window === "undefined") return "high";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (coarse || memory <= 2 || cores <= 2) return "low";
  if (memory <= 4 || cores <= 4) return "medium";
  return "high";
}

export function getQualitySettings(tier: QualityTier): QualitySettings {
  switch (tier) {
    case "low":
      return { dpr: 1, particleCount: 0, shadows: false, postprocessing: false };
    case "medium":
      return { dpr: [1, 1.5], particleCount: 400, shadows: false, postprocessing: false };
    case "high":
      return { dpr: [1, 2], particleCount: 1200, shadows: true, postprocessing: true };
  }
}

"use client";
import { CameraRig } from "./CameraRig";
import { Environment } from "./Environment";
import { AdaptivePerformance } from "./Performance";
import { Haze } from "./Haze";
import { SceneWater } from "./SceneWater";
import { Stars } from "./Stars";
import { Particles } from "./Particles";
import { Petals } from "./Petals";
import { Mountains } from "./Mountains";
import type { QualityTier } from "@/lib/3d-config";

interface ExperienceProps {
  quality: QualityTier;
}

export function Experience({ quality }: ExperienceProps) {
  return (
    <>
      <AdaptivePerformance />
      <CameraRig />
      <Environment />
      <Stars count={quality === "low" ? 150 : quality === "medium" ? 300 : 600} />
      <Mountains quality={quality} />
      <SceneWater />
      <Particles count={quality === "low" ? 0 : quality === "medium" ? 250 : 500} />
      <Petals />
      <Haze />
    </>
  );
}

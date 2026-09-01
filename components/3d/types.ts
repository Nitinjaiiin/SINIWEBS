import type { ReactNode } from "react";
import type { QualityTier } from "@/lib/3d-config";

export interface SceneProps {
  children?: ReactNode;
}

export interface CameraRigProps {
  reducedMotion?: boolean;
}

export interface EnvironmentProps {
  quality: QualityTier;
}

export interface AtmosphereProps {
  quality: QualityTier;
}

export interface ParticlesProps {
  count: number;
}

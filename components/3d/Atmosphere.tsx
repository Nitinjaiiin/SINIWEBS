"use client";
import type { QualityTier } from "@/lib/3d-config";

export function Atmosphere({ quality }: { quality: QualityTier }) {
  const intensity = quality === "low" ? 0.2 : 0.4;
  return <hemisphereLight args={["#101A2A", "#050608", intensity]} />;
}

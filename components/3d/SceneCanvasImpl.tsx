"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { detectQuality, getQualitySettings } from "@/lib/3d-config";
import { Experience } from "./Experience";

export default function SceneCanvasImpl() {
  const tier = detectQuality();
  const settings = getQualitySettings(tier);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ willChange: 'transform' }} aria-hidden="true">
      <Canvas
        dpr={settings.dpr}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <Suspense fallback={null}>
          <Experience quality={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}

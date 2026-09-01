"use client";
import { PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function AdaptivePerformance() {
  const setDpr = useThree((state) => state.setDpr);
  return (
    <PerformanceMonitor
      onChange={({ factor }) => {
        setDpr(Math.round((0.75 + 1.25 * factor) * 10) / 10);
      }}
    />
  );
}

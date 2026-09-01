"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed left-0 top-0 z-[70] h-[2px] bg-muted-red"
      style={{ width: `${progress * 100}%` }}
    />
  );
}

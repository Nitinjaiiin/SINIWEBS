"use client";
import { useSyncExternalStore } from "react";
import { scrollStore } from "@/lib/scroll-store";

export function useScrollProgress() {
  return useSyncExternalStore(
    scrollStore.subscribe,
    () => scrollStore.progress,
    () => 0,
  );
}

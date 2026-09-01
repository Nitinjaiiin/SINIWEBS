import type Lenis from "lenis";

let progress = 0;
const listeners = new Set<() => void>();
let lenisRef: Lenis | null = null;

export const scrollStore = {
  get progress() {
    return progress;
  },
  get lenis() {
    return lenisRef;
  },
  set lenis(value: Lenis | null) {
    lenisRef = value;
  },
  setProgress(value: number) {
    progress = value;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

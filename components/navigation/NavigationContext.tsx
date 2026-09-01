"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

interface NavigationState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const NavigationContext = createContext<NavigationState | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((value) => !value);
  return (
    <NavigationContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}

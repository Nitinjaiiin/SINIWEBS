"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

interface ConsultationState {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialPackage: string | null;
  setInitialPackage: (pkg: string | null) => void;
}

const ConsultationContext = createContext<ConsultationState | null>(null);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialPackage, setInitialPackage] = useState<string | null>(null);

  return (
    <ConsultationContext.Provider value={{ open, setOpen, initialPackage, setInitialPackage }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error("useConsultation must be used within ConsultationProvider");
  }
  return context;
}

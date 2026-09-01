"use client";
import type { ReactNode } from "react";
import { NavigationProvider } from "@/components/navigation/NavigationContext";
import { Navigation } from "@/components/navigation/Navigation";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { SmoothScroll } from "@/components/transitions/SmoothScroll";
import { ConsultationProvider } from "@/components/consultation/ConsultationContext";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConsultationProvider>
      <NavigationProvider>
        <SmoothScroll />
        {children}
        <Navigation />
        <CustomCursor />
        <MagneticCursor />
      </NavigationProvider>
      <ConsultationModal />
    </ConsultationProvider>
  );
}

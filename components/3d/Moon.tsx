"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { QualityTier } from "@/lib/3d-config";

interface MoonProps {
  quality: QualityTier;
}

export function Moon({ quality }: MoonProps) {
  const segments = quality === "low" ? 32 : quality === "medium" ? 48 : 64;
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current || reduced) return;
    const progress = scrollStore.progress;
    const time = state.clock.elapsedTime;

    meshRef.current.position.y = 1.2 + Math.sin(time * 0.25) * 0.12 + progress * 0.4;
    meshRef.current.position.x = 3.2 + Math.sin(time * 0.18) * 0.15;

    glowRef.current.position.y = meshRef.current.position.y;
    glowRef.current.position.x = meshRef.current.position.x;
    const s = 1 + Math.sin(time * 0.4) * 0.04;
    glowRef.current.scale.set(s, s, s);
  });

  return (
    <group>
      <mesh ref={glowRef} position={[3.2, 1.2, -9]}>
        <sphereGeometry args={[2.8, segments, segments]} />
        <meshBasicMaterial color="#2e1065" transparent opacity={0.12} fog={false} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef} position={[3.2, 1.2, -8]}>
        <sphereGeometry args={[1.8, segments, segments]} />
        <meshBasicMaterial color="#16162a" fog={false} />
      </mesh>
      <mesh position={[3.2, 1.2, -7.5]} scale={[1.6, 1.6, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7f1d1d" transparent opacity={0.06} fog={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

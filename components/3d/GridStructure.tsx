"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GridStructure() {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame(() => {
    if (!meshRef.current || reduced) return;
    const progress = scrollStore.progress;
    meshRef.current.position.y = -progress * 0.5;
    meshRef.current.rotation.x = Math.PI * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, -2, -12]} rotation={[Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial
        color="#22d3ee"
        wireframe
        transparent
        opacity={0.04}
        fog={true}
      />
    </mesh>
  );
}

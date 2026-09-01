"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current || reduced) return;
    const time = state.clock.elapsedTime;
    const progress = scrollStore.progress;

    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.12;
    groupRef.current.rotation.z = Math.cos(time * 0.025) * 0.08;
    groupRef.current.position.y = Math.sin(time * 0.12) * 0.08 - progress * 0.4;
  });

  return (
    <group ref={groupRef} position={[2.8, 0, -2.4]}>
      <mesh>
        <torusKnotGeometry args={[1.25, 0.38, 256, 40, 2, 3]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.95}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      <mesh position={[-0.75, 0.55, 0.45]} scale={0.32}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          metalness={0.7}
          roughness={0.15}
          clearcoat={0.9}
          clearcoatRoughness={0.08}
        />
      </mesh>
    </group>
  );
}

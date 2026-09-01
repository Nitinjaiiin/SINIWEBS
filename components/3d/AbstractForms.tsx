"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FormData {
  position: [number, number, number];
  scale: number;
  speed: number;
  geometry: "torus" | "icosa" | "octahedron" | "torusKnot";
  color: string;
  metalness: number;
  roughness: number;
}

const forms: FormData[] = [
  { position: [-4, 2, -6], scale: 0.6, speed: 0.15, geometry: "torus", color: "#22d3ee", metalness: 0.3, roughness: 0.2 },
  { position: [5, -1, -8], scale: 0.4, speed: 0.2, geometry: "icosa", color: "#8b5cf6", metalness: 0.5, roughness: 0.1 },
  { position: [-3, -3, -5], scale: 0.3, speed: 0.25, geometry: "octahedron", color: "#f97316", metalness: 0.4, roughness: 0.3 },
  { position: [4, 3, -10], scale: 0.5, speed: 0.18, geometry: "torusKnot", color: "#c2410c", metalness: 0.6, roughness: 0.15 },
];

export function AbstractForms() {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const time = state.clock.elapsedTime;
    const progress = scrollStore.progress;

    groupRef.current.position.y = -progress * 1.5;

    groupRef.current.children.forEach((child, index) => {
      const form = forms[index];
      if (!form) return;

      child.rotation.x = time * form.speed * 0.5;
      child.rotation.y = time * form.speed * 0.3;

      child.position.y =
        form.position[1] + Math.sin(time * form.speed + index) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {forms.map((form, index) => (
        <mesh key={index} position={form.position} scale={form.scale}>
          {form.geometry === "torus" && (
            <torusGeometry args={[1, 0.35, 32, 64]} />
          )}
          {form.geometry === "icosa" && (
            <icosahedronGeometry args={[1, 1]} />
          )}
          {form.geometry === "octahedron" && (
            <octahedronGeometry args={[1, 0]} />
          )}
          {form.geometry === "torusKnot" && (
            <torusKnotGeometry args={[0.6, 0.2, 64, 16]} />
          )}
          <meshStandardMaterial
            color={form.color}
            metalness={form.metalness}
            roughness={form.roughness}
            transparent
            opacity={0.7}
            fog={false}
          />
        </mesh>
      ))}
    </group>
  );
}

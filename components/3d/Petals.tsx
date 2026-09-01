"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function generatePetalPositions(count: number) {
  const array = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 3);
  let seed = 1;
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < count; i++) {
    array[i * 3] = (random() - 0.5) * 24;
    array[i * 3 + 1] = random() * 12 - 4;
    array[i * 3 + 2] = (random() - 0.5) * 10 - 2;
    seeds[i * 3] = random() * Math.PI * 2;
    seeds[i * 3 + 1] = 0.5 + random() * 1.5;
    seeds[i * 3 + 2] = random();
  }
  return { positions: array, seeds };
}

export function Petals() {
  const pointsRef = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();
  const { positions, seeds } = useMemo(() => generatePetalPositions(180), []);

  useFrame((state) => {
    if (!pointsRef.current || reduced) return;
    const time = state.clock.elapsedTime;
    const progress = scrollStore.progress;
    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionsAttr.array as Float32Array;

    for (let i = 0; i < positionsAttr.count; i++) {
      const baseX = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const baseZ = positions[i * 3 + 2];
      const speed = seeds[i * 3 + 1];
      const offset = seeds[i * 3];

      const x = baseX + Math.sin(time * 0.15 + offset) * 0.6 + Math.cos(time * 0.08 + offset * 2.0) * 0.4;
      let y = baseY - ((time * speed * 0.04) % 16);
      const z = baseZ + Math.cos(time * 0.12 + offset) * 0.3;

      if (y < -5) {
        y = 6;
      }

      array[i * 3] = x;
      array[i * 3 + 1] = y - progress * 0.8;
      array[i * 3 + 2] = z;
    }
    positionsAttr.needsUpdate = true;

    pointsRef.current.rotation.y = Math.sin(time * 0.05) * 0.04;
    pointsRef.current.rotation.z = Math.cos(time * 0.07) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#c4a5a5"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        fog={true}
      />
    </points>
  );
}

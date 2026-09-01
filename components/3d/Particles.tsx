"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function generatePositions(count: number) {
  const array = new Float32Array(count * 3);
  let seed = 1;
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < count; i++) {
    array[i * 3] = (random() - 0.5) * 28;
    array[i * 3 + 1] = (random() - 0.5) * 16;
    array[i * 3 + 2] = (random() - 0.5) * 12 - 2;
  }
  return array;
}

export function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const positions = useMemo(() => generatePositions(count), [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reduced) return;
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y += delta * 0.006 + Math.sin(time * 0.06) * delta * 0.002;
    const progress = scrollStore.progress;
    pointsRef.current.rotation.x = progress * 0.04 + Math.cos(time * 0.09) * 0.008;
  });

  if (count === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#c4b5a5"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
        fog={true}
      />
    </points>
  );
}

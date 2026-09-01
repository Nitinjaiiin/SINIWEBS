"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Portal() {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const time = state.clock.elapsedTime;
    const progress = scrollStore.progress;

    groupRef.current.position.y = -progress * 0.6;
    groupRef.current.rotation.y = Math.sin(time * 0.03) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0.4, -5]}>
      {/* Outer ring */}
      <mesh rotation={[Math.PI * 0.5, 0, 0]}>
        <torusGeometry args={[2.8, 0.06, 64, 200]} />
        <meshStandardMaterial color="#1a1020" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Inner ring */}
      <mesh rotation={[Math.PI * 0.5, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 64, 200]} />
        <meshStandardMaterial color="#2a1030" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Disc face with subtle glow */}
      <mesh rotation={[Math.PI * 0.5, 0, 0]}>
        <circleGeometry args={[2.48, 128]} />
        <meshStandardMaterial color="#0f0a18" metalness={0.4} roughness={0.6} transparent opacity={0.9} />
      </mesh>

      {/* Vertical beams */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 2.2;
        const z = Math.sin(angle) * 2.2;
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.08, 4.5, 0.08]} />
            <meshStandardMaterial color="#1a0a25" metalness={0.95} roughness={0.1} transparent opacity={0.85} />
          </mesh>
        );
      })}

      {/* Accent rim lights */}
      {[0, 2, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 2.52;
        const z = Math.sin(angle) * 2.52;
        return (
          <pointLight
            key={`light-${i}`}
            position={[x, 0.3, z]}
            intensity={1.2}
            distance={3.5}
            color="#9f1239"
          />
        );
      })}
    </group>
  );
}

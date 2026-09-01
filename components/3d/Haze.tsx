"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Haze() {
  const hazeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!hazeRef.current) return;
    const time = state.clock.elapsedTime;
    hazeRef.current.rotation.z = Math.sin(time * 0.025) * 0.06;
  });

  return (
    <group ref={hazeRef}>
      <mesh position={[2.8, 0, -1]} scale={[11, 11, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#9f1239" transparent opacity={0.025} fog={false} />
      </mesh>
      <mesh position={[3.2, 1, -3]} scale={[8, 8, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7f1d1d" transparent opacity={0.02} fog={false} />
      </mesh>
      <mesh position={[1.8, -1, -2]} scale={[7, 7, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#1e1b4b" transparent opacity={0.025} fog={false} />
      </mesh>
    </group>
  );
}

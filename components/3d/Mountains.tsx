"use client";
import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { QualityTier } from "@/lib/3d-config";

function generateMountainGeometry(
  width: number,
  height: number,
  segments: number,
  seed: number
) {
  const geo = new THREE.PlaneGeometry(width, height, segments, 1);
  const positions = geo.attributes.position as THREE.BufferAttribute;
  const baseY = -height / 2;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);

    const peak1 = Math.abs(Math.sin(x * 0.7 + seed)) * 0.5;
    const peak2 = Math.abs(Math.sin(x * 1.3 + seed * 2)) * 0.3;
    const peak3 = Math.abs(Math.sin(x * 2.1 + seed * 3)) * 0.2;
    const peak = peak1 + peak2 + peak3;

    const y = baseY + peak * height * 0.8;
    positions.setY(i, y);
  }

  geo.computeVertexNormals();
  return geo;
}

interface MountainLayer {
  width: number;
  height: number;
  position: [number, number, number];
  color: string;
  seed: number;
  parallaxSpeed: number;
}

interface MountainsProps {
  quality: QualityTier;
}

export function Mountains({ quality }: MountainsProps) {
  const segmentCount = quality === "low" ? 20 : quality === "medium" ? 40 : 60;
  const reduced = useReducedMotion();
  const layerRefs = useRef<(THREE.Mesh | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  const layers = useMemo<MountainLayer[]>(
    () => [
      { width: 35, height: 12, position: [0, -6, -14], color: "#0c1325", seed: 1.0, parallaxSpeed: 0.2 },
      { width: 30, height: 10, position: [0, -5.5, -10], color: "#0a1020", seed: 2.5, parallaxSpeed: 0.4 },
      { width: 25, height: 8, position: [0, -5, -7], color: "#080d1a", seed: 4.0, parallaxSpeed: 0.6 },
    ],
    []
  );

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        ticking = false;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (reduced) return;
    const progress = scrollStore.progress;

    smoothMouse.current.x += (mouse.current.x * 0.3 - smoothMouse.current.x) * 0.04;
    smoothMouse.current.y += (mouse.current.y * 0.2 - smoothMouse.current.y) * 0.04;

    layerRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const baseY = layers[index].position[1];
      mesh.position.y = baseY + progress * layers[index].parallaxSpeed;
      mesh.position.x = smoothMouse.current.x * (index + 1) * 0.25;
    });
  });

  return (
    <>
      {layers.map((layer, index) => (
        <mesh
          key={index}
          ref={(el) => {
            layerRefs.current[index] = el;
          }}
          geometry={generateMountainGeometry(layer.width, layer.height, segmentCount, layer.seed)}
          position={layer.position}
        >
          <meshStandardMaterial
            color={layer.color}
            roughness={1}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

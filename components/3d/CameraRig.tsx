"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CameraRig() {
  const { camera } = useThree();
  const scene = useThree((state) => state.scene);
  const reduced = useReducedMotion();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const lightRefs = useRef<{
    warm: THREE.PointLight | null;
    cool: THREE.PointLight | null;
  }>({ warm: null, cool: null });

  useLayoutEffect(() => {
    const warm = new THREE.PointLight("#9f1239", 0, 10, 2);
    warm.position.set(2, 2, 3);
    scene.add(warm);
    const cool = new THREE.PointLight("#4c1d95", 0, 10, 2);
    cool.position.set(-2, -1, 4);
    scene.add(cool);
    lightRefs.current = { warm, cool };

    return () => {
      scene.remove(warm);
      scene.remove(cool);
    };
  }, [scene]);

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

  useFrame((state) => {
    const progress = scrollStore.progress;

    if (reduced) {
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      if (lightRefs.current.warm) lightRefs.current.warm.intensity = 0;
      if (lightRefs.current.cool) lightRefs.current.cool.intensity = 0;
      return;
    }

    const targetY = progress * 4;
    const nextY = camera.position.y + (targetY - camera.position.y) * 0.05;
    const time = state.clock.elapsedTime;
    const breathe = Math.sin(time * 0.4) * 0.06 + Math.cos(time * 0.27) * 0.04;
    const nextZ = 6 - progress * 1.5 + breathe;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (!isCoarse) {
      smooth.current.x += (mouse.current.x * 0.35 - smooth.current.x) * 0.07;
      smooth.current.y += (mouse.current.y * 0.25 - smooth.current.y) * 0.07;
      camera.position.set(smooth.current.x, nextY, nextZ + smooth.current.y * 0.6);
    } else {
      camera.position.set(0, nextY, nextZ);
    }

    camera.lookAt(0, targetY * 0.5, 0);

    const { warm, cool } = lightRefs.current;
    const mx = smooth.current.x;
    const my = smooth.current.y;
    if (warm) {
      warm.position.set(2 + mx * 2, 2 + my * 1.5, 3);
      warm.intensity = 0.6 + Math.abs(mx) * 0.6 + Math.abs(my) * 0.4;
    }
    if (cool) {
      cool.position.set(-2 - mx * 1.5, -1 - my * 1, 4);
      cool.intensity = 0.4 + Math.abs(mx) * 0.5;
    }
  });

  return null;
}

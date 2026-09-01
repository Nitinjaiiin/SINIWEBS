"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  baseOpacity: number;
}

function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 32,
      y: Math.random() * 20 - 3,
      z: -14 - Math.random() * 24,
      size: 0.004 + Math.random() * 0.02,
      twinkleSpeed: 0.25 + Math.random() * 1.1,
      twinkleOffset: Math.random() * Math.PI * 2,
      baseOpacity: 0.12 + Math.random() * 0.5,
    });
  }
  return stars;
}

const vertexShader = /* glsl */ `
  attribute float opacity;
  attribute float size;
  varying float vOpacity;

  void main() {
    vOpacity = opacity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 color;
  uniform float baseOpacity;
  varying float vOpacity;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.05, dist) * vOpacity * baseOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function Stars({ count = 400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();
  const stars = useMemo(() => generateStars(count), [count]);

  const { positions, opacities, sizes } = useMemo(() => {
    const pos = new Float32Array(stars.length * 3);
    const opa = new Float32Array(stars.length);
    const siz = new Float32Array(stars.length);
    stars.forEach((s, i) => {
      pos[i * 3] = s.x;
      pos[i * 3 + 1] = s.y;
      pos[i * 3 + 2] = s.z;
      opa[i] = s.baseOpacity;
      siz[i] = s.size;
    });
    return { positions: pos, opacities: opa, sizes: siz };
  }, [stars]);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color("#d4d8f0") },
      baseOpacity: { value: 0.9 },
    }),
    []
  );

  useFrame((state) => {
    if (!pointsRef.current || reduced) return;
    const time = state.clock.elapsedTime;
    const opaAttr = pointsRef.current.geometry.attributes
      .opacity as THREE.BufferAttribute | null;

    if (opaAttr) {
      const arr = opaAttr.array as Float32Array;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        arr[i] = s.baseOpacity * (0.35 + twinkle * 0.65);
      }
      opaAttr.needsUpdate = true;
    }

    pointsRef.current.rotation.y = time * 0.0018;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.015;
  });

  if (count === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-opacity" args={[opacities, 1]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        fog={false}
      />
    </points>
  );
}

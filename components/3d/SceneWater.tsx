"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SceneWater() {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || reduced) return;
    const time = state.clock.elapsedTime;
    const progress = scrollStore.progress;
    const material = meshRef.current.material as THREE.ShaderMaterial;

    if (material?.uniforms?.time) {
      material.uniforms.time.value = time;
    }
    meshRef.current.position.y = -2.8 - progress * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, -2.8, -4]} rotation={[-Math.PI * 0.5, 0, 0]} scale={[24, 14, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        fog={false}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`varying vec2 vUv; uniform float time;
          void main(){
            vec2 uv = vUv;
            float wave = sin(uv.x * 5.0 + time * 0.12) * cos(uv.y * 3.5 + time * 0.1) * 0.5 + 0.5;
            float wave2 = sin(uv.x * 2.8 - time * 0.08) * cos(uv.y * 4.5 + time * 0.06) * 0.5 + 0.5;
            float n = mix(wave, wave2, 0.5) * 0.5 + 0.25;
            float alpha = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.55, uv.y);
            alpha *= 0.1 + n * 0.06;
            vec3 color = mix(vec3(0.02, 0.01, 0.05), vec3(0.06, 0.02, 0.1), n);
            color += vec3(0.08, 0.01, 0.02) * smoothstep(0.5, 1.0, uv.x) * 0.35;
            color += vec3(0.02, 0.01, 0.08) * smoothstep(0.5, 0.0, uv.x) * 0.25;
            gl_FragColor = vec4(color, alpha);
          }`}
        uniforms={{ time: { value: 0 } }}
      />
    </mesh>
  );
}

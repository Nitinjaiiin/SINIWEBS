"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Water() {
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
    meshRef.current.position.y = -3.5 - progress * 0.6;
  });

  return (
    <mesh ref={meshRef} position={[0, -3.5, -4]} rotation={[-Math.PI * 0.5, 0, 0]} scale={[22, 14, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        fog={false}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`varying vec2 vUv; uniform float time;
          void main(){
            vec2 uv = vUv;
            float wave = sin(uv.x * 6.0 + time * 0.15) * cos(uv.y * 4.0 + time * 0.12) * 0.5 + 0.5;
            float wave2 = sin(uv.x * 3.5 - time * 0.1) * cos(uv.y * 5.5 + time * 0.08) * 0.5 + 0.5;
            float n = mix(wave, wave2, 0.5) * 0.5 + 0.25;
            float alpha = smoothstep(0.0, 0.35, uv.y) * smoothstep(1.0, 0.6, uv.y);
            alpha *= 0.12 + n * 0.08;
            vec3 color = mix(vec3(0.02, 0.02, 0.06), vec3(0.08, 0.03, 0.12), n);
            color += vec3(0.06, 0.01, 0.02) * smoothstep(0.5, 1.0, uv.x) * 0.4;
            gl_FragColor = vec4(color, alpha);
          }`}
        uniforms={{ time: { value: 0 } }}
      />
    </mesh>
  );
}

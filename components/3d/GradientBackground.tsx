"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GradientBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.z = Math.sin(time * 0.015) * 0.03;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    if (material?.uniforms?.time) {
      material.uniforms.time.value = time;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[30, 20, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`varying vec2 vUv; uniform float time; void main(){
          vec3 c1 = vec3(0.015,0.018,0.06);
          vec3 c2 = vec3(0.06,0.025,0.14);
          vec3 c3 = vec3(0.025,0.05,0.16);
          float n = sin(vUv.x*4.0+time*0.03)*cos(vUv.y*4.0+time*0.02)*0.015;
          vec3 color = mix(c1, c2, vUv.y*0.6 + n);
          color = mix(color, c3, smoothstep(0.25,0.75,vUv.x)*0.35);
          color += vec3(0.14,0.04,0.02) * smoothstep(0.55,1.0,vUv.x)*0.22;
          color += vec3(0.02,0.04,0.16) * smoothstep(0.55,0.0,vUv.x)*0.18;
          color += vec3(0.06,0.01,0.08) * smoothstep(0.3,0.7,vUv.y)*0.08;
          gl_FragColor = vec4(color,1.0);
        }`}
        uniforms={{ time: { value: 0 } }}
      />
    </mesh>
  );
}

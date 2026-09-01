"use client";
export function Environment() {
  return (
    <>
      <fog attach="fog" args={["#0a1628", 8, 55]} />
      <ambientLight intensity={0.3} color="#1e1b4b" />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#f0ebe3" />
      <directionalLight position={[-5, 2, 3]} intensity={1.0} color="#4c1d95" />
      <pointLight position={[0, 2, -5]} intensity={2.5} color="#9f1239" distance={14} />
      <pointLight position={[2, -3, 2]} intensity={1.8} color="#7f1d1d" distance={11} />
    </>
  );
}

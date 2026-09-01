"use client";
import dynamic from "next/dynamic";

const SceneCanvasImpl = dynamic(() => import("./SceneCanvasImpl"), {
  ssr: false,
  loading: () => null,
});

export default function SceneCanvas() {
  return <SceneCanvasImpl />;
}

"use client";
import { useEffect, useRef, memo } from "react";

const BackgroundVideo = memo(function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a1628]" style={{ transform: 'translateZ(0)' }} aria-hidden="true">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
      >
        <source src="/videos/siniwebsbgpingpong.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
});

export { BackgroundVideo };

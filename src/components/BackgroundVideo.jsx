import React, { useEffect, useRef } from 'react';
import { registerVideoElement } from '../utils/media';

export const BackgroundVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    registerVideoElement(video);

    // Keep muted initially until the user clicks "OPEN THE BOOK"
    video.muted = true;
    video.volume = 1.0;

    // Start video playing visually in the background
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Video autoplay was handled
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background HTML5 Video (Hardware accelerated GPU layer) */}
      <video
        ref={videoRef}
        src="/assets/diwali-video.mp4"
        autoPlay
        playsInline
        webkit-playsinline="true"
        loop
        preload="auto"
        muted={true}
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover opacity-75"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      />

      {/* Luxury Royal Cinematic Dark Vignette Overlay (Fast GPU compositing, no software blend-mode) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030617]/85 via-[#080d2b]/70 to-[#040614]/95" />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
};

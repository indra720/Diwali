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
      {/* Background HTML5 Video (Plays visually muted initially) */}
      <video
        ref={videoRef}
        src="/assets/diwali-video.mp4"
        autoPlay
        playsInline
        webkit-playsinline="true"
        loop
        preload="auto"
        muted={true}
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      {/* Luxury Royal Cinematic Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030617]/75 via-[#080d2b]/65 to-[#040614]/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
};

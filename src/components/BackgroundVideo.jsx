import React, { useEffect, useRef } from 'react';

export const BackgroundVideo = ({ isMuted = false, isStarted = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Apply mute state
    video.muted = isMuted;

    // Attempt playback
    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocked unmuted autoplay, play muted first
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    };

    tryPlay();

    // Unlock sound on first user touch/click anywhere on the window
    const handleFirstGesture = () => {
      if (!isMuted && video) {
        video.muted = false;
        video.play().catch(() => {});
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, [isStarted, isMuted]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background HTML5 Video */}
      <video
        ref={videoRef}
        src="/assets/diwali-video.mp4"
        autoPlay
        playsInline
        webkit-playsinline="true"
        loop
        muted={isMuted}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Luxury Royal Cinematic Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030617]/75 via-[#080d2b]/65 to-[#040614]/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

export const BackgroundVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set unmuted by default
    video.muted = false;

    // Try playing immediately with sound
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If modern browser blocks autoplay with sound before user interaction,
        // play muted initially so the video starts playing visually...
        video.muted = true;
        video.play().catch(() => {});

        // ...and unmute immediately on the very first touch/click/interaction anywhere!
        const unlockAudio = () => {
          if (video) {
            video.muted = false;
            video.play().catch(() => {});
          }
          ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'].forEach((event) => {
            window.removeEventListener(event, unlockAudio);
          });
        };

        ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'].forEach((event) => {
          window.addEventListener(event, unlockAudio, { once: true, passive: true });
        });
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background HTML5 Video with Audio */}
      <video
        ref={videoRef}
        src="/assets/diwali-video.mp4"
        autoPlay
        playsInline
        webkit-playsinline="true"
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      {/* Luxury Royal Cinematic Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030617]/75 via-[#080d2b]/65 to-[#040614]/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
};

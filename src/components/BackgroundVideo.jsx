import React, { useEffect, useRef, useState } from 'react';
import { registerVideoElement, playAudio } from '../utils/media';

export const BackgroundVideo = () => {
  const videoRef = useRef(null);
  const [startBackground, setStartBackground] = useState(false);

  // User requested: "background 2 second bad start ho okk"
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartBackground(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!startBackground) return;

    const video = videoRef.current;
    if (!video) return;

    registerVideoElement(video);

    // Set unmuted with full volume
    video.muted = false;
    video.volume = 1.0;

    // Attempt playback immediately with sound
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser blocked autoplay with sound before user interaction:
        // Play muted temporarily so video displays...
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    // Unmute immediately on ANY first user touch, tap or click
    const handleFirstGesture = () => {
      playAudio();
      ['click', 'touchstart', 'pointerdown', 'keydown'].forEach((evt) => {
        document.removeEventListener(evt, handleFirstGesture);
      });
    };

    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach((evt) => {
      document.addEventListener(evt, handleFirstGesture, { once: true, passive: true });
    });

    return () => {
      ['click', 'touchstart', 'pointerdown', 'keydown'].forEach((evt) => {
        document.removeEventListener(evt, handleFirstGesture);
      });
    };
  }, [startBackground]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background HTML5 Video (Smoothly fades in after 2 seconds) */}
      {startBackground && (
        <video
          ref={videoRef}
          src="/assets/diwali-video.mp4"
          playsInline
          webkit-playsinline="true"
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-75"
        />
      )}

      {/* Luxury Royal Cinematic Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030617]/75 via-[#080d2b]/65 to-[#040614]/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
};

// Global helper for managing background video and audio playback reliably
let videoElement = null;

export const registerVideoElement = (el) => {
  videoElement = el;
};

// Starts the video sound right when the user clicks "OPEN THE BOOK"
export const startMusicOnBookOpen = () => {
  const el = videoElement || (typeof document !== 'undefined' ? document.querySelector('video') : null);
  if (el) {
    try {
      el.currentTime = 0;
      el.muted = false;
      el.volume = 1.0;
      const promise = el.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn("Audio play on book open:", err);
        });
      }
    } catch (e) {
      console.warn("Could not start audio on book open", e);
    }
  }
};

export const playAudio = startMusicOnBookOpen;
